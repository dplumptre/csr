import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Subscription } from "rxjs";
import { DepartmentService } from "src/app/services/department.service";
import { Department } from "src/app/models/department";
import { Authservice } from "src/app/services/authservice";
import { take } from "rxjs/operators";
@Component({
  selector: "app-beneficiary-create",
  templateUrl: "./beneficiary-create.component.html",
  styleUrls: ["./beneficiary-create.component.css"]
})
export class BeneficiaryCreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BeneficiaryCreateComponent>,
    private beneficiaryService: BenficiaryService,
    private departmentService: DepartmentService,
    private authService: Authservice
  ) {}

  // showForm = false;

  @ViewChild("f", { static: true }) element_create: NgForm;

  result: [] = [];
  responseData: any = {};
  success: string = "";
  dept: number = 2;
  isLoading = false;
  departments: Department[] = [];
  admin: boolean = false;
  role: string;
  dept_id: number;
  authsub = new Subscription();

  ngOnInit() {
    this.admin = false; // this will be true or false depending on the admin privilege

    this.authsub = this.authService.AuthUserData.subscribe(myauthuser => {
      this.role = myauthuser.rolesSlug;
      this.dept_id = myauthuser.department_id;
      console.log(this.dept_id);
    });

    this.departmentService.getDepartment().subscribe(Response => {
      this.departments = Response;
    });
  }

  onCreateBen() {
    this.isLoading = true;
    console.log(this.element_create.value.department_id);
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

          console.log(this.responseData + "--" + this.role);
          // this is to update the recently added entry

          if (this.role == "admin") {
            this.beneficiaryService.getBeneficiary().subscribe(data => {
              // console.log(data);
              this.beneficiaryService.updateNewBeneficiaryEntry.next(data);
            });
          }

          if (this.role == "user") {
            this.beneficiaryService
              .getBeneficiaryByDept(this.dept_id)
              .subscribe(data => {
                // console.log(data);
                this.beneficiaryService.updateNewBeneficiaryEntry.next(data);
              });
          }
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
