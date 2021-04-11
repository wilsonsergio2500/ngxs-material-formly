
import { FullPageComponent } from './full.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export function getFullPageViewComponents() {
  return [
    FullPageComponent,
      LoginComponent,
    RegisterComponent
  ];
}
