import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CandidateUserService } from "../../service/candidate-user.service";
import { Route, Router } from "@angular/router"

@Component({
  selector: 'resgiter',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading = false

  constructor(private candidateUserService: CandidateUserService, private fb: NonNullableFormBuilder,
    private router:Router) {

  }

  registerReqDto = this.fb.group({
    userEmail: ['', [Validators.required]],
    userPassword: ['', [Validators.required]],
    profile: this.fb.group({
      fullname: ['', [Validators.required]],
      salutation: '',
      gender: '',
      experience: '',
      expectedSalary: '',
      phoneNumber: '',
      mobileNumber: '',
      nik: '',
      birthDate: '',
      birthPlace: '',
      maritalStatusId: '',
      religionId: '',
      personTypeId: '',
      file: '',
      fileExtension: '',
      candidateStatusId: ''
    })
  })


  register() {
    const data = this.registerReqDto.getRawValue()
    this.candidateUserService.register(data).subscribe()
    this.router.navigateByUrl('/login')
  }

}
