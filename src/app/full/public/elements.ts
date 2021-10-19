import { PublicComponent } from './public.component';
import { PageComponent } from './page/page.component';
import { PageResolver } from './page/page.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicResolver } from './public.resolver';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsResolver } from './blogs/blogs.resolver';

export function getPublicComponents() {
  return [
    PublicComponent,
    PageComponent,
    BlogsComponent,
    NotFoundComponent
  ]
}

export function getPublicProviders() {
  return [
    PublicResolver,
    PageResolver,
    BlogsResolver

  ]
}
