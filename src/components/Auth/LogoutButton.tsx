"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserEmail(user?.email || null);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600 truncate max-w-[150px]">
        {userEmail ? `Signed in as: ${userEmail}` : "Loading..."}
      </div>
      <button
        onClick={handleLogout}
        className="ml-4 flex items-center text-red-600 text-sm font-medium hover:underline"
      >
        <LogOut size={16} className="mr-1" />
        Logout
      </button>
    </div>
  );
}