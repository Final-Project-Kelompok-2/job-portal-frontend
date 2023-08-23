import { Component, OnInit } from "@angular/core";
import { SavedJobService } from "../../../service/saved-job.service";
import { SavedJobResDto } from "../../../dto/saved-job/saved-job.res.dto";
import { Router } from "@angular/router";

@Component({
  selector: 'job-saved',
  templateUrl: './job-saved.component.html',
  styleUrls: ['./job-saved.component.css']
})
export class JobSavedComponent implements OnInit {

  savedJobs!: SavedJobResDto[]
  savedJobsLength = 0

  haveSaved = false

  constructor(private savedJobService: SavedJobService, private router: Router) {

  }

  ngOnInit(): void {
    this.getSavedJobs()
    this.check()
  }

  getSavedJobs() {
    this.savedJobService.getByPrincipal().subscribe(result => {
      this.savedJobs = result
      this.savedJobsLength = this.savedJobs.length
    })
  }

  openDetail(id:string){
    this.router.navigateByUrl(`jobs/${id}/detail`)
  }

  check() {
    return this.savedJobsLength > 0
  }

}
