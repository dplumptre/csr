import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConstantService {
  constructor() {}

  apiURL: string = "http://csr.local/api/";
}
