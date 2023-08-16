import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { InterviewInsertReqDto } from "../dto/interview/interview-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
   providedIn : 'root' 
})
export class InterviewService{
    constructor(private base : BaseService){}

    create(data : InterviewInsertReqDto) : Observable <InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/interviews`,data);
    }

}