import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyResDto } from "../dto/company/company.res.dto";
import { BASE_URL } from "../constant copy/api.constant";


@Injectable({
    providedIn : 'root'
})
export class CompanyService{
    constructor(private base : BaseService){}
    getAll() : Observable<CompanyResDto[]>{
        return this.base.get<CompanyResDto[]>(`${BASE_URL}/companies`);

    }

}
