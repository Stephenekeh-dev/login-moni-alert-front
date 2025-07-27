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
  loading = false; // ✅ Add this line

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true; // ✅ Start loading

      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.userService.saveToken(res.token);
          localStorage.setItem('user', JSON.stringify(res));

          this.snackBar.open('Login successful!', 'OK', {
            duration: 8000,
            panelClass: ['snackbar-success'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.loading = false; // ✅ Stop loading after redirect
          }, 100);
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.snackBar.open('Invalid email or password', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.loading = false; // ✅ Stop loading
        }
      });
    } else {
      console.log('Login form is invalid');
    }
  }
}


