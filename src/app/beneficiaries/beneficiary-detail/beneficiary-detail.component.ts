import { Component, OnInit, OnDestroy } from "@angular/core";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Beneficiary } from "src/app/models/beneficiary";
import { Subscription } from "rxjs";

@Component({
  selector: "app-beneficiary-detail",
  templateUrl: "./beneficiary-detail.component.html",
  styleUrls: ["./beneficiary-detail.component.css"]
})
export class BeneficiaryDetailComponent implements OnInit {
  user: Beneficiary;
  sub: Subscription;

  constructor(private beneficiary: BenficiaryService) {}

  ngOnInit() {
    this.beneficiary.singleBen.subscribe(data => {
      this.user = data;
      // this.user  = JSON.stringify(data);
      //console.log(this.user);
    });
  }
}
