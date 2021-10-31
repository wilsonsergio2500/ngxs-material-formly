import * as functions from "firebase-functions";
import * as firebaseAdmin from 'firebase-admin';

import { IUserSecurityFirebaseModel } from '../../src/app/schemas/users/user.model';


firebaseAdmin.initializeApp();

export const onUserSecurity = functions.firestore.document('/users-security/{Id}').onUpdate((change, context) => {
  const { Id } = context.params;
  const value = change.after.data() as IUserSecurityFirebaseModel;
  const { admin, blogger, editor } = value;

  functions.logger.warn(`updating user ${Id}`, { admin, blogger, editor });
  return firebaseAdmin.auth().setCustomUserClaims(Id, { admin, blogger, editor})

})

export const PostCounter = functions.firestore.document('/posts/{Id}').onWrite((change, context) => {

  const doc = firebaseAdmin.firestore().collection('config').doc('metrics');

  if (!change.before.exists) {
    functions.logger.warn(`increasing post counter`);
    doc.update({ postCounter: firebaseAdmin.firestore.FieldValue.increment(1) })
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated post, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing post counter`);
    doc.update({ postCounter: firebaseAdmin.firestore.FieldValue.increment(-1) })
  }

  return;

})
