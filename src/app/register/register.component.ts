import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Authservice } from "../services/authservice";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @ViewChild("f", { static: true }) element_all: NgForm;

  constructor(private authService: Authservice) {}

  ngOnInit() {}

  onSubmit() {
    // this.authService.register(
    //   this.element_name.nativeElement.value,
    //   this.element_email.nativeElement.value,
    //   this.element_pass1.nativeElement.value
    // );
    console.log(this.element_all);
  }

  // onSub(form: NgForm) {
  //   console.log(form);
  // }
}
