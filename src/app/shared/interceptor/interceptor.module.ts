import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token_api');
    const dupReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: this.convertToSnackCase(req.body)
    });

    return next.handle(dupReq).pipe(
      catchError((e: any, c: Observable<HttpEvent<any>>) => {
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(e);
      }),
      map(response => {
        if (response instanceof HttpResponse) {
          const dupResponse = response.clone({
            body: this.convertToCamelCase(response.body)
          });
          return dupResponse;
        }
        return response;
      })
    );
  }

  private convertToSnackCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(v => this.convertToSnackCase(v));
    } else if (obj && typeof obj === 'object') {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [_.snakeCase(key)]: this.convertToSnackCase(obj[key])
        }),
        {}
      );
    }
    return obj;
  }

  private convertToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(v => this.convertToCamelCase(v));
    } else if (obj && typeof obj === 'object') {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [_.camelCase(key)]: this.convertToCamelCase(obj[key])
        }),
        {}
      );
    }
    return obj;
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class Interceptor {}
