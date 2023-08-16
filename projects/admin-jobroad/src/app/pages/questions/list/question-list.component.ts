import { Component } from "@angular/core";
import { Table } from "primeng/table";
import { QuestionResDto } from "../../../dto/question/question.res.dto";

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls:[ './question-list.component.css']
})
export class QuestionListComponent {
  loading = false

  questions! : QuestionResDto[]

  clear(table:Table){
    table.clear()
  }
}
