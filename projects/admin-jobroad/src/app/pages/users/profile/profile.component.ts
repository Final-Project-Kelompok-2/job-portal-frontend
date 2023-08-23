import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth.service";
import { UserService } from "../../../service/user.service";
import { firstValueFrom } from "rxjs";
import { UserResDto } from "../../../dto/user/user.res.dto";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { FileUpload } from "primeng/fileupload";
import { ProfileResDto } from "../../../dto/profile/profile.res.dto";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class UserProfileComponent implements OnInit {
  loading = false
  imageUrl = ''
  user! : UserResDto;
  profileData! : ProfileResDto;
  updateProfileDto = this.fb.group({
    id : ['',Validators.required],
    fullName : ['',Validators.required],
    address : ['',Validators.required],
    phoneNumber : ['',Validators.required],
    fileName : ['',Validators.required],
    fileExtension : ['',Validators.required]
  })
  constructor(private authService : AuthService,private userService : UserService,
    private fb : NonNullableFormBuilder) {

  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {

      if(profile?.photoId){
        this.imageUrl = `http://localhost:8080/files/${profile.photoId}`
      }else{
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }
      firstValueFrom(this.userService.getById(profile.userId)).then(result =>{
        this.user = result
        firstValueFrom(this.userService.getProfile(this.user.profileId)).then(result =>{
          this.profileData = result;
          this.updateProfileDto.patchValue({
            id : this.user.profileId,
            fullName : this.profileData.fullName,
            address : this.profileData.address,
            phoneNumber : this.profileData.phoneNumber
            
          })
        })
      })
      // this.roleCode = profile?.roleCode
      // this.profileName = profile.fullName

    }
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

          this.updateProfileDto.patchValue({
            fileName: resultBase64,
            fileExtension: resultExtension
          })
          fileUpload.clear();
        })
      }
    }

}
