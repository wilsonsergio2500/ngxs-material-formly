import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationState } from '@states/navigation/navigation.state';
import { Observable } from 'rxjs';
import { INavigationModel } from '../../schemas/navigations/navigation.model';
import { AuthState } from '@states/auth/auth.state';
import { AppFirebaseUser } from '@states/auth/auth.model';
import { Logout } from '@states/auth/auth.actions';

@Component({
  selector: 'public',
  templateUrl: 'public.component.html',
  styleUrls: [`public.component.scss`]
})
export class PublicComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  @Select(NavigationState.getNavigationRoot) navigations$: Observable<INavigationModel[]>;
  @Select(AuthState.getUser) user$: Observable<AppFirebaseUser>;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener.bind(this));

  }
  mobileQueryListener() {
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  getUrlPath(path: string) {
    return `url('${path}')`;
  }

}
