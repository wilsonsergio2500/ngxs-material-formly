import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IPostFirebaseModel extends IFireBaseEntity  {
    url: string;
    title: string;
    date: string;
    body?: string;
}
