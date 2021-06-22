import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'media-manage-dialog',
    templateUrl: 'media-manage-dialog.component.html',
    styleUrls: [`media-manage-dialog.component.scss`]
  })
  export class MediaManageDialogComponent {

    constructor(
      private matDialogRef: MatDialogRef<MediaManageDialogComponent>
    ) {
    }
  
    
  
   
  
  } 
