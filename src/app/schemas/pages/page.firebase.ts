import { FirestoreService } from '../../firebase/services/firestore.service';
import { IPageFirebaseModel } from './page.model';
import { AngularFirestore } from '@angular/fire/firestore';

export class PageFireStore extends FirestoreService<IPageFirebaseModel>{

    protected basePath: "pages";
    constructor(private angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}
