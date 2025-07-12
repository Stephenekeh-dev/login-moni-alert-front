import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('user'); // Check if user is logged in

  if (user) {
    if (state.url !== '/dashboard') {
      router.navigate(['/dashboard']); // Force user to stay on dashboard
      return false;
    }
    return true; // Allow access to dashboard
  } else {
    if (state.url === '/dashboard') {
      router.navigate(['/login']); // Redirect to login if unauthorized
      return false;
    }
    return true; // Allow access to other routes if not logged in
  }
};
