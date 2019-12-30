
import { AdminPageComponent } from './admin-page.component'
import { AdminPageListComponent } from './list/admin-page-list.component';
import { AdminPageCreateComponent } from './create/admin-page-create.component';

export function getAdminPagesComponents() {
    return [
        AdminPageComponent,
        AdminPageListComponent,
        AdminPageCreateComponent
    ];
} 
