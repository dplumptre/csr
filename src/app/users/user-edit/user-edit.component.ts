import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user";
import { NgForm } from "@angular/forms";
import { Department } from "src/app/models/department";
import { MatDialogRef } from "@angular/material/dialog";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit, OnDestroy {
  unsubcribesingleUser: Subscription;
  singleUser: {
    department_id: number;
    email: string;
    name: string;
    phone: string;
    role: string;
  };
  departments: Department[] = [];
  success: string = "";
  isLoading = false;
  result: [] = [];
  responseData: any = {};
  @ViewChild("f", { static: true }) element_edit: NgForm;

  constructor(
    private usersService: UsersService,
    public dialogRef: MatDialogRef<UserEditComponent>,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.departmentService.getDepartment().subscribe(Response => {
      this.departments = Response;
    });

    this.unsubcribesingleUser = this.usersService.singleUser.subscribe(data => {
      this.singleUser = data;
      this.element_edit.setValue({
        name: this.singleUser.name,
        phone: this.singleUser.phone,
        email: this.singleUser.email,
        role: "",
        department_id: this.singleUser.department_id
      });
    });
  }

  onSubmit() {
    console.log(this.element_edit);
  }

  ngOnDestroy() {
    this.unsubcribesingleUser.unsubscribe();
  }
}
