import { AdminMediaComponent } from './admin-media.component';
import { AdminMediaListComponent } from './list/admin-media-list.component';

export function getAdminMediaComponents() {
    return [
        AdminMediaComponent,
        AdminMediaListComponent
    ];
}
