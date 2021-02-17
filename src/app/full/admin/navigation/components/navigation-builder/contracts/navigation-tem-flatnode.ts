export class NavigationItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;

    Label: string;

}


export interface INavigationItemFlatNodeElement {
    Label: string;
    path: string;
    level: number;
    expandable: boolean;
}
