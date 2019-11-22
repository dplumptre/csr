import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Authservice } from "../services/authservice";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadersService } from "../services/loaders.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("l", { static: true }) element_login: NgForm;
  isLoading: boolean = false;
  error: string;
  constructor(
    private authService: Authservice,
    private router: Router,
    private loaderService: LoadersService
  ) {}

  ngOnInit() {}

  onLogin() {
    //this.loaderService.isLoading.next(true);
    this.authService
      .login(this.element_login.value.email, this.element_login.value.password)
      .subscribe(
        resData => {
          // console.log(resData);

          this.router.navigate(["/dashboard"]);
        },
        errorMessage => {
          console.log("error");
          console.log(errorMessage);
          console.log(errorMessage.error.error);
          this.error = errorMessage.error.error;
        }
      );

    //console.log(this.element_login.value.email);
  }
}
