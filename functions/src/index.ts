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
