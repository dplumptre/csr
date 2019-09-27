import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "../models/department";
import { ConstantService } from "./constant.service";
@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  constructor(private http: HttpClient, private konst: ConstantService) {}

  myapi: string = this.konst.apiURL + "departments";

  getDepartment() {
    return this.http.get<Department[]>(this.myapi);

    // return this.http.get<Department[]>(`${this.apiURL}/custo;mers`)
  }
}
