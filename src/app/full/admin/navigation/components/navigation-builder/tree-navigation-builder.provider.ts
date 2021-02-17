import { Injectable } from '@angular/core';
import { NavigationItemNode } from './contracts/navigation-item';
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
        const data = this.buildFileTree(TREE_DATA, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): NavigationItemNode[] {
        return obj.Reminders;
        //return Object.keys(obj).reduce<NavigationItemNode[]>((accumulator, key) => {
        //    const value = obj[key];
        //    const node = new NavigationItemNode();
        //    node.item = key;

        //    if (value != null) {
        //        if (typeof value === 'object') {
        //            node.children = this.buildFileTree(value, level + 1);
        //        } else {
        //            node.item = value;
        //        }
        //    }

        //    return accumulator.concat(node);
        //}, []);
    }

    /** Add an item to to-do list */
    //insertItem(parent: NavigationItemNode, name: string) {
    //    if (parent.children) {
    //            parent.children.push({ item: name } as NavigationItemNode);
    //        this.dataChange.next(this.data);
    //        console.log(this.data);
    //    }
    //}

    insertItem(parent: NavigationItemNode, newItem: NavigationItemNode) {
        if (parent.children) {
            parent.children.push({...newItem});
            this.dataChange.next(this.data);
            console.log(this.data);
        }
    }

    updateItem(node: NavigationItemNode, name: string) {
        node.item = name;
        this.dataChange.next(this.data);
    }
}
