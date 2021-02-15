import { Component, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { IPageNavigation } from './navigation-page-entry.contract';
import { FieldTypes } from '../../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { NgTypeFormGroup, NgTypeFormControl } from '../../../../../modules/form-type-builder/form-type-builder.model';
import { FormTypeBuilder } from '../../../../../modules/form-type-builder/form-type-builder.service';
import { Validators } from '@angular/forms';
import { startWith, debounceTime, throttleTime, tap } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { PageSearchItemsByTitleAction, PageSearchClearItemsAction } from '../../../../../xs-ng/pages/pages.actions';
import { Subscription, Observable } from 'rxjs';
import { PageState } from '../../../../../xs-ng/pages/pages.state';
import { IPageFirebaseModel } from '../../../../../schemas/pages/page.model';

@Component({
    selector: 'navigation-page-entry',
    templateUrl: 'navigation-page-entry.component.html',
    styleUrls: [`navigation-page-entry.component.scss`]
  })
  export class NavigationPageEntryComponent implements OnDestroy, OnInit {
  

    formGroup: NgTypeFormGroup<IPageNavigation>;
    filter$: Subscription;
    @Select(PageState.getPageFilterByTitle) pages$: Observable<IPageFirebaseModel[]>
    pageRecords: () => Observable<IPageFirebaseModel[]>

    constructor(
        private store: Store,
        private formTypeBuilder: FormTypeBuilder
    ) {
        this.createForm();
    }


    createForm() {

        this.formGroup = this.formTypeBuilder.group<IPageNavigation>({
            isLabelOnly: [null],
            label: [null, [Validators.required]],
            pageFinder: [null, (c: NgTypeFormControl<string, IPageNavigation>) => {
                if (!!c && !!c.parent && c.parent.value.isLabelOnly == false && !!!c.value) {
                    return { required: true };
                }
                return null;
            }]
        })

        const initial = { isLabelOnly: false, label: null, pageFinder: null };

        this.formGroup.patchValue(initial);

        //const title$ = this.formGroup.get('title').valueChanges.pipe(
        //    startWith(''),
        //    debounceTime(250),
        //    throttleTime(300),
        //    tap(title => {
        //        console.log('fired');
        //        console.log(title);
        //        if (!!title && title.length >= 3) {
        //            console.log('entered');
        //            this.store.dispatch(new PageSearchItemsByTitleAction(title));
        //        } else {
        //            console.log('entered 2')
        //            this.store.dispatch(new PageSearchClearItemsAction());
        //        }
        //    })

        //);

        //this.filter$ = title$.subscribe();

        
    }

    ngOnInit() {

        this.pageRecords = () => this.store.select(PageState.getAllPages);

    }

    addNavItem() {
        console.log('add item', this.formGroup.value);
    }

    get displayUrlEntry() {
        return !!this.formGroup.get('isLabelOnly') && this.formGroup.get('isLabelOnly').value === false;
    }

    ngOnDestroy() {
        if (this.filter$) {
            this.filter$.unsubscribe();
        }
    }
  
  } 
