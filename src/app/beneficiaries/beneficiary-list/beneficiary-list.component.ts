import { Component, OnInit, OnDestroy } from "@angular/core";
import { BenficiaryService } from "src/app/services/benficiary.service";
<<<<<<< HEAD
import { Beneficiary } from "src/app/models/beneficiary";
=======
import { Beneficiary} from "src/app/models/beneficiary";
import { Subscription } from 'rxjs';

>>>>>>> d98cfb14431dbbdd4186c8e3ffa223a554af236c

@Component({
  selector: "app-beneficiary-list",
  templateUrl: "./beneficiary-list.component.html",
  styleUrls: ["./beneficiary-list.component.css"]
})
<<<<<<< HEAD
export class BeneficiaryListComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
=======
export class BeneficiaryListComponent implements OnInit,OnDestroy {
  beneficiaries: Beneficiary[] = [];
  singleBen : Beneficiary;

  allBen : Subscription;
  
>>>>>>> d98cfb14431dbbdd4186c8e3ffa223a554af236c

 

  constructor(private beneficiaryService: BenficiaryService) {}

  ngOnInit() {
    this.beneficiaryService.getBeneficiary().subscribe(res => {
      this.beneficiaries = res;
    });

   

  }

<<<<<<< HEAD
  onViewBeneficiaryList(id: number) {
    alert(id);
  }
=======
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

>>>>>>> d98cfb14431dbbdd4186c8e3ffa223a554af236c
}
