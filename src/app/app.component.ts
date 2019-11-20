import { Component } from "@angular/core";
import { Authservice } from "./services/authservice";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "csr";
  constructor(private authService: Authservice) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
