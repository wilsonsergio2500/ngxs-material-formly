import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import ImageCompressor from 'image-compressor.js';
import { FileUploader } from 'ng2-file-upload';
import { from, Observable, Observer, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'firebase-image-uploader',
  templateUrl: 'firebase-image-uploader.component.html',
  styleUrls: [`firebase-image-uploader.component.scss`],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FirebaseImageUploaderComponent),
    multi: true
  }],
})
export class FirebaseImageUploaderComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() bucket: string = 'images';
  bucketRef: AngularFireStorageReference;
  loading = false;
  disable = false;
  imgUrl = null;

  propagateChange = (_: any) => ({});
  propagateTouched = () => ({});
  subscriptions: Subscription[] = [];

  uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/jpeg', 'image/png'],
    allowedFileType: ['png', 'jpeg']
  });

  constructor(
    private storage: AngularFireStorage
  ) {
  }


  writeValue(url): void {
    if (url) {
      this.imgUrl = url;
    }
  }
  registerOnChange(fn): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  ngOnInit() {
    console.log(this.bucket);
    this.bucketRef = this.storage.ref(this.bucket);
  }

  onPickImage(inputFile: HTMLInputElement) {
    inputFile.click();
  }

  fileSelected($event: File[]) {
    this.loading = true;

    const file = $event[0];
    const { name } = file;
    const sub$ = this.compressFile(file).pipe(
      mergeMap(file => {
        const timestamp = Date.now().toString();
        const fn = `${timestamp}-${name}`;
        const ref = this.bucketRef.child(fn);
        return from(ref.put(file))
      }),
      mergeMap((snapshot: UploadTaskSnapshot) => from(snapshot.ref.getDownloadURL())),
      tap(url => {
        this.propagateChange(url);
        this.propagateTouched();
        this.imgUrl = url;
        this.loading = false;
      })
    );

    this.subscriptions = [...this.subscriptions, sub$.subscribe()];

  }

  compressFile(file): Observable<File> {
    return Observable.create((observer: Observer<File>) => {
      new ImageCompressor(file, {
        quality: .6,
        success: (fc: File) => {
          observer.next(fc);
          observer.complete();
        },
        error: (e) => observer.error(e)
      })
    })
  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }



}
