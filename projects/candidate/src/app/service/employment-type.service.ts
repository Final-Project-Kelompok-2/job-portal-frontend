import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmployementTypeResDto } from "../dto/employement-type/employement-type.res.dto";
import { BaseService } from "./base.service";
import { BASE_URL } from "../constant copy/api.constant";

@Injectable({
    providedIn : 'root'
})
export class EmploymentTypeService{
    constructor(private base : BaseService){}
    getAll() : Observable<EmployementTypeResDto[]>{
        return this.base.get<EmployementTypeResDto[]>(`${BASE_URL}/employment-types`);
    }
}
