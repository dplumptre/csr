import { Component, OnInit } from '@angular/core';
import { BenficiaryService } from 'src/app/services/benficiary.service';
import { Beneficiary } from 'src/app/models/beneficiary';

@Component({
  selector: 'app-beneficiary-detail',
  templateUrl: './beneficiary-detail.component.html',
  styleUrls: ['./beneficiary-detail.component.css']
})
export class BeneficiaryDetailComponent implements OnInit {

  user: Beneficiary;
  myid: number;

  constructor(private beneficiary: BenficiaryService) { }

  ngOnInit() {
    
    // this.beneficiary.singleBenId.subscribe( id =>{
    //   this.myid = id;
    // })

    // this.beneficiary.getSingleBeneficiary(1).subscribe( myuser =>{
    //   this.user = myuser;
    //   console.log(myuser);
    //  })

 


  }


getId(){

}


}
