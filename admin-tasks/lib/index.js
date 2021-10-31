"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require('../service-account/sa.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://ng6-fire-shop.firebaseio.com",
});
firebaseAdmin.auth().createUser({
    email: 'gio@gio.com',
    emailVerified: false,
    password: 'admin123',
    displayName: 'Super Admin',
    disabled: false,
}).then((user) => {
    return firebaseAdmin.auth().setCustomUserClaims(user.uid, { superAdmin: true });
});
//# sourceMappingURL=index.js.map