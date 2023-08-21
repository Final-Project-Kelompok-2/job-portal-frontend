import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

    job?: JobResDto
    jobId!: string
    visible: boolean = false;



    constructor(private activated: ActivatedRoute,
        private jobService: JobService,
        private applicantService: ApplicantService,
        private router: Router) {

    }

    apply(jobId: string) {
        // this.visible = true
        const applicantDto = {
            jobId
        }
        this.applicantService.create(applicantDto).subscribe(result => {
            this.router.navigateByUrl("/dashboard")

        })
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