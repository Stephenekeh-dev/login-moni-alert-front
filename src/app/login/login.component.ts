import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          
          // ✅ Save token to localStorage
          this.userService.saveToken(res.token);

          // Show Snackbar instead of alert
          this.snackBar.open('Login successful!', 'OK', {
            duration: 8000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

          // Store user details in localStorage
          localStorage.setItem('user', JSON.stringify(res));

          this.loginForm.reset();
         setTimeout(() => {
        this.router.navigate(['/dashboard']);
       }, 100);
        },
        error: (err) => {
          console.error('Login failed:', err);

          // Show error message in Snackbar
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    } else {
      console.log('Login form is invalid');
    }
  }
}


