import { Component } from "@angular/core";
import { Authservice } from "./services/authservice";
import { ConnectionService } from "ng-connection-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "csr";
  status = "ONLINE";
  isConnected = true;
  constructor(
    private authService: Authservice,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        alert("You are " + this.status);
      } else {
        this.status = "OFFLINE";
        alert("You are " + this.status + " kindly check your network!");
      }
    });
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
