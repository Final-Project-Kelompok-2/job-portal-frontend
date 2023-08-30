import { Component, OnInit } from "@angular/core";
import { CandidateUserResDto } from "../../../dto/candidate-user/candidate-user.res.dto";
import { CandidateAddressResDto } from "../../../dto/candidate-address/candidate-address.res.dto";
import { CandidateDocumentResDto } from "../../../dto/candidate-document/candidate-document.res.dto";
import { CandidateEducationResDto } from "../../../dto/candidate-education/candidate-education.res.dto";
import { CandidateFamilyResDto } from "../../../dto/candidate-family/candidate-family.res.dto";
import { CandidateLanguageResDto } from "../../../dto/candidate-language/candidate-language.res.dto";
import { CandidateProjectResDto } from "../../../dto/candidate-project/candidate-project.res.dto";
import { CandidateReferencesResDto } from "../../../dto/candidate-references/candidate-references.res.dto";
import { CandidateSkillResDto } from "../../../dto/candidate-skill/candidate-skill.res.dto";
import { CandidateTrainingResDto } from "../../../dto/candidate-training/candidate-training.res.dto";
import { CandidateWorkResDto } from "../../../dto/candidate-work/candidate-work.res.dto";
import { CandidateUserService } from "../../../service/candidate-user.service";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { CandidateDocumentService } from "../../../service/candidate-documents.service";
import { CandidateEducationService } from "../../../service/candidate-education.service";
import { CandidateFamilyService } from "../../../service/candidate-family.service";
import { CandidateLanguageService } from "../../../service/candidate-language.service";
import { CandidateProjectExpService } from "../../../service/candidate-project-exp.service";
import { CandidateReferenceService } from "../../../service/candidate-reference.service";
import { CandidateSkillService } from "../../../service/candidate-skill.service";
import { CandidateTrainingExpService } from "../../../service/candidate-training-exp.service";
import { CandidateWorkExpService } from "../../../service/candidate-work-exp.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MaritalResDto } from "../../../dto/marital/marital.res.dto";
import { ReligionResDto } from "../../../dto/religion/religion.res.dto";
import { PersonTypeResDto } from "../../../dto/person-type/person-type.res.dto";
import { CandidateStatusResDto } from "../../../dto/candidate-status/candidate-status.res.dto";
import { FileTypeResDto } from "../../../dto/file-type/file-type.res.dto";
import { ReligionService } from "../../../service/religion.service";
import { PersonTypeService } from "../../../service/person-type.service";
import { CandidateStatusService } from "../../../service/candidate-status.service";
import { MaritalStatusService } from "../../../service/maritalstatus.service";
import { FileTypeService } from "../../../service/file-type.service";
import { FileUpload } from "primeng/fileupload";
import { Observable, firstValueFrom } from "rxjs";
import { CandidateProfileUpdateReqDto } from "../../../dto/candidate-profile/candidate-profile-update.req.dto";

interface Salutation {
  value: string;
  label: string;
}
interface Gender {
  value: string;
  label: string;
}
interface ResidenceType {
  value: string,
  label: string
}
interface Degree {
  value: string,
  label: string
}
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
  selector: 'candidate-update',
  templateUrl: './candidate-update.component.html',
})
export class CandidateUpdateComponent implements OnInit {
  birthDateCandidate!: Date
  imageUrl!: string
  loading = false
  addressId!: string
  educationId!: string
  workingId!: string
  trainingId!: string
  projectId!: string
  skillId!: string
  languageId!: string
  familyId!: string
  referenceId!: string
  documentId!: string
  dialogDeleteAddress: boolean = false
  dialogDeleteEducation: boolean = false
  dialogDeleteWorking: boolean = false
  dialogDeleteTraining: boolean = false
  dialogDeleteProject: boolean = false
  dialogDeleteSkill: boolean = false
  dialogDeleteLanguage: boolean = false
  dialogDeleteFamily: boolean = false
  dialogDeleteReference: boolean = false
  dialogDeleteDocument: boolean = false
  dialogAddress: boolean = false
  dialogEducation: boolean = false
  dialogFamily: boolean = false
  dialogSkill: boolean = false
  dialogLanguage: boolean = false
  dialogReference: boolean = false
  dialogWorking: boolean = false
  dialogTraining: boolean = false
  dialogProject: boolean = false
  dialogDocument: boolean = false
  candidateProfile!: CandidateProfileUpdateReqDto
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
  degrees: Degree[] | undefined
  salutations: Salutation[] | undefined
  genders: Gender[] | undefined
  residenceType: ResidenceType[] | undefined
  maritals!: MaritalResDto[]
  religions!: ReligionResDto[]
  types!: PersonTypeResDto[]
  candidateStatus!: CandidateStatusResDto[]
  fileTypes!: FileTypeResDto[]
  candidateId!: string

  candidateUpdateInsertReqDto = this.fb.group({
    id: ['', [Validators.required]],
    userEmail: ['', Validators.required],
    profile: this.fb.group({
      id: ['', [Validators.required]],
      salutation: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      expectedSalary: [0, [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      nik: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthDateTemp: new FormControl<Date | null>(null),
      birthPlace: ['', [Validators.required]],
      maritalStatusId: ['', [Validators.required]],
      religionId: ['', [Validators.required]],
      personTypeId: ['', [Validators.required]],
      fileId: [''],
      file: [''],
      fileExtension: [''],
      candidateStatusId: ['', [Validators.required]]
    })
  })

  trainingInsertReqDto = this.fb.group({
    organizationName: ['', [Validators.required]],
    trainingName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    email: ['', [Validators.required]]
  })

  addressInsertReqDto = this.fb.group({
    address: ['', [Validators.required]],
    residenceType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  educationInsertReqDto = this.fb.group({
    degreeName: ['', [Validators.required]],
    instituitionName: ['', [Validators.required]],
    majors: ['', [Validators.required]],
    cgpa: [0, [Validators.required]],
    startYear: ['', [Validators.required]],
    startYearTemp: new FormControl<Date | null>(null),
    endYear: ['', [Validators.required]],
    endYearTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  workingInsertReqDto = this.fb.group({
    positionName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    responsibility: ['', [Validators.required]],
    reasonLeave: ['', [Validators.required]],
    lastSalary: [0, [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  projectInsertReqDto = this.fb.group({
    projectName: ['', [Validators.required]],
    projectUrl: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startDateTemp: new FormControl<Date | null>(null),
    endDate: ['', [Validators.required]],
    endDateTemp: new FormControl<Date | null>(null),
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  skillInsertReqDto = this.fb.group({
    skillName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    candidateId: ['', [Validators.required]]
  })

  languageInsertReqDto = this.fb.group({
    languageName: ['', [Validators.required]],
    writingRate: ['', [Validators.required]],
    speakingRate: ['', [Validators.required]],
    listeningRate: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  familyInsertReqDto = this.fb.group({
    fullname: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    degreeName: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    birthDateTemp: new FormControl<Date | null>(null),
    birthPlace: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  referenceInsertReqDto = this.fb.group({
    fullname: ['', [Validators.required]],
    relationship: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    company: ['', [Validators.required]],
    description: ['', [Validators.required]],
    candidateEmail: ['', [Validators.required]]
  })

  documentInsertReqDto = this.fb.group({
    docName: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    email: ['', [Validators.required]],
    fileTypeCode: ['', [Validators.required]],
    fileName: ['', [Validators.required]],
    fileExtension: ['', [Validators.required]]
  })

  constructor(
    private religionService: ReligionService,
    private personTypeService: PersonTypeService,
    private candidateStatusService: CandidateStatusService,
    private maritalStatusService: MaritalStatusService,
    private fileTypeService: FileTypeService,
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
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder
  ) {

  }

  ngOnInit(): void {


    this.candidateUpdateInsertReqDto.get('profile.birthDateTemp')?.valueChanges.subscribe(res => {
      const newBirthDate = convertUTCToLocalDate(res as any)
      this.candidateUpdateInsertReqDto.get('profile.birthDate')?.setValue(newBirthDate)
    })

    this.familyInsertReqDto.get('birthDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newBirthDate = convertUTCToLocalDate(res as any)
        this.familyInsertReqDto.get('birthDate')?.setValue(newBirthDate)
      }
    })

    this.educationInsertReqDto.get('startYearTemp')?.valueChanges.subscribe(res => {
      console.log(res);
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartYear = convertUTCToLocalDate(restemp)
        this.educationInsertReqDto.get('startYear')?.setValue(newStartYear)

      }
    })
    this.educationInsertReqDto.get('endYearTemp')?.valueChanges.subscribe(res => {
      console.log(res);
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndYear = convertUTCToLocalDate(restemp)
        this.educationInsertReqDto.get('endYear')?.setValue(newEndYear)

      }
    })

    this.workingInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.workingInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.workingInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.workingInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    this.projectInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.projectInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.projectInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.projectInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    this.trainingInsertReqDto.get('startDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newStartDate = convertUTCToLocalDate(res as any)
        this.trainingInsertReqDto.get('startDate')?.setValue(newStartDate)
      }
    })
    this.trainingInsertReqDto.get('endDateTemp')?.valueChanges.subscribe(res => {
      const restemp = res as any
      if (restemp instanceof Date) {
        const newEndDate = convertUTCToLocalDate(res as any)
        this.trainingInsertReqDto.get('endDate')?.setValue(newEndDate)
      }
    })

    firstValueFrom(getParams(this.route, 0)).then((res) => {
      this.candidateId = res['id']
      this.candidateUserProfile()
      this.candidateUserAddresses()
      this.candidateUserEducations()
      this.candidateUserWorkings()
      this.candidateUserTrainings()
      this.candidateUserProjects()
      this.candidateUserSkills()
      this.candidateUserLanguages()
      this.candidateUserFamilies()
      this.candidateUserReferences()
      this.candidateUserDocuments()
    })

    firstValueFrom(this.religionService.getAll()).then((res) => {
      this.religions = res
    })

    firstValueFrom(this.personTypeService.getAll()).then((res) => {
      this.types = res
    })

    firstValueFrom(this.candidateStatusService.getAll()).then((res) => {
      this.candidateStatus = res
    })

    firstValueFrom(this.maritalStatusService.getAll()).then((res) => {
      this.maritals = res
    })

    firstValueFrom(this.fileTypeService.getAll()).then((res) => {
      this.fileTypes = res
    })

    this.salutations = [
      { value: 'Mr.', label: 'Mr.' },
      { value: 'Mrs.', label: 'Mrs.' }
    ];

    this.genders = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ];

    this.residenceType = [
      { value: 'Home', label: 'Home' },
      { value: 'Domicile', label: 'Domicile' }
    ]

    this.degrees = [
      { value: 'Sarjana (S1)', label: 'Sarjana (S1)' },
      { value: 'Magister (S2)', label: 'Magister (S2)' }
    ]
  }

  checkForm(form : FormGroup){
    if(form.invalid){
      return form.markAllAsTouched()
    }
  }

  candidateProfileInfo() {
    return this.candidateService.getCandidateUserById(this.candidateId)
      .subscribe((res) => {

        this.addressInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })

        this.educationInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })

        this.workingInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })

        this.trainingInsertReqDto.patchValue({
          email: res.userEmail
        })

        this.projectInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })

        this.skillInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })

        this.languageInsertReqDto.patchValue({
          email: res.userEmail
        })

        this.familyInsertReqDto.patchValue({
          email: res.userEmail
        })

        this.referenceInsertReqDto.patchValue({
          email: res.userEmail
        })

        this.documentInsertReqDto.patchValue({
          candidateId: res.id,
          email: res.userEmail
        })
      })
  }
  
  candidateUserProfile() {
    return firstValueFrom(this.candidateService.getCandidateUserById(this.candidateId))
      .then((res) => {
        this.candidateUser = res

        if (this.candidateUser?.fileId) {
          this.imageUrl = `http://localhost:8080/files/${this.candidateUser?.fileId}`
        } else {
          this.imageUrl = '../../../assets/emptyProfile.jpeg'
        }

        this.candidateUpdateInsertReqDto.patchValue({
          id: res.id,
          userEmail: res.userEmail,
          profile: {
            id: res.id,
            salutation: res.salutation,
            fullname: res.fullname,
            gender: res.gender,
            experience: res.experience,
            expectedSalary: Number(res.expectedSalary),
            phoneNumber: res.phoneNumber,
            mobileNumber: res.mobileNumber,
            nik: res.nik,
            birthDate: res.birthDate,
            birthDateTemp: new Date(res.birthDate),
            birthPlace: res.birthPlace,
            maritalStatusId: res.maritalStatusId,
            religionId: res.religionId,
            personTypeId: res.personTypeId,
            fileId: res.fileId,
            file: '',
            fileExtension: '',
            candidateStatusId: res.candidateStatusId
          }
        })
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

  candidateUserWorkings() {
    return firstValueFrom(this.candidateWorkExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateWorks = res
      })
  }

  candidateUserTrainings() {
    return firstValueFrom(this.candidateTrainingExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateTrainings = res
      })
  }

  candidateUserProjects() {
    return firstValueFrom(this.candidateProjectExpService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateProjects = res
      })
  }

  candidateUserSkills() {
    return firstValueFrom(this.candidateSkillService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateSkills = res
      })
  }

  candidateUserLanguages() {
    return firstValueFrom(this.candidateLanguageService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateLanguages = res
      })
  }

  candidateUserFamilies() {
    return firstValueFrom(this.candidateFamilyService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateFamilies = res
      })
  }

  candidateUserReferences() {
    return firstValueFrom(this.candidateReferenceService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateReferences = res
      })
  }

  candidateUserDocuments() {
    return firstValueFrom(this.candidateDocumentService.getByCandidate(this.candidateId))
      .then((res) => {
        this.candidateDocuments = res
      })
  }

  showAddAddress() {
    this.candidateProfileInfo()
    this.dialogAddress = true;
  }

  showDeleteAddress(id: string) {
    this.addressId = id
    this.dialogDeleteAddress = true;
  }

  showAddEducation() {
    this.candidateProfileInfo()
    this.dialogEducation = true;
  }

  showDeleteEducation(id: string) {
    this.educationId = id
    this.dialogDeleteEducation = true
  }

  showAddFamily() {
    this.candidateProfileInfo()
    this.dialogFamily = true;
  }

  showDeleteFamily(id: string) {
    this.familyId = id
    this.dialogDeleteFamily = true
  }

  showAddSkill() {
    this.candidateProfileInfo()
    this.dialogSkill = true;
  }

  showDeleteSkill(id: string) {
    this.skillId = id
    this.dialogDeleteSkill = true
  }

  showAddLanguage() {
    this.candidateProfileInfo()
    this.dialogLanguage = true;
  }

  showDeleteLanguage(id: string) {
    this.languageId = id
    this.dialogDeleteLanguage = true
  }

  showAddReference() {
    this.candidateProfileInfo()
    this.dialogReference = true;
  }

  showDeleteReference(id: string) {
    this.referenceId = id
    this.dialogDeleteReference = true
  }

  showAddWorking() {
    this.candidateProfileInfo()
    this.dialogWorking = true;
  }

  showDeleteWorking(id: string) {
    this.workingId = id
    this.dialogDeleteWorking = true
  }

  showAddTraining() {
    this.candidateProfileInfo()
    this.dialogTraining = true;
  }

  showDeleteTraining(id: string) {
    this.trainingId = id
    this.dialogDeleteTraining = true
  }

  showAddProject() {
    this.candidateProfileInfo()
    this.dialogProject = true;
  }

  showDeleteProject(id: string) {
    this.projectId = id
    this.dialogDeleteProject = true
  }

  showAddDocuments() {
    this.candidateProfileInfo()
    this.dialogDocument = true;
  }

  showDeleteDocument(id: string) {
    this.documentId = id
    this.dialogDeleteDocument = true
  }

  onAddAddress() {
    if (this.addressInsertReqDto.valid) {
      const data = this.addressInsertReqDto.getRawValue()
      firstValueFrom(this.candidateAddressService.create(data)).then((res) => {
        this.candidateUserAddresses()
        this.addressInsertReqDto.reset()
        this.dialogAddress = false
      })
    }
  }

  onAddEducation() {
    if (this.educationInsertReqDto.valid) {
      const data = this.educationInsertReqDto.getRawValue()
      firstValueFrom(this.candidateEducationService.create(data)).then((res) => {
        this.candidateUserEducations()
        this.educationInsertReqDto.reset()
        this.dialogEducation = false
      })
    }
  }

  onAddWorking() {
    if (this.workingInsertReqDto.valid) {
      const data = this.workingInsertReqDto.getRawValue()
      firstValueFrom(this.candidateWorkExpService.create(data)).then((res) => {
        this.candidateUserWorkings()
        this.workingInsertReqDto.reset()
        this.dialogWorking = false
      })
    }
  }

  onAddTraining() {
    if (this.trainingInsertReqDto.valid) {
      const data = this.trainingInsertReqDto.getRawValue()
      firstValueFrom(this.candidateTrainingExpService.create(data)).then((res) => {
        this.candidateUserTrainings()
        this.trainingInsertReqDto.reset()
        this.dialogTraining = false
      })
    }
  }

  onAddProject() {
    if (this.projectInsertReqDto.valid) {
      const data = this.projectInsertReqDto.getRawValue()
      firstValueFrom(this.candidateProjectExpService.create(data)).then((res) => {
        this.candidateUserProjects()
        this.projectInsertReqDto.reset()
        this.dialogProject = false
      })
    }
  }

  onAddSkill() {
    if (this.skillInsertReqDto.valid) {
      const data = this.skillInsertReqDto.getRawValue()
      firstValueFrom(this.candidateSkillService.create(data)).then((res) => {
        this.candidateUserSkills()
        this.skillInsertReqDto.reset()
        this.dialogSkill = false
      })
    }
  }

  onAddLanguage() {
    if (this.languageInsertReqDto.valid) {
      const data = this.languageInsertReqDto.getRawValue()
      firstValueFrom(this.candidateLanguageService.create(data)).then((res) => {
        this.candidateUserLanguages()
        this.languageInsertReqDto.reset()
        this.dialogLanguage = false
      })
    }
  }

  onAddFamily() {
    if (this.familyInsertReqDto.valid) {
      const data = this.familyInsertReqDto.getRawValue()
      firstValueFrom(this.candidateFamilyService.create(data)).then((res) => {
        this.candidateUserFamilies()
        this.familyInsertReqDto.reset()
        this.dialogFamily = false
      })
    }
  }

  onAddReference() {
    if (this.referenceInsertReqDto.valid) {
      const data = this.referenceInsertReqDto.getRawValue()
      firstValueFrom(this.candidateReferenceService.create(data)).then((res) => {
        this.candidateUserReferences()
        this.referenceInsertReqDto.reset()
        this.dialogReference = false
      })
    }
  }

  onAddDocument() {
    if (this.documentInsertReqDto.valid) {
      const data = this.documentInsertReqDto.getRawValue()
      firstValueFrom(this.candidateDocumentService.create(data)).then((res) => {
        this.candidateUserDocuments()
        this.documentInsertReqDto.reset()
        this.dialogDocument = false
      })
    }
  }

  onDeleteAddress() {
    firstValueFrom(this.candidateAddressService.delete(this.addressId)).then((res) => {
      this.candidateUserAddresses()
      this.dialogDeleteAddress = false
    })
  }

  onDeleteTraining() {
    firstValueFrom(this.candidateTrainingExpService.delete(this.trainingId)).then((res) => {
      this.candidateUserTrainings()
      this.dialogDeleteTraining = false
    })
  }

  onDeleteEducation() {
    firstValueFrom(this.candidateEducationService.delete(this.educationId)).then((res) => {
      this.candidateUserEducations()
      this.dialogDeleteEducation = false
    })
  }

  onDeleteWorking() {
    firstValueFrom(this.candidateWorkExpService.delete(this.workingId)).then((res) => {
      this.candidateUserWorkings()
      this.dialogDeleteWorking = false
    })
  }

  onDeleteProject() {
    firstValueFrom(this.candidateProjectExpService.delete(this.projectId)).then((res) => {
      this.candidateUserProjects()
      this.dialogDeleteProject = false
    })
  }

  onDeleteSkill() {
    firstValueFrom(this.candidateSkillService.delete(this.skillId)).then((res) => {
      this.candidateUserSkills()
      this.dialogDeleteSkill = false
    })
  }

  onDeleteLanguage() {
    firstValueFrom(this.candidateLanguageService.delete(this.languageId)).then((res) => {
      this.candidateUserLanguages
      this.dialogDeleteLanguage = false
    })
  }

  onDeleteFamily() {
    firstValueFrom(this.candidateFamilyService.delete(this.familyId)).then((res) => {
      this.candidateUserFamilies()
      this.dialogDeleteFamily = false
    })
  }

  onDeleteReference() {
    firstValueFrom(this.candidateReferenceService.delete(this.referenceId)).then((res) => {
      this.candidateUserReferences()
      this.dialogDeleteReference = false
    })
  }

  onDeleteDocument() {
    firstValueFrom(this.candidateDocumentService.delete(this.documentId)).then((res) => {
      this.candidateUserDocuments()
      this.dialogDeleteDocument = false
    })
  }

  onUpdate() {
    if (this.candidateUpdateInsertReqDto.valid) {
      const data = this.candidateUpdateInsertReqDto.getRawValue()
      firstValueFrom(this.candidateService.update(data)).then((res) => {
        this.router.navigateByUrl(`/candidates/detail/${this.candidateId}`)
      })
    }
  }


  get profile() {
    return this.candidateUpdateInsertReqDto.get('profile') as FormGroup
  }

  fileUpload(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

        this.profile.patchValue({
          file: resultBase64,
          fileExtension: resultExtension
        })

        fileUpload.clear()
      })
    }
  }

  fileUploadDoc(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

        this.documentInsertReqDto.patchValue({
          fileName: resultBase64,
          fileExtension: resultExtension
        })

        fileUpload.clear()
      })
    }
  }
}

const convertUTCToLocalDate = function (date: Date) {
  const newDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  return newDate.toISOString().split('T')[0]
}
