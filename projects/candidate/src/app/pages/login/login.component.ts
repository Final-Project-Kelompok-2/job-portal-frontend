import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";


@Component({
    selector: "login",
    templateUrl: "./login.component.html"
})
export class LoginComponent {


    loading = false;

    constructor(private fb: NonNullableFormBuilder) {

    }

    loginReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
    })

}