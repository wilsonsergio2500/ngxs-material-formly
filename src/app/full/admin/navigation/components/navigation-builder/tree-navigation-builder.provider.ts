import { Injectable } from '@angular/core';
import { NavigationItemNode, NavigationItemDb } from './contracts/navigation-item';
import { BehaviorSubject } from 'rxjs'

const TREE_DATA = {
    //Groceries: {
    //    'Almond Meal flour': null,
    //    'Organic eggs': null,
    //    'Protein Powder': null,
    //    Fruits: {
    //        Apple: null,
    //        Berries: ['Blueberry', 'Raspberry'],
    //        Orange: null
    //    }
    //},
    //Reminders: [
    //    'Cook dinner',
    //    'Read the Material Design spec',
    //    'Upgrade Application to Angular'
    //]
    Reminders: [
        { Label: 'Cook dinner', Url: '', children: [] },
        { Label: 'Read the Material Design spec', Url: '', children: [] },
        { Label: 'Upgrade Application to Angular', Url: '', children: [] }
    ]

};

@Injectable()
export class NavigationBuilderDb {
    dataChange = new BehaviorSubject<NavigationItemNode[]>([]);

    get data(): NavigationItemNode[] { return this.dataChange.value; }

    constructor() {
        this.initialize();
    }

    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        const data = this.buildFileTree(TREE_DATA.Reminders, 0);

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
            //this.dataChange.next(this.data);
            //console.log(this.data);
        }
    }

    //updateItem(node: NavigationItemNode) {
    //    //node.item = name;
    //    console.log(this.data);
    //    this.dataChange.next(this.data);
    //}

    dataChanged() {
        this.dataChange.next(this.data);
    }

    
}
