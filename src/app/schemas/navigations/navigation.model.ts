import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface INavigationFirebaseModel extends IFireBaseEntity {
    navigationRoot: INavigationModel[];
}

export interface INavigationModel {
    Label: string;
    Url: string;
    children: INavigationModel[]
    IsLabelOnly: boolean;
}
