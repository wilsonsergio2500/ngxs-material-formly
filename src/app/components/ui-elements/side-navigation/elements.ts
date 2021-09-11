import { SideNavigationItemComponent } from "./side-navigation-item/side-navigation-item.component";
import { SideNavigationComponent } from "./side-navigation.component";

export function getSideNavigationComponents() {
  return [
    SideNavigationComponent,
    SideNavigationItemComponent
  ];
}
