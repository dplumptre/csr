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
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DownloadComponent } from "./download/download.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { DepartmentListComponent } from "./departments/department-list/department-list.component";
import { DepartmentCreateComponent } from "./departments/department-create/department-create.component";
import { HttpClientModule } from "@angular/common/http";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BeneficiariesComponent } from "./beneficiaries/beneficiaries.component";
import { AllBeneficiariesComponent } from "./all-beneficiaries/all-beneficiaries.component";
import { AllBeneficiariesListComponent } from "./all-beneficiaries/all-beneficiaries-list/all-beneficiaries-list.component";
import { BeneficiaryListComponent } from "./beneficiaries/beneficiary-list/beneficiary-list.component";
import { BeneficiaryDetailComponent } from "./beneficiaries/beneficiary-detail/beneficiary-detail.component";
import { BeneficiaryEditComponent } from "./beneficiaries/beneficiary-edit/beneficiary-edit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import {
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule
} from "@angular/material";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";

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
    NavComponent,
    DashboardComponent,
    DownloadComponent,
    DepartmentsComponent,
    DepartmentListComponent,
    DepartmentCreateComponent,
    PageNotFoundComponent,
    BeneficiariesComponent,
    AllBeneficiariesComponent,
    AllBeneficiariesListComponent,
    BeneficiaryListComponent,
    BeneficiaryDetailComponent,
    BeneficiaryEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [Authservice, { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents: [BeneficiaryEditComponent]
})
export class AppModule {}
