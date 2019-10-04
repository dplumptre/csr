import { Component, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-beneficiary-list",
  templateUrl: "./beneficiary-list.component.html",
  styleUrls: ["./beneficiary-list.component.css"]
})
export class BeneficiaryListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  beneficiaries: MatTableDataSource<Beneficiary>;
  //beneficiaries: Beneficiary[] = [];

  displayedColumnsFull: string[] = ["name", "email", "view", "edit", "delete"];

  constructor(
    private beneficiaryService: BenficiaryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // Assign the data to the data source for the table to render
    this.beneficiaryService.getBeneficiary().subscribe(res => {
      this.beneficiaries = new MatTableDataSource(res);
      this.beneficiaries.paginator = this.paginator;
      this.beneficiaries.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.beneficiaries.filter = filterValue.trim().toLowerCase();

    if (this.beneficiaries.paginator) {
      this.beneficiaries.paginator.firstPage();
    }
  }

  onViewBen(ben: number) {
    //alert(ben);
    this.beneficiaryService.getSingleBeneficiary(ben).subscribe(myuser => {
      //console.log(myuser);
      this.beneficiaryService.singleBen.next(myuser);
    });
  }

  addBen() {
    // alert("true");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(BeneficiaryEditComponent, dialogConfig);
  }
}
