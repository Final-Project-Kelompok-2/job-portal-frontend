import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { SharedModuleComponent } from "./component/shared-module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./component/button/button.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        // canMatch: [authValidation]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]

@NgModule({
    declarations: [LoginComponent
    ],
    exports: [
        LoginComponent,
        RouterModule
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