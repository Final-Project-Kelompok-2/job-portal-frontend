import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { Subscription } from "rxjs";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit,OnDestroy{
  companies! : CompanyResDto[];
  companySubscription! : Subscription;
  constructor(private companyService : CompanyService){}
  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
   this.companySubscription = this.companyService.getAll().subscribe(result => {
      this.companies = result;
    })
  }


  loading = false

  clear(table: Table) {
    table.clear();
  }
  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
  }
}
