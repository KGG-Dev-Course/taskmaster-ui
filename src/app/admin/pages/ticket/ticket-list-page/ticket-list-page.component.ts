import { Component } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Ticket } from '../../../../shared/models/ticket';
import { TicketService } from '../../../../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-list-page',
  templateUrl: './ticket-list-page.component.html',
  styleUrl: './ticket-list-page.component.css'
})
export class TicketListPageComponent {
  tickets: Ticket[] = [];
  breadcrumbs: MenuItem[] = [];
  homeBreadcrumb: MenuItem | undefined;
  first: number = 0;
  rows: number = 10;
  showDetail: boolean = false;
  detailTicket: Ticket | undefined;

  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [{ label: 'Ticket' }, { label: 'List' }];
    this.homeBreadcrumb = { icon: 'pi pi-home', routerLink: '/' };
    this.loadData();
  }

  loadData(): void {
    this.ticketService.getAllTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
      this.tickets.forEach((ticket) => {
        ticket.dueDate = new Date(<Date>ticket.dueDate);
        ticket.createdAt = new Date(<Date>ticket.createdAt);
        ticket.updatedAt = new Date(<Date>ticket.updatedAt);
      });
    });
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Pending':
        return 'info';
      case 'Open':
        return 'danger';
      case 'InProgress':
        return 'warning';
      case 'Complete':
        return 'success';
    }

    return 'danger';
  }

  confirmDelete(event: Event, ticketId: number) {
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
        this.ticketService.deleteTicket(ticketId).subscribe(
          (result) => {
            const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);

            if (index !== -1) {
              this.tickets.splice(index, 1);
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

  showDetailDialog(ticket: Ticket) {
    this.detailTicket = ticket;
    this.showDetail = true;
  }


  filterTable(table: Table, event: any) {
    table.filterGlobal(event.target.value, 'contains')
  }
}
