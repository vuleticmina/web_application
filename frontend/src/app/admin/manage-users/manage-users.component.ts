import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
    .pipe(
      catchError(
        (error) => {
          console.error('Error loading users:', error);
          this.error = true;
          this.loading = false;
          return new Observable;
        })
    )
    .subscribe(
        data => {
          console.log("EVO SAD!")

          this.users = data;
          console.log(this.users)
          this.loading = false;
        }  
      );
  }

  isEditing(index: number): boolean {
    return this.editingStates[index] || false;
  }

  editUser(index: number) {
    this.errorMessage = "";
    this.editingStates[index] = true;
    this.editedUsers[index] = { ...this.users[index] };
  }

  saveUser(index: number) {
    this.errorMessage = "";
     
    const updatedUser = this.editedUsers[index];
    let formData = new FormData();
    console.log("Updated user: ")
    console.log(updatedUser)
    formData.append('username', updatedUser.username);
    formData.append('password', updatedUser.password);
    formData.append('firstName', updatedUser.firstName);
    formData.append('lastName', updatedUser.lastName);
    formData.append('gender', updatedUser.gender);
    formData.append('address', updatedUser.address);
    formData.append('phone', updatedUser.phone);
    formData.append('email', updatedUser.email);
    formData.append('profilePicture', this.dataURLtoFile('data:image/png;base64,' +updatedUser.profilePicture, "slika.png"));
    formData.append('creditCardNumber', updatedUser.creditCardNumber);
    this.userService.updateUser(formData)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error updating user';
          return new Observable<null>();
        })
      )
      .subscribe(() => {
        this.users[index] = updatedUser;
        this.editingStates[index] = false;
        delete this.editedUsers[index];
        this.errorMessage = '';
      });
  }

  cancelEdit(index: number) {
    this.errorMessage = "";
    this.editingStates[index] = false;
    delete this.editedUsers[index];
  }

  deactivateUser(index: number): void {
    this.userService.deactivateUser(this.users[index].username)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = 'Error deactivating user';
          return new Observable;
        }
      )
    )
    .subscribe(
      response => {
        this.users[index].registrationStatus = "INACTIVE";
        this.errorMessage = '';
      }
    )
  }

  reactivateUser(index: number): void {
    this.userService.reactivateUser(this.users[index].username)
    .pipe(
      catchError(
        (error: any) => {
          this.errorMessage = 'Error reactivating user';
          return new Observable;
        }
      )
    )
    .subscribe(
      response => {
        this.users[index].registrationStatus = "APPROVED";
        this.errorMessage = '';
      }
    )
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

  users: User[] = [];
  loading: boolean = false;
  error: boolean = false;
  editedUsers: { [key: number]: User } = {};
  editingStates: { [key: number]: boolean } = {};
  errorMessage: string = '';

}
