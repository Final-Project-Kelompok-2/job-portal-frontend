import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { AssesmentInsertReqDto } from "../dto/assessment/assessment-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AssesmentService{
    constructor(private base : BaseService){}
  

    create(data : AssesmentInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/assesments`,data);
    }

   
}