import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Authservice } from "../services/authservice";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("name", { static: true }) element_name: ElementRef;
  @ViewChild("email", { static: true }) element_email: ElementRef;
  @ViewChild("password1", { static: true }) element_pass1: ElementRef;
  @ViewChild("password2", { static: true }) element_pass2: ElementRef;

  constructor(private authService: Authservice) {}

  ngOnInit() {}

  onRegister() {
    this.authService.register(
      this.element_name.nativeElement.value,
      this.element_email.nativeElement.value,
      this.element_pass1.nativeElement.value
    );
  }

  onSub(form: NgForm) {
    console.log(form);
  }
}
