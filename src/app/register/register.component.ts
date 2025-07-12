import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // Note: No formControl for image, handled via file input
    });
   
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  onSubmit(): void {
  const formData = new FormData();

  // Convert form values to string and append to FormData
  for (const key in this.registerForm.value) {
    if (Object.prototype.hasOwnProperty.call(this.registerForm.value, key)) {
      const value = this.registerForm.value[key];
      formData.append(key, value ? String(value) : '');
    }
  }

  // Append profile image if selected
  if (this.selectedImage) {
    formData.append('profile_image', this.selectedImage);
  }
  for (const pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}


  this.userService.registerUser(formData).subscribe({
    next: (res) => {
      console.log('User registered successfully:', res);
      alert('Registration successful!');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Registration failed:', err.error);
      alert('Registration failed! Check fields.');
    }
  });
}

}
