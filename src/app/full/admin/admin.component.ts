import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Select, Store } from '@ngxs/store';
import { Logout } from '@states/auth/auth.actions';
import { AuthState } from '@states/auth/auth.state';
import { Observable } from 'rxjs';
import { AppFirebaseUser, IAppPrivileges } from '@states/auth/auth.model';

@Component({
  selector: 'admin-view-component',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  @Select(AuthState.getPrivileges) privileges$: Observable<IAppPrivileges>;
  @Select(AuthState.getUser) user$: Observable<AppFirebaseUser>;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
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

  getUrlPath(path: string) {
    return `url('${path}')`;
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
