import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { FullPageComponent } from './full/full.component';
import { LoginComponent } from './full/login/login.component';
import { AuthenticatedGuard } from './guards/auth.guard';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  <Route>{
    path: '', component: FullPageComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent },
        <Route>{ path: 'main', loadChildren: () => import('./full/main/main.module').then(m => m.MainViewModule) },
        <Route>{ path: 'admin', loadChildren: () => import('./full/admin/admin.module').then(m => m.AdminModule), ...canActivate(redirectUnauthorizedToLanding) }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
