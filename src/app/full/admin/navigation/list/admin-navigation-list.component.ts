import { Component, OnInit} from '@angular/core';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { Observable } from 'rxjs';
import { NgTypeFormGroup } from '../../../../modules/form-type-builder/form-type-builder.model';
import { Store } from '@ngxs/store';
import { FormTypeBuilder } from '../../../../modules/form-type-builder/form-type-builder.service';
import { PageState } from '../../../../xs-ng/pages/pages.state';
import { NavigationBuilderDb } from '../components/navigation-builder/tree-navigation-builder.provider';
import { IPageNavigation } from '../components/page-entry/navigation-page-entry.contract';
import { ConfirmationDialogService } from '../../../../components/ui-elements/confirmation-dialog/confirmation-dialog.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'admin-navigation-list',
    templateUrl: 'admin-navigation-list.component.html',
    styleUrls: [`admin-navigation-list.component.scss`]
  })
export class AdminNavigationListComponent implements OnInit {

    forceExpand = false;

    constructor(
        private store: Store,
        private formTypeBuilder: FormTypeBuilder,
        private navigationDb: NavigationBuilderDb,
        private confirmationDialog: ConfirmationDialogService
    ) {
    }

    ngOnInit() {


    }

    addTop($event: IPageNavigation) {

        const { label: Label, pageFinder: Url, isLabelOnly: IsLabelOnly } = $event;
        const newItem = { Label, Url, IsLabelOnly };
        console.log(newItem);
        this.navigationDb.insertToRoot(newItem);
    }

    cancelTop() {
        this.forceExpand = false;
    }

    onRemoveSelectedNodes() {

        //console.log('entery');
        const onConfirmationClick = this.confirmationDialog.OnConfirm('Are you sure you would like to remove the selected Nodes').pipe(
            tap(_ => {
                this.navigationDb.removeSelected();
                // remove nodes
            })
        );

        const confirmationSubscription = onConfirmationClick.subscribe();
        //confirmationSubscription.unsubscribe();


    }
    OnOpenPanel() {
        this.forceExpand = true;
    }


  
  } 
