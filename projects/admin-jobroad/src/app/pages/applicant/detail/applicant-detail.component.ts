import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { MenuItem, MessageService } from "primeng/api";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { AssesmentService } from "../../../service/assesment.service";
import { ApplicantResDto } from "../../../dto/applicant/applicant.res.dto";

@Component({
    selector: 'applicant-detail',
    templateUrl: './applicant-detail.component.html'
})
export class ApplicantDetailComponent implements OnInit {
    jobId!: string;
    appId!: string;
    status!: MenuItem[] | undefined;
    activeIndex: number = 0;
    applicant! : ApplicantResDto;
    assesmentReqDto = this.fb.group({
        applicantId: ['', Validators.required],
        assesmentLocation: ['', Validators.required],
        assesmentDate: ['', Validators.required]
    })
    constructor(private activated: ActivatedRoute, private messageService: MessageService,
        private fb: NonNullableFormBuilder,private assesmentService : AssesmentService) { }

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }
    loading = false;

    ngOnInit(): void {
        getParams(this.activated, 0).subscribe(params => {
            this.jobId = params['jobId'];
            this.appId = params['applicantId'];
            this.assesmentReqDto.patchValue({
                applicantId: params['applicantId']
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

    get isApplied(){
        return this.activeIndex == 0;
    }

    get isAssesment(){
        return this.activeIndex == 1;
    }

    get isInterview(){
        return this.activeIndex == 2;
    }

    get isMcu(){
        return this.activeIndex == 3;
    }

    get isOffering(){
        return this.activeIndex == 4;
    }

    get isHired(){
        return this.activeIndex == 5;
    }
    submitAssesment(){
        this.activeIndex = 0
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