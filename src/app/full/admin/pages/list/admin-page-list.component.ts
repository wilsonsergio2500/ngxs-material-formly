import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PageState } from '../../xs-ng/pages/pages.state';

@Component({
    selector: 'admin-page-list',
    templateUrl: 'admin-page-list.component.html',
    styleUrls: ['admin-page-list.component.scss']
})
export class AdminPageListComponent {

    @Select(PageState.IsLoading) working$;
    
    constructor(private store: Store) {
    }
}
