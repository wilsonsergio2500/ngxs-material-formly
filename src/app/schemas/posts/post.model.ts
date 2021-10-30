import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IPostFirebaseModel extends IFireBaseEntity {
  publish: boolean;
  url: string;
  title: string;
  image: string;
  excerpt: string;
  body?: string;
}
