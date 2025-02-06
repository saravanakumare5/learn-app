import { Component } from "@angular/core";
import { LoadingService } from "../service/loading.service";

@Component({
    selector: 'app-loader',
    template:  `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    constructor(public loadingService: LoadingService) {

    }
}