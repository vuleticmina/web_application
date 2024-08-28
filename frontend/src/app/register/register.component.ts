import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private userSevice: UserService){}

  siteKey: string = '6LchfjEqAAAAAF5msr4chq36WAZffr7GrVaey6Ii'; 


  resolvedCaptcha(captchaResponse: string|null) {
    this.captchaToken = captchaResponse;
  }


  ngOnInit(): void {
    this.registrationError = "";
    this.registrationSuccess = false;
    this.getDefaultProfilePicture();
  }

  private handleError = (error: HttpErrorResponse) => {
    console.log("Registration Failed");
    switch(error.status){
      case 310:
        this.registrationError = "Recaptcha failed!";
        console.log("Recaptcha failed!");
        break;
      case 306:
          this.registrationError = "Username already exists";
          console.log("Username already exists");
          break;
        case 307:
          this.registrationError = "Email already exists"
          console.log("Email already exists")
          break;
        case 308:
          console.log("Error occured while saving to database")
          this.registrationError = "Error occured while saving to database"
          break;
        case 304:
          this.registrationError = "Unknown error! Registration Failed."
          console.log("Unknown error! Login Failed.")
          break;
        default:
          this.registrationError = "Error"
          console.log("Error!")
    }
    return new Observable;

  };
  register(){
    this.registrationError = '';
    this.registrationSuccess = false;

    if (!this.validateForm()) {
      this.registrationError = "All fields are required except photo";
      return;
    }

    if(!this.validatePassword(this.password)){
      this.registrationError = "Password does not meet the required format.";
      return;
    }

    let formData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    formData.append('gender', this.gender);
    formData.append('address', this.address);
    formData.append('phone', this.number);
    formData.append('email', this.email);
    formData.append('profilePicture', this.profilePicture);
    formData.append('creditCardNumber', this.creditCardNumber);
    formData.append('captchaToken', this.captchaToken?this.captchaToken:"");

     this.userSevice.register(formData)
     .pipe(
       catchError(this.handleError)
     )
     .subscribe(
      () => {
        this.registrationSuccess = true;
      }
     )
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.profilePicture = file;
  }

  private validateForm(){
    return this.username && this.password &&
    this.firstName && this.lastName && this.gender && this.address && this.number && this.email &&
    this.creditCardNumber
  }
  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z]{3})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z].{5,9}$/;
    return passwordRegex.test(password);
  }

  validateCreditCard() {
    const dinersRegex = /^((300|301|302|303)\d{12}|(36|38)\d{13})$/;
    const masterCardRegex = /^(51|52|53|54|55)\d{14}$/;
    const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;

    if (dinersRegex.test(this.creditCardNumber)) {
      this.cardType = 'Diners Club';
      this.cardIcon = '/assets/diners.png';
      this.creditCardError = "";
    } else if (masterCardRegex.test(this.creditCardNumber)) {
      this.cardType = 'MasterCard';
      this.cardIcon = '/assets/card.png';
      this.creditCardError = "";
    } else if (visaRegex.test(this.creditCardNumber)) {
      this.cardType = 'Visa';
      this.cardIcon = '/assets/visa.png';
      this.creditCardError = "";
    } else {
      this.cardType = null;
      this.cardIcon = null;
      this.creditCardError = 'Invalid credit card number';
    }
  }

  private getDefaultProfilePicture(): void {
    
    this.userSevice.getDefaultPhoto()
    .subscribe(
      (blob: Blob)=>{
        this.profilePicture = new File([blob], 'default-profile.jpg');
      }
    );

  }

  username: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  gender: string = "";
  address: string = "";
  number: string = "";
  email: string = "";
  profilePicture: File = new File([new Blob(["Hello, world!"], { type: "text/plain" })], "hello.txt", { type: "text/plain" });
  creditCardNumber: string = '';
  cardType: string | null = null;
  cardIcon: string | null = null;
  creditCardError: string = "";
  registrationSuccess: boolean = false;
  registrationError: String = "";
  captchaToken: string | null = null;

}
