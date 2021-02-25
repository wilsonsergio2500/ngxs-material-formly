export class NavigationItemNode {

    children?: NavigationItemNode[];
    Label: string;
    Url?: string;
    IsLabelOnly?: boolean;

    Level?: number;
    Idx?: number;

    Selected?: boolean;
}

//export class NavigationItemDb {

//    children?: NavigationItemNode[];
//    Label: string;
//    Url?: string;
//    IsLabelOnly?: boolean;

//}


export interface INavigationItemNodeElement {
    label: string;
    path: string;
    children: INavigationItemNodeElement[];
}
