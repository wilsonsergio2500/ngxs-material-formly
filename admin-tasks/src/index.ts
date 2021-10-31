import * as firebaseAdmin from 'firebase-admin';
import { adminUser } from './admin-user';


const serviceAccount = require('../service-account/sa.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

firebaseAdmin.auth().createUser({ ...adminUser, emailVerified: false, disabled: false, })
  .then((user) => {
  return firebaseAdmin.auth().setCustomUserClaims(user.uid, { superAdmin: true })
})

