import { Component, OnInit, ViewChild } from "@angular/core";
import { DepartmentService } from "../services/department.service";
import { Department } from "../models/department";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
