import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { QuestionService } from "../../../service/question.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls:[ './question-list.component.css']
})
export class QuestionListComponent implements OnInit,OnDestroy{
  loading = false
  questions! : QuestionResDto[];
  questionTest! : Subscription;
  constructor(private questionService : QuestionService){}
  ngOnInit(): void {
     this.questionTest = this.questionService.getAll().subscribe(result => {
      this.questions = result;
    })
  }

  clear(table:Table){
    table.clear()
  }
  ngOnDestroy(): void {
    this.questionTest.unsubscribe();
  }
}
