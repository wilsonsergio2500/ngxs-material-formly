import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store, Select } from '@ngxs/store';
//import { Logout } from '../../states/auth/auth.actions';
//import { MenuState } from '../../states/menu/menu.state';
import { Observable, interval } from 'rxjs';
import { Logout } from '../../states/auth/auth.actions';
//import { MenuGetItems } from '../../states/menu/menu.action';

@Component({
  selector: 'main-view-component',
  templateUrl: 'main.component.html',
  styleUrls: [`main.component.scss`]
})
export class MainViewComponent implements OnInit, AfterViewInit, OnDestroy {


  mobileQuery: MediaQueryList;

  //@Select(MenuState.getMenuItems) menuItems$: Observable<any[]>;
  //@Select(MenuState.IsItemsLoaded) isItemLoaded$: Observable<boolean>;
  //@Select(MenuState.getItemSize) size$: Observable<number>;

  //@Select(MenuState.getTasks) menuTasks$: Observable<any[]>;
  //@Select(MenuState.getDashboardTotal) dashboardTotal$: Observable<number>;

  examples: any[];

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

  ngAfterViewInit(): void {

  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
