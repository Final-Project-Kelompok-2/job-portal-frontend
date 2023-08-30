import { Component, OnInit } from "@angular/core";
import { ReportService } from "../../../service/report.service";
import { ReportResDto } from "../../../dto/report/report.res.dto";
import { firstValueFrom } from "rxjs";

@Component({
    selector : 'report',
    templateUrl : './report.component.html',
    styleUrls : ['./report.component.css']  
})
export class ReportComponent implements OnInit{

    reports! : ReportResDto[];
    constructor(private reportService : ReportService) {}

    ngOnInit(): void {
        firstValueFrom(this.reportService.getReport()).then(result =>{
            this.reports = result;
        })
    }
}