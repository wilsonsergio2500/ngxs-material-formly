import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

export function getAdminViewComponents() {
    return [
      AdminComponent,
      AdminDashboardComponent
    ]
}
