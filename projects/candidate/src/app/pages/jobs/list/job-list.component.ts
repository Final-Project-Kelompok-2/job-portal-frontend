import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { AuthService } from "../../../service/auth.service";
import { SavedJobService } from "../../../service/saved-job.service";

@Component({
    selector: "job-list",
    templateUrl: "./job-list.component.html",
    styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {



    result = 'Loved'

    loading = true

    jobs?: JobResDto[]

    constructor(private jobService: JobService,
        private authService: AuthService,
        private savedJobService: SavedJobService) {

    }

    ngOnInit() {
        this.getAllJob()
    }

    getAllJob() {
        this.jobService.getAll().subscribe(result => {
            this.jobs = result
        })
    }

    updateSavedJob(jobId: string) {
        const savedJobDto = {
            jobId
        }
        this.savedJobService.insert(savedJobDto).subscribe(result => {
            this.getAllJob()
        })
    }

    deleteSavedJob(jobId: string) {
        this.savedJobService.delete(jobId).subscribe(result => {
            this.getAllJob()
        })
    }


}