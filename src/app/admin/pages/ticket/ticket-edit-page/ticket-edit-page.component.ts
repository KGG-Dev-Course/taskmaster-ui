import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Ticket } from '../../../../shared/models/ticket';
import { TicketService } from '../../../../shared/services/ticket.service';

@Component({
  selector: 'app-ticket-edit-page',
  templateUrl: './ticket-edit-page.component.html',
  styleUrl: './ticket-edit-page.component.css'
})
export class TicketEditPageComponent {
  breadcrumbs: MenuItem[] = [];
  homeBreadcrumb: MenuItem | undefined;
  form: FormGroup = new FormGroup<any>({});
  ticket: Ticket | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [{ label: 'Ticket' }, { label: 'List', routerLink: '/ticket/list' }, { label: 'Edit' }];
    this.homeBreadcrumb = { icon: 'pi pi-home', routerLink: '/' };

    this.form = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['2023-12-21'],
      status: ['Pending', Validators.required]
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.ticketService.getTicketById(id).subscribe(
        (result) => {
          this.ticket = result;

          this.form.patchValue({
            id: this.ticket.id,
            title: this.ticket.title || '',
            description: this.ticket.description || '',
            dueDate: new Date(this.ticket.dueDate),
            status: this.ticket.status || 'Pending'
          });
        }
      );
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.ticketService.updateTicket(this.form.value).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successful' });
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
