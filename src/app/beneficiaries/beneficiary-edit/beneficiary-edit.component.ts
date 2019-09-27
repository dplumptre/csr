import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-beneficiary-edit",
  templateUrl: "./beneficiary-edit.component.html",
  styleUrls: ["./beneficiary-edit.component.css"]
})
export class BeneficiaryEditComponent implements OnInit {
  constructor() {}
  @ViewChild("f", { static: true }) element_create: NgForm;
  ngOnInit() {}

  onCreateBen() {
    console.log(this.element_create);
  }
}
