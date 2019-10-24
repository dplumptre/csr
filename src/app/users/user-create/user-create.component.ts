import { Component, OnInit, ViewChild } from "@angular/core";
import { Department } from "src/app/models/department";
import { NgForm } from "@angular/forms";
import { DepartmentService } from "src/app/services/department.service";
import { UsersService } from "src/app/services/users.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  @ViewChild("f", { static: true }) element_all: NgForm;
  departments: Department[] = [];
  success: string = "";
  isLoading = false;
  result: [] = [];
  responseData: any = {};

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private departmentService: DepartmentService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.departmentService.getDepartment().subscribe(Response => {
      this.departments = Response;
    });
  }

  onSubmit() {
    // this.authService.register(
    //   this.element_name.nativeElement.value,
    //   this.element_email.nativeElement.value,
    //   this.element_pass1.nativeElement.value
    // );
    console.log(this.element_all.value);
    this.usersService.createUser(this.element_all.value).subscribe(
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
        this.usersService.getUsers().subscribe(data => {
          // console.log(data);
          this.usersService.updateNewUserEntry.next(data);
        });
      },
      error => {
        this.result = error.error.result;
        // console.log(error.error);
        // console.log(error.error.result);
      }
    );
  }
}
