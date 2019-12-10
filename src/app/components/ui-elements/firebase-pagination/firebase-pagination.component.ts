
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'firebase-pagination',
    templateUrl: 'firebase-pagination.component.html',
    styleUrls: ['firebase-pagination.component.scss']
})
export class FirebasePaginationComponent {

    @Input('disable-next') disableNext: boolean;
    @Input('disable-previous') disablePrevious: boolean;

    @Output() onNextPage: EventEmitter<void> = new EventEmitter<void>();
    @Output() onPreviousPage: EventEmitter<void> = new EventEmitter<void>();

    next() {
        if (this.onNextPage) {
            this.onNextPage.emit();
        }
    }

}
