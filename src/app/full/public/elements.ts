import { PublicComponent } from './public.component';
import { PageComponent } from './page/page.component';
import { PageResolver } from './page/page.resolver';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicResolver } from './public.resolver';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsResolver } from './blogs/blogs.resolver';
import { BlogResolver } from './blog/blog.resolver';
import { BlogComponent } from './blog/blog.component';

export function getPublicComponents() {
  return [
    PublicComponent,
    PageComponent,
    BlogsComponent,
    BlogComponent,
    NotFoundComponent
  ]
}

export function getPublicProviders() {
  return [
    PublicResolver,
    PageResolver,
    BlogsResolver,
    BlogResolver
  ]
}
