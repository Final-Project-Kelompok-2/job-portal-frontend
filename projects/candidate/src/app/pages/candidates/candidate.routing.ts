import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";

const routes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
]
@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent
  ]
  ,
  exports: [

  ]
})
export class CandidateRouting {

}
