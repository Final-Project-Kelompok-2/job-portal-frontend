import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { firstValueFrom } from "rxjs";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateCheckDataResDto } from "../../../dto/candidate/candidate-check-data.res.dto";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

    job?: JobResDto
    jobId!: string
    visible: boolean = false;
    isValid!: CandidateCheckDataResDto
    askToProfile: boolean = false


    constructor(private activated: ActivatedRoute,
        private jobService: JobService,
        private applicantService: ApplicantService,
        private router: Router,
        private candidateService: CandidateUserService) {

    }

    apply(jobId: string) {
        // this.visible = true
        const applicantDto = {
            jobId
        }

        firstValueFrom(this.candidateService.checkData()).then(result => {
            this.isValid = result

            if (this.isValid.valid) {
                firstValueFrom(this.applicantService.create(applicantDto)).then(result => {
                    this.router.navigateByUrl("/dashboard")
                })
            }
            else {
                this.askToProfile = !this.askToProfile
            }
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