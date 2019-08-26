import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Authservice } from "../services/authservice";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("l", { static: true }) element_login: NgForm;

  constructor(private authService: Authservice) {}

  ngOnInit() {}

  onLogin() {
    // this.authService.login(
    //   this.element_email.nativeElement.value,
    //   this.element_pass.nativeElement.value
    // );

    console.log(this.element_login);
  }
}
