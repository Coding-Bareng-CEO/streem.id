"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Image from 'next/image';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const defaultEmail = process.env.NEXT_PUBLIC_DEFAULT_EMAIL || '';
    const defaultPassword = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || '';
    setEmail(defaultEmail);
    setPassword(defaultPassword);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error){
      setError(error.message);
    } else{
      //login berhasil, maka ambil data tambahan dari supabase user table
      const { data: userDetails } = await supabase.from('users').select('*').eq('id', user?.id).single();
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <Image src="/streem.png" alt="Streem Logo" width={100} height={100} className="mx-auto mb-4" priority />
        <form onSubmit={handleSignIn} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4 text-center">
          Belum punya akun? <a href="/signup" className="text-blue-500 hover:underline">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}
