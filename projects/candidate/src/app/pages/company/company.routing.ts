import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./company-list.component";
import { SharedModuleComponent } from "../../component/shared-module";
import { UrlPipe } from "../../pipe/url.pipe";

const routes: Routes = [
    {
        path: '',
        component: CompanyListComponent
    }
]

@NgModule({
    declarations: [CompanyListComponent],

    imports: [RouterModule.forChild(routes), SharedModuleComponent, UrlPipe],
})

export class CompanyRouting {

}