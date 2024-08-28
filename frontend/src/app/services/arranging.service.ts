import { Injectable } from '@angular/core';
import { BookingReservation } from '../model/bookingReservation';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arranging } from '../model/arranging';
import { JobsPerMonth } from '../model/jobsPerMonth';
import { JobsPerDecorator } from '../model/jobsPerDecorator';
import { AvgJobsPerWeekday } from '../model/avgJobsPerWeekday';

@Injectable({
  providedIn: 'root'
})
export class ArrangingService {

  constructor(private http: HttpClient) { }

  addArranging(arranging: BookingReservation){
    return this.http.post(`http://localhost:8080/api/arranging/add`, arranging);
  }

  getCurrentArranging(ownerId: number): Observable<Arranging>{
    return this.http.get<Arranging>(`http://localhost:8080/api/arranging/current/` + ownerId);
  }

  getPastArranging(ownerId: number): Observable<Arranging>{
    return this.http.get<Arranging>(`http://localhost:8080/api/arranging/past/` + ownerId);
  }

  cancelBooking(id: number){
    let params = new HttpParams()
      .set('id', id);
    return this.http.put(`http://localhost:8080/api/arranging/cancel`, params);
  }

  addRating(data: any){
    return this.http.post(`http://localhost:8080/api/arranging/add-rating`, data);
  }

  getCompletedArranging(ownerId: number): Observable<BookingReservation[]>{
    return this.http.get<BookingReservation[]>(`http://localhost:8080/api/arranging/completed/` + ownerId);
  }

  getBookedArranging(companyId: number): Observable<BookingReservation[]>{
    return this.http.get<BookingReservation[]>(`http://localhost:8080/api/arranging/booked/` + companyId);
  }

  rejectArranging(data: any){
    return this.http.post(`http://localhost:8080/api/arranging/reject`, data);
  }

  assignTo(data: any){
    return this.http.post(`http://localhost:8080/api/arranging/assign`, data);
  }

  getInProcessArranging(decoratorId: number): Observable<BookingReservation[]>{
    return this.http.get<BookingReservation[]>(`http://localhost:8080/api/arranging/in-process/` + decoratorId);
  }

  uploadPicture(jobId: number, picture: File){
    const formData: FormData = new FormData();
    formData.append('picture', picture);
    formData.append('jobId', jobId.toString());
    return this.http.post(`http://localhost:8080/api/arranging/upload`, formData);

  }

  bookServicing(jobId: number){
    let params = new HttpParams()
      .set('jobId', jobId);
    return this.http.post(`http://localhost:8080/api/arranging/book-servicing`, params);
  }

  getServicingArranging(ownerId: number): Observable<BookingReservation[]>{
    return this.http.get<BookingReservation[]>(`http://localhost:8080/api/arranging/servicing/` + ownerId);
  }

  getServicingRequests(companyId: number){
    return this.http.get<BookingReservation[]>(`http://localhost:8080/api/arranging/servicing-requests/` + companyId);
  }

  rejectServicingRequest(jobId: number){
    let params = new HttpParams()
      .set('jobId', jobId);
    return this.http.post(`http://localhost:8080/api/arranging/reject-servicing-request`, params);
  }

  acceptServicingRequest(data: any){
    return this.http.post(`http://localhost:8080/api/arranging/accept-servicing-request`, data);
  }

  getJobsPerMonthForDecorator(decoratorId: number): Observable<JobsPerMonth[]>{
    return this.http.get<JobsPerMonth[]>(`http://localhost:8080/api/arranging/statistic/jobs-per-month/` + decoratorId);
  }

  getJobsPerDecoratorForCompany(companyId: number): Observable<JobsPerDecorator[]> {
    return this.http.get<JobsPerDecorator[]>(`http://localhost:8080/api/arranging/statistic/jobs-per-decorator/` + companyId);

  }

  getAvgJobsPerWeekday(companyId: number): Observable<AvgJobsPerWeekday[]> {
    return this.http.get<AvgJobsPerWeekday[]>(`http://localhost:8080/api/arranging/statistic/avg-jobs-per-weekday/` + companyId);

  }

  getGallery(): Observable<File[]>{
    return this.http.get<File[]>(`http://localhost:8080/api/arranging/gallery`);

  }


  
}
