import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req, next) {
    let token = req.clone({
      setHeaders:{
        Authorization:`Bearer ${localStorage.getItem("token")} `,
        Accept:"application/json"
      }
    })
    return next.handle(token)
  }
}
