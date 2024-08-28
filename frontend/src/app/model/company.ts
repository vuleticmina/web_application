import { User } from "./user";

export class Company {
    companyId: number = -1;
    name: string = "";
    address: string = "";
    services: string = "";
    mapLocation: string = "";
    contactPerson: string = "";
    vacations: string = "";
  }

  export class Contact{
    person: string = "";
    phone: number = 0;
  }
  
  export class Service {
    serviceName: string = "";
    description: string = "";
    price: number = 0;
  }

  export class Vacation {
    start: Date = new Date();
    end: Date = new Date();
  }
  
 
  