import { Component, OnInit } from "@angular/core";
import { ReportService } from "../../../service/report.service";
import { ReportResDto } from "../../../dto/report/report.res.dto";
import { firstValueFrom } from "rxjs";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    reports!: ReportResDto[];
    startDate!: string;
    endDate!: string;
    constructor(private reportService: ReportService, private fb: NonNullableFormBuilder) { }

    ngOnInit(): void {
        this.getReports(this.startDate,this.endDate);
    }
     getReports(start : string , end : string){
        firstValueFrom(this.reportService.getReport(start,end)).then(result => {
            this.reports = result;
        })
    }

    filter() {
        console.log("Start Date :   " + this.startDate);
        console.log("End Date :   " + this.endDate);
        const newStartDate = convertUTCToLocalDateTimeISOStart(this.startDate as string);
        let newEndDate : string = '' ;
        if(this.endDate != null){
             newEndDate = convertUTCToLocalDateTimeISOEnd(this.endDate as string);
            console.log("New End Date :  " + newEndDate);

        }
        console.log("New Start Date :  " + newStartDate);
        this.getReports(newStartDate, newEndDate);

    }
}
const convertUTCToLocalDateTimeISOStart = function (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0] +" " +  newDate.toISOString().split('T')[1]
}

const convertUTCToLocalDateTimeISOEnd = function (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()+23, date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0] +" " +  newDate.toISOString().split('T')[1]
}