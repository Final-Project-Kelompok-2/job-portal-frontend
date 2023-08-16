import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { HiringStatusResDto } from "../dto/hiring-status/hiring-status.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class HiringStatusService{
    constructor(private base : BaseService){}
    getAll() : Observable<HiringStatusResDto[]>{
        return this.base.get<HiringStatusResDto[]>(`${BASE_URL}/hiring-status`);
    }
}