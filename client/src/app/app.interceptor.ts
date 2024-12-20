import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { catchError } from 'rxjs';
import { ErrorMsgService } from './core/error-msg/error-msg.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const { apiUrl } = environment;
const API = '/api';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.startsWith(API)){
    req = req.clone({
      url: req.url.replace(API, apiUrl ),
      withCredentials: true
    });
  }

  const errorService = inject(ErrorMsgService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if(err.status === 401) {
        console.log(err.error.message);
        
        router.navigate(['/login'], { queryParams: { message: `${err.error.message}` } });
      } else {
         errorService.setError(err);
         router.navigate(['/error']);
      }
      return [err];
    })
  );
};
