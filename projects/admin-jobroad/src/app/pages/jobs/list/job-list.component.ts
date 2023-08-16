import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { Subscription } from "rxjs";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit,OnDestroy {
  loading = false
  jobs! : JobResDto[];
  jobSubscription! : Subscription;
  constructor(private jobService : JobService){}

  ngOnInit(): void {
      this.jobSubscription =  this.jobService.getAll().subscribe(result =>{
        this.jobs = result;
      })
  }

  ngOnDestroy(): void {
    this.jobSubscription.unsubscribe();
  }
  clear(table: Table) {
    table.clear();
  }
}
