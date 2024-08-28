import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Observable } from 'rxjs';
import { CompanyWithDecorators } from '../model/companyWithDecorators';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {}

  addCompany(company: Company, decorators: String[]){
    return this.http.post(`http://localhost:8080/api/company/add`, {'company': company, 'decorators': decorators});
  }

  getAllCompanies(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/company/all`);
  }

  
  getCompaniesWithDecorators(filters: any): Observable<any>{
    let params = new HttpParams();
    if (filters.name) params = params.set('name', filters.name);
    if (filters.address) params = params.set('address', filters.address);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.order) params = params.set('order', filters.order);
    return this.http.get<CompanyWithDecorators[]>(`http://localhost:8080/api/company/with-decorators`, { params });
  }

  getCompanyById(id: number): Observable<Company>{
    return this.http.get<Company>(`http://localhost:8080/api/company/` + id);
  }

}
