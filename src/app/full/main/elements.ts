
import { MainViewComponent } from './main.component';
import { MainDashboardComponent } from './dashboard/main-dashboard.component';
import { UnderConstructionComponent } from './under-contruction/under-construction.component';

export function getMainViewComponents() {
  return [
    MainViewComponent,
    MainDashboardComponent,
    UnderConstructionComponent
  ]
}
