import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../../../../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-add-page',
  templateUrl: './ticket-add-page.component.html',
  styleUrl: './ticket-add-page.component.css'
})
export class TicketAddPageComponent {
  breadcrumbs: MenuItem[] = [];
  homeBreadcrumb: MenuItem | undefined;
  form: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [{ label: 'Ticket' }, { label: 'List', routerLink: '/ticket/list' }, { label: 'Add' }];
    this.homeBreadcrumb = { icon: 'pi pi-home', routerLink: '/' };

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [],
      status: ['Pending', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.ticketService.createTicket(this.form.value).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful' });
          this.router.navigate(['/ticket/list']);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
        }
      );
    } else {
      console.log('Invalid form. Please check fields.');
    }
  }
}
