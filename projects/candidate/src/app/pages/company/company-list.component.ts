import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../service/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'company-list',
    templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

    companies!: CompanyResDto[]
    imageUrl!:string

    constructor(private companyService: CompanyService) {

    }

    ngOnInit() {
        this.getCompanies()

        
    }

    getCompanies() {
        firstValueFrom(this.companyService.getAll()).then(result => {
            this.companies = result
        })
    }



}
