import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.loginError = "";
  }

  private handleError = (error: HttpErrorResponse) => {
    console.log("Login Failed")
    switch(error.status){
        case 306:
          this.loginError = "User not found";
          console.log("User not found");
          break;
        case 307:
          this.loginError = "Access denied! Not an admin!"
          console.log("Access denied! Not an admin!")
          break;
        case 308:
          console.log("Incorrect password!")
          this.loginError = "Incorrect password!"
          break;
        default:
          this.loginError = "Unknown error! Login Failed."
          console.log("Unknown error! Login Failed.")
          break;
    }
    return new Observable;
  };

  login(){
    this.loginError = "";

    if (!this.username || !this.password) {
      this.loginError = 'Username and password are required';
      return;
    }
    
    this.userService.loginAdmin(this.username, this.password)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(
      response =>{
        let user: User = response as User
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['admin']);
      }
    )
  }

  username: string = "";
  password: string = "";
  loginError: string = "";

}
