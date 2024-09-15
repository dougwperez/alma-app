"use client";

import { useSession, signIn } from 'next-auth/react';
import InternalLeadList from '../../components/InternalLeadList';

const InternalLeadListPage = () => {
  const { data: session, status } = useSession(); // Get session data and status
  console.log('Koca: session ', session);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    ); // Display a loading state while checking authentication
  }

  if (!session) {
    // If no session, prompt for sign-in
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-lg text-center">
          <p className="text-gray-600 mb-4">
            You are not authorized to view this page. Please{' '}
            <button
              onClick={() => signIn()}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              sign in
            </button>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Internal Leads List</h1>
        <InternalLeadList />
      </div>
    </main>
  );
};

export default InternalLeadListPage;
