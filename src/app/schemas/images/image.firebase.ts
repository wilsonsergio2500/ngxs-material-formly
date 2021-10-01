import { FirestoreService } from '../../firebase/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IImageFirebaseModel } from './image.model';


export class ImagesFireStore extends FirestoreService<IImageFirebaseModel> {

  protected basePath: string = 'images';
  constructor(angularFireStore: AngularFirestore) {
    super(angularFireStore);
  }
}
