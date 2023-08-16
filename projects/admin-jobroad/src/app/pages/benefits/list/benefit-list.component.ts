import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { BenefitService } from "../../../service/benefit.service";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent implements OnInit {
  loading = false
  visible: boolean = false;
  benefits!: BenefitResDto[];
  benefitReqDto = this.fb.group({
    benefitName : ['',Validators.required]
  })
  constructor(private benefitService: BenefitService,private fb : NonNullableFormBuilder) { }
  ngOnInit(): void {
   this.getBenefit();
  }

  getBenefit(){
    this.benefitService.getAll().subscribe(result =>{
      this.benefits = result;
    })
  }
  showDialog() {
    this.visible = true;
  }

  clear(table: Table) {
    table.clear()
  }

  insert() {
    const data = this.benefitReqDto.getRawValue();
    this.benefitService.create(data).subscribe();
    this.getBenefit();
    this.benefitReqDto.reset();
    this.visible = false;
  }
}
