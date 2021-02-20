import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface INavigationFirebaseModel extends IFireBaseEntity {
    label: string;
    url: string;
    children: INavigationFirebaseModel[]
    IsLabelOnly: boolean;
}
