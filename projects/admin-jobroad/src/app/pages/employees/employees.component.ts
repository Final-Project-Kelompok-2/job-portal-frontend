import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../service/employee.service";
import { EmployeeResDto } from "../../dto/employee/employee.res.dto";

@Component({
    selector: 'employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

    employees!: EmployeeResDto[]

    constructor(private employeeService: EmployeeService) {

    }


    ngOnInit(): void {
        this.getEmployees();
    }


    getEmployees() {
        this.employeeService.getAll().subscribe(result => {
            this.employees = result;
        })
    }

}