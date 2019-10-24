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

  // updateBeneficiary(ben: Beneficiary, id: number) {
  //   return this.http.put(this.konst.apiURL + "update-beneficiary/" + id, ben);
  // }
}
