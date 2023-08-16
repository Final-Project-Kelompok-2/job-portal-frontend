import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { CandidateUserInsertReqDto } from "../dto/candidate-user/candidate-user-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { CandidateMasterInsertReqDto } from "../dto/candidate/candidate-master-insert.req.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateUserService{
    constructor(private base : BaseService){}
  

    create(data : CandidateUserInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-user`,data);
    }

    register(data : CandidateMasterInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-user`,data);
    }

 
}