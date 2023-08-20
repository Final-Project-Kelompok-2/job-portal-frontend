import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

    job!: JobResDto
    jobId!: string


    constructor(private activated: ActivatedRoute,
        private jobService: JobService) {

    }

    ngOnInit(): void {
        this.activated.params.subscribe(result => {
            const id = result["id"]
            this.jobId = id
            this.getJobDetail(this.jobId)
        })



    }


    getJobDetail(jobId: string) {
        this.jobService.getDetail(jobId).subscribe(result => {
            this.job = result;
        })
    }


}