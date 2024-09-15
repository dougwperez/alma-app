import Link from 'next/link';

const HomePage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Lead Management App</h1>
        <p className="text-gray-600 mb-8">
          Choose an option below to get started.
        </p>
        <div className="flex flex-col space-y-4">
          {/* Link to Lead Form Page */}
          <Link href="/lead-form">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Go to Lead Form
            </button>
          </Link>

          {/* Link to Internal Lead List Page */}
          <Link href="/internal-lead-list">
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
              Go to Internal Lead List
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
