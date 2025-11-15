// src/components/layout/Sidebar.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { ChatSession } from '@/lib/types';
import { getChatSessions, deleteChatSession, setCurrentUser, getCurrentUser } from '@/lib/chatStorage';

interface SidebarProps {
  activeRoute: 'dashboard' | 'market' | 'chatbot' | 'health';
  onChatSelect?: (sessionId: string) => void;
  currentChatId?: string;
}

export default function Sidebar({ activeRoute, onChatSelect, currentChatId }: SidebarProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [isChatHistoryExpanded, setIsChatHistoryExpanded] = useState(true);

  useEffect(() => {
    // Load chat sessions on mount
    setChatSessions(getChatSessions());

    // Listen for chat sessions updates
    const handleChatSessionsUpdate = () => {
      setChatSessions(getChatSessions());
    };

    window.addEventListener('chatSessionsUpdated', handleChatSessionsUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('chatSessionsUpdated', handleChatSessionsUpdate);
    };
  }, []);

  const linkClass = (route: string) =>
    `p-3 my-1 rounded-lg text-lg transition duration-150 ${activeRoute === route
      ? 'bg-green-700 text-white font-semibold'
      : 'text-gray-300 hover:bg-green-800'
    }`;

  const handleDeleteChat = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChatSession(sessionId);
    setChatSessions(getChatSessions());
  };

  const handleChatSelect = (sessionId: string) => {
    if (onChatSelect) {
      onChatSelect(sessionId);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-gray-900 flex flex-col p-6 overflow-y-auto z-50 shadow-lg">

      {/* Logo + Name */}
      <div className="flex flex-col items-center mb-10">
        <Image
          src="/images/aglogo.png"
          alt="AgriAssist Logo"
          width={70}
          height={70}
          className="rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold text-white mt-4">AgriAssist</h1>
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

      {/* Chat History Section - Only show on chatbot page */}
      {activeRoute === 'chatbot' && (
        <div className="mt-8 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold flex items-center">
              <MessageSquare className="mr-2" size={20} />
              Chat History
            </h3>
            <button
              onClick={() => setIsChatHistoryExpanded(!isChatHistoryExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isChatHistoryExpanded ? '−' : '+'}
            </button>
          </div>

          {isChatHistoryExpanded && (
            <div className="space-y-2">
              {chatSessions.length === 0 ? (
                <p className="text-gray-400 text-sm">No chat history yet</p>
              ) : (
                chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${currentChatId === session.id
                      ? 'bg-green-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    onClick={() => handleChatSelect(session.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteChat(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity ml-2"
                      title="Delete chat"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
