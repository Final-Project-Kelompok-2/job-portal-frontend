import { Component, OnInit } from "@angular/core";
// import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  fullName = ''

  // constructor(private authService : AuthService){

  // }

  ngOnInit(): void {
    // const profile = this.authService.getProfile()

    // if(profile){
    //   this.fullName = profile.profileName
    // }

  }

}
