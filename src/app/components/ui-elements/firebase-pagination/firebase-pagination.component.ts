
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'firebase-pagination',
    templateUrl: 'firebase-pagination.component.html',
    styleUrls: ['firebase-pagination.component.scss']
})
export class FirebasePaginationComponent {

    @Input('enabled-next') enabledNext: boolean;
    @Input('enabled-previous') enabledPrevious: boolean;

    @Output() onNextPage: EventEmitter<void> = new EventEmitter<void>();
    @Output() onPreviousPage: EventEmitter<void> = new EventEmitter<void>();

    next() {
        if (this.onNextPage) {
            this.onNextPage.emit();

        }
    }

    prior() {
        if (this.onPreviousPage) {
            this.onPreviousPage.emit();
        }
    }

}
