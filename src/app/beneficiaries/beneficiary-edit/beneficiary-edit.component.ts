import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-beneficiary-edit",
  templateUrl: "./beneficiary-edit.component.html",
  styleUrls: ["./beneficiary-edit.component.css"]
})
export class BeneficiaryEditComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<BeneficiaryEditComponent>) {}

  // showForm = false;

  @ViewChild("f", { static: true }) element_create: NgForm;
  ngOnInit() {}

  onCreateBen() {
    console.log(this.element_create);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
