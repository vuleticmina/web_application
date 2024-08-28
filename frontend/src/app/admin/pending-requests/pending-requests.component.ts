import { Component } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent {
  constructor(private userService: UserService){}

  ngOnInit(): void {
     this.loadRegistrationRequests();
   }

  loadRegistrationRequests() {
    this.userService.getRegistrationRequests()
    .pipe(
      catchError(
        (error: any) => {
        this.errorMessage = 'Error loading registration requests.';
        return new Observable;
      })
    )
    .subscribe(
      (requests) => {
        this.registrationRequests = requests;
        this.errorMessage = "";
      }
    );
  }

  acceptRequest(request: User) {
    this.userService.acceptRegistrationRequest(request.username)
    .pipe(
      catchError(
        (error) => {
          this.errorMessage = 'Error accepting request.';
          return new Observable;
        } )
    )
    .subscribe(
      () => {
        this.loadRegistrationRequests();
        this.errorMessage = "";
      }
    );
  }

  rejectRequest(request: User) {
    this.userService.rejectRegistrationRequest(request.username)
    .pipe(
      catchError(
        (error) => {
          this.errorMessage = 'Error rejecting request.';
          return new Observable;
        })
    )
    .subscribe(
      () => {
        this.loadRegistrationRequests();
        this.errorMessage = "";
      }
    );
  }

  toggleDetails(requestUsername: String): void {
    this.selectedRequestUsername = this.selectedRequestUsername === requestUsername ? null : requestUsername;
  }


  registrationRequests : User[] = [];
  selectedRequestUsername: String | null= null;
  errorMessage: String = '';

}

