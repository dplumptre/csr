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
  // AuthUserData = new Subject<UserAuth>();

  AuthUserData = new BehaviorSubject<UserAuth>(null);

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

              //     // return data;
            });
        })
      );
  }

  register(name: string, email: string, pass: string) {
    alert(name + " " + email + " " + pass);
  }

  logout() {
    this.http.get(this.konst.apiURL + "logout");
    this.router.navigate(["/"]);
  }

  authenticate() {}
}
