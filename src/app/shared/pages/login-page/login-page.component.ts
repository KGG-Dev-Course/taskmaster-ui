import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.loginForm.patchValue({
          username: user.email.split('@')[0],
          password: 'Password!' + user.id
        });

        this.onLoginSubmit();
      }
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login Form Data:', formData);

      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });

          if (data.isAdmin) {
            this.router.navigate(['/admin']).then();
          } else {
            this.router.navigate(['/home']).then();
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
        }
      );
    } else {
      console.log('Invalid form. Please check fields.');
    }
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
