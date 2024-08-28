import { Timestamp } from "rxjs";

export class User{
    userId: number = 0;
    companyId: number = -1;
    username: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    gender: 'M' | 'F' = 'M'; 
    address: string = "";
    phone: string = "";
    email: string = "";
    profilePicture: File = new File([new Blob(["Hello, world!"], { type: "text/plain" })], "hello.txt", { type: "text/plain" });
    creditCardNumber: string = "";
    role: 'OWNER' | 'DECORATOR' | 'ADMIN' = 'OWNER'; 
    registrationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INACTIVE' = 'PENDING'; 
    createdAt: any = Date.now();
    captchaToken: string = "";
}