import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobListComponent } from "./list/job-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { JobCreateComponent } from "./create/job-create.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: JobListComponent
  },
  {
    path: 'new',
    component: JobCreateComponent
  }
]
@NgModule({
  declarations: [
    JobListComponent,
    JobCreateComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule
  ]
})
export class JobRouting {

}
