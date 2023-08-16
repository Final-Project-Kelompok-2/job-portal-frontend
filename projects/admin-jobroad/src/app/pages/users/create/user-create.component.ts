import { ChangeDetectorRef, Component, OnInit } from "@angular/core"
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { Table } from "primeng/table";


@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  loading = false
  // users!: UsersResDto[]

  // constructor(private roleService: RoleService,
  //   private companyService:CompanyService,
  //   private fb:NonNullableFormBuilder,
  //   private userService:UserService,
  //   private router: Router,
  //   private cd:ChangeDetectorRef){
  // }

  ngOnInit(): void {
    // this.getUsers()
  }


  // getUsers() {
  //   this.userService.getAllUser(true).subscribe(result => {
  //     this.users = result
  //   })
  // }

  // ngAfterViewChecked(): void {
  //   this.cd.detectChanges()
  // }

  // insert() {
  //   const data = this.userInsertReqDto.getRawValue()
  //   if (this.userInsertReqDto.valid) {
  //     this.loading = true
  //     this.userService.insert(data,true).subscribe(result=> {
  //       this.loading = false
  //       console.log(result);
  //       this.router.navigateByUrl('users')
  //     })
  //   }
  // }

  // fileUpload(event: any,fileUpload : FileUpload) {
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
  //       this.userInsertReqDto.patchValue({
  //         ext:resultExtension,file:resultBase64
  //       })
  //       fileUpload.clear()
  //       console.log(resultBase64)
  //       console.log(resultExtension)
  //     })
  //   }
  // }
}
