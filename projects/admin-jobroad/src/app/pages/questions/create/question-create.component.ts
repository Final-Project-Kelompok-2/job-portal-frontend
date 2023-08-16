import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { QuestionInsertReqDto } from "../../../dto/question/question-insert.req.dto";
import { QuestionOptionInsertReqDto } from "../../../dto/question-option/question-option-insert.req.dto";

@Component({
  selector: 'question-create',
  templateUrl: './question-create.component.html'
})
export class QuestionCreateComponent implements OnInit {

  options = [{
    name: "True",
    value: true
  },
  {
    name: "False",
    value: false
  }]

  // packages!: QuestionPackageGetResDto[]
  // topics!: QuestionTopicGetResDto[]
  // types!: QuestionTypeGetResDto[]

  questionInsertDto: QuestionInsertReqDto[] = []
  questionOptionInsertdto: QuestionOptionInsertReqDto[] = []

  questionsInsertReqDto = this.fb.group(
    {
      data: this.fb.array(this.questionInsertDto)
    }
  )
  
  constructor(private fb: NonNullableFormBuilder,
    // private questionTypeService: QuestionTypeService,
    // private topicService: QuestionTopicService,
    // private packageService: QuestionPackageService,
    // private questionService: QuestionService,
    private router: Router) {

  }

  ngOnInit(): void {
    // this.getPackages()
    // this.getTopics()
    // this.getQuestionType()
  }

  get forms() {
    return this.questionsInsertReqDto.get("data") as FormArray
  }

  questionOption(i: number) {
    return this.forms.at(i).get("questionOptions") as FormArray
  }

  onAdd() {
    this.forms.push(this.fb.group({
      questionTypeId: [0, [Validators.required]],
      question: ['', [Validators.required]],
      questionOptions: this.fb.array(this.questionOptionInsertdto),
      questionTopicId: [0, [Validators.required]],
      questionPackageId: [0, [Validators.required]],
      [`questionTypeId${this.forms.length}`]: [],
    }))
  }



  patchByIndex(event: any, index: number) {
    this.forms.at(index).patchValue({
      questionTypeId: event.value
    })
  }

  remove(i: number) {
    this.forms.removeAt(i)
  }

  onAddOption(indexQuestion: number) {
    this.questionOption(indexQuestion).push(this.fb.group({
      optLabel: ['', [Validators.required]],
      correct: [false, [Validators.required]]
    }))
  }

  removeOption(indexQuestion: number, indexOption: number) {
    this.questionOption(indexQuestion).removeAt(indexOption)
  }



  // getQuestionType() {
  //   this.questionTypeService.getQuestionTypes().subscribe(result => {
  //     this.types = result
  //   })
  // }

  // getPackages() {
  //   this.packageService.getPackage().subscribe(result => {
  //     this.packages = result
  //   })
  // }

  // getTopics() {
  //   this.topicService.getTopics().subscribe(result => {
  //     this.topics = result
  //   })
  // }

  chosenOption(index: number, id: number) {
    this.forms.at(index).patchValue({
      questionTypeId: id
    })
  }

  onSubmit() {
    // const data = this.questionsInsertReqDto.getRawValue().data
    // this.questionService.createQuestions(data).subscribe(result => {
    //   console.log(result)
    //   this.router.navigateByUrl('/questions')
    // }
    // )
  }
}
