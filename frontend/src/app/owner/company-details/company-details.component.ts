import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Company, Contact, Service } from 'src/app/model/company';
import { CompanyDetails } from 'src/app/model/companydetails';
import { Rating } from 'src/app/model/rating';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params['id']; 
      this.getCompanytDetails(this.companyId);
    });
  }

  getCompanytDetails(id: number): void {
    this.companyService.getCompanyById(id)
    .pipe(
      catchError(
        (error:any) => {
           console.error('Error fetching compnay details:', error);
           return new Observable();
        }
    
      )
    )
    .subscribe(
      company=> {
        let companyDetails = company as CompanyDetails;
        this.company = companyDetails.company;
        this.ratings = companyDetails.ratings;
        this.services = JSON.parse(this.company.services);
        this.contact = JSON.parse(this.company.contactPerson);
        this.lat = Number.parseFloat(this.company.mapLocation.split(', ')[0]);
        this.lng = Number.parseFloat(this.company.mapLocation.split(', ')[1]);
      }
    );
  }

  makeReservation(){
    localStorage.setItem("company", JSON.stringify(this.company));
    this.router.navigate(['/owner/make-reservation']);
  }

  companyId: number = 0;
  company: Company = new Company();
  services: Service[] = [];
  contact: Contact = new Contact();
  ratings: Rating[] = [];
  lat: number = 0;
  lng: number = 0;

}
