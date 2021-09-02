
// components
import { AdminPageComponent } from './admin-page.component'
import { AdminPageListComponent } from './list/admin-page-list.component';
import { AdminPageCreateComponent } from './create/admin-page-create.component';

//resolvers
import { AdminPageListResolver } from './list/admin-page-list.resolver'
import { AdminPageCreateResolver } from './create/admin-page-create.resolver';

export function getAdminPagesComponents() {
    return [
        AdminPageComponent,
        AdminPageListComponent,
        AdminPageCreateComponent
    ];
}

export function getAdminPagesProviders() {
    return [
      AdminPageListResolver,
      AdminPageCreateResolver
    ]
}
