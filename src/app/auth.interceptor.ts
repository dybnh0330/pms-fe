import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.authService.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authService.token}`)
      })

    }

    return next.handle(request).pipe(catchError((err : HttpErrorResponse) => {

      if (err.status === 401) {
        localStorage.clear();
        // setTimeout(window.location.reload, 5)
        window.location.reload();
      }

      return throwError(() => err)
    }));
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
