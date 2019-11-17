import { Component, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-prefix-wrapper',
  templateUrl: 'prefix-icon.component.html'
})
export class PrefixIconWrapperComponent extends FieldWrapper implements AfterViewInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent: ViewContainerRef;
  @ViewChild('matPrefix', { static: true}) matPrefix: TemplateRef<any>;

  ngAfterViewInit() {
    if (this.matPrefix) {
        Promise.resolve().then(() => this.to.prefix = this.matPrefix);
    }
  }
}
