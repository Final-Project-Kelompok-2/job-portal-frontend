import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { firstValueFrom } from "rxjs";

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
        firstValueFrom(this.applicantService.create(applicantDto)).then(result => {
            this.router.navigateByUrl("/dashboard")

        })
    }

    ngOnInit(): void {
        firstValueFrom(this.activated.params).then(result => {
            const id = result["id"]
            this.jobId = id
            this.getJobDetail(this.jobId)
        })
    }

    getJobDetail(jobId: string) {
        firstValueFrom(this.jobService.getDetail(jobId)).then(result => {
            this.job = result;
        })
    }


}