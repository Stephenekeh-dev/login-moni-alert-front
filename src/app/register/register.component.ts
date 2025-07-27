import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { EmailValidationService } from '../service/email-validation.service'; 


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedImage: File | null = null;
  loading: boolean = false; 

   constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private emailValidationService: EmailValidationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

 onSubmit(): void {
  if (this.registerForm.invalid) return;

  this.loading = true;
  const email = this.registerForm.get('email')?.value;

  this.emailValidationService.validateEmail(email).subscribe({
    next: (result) => {
      const isDeliverable = result?.deliverability === 'DELIVERABLE';
      const isDisposable = result?.is_disposable_email?.value === true;

      if (!isDeliverable || isDisposable) {
        alert(' Please enter a real email.');
        this.loading = false;
        return;
      }

      // Proceed with registration
      const formData = new FormData();
      Object.keys(this.registerForm.value).forEach(key => {
        formData.append(key, this.registerForm.value[key]);
      });

      if (this.selectedImage) {
        formData.append('profile_image', this.selectedImage);
      }

      this.userService.registerUser(formData).subscribe({
        next: () => {
          alert('Registration successful!');
          this.registerForm.reset();
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error: () => {
          alert('Registration failed!');
          this.loading = false;
        }
      });
    },
    error: () => {
      alert('Failed to validate email. Please try again.');
      this.loading = false;
    }
  });
}

}