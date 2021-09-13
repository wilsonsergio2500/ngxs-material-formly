import { FirestoreService } from '../../firebase/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IImageFirebaseModel } from './image.model';


export class ImageResizeFireStore extends FirestoreService<IImageFirebaseModel> {

  protected basePath: string = 'images';
  constructor(private angularFireStore: AngularFirestore) {
    super(angularFireStore);
  }
}
