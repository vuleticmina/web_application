import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router, private userService: UserService){}

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
          this.loginError = "User not active"
          console.log("User not active")
          break;
        case 308:
          console.log("Incorrect password!")
          this.loginError = "Incorrect password!"
          break;
        case 309:
          console.log("Blocked decorator!")
          this.loginError = "Blocked decorator!"
          break;
        case 304:
          this.loginError = "Unknown error! Login Failed."
          console.log("Unknown error! Login Failed.")
          break;
        default:
          this.loginError = "Default error"
          console.log("Default error!")
    }
    return new Observable;
  };

  login(){
    this.loginError = "";

    if (!this.username || !this.password) {
      this.loginError = 'Username and password are required';
      return;
    }
    
    this.userService.login(this.username, this.password)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(
      response =>{
        let user: User = response as User
        localStorage.setItem("user", JSON.stringify(user));
        if(user.role === "OWNER"){
          this.router.navigate(['owner']);
        } else if(user.role === "DECORATOR"){
          this.router.navigate(['decorator']);
        } else {
          localStorage.removeItem("user");
          this.loginError = "Wrong type of user!";
        }

      }
    )
  }

  username: String = "";
  password: String = "";
  loginError: String = "";

}
