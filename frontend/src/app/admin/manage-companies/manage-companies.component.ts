import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Company, Contact, Service, Vacation } from 'src/app/model/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.css']
})
export class ManageCompaniesComponent {
  constructor(private companyService: CompanyService){}
  ngOnInit(): void {
    this.loading = true;
    this.companyService.getAllCompanies()
    .pipe(
      catchError(
        (error: any) => {
          console.log("Error while loading companies!");
          this.error = true;
          this.loading = false;
          return new Observable;
        }
      )
    )
    .subscribe(
      data => {
        this.companies = data;
        this.error = false;
        this.loading = false;
        this.companies.forEach(
          company => {
            this.services.push(JSON.parse(company.services));
            this.vacations.push(JSON.parse(company.vacations));
            this.contact.push(JSON.parse(company.contactPerson));
          }
        )
      }
    )
  }


  companies: Company[] = [];
  error: boolean = false;
  loading: boolean = false;
  services: Service[][] = [];
  vacations: Vacation[][] = [];
  contact: Contact[] = [];

  errorMessage: string = "";

}
