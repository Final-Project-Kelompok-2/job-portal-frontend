import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { PersonTypeResDto } from "../dto/person-type/person-type.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class PersonTypeService{
    constructor(private base : BaseService){}
    getAll() : Observable<PersonTypeResDto[]>{
        return this.base.get<PersonTypeResDto[]>(`${BASE_URL}/person-types`);
    }

}