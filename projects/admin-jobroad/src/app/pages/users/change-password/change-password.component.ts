import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit{

  // changePassword!:UserChangePasswordReqDto

  changePasswordDto = this.fb.group({
    oldPassword:['',[Validators.required]],
    newPassword:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  })

  constructor( private fb: NonNullableFormBuilder, private router: Router) {

  }

  ngOnInit(): void {

  }

  update(){
    // const data = this.changePasswordDto.getRawValue()
    // if (this.changePasswordDto.valid) {
    //   this.userService.changePassword(data, true).subscribe(result => {
    //     console.log(result)
    //     localStorage.clear()
    //     this.router.navigateByUrl('/login')
    //   })
    // }
  }
}
