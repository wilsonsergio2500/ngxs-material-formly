import { Component, AfterContentInit, OnInit, NgZone, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavItemFlatNode } from './contracts/nav-item-flatnode';
import { NavItemNode } from './contracts/nav-item';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'nav-builder',
    templateUrl: 'nav-builder.component.html',
    styleUrls: [`nav-builder.component.scss`]
  })
export class NavBuilderComponent implements OnChanges {
    


    @Input() items: any;

    flatNodeMap = new Map<NavItemFlatNode, NavItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<NavItemNode, NavItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: NavItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<NavItemFlatNode>;

    treeFlattener: MatTreeFlattener<NavItemNode, NavItemFlatNode>;

    dataSource: MatTreeFlatDataSource<NavItemNode, NavItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<NavItemFlatNode>(true /* multiple */);

    //constructor(private _database: NavigationBuilderDb, private zone: NgZone) {
    //    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    //    this.treeControl = new FlatTreeControl<NavItemFlatNode>(this.getLevel, this.isExpandable);
    //    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    //    _database.dataChange.pipe(
    //        tap(data => this.dataSource.data = data),
    //    ).subscribe();

    //}

    getLevel = (node: NavItemFlatNode) => node.level;

    isExpandable = (node: NavItemFlatNode) => node.expandable;

    getChildren = (node: NavItemNode): NavItemNode[] => node.children;

    hasChild = (_: number, _nodeData: NavItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: NavItemFlatNode) => _nodeData.Label === '';


    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: NavItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.Label === node.Label
            ? existingNode
            : new NavItemFlatNode();
        flatNode.Label = node.Label;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: NavItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: NavItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: NavItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: NavItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: NavItemFlatNode): void {
        let parent: NavItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: NavItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: NavItemFlatNode): NavItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: NavItemFlatNode) {
        const navItemNode = this.flatNodeMap.get(node);
        let parent = null;
        if (!navItemNode.children) {
            navItemNode.children = [];
            parent = this.getParentNode(node);
        }
        //this._database.insertItem(navItemNode!, '');
        setTimeout(() => this.refreshToggle(node, parent));
    }

    refreshToggle(node: NavItemFlatNode, parent: NavItemFlatNode) {
        this.treeControl.expand(node);
        if (!!parent) {
            this.treeControl.collapse(parent);
            this.treeControl.expand(parent);
        }
    }

    /** Save the node to database */
    saveNode(node: NavItemFlatNode, itemValue: string) {
        const nestedNode = this.flatNodeMap.get(node);
        //this._database.updateItem(nestedNode!, itemValue);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'].currentValue) {

        }
    }
   
  
}


export class NavigationBuilderHelper {


    constructor(

    ) {
    }
}
