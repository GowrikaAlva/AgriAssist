// chatbot.ts

import { delay } from '@/lib/utils';
// import { ChatMessage, ChatResponse } from '@/lib/types'; // Placeholder types

// Mock type definitions for demonstration
type ChatMessage = { sender: 'user' | 'ai'; text: string; timestamp: number };

/**
 * Sends a user message to the AI Chatbot service and returns the response.
 * Uses OpenAI or Dialogflow API in a real application.
 */
export async function sendChatQuery(message: string): Promise<ChatMessage> {
  console.log('Sending message to AI:', message);
  
  // In a real app, this would hit your Next.js API route first,
  // which then talks to the external AI service to hide the API key.
  // const response = await fetch('/api/chatbot', { method: 'POST', body: JSON.stringify({ message }) });
  // const chatData = await response.json();
  // return chatData;

  await delay(1200); // Simulate API call and AI processing time

  // Simple mock response logic:
  let aiText = `I recommend using 150 kg/acre of urea for your paddy crop, applied in two splits.`;
  if (message.toLowerCase().includes('tomato')) {
    aiText = `The current market price for tomatoes in Dharwad is Rs. 2,500 per quintal.`;
  } else if (message.toLowerCase().includes('next crop')) {
    aiText = `Based on current soil and weather, I recommend groundnut for your next rotation.`;
  }

  return {
    sender: 'ai',
    text: aiText,
    timestamp: Date.now(),
  };
}