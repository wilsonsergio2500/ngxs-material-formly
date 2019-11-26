
import { AdminPostComponent } from './admin-post.component';
import { AdminPostCreateComponent } from './create/admin-post-create.component';
import { AdminPostListComponent } from './list/admin-post-list.component'

export function getAdminComponents() {
    return [
        AdminPostComponent,
        AdminPostCreateComponent,
        AdminPostListComponent
    ]
}
