import { FirestoreService } from '../../firebase/services/firestore.service';
import { IUserSecurityFirebaseModel } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class UserSecurityFireStore extends FirestoreService<IUserSecurityFirebaseModel>{

    protected basePath = 'users-security';
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore)
    }
}
