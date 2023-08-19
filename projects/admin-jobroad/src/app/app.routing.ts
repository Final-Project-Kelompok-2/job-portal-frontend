import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModuleComponent } from "./component/shared-module";
import { UrlPipe } from "./pipe/url.pipe";
import { BaseModule } from "./component/base/base.module";
import { ButtonComponent } from "./component/button/button.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { BaseComponent } from "./component/base/base.component";
import { UserModule } from "./pages/users/user.module";
import { CompanyModule } from "./pages/companies/company.module";
import { JobModule } from "./pages/jobs/job.module";
import { CandidateModule } from "./pages/candidates/candidate.module";
import { BenefitModule } from "./pages/benefits/benefit.module";
import { QuestionModule } from "./pages/questions/question.module";
import { NotFoundComponent } from "./component/not-found/not-found.component";
import { ApplicantModule } from "./pages/applicant/applicant.module";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canMatch: [authValidation]
  },
  {
    component: BaseComponent,
    path: 'dashboard',
    children: [{
      path: '',
      component: DashboardComponent
    }],
  },
  {
    component: BaseComponent,
    path: 'users',
    loadChildren: () => import('./pages/users/user.module').then(u => UserModule),
  },
  {
    component: BaseComponent,
    path: 'applicant',
    loadChildren: () => import('./pages/applicant/applicant.module').then(a => ApplicantModule)
  },
  {
    component: BaseComponent,
    path: 'companies',
    loadChildren: () => import('./pages/companies/company.module').then(u => CompanyModule),
  },
  {
    component: BaseComponent,
    path: 'candidates',
    loadChildren: () => import('./pages/candidates/candidate.module').then(u => CandidateModule),
  },
  {
    component: BaseComponent,
    path: 'benefits',
    loadChildren: () => import('./pages/benefits/benefit.module').then(u => BenefitModule),
  },
  {
    component: BaseComponent,
    path: 'questions',
    loadChildren: () => import('./pages/questions/question.module').then(u => QuestionModule),
  },
  {
    component: BaseComponent,
    path: 'jobs',
    // data: [Roles.ADMIN],
    // canMatch : [authValidationNonLogin,roleValidation],
    loadChildren: () => import('./pages/jobs/job.module').then(u => JobModule),
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
  declarations: [
    DashboardComponent,
    LoginComponent,
    NotFoundComponent
  ]
  ,
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    CommonModule,
    UrlPipe,
    BaseModule,
    ButtonComponent,
    SharedModuleComponent
  ],
  exports: [
    RouterModule,
    DashboardComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class AppRouting {

}
