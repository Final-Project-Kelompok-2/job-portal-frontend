import { Component, OnInit } from "@angular/core";
import { JobService } from "../../service/job.service";
import { JobResDto } from "../../dto/job/job.res.dto";
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  jobs: JobResDto[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private jobService: JobService, private auth: AuthService, private router:Router) { }

  visible: boolean = false;
  isLogin: boolean = false

  ngOnInit() {

    const profile = this.auth.getProfile()

    if (profile) {
      this.isLogin = true
    }

    if(!profile?.nik){
      this.visible = true
    }

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  showDialog() {
    this.visible = true;
  }

  goToProfile(){
    this.router.navigateByUrl('/candidates/profile')
  }

}
