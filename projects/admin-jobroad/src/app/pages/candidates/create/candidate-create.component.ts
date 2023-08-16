import { Component, OnInit } from "@angular/core";
import { CandidateAddressService } from "../../../service/candidate-address.service";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CandidateTrainingInsertReqDto } from "../../../dto/candidate-training/candidate-training-insert.req.dto";
import { FileUpload } from "primeng/fileupload";

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
interface Religion {
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
@Component({
  selector: 'candidate-create',
  templateUrl: './candidate-create.component.html'
})
export class CandidateCreateComponent implements OnInit {
  loading = false
  salaryValue: number = 0;
  dialogAddress: boolean = false;
  dialogEducation: boolean = false;
  dialogFamily: boolean = false;
  dialogSkill: boolean = false;
  dialogLanguage: boolean = false;
  dialogReference: boolean = false;
  dialogWorking: boolean = false;
  dialogTraining: boolean = false;
  dialogProject: boolean = false;
  trainings: CandidateTrainingInsertReqDto[] = []
  salutations: Salutation[] | undefined;
  genders: Gender[] | undefined;
  maritals: Marital[] | undefined;
  religions: Religion[] | undefined;
  types: CandidateType[] | undefined;
  candidateStatus: CandidateStatus[] | undefined;
  families = []

  constructor(
    private candidateAddressService: CandidateAddressService,
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
    trainingsExp: this.fb.array(this.trainings)
  })

  trainingInsertReqDto = this.fb.group({
    organizationName: ['', [Validators.required]],
    trainingName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
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

    this.religions = [
      { value: 'ISL', label: 'Islam' },
      { value: 'CHR', label: 'Christian' },
      { value: 'HND', label: 'Hindu' }
    ]

    this.types = [
      { value: 'CND', label: 'Candidate' },
      { value: 'EMP', label: 'Employee' }
    ]

    this.candidateStatus = [
      { value: 'ACT', label: 'Active' },
      { value: 'OPG', label: 'On Progress' }
    ]
  }

  dummyEducation = [
    {
      instituitionName: 'Universitas Tarumanegara',
      degreeName: 'Magister (S2)',
      majors: 'Information Technology',
      cgpa: 3.9,
      startYear: 'August 5, 2019',
      endYear: 'May 21, 2022'
    }
  ];

  dummyAddresses = [
    {
      address: "Jl. Menuju Surga 1",
      residenceType: "Home",
      country: "Indonesia",
      province: "DKI Jakarta",
      city: "South Jakarta",
      postalCode: "15116"
    }
  ]

  dummyWorking = [
    {
      positionName: "Database Admin",
      companyName: "PT. Karya Digital Cemerlang",
      address: "Jl. Kebayoran Baru No.21",
      responsibility: "Managing Database",
      reasonLeave: "Lazy",
      lastSalary: 5000000,
      startDate: "October 01, 2022",
      endDate: "December 30, 2022"
    }
  ]

  dummmySkill = [
    {
      skillName: "Web Design"
    },
    {
      skillName: "Database Adminsitartor"
    },
    {
      skillName: "Video Editing"
    }
  ]

  dummyTraining = [
    {
      organizationName: "Google Indonesia",
      trainingName: "IT Support Seminar",
      description: "IT Support personnel diagnose and resolve technical problems that users encounter. ",
      startDate: "October 01, 2019",
      endDate: "November 30, 2019"
    }
  ]

  dummyProject = [
    {
      "projectName": "Asset Management System",
      "projectUrl": "www.github.com/assets",
      "description": "This is AMS Project",
      "startDate": "January 01, 2019",
      "endDate": "June 01, 2019"
    }
  ]

  get trainingsExp() {
    return this.candidateMasterInsertReqDto.get('trainingsExp') as FormArray
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
    this.trainingsExp.push(this.trainingInsertReqDto)
  }

  showAddProject() {
    this.dialogProject = true;
  }

  onSubmit() {

  }

  onAddTraining() {
    
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
