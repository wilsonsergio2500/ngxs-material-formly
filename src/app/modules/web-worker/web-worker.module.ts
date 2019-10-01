import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { WebWorkerService } from './web-worker.service';

@NgModule({
  imports: [CommonModule],
  providers: [WebWorkerService]
})
export class WebWorkerModule {
}
