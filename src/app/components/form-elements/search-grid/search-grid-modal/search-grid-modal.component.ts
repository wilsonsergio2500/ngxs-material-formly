import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ISearchGridInput } from './search-grid.input';
import { interval, Observable, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'search-grid-modal',
  templateUrl: 'search-grid-modal.component.html',
  styleUrls: [`search-grid-modal.component.scss`]
})
export class SearchGridModalComponent implements OnInit, OnDestroy {


  dataSource = new MatTableDataSource();
  subscriptions: Subscription[] = null;
  columns: any[];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  initialFilter: string;
  @ViewChild('searchinput', { static: false })
  private SearchInput: ElementRef<HTMLInputElement>;
  dic: { [key: string]: string } = {};
  paginationEnabled$: Observable<boolean>;

  constructor(
    private matDialogRef: MatDialogRef<SearchGridModalComponent>,
    @Inject(MAT_DIALOG_DATA) public input: ISearchGridInput
  ) {
  }

  ngOnInit() {

    this.columns = this.input.columnsFunc().map(x => x.DisplayColumn);

    const onrecord$ = this.input.recordsFunc().pipe(tap(x => {
      this.dataSource.data = x;
      this.dataSource.paginator = this.paginator;
    }));

    const onInitialValue$ = this.input.InitializedViewValue().pipe(
      tap(x => {
        this.initialFilter = x;
        setTimeout(() => this.SearchInput.nativeElement.value = x);
        this.dataSource.filter = x.trim().toLowerCase();
      }));

    this.input.columnsFunc().forEach(x => {
      this.dic[x.DisplayColumn] = x.HeaderText
    });

    this.paginationEnabled$ = interval(1000).pipe(
      mergeMap(x => {
        const canPaginate = this.paginator?.pageSize >= this.paginator?.length ? true : null;
        return of(canPaginate)
      })
    )

    this.subscriptions = [
      onrecord$.subscribe(),
      onInitialValue$.subscribe(),

    ];

  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(g => g.unsubscribe());
    }
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilter(searchInput: HTMLInputElement) {
    searchInput.value = '';
    this.dataSource.filter = '';
  }

  onClose() {
    this.matDialogRef.close();
  }


  onSelect(element: any) {
    let payload = {};
    payload[this.input.TextField] = element[this.input.TextField];
    payload[this.input.ValueField] = element[this.input.ValueField];

    this.matDialogRef.close(payload);
  }


}
