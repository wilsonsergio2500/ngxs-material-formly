import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface INavigationFirebaseModel extends IFireBaseEntity {
    navigationRoot: INavigationModel[];
}

export interface INavigationModel {
    label: string;
    url: string;
    children: INavigationModel[]
    isLabelOnly: boolean;
}
