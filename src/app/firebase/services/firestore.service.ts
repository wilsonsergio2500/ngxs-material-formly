import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

export abstract class FirestoreService<T> {

    protected abstract basePath: string;

    constructor(
        protected firestore: AngularFirestore,
    ) {
    }

    doc$(id: string): Observable<T> {
        return this.firestore.doc<T>(`${this.basePath}/${id}`).valueChanges().pipe(
            tap(r => {
                if (!environment.production) {
                    console.groupCollapsed(`Firestore Streaming [${this.basePath}] [doc$] ${id}`)
                    console.log(r)
                    console.groupEnd()
                }
            }),
        );
    }

    collection$(queryFn?: QueryFn): Observable<T[]> {
        return this.firestore.collection<T>(`${this.basePath}`, queryFn).valueChanges().pipe(
            tap(r => {
                if (!environment.production) {
                    console.groupCollapsed(`Firestore Streaming [${this.basePath}] [collection$]`)
                    console.table(r)
                    console.groupEnd()
                }
            }),
        );
    }

    create(value: T) {
        const Id = this.firestore.createId();
        return this.collection.doc(Id).set(Object.assign({}, { Id }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create] [${Id}]`)
                console.log('[Id]', Id, value)
                console.groupEnd()
            }
        })
    }

    createWithId(Id: string, value: T) {
        return this.collection.doc(Id).set(Object.assign({}, { Id }, value)).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [create] [${Id}]`)
                console.log('[Id]', Id, value)
                console.groupEnd()
            }
        })
    }

    update(Id: string, value: T) {
        return this.firestore.doc<T>(`${this.basePath}/${Id}`).update({ ...value }).then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [update] [${Id}]`)
                console.log('[Id]', Id, value)
                console.groupEnd()
            }
        })
    }

    delete(id: string) {
        return this.collection.doc(id).delete().then(_ => {
            if (!environment.production) {
                console.groupCollapsed(`Firestore Service [${this.basePath}] [delete]`)
                console.log('[Id]', id)
                console.groupEnd()
            }
        })
    }

    queryCollection(queryFn?: QueryFn) {
        return this.firestore.collection<T>(`${this.basePath}`, queryFn);
    }

    private get collection() {
        return this.firestore.collection(`${this.basePath}`);
    }



}
