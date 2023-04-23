import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler} from '@angular/common/http'
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpHeadersService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    req = req.clone({
    
      setParams: {
        apiKey: env.key,
      },
    });
    return next.handle(req)
  }
}
