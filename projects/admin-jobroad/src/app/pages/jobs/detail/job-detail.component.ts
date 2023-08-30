import { Component, OnDestroy, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { Subscription, firstValueFrom } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Table } from "primeng/table";
import { HiringStatusEnum } from "../../../constant/hiring-status.constant";
import { BaseService } from "../../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  imageUrlBanner!: string
  imageUrlCompany!: string
  job?: JobResDto;
  applicant!: ApplicantResDto[];
  jobSubscription!: Subscription
  applicantSubscription!: Subscription;
  loading = false;
  jobId!: string;
  reject = HiringStatusEnum.REJECT;
  hired = HiringStatusEnum.HIRED;

  constructor(
    private jobService: JobService,
    private applicantService: ApplicantService,
    private activated: ActivatedRoute,
    private base: BaseService,
    private title: Title
  ) {

    this.title.setTitle("Job Detail")
  }



  ngOnInit(): void {


    firstValueFrom(this.activated.params).then(param => {
      this.jobSubscription = this.jobService.getByDetail(param['id']).subscribe(result => {
        this.job = result;
        if (this.job?.fileId) {
          this.imageUrlBanner = `http://localhost:8080/files/${this.job?.fileId}`
        }
        else {
          this.imageUrlBanner = '../../../../assets/bannerJob.jpeg'
        }


        if (this.job?.companyPhotoId) {
          this.imageUrlCompany = `http://localhost:8080/files/${this.job?.companyPhotoId}`

        }
        else {
          this.imageUrlCompany = '../../../../assets/companyLogo.png'
        }
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

}
