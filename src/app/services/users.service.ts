import { Injectable } from "@angular/core";
import { ConstantService } from "./constant.service";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Subject } from "rxjs";

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
}
