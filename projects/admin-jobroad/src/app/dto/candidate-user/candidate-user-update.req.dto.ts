export interface CandidateUserUpdateReqDto {
    id : string 
	userEmail : string 
	salutation : string
	fullname : string
	gender : string
	experience : string
	expectedSalary : number
	phoneNumber : string
	mobileNumber : string
	nik : string
	birthDate : string
	birthPlace : string
	maritalStatusId : string
	religionId : string
	personTypeId : string
	fileId : string
	file? : string
	fileExtension? : string
	candidateStatusId : string
}