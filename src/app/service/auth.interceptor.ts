import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken: any = localStorage.getItem('jwt');
    if (authToken) {
      
      const authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`
        }
      });
      console.log(req.headers);
      return next.handle(authReq);
    }

    // If there is no token, pass the original request
    return next.handle(req);
  }
}
