import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ApplicantDetailComponent } from "./detail/applicant-detail.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "../../pipe/url.pipe";

const routes: Routes = [
    {
        path:'applicant/:jobId/:applicantId',
        component : ApplicantDetailComponent
    }
]
@NgModule({
    declarations: [
        ApplicantDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModuleComponent,
        ButtonComponent,
        CommonModule,
        UrlPipe
    ]
})
export class ApplicantRouting {

}