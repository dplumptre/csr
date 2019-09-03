import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { UsersComponent } from "./users/users.component";
import { ReportComponent } from "./report/report.component";
import { DataComponent } from "./data/data.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DepartmentsComponent } from "./departments/departments.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "users", component: UsersComponent },
  { path: "report", component: ReportComponent },
  { path: "data", component: DataComponent },
  { path: "departments", component: DepartmentsComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
