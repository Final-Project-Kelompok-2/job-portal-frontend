import { Component } from "@angular/core";
import { FileUpload } from "primeng/fileupload";

@Component({
  selector:'company-update',
  templateUrl:'./company-update.component.html',
  styleUrls:['./company-update.component.css']

})
export class CompanyUpdateComponent {





  // fileUpload(event: any, fileUpload: FileUpload) {
  //   const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       if (typeof reader.result === "string") resolve(reader.result)
  //     };
  //     reader.onerror = error => reject(error);
  //   });

  //   for (let file of event.files) {
  //     toBase64(file).then(result => {
  //       const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
  //       const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

  //       this.companyReqDto.patchValue({
  //         fileName: resultBase64,
  //         fileExtension: resultExtension
  //       })
  //       fileUpload.clear();
  //     })
  //   }
  // }
}
