import { Component, AfterContentInit, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ImagesOnResizerState } from '../../../../../xs-ng/media/images-on-resizer/images-on-resizer.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'media-manage',
    templateUrl: 'media-manage.component.html',
    styleUrls: [`media-manage.component.scss`]
  })
  export class MediaManageComponent {

    @Select(ImagesOnResizerState.IsLoading) working$: Observable<boolean>;

    constructor() {
    }
  
  } 
