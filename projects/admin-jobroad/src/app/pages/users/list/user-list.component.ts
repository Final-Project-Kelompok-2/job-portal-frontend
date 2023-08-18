import { Component, OnInit } from "@angular/core"
import { Table } from "primeng/table";
import { UserService } from "../../../service/user.service";
import { UserResDto } from "../../../dto/user/user.res.dto";


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  loading = false
  users!: UserResDto[]

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  clear(table: Table) {
    table.clear();
  }

  getUsers() {
    this.userService.getAllUser().subscribe(result => {
      this.users = result
    })
  }

}
