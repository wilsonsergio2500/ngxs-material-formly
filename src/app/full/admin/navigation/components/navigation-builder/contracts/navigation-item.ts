export class NavigationItemNode {
    children?: NavigationItemNode[];
    //item: string;

    Label: string;
    Url?: string;
    
}


export interface INavigationItemNodeElement {
    label: string;
    path: string;
    children: INavigationItemNodeElement[];
}
