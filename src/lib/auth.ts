// src/lib/auth.ts
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';

export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

export async function resetPassword(email: string) {
  return await sendPasswordResetEmail(auth, email);
}