import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  user: any = {};

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    console.log('Dashboard component initialized');
    this.fetchUserDetails(); // ✅ Always fetch from backend
  }

  fetchUserDetails() {
    this.http.get('https://login-monit-alert-system.onrender.com/api/dashboard/', { withCredentials: true }).subscribe({
      next: (data: any) => {
        console.log('User data fetched from dashboard API:', data);
        this.user = data;

        // Optionally store in localStorage if you still want
        localStorage.setItem('user', JSON.stringify(data));
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
