import { PublicComponent } from './public.component';
import { PageComponent } from './page/page.component';
import { PageResolver } from './page/page.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicResolver } from './public.resolver';

export function getPublicComponents() {
  return [
    PublicComponent,
    PageComponent,
    NotFoundComponent
  ]
}

export function getPublicProviders() {
  return [
    PublicResolver,
    PageResolver

  ]
}
