import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {
  form: FormGroup = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {

    } else {
      console.log('Invalid form. Please check fields.');
    }
  }
}
