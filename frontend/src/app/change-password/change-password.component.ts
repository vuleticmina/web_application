import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.errorMessage = "";
  }

  submitChangePassword(){
    this.errorMessage = "";
    if(!this.validateForm()){
      this.errorMessage = 'All fields are required.';
      return;
    }

    if(this.newPassword != this.confirmPassword){
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if(!this.validatePassword(this.newPassword)){
      this.errorMessage = 'Password does not meet the required format.';
      return;
    }

    this.userService.updatePassword(this.username, this.oldPassword, this.newPassword)
    .pipe(
      catchError((error: any) => {
        console.log(error)
        if (error.status === 306) {
          this.errorMessage = 'User not found.'
        } else if (error.status === 307) {
          this.errorMessage = 'Old password is incorrect.';
        } else if (error.status === 308) {
          this.errorMessage = 'An error occurred while updating password.';
        } else {
          this.errorMessage = 'An unknown error occurred.';
        }
        return new Observable;
      })
    )
    .subscribe(
      response => {
        this.errorMessage = '';
        this.router.navigate(['/login']);
      }
    )
  }

  private validateForm(){
    return this.username && this.oldPassword && this.newPassword && this.confirmPassword;
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z]{3})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z].{5,9}$/;
    return passwordRegex.test(password);
  }

  username: string = "";
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  errorMessage: string = "";
}


