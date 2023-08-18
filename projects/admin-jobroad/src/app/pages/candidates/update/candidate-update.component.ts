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

@Component({
    selector: 'candidate-update',
    templateUrl: './candidate-update.component.html',
    styleUrls: ['./candidate-update.component.css']
})
export class CandidateUpdateComponent implements OnInit {
    loading = false
    candidateUser? : CandidateUserResDto
    candidateAddresses! : CandidateAddressResDto[]
    candidateDocuments! : CandidateDocumentResDto[]
    candidateEducations! : CandidateEducationResDto[]
    candidateFamilies! : CandidateFamilyResDto[]
    candidateLanguages! : CandidateLanguageResDto[]
    candidateProjects! : CandidateProjectResDto[]
    candidateReferences! : CandidateReferencesResDto[]
    candidateSkills! : CandidateSkillResDto[]
    candidateTrainings! : CandidateTrainingResDto[]
    candidateWorks! : CandidateWorkResDto[]

    constructor(
        
    ) {

    }

    ngOnInit(): void {

    }
}