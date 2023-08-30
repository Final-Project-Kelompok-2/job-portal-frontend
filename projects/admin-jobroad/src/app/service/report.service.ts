import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { Injectable } from "@angular/core";
import { ReportResDto } from "../dto/report/report.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    constructor(private base: BaseService) { }

    getReport(): Observable<ReportResDto[]> {
        return this.base.getWithoutPipe<ReportResDto[]>(`${BASE_URL}/reports`);
    }
}