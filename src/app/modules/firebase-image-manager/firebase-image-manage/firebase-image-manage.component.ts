import { Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FirebaseImageUploaderService } from '../firebase-image-uploader-service/firebase-image-uploader.service';

@Component({
    selector: 'firebase-image-manage',
    templateUrl: 'firebase-image-manage.component.html',
    styleUrls: [`firebase-image-manage.component.scss`]
  })
  export class FirebaseImageManageComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private uploadService: FirebaseImageUploaderService
    ) {
    }

  onAdd() {
    const onUp$ = this.uploadService.OnOpen().pipe(
      tap(path => {
        console.log(path);
      })
    );

    this.subscriptions = [...this.subscriptions, onUp$.subscribe()];

  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
  
  } 
