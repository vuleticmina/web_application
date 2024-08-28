import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { BookingReservation } from 'src/app/model/bookingReservation';
import { Shape } from 'src/app/model/shape';
import { User } from 'src/app/model/user';
import { ArrangingService } from 'src/app/services/arranging.service';

@Component({
  selector: 'app-decorator-servicing',
  templateUrl: './decorator-servicing.component.html',
  styleUrls: ['./decorator-servicing.component.css']
})
export class DecoratorServicingComponent implements OnInit{

  constructor(private arrangingService: ArrangingService, private router: Router) {}

  ngOnInit(): void {
    let userString = localStorage.getItem("user");
    if(!userString){
      this.router.navigate(['']);
      return;
    } 
    this.user = JSON.parse(userString) as User;
    this.loadServicingRequests();
  }

  loadServicingRequests(){
    this.arrangingService.getServicingRequests(this.user.companyId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while loading requests!";
          return new Observable<BookingReservation[]>;
        }
      )
    )
    .subscribe(
      data => {
        this.servicingRequests = data;
      }
    )
  }

  confirmRequest(request: BookingReservation): void {
    this.selectedRequest = request;
  }

  rejectRequest(request: BookingReservation): void {
    this.arrangingService.rejectServicingRequest(request.jobId).subscribe(() => {
      this.loadServicingRequests();
    });
  }

  submitConfirmation(): void {
    if (this.estimatedCompletion) {
      const data = {
        jobId: this.selectedRequest.jobId,
        estimatedCompletion: this.estimatedCompletion
      };
      this.arrangingService.acceptServicingRequest(data).subscribe(() => {
        this.loadServicingRequests();
        this.cancelConfirmation();
      });
    }
  }

  cancelConfirmation(): void {
    this.selectedRequest = null;
  }

  numberOfPools(job: BookingReservation){
    if(!job.layout) return 0;
    let shapes = JSON.parse(job.layout) as Shape[];
    return shapes.filter(shape => shape.object === "pool").length;
  }

  numberOfFountains(job: BookingReservation){
    if(!job.layout) return 0;
    let shapes = JSON.parse(job.layout) as Shape[];
    return shapes.filter(shape => shape.object === "fountain").length;
  }

  servicingRequests: BookingReservation[] = [];
  selectedRequest: any  = null;
  estimatedCompletion: Date = new Date();
  errorMessage: string = "";
  user: User = new User();

}
