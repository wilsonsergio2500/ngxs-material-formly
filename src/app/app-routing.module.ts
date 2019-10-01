import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { FullPageComponent } from './full/full.component';
import { LoginComponent } from './full/login/login.component';

const routes = [
  <Route>{
    path: '', component: FullPageComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
      <Route>{ path: 'main', loadChildren: () => import('./full/main/main.module').then(m => m.MainViewModule) }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
