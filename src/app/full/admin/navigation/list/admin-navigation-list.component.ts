import { Component, OnInit, OnDestroy} from '@angular/core';
import { IPageFirebaseModel } from '../../../../schemas/pages/page.model';
import { Observable, Subscription } from 'rxjs';
import { NgTypeFormGroup } from '../../../../modules/form-type-builder/form-type-builder.model';
import { Store, Select } from '@ngxs/store';
import { FormTypeBuilder } from '../../../../modules/form-type-builder/form-type-builder.service';
import { PageState } from '../../../../xs-ng/pages/pages.state';
import { NavigationBuilderDb } from '../components/navigation-builder/tree-navigation-builder.provider';
import { IPageNavigation } from '../components/page-entry/navigation-page-entry.contract';
import { ConfirmationDialogService } from '../../../../components/ui-elements/confirmation-dialog/confirmation-dialog.service';
import { tap } from 'rxjs/operators';
import { NavigationState } from '../../../../xs-ng/navigation/navigation.state';
import { INavigationModel } from '../../../../schemas/navigations/navigation.model';
import { NavigationItemNode } from '../components/navigation-builder/contracts/navigation-item';
import { NavigationCreateAction } from '../../../../xs-ng/navigation/navigation.actions';

@Component({
    selector: 'admin-navigation-list',
    templateUrl: 'admin-navigation-list.component.html',
    styleUrls: [`admin-navigation-list.component.scss`]
  })
export class AdminNavigationListComponent implements OnInit, OnDestroy {


    @Select(NavigationState.IsLoading) woring$: Observable<boolean>;
    forceExpand = false;
    private subscriptions: Subscription[] = [];

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

        const onConfirmationClick = this.confirmationDialog.OnConfirm('Are you sure you would like to remove the selected Nodes').pipe(
            tap(_ => {
                this.navigationDb.removeSelected();
            })
        );

        const confirmationSubscription$ = onConfirmationClick.subscribe();
        this.subscriptions.push(confirmationSubscription$);


    }
    OnOpenPanel() {
        this.forceExpand = true;
    }

    ngOnDestroy()
    {
        if (this.subscriptions.length) {
            this.subscriptions.forEach(x => x.unsubscribe());
        }
            
    }

    onSaveNavigations() {

        const navigations = this.navigationDb.data;
        const model = this.normalizeNavigation(navigations);
        this.store.dispatch(new NavigationCreateAction({ navigationRoot: model }));

    }

    normalizeNavigation(nodes: NavigationItemNode[]): INavigationModel[] {

        let items = [];

        nodes.forEach(node => {

            let { Url : url, Label: label, IsLabelOnly : isLabelOnly, children } = node;

            const model : INavigationModel = {
                url, label,
                isLabelOnly,
                children: children.length ? this.normalizeNavigation(children) : []
                
            }

            items = [...items, model];
        })

        return items;

    }


  
  } 
