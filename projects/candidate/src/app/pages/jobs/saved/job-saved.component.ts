import { Component, OnInit } from "@angular/core";
import { SavedJobService } from "../../../service/saved-job.service";
import { SavedJobResDto } from "../../../dto/saved-job/saved-job.res.dto";

@Component({
    selector: 'job-saved',
    templateUrl: './job-saved.component.html'
})
export class JobSavedComponent implements OnInit {

    savedJobs!: SavedJobResDto[]

    constructor(private savedJobService: SavedJobService) {

    }

    ngOnInit(): void {
        this.getSavedJobs()
    }


    getSavedJobs() {
        this.savedJobService.getByPrincipal().subscribe(result => {
            this.savedJobs = result
        })
    }

}