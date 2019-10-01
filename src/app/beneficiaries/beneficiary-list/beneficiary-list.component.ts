import { Component, OnInit, OnDestroy } from "@angular/core";
import { BenficiaryService } from "src/app/services/benficiary.service";
import { Beneficiary} from "src/app/models/beneficiary";
import { Subscription } from 'rxjs';


@Component({
  selector: "app-beneficiary-list",
  templateUrl: "./beneficiary-list.component.html",
  styleUrls: ["./beneficiary-list.component.css"]
})
export class BeneficiaryListComponent implements OnInit,OnDestroy {
  beneficiaries: Beneficiary[] = [];
  singleBen : Beneficiary;

  allBen : Subscription;
  

 

  constructor(private beneficiaryService: BenficiaryService) {}

  ngOnInit() {
    this.beneficiaryService.getBeneficiary().subscribe(res => {
      this.beneficiaries = res;
    });

   

  }

  onViewBen(ben: number){

    //alert(ben);

   // this.beneficiaryService.singleBenId.next(ben);

   this.beneficiaryService.getSingleBeneficiary(1).subscribe( myuser =>{
    this.singleBen= myuser;
    console.log(myuser);
   })


  }


  // ngOnDestroy(){
  //   this.allBen.unsubscribe();
  // }

}
