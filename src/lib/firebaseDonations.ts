// lib/firebaseDonations.ts

import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase'; // ✅ use db from shared instance

// 🔁 Save donation (already defined)
export async function saveDonationToFirebase(data: {
  name: string;
  email: string;
  amount: number;
  campaign: string;
  cause: string;
  isAnonymous: boolean;
  dahiraCity?: string;
  childrenUnder16?: number;
  createdByStripe?: boolean;
  date?: Date;
}) {
  try {
    const donationsRef = collection(db, 'donations');
    await addDoc(donationsRef, {
      ...data,
      date: Timestamp.fromDate(data.date || new Date()),
      createdAt: Timestamp.now(),
    });
    console.log('✅ Donation saved to Firestore:', data.email, data.amount);
  } catch (error) {
    console.error('❌ Failed to save donation to Firestore:', error);
    throw error;
  }
}

// 📥 Fetch all donations
export async function fetchAllDonations() {
  try {
    const donationsRef = collection(db, 'donations');
    const q = query(donationsRef, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);

    const donations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return donations;
  } catch (error) {
    console.error('❌ Failed to fetch donations:', error);
    return [];
  }
}