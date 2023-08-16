import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserResDto } from "../dto/user/user.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { UserInsertReqDto } from "../dto/user/user-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class UserService{
    constructor(private base : BaseService){}

    getAllUser():Observable<UserResDto[]>{
      return this.base.get<UserResDto[]>(`${BASE_URL}/users`);
    }

    getByRole(roleCode : string) : Observable<UserResDto[]>{
        return this.base.get<UserResDto[]>(`${BASE_URL}/users?roleCode=${roleCode}`);
    }

    create(data : UserInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/users`,data);
    }
}
