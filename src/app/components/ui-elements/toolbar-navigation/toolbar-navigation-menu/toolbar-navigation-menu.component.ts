import { Component,  Input,  ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';

@Component({
  selector: 'toolbar-navigation-menu',
  templateUrl: 'toolbar-navigation-menu.component.html',
  styleUrls: [`toolbar-navigation-menu.component.scss`]
})
export class ToolbarNavigationMenuComponent {
  @ViewChild("menu", { static: true }) menu: MatMenu;
  @Input() navigations: INavigationModel[]

}
