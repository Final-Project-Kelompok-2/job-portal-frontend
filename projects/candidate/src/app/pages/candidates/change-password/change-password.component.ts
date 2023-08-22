import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CandidateUserService } from "../../../service/candidate-user.service";


@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  // changePassword!:UserChangePasswordReqDto

  changePasswordDto = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  })

  constructor(private fb: NonNullableFormBuilder, private router: Router,
    private candidateUserService: CandidateUserService
  ) {

  }

  ngOnInit(): void {

  }

  update() {
    const data = this.changePasswordDto.getRawValue()
    if (this.changePasswordDto.valid && data.newPassword === data.confirmPassword) {
      this.candidateUserService.changePassword(data).subscribe(result => {
        console.log(result)
        localStorage.clear()
        this.router.navigateByUrl('/login')
      })
    }
    else {
      console.log("Change Password Failed");
    }
  }
}
