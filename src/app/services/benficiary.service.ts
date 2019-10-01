import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { Beneficiary } from "../models/beneficiary";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BenficiaryService {
  constructor(private http: HttpClient, private konst: ConstantService) {}

  singleBen = new Subject<Beneficiary>();

  singleBenId = new Subject<number>();


  getBeneficiary() {
    return this.http.get<Beneficiary[]>(this.konst.apiURL + "beneficiaries");
  }

  getSingleBeneficiary(ben: number) {
    return this.http.get<Beneficiary>(this.konst.apiURL + "beneficiaries/"+ ben);
  }


  // onAddIng(Values: Ingredient) {
  //   this.ingredients.push(Values);
  //   this.ing_val.emit(this.ingredients.slice());
  // }

  createBeneficiary(ben: Beneficiary) {
    //  return this.http.post();
  }
}
