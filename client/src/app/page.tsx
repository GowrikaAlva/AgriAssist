import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to AgriAssist</h1>
      <p className="text-lg mb-8 text-black">
        Your platform for agricultural market insights and predictions.
      </p>
      <Link 
        href="/dashboard"
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}