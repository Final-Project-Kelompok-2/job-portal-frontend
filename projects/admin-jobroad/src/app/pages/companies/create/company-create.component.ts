import { Component } from "@angular/core";
import { CompanyService } from "../../../service/company.service";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { FileUpload } from "primeng/fileupload";
import { Router } from "@angular/router";

@Component({
  selector: 'company-create',
  templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {
  loading = false
  companyReqDto = this.fb.group({
	  companyName: ['',Validators.required],
	  address: ['',Validators.required],
	  companyUrl: ['',Validators.required],
	  companyPhone: ['',Validators.required],
	  fileName: [''],
	  fileExtension: ['']
  })
  constructor(private companyService: CompanyService,
    private fb: NonNullableFormBuilder,private router : Router) { }

    onSubmit(){
      const data = this.companyReqDto.getRawValue();
      this.companyService.create(data).subscribe((result)=>{

        this.router.navigateByUrl('/companies');
      });
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

          this.companyReqDto.patchValue({
            fileName: resultBase64,
            fileExtension: resultExtension
          })
          fileUpload.clear();
        })
      }
    }
}
