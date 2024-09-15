"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Head from 'next/head';


const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { email, password, callbackUrl: '/internal-lead-list' });
  };

  return (
    <> <Head>
      <title>Sign In</title>
      <meta name="description" content="Sign in to access the internal lead management system." />
    </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Sign In</h1>
          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
