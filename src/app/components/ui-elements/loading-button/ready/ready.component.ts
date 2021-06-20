import { Component, OnInit, Host } from '@angular/core';
import { LoadingButton } from '../loading-button.component';

@Component({
  selector: 'loading-button-ready',
  templateUrl: 'ready.component.html',
  styleUrls: ['ready.component.scss']
})
export class LoadingButtonReady implements OnInit {

  ngOnInit() {
  }
  parentContext: LoadingButton;

  constructor(@Host() public parent: LoadingButton) {
    this.parentContext = parent;
  }

}
