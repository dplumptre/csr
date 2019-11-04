import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Subscription } from "rxjs";
import { Beneficiary } from "src/app/models/beneficiary";

@Component({
  selector: "app-beneficiary-edit",
  templateUrl: "./beneficiary-edit.component.html",
  styleUrls: ["./beneficiary-edit.component.css"]
})
export class BeneficiaryEditComponent implements OnInit, OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<BeneficiaryEditComponent>,
    private beneficiaryService: BenficiaryService
  ) {}

  // showForm = false;

  @ViewChild("f", { static: true }) element_edit: NgForm;
  unsubcribeSingleBen: Subscription;
  result: [] = [];
  responseData: any = {};
  success: string = "";
  singleBenId: number;
  isLoading = false;
  singleBen: Beneficiary;

  ngOnInit() {
    // this.dept;

    this.unsubcribeSingleBen = this.beneficiaryService.singleBen.subscribe(
      data => {
        //console.log(data);
        this.singleBen = data;
        this.element_edit.setValue({
          name: this.singleBen.name,
          age: this.singleBen.age,
          phone: this.singleBen.phone,
          address: this.singleBen.address,
          email: this.singleBen.email,
          reason: this.singleBen.reason,
          nature: this.singleBen.nature,
          comments: this.singleBen.comments,
          department_id: this.singleBen.department_id,

          approved_person: this.singleBen.approved_person
        });
      }
    );
  }

  onEditBen() {
    //console.log(this.singleBen.id + " lets hear");
    this.isLoading = true;
    this.beneficiaryService
      .updateBeneficiary(this.element_edit.value, this.singleBen.id)
      .subscribe(
        resp => {
          this.isLoading = false;
          this.responseData = resp;
          this.result = [];
          if (this.responseData.success) {
            this.success = this.responseData.success;
            // update view edit on page
            this.beneficiaryService
              .getSingleBeneficiary(this.singleBen.id)
              .subscribe(myuser => {
                this.beneficiaryService.singleBen.next(myuser);
              });
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

  ngOnDestroy() {
    this.unsubcribeSingleBen.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
