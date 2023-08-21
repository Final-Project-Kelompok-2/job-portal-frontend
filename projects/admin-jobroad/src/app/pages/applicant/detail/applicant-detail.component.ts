import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, Subscription } from "rxjs";
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

@Component({
    selector: 'applicant-detail',
    templateUrl: './applicant-detail.component.html'
})
export class ApplicantDetailComponent implements OnInit, OnDestroy {
    jobId!: string;
    appId!: string;
    status!: MenuItem[] | undefined;
    activeIndex: number = 0;


    //Master Data
    applicant?: ApplicantResDto;
    job!: JobResDto;
    pic?: UserResDto;

    //Master Subscription
    applicantSubscription!: Subscription;
    jobSubcription!: Subscription;
    picSubscription!: Subscription;

    //Transaction Data
    assesmentData?: AssementResDto;
    interviewData?: InterviewResDto;
    reviewData?: ReviewResDto;
    mcuDatas!: McuResDto[];

    //Transaction Subscription
    assesmentSubscription!: Subscription;
    interviewSubscription!: Subscription;
    reviewSubscription!: Subscription;
    mcuSubscription!: Subscription;

    assesmentForm = false;
    assesmentNoteForm = false;
    interviewForm = false;
    interviewNoteForm = false;
    mcuForm = false;
    offeringForm = false;  


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
        applicantId: ['', Validators.required],
        applicantCode: [''],
        statusCode: [''],
        interviewDate: ['', Validators.required],
        interviewLocation: ['', Validators.required]
    })
    reviewReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        notes: ['', Validators.required]
    })

    mcuReqDto = this.fb.group({
        applicantId : ['',Validators.required],
        applicantCode : ['',Validators.required],
        statusCode : ['',Validators.required],
        mcuData : this.fb.array([McuResDto])
    })

    offeringReqDto = this.fb.group({
        applicantId : ['',Validators.required],
        applicantCode : ['',Validators.required],
        statusCode : ['',Validators.required],
        address : ['',Validators.required],
        salary : [0,Validators.required]
    })

    constructor(private activated: ActivatedRoute,
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
        private reviewService: ReviewService) { }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
        if (event == 1) {
            this.getAssesmentData();
        } else if (event == 2) {
            this.InterviewData();
            this.getReviewData();
        } else if (event == 3) {
            this.getMcuData();
        } else if (event == 4) {

        }
    }
    loading = false;

    ngOnInit(): void {
        getParams(this.activated, 0).subscribe(params => {
            this.jobId = params['jobId'];
            this.appId = params['applicantId'];
            this.assesmentReqDto.patchValue({
                applicantId: params['applicantId']
            })
            this.interviewReqDto.patchValue({
                applicantId: params['applicantId']
            })
            this.applicantSubscription = this.applicantService.getById(params['applicantId']).subscribe(result => {
                this.applicant = result;
                
                this.interviewReqDto.patchValue({
                    applicantCode: this.applicant.applicantCode,
                    statusCode: this.applicant.statusCode
                })
            })
            this.jobSubcription = this.jobService.getByDetail(this.jobId).subscribe(result => {
                this.job = result;
                this.picSubscription = this.userService.getById(this.job.picId).subscribe(result => {
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
            },
            {
                label: 'Hired',
                command: (event: any) => this.messageService.add({ severity: 'info', summary: 'Sixth Step', detail: event.item.label })
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
    submitAssesment() {
        this.activeIndex = 1
        const data = this.assesmentReqDto.getRawValue();
        this.assesmentSubscription = this.assesmentService.create(data).subscribe(() => {
            this.assesmentForm = false;
            this.getAssesmentData()
        });

        this.assesmentReqDto.reset();
    }
    assesmentClick() {
        console.log(this.assesmentForm)
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
        this.assesmentService.updateNotes(data).subscribe(()=>{
            this.assesmentNoteForm = false;
            this.getAssesmentData();
            this.assesmentNotesReqDto.reset();
        });
    }
    getAssesmentData() {
        this.assesmentSubscription = this.assesmentService.getByApplicant(this.appId).subscribe(result => {
            this.assesmentData = result;
            console.log(this.assesmentData)
        })

    }

    interviewClick() {
        console.log(this.interviewForm)
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
        this.reviewService.updateNotes(data).subscribe(() => {
            this.interviewNoteForm = false;
            this.reviewReqDto.reset();
            this.getReviewData();
        });

    }

    interviewSubmit() {
        const data = this.interviewReqDto.getRawValue();
        this.interviewService.create(data).subscribe(() => {
            this.InterviewData();
            this.activeIndex++;
            this.interviewForm = false;
        });
        this.getReviewData();


    }
    getReviewData() {
        this.reviewSubscription = this.reviewService.getByApplicant(this.appId).subscribe(result => {
            this.reviewData = result;
        })
    }

    InterviewData() {
        this.interviewSubscription = this.interviewService.getByApplicant(this.appId).subscribe(result => {
            this.interviewData = result;

        })
    }

    mcuClick(){
        this.mcuReqDto.patchValue({
            applicantId : this.appId,
            applicantCode : this.applicant?.applicantCode,
            statusCode : this.applicant?.statusCode
        })
        return this.mcuForm = !this.mcuForm;
    }

    getMcuData() {
        this.mcuSubscription = this.mcuService.getByApplicant(this.appId).subscribe(result => {
            this.mcuDatas = result;
            console.log(this.mcuDatas);
        })
    }

    submitMcu(){
        const data = this.mcuReqDto.getRawValue();
        this.mcuService.create(data).subscribe(()=>{
            this.mcuForm = false;
            this.activeIndex++;
            this.mcuReqDto.reset();
        })
    }

    get mcuDataListReqDto(){
        return this.mcuReqDto.get("mcuData") as FormArray
    }

    ngOnDestroy(): void {
        this.applicantSubscription.unsubscribe();
        this.jobSubcription.unsubscribe();
        this.picSubscription.unsubscribe();
        this.assesmentSubscription.unsubscribe();
        this.interviewSubscription.unsubscribe();
        this.reviewSubscription.unsubscribe();
        // this.mcuSubscription.unsubscribe();
    }
    fileUpload(event: any) {
        this.mcuDataListReqDto.clear();
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
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.mcuDataListReqDto.push(this.fb.control({
                    fileName: result.substring(result.indexOf(",") + 1, result.length),
                    fileExtension: file.name.substring(file.name.indexOf(".") + 1, file.name.length)
                })
                )
            })
        }
    }

    offeringClick(){
        this.offeringReqDto.patchValue({
            applicantId : this.appId,
            applicantCode : this.applicant?.applicantCode,
            statusCode : this.applicant?.statusCode
        })
        return this.offeringForm = !this.offeringForm;
    }

    offeringSubmit(){
        const data = this.offeringReqDto.getRawValue();
        this.offeringService.create(data).subscribe(()=>{
            this.offeringForm = false;
            this.activeIndex++;
            this.offeringReqDto.reset();
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