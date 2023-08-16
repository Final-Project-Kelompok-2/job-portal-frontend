import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { BenefitService } from "../../../service/benefit.service";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent implements OnInit,OnDestroy {
  loading = false
  visible: boolean = false;
  benefits!: BenefitResDto[];
  benefitSubscription! : Subscription;
  benefitReqDto = this.fb.group({
    benefitName : ['',Validators.required]
  })
  constructor(private benefitService: BenefitService,private fb : NonNullableFormBuilder) { }
  ngOnInit(): void {
   this.getBenefit();
  }

  getBenefit(){
    this.benefitSubscription = this.benefitService.getAll().subscribe(result =>{
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

  ngOnDestroy(): void {
    this.benefitSubscription.unsubscribe();
  }
}
