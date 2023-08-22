import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeesComponent } from "./employees.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { ButtonComponent } from "../../component/button/button.component";

const route: Routes = [
    {
        path: '',
        component: EmployeesComponent
    }
]



@NgModule({
    declarations: [EmployeesComponent],
    imports: [RouterModule.forChild(route), SharedModuleComponent, ButtonComponent]

})
export class EmployeesRouting { }