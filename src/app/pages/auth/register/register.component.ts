import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private socialAuthService: SocialAuthService,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.registerForm.patchValue({
          email: user.email,
          username: user.email.split('@')[0],
          password: "Password!" + user.id
        });

        this.onRegisterSubmit();
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Login Form Data:', formData);

      this.authService.register(this.registerForm.value).subscribe(
        (data) => {
          // Handle successful login response
          console.log('Login Successful:', data);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successful' });
        },
        (error) => {
          // Handle error response from login attempt
          console.error('Login Error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.errorMessage });
        }
      );
    } else {
      console.log('Invalid form. Please check fields.');
    }
  }

  signUpWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
