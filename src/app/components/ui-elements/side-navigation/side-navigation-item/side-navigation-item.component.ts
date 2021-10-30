import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';

@Component({
  selector: 'side-navigation-item',
  templateUrl: 'side-navigation-item.component.html',
  styleUrls: [`side-navigation-item.component.scss`],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})

export class SideNavigationItemComponent {

  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded(ex) {
    this.expanded = ex;
  }
  @Input() navigation: INavigationModel;
  @Input() depth: number;

  constructor(
    public router: Router
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(navigation: INavigationModel) {
    if (navigation.children?.length) {
      this.expanded = !this.expanded;
    }
  }

}
