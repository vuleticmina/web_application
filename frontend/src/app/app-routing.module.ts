import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { OwnerHomeComponent } from './owner/owner-home/owner-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { DecoratorHomeComponent } from './decorator/decorator-home/decorator-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PendingRequestsComponent } from './admin/pending-requests/pending-requests.component';
import { AddDecoratorComponent } from './admin/add-decorator/add-decorator.component';
import { AddCompanyComponent } from './admin/add-company/add-company.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCompaniesComponent } from './admin/manage-companies/manage-companies.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './owner/profile/profile.component';
import { CompaniesComponent } from './owner/companies/companies.component';
import { AppointmentsComponent } from './owner/appointments/appointments.component';
import { ServicingComponent } from './owner/servicing/servicing.component';
import { CompanyDetailsComponent } from './owner/company-details/company-details.component';
import { MakeReservationComponent } from './owner/make-reservation/make-reservation.component';
import { DecoratorAppointmentsComponent } from './decorator/decorator-appointments/decorator-appointments.component';
import { DecoratorServicingComponent } from './decorator/decorator-servicing/decorator-servicing.component';
import { StatisticsComponent } from './decorator/statistics/statistics.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "login", component: LoginComponent},
  {path: "admin-login", component: AdminLoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "change-password", component: ChangePasswordComponent},
  {path: "owner", component: OwnerHomeComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "companies", component: CompaniesComponent},
    {path: 'company/:id', component: CompanyDetailsComponent},
    {path: 'make-reservation', component: MakeReservationComponent},
    {path: "appointments", component: AppointmentsComponent},
    {path: "servicing", component: ServicingComponent},
    {path: "", component: ProfileComponent}
  ]},
  {path: "admin", component: AdminHomeComponent, children: [
    {path: "pending-requests", component: PendingRequestsComponent},
    {path: "add-decorator", component: AddDecoratorComponent},
    {path: "add-company", component: AddCompanyComponent},
    {path: "manage-users", component: ManageUsersComponent},
    {path: "manage-companies", component: ManageCompaniesComponent},
    {path: "", component: PendingRequestsComponent}
  ]},
  {path: "decorator", component: DecoratorHomeComponent, children: [
    {path: "profile", component: ProfileComponent},
    {path: "appointments", component: DecoratorAppointmentsComponent},
    {path: "servicing", component: DecoratorServicingComponent},
    {path: "statistics", component: StatisticsComponent},
    {path: "", component: ProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
