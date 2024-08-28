import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-decorator-home',
  templateUrl: './decorator-home.component.html',
  styleUrls: ['./decorator-home.component.css']
})
export class DecoratorHomeComponent implements OnInit{
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
    if(!this.checkUserRole("DECORATOR")){
      this.router.navigate(['']);
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/decorator', route]); 
  }

  user: User = new User();

}
