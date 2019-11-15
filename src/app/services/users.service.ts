import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { User } from "../models/user";
import { Subject } from "rxjs";
import { Authservice } from "./authservice";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  singleUser = new Subject<User>();
  updateNewUserEntry = new Subject<User[]>(); // update beneficiary anytime theres an entry
  singleUserId = new Subject<number>();

  constructor(private konst: ConstantService, private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.konst.apiURL + "users");
  }

  getRoleUsers() {
    return this.http.get<User[]>(this.konst.apiURL + "user-auth");
  }

  getSingleUser(ben: number) {
    return this.http.get<User>(this.konst.apiURL + "user/" + ben);
  }

  getSingleUserByEmail(ben: string, token: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return this.http.get<User>(this.konst.apiURL + "user-email/" + ben, {
      headers: headers
    });
  }

  createUser(ben: User) {
    return this.http.post<{
      name: string;
      phone: string;
      email: string;
      department_id: number;
      role: string;
    }>(this.konst.apiURL + "create-user", ben);
  }

  deleteUser(ben: number) {
    this.http
      .delete<User>(this.konst.apiURL + "delete-user/" + ben)
      .subscribe(response => {
        console.log(response);
        this.getUsers().subscribe(data => {
          this.updateNewUserEntry.next(data);
        });
      });
  }

  updateUser(
    user: {
      name: string;
      phone: string;
      email: string;
      department_id: number;
      role: string;
    },
    id: number
  ) {
    return this.http.put(this.konst.apiURL + "update-user/" + id, user);
  }
}
