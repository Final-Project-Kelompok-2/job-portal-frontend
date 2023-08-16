import { Component } from "@angular/core";
import { Table } from "primeng/table";

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls:[ './question-list.component.css']
})
export class QuestionListComponent {
  loading = false

  clear(table:Table){
    table.clear()
  }
}
