import { Component, OnInit, OnDestroy } from "@angular/core";
import { Authservice } from "../services/authservice";
import { Subscription } from "rxjs";
import { UserAuth } from "../models/userAuth";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit, OnDestroy {
  authsub = new Subscription();
  isAuthenticated = false;
  authUser: UserAuth;
  role: string;
  constructor(private authService: Authservice) {}

  ngOnInit() {
    this.authsub = this.authService.AuthUserData.subscribe(myauthuser => {
      this.isAuthenticated = myauthuser ? true : false;
      this.authUser = myauthuser;
      // this.role = myauthuser.rolesSlug;
      console.log(!!myauthuser);
      console.log(myauthuser);
    });

    console.log("2wewswd");
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
  }

  logout() {
    console.log("wasssss");
    this.authService.logout();
  }
}
