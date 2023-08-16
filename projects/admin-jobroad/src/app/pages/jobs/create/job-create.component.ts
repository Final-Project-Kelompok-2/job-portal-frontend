import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { EmploymentTypeService } from "../../../service/employment-type.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";

@Component({
  selector:'job-create',
  templateUrl:'./job-create.component.html'
})
export class JobCreateComponent implements OnInit{
  loading = false
  jobReqDto = this.fb.group({

  });
  hr! : UserResDto[];
  pic! : UserResDto[];
  employmentType! : EmployeeResDto[];
  constructor(private jobService : JobService,private fb : NonNullableFormBuilder, 
    private router : Router,private userService : UserService , private employmentTypeService : EmploymentTypeService){}
    
  ngOnInit(): void {
    this.userService.getByRole('R-002').subscribe(result =>{
      this.hr = result;
    })
    this.userService.getByRole('R-004').subscribe(result =>{
      this.pic = result;
    })
  }
}
