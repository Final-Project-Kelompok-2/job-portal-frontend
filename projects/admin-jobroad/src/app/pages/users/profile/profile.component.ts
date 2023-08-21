import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class UserProfileComponent implements OnInit {
  loading = false
  imageUrl = ''

  constructor(private authService : AuthService) {

  }

  ngOnInit(): void {
    const profile = this.authService.getProfile()

    if (profile) {

      if(profile?.photoId){
        this.imageUrl = `http://localhost:8080/files/${profile.photoId}`
      }else{
        this.imageUrl = '../../../../assets/emptyProfile.jpeg'
      }

      // this.roleCode = profile?.roleCode
      // this.profileName = profile.fullName

    }
  }

}
