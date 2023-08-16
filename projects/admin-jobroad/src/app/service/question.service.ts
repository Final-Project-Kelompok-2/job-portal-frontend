import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionResDto } from "../dto/question/question.res.dto";
import { BASE_URL } from "../constant/api.constant";
import { QuestionInsertReqDto } from "../dto/question/question-insert.req.dto";
import { InsertResDto } from "../dto/insert.res.dto";
import { QuestionsInsertReqDto } from "../dto/question/questions-insert.req.dto";

@Injectable({
    providedIn : 'root'
})
export class QuestionService{
    constructor(private base : BaseService){}
    
    getAll() : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions`);
    }

    create(data : QuestionsInsertReqDto) : Observable<InsertResDto>{
        console.log("Question data => ",data);
        return this.base.post<InsertResDto>(`${BASE_URL}/questions`,data);
    }
}