import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Authservice } from "./authservice";
import { take, exhaustMap, catchError, retry } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: Authservice) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.AuthUserData.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req).pipe(
            retry(2),
            catchError((error: HttpErrorResponse) => {
              if (error.status !== 401) {
                // 401 handled in auth.interceptor
              }
              return throwError(error);
            })
          );
        } else {
          // console.log("heyyyyy");
        }

        const modifiedReq = req.clone({
          setHeaders: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token
          }
        });
        return next.handle(modifiedReq).pipe(
          retry(2),
          catchError((error: HttpErrorResponse) => {
            if (error.status !== 401) {
              // 401 handled in auth.interceptor
            }
            return throwError(error);
          })
        );
      })
    );
  }
}
