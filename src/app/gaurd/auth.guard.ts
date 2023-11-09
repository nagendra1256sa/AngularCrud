import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const login=localStorage.getItem('loginCredintials')
  const router=inject(Router);
  if(login)
  {
    return true;
  }
  else
  {
     alert("Please login first")
     router.navigate(['login'])
    return false;
  }
};
 