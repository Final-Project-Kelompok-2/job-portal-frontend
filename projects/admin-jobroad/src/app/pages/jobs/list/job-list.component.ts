import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { Subscription } from "rxjs";
import { AuthService } from "../../../service/auth.service";
import { RoleCodeEnum } from "../../../constant/user-role.constant";
import { BaseService } from "../../../service/base.service";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  loading = false
  jobs!: JobResDto[];
  jobSubscription!: Subscription;
  roleName?: string;
  constructor(private jobService: JobService, private authService: AuthService, private base:BaseService) { }
  ngOnInit(): void {
    this.roleName = this.authService.getProfile()?.roleCode;
    // this.getJob();

    if (this.isAdmin) {
      this.base.all([
        this.jobService.getAll()
      ]).then(result => {
        this.jobs = result[0]
      })
    } else if(this.isHr) {

      this.base.all([
        this.jobService.getByPrincipal()
      ]).then(result => {
        this.jobs = result[0]
      })

    }else {
      this.base.all([
        this.jobService.getByPic()
      ]).then(result => {
        this.jobs = result[0]
      })
    }

  }
  clear(table: Table) {
    table.clear();
  }
  get isAdmin() {
    return this.roleName == RoleCodeEnum.ADMIN;
  }

  get isHr(){
    return this.roleName == RoleCodeEnum.HR
  }

  get isPic(){
    return this.roleName == RoleCodeEnum.PIC
  }

  // getJob() {
  //   if (this.isAdmin) {
  //     this.jobSubscription = this.jobService.getAll().subscribe(result => {
  //       this.jobs = result;
  //     })
  //   } else if(this.isHr) {
  //     this.jobSubscription = this.jobService.getByPrincipal().subscribe(result => {
  //       this.jobs = result;
  //     })
  //   }else {
  //     this.jobSubscription = this.jobService.getByPic().subscribe(result =>{
  //       this.jobs = result
  //     })
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.jobSubscription.unsubscribe();
  // }
}
