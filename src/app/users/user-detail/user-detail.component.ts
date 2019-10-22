import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { User } from "src/app/models/user";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
})
export class UserDetailComponent implements OnInit, OnDestroy {
  constructor(private usersService: UsersService) {}

  user: User;
  unsubSingleUsers: Subscription;

  ngOnInit() {
    this.unsubSingleUsers = this.usersService.singleUser.subscribe(resp => {
      this.user = resp;
      console.log(resp);
    });
  }

  ngOnDestroy() {
    this.unsubSingleUsers.unsubscribe();
  }
}
