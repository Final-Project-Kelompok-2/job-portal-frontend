import { Component, OnInit } from "@angular/core";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { firstValueFrom } from "rxjs";
import { AssignedQuestionService } from "../../../service/assigned-job.service";
import { AssignedJobQuestionResDto } from "../../../dto/assigned-job-question/assigned-job-question.res.dto";
import { Router } from "@angular/router";


@Component({
    selector: 'job-applied',
    templateUrl: './job-applied.component.html',

})
export class JobAppliedComponent implements OnInit {


    appliedJob!: ApplicantResDto[]
    assignedQuestion!: AssignedJobQuestionResDto[];
    constructor(private applicantService: ApplicantService,
        private assignedQuestionService: AssignedQuestionService,
        private router: Router) {

    }

    ngOnInit(): void {
        this.getAppliedJob();

    }


    getAppliedJob() {
        firstValueFrom(this.applicantService.getByPrincipal()).then(result => {
            this.appliedJob = result

        })
    }

    getQuestion(jobId: string, appId: string) {
        console.log('question')
        firstValueFrom(this.assignedQuestionService.getByJob(jobId)).then(result => {
            if (result.length != 0) {
                console.log('result => ', result);
                this.assignedQuestion = result
                this.router.navigateByUrl(`/questions/${appId}`)
            } else {
                console.log('Kosong');
            }
        })
    }


    checker(statusName: string) {
        if (statusName == "APPLIED") {
            return "info";
        }
        else if (statusName == "HIRED") {
            return "success"
        }
        else if (statusName == "REJECT") {
            return "danger"
        }
        else {
            return "warning"
        }
    }

}