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
import { ActivatedRoute, Params } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
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
import { Observable } from "rxjs";

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
    styleUrls: ['./candidate-update.component.css']
})
export class CandidateUpdateComponent implements OnInit {
    loading = false
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

    candidateUpdateInsertReqDto = this.fb.group({
        userEmail: ['', Validators.required],
        salutation: ['', Validators.required],
        fullname: ['', Validators.required],
        gender: ['', Validators.required],
        experience: ['', Validators.required],
        expectedSalary: [0, Validators.required],
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
        candidateStatusId: ['', Validators.required]
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
        postalCode: ['', [Validators.required]],
        candidateId: ['', [Validators.required]],
        email: ['', [Validators.required]]
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
        skillName: ['', [Validators.required]]
      })
    
      languageInsertReqDto = this.fb.group({
        languageName: ['', [Validators.required]],
        writingRate: ['', [Validators.required]],
        speakingRate: ['', [Validators.required]],
        listeningRate: ['', [Validators.required]]
      })
    
      familyInsertReqDto = this.fb.group({
        fullname: ['', [Validators.required]],
        relationship: ['', [Validators.required]],
        degreeName: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
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
        description: ['', [Validators.required]]
      })
    
      documentInsertReqDto = this.fb.group({
        docName: ['', [Validators.required]],
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
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder
    ) {

    }

    ngOnInit(): void {
        
        getParams(this.route, 0).subscribe((res) => {
            this.candidateService.getCandidateUserById(res['id'])
                .subscribe((res) => {
                    this.candidateUser = res
                    this.candidateUpdateInsertReqDto.patchValue({
                        userEmail: res.userEmail,
                        salutation: res.salutation,
                        fullname: res.fullname,
                        gender: res.gender,
                        experience: res.experience,
                        expectedSalary: res.expectedSalary,
                        phoneNumber: res.phoneNumber,
                        mobileNumber: res.mobileNumber,
                        nik: res.nik,
                        birthDate: res.birthDate,
                        birthPlace: res.birthPlace,
                        maritalStatusId: res.maritalStatusId,
                        religionId: res.religionId,
                        personTypeId: res.personTypeId,
                        file: res.fileId,
                        candidateStatusId: res.candidateStatusId
                    })
                })

            this.candidateAddressService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateAddresses = res
                })

            this.candidateEducationService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateEducations = res
                })

            this.candidateFamilyService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateFamilies = res
                })

            this.candidateLanguageService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateLanguages = res
                })

            this.candidateProjectExpService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateProjects = res
                })

            this.candidateReferenceService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateReferences = res
                })

            this.candidateSkillService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateSkills = res
                })

            this.candidateTrainingExpService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateTrainings = res
                })

            this.candidateWorkExpService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateWorks = res
                })    
            
            this.candidateDocumentService.getByCandidate(res['id'])
                .subscribe((res) => {
                    this.candidateDocuments = res
                })
        })

        this.religionService.getAll().subscribe((res) => {
            this.religions = res
        })

        this.personTypeService.getAll().subscribe((res) => {
            this.types = res
        })

        this.candidateStatusService.getAll().subscribe((res) => {
            this.candidateStatus = res
        })

        this.maritalStatusService.getAll().subscribe((res) => {
            this.maritals = res
        })

        this.fileTypeService.getAll().subscribe((res) => {
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

    showAddDocuments() {
        this.dialogDocument = true;
    }

    onAddAddress() {
        if(this.addressInsertReqDto.valid) {
            const data = this.addressInsertReqDto.getRawValue()
            this.candidateAddressService.create(data).subscribe((res) => {
                this.addressInsertReqDto.reset()
                this.dialogAddress = false
            })
        }
    }

    onDeleteAddress(i: number) {

    }

    onDeleteTraining(i: number) {

    }

    onDeleteEducation(i: number) {

    }

    onDeleteWorking(i: number) {

    }

    onDeleteProject(i: number) {

    }

    onDeleteSkill(i: number) {

    }

    onDeleteLanguage(i: number) {

    }

    onDeleteFamily(i: number) {

    }

    onDeleteReference(i: number) {

    }

    onDeleteDocument(i: number) {

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

                // this.candidateMasterInsertReqDto.patchValue({
                //   file: resultBase64,
                //   fileExtension: resultExtension
                // })

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

                // this.documentInsertReqDto.patchValue({
                //   fileName: resultBase64,
                //   fileExtension: resultExtension
                // })

                fileUpload.clear()
            })
        }
    }
}