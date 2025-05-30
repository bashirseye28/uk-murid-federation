import { db } from './firebase';
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';

export async function fetchDonations(lastDoc?: any, pageSize = 15) {
  const baseQuery = query(
    collection(db, 'donations'),
    orderBy('createdAt', 'desc'),
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(pageSize)
  );

  const snapshot = await getDocs(baseQuery);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { data, lastVisible };
}