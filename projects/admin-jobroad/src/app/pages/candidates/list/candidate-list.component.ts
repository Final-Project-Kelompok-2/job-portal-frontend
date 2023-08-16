import { Component } from "@angular/core";
import { Table } from "primeng/table";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";

@Component({
  selector: 'candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls:['./candidate-list.component.css']
})
export class CandidateListComponent {
  loading = false
  candidates!:CandidateUserResDto[]

  clear(table: Table) {
    table.clear();
  }
}
