import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  loading = false
  jobs! : JobResDto[];
  constructor(private jobService : JobService){}

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.jobService.getAll().subscribe(result =>{
      this.jobs = result;
    })
  }

  clear(table: Table) {
    table.clear();
  }
}
