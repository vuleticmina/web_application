import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, Timestamp, timestamp } from 'rxjs';
import { BookingReservation } from 'src/app/model/bookingReservation';
import { Company, Service, Vacation } from 'src/app/model/company';
import { CompanyDetails } from 'src/app/model/companydetails';
import { User } from 'src/app/model/user';
import { ArrangingService } from 'src/app/services/arranging.service';
import { CanvasLayoutComponent } from '../canvas-layout/canvas-layout.component';
import { Shape } from 'src/app/model/shape';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit{

  @ViewChild(CanvasLayoutComponent)
  private canvas!: CanvasLayoutComponent;
  
  constructor(private router: Router, private arrangingService: ArrangingService){}
  ngOnInit(): void {
    let companyString = localStorage.getItem("company");
    if(companyString){
      this.company = JSON.parse(companyString) as Company;
      this.services = JSON.parse(this.company.services);
    }

    let userString = localStorage.getItem("user");
    if(userString){
      this.user = JSON.parse(userString) as User;
    }
  }

  validateFormStep1(){
    if(!this.bookingReservation.realisationDate || !this.bookingReservation.type || !this.bookingReservation.area){
      this.errorMessage = "All fields are required!";
      return false;
    }

    if(this.bookingReservation.area <= 0){
      this.errorMessage = "Area should be positive number!";
      return false;
    }

    if(new Date(this.bookingReservation.realisationDate) < new Date()){
      this.errorMessage = "Realisation Date has to be in future!";
      return false;
    }

    let vacations = JSON.parse(this.company.vacations) as Vacation[];
    const isVacationConflict = vacations.some(vacation => {
      const startDate = new Date(vacation.start);
      const endDate = new Date(vacation.end);
    
      return startDate <= new Date(this.bookingReservation.realisationDate) && endDate >= new Date(this.bookingReservation.realisationDate);
    });
    
    if (isVacationConflict) {
      this.errorMessage = "Company on vacation! Pick another date :)";
      return false;
    }
    
    return true;
  }

  nextStep(){
    this.errorMessage = "";
    if(!this.validateFormStep1()){
      return;
    }

    this.currentStep = 2;
    this.selectedServices = [];
  }

  validateForm2(){
    if(this.bookingReservation.type == "private"){
      if(!(this.bookingReservation.poolArea >= 0 && this.bookingReservation.greenArea >= 0 && this.bookingReservation.furnitureArea >= 0)){
        this.errorMessage = "All field except additional requirements are required!";
        return false;
      }

      if(this.bookingReservation.area < this.bookingReservation.poolArea + this.bookingReservation.greenArea + this.bookingReservation.furnitureArea){
        this.errorMessage = "The sum of areas is greater than initial area you choose in previous step!"
        return false;
      }
    } else {
      if(!(this.bookingReservation.fountainArea >= 0 && this.bookingReservation.greenArea >= 0 && this.bookingReservation.tablesNumber >= 0 && this.bookingReservation.chairsNumber >= 0)){
        this.errorMessage = "All fields except additional requirements are required!";
        return false;
      }

      if(this.bookingReservation.area < this.bookingReservation.fountainArea + this.bookingReservation.greenArea ){
        this.errorMessage = "The sum of areas is greater than initial area you choose in previous step!";
        return false;
      }

    }

    return true;
  }

  isLayoutValid(){
    let shapes = JSON.parse(this.bookingReservation.layout) as Shape[];
    if(this.bookingReservation.tablesNumber != shapes.filter(shape => shape.object === "table").length){
      this.errorMessage = "Wrong number of tables on canvas!";
      return false;
    }

    if(this.bookingReservation.chairsNumber != shapes.filter(shape => shape.object === "chair").length){
      this.errorMessage = "Wrong number of chairs on canvas!";
      return false;
    }

    if((this.bookingReservation.poolArea > 0 && shapes.filter(shape => shape.object === "pool").length == 0)
    || (this.bookingReservation.poolArea == 0 && shapes.filter(shape => shape.object === "pool").length > 0)) {
      this.errorMessage = "Wrong number of pools on canvas!";
      return false;
    }

    if((this.bookingReservation.fountainArea > 0 && shapes.filter(shape => shape.object === "fountain").length == 0)
      || (this.bookingReservation.fountainArea == 0 && shapes.filter(shape => shape.object === "fountain").length > 0)) {
        this.errorMessage = "Wrong number of fountains on canvas!";
        return false;
    }

    if((this.bookingReservation.greenArea > 0 && shapes.filter(shape => shape.object === "greenery").length == 0)
      || (this.bookingReservation.greenArea == 0 && shapes.filter(shape => shape.object === "greenery").length > 0)) {
        this.errorMessage = "Wrong number of greenery on canvas!";
        return false;
    }

    return true;

  }

  onCheckboxChange(event: any, service: string) {
    if (event.target.checked) {
      this.selectedServices.push(service);
    } else {
      const index = this.selectedServices.indexOf(service);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      }
    }
  }

  reserve(){
    this.errorMessage = "";

    if(!this.validateForm2()){
      return;
    }

    this.bookingReservation.companyId = this.company.companyId;
    this.bookingReservation.ownerId = this.user.userId;
    this.bookingReservation.status = "BOOKED";
    this.bookingReservation.servicingStatus = "ACCEPTED";
    this.bookingReservation.options = JSON.stringify(this.selectedServices);
    this.bookingReservation.layout = this.canvas.getLayout();

    if(!this.isLayoutValid()){
      return;
    }
    //TODO dodati jos porvera
    
    this.arrangingService.addArranging(this.bookingReservation)
    .pipe(
      catchError(
        (error:any) => {
          this.errorMessage = "Error adding arranging!"
           console.error('Error adding arranging:', error);
           return new Observable();
        }
    
      )
    )
    .subscribe(
      ()=>{
        this.errorMessage = ""
      }
     );

  }

  goToPreviousStep(){
    this.currentStep = 1;
  }

  bookingReservation: BookingReservation = new BookingReservation;
  services: Service[] = [];

  currentStep: number = 1;
  errorMessage: string = "";
  selectedServices: string[] = [];
  company: Company = new Company;
  user: User = new User;
}
