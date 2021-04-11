import { Observable } from "rxjs";
import { ISearchGridColumnItem } from '../search-grid-column/search-grid-column.contract';

export interface ISearchGridInput {
  placeholder: string;
  recordsFunc: () => Observable<any[]>;
  columnsFunc: () => ISearchGridColumnItem[];
  TextField: string;
  ValueField: string;
  InitializedViewValue: () => Observable<string>;
}
