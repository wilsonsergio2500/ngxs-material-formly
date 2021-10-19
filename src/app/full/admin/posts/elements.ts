
// components
import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';
import { AdminPostCreateResolver } from './create/admin-post-create.resolver';
import { AdminPostListComponent } from './list/admin-post-list.component'

// provider
import { AdminPostListResolver } from './list/admin-post-list.resolver';

export function getAdminComponents() {
  return [
    AdminPostComponent,
    AdminPostCreateComponent,
    AdminPostListComponent
  ]
}

export function getAdminProviders() {
  return [
    AdminPostListResolver,
    AdminPostCreateResolver
  ]
}
