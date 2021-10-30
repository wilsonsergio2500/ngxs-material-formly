import { ToolbarNavigationItemComponent } from "./toolbar-navigation-item/toolbar-navigation-item.component";
import { ToolbarNavigationMenuComponent } from "./toolbar-navigation-menu/toolbar-navigation-menu.component";
import { ToolbarNavigationComponent } from "./toolbar-navigation.component";

export function getToolbarNavigationComponents() {
  return [
    ToolbarNavigationComponent,
    ToolbarNavigationItemComponent,
    ToolbarNavigationMenuComponent
  ];
}
