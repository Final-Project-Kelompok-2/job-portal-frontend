import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobListComponent } from "./list/job-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { CommonModule } from "@angular/common";
import { JobSavedComponent } from "./saved/job-saved.component";
import { JobDetailComponent } from "./detail/job-detail.component";

const route: Routes = [
    {
        path: "",
        component: JobListComponent
    },
    {
        path: "saved",
        component: JobSavedComponent
    },
    {
        path: ":id/detail",
        component: JobDetailComponent
    }
]

@NgModule({
    declarations: [JobListComponent, JobSavedComponent, JobDetailComponent],
    imports: [
        RouterModule.forChild(route),
        SharedModuleComponent,
        CommonModule
    ],
    exports: []
})
export class JobRouting {

}