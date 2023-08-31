import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ReportService } from "../../../service/report.service";
import { ReportResDto } from "../../../dto/report/report.res.dto";
import { firstValueFrom } from "rxjs";
import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";
import { convertUTCToLocalDateTime } from "../../../util/convert-date.util";

@Component({
    selector: 'report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewChecked {
    reports!: ReportResDto[];
    startDate!: string;
    endDate!: string;

    reportUrl = ""

    filterData = this.fb.group({
        startDateTemp: ['', [Validators.required]],
        endDateTemp: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
    })

    constructor(
        private reportService: ReportService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef) { }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    ngOnInit(): void {
        this.getReports(this.startDate, this.endDate);
    }
    getReports(start: string, end: string) {
        firstValueFrom(this.reportService.getReport(start, end)).then(result => {
            this.reports = result;
        })
    }

    convertStartDate(event: any) {
        this.filterData.patchValue({
            startDate: convertUTCToLocalDateTime(event)
        })
    }


    convertEndDate(event: any) {
        this.filterData.patchValue({
            endDate: convertUTCToLocalDateTime(event)
        })

    }

    filter() {
        console.log("Start Date :   " + this.startDate);
        console.log("End Date :   " + this.endDate);
        const newStartDate = convertUTCToLocalDateTimeISOStart(this.startDate as string);
        let newEndDate: string = '';
        if (this.endDate != null) {
            newEndDate = convertUTCToLocalDateTimeISOEnd(this.endDate as string);
            console.log("New End Date :  " + newEndDate);

        }
        console.log("New Start Date :  " + newStartDate);
        this.getReports(newStartDate, newEndDate);

        this.reportUrl = `http://localhost:8080/reports/download?startDate=${newStartDate}&endDate=${newEndDate}`
        console.log(this.reportUrl);
    }



}
const convertUTCToLocalDateTimeISOStart = function (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0] + " " + newDate.toISOString().split('T')[1]
}

const convertUTCToLocalDateTimeISOEnd = function (date: any) {
    const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 23, date.getMinutes(), date.getSeconds()));
    return newDate.toISOString().split('T')[0] + " " + newDate.toISOString().split('T')[1]
}