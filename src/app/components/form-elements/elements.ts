import { NgxChipsComponent } from './ngx-chips/ngx-chips.component'
import { getSearchGridComponents, getSearchGridEntryComponents } from './search-grid/search-grid.elements';


export function getCustomFormElements() {
  return [
      NgxChipsComponent,
      ...getSearchGridComponents()
  ];
}

export function getCustomFormEntryComponents() {
    return [
        ...getSearchGridEntryComponents()
    ]
}
