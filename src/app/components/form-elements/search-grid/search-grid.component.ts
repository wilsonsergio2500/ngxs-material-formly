import { Component, OnInit, HostBinding, Input, ViewChild, ElementRef, ContentChildren, QueryList, Optional, Injector, DoCheck, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subject, Subscription, fromEvent, of } from 'rxjs';
import { ControlValueAccessor, NgControl, FormGroupDirective } from '@angular/forms';
import { MatFormFieldControl, ErrorStateMatcher, MatDialog } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ISearchGridValue } from './search-grid.contract';
import { filter, map, tap } from 'rxjs/operators';
import { SearchGridColumnComponent } from './search-grid-column/search-grid-column.component';
import { ISearchGridColumnItem } from './search-grid-column/search-grid-column.contract';
import { FocusMonitor } from '@angular/cdk/a11y';
import { SearchGridModalComponent } from './search-grid-modal/search-grid-modal.component';
import { ISearchGridInput } from './search-grid-modal/search-grid.input';

@Component({
    selector: 'search-grid',
    templateUrl: 'search-grid.component.html',
    styleUrls: [`search-grid.component.scss`]
})
export class SearchGridComponent implements ControlValueAccessor, OnInit, DoCheck, AfterViewInit, OnDestroy, MatFormFieldControl<any> {

    static nextId = 0;

    constructor(
        private dialog: MatDialog,
        private injector: Injector,
        public elRef: ElementRef,
        private fm: FocusMonitor,
        @Optional() private formGroup: FormGroupDirective,
    ) {
    }


    @Input()
    recordsFunc: () => Observable<any[]>;
    @Input()
    TextField: string;
    @Input()
    ValueField: string;
    @Input() errorStateMatcher: ErrorStateMatcher;
    @Input()
    formlyAttributes: any;

    viewValue = '';
    value: number | string | ISearchGridValue = null;;
    ngControl: NgControl;
    focused: boolean;
    empty: boolean;
    required: boolean;
    errorState: boolean;
    controlType?: string;
    autofilled?: boolean;
    @HostBinding()
    id = `search-grid-input-${SearchGridComponent.nextId++}`;
    stateChanges = new Subject<void>();
    propagateChange = (_: any) => ({});
    _disabled = false;
    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _placeholder: string;
    @Input()
    get placeholder(): string { return this._placeholder; }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _isNameInValueIncluded: boolean = false;
    @Input('Include-name-in-value')
    set includeNameInValue(value: boolean) {
        this._isNameInValueIncluded = coerceBooleanProperty(value);
    }
    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    @HostBinding('class.unfloating')
    get getUnfloating() {
        return !this.shouldLabelFloat;
    }
    get shouldPlaceholderFloat() { return this.shouldLabelFloat; }
    private subscriptions: Subscription[] = [];

    @ViewChild('input', { static: false }) inputElement: ElementRef<HTMLInputElement>;

    @ContentChildren(SearchGridColumnComponent)
    columns: QueryList<SearchGridColumnComponent>;
    gridColumns: ISearchGridColumnItem[] = [];


    propagateTouched = () => {
        if (this.ngControl) {
            const formControl = this.ngControl.control;
            formControl.markAsTouched();
        }
    };

    setDescribedByIds(ids: string[]): void {
        throw new Error("Method not implemented.");
    }
    onContainerClick(event: MouseEvent): void {
        throw new Error("Method not implemented.");
    }


    writeValue(obj: any): void {
        if (!!obj) {
            this.value = obj;
            this.bindValue();
            this.stateChanges.next();
        } else {
            this.value = null;
            this.viewValue = '';
            if (this.inputElement) {
                this.inputElement.nativeElement.value = '';
            }
            this.stateChanges.next();
        }
    }

    bindValue() {
        const $onValues = this.recordsFunc().pipe(
            filter(x => {
                return (!!x && x.length > 0 && !!this.value);
            }),
            map(x => {
                const realVal = (this._isNameInValueIncluded) ? (this.value as ISearchGridValue).Id : this.value;
                const found = x.find(f => f[this.ValueField] === realVal);
                if (!!found) {
                    return found;
                }
            }),
            tap(x => {
                this.viewValue = x[this.TextField];
                this.inputElement.nativeElement.value = x[this.TextField];
            })
        );

        this.subscriptions = [...this.subscriptions, $onValues.subscribe()];
    }


    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
        this.stateChanges.next();
    }



    bindColumns() {
        if (!!this.columns && this.columns.length) {
            const gridColumns = this.columns.map(({ DisplayColumn, HeaderText }) => {
                return <ISearchGridColumnItem>{ DisplayColumn, HeaderText };
            });
            const action = <ISearchGridColumnItem>{ DisplayColumn: 'Action', HeaderText: 'Action' };
            this.gridColumns = [...gridColumns, action];
        }
    }

    onSeach() {
        const dialogRef = this.dialog.open(SearchGridModalComponent, {
            panelClass: 'dialog-responsive', disableClose: true,
            data: <ISearchGridInput>{
                placeholder: this.placeholder,
                recordsFunc: this.recordsFunc,
                columnsFunc: this.getColumns.bind(this),
                TextField: this.TextField,
                ValueField: this.ValueField,
                InitializedViewValue: this.getInitializedViewValue.bind(this)
            }
        });

        dialogRef.afterClosed().pipe(filter(x => !!x)).subscribe(this.onResult.bind(this));
    }

    getColumns(): any[] {
        return this.gridColumns;
    }

    getInitializedViewValue() {
        return of(this.viewValue).pipe(filter(x => !!x));
    }

    onResult(result) {

        const val = result[this.ValueField];
        const viewValue = result[this.TextField];
        this.value = (this._isNameInValueIncluded) ? <ISearchGridValue>{ Id: val, Name: viewValue } : val;
        this.viewValue = viewValue;
        this.propagateChange(this.value);
        this.propagateTouched();
        this.inputElement.nativeElement.value = viewValue;
        this.bindOnFormly();
        this.stateChanges.next();

    }

    bindOnFormly() {
        if (!!this.formlyAttributes) {
            const { templateOptions } = this.formlyAttributes;
            if (!!templateOptions.change) {
                templateOptions.change(this.formlyAttributes)
            }
        }
    }

    blur() {
        this.focused = false;
        this.propagateTouched();
        this.stateChanges.next();
    }

    ngOnInit() {
        this.ngControl = this.injector.get(NgControl);
        if (this.ngControl != null) { this.ngControl.valueAccessor = this; }

        this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        })
    }


    ngDoCheck(): void {
        if (this.ngControl) {

            this.errorState = this.ngControl.invalid && (this.ngControl.touched || (this.formGroup && this.formGroup.submitted));
            this.stateChanges.next();
        }
    }

    ngOnDestroy() {
        if (!!this.subscriptions) {
            this.subscriptions.forEach(x => x.unsubscribe());
        }
        this.fm.stopMonitoring(this.elRef);
        this.stateChanges.complete();
    }

    ngAfterViewInit(): void {

        const KEY_CODES = {
            TAB: 9
        };

        const tap$ = tap((ev: KeyboardEvent) => {
            const charcode = ev.which || ev.keyCode;
            if (charcode != KEY_CODES.TAB) {
                ev.preventDefault();
            }
        });
        const $onKeydownEv = fromEvent(this.inputElement.nativeElement, 'keydown').pipe(tap$);

        this.subscriptions = [...this.subscriptions,
        $onKeydownEv.subscribe()
        ];

        this.bindColumns();
    }

    focus($event: FocusEvent) {
        if (this.disabled) {
            this.focused = false;
            $event.preventDefault();
        } else {
            this.focused = true;
            this.inputElement.nativeElement.focus();
            this.stateChanges.next();
        }
    }

    onClear() {

        this.value = '';
        this.viewValue = '';
        this.inputElement.nativeElement.value = '';
        this.propagateChange(null);
    }


} 
