import { Component } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private userService: UserService){}
  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
  
    if (userJson) {
      this.user = JSON.parse(userJson) as User;
    }

    this.isPictureSelected = false;
    
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.user.profilePicture = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureString = e.target.result;
        this.isPictureSelected = true;
      };
      reader.readAsDataURL(file);
  }
}

dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
  updateProfile(){
    this.errorMessage = '';
    this.updateSuccess = false;
    let formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('gender', this.user.gender);
    formData.append('address', this.user.address);
    formData.append('phone', this.user.phone);
    formData.append('email', this.user.email);
    if(!this.isPictureSelected) formData.append('profilePicture', this.dataURLtoFile('data:image/png;base64,' +this.user.profilePicture, "slika.png"));
    else {
      formData.append('profilePicture', this.user.profilePicture);
    }


    formData.append('creditCardNumber', this.user.creditCardNumber);
    this.userService.updateUser(formData)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error updating user';
          this.updateSuccess = false;
          return new Observable<User>();
        })
      )
      .subscribe((data) => {
        this.user = data;
        this.errorMessage = '';
        this.updateSuccess = true;
        localStorage.setItem("user", JSON.stringify(this.user));
      });
  }

  

  user: User = new User();
  url: string = "";
  isPictureSelected: boolean = false;
  pictureString: String = "";
  errorMessage: string = "";
  updateSuccess: boolean = false;

}
