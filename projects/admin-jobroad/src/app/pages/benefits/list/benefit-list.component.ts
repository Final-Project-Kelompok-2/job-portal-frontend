import { Component } from "@angular/core";
import { Table } from "primeng/table";

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css']
})
export class BenefitListComponent {
  loading = false
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  clear(table:Table){
    table.clear()
  }

  insert(){

  }
}
