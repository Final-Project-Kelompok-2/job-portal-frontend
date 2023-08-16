import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { CompanyService } from "../../service/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";
import { UserResDto } from "../../dto/user/user.res.dto";
import { UserService } from "../../service/user.service";
// import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  fullName = ''
  companies! : CompanyResDto[]
  companySize = 0
  users! : UserResDto[]
  userSize = 0

  constructor(private authService : AuthService, private companyService:CompanyService,private userService : UserService){

  }

  ngOnInit(): void {
    // const profile = this.authService.getProfile()

    // if(profile){
    //   this.fullName = profile.profileName
    // }

    this.getCompanies()
    this.getUsers()
  }

  getCompanies(){
    this.companyService.getAll().subscribe(result => {
      this.companies = result
      this.companySize = this.companies.length
    })
  }

  getUsers(){
    this.userService.getAllUser().subscribe(result => {
      this.users = result
      this.userSize = this.users.length
    })
  }

}
