import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Arranging } from 'src/app/model/arranging';
import { BookingReservation } from 'src/app/model/bookingReservation';
import { Shape } from 'src/app/model/shape';
import { User } from 'src/app/model/user';
import { ArrangingService } from 'src/app/services/arranging.service';

@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: ['./servicing.component.css']
})
export class ServicingComponent implements OnInit{

  constructor(private arrangingService: ArrangingService, private router: Router){}

  ngOnInit(): void {
    let userString = localStorage.getItem("user");
    if(!userString){
      this.router.navigate(['']);
      return;
    } 
    this.user = JSON.parse(userString) as User;
    this.arrangingService.getCompletedArranging(this.user.userId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while loading arrangements!";
          return new Observable<BookingReservation[]>;
        }
      )
    )
    .subscribe(
      data => {
        this.completedJobs = data;
      }
    )

    this.arrangingService.getServicingArranging(this.user.userId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while loading arrangements!";
          return new Observable<BookingReservation[]>;
        }
      )
    )
    .subscribe(
      data => {
        this.servicingJobs = data;
      }
    )

  }

  toggleCompletedJobs() {
    this.showCompletedJobs = true;
    this.showServicingJobs = false;
  }

  toggleServicingJobs() {
    this.showCompletedJobs = false;
    this.showServicingJobs = true;
  }

  canScheduleServicing(job: BookingReservation): boolean {
    if(job.servicingStatus == "BOOKED") return false;
    if(this.numberOfFountains(job) == 0 && this.numberOfPools(job) == 0) return false;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return (job.lastServicingDate==null && new Date(job.realisationDate) < sixMonthsAgo) || (job.lastServicingDate!=null && new Date(job.lastServicingDate) < sixMonthsAgo);
  }

  bookServicing(job: BookingReservation) {
    this.arrangingService.bookServicing(job.jobId)
    .pipe(
      catchError(
        (error: any)=>{
          this.errorMessage = "Error while booking servicing!";
          return new Observable;
        }
      )
    )
    .subscribe(
      response => {
        this.errorMessage = "";
        job.servicingStatus = "BOOKED";
        this.servicingJobs.push(job);
      }
    )
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

  showCompletedJobs: boolean = true;
  showServicingJobs: boolean = false;

  completedJobs: BookingReservation[] = [];
  servicingJobs: BookingReservation[] = [];
  errorMessage: string = "";
  user: User = new User;

}
