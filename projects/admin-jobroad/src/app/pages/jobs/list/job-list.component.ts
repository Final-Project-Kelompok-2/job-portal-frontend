import { Component, OnDestroy, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { Subscription } from "rxjs";
import { AuthService } from "../../../service/auth.service";
import { RoleCodeEnum } from "../../../constant/user-role.constant";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit, OnDestroy {
  loading = false
  jobs!: JobResDto[];
  jobSubscription!: Subscription;
  roleName?: string;
  constructor(private jobService: JobService, private authService: AuthService) { }
  ngOnInit(): void {
    this.roleName = this.authService.getProfile()?.roleCode;
    this.getJob();
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
  getJob() {
    if (this.isAdmin) {
      this.jobSubscription = this.jobService.getAll().subscribe(result => {
        this.jobs = result;
      })
    } else if(this.isHr) {
      this.jobSubscription = this.jobService.getByPrincipal().subscribe(result => {
        this.jobs = result;
      })
    }else {
      this.jobSubscription = this.jobService.getByPic().subscribe(result =>{
        this.jobs = result
      })
    }
  }

  ngOnDestroy(): void {
    this.jobSubscription.unsubscribe();
  }
}
