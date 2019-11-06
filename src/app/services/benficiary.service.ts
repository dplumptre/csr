import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantService } from "./constant.service";
import { Beneficiary } from "../models/beneficiary";
import { Subject } from "rxjs";

// interface mydates {
//   id: number;
//   from: string;
//   to: string;
// }

@Injectable({
  providedIn: "root"
})
export class BenficiaryService {
  constructor(private http: HttpClient, private konst: ConstantService) {}

  singleBen = new Subject<Beneficiary>();
  updateNewBeneficiaryEntry = new Subject<Beneficiary[]>(); // update beneficiary anytime theres an entry
  singleBenId = new Subject<number>();

  getBeneficiary() {
    return this.http.get<Beneficiary[]>(this.konst.apiURL + "beneficiaries");
  }

  getSingleBeneficiary(ben: number) {
    return this.http.get<Beneficiary>(
      this.konst.apiURL + "beneficiaries/" + ben
    );
  }

  deleteBeneficiary(ben: number) {
    this.http
      .delete<Beneficiary>(this.konst.apiURL + "delete-beneficiary/" + ben)
      .subscribe(response => {
        console.log(response);
        this.getBeneficiary().subscribe(data => {
          this.updateNewBeneficiaryEntry.next(data);
        });
      });
  }

  createBeneficiary(ben: Beneficiary) {
    return this.http.post<Beneficiary>(
      this.konst.apiURL + "create-beneficiary",
      ben
    );
  }

  updateBeneficiary(ben: Beneficiary, id: number) {
    return this.http.put(this.konst.apiURL + "update-beneficiary/" + id, ben);
  }

  downloadAllBeneficiary() {
    return this.http.get(this.konst.apiURL + "export-all-ben", {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json"
      }),
      responseType: "blob"
    });
  }

  exportBolb(resp, name: string, saveAs) {
    const blob = new Blob([resp], { type: "application/vnd.ms.excel" });
    const file = new File([blob], name + ".xlsx", {
      type: "application/vnd.ms.excel"
    });
    saveAs(file);
  }

  exportBenByDept(id: number) {
    return this.http.get(this.konst.apiURL + "export-all-ben-by-dept/" + id, {
      headers: new HttpHeaders({
        Authorization: "{data}",
        "Content-Type": "application/json"
      }),
      responseType: "blob"
    });
  }

  exportBenByDate(from: string, to: string) {
    return this.http.get(
      this.konst.apiURL + "export-all-ben-by-date/" + from + "/" + to,
      {
        headers: new HttpHeaders({
          //  Authorization: "{data}",
          "Content-Type": "application/json"
        }),
        responseType: "blob"
      }
    );
  }

  exportBenByDeptAndDate(id: number, from: string, to: string) {
    return this.http.get(
      this.konst.apiURL +
        "export-all-ben-by-dept-and-dates/" +
        id +
        "/" +
        from +
        "/" +
        to,
      {
        headers: new HttpHeaders({
          //  Authorization: "{data}",
          "Content-Type": "application/json"
        }),
        responseType: "blob"
      }
    );
  }
}
