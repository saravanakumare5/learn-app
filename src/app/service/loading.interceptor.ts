import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "./loading.service";

@Injectable() 
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("loading interceptor is calling");
        this.loadingService.showLoader();
        return next.handle(req).pipe(
            finalize(() => {
                this.loadingService.hideLoader();
            })
        );

    }
}