import { Component, OnInit } from "@angular/core"
import { Table } from "primeng/table";


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loading = false
  // users!: UsersResDto[]  

  constructor() {
  }

  ngOnInit(): void {
    // this.getUsers()
  }

  clear(table: Table) {
    table.clear();
}

  // getUsers() {
  //   this.userService.getAllUser(true).subscribe(result => {
  //     this.users = result
  //   })
  // }

}
