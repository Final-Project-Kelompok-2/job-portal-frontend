import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { EmployeeResDto } from "../../dto/employee/employee.res.dto";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { BlacklistService } from "../../service/blacklist.service";

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
        private blacklistService: BlacklistService) {
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
        this.getEmployees();
    }


    getEmployees() {
        this.employeeService.getAll().subscribe(result => {
            this.employees = result;
        })
    }

    onSubmit() {
        if (this.blacklistReqDto.valid) {
            const data = this.blacklistReqDto.getRawValue()
            this.blacklistService.create(data).subscribe(() => {
                this.getEmployees()
            })
        }
        else {
            console.log("invalid");
        }
    }

}