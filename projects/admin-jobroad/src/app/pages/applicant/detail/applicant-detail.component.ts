import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { CandidateUserService } from "../../../service/candidate-user.service";

@Component({
    selector : 'applicant-detail',
    templateUrl : './applicant-detail.component.html'
})
export class ApplicantDetailComponent implements OnInit{
    jobId! : string;
    applicantId! : string;
    constructor(private activated : ActivatedRoute){}

    ngOnInit(): void {
        getParams(this.activated,0).subscribe(params =>{
            this.jobId = params['jobId'];
            this.applicantId = params['applicantId'];
        })
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