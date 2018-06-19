import { Injectable } from '@angular/core';

@Injectable()
export class OverlayService {

    private activeRequests = 0;

    /* return count of active request */
    getActiveRequests(): number {
        return this.activeRequests;
    }

    /* add request count */
    showOverlay(): void {
        this.activeRequests++;

    }
    /* remove request count */
    hideOverlay(): void {
        this.activeRequests--;
    }
}
