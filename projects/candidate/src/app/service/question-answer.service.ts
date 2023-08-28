import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { QuestionAnswersInsertReqDto } from "../dto/question-answer/question-answers-insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "../dto/insert.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { QuestionAnswerResDto } from "../dto/question-answer/question-answer.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AnswerService{
    constructor(private base : BaseService){}

    create(data : QuestionAnswersInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/question-answers`,data);
    }

    getByApplicant(id : string) : Observable<QuestionAnswerResDto[]>{
        return this.base.get<QuestionAnswerResDto[]>(`${BASE_URL}/question-answers?id=${id}`);
    }
}