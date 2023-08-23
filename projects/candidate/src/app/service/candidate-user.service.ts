import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant/api.constant";
import { CandidateMasterResDto } from "../dto/candidate-user/candidate-master.res.dto";
import { ChangePasswordReqDto } from "../dto/candidate-user/candidate-user-change-password.req.dto";
import { CandidateUserInsertReqDto } from "../dto/candidate-user/candidate-user-insert.req.dto";
import { CandidateMasterInsertReqDto } from "../dto/candidate/candidate-master-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { UpdateResDto } from "../dto/update.res.dto";
import { CandidateUserUpdateReqDto } from "../dto/candidate-user/candidate-user-update.req.dto";


@Injectable({
    providedIn: 'root'
})
export class CandidateUserService {
    constructor(private base: BaseService) { }

    register(data: CandidateUserInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidate-user`, data);
    }
    changePassword(data: ChangePasswordReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-user/password`, data);
    }

    getById(id: string): Observable<CandidateMasterResDto> {
        return this.base.get<CandidateMasterResDto>(`${BASE_URL}/candidate-user?id=${id}`)
    }

    update(data: CandidateUserUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/candidate-user/`, data)
    }

}
