import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { EmployeeResDto } from "../../dto/employee/employee.res.dto";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { BlacklistService } from "../../service/blacklist.service";
import { firstValueFrom } from "rxjs";
import { BaseService } from "../../service/base.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

  employees!: EmployeeResDto[]
  visible: boolean = false;


  blacklistReqDto = this.fb.group({
    candidateEmail: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  })


  constructor(private employeeService: EmployeeService,
    private fb: NonNullableFormBuilder,
    private blacklistService: BlacklistService,
    private base: BaseService,
    private title: Title) {
    this.title.setTitle("Employee List")
  }

  showDialog(candidateEmail: string) {
    this.blacklistReqDto.reset()
    if (this.visible) {

      this.visible = !this.visible;
    }
    else {
      this.blacklistReqDto.get("candidateEmail")?.patchValue(
        candidateEmail
      )
      this.visible = !this.visible;
    }


  }

  ngOnInit(): void {

    this.base.all([
      this.employeeService.getAll()
    ]).then(result => {
      this.employees = result[0]
    })

  }



  onSubmit() {
    if (this.blacklistReqDto.valid) {
      const data = this.blacklistReqDto.getRawValue()
      firstValueFrom(this.blacklistService.create(data)).then(() => {

        this.base.all([
          this.employeeService.getAll()
        ]).then(result => {
          this.employees = result[0]
        })

      })
    }
    else {
      console.log("invalid");
    }
  }

}
