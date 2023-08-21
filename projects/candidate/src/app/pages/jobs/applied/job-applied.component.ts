import { Component, OnInit } from "@angular/core";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";

@Component({
    selector: 'job-applied',
    templateUrl: './job-applied.component.html',

})
export class JobAppliedComponent implements OnInit {


    appliedJob!: ApplicantResDto[]

    constructor(private applicantService: ApplicantService) {

    }

    ngOnInit(): void {
        this.getAppliedJob()
    }


    getAppliedJob() {
        this.applicantService.getByPrincipal().subscribe(result => {
            this.appliedJob = result
        })
    }


}