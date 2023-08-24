import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subscription, firstValueFrom } from "rxjs";
import { MenuItem, MessageService } from "primeng/api";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { AssesmentService } from "../../../service/assesment.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";
import { AssementResDto } from "../../../dto/assessment/assement.res.dto";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { JobService } from "../../../service/job.service";
import { UserService } from "../../../service/user.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { ApplicantService } from "../../../service/applicant.service";
import { InterviewService } from "../../../service/interview.service";
import { McuService } from "../../../service/mcu.service";
import { OfferingService } from "../../../service/offering.service";
import { HiredService } from "../../../service/hired.service";
import { InterviewResDto } from "../../../dto/interview/interviewe.res.dto";
import { ReviewResDto } from "../../../dto/review/review.res.dto";
import { ReviewService } from "../../../service/review.service";
import { McuResDto } from "../../../dto/mcu/mcu.res.dto";
import { HiringStatusEnum } from "../../../constant/hiring-status.constant";
import { employmentTypeEnum } from "../../../constant/employment-type.constant";
import { BenefitService } from "../../../service/benefit.service";

@Component({
    selector: 'applicant-detail',
    templateUrl: './applicant-detail.component.html',
    styleUrls: ['./applicant-detail.component.css']
})
export class ApplicantDetailComponent implements OnInit {
    jobId!: string;
    appId!: string;
    status!: MenuItem[] | undefined;
    activeIndex: number = 0;
    intern = employmentTypeEnum.INTERN;
    contract = employmentTypeEnum.CONTRACT;

    //Master Data
    applicant?: ApplicantResDto;
    job!: JobResDto;
    pic?: UserResDto;

    //Transaction Data
    assesmentData?: AssementResDto;
    interviewData?: InterviewResDto;
    reviewData?: ReviewResDto;
    mcuDatas!: McuResDto[];


    assesmentForm = false;
    assesmentNoteForm = false;
    interviewForm = false;
    interviewNoteForm = false;
    mcuForm = false;
    offeringForm = false;
    hiringForm = false;
    loading = false;

    applicantReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusId: ['', Validators.required],
        statusCode: ['', Validators.required]
    })

    assesmentReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        assesmentLocation: ['', Validators.required],
        assesmentDate: ['', Validators.required]
    })
    assesmentNotesReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        notes: ['', Validators.required]
    })

    interviewReqDto = this.fb.group({
        applicantId: [null, Validators.required],
        applicantCode: [null],
        statusCode: [null],
        interviewDate: [null, Validators.required],
        interviewLocation: [null, Validators.required]
    })
    reviewReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        notes: ['', Validators.required]
    })

    mcuReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusCode: ['', Validators.required],
        mcuData: this.fb.array([])
    })

    offeringReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: ['', Validators.required],
        statusCode: ['', Validators.required],
        address: ['', Validators.required],
        salary: [0, Validators.required]
    })

    hiringReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        applicantCode: [''],
        statusId: [''],
        statusCode: [''],
        startDate: ['', Validators.required],
        endDate: [null]
    })

    constructor(private router: Router,
        private activated: ActivatedRoute,
        private messageService: MessageService,
        private fb: NonNullableFormBuilder,
        private assesmentService: AssesmentService,
        private jobService: JobService,
        private userService: UserService,
        private applicantService: ApplicantService,
        private interviewService: InterviewService,
        private mcuService: McuService,
        private offeringService: OfferingService,
        private hiredService: HiredService,
        private reviewService: ReviewService
    ) { }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
        if (this.activeIndex == 1) {
            this.getAssesmentData();
        } else if (this.activeIndex == 2) {
            this.InterviewData();
            this.getReviewData();
        } else if (this.activeIndex == 3) {
            this.getMcuData();
        }
    }


    ngOnInit(): void {
        firstValueFrom(getParams(this.activated, 0)).then(params => {
            this.jobId = params['jobId'];
            this.appId = params['applicantId'];
            this.assesmentReqDto.patchValue({
                applicantId: params['applicantId']
            })
            this.interviewReqDto.patchValue({
                applicantId: params['applicantId']
            })
            firstValueFrom(this.applicantService.getById(params['applicantId'])).then(result => {
                this.applicant = result;
                if (this.applicant.statusCode == HiringStatusEnum.APPLIED) {
                    this.activeIndex = 0
                } else if (this.applicant.statusCode == HiringStatusEnum.ASSESMENT) {
                    this.activeIndex = 1
                } else if (this.applicant.statusCode == HiringStatusEnum.HIRED) {
                    this.activeIndex = 2
                } else if (this.applicant.statusCode == HiringStatusEnum.MCU) {
                    this.activeIndex = 3
                } else if (this.applicant.statusCode == HiringStatusEnum.OFFERING) {
                    this.activeIndex = 4
                } else {
                    this.activeIndex = 0
                }
                this.interviewReqDto.patchValue({
                    // applicantCode: this.applicant.applicantCode,
                    // statusCode: this.applicant.statusCode
                })
            })
            firstValueFrom(this.jobService.getByDetail(this.jobId)).then(result => {
                this.job = result;
                firstValueFrom(this.userService.getById(this.job.picId)).then(result => {
                    this.pic = result;
                })
            })

        })
        this.status = [
            {
                label: 'Applied',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label })
            },
            {
                label: 'Assesment',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Second Step', detail: event.item.label })

            },
            {
                label: 'Interview User',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Third Step', detail: event.item.label })
            },
            {
                label: 'MCU',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Fourth Step', detail: event.item.label })
            },
            {
                label: 'Offering',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Fifth Step', detail: event.item.label })
            }
        ]

    }

    get isApplied() {
        return this.activeIndex == 0;
    }

    get isAssesment() {
        return this.activeIndex == 1;
    }

    get isInterview() {
        return this.activeIndex == 2;
    }

    get isMcu() {
        return this.activeIndex == 3;
    }

    get isOffering() {
        return this.activeIndex == 4;
    }

    get isHired() {
        return this.activeIndex == 5;
    }

    get mcuDataListReqDto() {
        return this.mcuReqDto.get("mcuData") as FormArray
    }

    reject() {
        this.applicantReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusId: this.applicant?.statusId,
            statusCode: HiringStatusEnum.REJECT
        })
        const data = this.applicantReqDto.getRawValue();

        this.loading = true
        firstValueFrom(this.applicantService.update(data)).then(() => {
            this.loading = false
            this.router.navigateByUrl(`/jobs/detail/${this.jobId}`);
        }).catch(() => {
            this.loading = false;
        })
            ;

    }

    submitAssesment() {
        const data = this.assesmentReqDto.getRawValue();
        this.loading = true;
        firstValueFrom(this.assesmentService.create(data)).then(() => {
            this.assesmentForm = false;
            this.getAssesmentData();
            this.activeIndex++;
            this.assesmentReqDto.reset();
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })



    }
    assesmentClick() {
        return this.assesmentForm = !this.assesmentForm;
    }

    assesmentNoteClick() {
        this.assesmentNotesReqDto.patchValue({
            applicantId: this.appId
        })
        return this.assesmentNoteForm = !this.assesmentNoteForm;
    }
    assesmentNotesUpdate() {
        const data = this.assesmentNotesReqDto.getRawValue();
        firstValueFrom(this.assesmentService.updateNotes(data)).then(() => {
            this.assesmentNoteForm = false;
            this.getAssesmentData();
            this.assesmentNotesReqDto.reset();
        });
    }
    getAssesmentData() {
        this.loading = false;
        firstValueFrom(this.assesmentService.getByApplicant(this.appId)).then(result => {
            this.assesmentData = result;
        })

    }

    interviewClick() {
        return this.interviewForm = !this.interviewForm
    }

    interviewNoteClick() {
        this.reviewReqDto.patchValue({
            applicantId: this.appId
        })
        return this.interviewNoteForm = !this.interviewNoteForm;
    }
    interviewNotesUpdate() {
        const data = this.reviewReqDto.getRawValue();
        firstValueFrom(this.reviewService.updateNotes(data)).then(() => {
            this.interviewNoteForm = false;
            this.reviewReqDto.reset();
            this.getReviewData();
        });

    }

    interviewSubmit() {
        this.loading = true;
        const data = this.interviewReqDto.getRawValue();
        firstValueFrom(this.interviewService.create(data)).then(() => {
            this.getReviewData();
            this.InterviewData();
            this.activeIndex++;
            this.interviewForm = false;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });


    }
    getReviewData() {
        firstValueFrom(this.reviewService.getByApplicant(this.appId)).then(result => {
            this.reviewData = result;
        })
    }

    InterviewData() {
        firstValueFrom(this.interviewService.getByApplicant(this.appId)).then(result => {
            this.interviewData = result;

        })
    }

    mcuClick() {
        this.mcuDataListReqDto.reset();
        this.mcuReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusCode: this.applicant?.statusCode
        })
        return this.mcuForm = !this.mcuForm;
    }

    getMcuData() {
        firstValueFrom(this.mcuService.getByApplicant(this.appId)).then(result => {
            this.mcuDatas = result;
            console.log(this.mcuDatas);
        })
    }

    submitMcu() {
        this.loading = true
        const data = this.mcuReqDto.getRawValue();
        firstValueFrom(this.mcuService.create(data)).then(() => {
            this.getMcuData();
            this.mcuForm = false;
            this.activeIndex++;
            this.mcuReqDto.reset();
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

   


    fileUpload(event: any) {
        // this.mcuDataListReqDto.clear();
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                this.mcuDataListReqDto.push(this.fb.control({
                    fileName: result.substring(result.indexOf(",") + 1, result.length),
                    fileExtension: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                })
                )
            })
        }
    }

    fileRemove(event : any, index:number){
        let length = this.mcuDataListReqDto.length
        console.log('panjang file = '+length)
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });
        let file = event.file
        // for (let file of event.files) {
            toBase64(file).then(() => {
                this.mcuDataListReqDto.removeAt(file[length+1])
            })
        // }
    }

    offeringClick() {
        this.offeringReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode,
            statusCode: this.applicant?.statusCode
        })
        return this.offeringForm = !this.offeringForm;
    }

    offeringSubmit() {
        this.loading = true;
        const data = this.offeringReqDto.getRawValue();
        firstValueFrom(this.offeringService.create(data)).then(() => {
            this.offeringForm = false;
            this.activeIndex++;
            this.offeringReqDto.reset();
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }
    accept() {
        this.hiringReqDto.patchValue({
            applicantId: this.appId,
            applicantCode: this.applicant?.applicantCode
        })
        this.hiringForm = !this.hiringForm;
    }

    hiringSubmit() {
        this.loading = true;
        const data = this.hiringReqDto.getRawValue();
        firstValueFrom(this.hiredService.create(data)).then(() => {
            this.loading = false;
            this.router.navigateByUrl(`/jobs/detail/${this.jobId}`);
        }).catch(() => {
            this.loading = false;
        });
    }

}


function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
    let route = activatedRoute
    if (parentLevel) {
        for (let i = 0; i < parentLevel; i++) {
            if (route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}