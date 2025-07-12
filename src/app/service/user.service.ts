import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = 'https://login-monit-alert-system.onrender.com/api/register/';
  private loginUrl = 'https://login-monit-alert-system.onrender.com/api/login/';
  private tokenKey = 'auth_token';  // Key used to store token

  constructor(private http: HttpClient) {}

  registerUser(data: FormData): Observable<any> {
    return this.http.post(this.registerUrl, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(this.loginUrl, data);
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from local storage
 getToken(): string | null {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
}
  // Optional: Clear token on logout
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  
}
