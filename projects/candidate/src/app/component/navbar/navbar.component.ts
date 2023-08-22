import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { AuthService } from "../../service/auth.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  imageUrl = ''
  profileName = ''
  private roleCode = ''

  constructor(private router: Router, private authService: AuthService) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('/landing')
  }

  items: MenuItem[] | undefined
  profile: MenuItem[] | undefined

  ngOnInit() {

    const profile = this.authService.getProfile()

    if (profile) {

      if (profile?.photoId) {
        this.imageUrl = `http://localhost:8080/files/${profile.photoId}`
      } else {
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }

      this.roleCode = profile?.roleCode
      this.profileName = profile.fullName

    }

    if(profile){
      this.profile = [
        {
          label: this.profileName,
          items: [
            {
              icon: 'pi pi-fw pi-user',
              label: 'Profile',
              routerLink: '/candidates/profile'
            },
            {
              icon: 'pi pi-fw pi-unlock',
              label: 'Change Password',
              routerLink: '/candidates/change-password'
            },
            {
              icon: 'pi pi-fw pi-sign-out',
              label: 'Log Out',
              command: () => this.logOut()
            }
          ]
        }
      ];
    }

    if(profile){
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
        {
          label: 'Companies',
          icon: 'pi pi-id-card',
          routerLink: '/companies'
        },
        {
          label: 'Job Vacancies',
          icon: 'pi pi-briefcase',
          routerLink: '/jobs'
        },
        {
          label: 'Saved Job',
          icon: 'pi pi-bookmark',
          routerLink: '/jobs/saved'
        },
        {
          label: 'Applied Job',
          icon: 'pi pi-check-square',
          routerLink: '/jobs/applied'
        },

      ];
    }
    else{
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/dashboard'
        },
      ];
    }
  }
}


