import { Component, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngxs/store';
import { Logout } from '../../xs-ng/auth/auth.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-view-component',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {

    mobileQuery: MediaQueryList;
    examples: any[];

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

    ngAfterViewInit(): void {

    }

    logout() {
        this.store.dispatch(new Logout());
    }
}
