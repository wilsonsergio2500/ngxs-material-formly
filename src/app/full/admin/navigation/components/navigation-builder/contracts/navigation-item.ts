export class NavigationItemNode {

    children?: NavigationItemNode[];
    Label: string;
    Url?: string;
    IsLabelOnly?: boolean;

    Level?: number;
    Idx?: number;

    Selected?: boolean;
}

