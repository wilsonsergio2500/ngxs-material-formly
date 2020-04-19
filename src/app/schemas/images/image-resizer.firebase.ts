import { FirestoreService } from '../../firebase/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IImageResizerFirebaseModel } from './image-resizer.model';


export class ImageResizeFireStore extends FirestoreService<IImageResizerFirebaseModel> {

    protected basePath: string = 'images-on-resizer';
    constructor(private angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }
}
