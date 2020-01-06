import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IPageFirebaseModel extends IFireBaseEntity {
    url: string;
    title: string;
    body: string;
}
