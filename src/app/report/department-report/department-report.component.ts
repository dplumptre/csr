import { Component, OnInit, ViewChild } from "@angular/core";
import { Department } from "src/app/models/department";
import { NgForm } from "@angular/forms";
import { DepartmentService } from "src/app/services/department.service";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { saveAs } from "file-saver";

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
  constructor(
    private departmentService: DepartmentService,
    private beneficiaryService: BenficiaryService
  ) {}

  ngOnInit() {
    this.departmentService.getDepartment().subscribe(Response => {
      this.departments = Response;
    });
  }

  onSubmit() {
    console.log(this.element_all_dept.value.department_id);

    // this.isLoading = true;
    this.beneficiaryService
      .exportBenByDept(this.element_all_dept.value.department_id)
      .subscribe(
        resp => {
          //  console.log(resp);
          this.isLoading = false;
          this.responseData = resp;
          this.result = [];
          const fileName = "department";
          this.successDept = "success";
          setTimeout(() => {
            this.successDept = "";
          }, 3000);

          const blob = new Blob([resp], { type: "application/vnd.ms.excel" });
          const file = new File([blob], fileName + ".xlsx", {
            type: "application/vnd.ms.excel"
          });
          saveAs(file);
          this.element_all_dept.reset();
        },
        res => {
          this.isLoading = false;
          console.log(res);
        }
      );
  }

  onGetAllBen() {
    this.isLoading = true;
    console.log("answer");
    this.beneficiaryService.downloadAllBeneficiary().subscribe(
      resp => {
        //  console.log(resp);
        this.isLoading = false;
        this.responseData = resp;
        this.result = [];
        const fileName = "all_department";

        // console.log("this is success");
        this.success = "success";
        setTimeout(() => {
          this.success = "";
        }, 3000);

        /**
 *   To do export you after receiving download in in xlx in web api
 *    npm install file-saver --save
     // use for typescript
     npm install @types/file-saver --save-dev
     saveAs(file);
 */
        const blob = new Blob([resp], { type: "application/vnd.ms.excel" });
        const file = new File([blob], fileName + ".xlsx", {
          type: "application/vnd.ms.excel"
        });
        saveAs(file);
        this.element_all.reset();
      },
      res => {
        this.isLoading = false;
        console.log("xxxxx");
        console.log(res);
      }
    );
  }
}
