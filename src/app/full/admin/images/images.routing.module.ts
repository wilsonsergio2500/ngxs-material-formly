import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { ImagesManagerComponent } from './images-manager/images-manager.component';
import { ImagesComponent } from './images.component';

const routes: Routes = [
  <Route>{
    path: '', component: ImagesComponent, children: [
      <Route>{ path: '', component: ImagesManagerComponent },
      <Route>{ path: 'manage', component: ImagesManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }
