import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Arranging } from 'src/app/model/arranging';
import { BookingReservation } from 'src/app/model/bookingReservation';
import { Service } from 'src/app/model/company';
import { User } from 'src/app/model/user';
import { ArrangingService } from 'src/app/services/arranging.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit{

  constructor(private arrangingService: ArrangingService, private router: Router){}

  ngOnInit(): void {
    let userString = localStorage.getItem("user");
    if(!userString){
      this.router.navigate(['']);
      return;
    } 
    this.user = JSON.parse(userString) as User;
    
    this.arrangingService.getCurrentArranging(this.user.userId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while loading arrangements!";
          return new Observable<Arranging>;
        }
      )
    )
    .subscribe(
      data => {
        this.currentBookings = data.bookings;
        this.currentCompanyNames = data.companyNames;
        for (const [index, booking] of this.currentBookings.entries()) {
          this.currentServices.push(JSON.parse(booking.options));
        }
        this.errorMessage = "";
      }
    )


    this.arrangingService.getPastArranging(this.user.userId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while loading arrangements!";
          return new Observable<Arranging>;
        }
      )
    )
    .subscribe(
      data => {
        this.pastBookings = data.bookings;
        this.pastCompanyNames = data.companyNames;
        this.errorMessage = "";
      }
    )
  }

  toggleCurrentBookings() {
    this.showCurrentBookings = !this.showCurrentBookings;
  }

  togglePastBookings() {
    this.showPastBookings = !this.showPastBookings;
  }

  canCancelBooking(booking: any) {
    const oneDayBefore = new Date(booking.realisationDate);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);
    return new Date() < oneDayBefore;
  }

  cancelBooking(index: number) {
    this.arrangingService.cancelBooking(this.currentBookings[index].jobId)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = 'Error canceling booking!';
          return new Observable;
        }
      )
    )
    .subscribe(
      response => {
        this.currentBookings[index].status = "CANCELED";
        this.errorMessage = "";
      }
    )
  }

  editBooking(index: number) {
    this.editingIndex = index;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  addRating(index: number){
    let data = {
      "jobId": this.pastBookings[index].jobId,
      "rating": this.pastBookings[index].rating,
      "comment": this.pastBookings[index].comment
    }
    this.arrangingService.addRating(data)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = 'Error while uploading rating!';
          return new Observable;
        }
      )
    )
    .subscribe(
      response => {
        this.errorMessage = '';
        this.editingIndex = null;
      }
    )
  }

  selectRating(index: number, rating: number) {
    this.pastBookings[index].rating = rating;
  }


  showCurrentBookings: boolean = true;
  showPastBookings: boolean = false;
  editingIndex: any = null;
  currentCompanyNames: String[] = [];
  currentBookings: BookingReservation[] = [];
  pastCompanyNames: String[] = [];
  pastBookings: BookingReservation[] = [];
  errorMessage: string = "";
  currentServices: string[][] = [];
  stars = [1, 2, 3, 4, 5];
  user: User = new User;
}
