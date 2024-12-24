const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_PRIVATE_KEY_PATH);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, 
  });

  console.log('Firebase is connected.');
} catch (error) {
  console.error('Firebase initialization error:', error.message);
}

const db = admin.firestore();

module.exports = db; 


