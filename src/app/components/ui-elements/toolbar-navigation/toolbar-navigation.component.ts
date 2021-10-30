import { Component, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';

@Component({
  selector: 'toolbar-navigation',
  templateUrl: 'toolbar-navigation.component.html',
  styleUrls: [`toolbar-navigation.component.scss`]
})
export class ToolbarNavigationComponent {

  @Input() navigations: INavigationModel[];
  currentTrigger: MatMenuTrigger;

}
