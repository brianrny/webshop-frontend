import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { LocalstorageService } from "../services/localstorage.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalstorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getStorageItem("webshop_stored_token");

        if (token != 'null' || token != null) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            })
        )
    }
}