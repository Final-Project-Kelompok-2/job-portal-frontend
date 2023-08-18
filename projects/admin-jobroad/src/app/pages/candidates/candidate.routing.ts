import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidateListComponent } from "./list/candidate-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CandidateCreateComponent } from "./create/candidate-create.component";
import { CommonModule } from "@angular/common";
import { CandidateDetailComponent } from "./detail/candidate-detail.component";
import { UrlPipe } from "../../pipe/url.pipe";

const routes: Routes = [
  {
    path:'',
    component:CandidateListComponent
  },
  {
    path:'new',
    component:CandidateCreateComponent
  },
  {
    path:'detail/:id',
    component:CandidateDetailComponent
  }
]
@NgModule({
  declarations:[
    CandidateListComponent,
    CandidateCreateComponent,
    CandidateDetailComponent
  ],
  imports:[
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule,
    UrlPipe
  ],
  exports:[

  ]
})
export class CandidateRouting {

}
