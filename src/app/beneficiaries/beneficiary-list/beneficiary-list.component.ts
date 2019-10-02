import { Component, OnInit } from "@angular/core";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Beneficiary } from "src/app/models/beneficiary";

@Component({
  selector: "app-beneficiary-list",
  templateUrl: "./beneficiary-list.component.html",
  styleUrls: ["./beneficiary-list.component.css"]
})
export class BeneficiaryListComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];

  constructor(private beneficiary: BenficiaryService) {}

  ngOnInit() {
    this.beneficiary.getBeneficiary().subscribe(res => {
      this.beneficiaries = res;
    });
  }

  onViewBeneficiaryList(id: number) {
    alert(id);
  }
}
