import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrl: './user-add-page.component.css'
})
export class UserAddPageComponent {
  breadcrumbs: MenuItem[] = [];
  homeBreadcrumb: MenuItem | undefined;
  form: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.breadcrumbs = [{ label: 'User' }, { label: 'List', routerLink: '/user/list' }, { label: 'Add' }];
    this.homeBreadcrumb = { icon: 'pi pi-home', routerLink: '/' };

    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['User', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.createUser(this.form.value).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful' });
          this.router.navigate(['/user/list']);
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
