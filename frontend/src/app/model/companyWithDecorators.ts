import { Company } from "./company";
import { User } from "./user";

export class CompanyWithDecorators{
    company: Company = new Company;
    decorators: User[] = [];
    averageRating: number = 0;

}