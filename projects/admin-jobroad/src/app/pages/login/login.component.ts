import { Component } from "@angular/core";
import { FormControl, NonNullableFormBuilder, Validators } from "@angular/forms";
// import { AuthService } from "../../service/auth.service";
// import { LoginService } from "@service/login.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoginService } from "../../service/login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  heading = 'headingtitle'
  counter = 0

  loading = false

  userLoginReqDto = this.Fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]]
  })

  //buat naro tulisan kedalam input (bukan placeholder) -> profile
  fullNameRform = new FormControl('ERX')

  //constructor untuk inject
  //form builder adalah untuk menyederhanakan form group supaya ga berulang


  constructor(
    private router: Router, 
    private Fb: NonNullableFormBuilder, 
    private title: Title, 
    private loginService : LoginService) {
    this.title.setTitle('Login')

  }

  onLogin() {
    const data = this.userLoginReqDto.getRawValue()

    if (this.userLoginReqDto.valid) {
      this.loading = true
      this.loginService.login(data).subscribe({

        next: (result: any) => {

          this.loading = false
          console.log(result)

          localStorage.setItem('data', JSON.stringify(result))
          this.router.navigateByUrl('/dashboard')

        },
        error: () => {
          console.log("error")
          this.loading = false
        }
      })

    } else {
      console.log('invalid Login')
    }
  }
}
