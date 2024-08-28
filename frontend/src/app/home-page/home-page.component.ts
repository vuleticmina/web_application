import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Info } from '../model/info';
import { catchError, Observable } from 'rxjs';
import { CompanyWithDecorators } from '../model/companyWithDecorators';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { ArrangingService } from '../services/arranging.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  

  constructor(private userService: UserService, private companyService: CompanyService, private arrangingService: ArrangingService) {}

  ngOnInit(): void {
    this.loadInfo();
    this.loadCompanies();
    this.loadPhotos();
  }

  loadInfo(){
    this.userService.getInfo().subscribe(
      data => this.info = data
    );
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

  loadPhotos(){
    this.arrangingService.getGallery()
    .pipe(
      catchError(
        (error: any)=>{
          this.errorMessage = "Error while uploading photos!";
          return new Observable<File[]>;
        }
      )
    )
    .subscribe(data=> {
      this.photos = data;
    });
  }

  getImageUrl(photo: File): string {
    return 'data:image/png;base64,' + photo;
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

  info: Info = new Info;
  sortBy: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  photos: File[] = [];

}
