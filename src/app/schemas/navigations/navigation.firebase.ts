import { FirestoreService } from '../../firebase/services/firestore.service';
import { INavigationFirebaseModel } from './navigation.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class NavigationFireStore extends FirestoreService<INavigationFirebaseModel>{
    protected basePath = "navigation";
    constructor(private angularFireStore: AngularFirestore) {
        super(angularFireStore)
    }
}
