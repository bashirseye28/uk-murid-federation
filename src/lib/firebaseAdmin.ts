// src/lib/firebaseAdmin.ts
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Check for required env vars
if (!process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_CLIENT_EMAIL ||
    !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('❌ Missing Firebase Admin credentials in environment variables.');
}

const app: App =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      })
    : getApps()[0];

const adminDb = getFirestore(app);

export { adminDb };