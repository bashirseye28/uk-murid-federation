// src/lib/firebaseAuth.ts
'use client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { useEffect, useState } from 'react';

export function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | object>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}