// This page should also be a Client Component for interactivity
'use client'; 

import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function ChatbotPage() {
  return (
    <div className="flex">
      <Sidebar activeRoute="chatbot" />
      <div className="flex-1">
        <Navbar title="AgriAssist Chatbot" />
        <main className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ask the AgriAssist AI</h2>
          
          <div className="bg-white p-6 rounded-lg shadow min-h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4">
              {/* Chat messages and interface components will render here */}
              <p className="text-gray-500 text-center pt-20">Start a conversation with your AI farming assistant...</p>
            </div>
            {/* Chat Input Component goes here */}
          </div>
        </main>
      </div>
    </div>
  );
}