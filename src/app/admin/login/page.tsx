'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/admin'); // ✅ Redirect to dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-mourid-green">Admin Login</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-mourid-green text-white w-full py-2 rounded">
          Sign In
        </button>
        <p className="text-sm text-right">
          <a href="/admin/forgot-password" className="text-mourid-green hover:underline">
            Forgot Password?
          </a>
        </p>
      </form>
    </section>
  );
}