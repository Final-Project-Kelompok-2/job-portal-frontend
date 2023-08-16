import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EmployeeResDto } from "../dto/employee/employee.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class EmployeeService{
    constructor(private base : BaseService){}

    getAll() : Observable<EmployeeResDto[]>{
        return this.base.get<EmployeeResDto[]>(`${BASE_URL}/employees`)
    }
}