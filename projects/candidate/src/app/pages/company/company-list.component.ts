import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../service/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

    companies!: CompanyResDto[]


    constructor(private companyService: CompanyService) {

    }

    ngOnInit() {
        this.getCompanies()
    }

    getCompanies() {
        this.companyService.getAll().subscribe(result => {
            this.companies = result
        })
    }



}