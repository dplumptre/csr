import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Authservice } from "../services/authservice";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @ViewChild("email", { static: true }) element_email: ElementRef;
  @ViewChild("password", { static: true }) element_pass: ElementRef;

  constructor(private authService: Authservice) {}

  ngOnInit() {}

  onLogin() {
    this.authService.login(
      this.element_email.nativeElement.value,
      this.element_pass.nativeElement.value
    );
  }
}
