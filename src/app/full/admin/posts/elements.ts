// components
import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';
import { AdminPostListComponent } from './list/admin-post-list.component';
import { AdminPostEditComponent } from './edit/admin-post-edit.component';


// provider
import { AdminPostListResolver } from './list/admin-post-list.resolver';
import { AdminPostCreateResolver } from './create/admin-post-create.resolver';
import { AdminPostEditResolver } from './edit/admin-post-edit.resolver';

export function getAdminComponents() {
  return [
    AdminPostComponent,
    AdminPostCreateComponent,
    AdminPostEditComponent,
    AdminPostListComponent
  ]
}

export function getAdminProviders() {
  return [
    AdminPostListResolver,
    AdminPostCreateResolver,
    AdminPostEditResolver
  ]
}
