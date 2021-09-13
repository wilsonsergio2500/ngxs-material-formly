import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IImageFirebaseModel extends IFireBaseEntity {
  imageUrl: string;
  tags: string[]
}
