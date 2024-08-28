import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DecoratorHomeComponent } from './decorator/decorator-home/decorator-home.component';
import { OwnerHomeComponent } from './owner/owner-home/owner-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PendingRequestsComponent } from './admin/pending-requests/pending-requests.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AddDecoratorComponent } from './admin/add-decorator/add-decorator.component';
import { AddCompanyComponent } from './admin/add-company/add-company.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCompaniesComponent } from './admin/manage-companies/manage-companies.component';
import { ProfileComponent } from './owner/profile/profile.component';
import { CompaniesComponent } from './owner/companies/companies.component';
import { AppointmentsComponent } from './owner/appointments/appointments.component';
import { ServicingComponent } from './owner/servicing/servicing.component';
import { MapComponent } from './admin/map/map.component';
import { CompanyDetailsComponent } from './owner/company-details/company-details.component';
import { MakeReservationComponent } from './owner/make-reservation/make-reservation.component';
import { CanvasLayoutComponent } from './owner/canvas-layout/canvas-layout.component';
import { StatisticsComponent } from './decorator/statistics/statistics.component';
import { DecoratorAppointmentsComponent } from './decorator/decorator-appointments/decorator-appointments.component';
import { DecoratorServicingComponent } from './decorator/decorator-servicing/decorator-servicing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginComponent,
    ChangePasswordComponent,
    DecoratorHomeComponent,
    OwnerHomeComponent,
    AdminHomeComponent,
    RegisterComponent,
    PendingRequestsComponent,
    AdminLoginComponent,
    AddDecoratorComponent,
    AddCompanyComponent,
    ManageUsersComponent,
    ManageCompaniesComponent,
    ProfileComponent,
    CompaniesComponent,
    AppointmentsComponent,
    ServicingComponent,
    MapComponent,
    CompanyDetailsComponent,
    MakeReservationComponent,
    CanvasLayoutComponent,
    StatisticsComponent,
    DecoratorAppointmentsComponent,
    DecoratorServicingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
