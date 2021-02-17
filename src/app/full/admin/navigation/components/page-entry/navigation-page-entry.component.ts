import { Component, AfterContentInit, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IPageNavigation } from './navigation-page-entry.contract';
import { FieldTypes } from '../../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { NgTypeFormGroup, NgTypeFormControl } from '../../../../../modules/form-type-builder/form-type-builder.model';
import { FormTypeBuilder } from '../../../../../modules/form-type-builder/form-type-builder.service';
import { Validators } from '@angular/forms';
import { startWith, debounceTime, throttleTime, tap } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
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

    @Output() OnAdd = new EventEmitter<IPageNavigation>();
    @Output() OnCancel = new EventEmitter<void>();

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
        
    }

    ngOnInit() {

        this.pageRecords = () => this.store.select(PageState.getAllPages);

    }

    addNavItem() {

        if (this.OnAdd) {
            this.OnAdd.emit({ ...this.formGroup.value });
        }
        //console.log('add item', this.formGroup.value);
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
