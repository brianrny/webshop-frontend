import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { LocalstorageService } from "../services/localstorage.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public localstorageService: LocalstorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localstorageService.getStoredToken();

        if (token != 'null' || token != null) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)})
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log("Event ----->", event)
                }
                return event;
            })
        )
    }
}