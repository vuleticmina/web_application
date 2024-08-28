export class BookingReservation{
    jobId: number = 0;
    companyId: number = 0;
    ownerId: number = 0;
    bookingDatetime: Date = new Date();
    realisationDate: Date = new Date();
    lastServicingDate: Date | null = null;
    area: number = 0;
    type: string = "";
    poolArea: number = 0;
    greenArea:number = 0;
    furnitureArea: number = 0;
    fountainArea: number = 0;
    tablesNumber: number = 0;
    chairsNumber: number = 0;
    layout: string = "";
    options: string = "";
    additionalRequirements: string = "";
    status: string = "";
    servicingStatus: string = "";
    rating: number | null = null;
    comment: string = "";
    rejectionComment: string = "";

}