import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { JobResDto } from "../../../dto/job/job.res.dto";
import { AuthService } from "../../../service/auth.service";
import { SavedJobService } from "../../../service/saved-job.service";
import { firstValueFrom } from "rxjs";

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
        firstValueFrom(this.jobService.getAll()).then(result => {
            this.jobs = result
        })
    }

    updateSavedJob(jobId: string) {
        const savedJobDto = {
            jobId
        }
        firstValueFrom(this.savedJobService.insert(savedJobDto)).then(result => {
            this.getAllJob()
        })
    }

    deleteSavedJob(jobId: string) {
        firstValueFrom(this.savedJobService.delete(jobId)).then(result => {
            this.getAllJob()
        })
    }


}