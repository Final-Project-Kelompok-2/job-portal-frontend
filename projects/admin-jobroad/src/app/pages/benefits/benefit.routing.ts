import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BenefitListComponent } from "./list/benefit-list.component";
import { BenefitCreateComponent } from "./create/benefit-create.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";

const routes: Routes = [
  {
    path: '',
    component: BenefitListComponent
  },
  {
    path: 'new',
    component: BenefitCreateComponent
  }
]
@NgModule({
  declarations: [
    BenefitCreateComponent,
    BenefitListComponent
  ]
  ,
  imports: [
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent
  ],
  exports:[
    BenefitListComponent,
    BenefitCreateComponent
  ]
})
export class BenefitRouting {

}
