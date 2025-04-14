import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    return true; // User is authenticated, allow access to the route
  } else {
    router.navigate(['/login']); // Redirect to login page if not authenticated
    return false; // User is not authenticated, deny access to the route
  }
};
