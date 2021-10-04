import { Component, Host, HostBinding, HostListener, Input } from '@angular/core';
import { MatFabSpeedDialComponent } from '../mat-fab-speed-dial.component';

@Component({
  selector: 'mat-fab-speed-dial-trigger',
  templateUrl: 'mat-fab-speed-dial-trigger.component.html',
})
export class MatFabSpeedDialTriggerComponent {

  @HostBinding('class.mat-spin') get sp() {
    return this.spin;
  }

  @Input() spin = false;

  constructor(@Host() private _parent: MatFabSpeedDialComponent) { }

  @HostListener('click', ['$event'])
  _onClick(event: Event): void {
    if (!this._parent.fixed) {
      this._parent.toggle();
      event.stopPropagation();
    }
  }

}
