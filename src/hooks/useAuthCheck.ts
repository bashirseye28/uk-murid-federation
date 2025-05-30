"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function useAuthCheck() {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router, auth]);
}