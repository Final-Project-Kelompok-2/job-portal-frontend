import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";

@Component({
    selector: "job-list",
    templateUrl: "./job-list.component.html",
    styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {



    result = 'Loved'

    loading = true

    jobs!: JobResDto[]

    constructor(private jobService: JobService) {

    }

    ngOnInit() {
        this.getAllJob()
    }

    getAllJob() {
        this.jobService.getAll().subscribe(result => {
            this.jobs = result
        })
    }




}