import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Arranging } from 'src/app/model/arranging';
import { BookingReservation } from 'src/app/model/bookingReservation';
import { Service } from 'src/app/model/company';
import { User } from 'src/app/model/user';
import { ArrangingService } from 'src/app/services/arranging.service';

@Component({
  selector: 'app-decorator-appointments',
  templateUrl: './decorator-appointments.component.html',
  styleUrls: ['./decorator-appointments.component.css']
})
export class DecoratorAppointmentsComponent implements OnInit{
  constructor(private arrangingService: ArrangingService, private router: Router){}

  ngOnInit(): void {
    let userString = localStorage.getItem("user");
    if(!userString){
      this.router.navigate(['']);
      return;
    } 
    this.user = JSON.parse(userString) as User;
    
    
    this.arrangingService.getBookedArranging(this.user.companyId)
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
        this.bookings = data;
        this.bookings.forEach(
          booking => {
            this.services.push(JSON.parse(booking.options));
          }
        )
        this.errorMessage = "";
      }
    )

    this.arrangingService.getInProcessArranging(this.user.userId)
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
        this.myBookings = data;
        this.myBookings.forEach(
          booking => {
            this.myServices.push(JSON.parse(booking.options));
          }
        )
        this.errorMessage = "";
      }
    )
  }

  togglePendingBookings() {
    this.showPendingBookings = !this.showPendingBookings;
  }

  toggleMyBookings() {
    this.showMyBookings = !this.showMyBookings;
  }

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    this.pictures[index] = file;
    console.log(this.pictures[index]);
  }

  completeBooking(index: number){
    this.arrangingService.uploadPicture(this.myBookings[index].jobId, this.pictures[index])
    .pipe(
      catchError(
        (error: any)=> {
          this.errorMessage = "Error while uploading picture!";
          return new Observable;
        }
      )
    )
    .subscribe(
      data=> {
        this.errorMessage = "";
        this.myBookings.splice(index, 1);
        this.myServices.splice(index, 1);
      }
    )

  }
  

  viewDetails(index: number): void {
    this.selectedBooking = this.bookings[index];
    // Render garden layout on canvas based on the selected booking
  }

  acceptBooking(index: number): void {
    let data = {
      "jobId": this.bookings[index].jobId,
      "decoratorId": this.user.userId
    }
    this.arrangingService.assignTo(data)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = "Error while assigning arrangement!";
          return new Observable;
        }
      )
    )
    .subscribe(
      data => {
        this.errorMessage = "";
        this.myBookings.push(this.bookings[index]);
        this.myServices.push(this.services[index])
        let myBooking = this.bookings.splice(index, 1);
        let myService = this.services.splice(index, 1);
      }
    )
  }
  

  rejectBooking(index: number): void {
    const rejectionReason = prompt('Enter the reason for rejection:');
    if (rejectionReason) {
      let data = {
        "jobId": this.bookings[index].jobId,
        "rejectionComment": rejectionReason
      }
      this.arrangingService.rejectArranging(data)
      .pipe(
        catchError(
          (error: any) => {
            this.errorMessage = "Error while rejecting arrangement!";
            return new Observable;
          }
        )
      )
      .subscribe(
        data => {
          this.errorMessage = "";
          this.bookings.splice(index, 1);
          this.services.splice(index, 1);
        }
      )
    }
  }

  showPendingBookings: boolean = true;
  showMyBookings: boolean = false;
  bookings: BookingReservation[] = []; 
  myBookings: BookingReservation[] = [];
  services: Service[][] = [];
  myServices: Service[][] = [];
  selectedBooking: BookingReservation | null = null;
  errorMessage: string = "";
  user: User = new User;
  isPictureSelected: boolean = false;
  pictures: { [key: number]: File } = {};

}
