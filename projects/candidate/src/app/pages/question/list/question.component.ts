import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { firstValueFrom } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { QuestionService } from "../../../service/question.service";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { QuestionAnswerInsertReqDto } from "../../../dto/question-answer/question-answer-insert.req.dto";
import { AnswerService } from "../../../service/question-answer.service";
import { AuthService } from "../../../service/auth.service";
import { testValidation } from "../../../validation/auth.validation";

@Component({
    selector: 'question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit, AfterViewChecked {
    appId!: string;
    index!: number;
    relogin!: Boolean
    question!: QuestionResDto[];
    answer: QuestionAnswerInsertReqDto[] = [];
    options!: [];
    answerDto = this.fb.group({
        applicantId: ['', Validators.required],
        answers: this.fb.array(this.answer)
    })
    constructor(
        private questionService: QuestionService,
        private activated: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef,
        private answerService: AnswerService,
        private route: Router,
        private authService: AuthService,) { }
    ngOnInit(): void {
        this.checkToken();
        firstValueFrom(this.activated.params).then(params => {
            this.appId = params['id'];
            this.answerDto.patchValue({
                applicantId: params['id']
            })
            this.getQuestion();

        })



    }

    checkToken() {
        const profile = this.authService.getProfile()
        if (!profile) {
           console.log('ERIL YANG SALAH')
        } else {
            console.log('BENAR')

        }
    }
    ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    get dataDto() {
        return this.answerDto.get(`answers`) as FormArray
    }

    getQuestion() {
        firstValueFrom(this.questionService.getByApplicant(this.appId)).then(result => {
            this.question = result;
            console.log('Question = ', this.question.length)

            for (let i = 0; i < this.question.length; i++) {
                // for(let i = 0 ; i < this.question[i].options.length ; i++){
                this.dataDto.push(
                    this.fb.group({
                        optionId: ['', [Validators.required]],
                        [`questionOptionId${this.dataDto.length}`]: []
                    })
                )
            }
        })
    }
    selected(event: any, index: number) {
        this.dataDto.at(index).patchValue({
            optionId: event.value
        })
    }

    onSubmit() {
        const data = this.answerDto.getRawValue();
        firstValueFrom(this.answerService.create(data)).then(() => {
            this.route.navigateByUrl('/dashboard')
        })
    }





}