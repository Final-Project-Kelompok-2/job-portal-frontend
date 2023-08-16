import { Component } from "@angular/core";
import { Table } from "primeng/table";

@Component({
  selector: 'candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls:['./candidate-list.component.css']
})
export class CandidateListComponent {
  loading = false

  clear(table: Table) {
    table.clear();
  }
}
