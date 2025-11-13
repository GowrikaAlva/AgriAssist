// Sidebar.tsx
import Link from 'next/link';

interface SidebarProps {
  activeRoute: 'dashboard' | 'market' | 'chatbot';
}

export default function Sidebar({ activeRoute }: SidebarProps) {
  const linkClass = (route: string) => 
    `p-3 my-1 rounded-lg text-sm transition duration-150 ${
      activeRoute === route 
        ? 'bg-green-700 text-white font-semibold' 
        : 'text-gray-300 hover:bg-green-800'
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 flex flex-col p-4 sticky top-0">
      <h1 className="text-2xl font-bold text-white mb-8">AgriAssist</h1>
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className={linkClass('dashboard')}>
          Dashboard
        </Link>
        <Link href="/market" className={linkClass('market')}>
          Market Insights
        </Link>
        <Link href="/chatbot" className={linkClass('chatbot')}>
          AI Chatbot
        </Link>
      </nav>
    </div>
  );
}