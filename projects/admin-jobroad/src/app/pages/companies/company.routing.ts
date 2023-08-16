import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";
import { CompanyCreateComponent } from "./create/company-create.component";
import { CommonModule } from "@angular/common";

const routes:Routes = [
  {
    path:'',
    component:CompanyListComponent
  },
  {
    path:'new',
    component:CompanyCreateComponent
  }
]
@NgModule({
  declarations:[
    CompanyListComponent,
    CompanyCreateComponent
  ],
  imports:[
    RouterModule.forChild(routes),
    SharedModuleComponent,
    ButtonComponent,
    CommonModule
  ],
  exports:[

  ]
})
export class CompanyRouting{

}
