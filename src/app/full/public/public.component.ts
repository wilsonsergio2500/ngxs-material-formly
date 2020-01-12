import { Component, AfterContentInit, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'public',
    templateUrl: 'public.component.html',
    styleUrls: [`public.component.scss`]
  })
export class PublicComponent implements OnInit, AfterViewInit, OnDestroy  {
   
    mobileQuery: MediaQueryList;

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
        //this.store.dispatch(new Logout());
    }
  
   
  
  } 
