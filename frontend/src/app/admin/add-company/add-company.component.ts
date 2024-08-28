import { Component, ViewChild } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Company, Contact, Service, Vacation } from 'src/app/model/company';
import { CompanyService } from 'src/app/services/company.service';
import { MapComponent } from '../map/map.component';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  @ViewChild(MapComponent)
  private map!: MapComponent;

  constructor(private companyService: CompanyService, private userService: UserService){}
  ngOnInit(): void {
    this.registrationSuccess = false;
    this.registrationError = "";

    this.userService.getAllUnemployedDecorators()
    .pipe(
      catchError(
        (error: any) => {
          this.registrationError = "Error while loading unemployed decorators!";
          return new Observable;
        }
      )
    )
    .subscribe(
      (      data: User[]) => {
        this.unemployedDecorators = data;
      }
    )
  }

  addService() {
    this.services.push(new Service());
  }

  removeService(index: number) {
    this.services.splice(index, 1);
  }

  addVacation() {
    this.vacations.push(new Vacation());
  }

  removeVacation(index: number) {
    this.vacations.splice(index, 1);
  }



  addDecorator(): void {
    if (this.selectedDecorator != null) {
      if (!this.decorators.some(d => d.username === this.selectedDecorator?.username)) {
        this.decorators.push(this.selectedDecorator);

        this.unemployedDecorators = this.unemployedDecorators.filter(d => d.username !== this.selectedDecorator?.username);
        
        this.selectedDecorator = null;
      }
    }
  }

  removeDecorator(index: number): void {
    if (index >= 0 && index < this.decorators.length) {
      const removedDecorator = this.decorators.splice(index, 1)[0];

      this.unemployedDecorators.push(removedDecorator);
    }
  }



  onLocationSelected(location: string) {
    this.company.mapLocation = location;
  }

  addCompany(){
    this.registrationError = '';
    this.registrationSuccess = false;

    if (!this.validateForm()) {
      this.registrationError = "All fields are required.";
      return;
    }

    if(this.decorators.length < 2){
      this.registrationError = "You have to add at least 2 decorators.";
      return;
    }
    
    this.company.services = JSON.stringify(this.services);
    this.company.vacations = JSON.stringify(this.vacations);
    this.company.contactPerson = JSON.stringify(this.contact);


    this.decorators.forEach(
      decorator =>{
        this.decoratorUsernames.push(decorator.username);
      }
    )
  
    
    this.companyService.addCompany(this.company, this.decoratorUsernames)
    .pipe(
      catchError(
        (error: any)=> {
          this.registrationError = "Error adding company!";
          return new Observable;
        }
      )
    )
    .subscribe(
      () => {
        this.registrationSuccess = true;
        this.registrationError = "";
      }
    );
    
  }

  private validateForm(){
    return this.company.name && this.company.contactPerson && this.company.address && this.company.mapLocation;
  }

  registrationError: string = "";
  registrationSuccess: boolean = false;
  company: Company = new Company();
  contact: Contact = new Contact();
  services: Service[] = [];
  vacations: Vacation[] = [];
  decorators: User[] =[];
  decoratorUsernames: String[] =[];
  unemployedDecorators: User[] = [];
  selectedDecorator: User | null = null;
  latitude: number = 0;
  longitude: number = 0;
}
