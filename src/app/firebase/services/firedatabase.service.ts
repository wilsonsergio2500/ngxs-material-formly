import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

export abstract class FireDatabaseService<T>{

  protected abstract basePath: string;
  constructor(private angularFireDatabase: AngularFireDatabase) {
  }


  objectc$(id: string): Observable<T> {
    return this.angularFireDatabase.object<T>(`${this.basePath}/${id}`).valueChanges().pipe(
      tap(r => {
        if (!environment.production) {
          console.groupCollapsed(`FireDatabase Streaming [${this.basePath}] [object$] ${id}`)
          console.log(r)
          console.groupEnd()
        }
      })
    )
  }

  list$(queryFn?: QueryFn): Observable<T[]> {
    return this.angularFireDatabase.list<T>(`${this.basePath}`, queryFn).valueChanges().pipe(
      tap(r => {
        if (!environment.production) {
          console.groupCollapsed(`FireDatabase Streaming [${this.basePath}] [list$]`)
          console.table(r)
          console.groupEnd()
        }
      }),
    )
  }

  push(value: T) {
    const id = this.angularFireDatabase.createPushId();
    const obj = Object.assign({}, value, {id})
    return this.list.push(obj).then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`FireDatabase Service [${this.basePath}] [push] [${id}]`)
        console.log('[Id]', id, value)
        console.groupEnd()
      }
    })
  }

  update(id: string, value: T) {
    return this.angularFireDatabase.object(`${this.basePath}/${id}`).update(value).then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`FireDatabase Service [${this.basePath}] [Update]`)
        console.log('[Id]', id, value)
        console.groupEnd()
      }
    })
  }

  remove(id: string) {
    return this.angularFireDatabase.object(`${this.basePath}/${id}`).remove().then(_ => {
      if (!environment.production) {
        console.groupCollapsed(`FireDatabase Service [${this.basePath}] [remove]`)
        console.log('[Id]', id)
        console.groupEnd()
      }
    })
  }

  private get list() {
    return this.angularFireDatabase.list(`${this.basePath}`);
  }
}
