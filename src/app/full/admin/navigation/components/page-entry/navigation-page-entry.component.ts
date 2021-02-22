import { Component, AfterContentInit, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IPageNavigation } from './navigation-page-entry.contract';
import { FieldTypes } from '../../../../../modules/formly-fields-extended/base/fields-types-schemas';
import { NgTypeFormGroup, NgTypeFormControl } from '../../../../../modules/form-type-builder/form-type-builder.model';
import { FormTypeBuilder } from '../../../../../modules/form-type-builder/form-type-builder.service';
import { Validators, ValidatorFn, FormGroupDirective } from '@angular/forms';
import { tap, delay } from 'rxjs/operators';
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
    @Select(PageState.getPageFilterByTitle) pages$: Observable<IPageFirebaseModel[]>;
    pageRecords: () => Observable<IPageFirebaseModel[]>;

    @Output() onAdd = new EventEmitter<IPageNavigation>();
    @Output() onCancel = new EventEmitter<void>();
    onLabelchange$: Subscription;

    constructor(
        private store: Store,
        private formTypeBuilder: FormTypeBuilder,
    ) {
    }


    ngOnInit() {

        this.pageRecords = () => this.store.select(PageState.getAllPages);

        this.formGroup = this.formTypeBuilder.group<IPageNavigation>({
            isLabelOnly: [false],
            label: [null, [Validators.required]],
            pageFinder: [null, [(c: NgTypeFormControl<string, IPageNavigation>) => {
                if (!!c && !!c.parent && c.parent.value.isLabelOnly == false && !!!c.value) {
                    return { required: true };
                }
                return null;
            }]]
        });

        this.onLabelchange$ = this.formGroup.controls.isLabelOnly.valueChanges.pipe(
            delay(1),
            tap(_ => {
                this.formGroup.controls.pageFinder.updateValueAndValidity();
            })
        ).subscribe();

    }

    addNavItem(ngForm: FormGroupDirective) {

        (ngForm as any).submitted = false;

        if (this.onAdd) {
            this.onAdd.emit({ ...this.formGroup.value });
            setTimeout(() => this.emptyForm());

        }
    }

    emptyForm() {
        const value = { isLabelOnly: false, label: null, pageFinder: null };
        this.formGroup.patchValue(value);
        this.formGroup.markAsUntouched();
    }

    cancel() {
        if (this.onCancel) {
            this.emptyForm();
            this.onCancel.emit();
        }
    }

    get displayUrlEntry() {
        return !!this.formGroup.get('isLabelOnly') && this.formGroup.get('isLabelOnly').value === false;
    }

    ngOnDestroy() {
        if (this.onLabelchange$) {
            this.onLabelchange$.unsubscribe();
        }
    }
  
  
  } 
