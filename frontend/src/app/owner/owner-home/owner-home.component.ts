import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-owner-home',
  templateUrl: './owner-home.component.html',
  styleUrls: ['./owner-home.component.css']
})
export class OwnerHomeComponent {
  constructor(private router: Router){}

  private checkUserRole(requiredRole: string): boolean {
    const userJson = localStorage.getItem('user');
  
    if (userJson) {
      this.user = JSON.parse(userJson) as User;
      return this.user.role === requiredRole;
    }
    return false;
  }

  ngOnInit(): void {
    if(!this.checkUserRole("OWNER")){
      this.router.navigate(['']);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/owner', route]); 
  }

  user: User = new User();

}
