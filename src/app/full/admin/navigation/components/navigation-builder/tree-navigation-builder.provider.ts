import { Injectable } from '@angular/core';
import { NavigationItemNode, NavigationItemDb } from './contracts/navigation-item';
import { BehaviorSubject, Subscription } from 'rxjs'
import { Store } from '@ngxs/store';
import { NavigationState } from '../../../../../xs-ng/navigation/navigation.state';
import { tap } from 'rxjs/operators';

const TREE_DATA = {
    Reminders: [
        {
            Label: 'Cook dinner', Url: '', children: [
                { Label: "Apple", Url: "", children: [] },
            ]
        },
        { Label: 'Read the Material Design spec', Url: '', children: [] },
        { Label: 'Upgrade Application to Angular', Url: '', children: [] }
    ]

};

@Injectable()
export class NavigationBuilderDb {

    dataChange = new BehaviorSubject<NavigationItemNode[]>([]);
    root: NavigationItemDb[]
    private subscription: Subscription;

    get data(): NavigationItemNode[] { return this.dataChange.value; }

    constructor(private store: Store) {
        this.initialize();
    }

    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.

        this.subscription = this.store.selectOnce(NavigationState.getNavigationItem).pipe(
            tap(navItems => {
                console.log(navItems);
            })
        ).subscribe();

        

        this.root = TREE_DATA.Reminders;
        const data = this.buildFileTree(this.root, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(elements: NavigationItemDb[], level: number): NavigationItemNode[] {

        let counter = 1;
        return elements.reduce((acc, item) => {
            const node = new NavigationItemNode();

            node.Label = item.Label;
            node.Url = item.Url;
            node.IsLabelOnly = false;
            node.Level = level;
            node.Idx = counter++;
            node.Selected = false;

            if (item.children && item.children.length) {
                node.children = this.buildFileTree(item.children, level + 1);
            } else {
                node.children = [];
            }

            return acc.concat(node);
        }, []);

    }

    insertItem(parent: NavigationItemNode, newItem: NavigationItemNode) {
        if (parent.children) {
            parent.children.push({ ...newItem });
            this.dataChanged();
        }
    }

    insertToRoot(newItem: NavigationItemNode) {
        this.data.push({ ...newItem });
        this.dataChanged();
        
    }

    removeSelected() {
        const data = this.removeSelectedNavs(this.data);
        this.dataChange.next(data);
    }

    removeSelectedNavs(nodes: NavigationItemNode[]) {
        nodes = nodes.filter(e => e.Selected == false);
        nodes.forEach(node => {
            if (node.children && node.children.length) {
               node.children =  this.removeSelectedNavs(node.children);
            }
        });
        return [...nodes];
    }


    dataChanged() {
        this.dataChange.next(this.data);
    }

    
}
