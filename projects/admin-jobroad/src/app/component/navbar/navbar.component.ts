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
    this.router.navigateByUrl('login')
  }

  items: MenuItem[] | undefined
  profile: MenuItem[] | undefined

  ngOnInit() {

    const profile = this.authService.getProfile()

    if (profile) {

      if(profile?.photoId){
        this.imageUrl = `http://localhost:8080/files/${profile.photoId}`
      }else{
        this.imageUrl = '../../../assets/emptyProfile.jpeg'
      }

      this.roleCode = profile?.roleCode
      this.profileName = profile.fullName

    }

    this.profile = [
      {
        label: this.profileName,
        items: [
          {
            icon: 'pi pi-fw pi-user',
            label: 'Profile',
            routerLink: '/users/profile'
          },
          {
            icon: 'pi pi-fw pi-unlock',
            label: 'Change Password',
            routerLink: '/users/change-password'
          },
          {
            icon: 'pi pi-fw pi-sign-out',
            label: 'Log Out',
            command: () => this.logOut()
          }
        ]
      }
    ];

    this.items = [
      {
        label: 'Home',
        icon:'pi pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Menu',
        icon:'pi pi-th-large',
        items:[
          {
            label: 'Users',
            icon:'pi pi-users',
            routerLink: '/users'
          },
          {
            label: 'Candidates',
            icon:'pi pi-user',
            routerLink: '/candidates'
          },
          {
            label: 'Companies',
            icon:'pi pi-id-card',
            routerLink: '/companies'
          },
          {
            label: 'Benefits',
            icon:'pi pi-money-bill',
            routerLink: '/benefits'
          },
          {
            label: 'Jobs',
            icon:'pi pi-briefcase',
            routerLink: '/jobs'
          },
          {
            label: 'Questions',
            icon:'pi pi-question-circle',
            routerLink: '/questions'
          },
        ]
      },
    ];
  }
}


