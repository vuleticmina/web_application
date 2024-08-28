import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Company } from 'src/app/model/company';
import { CompanyWithDecorators } from 'src/app/model/companyWithDecorators';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  constructor(private companyService: CompanyService, private router: Router){}
  ngOnInit(): void {
    this.loadCompanies();
  }


  navigateTo(route: Number): void {
    this.router.navigate(['/owner/company', route]); 
  }
  

  loadCompanies(): void {
    this.companyService.getCompaniesWithDecorators(this.filters)
    .pipe(
      catchError(
        (error: any)=>{
          this.errorMessage = "Error while uploading companies!";
          return new Observable();
        }
      )
    )
    .subscribe(data=> {
      this.companiesWithDecorators = data as CompanyWithDecorators[];
    });
  }

  onSort(column: string): void {
    if (this.filters.sortBy === column) {
      this.filters.order = this.filters.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.filters.sortBy = column;
      this.filters.order = 'asc';
    }
    this.loadCompanies();
  }

  onSearch(): void {
    this.loadCompanies();
  }

  companiesWithDecorators: CompanyWithDecorators[] = [];
  errorMessage: string = "";

  filters = {
    name: '',
    address: '',
    sortBy: '',
    order: ''
  };

}
