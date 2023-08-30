import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateMasterResDto } from "../../../dto/candidate-user/candidate-master.res.dto";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { firstValueFrom } from "rxjs";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'candidate-profile',
  templateUrl: './candidate-profile.component.html'
})
export class CandidateProfileComponent implements OnInit {

  imageUrl!: string

  candidateId!: string
  candidateUser?: CandidateMasterResDto
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
    private authService: AuthService,
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
    private title: Title
  ) {
    this.title.setTitle("Profile")
  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {
      this.candidateId = profile.userId
    }
    
    this.candidateUserProfile()
    this.candidateUserAddresses()
    this.candidateUserEducations()
    this.candidateUserFamilies()
    this.candidateUserDocuments()
    this.candidateUserLanguages()
    this.candidateUserProjects()
    this.candidateUserReferences()
    this.candidateUserSkills()
    this.candidateUserTrainings()
    this.candidateUserWorkings()
  }

  candidateUserProfile() {
    return firstValueFrom(this.candidateService.getById(this.candidateId))
      .then((res) => {
        this.candidateUser = res

        console.log(res)

        if (this.candidateUser?.candidateProfile?.fileId) {
          this.imageUrl = `http://localhost:8081/files/${this.candidateUser?.candidateProfile?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }
      })
  }

  candidateUserAddresses() {
    return firstValueFrom(this.candidateAddressService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateAddresses = res
      })
  }

  candidateUserEducations() {
    return firstValueFrom(this.candidateEducationService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateEducations = res
      })
  }

  candidateUserFamilies() {
    return firstValueFrom(this.candidateFamilyService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateFamilies = res
      })
  }

  candidateUserDocuments() {
    return firstValueFrom(this.candidateDocumentService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateDocuments = res
      })
  }

  candidateUserLanguages() {
    return firstValueFrom(this.candidateLanguageService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateLanguages = res
      })
  }

  candidateUserProjects() {
    return firstValueFrom(this.candidateProjectExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateProjects = res
      })
  }

  candidateUserReferences() {
    return firstValueFrom(this.candidateReferenceService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateReferences = res
      })
  }

  candidateUserSkills() {
    return firstValueFrom(this.candidateSkillService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateSkills = res
      })
  }

  candidateUserTrainings() {
    return firstValueFrom(this.candidateTrainingExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateTrainings = res
      })
  }

  candidateUserWorkings() {
    return firstValueFrom(this.candidateWorkExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateWorks = res
      })
  }
}
