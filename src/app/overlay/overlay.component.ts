import { Component } from '@angular/core';
import { OverlayService } from './overlay.service';


@Component({
    selector: 'overlay',
    template: `
      <div *ngIf="overlayService.getActiveRequests() > 0" class="overlay">
        <i class="fa fa-refresh fa-spin fa-5x fa-fw"></i>
      </div>
    `
})
export class OverlayComponent {

    constructor(public overlayService: OverlayService) { }
}
