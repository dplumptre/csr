import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { Beneficiary } from "../models/beneficiary";

@Injectable({
  providedIn: "root"
})
export class BenficiaryService {
  constructor(private http: HttpClient, private konst: ConstantService) {}

  getBeneficiary() {
    return this.http.get<Beneficiary[]>(this.konst.apiURL + "beneficiaries");
  }

  // onAddIng(Values: Ingredient) {
  //   this.ingredients.push(Values);
  //   this.ing_val.emit(this.ingredients.slice());
  // }

  // createBeneficiary(ben: Benficiary) {
  //   //  return this.http.post();
  // }
}
