// Chat storage utilities for handling chat sessions and persistence

import { ChatMessage, ChatSession, User } from './types';

// Mock user authentication state (in a real app, this would come from auth context)
let currentUser: User | null = null;

// Set current user (call this when user logs in)
export const setCurrentUser = (user: User | null) => {
    currentUser = user;
};

// Get current user
export const getCurrentUser = (): User | null => {
    return currentUser;
};

// Generate a title from the first user message using Gemini AI
const generateChatTitle = async (messages: ChatMessage[]): Promise<string> => {
    const firstUserMessage = messages.find(msg => msg.sender === 'user');
    if (!firstUserMessage) return 'New Chat';

    try {
        // Use Gemini AI to generate a concise title based on the chat purpose
        const response = await fetch('/api/chatbot/title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: firstUserMessage.text }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.title || firstUserMessage.text.substring(0, 30) + '...';
        }
    } catch (error) {
        console.error('Error generating chat title:', error);
    }

    // Fallback to first 30 characters
    return firstUserMessage.text.length > 30
        ? firstUserMessage.text.substring(0, 30) + '...'
        : firstUserMessage.text;
};

// Storage keys
const getStorageKey = (userId?: string) => {
    return userId ? `agriassist-chat-sessions-${userId}` : 'agriassist-chat-sessions-anonymous';
};

// Save current chat session
export const saveCurrentChat = async (messages: ChatMessage[]) => {
    if (messages.length === 0) return;

    const userId = currentUser?.id;
    const storageKey = getStorageKey(userId);

    // Get existing sessions
    const existingSessions = getChatSessions();

    // Create or update current session
    const currentSessionId = localStorage.getItem('current-chat-session-id') || Date.now().toString();
    const now = Date.now();

    // Generate title asynchronously
    const title = await generateChatTitle(messages);

    const currentSession: ChatSession = {
        id: currentSessionId,
        title,
        messages,
        createdAt: existingSessions.find(s => s.id === currentSessionId)?.createdAt || now,
        updatedAt: now,
    };

    // Update or add session
    const updatedSessions = existingSessions.filter(s => s.id !== currentSessionId);
    updatedSessions.unshift(currentSession); // Add to beginning

    // Keep only last 50 sessions for logged-in users, 10 for anonymous
    const maxSessions = userId ? 50 : 10;
    const trimmedSessions = updatedSessions.slice(0, maxSessions);

    localStorage.setItem(storageKey, JSON.stringify(trimmedSessions));
    localStorage.setItem('current-chat-session-id', currentSessionId);
    // Dispatch custom event to notify sidebar
    dispatchUpdateEvent();
};

// Get all chat sessions
export const getChatSessions = (): ChatSession[] => {
    const userId = currentUser?.id;
    const storageKey = getStorageKey(userId);

    try {
        const sessions = localStorage.getItem(storageKey);
        return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
        console.error('Error loading chat sessions:', error);
        return [];
    }
};

// Load a specific chat session
export const loadChatSession = (sessionId: string): ChatMessage[] => {
    const sessions = getChatSessions();
    const session = sessions.find(s => s.id === sessionId);
    return session ? session.messages : [];
};

// Delete a chat session
export const deleteChatSession = (sessionId: string) => {
    const userId = currentUser?.id;
    const storageKey = getStorageKey(userId);

    const sessions = getChatSessions();
    const filteredSessions = sessions.filter(s => s.id !== sessionId);

    localStorage.setItem(storageKey, JSON.stringify(filteredSessions));

    // If deleting current session, clear current session id
    if (localStorage.getItem('current-chat-session-id') === sessionId) {
        localStorage.removeItem('current-chat-session-id');
    }
    // Dispatch custom event to notify sidebar
    dispatchUpdateEvent();
};

// Start a new chat session
export const startNewChat = (): string => {
    const newSessionId = Date.now().toString();
    localStorage.setItem('current-chat-session-id', newSessionId);
    // Dispatch custom event to notify sidebar
    dispatchUpdateEvent();
    return newSessionId;
};

// Clear all sessions (useful for logout)
export const clearAllSessions = () => {
    const userId = currentUser?.id;
    const storageKey = getStorageKey(userId);
    localStorage.removeItem(storageKey);
    localStorage.removeItem('current-chat-session-id');
    // Dispatch custom event to notify sidebar
    window.dispatchEvent(new CustomEvent('chatSessionsUpdated'));
};

// Helper function to dispatch update event
const dispatchUpdateEvent = () => {
    window.dispatchEvent(new CustomEvent('chatSessionsUpdated'));
};
