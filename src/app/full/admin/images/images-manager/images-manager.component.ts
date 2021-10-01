import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
//import { IImageFirebaseModel } from '../../../../schemas/images/image.model';
//import { ImagesState } from '@states/images/images.state';

@Component({
    selector: 'images-manager',
    templateUrl: 'images-manager.component.html',
    styleUrls: [`images-manager.component.scss`]
  })
export class ImagesManagerComponent {

  //@Select(ImagesState.IsLoading) working$: Observable<boolean>;
  //@Select(ImagesState.getPage) pageItems$: Observable<IImageFirebaseModel[]>;

    constructor(
    ) {
    }
  
  } 
