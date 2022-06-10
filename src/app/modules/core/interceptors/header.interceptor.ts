import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_KEY = environment.apiKey;
    const API_HOST = environment.apiHost;
    return next.handle(request.clone({ setHeaders: { 'x-rapidapi-host': API_HOST , 'x-rapidapi-key':API_KEY} }));
  }
}
