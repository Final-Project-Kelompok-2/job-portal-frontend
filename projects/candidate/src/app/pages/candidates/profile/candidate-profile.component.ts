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
  ) { }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {
      this.candidateId = profile.userId
    }

    this.candidateUserProfile
    this.candidateUserAddresses
    this.candidateUserEducations




  }

  get candidateUserProfile() {
    return this.candidateService.getById(this.candidateId)
      .subscribe((res) => {
        this.candidateUser = res

        if (this.candidateUser?.candidateProfile?.fileId) {
          this.imageUrl = `http://localhost:8081/files/${this.candidateUser?.candidateProfile?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }
      })
  }

  get candidateUserAddresses() {
    return this.candidateAddressService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateAddresses = res
      })
  }

  get candidateUserEducations() {
    return this.candidateEducationService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateEducations = res
      })
  }

  get candidateUserFamilies() {
    return this.candidateFamilyService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateFamilies = res
      })
  }

  get candidateUserDocuments() {
    return this.candidateDocumentService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateDocuments = res
      })
  }

  get candidateUserLanguages() {
    return this.candidateLanguageService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateLanguages = res
      })
  }

  get candidateUserProjects() {
    return this.candidateProjectExpService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateProjects = res
      })
  }

  get candidateUserReferences() {
    return this.candidateReferenceService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateReferences = res
      })
  }

  get candidateUserSkills() {
    return this.candidateSkillService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateSkills = res
      })
  }

  get candidateUserTrainings() {
    return this.candidateTrainingExpService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateTrainings = res
      })
  }

  get candidateUserWorkings() {
    return this.candidateWorkExpService.getByCandidate(this.candidateId)
      .subscribe((res) => {
        this.candidateWorks = res
      })
  }

}
