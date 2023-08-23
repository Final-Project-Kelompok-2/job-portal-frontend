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
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
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
    styleUrls: ['./candidate-update.component.css']
})
export class CandidateUpdateComponent implements OnInit {
    imageUrl!:string
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
            birthPlace: ['', [Validators.required]],
            maritalStatusCode: ['', [Validators.required]],
            maritalStatusId: ['', [Validators.required]],
            religionCode: ['', [Validators.required]],
            religionId: ['', [Validators.required]],
            personTypeCode: ['', [Validators.required]],
            personTypeId: ['', [Validators.required]],
            fileId: [''],
            file: [''],
            fileExtension: [''],
            candidateStatusCode: ['', [Validators.required]],
            candidateStatusId: ['', [Validators.required]]
        })
    })

    trainingInsertReqDto = this.fb.group({
        organizationName: ['', [Validators.required]],
        trainingName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
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
        endYear: ['', [Validators.required]],
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
        endDate: ['', [Validators.required]],
        candidateId: ['', [Validators.required]],
        email: ['', [Validators.required]]
    })

    projectInsertReqDto = this.fb.group({
        projectName: ['', [Validators.required]],
        projectUrl: ['', [Validators.required]],
        description: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
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
        getParams(this.route, 0).subscribe((res) => {
            this.candidateId = res['id']
            this.candidateUserProfile
            this.candidateUserAddresses
            this.candidateUserEducations
            this.candidateUserWorkings
            this.candidateUserTrainings
            this.candidateUserProjects
            this.candidateUserSkills
            this.candidateUserLanguages
            this.candidateUserFamilies
            this.candidateUserReferences
            this.candidateUserDocuments
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

    get candidateUserProfile() {
        return this.candidateService.getCandidateUserById(this.candidateId)
            .subscribe((res) => {
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
                    candidateEmail: res.userEmail
                })

                this.documentInsertReqDto.patchValue({
                    candidateId: res.id,
                    email: res.userEmail
                })
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

    get candidateUserWorkings() {
        return this.candidateWorkExpService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateWorks = res
            })
    }

    get candidateUserTrainings() {
        return this.candidateTrainingExpService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateTrainings = res
            })
    }

    get candidateUserProjects() {
        return this.candidateProjectExpService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateProjects = res
            })
    }

    get candidateUserSkills() {
        return this.candidateSkillService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateSkills = res
            })
    }

    get candidateUserLanguages() {
        return this.candidateLanguageService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateLanguages = res
            })
    }

    get candidateUserFamilies() {
        return this.candidateFamilyService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateFamilies = res
            })
    }

    get candidateUserReferences() {
        return this.candidateReferenceService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateReferences = res
            })
    }

    get candidateUserDocuments() {
        return this.candidateDocumentService.getByCandidate(this.candidateId)
            .subscribe((res) => {
                this.candidateDocuments = res
            })
    }

    showAddAddress() {
        this.dialogAddress = true;
    }

    showDeleteAddress(id: string) {
        this.addressId = id
        this.dialogDeleteAddress = true;
    }

    showAddEducation() {
        this.dialogEducation = true;
    }

    showDeleteEducation(id: string) {
        this.educationId = id
        this.dialogDeleteEducation = true
    }

    showAddFamily() {
        this.dialogFamily = true;
    }

    showDeleteFamily(id: string) {
        this.familyId = id
        this.dialogDeleteFamily = true
    }

    showAddSkill() {
        this.dialogSkill = true;
    }

    showDeleteSkill(id: string) {
        this.skillId = id
        this.dialogDeleteSkill = true
    }

    showAddLanguage() {
        this.dialogLanguage = true;
    }

    showDeleteLanguage(id: string) {
        this.languageId = id
        this.dialogDeleteLanguage = true
    }

    showAddReference() {
        this.dialogReference = true;
    }

    showDeleteReference(id: string) {
        this.referenceId = id
        this.dialogDeleteReference = true
    }

    showAddWorking() {
        this.dialogWorking = true;
    }

    showDeleteWorking(id: string) {
        this.workingId = id
        this.dialogDeleteWorking = true
    }

    showAddTraining() {
        this.dialogTraining = true;
    }

    showDeleteTraining(id: string) {
        this.trainingId = id
        this.dialogDeleteTraining = true
    }

    showAddProject() {
        this.dialogProject = true;
    }

    showDeleteProject(id: string) {
        this.projectId = id
        this.dialogDeleteProject = true
    }

    showAddDocuments() {
        this.dialogDocument = true;
    }

    showDeleteDocument(id: string) {
        this.documentId = id
        this.dialogDeleteDocument = true
    }

    onAddAddress() {
        if (this.addressInsertReqDto.valid) {
            const data = this.addressInsertReqDto.getRawValue()
            this.candidateAddressService.create(data).subscribe((res) => {
                this.candidateUserAddresses
                this.addressInsertReqDto.reset()
                this.dialogAddress = false
            })
        }
    }

    onAddEducation() {
        if (this.educationInsertReqDto.valid) {
            const data = this.educationInsertReqDto.getRawValue()
            this.candidateEducationService.create(data).subscribe((res) => {
                this.candidateUserEducations
                this.educationInsertReqDto.reset()
                this.dialogEducation = false
            })
        }
    }

    onAddWorking() {
        if (this.workingInsertReqDto.valid) {
            const data = this.workingInsertReqDto.getRawValue()
            this.candidateWorkExpService.create(data).subscribe((res) => {
                this.candidateUserWorkings
                this.workingInsertReqDto.reset()
                this.dialogWorking = false
            })
        }
    }

    onAddTraining() {
        if (this.trainingInsertReqDto.valid) {
            const data = this.trainingInsertReqDto.getRawValue()
            this.candidateTrainingExpService.create(data).subscribe((res) => {
                this.candidateUserTrainings
                this.trainingInsertReqDto.reset()
                this.dialogTraining = false
            })
        }
    }

    onAddProject() {
        if (this.projectInsertReqDto.valid) {
            const data = this.projectInsertReqDto.getRawValue()
            this.candidateProjectExpService.create(data).subscribe((res) => {
                this.candidateUserProjects
                this.projectInsertReqDto.reset()
                this.dialogProject = false
            })
        }
    }

    onAddSkill() {
        if (this.skillInsertReqDto.valid) {
            const data = this.skillInsertReqDto.getRawValue()
            this.candidateSkillService.create(data).subscribe((res) => {
                this.candidateUserSkills
                this.skillInsertReqDto.reset()
                this.dialogSkill = false
            })
        }
    }

    onAddLanguage() {
        if (this.languageInsertReqDto.valid) {
            const data = this.languageInsertReqDto.getRawValue()
            this.candidateLanguageService.create(data).subscribe((res) => {
                this.candidateUserLanguages
                this.languageInsertReqDto.reset()
                this.dialogLanguage = false
            })
        }
    }

    onAddFamily() {
        if (this.familyInsertReqDto.valid) {
            const data = this.familyInsertReqDto.getRawValue()
            this.candidateFamilyService.create(data).subscribe((res) => {
                this.candidateUserFamilies
                this.familyInsertReqDto.reset()
                this.dialogFamily = false
            })
        }
    }

    onAddReference() {
        if (this.referenceInsertReqDto.valid) {
            const data = this.referenceInsertReqDto.getRawValue()
            this.candidateReferenceService.create(data).subscribe((res) => {
                this.candidateUserReferences
                this.referenceInsertReqDto.reset()
                this.dialogReference = false
            })
        }
    }

    onAddDocument() {
        if (this.documentInsertReqDto.valid) {
            const data = this.documentInsertReqDto.getRawValue()
            this.candidateDocumentService.create(data).subscribe((res) => {
                this.candidateUserDocuments
                this.documentInsertReqDto.reset()
                this.dialogDocument = false
            })
        }
    }

    onDeleteAddress() {
        this.candidateAddressService.delete(this.addressId).subscribe((res) => {
            this.candidateUserAddresses
            this.dialogDeleteAddress = false
        })
    }

    onDeleteTraining() {
        this.candidateTrainingExpService.delete(this.trainingId).subscribe((res) => {
            this.candidateUserTrainings
            this.dialogDeleteTraining = false
        })
    }

    onDeleteEducation() {
        this.candidateEducationService.delete(this.educationId).subscribe((res) => {
            this.candidateUserEducations
            this.dialogDeleteEducation = false
        })
    }

    onDeleteWorking() {
        this.candidateWorkExpService.delete(this.workingId).subscribe((res) => {
            this.candidateUserWorkings
            this.dialogDeleteWorking = false
        })
    }

    onDeleteProject() {
        this.candidateProjectExpService.delete(this.projectId).subscribe((res) => {
            this.candidateUserProjects
            this.dialogDeleteProject = false
        })
    }

    onDeleteSkill() {
        this.candidateSkillService.delete(this.skillId).subscribe((res) => {
            this.candidateUserSkills
            this.dialogDeleteSkill = false
        })
    }

    onDeleteLanguage() {
        this.candidateLanguageService.delete(this.languageId).subscribe((res) => {
            this.candidateUserLanguages
            this.dialogDeleteLanguage = false
        })
    }

    onDeleteFamily() {
        this.candidateFamilyService.delete(this.familyId).subscribe((res) => {
            this.candidateUserFamilies
            this.dialogDeleteFamily = false
        })
    }

    onDeleteReference() {
        this.candidateReferenceService.delete(this.referenceId).subscribe((res) => {
            this.candidateUserReferences
            this.dialogDeleteReference = false
        })
    }

    onDeleteDocument() {
        this.candidateDocumentService.delete(this.documentId).subscribe((res) => {
            this.candidateUserDocuments
            this.dialogDeleteDocument = false
        })
    }

    onUpdate() {
        if (this.candidateUpdateInsertReqDto.valid) {
            const data = this.candidateUpdateInsertReqDto.getRawValue()
            this.candidateService.update(data).subscribe((res) => {
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
