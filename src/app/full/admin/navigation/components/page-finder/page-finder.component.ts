import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { PageSearchItemsByTitleAction } from '../../../../../xs-ng/pages/pages.actions';

@Component({
    selector: 'page-finder',
    templateUrl: 'page-finder.component.html',
    styleUrls: [`page-finder.component.scss`]
  })
  export class PageFinderComponent {

    constructor(
        private store: Store
    ) {
        this.find();
    }

    find() {
        this.store.dispatch(new PageSearchItemsByTitleAction('title'));
    }
  
  } 
