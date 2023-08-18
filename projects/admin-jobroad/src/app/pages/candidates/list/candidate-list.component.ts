import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";

@Component({
  selector: 'candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  loading = false
  candidates!: CandidateUserResDto[]

  constructor(private candidateService: CandidateUserService) {

  }
  ngOnInit(): void {
    this.getAllCandidates()
  }

  getAllCandidates() {
    this.candidateService.getAll().subscribe(result => {
      this.candidates = result
    })
  }

  clear(table: Table) {
    table.clear();
  }
}
