import { Component, Input } from '@angular/core';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';

@Component({
  selector: 'side-navigation',
  templateUrl: 'side-navigation.component.html',
  styleUrls: [`side-navigation.component.scss`]
})
export class SideNavigationComponent {

  @Input() navigations: INavigationModel[];
}
