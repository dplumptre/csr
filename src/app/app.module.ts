import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DataComponent } from "./data/data.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ReportComponent } from "./report/report.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { UsersComponent } from "./users/users.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { DataListComponent } from "./data/data-list/data-list.component";
import { DataDetailComponent } from "./data/data-detail/data-detail.component";
import { DataCreateComponent } from "./data/data-create/data-create.component";
import { NavComponent } from "./nav/nav.component";
import { Authservice } from "./services/authservice";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    LoginComponent,
    RegisterComponent,
    ReportComponent,
    SidebarComponent,
    UsersComponent,
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    DataListComponent,
    DataDetailComponent,
    DataCreateComponent,
    NavComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [Authservice],
  bootstrap: [AppComponent]
})
export class AppModule {}
