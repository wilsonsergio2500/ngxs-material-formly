import { FirestoreService } from '../../firebase/services/firestore.service';
import { IPostFirebaseModel } from './post.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class PostFireStore extends FirestoreService<IPostFirebaseModel> {

    protected basePath = "posts";
    constructor(private angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }
}
