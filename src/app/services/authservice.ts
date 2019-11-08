import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConstantService } from "./constant.service";

interface AuthResponseData {
  token: string;
  type: string;
  expires: string;
}

export class Authservice {
  constructor(private http: HttpClient, private konst: ConstantService) {}

  login(email: string, pass: string) {
    //  alert(email + " " + pass);

    return this.http.post<AuthResponseData>(this.konst.apiURL + "login", {
      email: email,
      password: pass
    });
  }

  register(name: string, email: string, pass: string) {
    alert(name + " " + email + " " + pass);
  }

  logout() {}

  authenticate() {}
}
