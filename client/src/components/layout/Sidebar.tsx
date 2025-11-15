// src/components/layout/Sidebar.tsx

import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  activeRoute: 'dashboard' | 'market' | 'chatbot' | 'health';
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const linkClass = (route: string) =>
    `p-3 my-1 rounded-lg text-lg transition duration-150 ${
      activeRoute === route
        ? 'bg-green-700 text-white font-semibold'
        : 'text-gray-300 hover:bg-green-800'
    }`;

  return (
    <div className="w-80 min-h-screen bg-gray-900 flex flex-col p-6 sticky top-0">

      {/* Logo + Name */}
      <div className="flex flex-col items-center mb-10">
        <Image
          src="/images/aglogo.png"
          alt="AgriAssist Logo"
          width={70}
          height={70}
          className="rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold text-white mt-4 text-center">AgriAssist KrishiMitra</h1>
      </div>

      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard" className={linkClass('dashboard')}>
          Dashboard
        </Link>

        <Link href="/market" className={linkClass('market')}>
          Market Insights
        </Link>

        <Link href="/health" className={linkClass('health')}>
          Crop Health
        </Link>

        <Link href="/chatbot" className={linkClass('chatbot')}>
          AI Chatbot
        </Link>
      </nav>
    </div>
  );
}
