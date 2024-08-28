import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {

  constructor(private router: Router){}

  private checkUserRole(requiredRole: string): boolean {
    const userJson = localStorage.getItem('user');
  
    if (userJson) {
      const user = JSON.parse(userJson) as User;
      return user.role === requiredRole;
    }
  
    return false;
  }

  ngOnInit(): void {
    if(!this.checkUserRole("ADMIN")){
      this.router.navigate(['']);
    }
  }
 
  navigateTo(route: string): void {
    this.router.navigate(['/admin', route]); 
  }

}
