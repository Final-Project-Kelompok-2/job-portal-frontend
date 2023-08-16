import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies!: CompanyResDto[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result;
    })
  }


  loading = false

  clear(table: Table) {
    table.clear();
  }
}
