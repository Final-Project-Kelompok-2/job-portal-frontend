import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})
export class JobService{
    constructor(private base : BaseService){}

    getAll() : Observable<Job
}