import { FirestoreService } from '../../firebase/services/firestore.service';
import { IUserFirebaseModel } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class UserFireStore extends FirestoreService<IUserFirebaseModel>{

    protected basePath = "users";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }
}
