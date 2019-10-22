import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from "@angular/material/dialog";
import { User } from "src/app/models/user";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  the_data: Subscription;
  users: MatTableDataSource<User>;
  displayedColumnsFull: string[] = [
    "name",
    "email",
    "phone",
    "view",
    "edit",
    "delete"
  ];

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.usersService.getRoleUsers().subscribe(res => {
      this.users = new MatTableDataSource(res);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
    // this is to update the recently added entry
    // this.the_data = this.usersService.updateNewuserEntry.subscribe(res => {
    //   this.users = new MatTableDataSource(res);
    //   this.users.paginator = this.paginator;
    //   this.users.sort = this.sort;
    // });
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  onViewUser(ben: number) {
    this.usersService.getSingleUser(ben).subscribe(myuser => {
      this.usersService.singleUser.next(myuser);
    });
  }
}
