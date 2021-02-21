import { Component, NgZone} from '@angular/core';
import { NavigationItemNode } from './contracts/navigation-item';
import { NavigationItemFlatNode } from './contracts/navigation-tem-flatnode';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NavigationBuilderDb } from './tree-navigation-builder.provider';
import { tap } from 'rxjs/operators';
import { IPageNavigation } from '../page-entry/navigation-page-entry.contract';

@Component({
    selector: 'tree-navigation-builder',
    templateUrl: 'tree-navigation-builder.component.html',
    styleUrls: [`tree-navigation-builder.component.scss`]
  })
  export class TreeNavigationBuilderComponent {

    flatNodeMap = new Map<NavigationItemFlatNode, NavigationItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<NavigationItemNode, NavigationItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: NavigationItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<NavigationItemFlatNode>;

    treeFlattener: MatTreeFlattener<NavigationItemNode, NavigationItemFlatNode>;

    dataSource: MatTreeFlatDataSource<NavigationItemNode, NavigationItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<NavigationItemFlatNode>(true /* multiple */);

    constructor(private _database: NavigationBuilderDb, private zone: NgZone) {

        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<NavigationItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        _database.dataChange.pipe(
            tap(data => this.dataSource.data = data),
        ).subscribe();
        
    }

    getLevel = (node: NavigationItemFlatNode) => node.level;

    isExpandable = (node: NavigationItemFlatNode) => node.expandable;

    getChildren = (node: NavigationItemNode): NavigationItemNode[] => node.children;

    hasChild = (_: number, _nodeData: NavigationItemFlatNode) =>  _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: NavigationItemFlatNode) => _nodeData.Label === '';


    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: NavigationItemNode, level: number) => {
        //console.log(node);
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.Label === node.Label
            ? existingNode
            : new NavigationItemFlatNode();
        flatNode.Label = node.Label;
        flatNode.level = level;
        flatNode.expandable = !!node.children && !!node.children.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: NavigationItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: NavigationItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: NavigationItemFlatNode): void {

        const selected = this.checklistSelection.isSelected(node);
        const navItem = this.flatNodeMap.get(node);
        navItem.Selected = (selected) ? false : true;


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
        this._database.dataChanged();
    }

    onSelectNode(node: NavigationItemFlatNode) {

        const selected = this.checklistSelection.isSelected(node);
        const navItem = this.flatNodeMap.get(node);
        navItem.Selected = (selected) ? false : true;

        this._database.dataChanged();

    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: NavigationItemFlatNode): void {
        const selected = this.checklistSelection.isSelected(node);
        const navItem = this.flatNodeMap.get(node);

        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
        this._database.dataChanged();
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: NavigationItemFlatNode): void {
        let parent: NavigationItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: NavigationItemFlatNode): void {
        //console.log('here');
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            const navItem = this.flatNodeMap.get(node);
            console.log(navItem);
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            const navItem = this.flatNodeMap.get(node);
            console.log(navItem);
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: NavigationItemFlatNode): NavigationItemFlatNode | null {
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
    addNewItem(node: NavigationItemFlatNode) {
        console.log('node',node);
        const parentNavItemNode = this.flatNodeMap.get(node);
        let parent = null;
        if (!parentNavItemNode.children) {
            parentNavItemNode.children = [];
            parent = this.getParentNode(node);
            console.log('parent',parent);
        }
        const newItem: NavigationItemNode = { Label: '', Level : parentNavItemNode.Level+1 };
        this._database.insertItem(parentNavItemNode!, newItem);
        setTimeout(() => this.refreshToggle(node, parent));
    }

    refreshToggle(node: NavigationItemFlatNode, parent: NavigationItemFlatNode) {
        this.treeControl.expand(node);
        if (!!parent) {
            this.treeControl.collapse(parent);
            this.treeControl.expand(parent);
        }
    }


    onSaveNode($event: IPageNavigation, node: NavigationItemFlatNode) {

        const nestedNode = this.flatNodeMap.get(node);

        const { label : Label, pageFinder: Url, isLabelOnly : IsLabelOnly } = $event;

        nestedNode.Label = Label;
        nestedNode.Url = Url;
        nestedNode.IsLabelOnly = IsLabelOnly;

        this._database.dataChanged();

    }

    onCancelAdd(node: NavigationItemFlatNode) {

        const parent = this.getParentNode(node);
        const parentNavItem = this.flatNodeMap.get(parent);
        parentNavItem.children = [...parentNavItem.children.filter(g => g.Label != '')]
        this._database.dataChanged();
      
    }

    
  
  } 
