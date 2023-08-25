import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionResDto } from "../dto/question/question.res.dto";
import { BASE_URL } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    constructor(private base: BaseService) { }

    getByApplicant(id : string) : Observable<QuestionResDto[]> {
        console.log('id',id)
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions?applicantId=${id}`)
    }


}
