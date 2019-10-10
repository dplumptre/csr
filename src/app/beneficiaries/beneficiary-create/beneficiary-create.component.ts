import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-beneficiary-create",
  templateUrl: "./beneficiary-create.component.html",
  styleUrls: ["./beneficiary-create.component.css"]
})
export class BeneficiaryCreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BeneficiaryCreateComponent>,
    private beneficiaryService: BenficiaryService
  ) {}

  // showForm = false;

  @ViewChild("f", { static: true }) element_create: NgForm;

  result: [] = [];
  responseData: any = {};
  success: string = "";
  dept: number = 2;
  isLoading = false;

  ngOnInit() {
    this.dept;
  }

  onCreateBen() {
    this.isLoading = true;
    // console.log(this.element_create.value);
    this.beneficiaryService
      .createBeneficiary(this.element_create.value)
      .subscribe(
        resp => {
          this.isLoading = false;
          this.responseData = resp;
          this.result = [];
          if (this.responseData.success) {
            this.success = this.responseData.success;
          }
          setTimeout(() => {
            this.dialogRef.close();
          }, 2000);

          // this is to update the recently added entry
          this.beneficiaryService.getBeneficiary().subscribe(data => {
            // console.log(data);
            this.beneficiaryService.updateNewBeneficiaryEntry.next(data);
          });
        },
        error => {
          this.result = error.error.result;
          // console.log(error.error);
          // console.log(error.error.result);
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
