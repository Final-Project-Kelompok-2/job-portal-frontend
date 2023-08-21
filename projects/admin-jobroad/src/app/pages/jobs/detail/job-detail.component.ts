import { Component, OnDestroy, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Table } from "primeng/table";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, OnDestroy {
    job?: JobResDto;
    applicant!: ApplicantResDto[];
    jobSubscription!: Subscription
    applicantSubscription!: Subscription;
    loading = false;
    jobId!: string;
    constructor(private jobService: JobService,
        private applicantService: ApplicantService, private activated: ActivatedRoute) { }
    ngOnInit(): void {
        this.activated.params.subscribe(param => {
            this.jobSubscription = this.jobService.getByDetail(param['id']).subscribe(result => {
                this.job = result;
            });
            this.jobId = param['id'];
            this.applicantSubscription = this.applicantService.getByJob(param['id']).subscribe(result => {
                this.applicant = result;
            });
        })

    }
    ngOnDestroy(): void {
        this.jobSubscription.unsubscribe();
        this.applicantSubscription.unsubscribe();
    }
    clear(table: Table) {
        table.clear();
    }
}