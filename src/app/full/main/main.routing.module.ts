import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { MainViewComponent } from './main.component';
import { MainDashboardComponent } from './dashboard/main-dashboard.component';
import { UnderConstructionComponent } from './under-contruction/under-construction.component';

const routes : Routes = [
  <Route>{
    path: '', component: MainViewComponent,
    children: [
      <Route>{ path: '', component: MainDashboardComponent }, /// points to dashboard
      <Route>{ path: 'under-construction', component: UnderConstructionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule {
}
