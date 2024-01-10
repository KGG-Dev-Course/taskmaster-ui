import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menus: MenuItem[] = [];
  rightMenus: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.menus = [
      {
        label: 'User',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: '/user/list'
          },
          {
            label: 'Add',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/user/add'
          }
        ]
      },
      {
        label: 'Ticket',
        icon: 'pi pi-fw pi-ticket',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: '/ticket/list'
          },
          {
            label: 'Add',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/ticket/add'
          }
        ]
      }
    ];

    this.rightMenus = [
      {
        label: 'My profile',
        icon: 'pi pi-user',
        routerLink: '/profile/view'
      },
      {
        label: 'My gallery',
        icon: 'pi pi-images',
        routerLink: '/gallery/list'
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ]
  }

  logout() {
    this.socialAuthService.signOut();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  showMenu(): boolean {
    return this.authService.isAuthenticated();
  }
}
