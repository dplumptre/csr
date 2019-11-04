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
  singleUser: User;
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
      console.log(this.singleUser.roles[0].slug);

      this.element_edit.setValue({
        name: this.singleUser.name,
        phone: this.singleUser.phone,
        email: this.singleUser.email,
        role: this.singleUser.roles[0].slug,
        department_id: this.singleUser.department_id
      });
    });
  }

  onSubmit() {
    //console.log(this.element_edit.value.role);
    this.usersService
      .updateUser(this.element_edit.value, this.singleUser.id)
      .subscribe(
        resp => {
          this.isLoading = false;
          this.responseData = resp;

          this.result = [];
          if (this.responseData.success) {
            this.success = this.responseData.success;

            // update view after edit
            this.usersService
              .getSingleUser(this.singleUser.id)
              .subscribe(myuser => {
                this.usersService.singleUser.next(myuser);
              });
          }
          setTimeout(() => {
            this.dialogRef.close();
          }, 2000);
          // this is to update the recently added entries
          this.usersService.getUsers().subscribe(data => {
            this.usersService.updateNewUserEntry.next(data);
          });
        },
        error => {
          this.result = error.error.result;
          console.log(error.error);
          // console.log(error.error.result);
        }
      );
  }

  ngOnDestroy() {
    this.unsubcribesingleUser.unsubscribe();
  }
}
