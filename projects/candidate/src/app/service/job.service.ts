import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { JobResDto } from "../dto/job/job.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { JobInsertReqDto } from "../dto/job/job-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class JobService{
    constructor(private base : BaseService){}

    getAll() : Observable<JobResDto[]>{
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs`);
    }



    getByPrincipal() : Observable<JobResDto[]>{
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs/person`);
    }

    getByCompany(code : string) : Observable<JobResDto[]>{
        return this.base.get<JobResDto[]>(`${BASE_URL}/jobs/company`);
    }
}