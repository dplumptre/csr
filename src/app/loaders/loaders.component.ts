import { Component, OnInit } from "@angular/core";
import { LoadersService } from "../services/loaders.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-loaders",
  templateUrl: "./loaders.component.html",
  styleUrls: ["./loaders.component.css"]
})
export class LoadersComponent implements OnInit {
  loading: boolean = false;
  loadSub = new Subscription();
  constructor(private loaderService: LoadersService) {
    this.loadSub = this.loaderService.isLoading.subscribe(v => {
      console.log(v);
      this.loading = v;
    });
  }

  ngOnInit() {}
}
