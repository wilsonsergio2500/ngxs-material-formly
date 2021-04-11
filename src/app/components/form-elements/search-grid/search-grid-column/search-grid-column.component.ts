import { Component, Input } from '@angular/core'

@Component({
  selector: 'search-grid-column',
  template: ''
})
export class SearchGridColumnComponent {

  @Input()
  public DisplayColumn: string;
  @Input()
  public HeaderText: string;
}
