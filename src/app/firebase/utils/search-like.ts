import { firestore } from 'firebase';

export const searchLike = (ref: firestore.CollectionReference, key: string, val: any) => ref.where(key, '>=', val).where(key, '<=', val + '\uf8ff');

