import { Component, OnInit } from "@angular/core";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { Form, FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CandidateTrainingInsertReqDto } from "../../../dto/candidate-training/candidate-training-insert.req.dto";
import { FileUpload } from "primeng/fileupload";
import { CandidateAddressInsertReqDto } from "../../../dto/candidate-address/candidate-address-insert.req.dto";
import { CandidateEducationInsertReqDto } from "../../../dto/candidate-education/candidate-education-insert.req.dto";
import { CandidateWorkInsertReqDto } from "../../../dto/candidate-work/candidate-work-insert.req.dto";
import { CandidateProjectInsertReqDto } from "../../../dto/candidate-project/candidate-project-insert.req.dto";
import { CandidateSkillInsertReqDto } from "../../../dto/candidate-skill/candidate-skill-insert.req.dto";
import { CandidateLanguageInsertReqDto } from "../../../dto/candidate-language/candidate-language-insert.req.dto";
import { CandidateFamilyInsertReqDto } from "../../../dto/candidate-family/candidate-family-insert.req.dto";
import { CandidateReferencesInsertReqDto } from "../../../dto/candidate-references/candidate-references-insert.req.dto";
import { ReligionService } from "../../../service/religion.service";
import { ReligionResDto } from "../../../dto/religion/religion.res.dto";

interface Salutation {
  value: string;
  label: string;
}
interface Gender {
  value: string;
  label: string;
}
interface Marital {
  value: string,
  label: string
}
interface CandidateType {
  value: string,
  label: string
}
interface CandidateStatus {
  value: string,
  label: string
}
interface ResidenceType {
  value: string,
  label: string
}
interface Degree {
  value: string,
  label: string
}
@Component({
  selector: 'candidate-create',
  templateUrl: './candidate-create.component.html'
})
export class CandidateCreateComponent implements OnInit {
  loading = false
  salaryValue: number = 0
  dialogAddress: boolean = false
  dialogEducation: boolean = false
  dialogFamily: boolean = false
  dialogSkill: boolean = false
  dialogLanguage: boolean = false
  dialogReference: boolean = false
  dialogWorking: boolean = false
  dialogTraining: boolean = false
  dialogProject: boolean = false
  trainings: CandidateTrainingInsertReqDto[] = []
  addresses: CandidateAddressInsertReqDto[] = []
  educations: CandidateEducationInsertReqDto[] = []
  workings: CandidateWorkInsertReqDto[] = []
  projects: CandidateProjectInsertReqDto[] = []
  skills: CandidateSkillInsertReqDto[] = []
  languages: CandidateLanguageInsertReqDto[] = []
  families: CandidateFamilyInsertReqDto[] = []
  references: CandidateReferencesInsertReqDto[] = []
  degrees: Degree[] | undefined
  salutations: Salutation[] | undefined
  genders: Gender[] | undefined
  maritals: Marital[] | undefined
  religions!: ReligionResDto[]
  types: CandidateType[] | undefined
  residenceType: ResidenceType[] | undefined
  candidateStatus: CandidateStatus[] | undefined

  constructor(
    private religionService: ReligionService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) { }

  candidateMasterInsertReqDto = this.fb.group({
    userEmail: ['', Validators.required],
    salutation: ['', Validators.required],
    fullname: ['', Validators.required],
    gender: ['', Validators.required],
    experience: ['', Validators.required],
    expectedSalary: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    nik: ['', Validators.required],
    birthDate: ['', Validators.required],
    birthPlace: ['', Validators.required],
    maritalStatusId: ['', Validators.required],
    religionId: ['', Validators.required],
    personTypeId: ['', Validators.required],
    file: ['', Validators.required],
    fileExtension: ['', Validators.required],
    candidateStatusId: ['', Validators.required],
    cdtAddresses: this.fb.array(this.addresses),
    trainingsExp: this.fb.array(this.trainings),
    educationsExp: this.fb.array(this.educations),
    workingsExp: this.fb.array(this.workings),
    projectsExp: this.fb.array(this.projects),
    cdtSkills: this.fb.array(this.skills),
    cdtLanguages: this.fb.array(this.languages),
    cdtFamilies: this.fb.array(this.families),
    cdtReferences: this.fb.array(this.references)
  })

  trainingInsertReqDto = this.fb.group({
    organizationName: ['', [Validators.required]],
    trainingName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  addressInsertReqDto = this.fb.group({
    address: ['', [Validators.required]],
    residenceType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    province: ['', [Validators.required]],
    city: ['', [Validators.required]],
    postalCode: ['', [Validators.required]]
  })

  educationInsertReqDto = this.fb.group({
    degreeName: ['', [Validators.required]],
    instituitionName: ['', [Validators.required]],
    majors: ['', [Validators.required]],
    cgpa: ['', [Validators.required]],
    startYear: ['', [Validators.required]],
    endYear: ['', [Validators.required]]
  })

  workingInsertReqDto = this.fb.group({
    positionName: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    address: ['', [Validators.required]],
    responsibility: ['', [Validators.required]],
    reasonLeave: ['', [Validators.required]],
    lastSalary: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  projectInsertReqDto = this.fb.group({
    projectName: ['', [Validators.required]],
    projectUrl: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  skillInsertReqDto = this.fb.group({
    skillName : ['', [Validators.required]]
  })

  languageInsertReqDto = this.fb.group({
    languageName : ['', [Validators.required]],
    writingRate : ['', [Validators.required]],
    speakingRate : ['', [Validators.required]],
    listeningRate : ['', [Validators.required]]
  })

  familyInsertReqDto = this.fb.group({
    fullname : ['', [Validators.required]],
    relationship : ['', [Validators.required]],
    degreeName : ['', [Validators.required]],
    occupation : ['', [Validators.required]],
    birthDate : ['', [Validators.required]],
    birthPlace : ['', [Validators.required]],
    email : ['', [Validators.required]]
  })

  referenceInsertReqDto = this.fb.group({
    fullname : ['', [Validators.required]],
    relationship : ['', [Validators.required]],
    occupation : ['', [Validators.required]],
    phoneNumber : ['', [Validators.required]],
    email : ['', [Validators.required]],
    company : ['', [Validators.required]],
    description : ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.salutations = [
      { value: 'Mr.', label: 'Mr.' },
      { value: 'Mrs.', label: 'Mrs.' }
    ];

    this.genders = [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ];

    this.maritals = [
      { value: 'SNG', label: 'Single' },
      { value: 'MRD', label: 'Married' }
    ]

    this.religionService.getAll().subscribe((res) => {
      this.religions = res
      console.log(this.religions);
    })

    this.types = [
      { value: 'CND', label: 'Candidate' },
      { value: 'EMP', label: 'Employee' }
    ]

    this.candidateStatus = [
      { value: 'ACT', label: 'Active' },
      { value: 'OPG', label: 'On Progress' }
    ]

    this.residenceType = [
      { value: 'Home', label: 'Home' },
      { value: 'Domicile', label: 'Domicile' }
    ]

    this.degrees = [
      { value: 'Sarjana (S1)', label: 'Sarjana (S1)' },
      { value: 'Magister (S2)', label: 'Magister (S2)' }
    ]
  }

  showAddAddress() {
    this.dialogAddress = true;
  }

  showAddEducation() {
    this.dialogEducation = true;
  }

  showAddFamily() {
    this.dialogFamily = true;
  }

  showAddSkill() {
    this.dialogSkill = true;
  }

  showAddLanguage() {
    this.dialogLanguage = true;
  }

  showAddReference() {
    this.dialogReference = true;
  }

  showAddWorking() {
    this.dialogWorking = true;
  }

  showAddTraining() {
    this.dialogTraining = true;
  }

  showAddProject() {
    this.dialogProject = true;
  }

  onSubmit() {
    if (this.candidateMasterInsertReqDto.valid) {
      const data = this.candidateMasterInsertReqDto.getRawValue()
      console.log("Insert Candidate Profile!");
    }
  }

  get cdtAddresses() {
    return this.candidateMasterInsertReqDto.get('cdtAddresses') as FormArray
  }

  onAddAddress() {
    if (this.addressInsertReqDto.valid) {
      const data = this.addressInsertReqDto.getRawValue()

      this.cdtAddresses.push(this.fb.group(data))
      this.addressInsertReqDto.reset()
      this.dialogAddress = false
    }
  }

  get trainingsExp() {
    return this.candidateMasterInsertReqDto.get('trainingsExp') as FormArray
  }

  onAddTraining() {
    if (this.trainingInsertReqDto.valid) {
      const data = this.trainingInsertReqDto.getRawValue()

      this.trainingsExp.push(this.fb.group(data))
      this.trainingInsertReqDto.reset()
      this.dialogTraining = false
    }
  }

  get educationsExp() {
    return this.candidateMasterInsertReqDto.get('educationsExp') as FormArray
  }

  onAddEducation() {
    if (this.educationInsertReqDto.valid) {
      const data = this.educationInsertReqDto.getRawValue()

      this.educationsExp.push(this.fb.group(data))
      this.educationInsertReqDto.reset()
      this.dialogEducation = false
    }
  }

  get workingsExp() {
    return this.candidateMasterInsertReqDto.get('workingsExp') as FormArray
  }

  onAddWorking() {
    if (this.workingInsertReqDto.valid) {
      const data = this.workingInsertReqDto.getRawValue()

      this.workingsExp.push(this.fb.group(data))
      this.workingInsertReqDto.reset()
      this.dialogWorking = false
    }
  }

  get projectsExp() {
    return this.candidateMasterInsertReqDto.get('projectsExp') as FormArray
  }

  onAddProject() {
    if (this.projectInsertReqDto.valid) {
      const data = this.projectInsertReqDto.getRawValue()

      this.projectsExp.push(this.fb.group(data))
      this.projectInsertReqDto.reset()
      this.dialogProject = false
    }
  }

  get cdtSkills() {
    return this.candidateMasterInsertReqDto.get('cdtSkills') as FormArray
  }

  onAddSkill() {
    if (this.skillInsertReqDto.valid) {
      const data = this.skillInsertReqDto.getRawValue()

      this.cdtSkills.push(this.fb.group(data))
      this.skillInsertReqDto.reset()
      this.dialogSkill = false
    }
  }

  get cdtLanguages() {
    return this.candidateMasterInsertReqDto.get('cdtLanguages') as FormArray
  }

  onAddLanguage() {
    if (this.languageInsertReqDto.valid) {
      const data = this.languageInsertReqDto.getRawValue()

      this.cdtLanguages.push(this.fb.group(data))
      this.languageInsertReqDto.reset()
      this.dialogLanguage = false
    }
  }

  get cdtFamilies() {
    return this.candidateMasterInsertReqDto.get('cdtFamilies') as FormArray
  }

  onAddFamily() {
    if (this.familyInsertReqDto.valid) {
      const data = this.familyInsertReqDto.getRawValue()

      this.cdtFamilies.push(this.fb.group(data))
      this.familyInsertReqDto.reset()
      this.dialogFamily = false
    }
  }

  get cdtReferences() {
    return this.candidateMasterInsertReqDto.get('cdtReferences') as FormArray
  }

  onAddReference() {
    if (this.referenceInsertReqDto.valid) {
      const data = this.referenceInsertReqDto.getRawValue()

      this.cdtReferences.push(this.fb.group(data))
      this.referenceInsertReqDto.reset()
      this.dialogReference = false
    }
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

        this.candidateMasterInsertReqDto.patchValue({
          file: resultBase64,
          fileExtension: resultExtension
        })

        fileUpload.clear()
      })
    }
  }
}
