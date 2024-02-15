import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrl: './user-list-page.component.css'
})
export class UserListPageComponent {
  users: User[] = [];
  breadcrumbs: MenuItem[] = [];
  homeBreadcrumb: MenuItem | undefined;
  first: number = 0;
  rows: number = 10;
  showDetail: boolean = false;
  detailUser: User | undefined;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [{ label: 'User' }, { label: 'List' }];
    this.homeBreadcrumb = { icon: 'pi pi-home', routerLink: '/' };
    this.loadData();
  }

  loadData(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  confirmDelete(event: Event, userId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          (result) => {
            const index = this.users.findIndex((user) => user.id === userId);

            if (index !== -1) {
              this.users.splice(index, 1);
            }

            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
          }
        );
      }
    });
  }

  showDetailDialog(user: User) {
    this.detailUser = user;
    this.showDetail = true;
  }


  filterTable(table: Table, event: any) {
    table.filterGlobal(event.target.value, 'contains')
  }
}
