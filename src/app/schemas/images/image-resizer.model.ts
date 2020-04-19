import { IFireBaseEntity } from '../../firebase/types/firebase-entity';

export interface IImageResizerFirebaseModel extends IFireBaseEntity {
    imageUrl: string;
    tags: string[]
}
