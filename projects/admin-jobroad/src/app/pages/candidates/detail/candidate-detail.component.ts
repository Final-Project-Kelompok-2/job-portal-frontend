import { Component, OnInit } from "@angular/core";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, firstValueFrom } from "rxjs";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
  let route = activatedRoute
  if (parentLevel) {
    for (let i = 0; i < parentLevel; i++) {
      if (route.parent) {
        route = route.parent
      }
    }
  }
  return route.params
}
@Component({
  selector: 'candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  imageUrl!: string
  loading = false
  candidateUser?: CandidateUserResDto
  candidateAddresses!: CandidateAddressResDto[]
  candidateDocuments!: CandidateDocumentResDto[]
  candidateEducations!: CandidateEducationResDto[]
  candidateFamilies!: CandidateFamilyResDto[]
  candidateLanguages!: CandidateLanguageResDto[]
  candidateProjects!: CandidateProjectResDto[]
  candidateReferences!: CandidateReferencesResDto[]
  candidateSkills!: CandidateSkillResDto[]
  candidateTrainings!: CandidateTrainingResDto[]
  candidateWorks!: CandidateWorkResDto[]

  constructor(
    private candidateService: CandidateUserService,
    private candidateAddressService: CandidateAddressService,
    private candidateDocumentService: CandidateDocumentService,
    private candidateEducationService: CandidateEducationService,
    private candidateFamilyService: CandidateFamilyService,
    private candidateLanguageService: CandidateLanguageService,
    private candidateProjectExpService: CandidateProjectExpService,
    private candidateReferenceService: CandidateReferenceService,
    private candidateSkillService: CandidateSkillService,
    private candidateTrainingExpService: CandidateTrainingExpService,
    private candidateWorkExpService: CandidateWorkExpService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    firstValueFrom(getParams(this.route, 0)).then((res) => {
      firstValueFrom(this.candidateService.getCandidateUserById(res['id']))
        .then((res) => {
          this.candidateUser = res

          if (this.candidateUser?.fileId) {
            this.imageUrl = `http://localhost:8080/files/${this.candidateUser?.fileId}`
          } else {
            this.imageUrl = '../../../assets/emptyProfile.jpeg'
          }

        })

      firstValueFrom(this.candidateAddressService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateAddresses = res
      })

      firstValueFrom(this.candidateEducationService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateEducations = res
      })

      firstValueFrom(this.candidateFamilyService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateFamilies = res
      })

      firstValueFrom(this.candidateLanguageService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateLanguages = res
      })

      firstValueFrom(this.candidateProjectExpService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateProjects = res
      })

      firstValueFrom(this.candidateReferenceService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateReferences = res
      })

      firstValueFrom(this.candidateSkillService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateSkills = res
      })

      firstValueFrom(this.candidateTrainingExpService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateTrainings = res
      })

      firstValueFrom(this.candidateWorkExpService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateWorks = res
      })

      firstValueFrom(this.candidateDocumentService.getByCandidate(res['id'])
      ).then((res) => {
        this.candidateDocuments = res
      })
    })

  }
}
