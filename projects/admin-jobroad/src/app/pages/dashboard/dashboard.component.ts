import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { CompanyService } from "../../service/company.service";
import { CompanyResDto } from "../../dto/company/company.res.dto";
import { UserResDto } from "../../dto/user/user.res.dto";
import { UserService } from "../../service/user.service";
import { JobService } from "../../service/job.service";
import { JobResDto } from "../../dto/job/job.res.dto";
import { BenefitResDto } from "../../dto/benefit/benefit.res.dto";
import { QuestionResDto } from "../../dto/question/question.res.dto";
import { CandidateUserResDto } from "../../dto/candidate-user/candidate-user.res.dto";
import { BenefitService } from "../../service/benefit.service";
import { QuestionService } from "../../service/question.service";
import { CandidateUserService } from "../../service/candidate-user.service";
// import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  fullName = ''
  salutation = ''
  companies!: CompanyResDto[]
  jobs!: JobResDto[]
  jobSize = 0
  benefits!: BenefitResDto[]
  benefitSize = 0
  questions!: QuestionResDto[]
  questionSize = 0
  candidates!: CandidateUserResDto[]
  candidateSize = 0
  companySize = 0
  users!: UserResDto[]
  userSize = 0

  constructor(private authService: AuthService, private companyService: CompanyService, private userService: UserService, private jobService: JobService, private benefitService: BenefitService, private questionService: QuestionService, private candidateService: CandidateUserService) {

  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {
      this.fullName = profile.fullName
      // this.salutation = profile
    }
    this.getCompanies()
    this.getUsers()
    this.getAllBenefits()
    this.getAllJobs()
    this.getAllQuestions()
    this.getAllCandidates()
  }

  getCompanies() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result
      this.companySize = this.companies.length
    })
  }

  getUsers() {
    this.userService.getAllUser().subscribe(result => {
      this.users = result
      this.userSize = this.users.length
    })
  }

  getAllJobs() {
    this.jobService.getAll().subscribe(result => {
      this.jobs = result;
      this.jobSize = this.jobs.length
    })
  }

  getAllBenefits() {
    this.benefitService.getAll().subscribe(result => {
      this.benefits = result;
      this.benefitSize = this.benefits.length
    })
  }

  getAllQuestions() {
    this.questionService.getAll().subscribe(result => {
      this.questions = result;
      this.questionSize = this.questions.length
    })
  }

  getAllCandidates() {
    this.candidateService.getAll().subscribe(result => {
      this.candidates = result
      this.candidateSize = this.candidates.length
    })
  }

}
