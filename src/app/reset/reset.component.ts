import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Authservice } from "../services/authservice";

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.css"]
})
export class ResetComponent implements OnInit {
  hashkey: string;
  @ViewChild("l", { static: true }) element_login: NgForm;
  isLoading: boolean = false;
  error: string;
  success: string;
  constructor(
    private authService: Authservice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.hashkey = params["hashkey"];
      console.log(this.hashkey);
    });
  }

  onSubmit() {
    console.log(this.element_login.value);

    this.authService
      .resetPassword(
        this.hashkey,
        this.element_login.value.password,
        this.element_login.value.password_confirmation
      )
      .subscribe(
        resData => {
          console.log(resData);
          this.success = resData["success"];
          setTimeout(() => {
            this.success = "";
            this.router.navigate(["/"]);
          }, 5000);
        },
        errorMessage => {
          //  console.log("error");
          console.log(errorMessage);
          console.log(errorMessage.error.error);
          this.error = errorMessage.error.error;
          setTimeout(() => {
            this.error = "";
          }, 3000);
        }
      );
  }
}
