import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuestionListComponent } from "./list/question-list.component";
import { QuestionCreateComponent } from "./create/question-create.component";
import { SharedModuleComponent } from "projects/candidate/src/app/component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent
  },
  {
    path: 'new',
    component: QuestionCreateComponent
  }

]
@NgModule({
  exports:[

  ],
  declarations:[
    QuestionCreateComponent,
    QuestionListComponent
  ]
  ,
  imports:[
    RouterModule.forChild(routes),
    SharedModuleComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent
  ]
})
export class QuestionRouting {

}
