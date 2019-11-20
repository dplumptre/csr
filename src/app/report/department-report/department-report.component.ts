import { Component, OnInit, ViewChild } from "@angular/core";
import { Department } from "src/app/models/department";
import { NgForm } from "@angular/forms";
import { DepartmentService } from "src/app/services/department.service";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { saveAs } from "file-saver";
import * as moment from "moment";
import { empty, Subscription } from "rxjs";
import { Authservice } from "src/app/services/authservice";

@Component({
  selector: "app-department-report",
  templateUrl: "./department-report.component.html",
  styleUrls: ["./department-report.component.css"]
})
export class DepartmentReportComponent implements OnInit {
  @ViewChild("f", { static: true }) element_all_dept: NgForm;
  @ViewChild("gat", { static: true }) element_all: NgForm;
  departments: Department[] = [];
  success: string = "";
  successDept: string = "";
  isLoading = false;
  result: [] = [];
  responseData: any = {};
  authsub = new Subscription();
  role: string;
  dept_id: number;

  constructor(
    private departmentService: DepartmentService,
    private beneficiaryService: BenficiaryService,
    private authService: Authservice
  ) {}

  ngOnInit() {
    this.authsub = this.authService.AuthUserData.subscribe(myauthuser => {
      this.role = myauthuser.rolesSlug;
      this.dept_id = myauthuser.department_id;
    });

    this.departmentService.getDepartment().subscribe(Response => {
      this.departments = Response;
    });
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
  }

  onSubmit() {
    // console.log(this.element_all_dept.value.department_id);

    const from_date = moment(this.element_all_dept.value.from);
    const to_date = moment(this.element_all_dept.value.to);
    const id = this.element_all_dept.value.department_id;
    let dateInFormat_from = from_date.format("YYYY-M-D");
    let dateInFormat_to = to_date.format("YYYY-M-D");
    console.log(id + " the id");
    console.log(dateInFormat_from);

    if (
      ((dateInFormat_from == "Invalid date" ||
        dateInFormat_to == "Invalid date") &&
        id == null) ||
      id == ""
    ) {
      /**
       *  download all beneficiaries
       *  check if its admin or user
       *  admin downloads all user download only by dept
       */
      /**
*   To do export you after receiving download in in xlx in web api
*    npm install file-saver --save
    // use for typescript
    npm install @types/file-saver --save-dev
    saveAs(file);
*/

      if (this.role == "admin") {
        console.log("all ben");
        this.isLoading = true;
        this.beneficiaryService.downloadAllBeneficiary().subscribe(
          resp => {
            this.isLoading = false;
            this.responseData = resp;
            this.result = [];
            this.success = "success";
            setTimeout(() => {
              this.success = "";
            }, 3000);
            this.beneficiaryService.exportBolb(resp, "all_beneficiary", saveAs);
            this.element_all_dept.reset();
          },
          res => {
            this.isLoading = false;
            console.log("xxxxx");
            console.log(res);
          }
        );
      }

      if (this.role == "user") {
        console.log("this is a user");
      }
      /**   end of check both admin/or user
       * */
    } else if (
      (dateInFormat_from == "Invalid date" ||
        dateInFormat_to == "Invalid date") &&
      id != null
    ) {
      // by department
      /**
       *   checking by department
       * */

      console.log("by dept");
      this.isLoading = true;
      this.beneficiaryService.exportBenByDept(id).subscribe(
        resp => {
          //  console.log(resp);
          this.isLoading = false;
          this.responseData = resp;
          this.result = [];

          // console.log("this is success");
          this.success = "success";
          setTimeout(() => {
            this.success = "";
          }, 3000);

          this.beneficiaryService.exportBolb(
            resp,
            "beneficiary_by_dept",
            saveAs
          );
          this.element_all_dept.reset();
        },
        res => {
          this.isLoading = false;
          console.log("xxxxx");
          console.log(res);
        }
      );
    } else if (
      (dateInFormat_from != "Invalid date" &&
        dateInFormat_to != "Invalid date" &&
        id == null) ||
      id == ""
    ) {
      // by date
      /**
       *   checking by date
       * */
      console.log("by date");
      this.isLoading = true;
      this.beneficiaryService
        .exportBenByDate(dateInFormat_from, dateInFormat_to)
        .subscribe(
          resp => {
            //  console.log(resp);
            this.isLoading = false;
            this.responseData = resp;
            this.result = [];

            // console.log("this is success");
            this.success = "success";
            setTimeout(() => {
              this.success = "";
            }, 3000);

            this.beneficiaryService.exportBolb(
              resp,
              "beneficiary_by_date",
              saveAs
            );
            this.element_all_dept.reset();
          },
          res => {
            this.isLoading = false;
            console.log("xxxxx");
            console.log(res);
          }
        );
    } else if (
      dateInFormat_from != "Invalid date" &&
      dateInFormat_to != "Invalid date" &&
      id != null
    ) {
      /**
       *   checking by department and date
       * */
      // by date and dept
      console.log("by date and dept");
      this.isLoading = true;
      this.beneficiaryService
        .exportBenByDeptAndDate(id, dateInFormat_from, dateInFormat_to)
        .subscribe(
          resp => {
            //  console.log(resp);
            this.isLoading = false;
            this.responseData = resp;
            this.result = [];

            // console.log("this is success");
            this.success = "success";
            setTimeout(() => {
              this.success = "";
            }, 3000);

            this.beneficiaryService.exportBolb(
              resp,
              "beneficiary_by_date_dept",
              saveAs
            );
            this.element_all_dept.reset();
          },
          res => {
            this.isLoading = false;
            console.log("xxxxx");
            console.log(res);
          }
        );
    } else {
      console.log("Select specific fields");
    }
  }
}
