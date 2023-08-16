import { Component, OnInit } from "@angular/core";
import { JobService } from "../../../service/job.service";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { EmploymentTypeService } from "../../../service/employment-type.service";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { EmployementTypeResDto } from "../../../dto/employement-type/employement-type.res.dto";
import { CompanyService } from "../../../service/company.service";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { BenefitResDto } from "../../../dto/benefit/benefit.res.dto";
import { QuestionResDto } from "../../../dto/question/question.res.dto";
import { BenefitService } from "../../../service/benefit.service";
import { QuestionService } from "../../../service/question.service";
import { FileUpload } from "primeng/fileupload";
import { RoleCodeEnum } from "../../../constant/user-role.constant";

@Component({
  selector:'job-create',
  templateUrl:'./job-create.component.html'
}) 
export class JobCreateComponent implements OnInit{
  loading = false
  jobReqDto = this.fb.group({
    jobName : ['',Validators.required],
    companyId : ['',Validators.required],
    startDate : ['',Validators.required],
    endDate : ['',Validators.required],
    description : ['',Validators.required],
    hrId : ['',Validators.required],
    picId : ['',Validators.required],
    expectedSalaryMin : [0],
    expectedSalaryMax : [0],
    employmentTypeId : ['',Validators.required],
    benefits : this.fb.array([]),
    questions : this.fb.array([]),
    file : [''],
    fileExtension : ['']


  });
  hr! : UserResDto[];
  pic! : UserResDto[];
  company! : CompanyResDto[];
  employmentType! : EmployementTypeResDto[];
  benefit! : BenefitResDto[];
  question! : QuestionResDto[];
  constructor(private jobService : JobService,private fb : NonNullableFormBuilder, 
    private router : Router,private userService : UserService , private employmentTypeService : EmploymentTypeService,
    private companyService : CompanyService,private benefitService : BenefitService,
    private questionService : QuestionService){}
    
  ngOnInit(): void {
    this.userService.getByRole(RoleCodeEnum.HR).subscribe(result =>{
      this.hr = result;
    })
    this.userService.getByRole(RoleCodeEnum.PIC).subscribe(result =>{
      this.pic = result;
    })
    this.employmentTypeService.getAll().subscribe(result =>{
      this.employmentType = result;
    })
    this.companyService.getAll().subscribe(result =>{
      this.company = result;
    })
    this.benefitService.getAll().subscribe(result =>{
      this.benefit = result;
    })
    this.questionService.getAll().subscribe(result =>{
      this.question = result;
    })
  }

  get benefitsId(){
    return this.jobReqDto.get(`benefits`) as FormArray;
  }
  get questionsId(){
    return this.jobReqDto.get(`questions`) as FormArray;
  }
  addBenefit(){
    this.benefitsId.push(this.fb.group({benefitId : ['',Validators.required]}));
  }
  addQuestion(){
    this.questionsId.push(this.fb.group({questionId : ['']}));
  }
  onSubmit(){
    const data= this.jobReqDto.getRawValue();
    this.jobService.create(data).subscribe();
    this.router.navigateByUrl('/jobs')
  }
  removeBenefit( i : number){
    this.benefitsId.removeAt(i);
  }
  removeQuestion(q : number){
    this.questionsId.removeAt(q);
  }
  fileUpload(event: any,fileUpload : FileUpload) {
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

        this.jobReqDto.patchValue({
          file: resultBase64,
          fileExtension: resultExtension
        })
        fileUpload.clear();
      })
    }
  }
}
