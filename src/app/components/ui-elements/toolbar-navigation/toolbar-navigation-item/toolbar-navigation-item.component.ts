import { Component, Host, Input, Renderer2 } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';
import { ToolbarNavigationComponent } from '../toolbar-navigation.component';

@Component({
  selector: 'toolbar-navigation-item',
  templateUrl: 'toolbar-navigation-item.component.html',
  styleUrls: [`toolbar-navigation-item.component.scss`]
})
export class ToolbarNavigationItemComponent {

  @Input()
  navItem: INavigationModel;

  prevButtonTrigger: MatMenuTrigger;
  enteredLink = false;

  constructor(
    private renderer: Renderer2,
    @Host() private parent: ToolbarNavigationComponent
  ) {
  }

  onMouseEnter(trigger: MatMenuTrigger) {
    setTimeout(() => {
      if (!trigger.menuOpen) {
        this.closePriorMenuWhenAny();
        this.enteredLink = true;
        this.parent.currentTrigger = trigger;
        trigger.openMenu();
        this.renderer.removeClass((trigger.menu as any).items.first['_elementRef'].nativeElement, 'cdk-focused');
        this.renderer.removeClass((trigger.menu as any).items.first['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      else {
        this.enteredLink = true;
        this.parent.currentTrigger = trigger;
      }
    });
  }

  onMouseEnterOnLink() {
    this.closePriorMenuWhenAny();
  }

  closePriorMenuWhenAny() {
    if (this.parent.currentTrigger) {
      this.parent.currentTrigger.closeMenu();
    }
  }

}
