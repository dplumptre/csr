import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { Subject, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { UserAuth } from "../models/userAuth";
import { UsersService } from "./users.service";
import { Router } from "@angular/router";

export interface AuthResponseData {
  token: string;
  type: string;
  expires: string;
}
@Injectable({
  providedIn: "root"
})
export class Authservice {
  AuthUserData = new BehaviorSubject<UserAuth>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private konst: ConstantService,
    private userService: UsersService,
    private router: Router
  ) {}

  login(email: string, pass: string) {
    //  alert(email + " " + pass);

    return this.http
      .post<AuthResponseData>(this.konst.apiURL + "login", {
        email: email,
        password: pass
      })
      .pipe(
        tap(data => {
          // console.log(data.token + "jjswjswjsj");
          this.userService
            .getSingleUserByEmail(email, data.token)
            .subscribe(singleUser => {
              // console.log(singleUser.roles[0].slug + " single");
              const expiryDate = new Date(
                new Date().getTime() + +data.expires * 1000
              );

              console.log(data + " == " + singleUser.roles);

              const myuser = new UserAuth(
                singleUser.id,
                singleUser.name,
                singleUser.email,
                singleUser.roles[0].slug,
                singleUser.department_id,
                data.token,
                expiryDate
              );

              this.AuthUserData.next(myuser); // to store my user data
              this.autoLogout(+data.expires * 1000);
              localStorage.setItem("authUserData", JSON.stringify(myuser));
            });
        })
      );
  }

  register(name: string, email: string, pass: string) {
    alert(name + " " + email + " " + pass);
  }

  forgetPassword(email: string) {
    return this.http.post<string>(this.konst.apiURL + "forget-password", {
      email: email
    });
  }

  resetPassword(token: string, password: string, password2: string) {
    return this.http.post<string>(
      this.konst.apiURL + "password-reset/" + token,
      { token: token, password: password, password_confirmation: password2 }
    );
  }

  logout() {
    this.http.get(this.konst.apiURL + "logout");
    localStorage.removeItem("authUserData");
    this.router.navigate(["/"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration); // you can test by changing it to 2000 thats 2secs it will logout by itself
  }

  autoLogin() {
    // we call this function at the top of our app which is app.components.ts
    const userData: {
      id: number;
      name: string;
      email: string;
      rolesSlug: string;
      department_id: number;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem("authUserData"));
    if (!userData) {
      return;
    }
    const loadedUser = new UserAuth(
      userData.id,
      userData.name,
      userData.email,
      userData.rolesSlug,
      userData.department_id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      // you have access to the token method now; if the token has not expired you can load userdata
      this.AuthUserData.next(loadedUser);
      const expirationDurationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDurationTime);
    }
  }
}
