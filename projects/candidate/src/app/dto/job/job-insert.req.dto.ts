import { AssignedJobQuestionInsertReqDto } from "../assigned-job-question/assigned-job-question-insert.req.dto"
import { OwnedBenefitInsertReqDto } from "../owned-benefit/owned-benefit-insert.req.dto"

export interface JobInsertReqDto {
    jobName : string
	// jobCode : string
	companyId : string
	// companyCode : string
	startDate : string
	endDate : string
	description : string
	hrId : string
	picId : string
	expectedSalaryMin : number
	expectedSalaryMax : number
	benefits : (OwnedBenefitInsertReqDto | unknown) []
	questions: (AssignedJobQuestionInsertReqDto| unknown) []
	employmentTypeId : string
	// employmentTypeCode : string
	file : string
	fileExtension : string
}