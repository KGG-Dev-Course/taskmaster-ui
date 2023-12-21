import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menus: MenuItem[] = [];

  ngOnInit() {
    this.menus = [
      {
        label: 'Ticket',
        icon: 'pi pi-fw pi-ticket',
        items: [
          {
            label: 'List',
            icon: 'pi pi-fw pi-list',
            routerLink: '/ticket/list'
          }
        ]
      }
    ];
  }
}
