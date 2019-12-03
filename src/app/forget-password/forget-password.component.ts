import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Authservice } from "../services/authservice";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.css"]
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private authService: Authservice, private router: Router) {}

  ngOnInit() {}
  @ViewChild("l", { static: true }) element_login: NgForm;
  isLoading: boolean = false;
  error = "";
  success = "";

  onSubmit() {
    //console.log(this.element_login.value.email);
    this.authService.forgetPassword(this.element_login.value.email).subscribe(
      resData => {
        console.log(resData);
        //this.success = resData.success;
        this.success = resData["success"];
        // console.log(resData.success);
        setTimeout(() => {
          this.success = "";
        }, 3000);
      },
      errorMessage => {
        console.log("error");
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
