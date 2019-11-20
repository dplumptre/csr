import { Component, OnInit, OnDestroy } from "@angular/core";
import { Authservice } from "../services/authservice";
import { UserAuth } from "../models/userAuth";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit, OnDestroy {
  role: string;
  authsub = new Subscription();
  constructor(private authService: Authservice) {}

  ngOnInit() {
    this.authsub = this.authService.AuthUserData.subscribe(myauthuser => {
      this.role = myauthuser.rolesSlug;
    });
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
  }
}
