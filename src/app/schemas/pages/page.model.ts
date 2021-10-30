import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IPageFirebaseModel extends IFireBaseEntity {
  publish: boolean;
  url: string;
  title: string;
  body: string;
}
