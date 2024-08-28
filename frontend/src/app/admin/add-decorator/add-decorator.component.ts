import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Company } from 'src/app/model/company';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-decorator',
  templateUrl: './add-decorator.component.html',
  styleUrls: ['./add-decorator.component.css']
})
export class AddDecoratorComponent {
  constructor(private companyService: CompanyService, private userService: UserService){}
  ngOnInit(): void {
    this.getDefaultProfilePicture();
    this.companyService.getAllCompanies()
    .pipe(
      catchError(
        (error: any) => {
          this.registrationError = "Error while loading restaurants!";
          return new Observable;
        }
      )
    )
    .subscribe(
      (data: Company[]) => {
        this.companies = data;
      }
    )
  }

  private handleError = (error: HttpErrorResponse) => {
    console.log("Registration Failed");
    switch(error.status){
      case 306:
          this.registrationError = "Username already exists";
          console.log("Username already exists");
          break;
        case 307:
          this.registrationError = "Email already exists"
          console.log("Email already exists")
          break;
        default:
          this.registrationError = "Unknown error! Registration Failed."
          console.log("Unknown error! Adding waiter Failed.")
          break;
    }
    return new Observable;

  };
  

  addDecorator() {
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
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('profilePicture', this.profilePicture);
    formData.append('creditCardNumber', this.creditCardNumber);
    formData.append('companyId', this.company.companyId.toString());

    this.userService.addDecorator(formData)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(
      () => {
        this.registrationSuccess = true;
        this.registrationError = "";
      }
    );
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.profilePicture = file;
  }

  private validateForm(){
    return this.company && this.username && this.password &&
    this.firstName && this.lastName && this.gender && this.address && this.phone && this.email &&
    this.creditCardNumber && this.company;
  }

  private validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z]{3})(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z].{5,9}$/;
    return passwordRegex.test(password);
  }

  private getDefaultProfilePicture(): void {
    this.userService.getDefaultPhoto()
    .subscribe(
      (blob: Blob)=>{
        this.profilePicture = new File([blob], 'default-profile.jpg');
      }
    );
  }

  
  companies: Company[] = [];
  company: Company = new Company();
  username: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  gender: string = "";
  address: string = "";
  phone: string = "";
  email: string = "";
  profilePicture: File = new File([new Blob(["Hello, world!"], { type: "text/plain" })], "hello.txt", { type: "text/plain" });
  creditCardNumber: string = '';
  registrationSuccess: boolean = false;
  registrationError: String = "";


}
