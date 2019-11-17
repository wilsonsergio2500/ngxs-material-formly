import { Component, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-suffix-wrapper',
  template: `
    <ng-container #fieldComponent></ng-container>
    <ng-template #matSuffix>
      <mat-icon *ngIf="to.suffixIcon">{{ to.suffixIcon }}</mat-icon>
    </ng-template>
  `,
})
export class SuffixIconWrapperComponent extends FieldWrapper implements AfterViewInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent: ViewContainerRef;
  @ViewChild('matSuffix', { static: false}) matSuffix: TemplateRef<any>;

    ngAfterViewInit() {
        if (this.matSuffix) {
            Promise.resolve().then(() => this.to.suffix = this.matSuffix);
    }
  }
}
