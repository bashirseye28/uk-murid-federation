'use client';

import { useState } from 'react';
import { resetPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setMessage('Reset link sent to your email.');
    } catch (err) {
      setMessage('Failed to send reset link.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-mourid-green">Reset Password</h1>
        {message && <p className="text-mourid-green">{message}</p>}
        <input
          type="email"
          placeholder="Your email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-mourid-green text-white w-full py-2 rounded">
          Send Reset Link
        </button>
        <p className="text-sm text-right">
          <a href="/admin/login" className="text-mourid-green hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </section>
  );
}