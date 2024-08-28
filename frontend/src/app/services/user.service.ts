import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Info } from '../model/info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String){
    const data = {
      username : username,
      password : password
    }
    return this.http.post("http://localhost:8080/api/user/login", data);
  }

  loginAdmin(username: String, password: String): Observable<any> {
    const data = {
      username : username,
      password : password
    }
    return this.http.post("http://localhost:8080/api/user/login-admin", data);
  }

  register(formData: FormData){
    return this.http.post("http://localhost:8080/api/user/register", formData);
  }

  updatePassword(username: string, oldPassword: string, newPassword: string){
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post("http://localhost:8080/api/user/update-password", data);
  }

  getRegistrationRequests(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/user/registration-requests`);
  }

  acceptRegistrationRequest(username: String): Observable<any> {
    return this.http.post(`http://localhost:8080/api/user/accept-request`, username);
  }

  rejectRegistrationRequest(username: String): Observable<any> {
    return this.http.post(`http://localhost:8080/api/user/reject-request`, username);
  }

  getAllUsers(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/user/all`);
  }

  updateUser(formData: FormData): Observable<User>{
    return this.http.post<User>(`http://localhost:8080/api/user/update`, formData);
  }

  deactivateUser(username: String){
    return this.http.post(`http://localhost:8080/api/user/deactivate`, username);
  }

  reactivateUser(username: String){
    return this.http.post(`http://localhost:8080/api/user/reactivate`, username);
  }

  addDecorator(decorator: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/api/user/add-decorator`, decorator);
  }

  getAllUnemployedDecorators(): Observable<any>{
    return this.http.get(`http://localhost:8080/api/user/all-unemployed-decorators`);
  }

  getInfo(): Observable<Info>{
    return this.http.get<Info>(`http://localhost:8080/api/user/info`);
  }

  


  

  // getRestaurantsWithWaiters(filters: any): Observable<RestaurantsWithWaiters[]> {
  //   let params = new HttpParams();
  //   if (filters.name) params = params.set('name', filters.name);
  //   if (filters.address) params = params.set('address', filters.address);
  //   if (filters.type) params = params.set('type', filters.type);
  //   if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
  //   if (filters.order) params = params.set('order', filters.order);
  //   return this.http.get<RestaurantsWithWaiters[]>(`http://localhost:8080/api/user/restaurants`, { params });
  // }

  // getSummary(){
  //   return this.http.get<Summary>(`http://localhost:8080/api/user/summary`);
  // }

  getDefaultPhoto():Observable<Blob>{
    return this.http.get('/assets/default-profile.jpg', { responseType: 'blob' });
  }

}

