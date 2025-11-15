// This page should also be a Client Component for interactivity
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquarePlus } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { saveCurrentChat, loadChatSession, startNewChat as startNewChatStorage } from '@/lib/chatStorage';

// Function to format AI responses with basic markdown support
const formatMessage = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-xs">$1</code>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, '<br />')
    .replace(/^/, '<p class="mb-2">')
    .replace(/$/, '</p>');
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with default message
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'ai',
        text: 'Hello! I\'m AgriAssist, your AI farming assistant. How can I help you today?',
        timestamp: Date.now(),
      },
    ];
    setMessages(initialMessages);
    setCurrentChatId(startNewChatStorage());
  }, []);

  // Save current chat whenever messages change
  useEffect(() => {
    if (messages.length > 1) { // Don't save initial message
      saveCurrentChat(messages);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        timestamp: data.timestamp,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Sorry, I encountered an error. Please try again later.',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    // Clear messages and start fresh
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        sender: 'ai',
        text: 'Hello! I\'m AgriAssist, your AI farming assistant. How can I help you today?',
        timestamp: Date.now(),
      },
    ];
    setMessages(initialMessages);
    setCurrentChatId(startNewChatStorage());
    // Focus input
    inputRef.current?.focus();
  };

  const handleChatSelect = (sessionId: string) => {
    const sessionMessages = loadChatSession(sessionId);
    if (sessionMessages.length > 0) {
      setMessages(sessionMessages);
      setCurrentChatId(sessionId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeRoute="chatbot"
        onChatSelect={handleChatSelect}
        currentChatId={currentChatId}
      />
      <div className="ml-80 flex-1 flex flex-col">
        <Navbar title="AgriAssist Chatbot" />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 min-h-[500px] sm:min-h-[600px] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-800 via-yellow-400 to-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold text-lg">AgriAssist AI</h3>
              <button
                onClick={handleNewChat}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                aria-label="Start new chat"
              >
                <MessageSquarePlus size={16} />
                <span className="text-sm font-medium">New Chat</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === 'ai' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] p-4 rounded-lg text-sm shadow-md transform transition-all duration-300 hover:scale-105 ${message.sender === 'user'
                        ? 'bg-blue-100 text-black animate-in slide-in-from-right-4'
                        : 'bg-gray-50 border border-gray-200 animate-in slide-in-from-left-4'
                        }`}
                    >
                      <div
                        className="prose prose-sm max-w-none text-black"
                        dangerouslySetInnerHTML={{ __html: message.sender === 'ai' ? formatMessage(message.text) : message.text }}
                      />
                      <span className={`text-xs mt-3 block ${message.sender === 'user' ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-200 shadow-sm p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 text-white p-3 rounded-lg transition-colors duration-200 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
