import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Beneficiary } from "src/app/models/beneficiary";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from "@angular/material/dialog";

import { BeneficiaryEditComponent } from "src/app/beneficiaries/beneficiary-edit/beneficiary-edit.component";
import { Subscription } from "rxjs";
import { BeneficiaryCreateComponent } from "../beneficiary-create/beneficiary-create.component";
import { Authservice } from "src/app/services/authservice";

@Component({
  selector: "app-beneficiary-list",
  templateUrl: "./beneficiary-list.component.html",
  styleUrls: ["./beneficiary-list.component.css"]
})
export class BeneficiaryListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  beneficiaries: MatTableDataSource<Beneficiary>;
  the_benz: Subscription;
  the_update = new Subscription();
  isLoading = false;
  role: string;
  authsub = new Subscription();
  dept_id: number;

  displayedColumnsFull: string[] = ["name", "email", "delete"];

  constructor(
    private beneficiaryService: BenficiaryService,
    public dialog: MatDialog,
    private authService: Authservice
  ) {}

  ngOnInit() {
    this.authsub = this.authService.AuthUserData.subscribe(myauthuser => {
      this.role = myauthuser.rolesSlug;
      this.dept_id = myauthuser.department_id;
      console.log(this.role);
    });

    this.isLoading = true;

    // this is to update the recently added entry
    this.the_benz = this.beneficiaryService.updateNewBeneficiaryEntry.subscribe(
      res => {
        this.isLoading = false;
        this.beneficiaries = new MatTableDataSource(res);
        this.beneficiaries.paginator = this.paginator;
        this.beneficiaries.sort = this.sort;
      }
    );

    if (this.role == "admin") {
      // Assign the data to the data source for the table to render
      this.the_benz = this.beneficiaryService
        .getBeneficiary()
        .subscribe(res => {
          this.isLoading = false;
          this.beneficiaries = new MatTableDataSource(res);
          this.beneficiaries.paginator = this.paginator;
          this.beneficiaries.sort = this.sort;
        });
    } else {
      this.the_benz = this.beneficiaryService
        .getBeneficiaryByDept(this.dept_id)
        .subscribe(res => {
          this.isLoading = false;
          this.beneficiaries = new MatTableDataSource(res);
          this.beneficiaries.paginator = this.paginator;
          this.beneficiaries.sort = this.sort;
        });
    }
  }

  applyFilter(filterValue: string) {
    this.beneficiaries.filter = filterValue.trim().toLowerCase();

    if (this.beneficiaries.paginator) {
      this.beneficiaries.paginator.firstPage();
    }
  }

  onViewBen(ben: number) {
    this.beneficiaryService.getSingleBeneficiary(ben).subscribe(myuser => {
      //console.log(myuser);
      this.beneficiaryService.singleBen.next(myuser);
    });
  }

  addBen() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(BeneficiaryCreateComponent, dialogConfig);
  }

  editBen(id: number) {
    this.beneficiaryService.getSingleBeneficiary(id).subscribe(myuser => {
      this.beneficiaryService.singleBen.next(myuser);
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(BeneficiaryEditComponent, dialogConfig);
  }

  delBen(id: number) {
    var x = confirm("Are you sure you want to delete?");
    if (x) {
      this.beneficiaryService.deleteBeneficiary(id);

      if (this.role == "admin") {
        this.the_update = this.beneficiaryService
          .getBeneficiary()
          .subscribe(data => {
            this.beneficiaryService.updateNewBeneficiaryEntry.next(data);
          });
        console.log("the admin stuff");
      }

      if (this.role == "user") {
        this.the_update = this.beneficiaryService
          .getBeneficiaryByDept(this.dept_id)
          .subscribe(data => {
            this.beneficiaryService.updateNewBeneficiaryEntry.next(data);
          });
        console.log("the user stuff" + this.dept_id);
      }
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.the_benz.unsubscribe();
    this.authsub.unsubscribe();
    this.the_update.unsubscribe();
  }
}
