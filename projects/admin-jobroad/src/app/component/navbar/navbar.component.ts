import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls:['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  sidebarVisible: boolean = false;
  imageUrl = ''
  profileName = ''
  private roleCode = ''

  constructor(private router: Router) {

  }

  logOut() {
    localStorage.clear()
    this.router.navigateByUrl('login')
  }

  sideBarActivate() {
    this.sidebarVisible = true
  }

  items: MenuItem[] | undefined
  profile:MenuItem[] | undefined

  ngOnInit() {

    // const profile = this.authService.getProfile()

    // if (profile) {
    //   this.imageUrl = `http://localhost:8080/files/${profile.photoId}`
    //   this.roleCode = profile?.roleCode
    //   this.profileName = profile.profileName

    // }

    this.profile = [
      {
        // label: this.profileName,
        items: [
          {
            icon:'pi pi-fw pi-user',
            label: 'Profile',
            routerLink : '/users/profile'
          },
          {
            icon:'pi pi-fw pi-unlock',
            label: 'Change Password',
            routerLink : '/users/change-password'
          },
          {
            icon:'pi pi-fw pi-sign-out',
            label: 'Log Out',
            command: () => this.logOut()
          }
        ]
      }
    ];

    this.items = [
      {
        label: 'Home',
        routerLink:'/dashboard'
      },
    ];
  }
}


