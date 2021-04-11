
import { SearchGridComponent } from './search-grid.component';
import { SearchGridModalComponent } from './search-grid-modal/search-grid-modal.component';
import { SearchGridColumnComponent } from './search-grid-column/search-grid-column.component';


export function getSearchGridComponents() {
  return [
    SearchGridComponent,
    SearchGridColumnComponent,
    SearchGridModalComponent
  ]
}

export function getSearchGridEntryComponents() {
  return [
    SearchGridModalComponent
  ]
}
