import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { SharedModuleComponent } from "./component/shared-module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./component/button/button.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BaseComponent } from "./component/base/base.component";
import { BaseModule } from "./component/base/base.module";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { authValidation, authValidationNonlogin } from "./validation/auth.validation";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        // canMatch: [authValidation]
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        canMatch: [authValidationNonlogin],
        children: [{
            path: '',
            component: DashboardComponent,

        }]
    },
    {
        component: BaseComponent,
        path: 'jobs',
        loadChildren: () => import('./pages/jobs/job.module').then(u => u.JobModule)
    },
    {
        component: BaseComponent,
        path: 'companies',
        loadChildren: () => import('./pages/company/company.module').then(c => c.CompanyModule)
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [LoginComponent,
        NotFoundComponent,
        DashboardComponent
    ],
    exports: [
        LoginComponent,
        RouterModule,
        BaseModule,
    ],
    imports: [
        RouterModule.forRoot(routes),
        SharedModuleComponent,
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent
    ]
}
)

export class AppRouting {


}