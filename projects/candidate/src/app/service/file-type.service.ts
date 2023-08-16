import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";

import { BASE_URL } from "../constant/api.constant";
import { FileTypeResDto } from "../dto/file-type/file-type.res.dto";

@Injectable({
    providedIn : 'root'
})
export class FileTypeService{
    constructor(private base : BaseService){}
    getAll() : Observable<FileTypeResDto[]> {
        return this.base.get<FileTypeResDto[]>(`${BASE_URL}/file-types`);
    }
}