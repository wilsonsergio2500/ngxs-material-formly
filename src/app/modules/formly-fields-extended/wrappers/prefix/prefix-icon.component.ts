import { Component, ViewChild, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-prefix-wrapper',
  templateUrl: 'prefix-icon.component.html'
})
export class PrefixIconWrapperComponent extends FieldWrapper implements AfterViewInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: false }) fieldComponent: ViewContainerRef;
  @ViewChild('matPrefix', { static: false}) matPrefix: TemplateRef<any>;

  ngAfterViewInit() {
    if (this.matPrefix) {
      //setTimeout(() => this.to.prefix = this.matPrefix);
    }
  }
}
