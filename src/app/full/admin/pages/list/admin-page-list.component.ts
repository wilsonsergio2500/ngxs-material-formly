import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'admin-page-list',
    templateUrl: 'admin-page-list.component.html',
    styleUrls: ['admin-page-list.component.scss']
})
export class AdminPageListComponent {

    constructor(private store: Store) {
    }
}
