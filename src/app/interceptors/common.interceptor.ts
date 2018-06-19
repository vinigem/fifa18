import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { OverlayService } from '../overlay/overlay.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

    constructor(private overlayService: OverlayService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // call to show overlay
        this.overlayService.showOverlay();

        //  request start time
        const started = Date.now();

        return next
            .handle(request)
            .do((event: HttpEvent<any>) => { })
            .catch(response => {
                if (response instanceof HttpErrorResponse) {
                    console.log('Processing http error', response);
                }
                return Observable.throw(response);
            }).finally(() => {
                const elapsed = Date.now() - started;
                console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);

                // call to hide overlay
                this.overlayService.hideOverlay();
            });
    }

}
