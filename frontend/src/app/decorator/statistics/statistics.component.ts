import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { JobsPerMonth } from 'src/app/model/jobsPerMonth';
import { MONTHS } from 'src/app/model/months';
import { User } from 'src/app/model/user';
import { WEEKDAYS } from 'src/app/model/weekdays';
import { ArrangingService } from 'src/app/services/arranging.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{

  constructor(private arrangingService: ArrangingService, private router: Router){}

  ngOnInit(): void {
    let userString = localStorage.getItem("user");
    if(!userString){
      this.router.navigate(['']);
      return;
    } 
    this.user = JSON.parse(userString) as User;

    this.loadJobsPerMonth();
    this.loadJobsPerDecorator();
    this.loadAvgJobsPerWeekday();
  }

  loadJobsPerMonth(){
    this.arrangingService.getJobsPerMonthForDecorator(this.user.userId)
    .subscribe(
      data  =>{
        this.barChartData = {
          labels: data.map(item => MONTHS[item.month]), 
          datasets: [{ data: data.map(item => item.count), label: 'Jobs' }]
        };
      }
    )
  }

  loadJobsPerDecorator(){
    this.arrangingService.getJobsPerDecoratorForCompany(this.user.companyId)
    .subscribe(
      data  =>{
        this.pieChartData = {
          labels: data.map(item => item.decorator), 
          datasets: [{ data: data.map(item => item.count), label: 'Jobs',
            hoverBackgroundColor: 'rgba(211, 211, 211, 0.8)', 
            hoverBorderColor: 'rgba(0, 0, 0, 0)'  }]
        };
      }
    )
  }

  loadAvgJobsPerWeekday(){
    this.arrangingService.getAvgJobsPerWeekday(this.user.companyId)
    .subscribe(
      data  =>{
        this.histogramData = {
          labels: data.map(item => WEEKDAYS[item.weekday]), 
          datasets: [{ data: data.map(item => item.avg / 24), label: 'Jobs' }]
        };
      }
    )
  }

  
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '' }
    ]
  };


  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Job Distribution' }
    ]
  };

  histogramOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  histogramType: ChartType = 'bar';
  histogramData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '' }
    ]
  };

  user: User = new User;

}
