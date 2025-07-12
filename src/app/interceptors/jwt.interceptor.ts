import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService} from '../service/user.service';

export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(UserService);
  const token = authService.getToken();

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`
      },
    });
  }

  return next(request);
};