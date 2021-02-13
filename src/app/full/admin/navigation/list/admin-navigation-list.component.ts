import { Component, OnInit} from '@angular/core';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { Observable } from 'rxjs';
import { NgTypeFormGroup } from '../../../../modules/form-type-builder/form-type-builder.model';
import { Store } from '@ngxs/store';
import { FormTypeBuilder } from '../../../../modules/form-type-builder/form-type-builder.service';
import { PageState } from '../../../../xs-ng/pages/pages.state';

@Component({
    selector: 'admin-navigation-list',
    templateUrl: 'admin-navigation-list.component.html',
    styleUrls: [`admin-navigation-list.component.scss`]
  })
export class AdminNavigationListComponent implements OnInit {

    pageRecords: () => Observable<IPageFirebaseModel[]>
    form: NgTypeFormGroup<any>;

    constructor(
        private store: Store,
        private formTypeBuilder: FormTypeBuilder
    ) {
    }

    ngOnInit() {

        this.pageRecords = () => this.store.select(PageState.getAllPages);

        this.form = this.formTypeBuilder.group({
            pageFinder: [null]
        });

    }


  
  } 
