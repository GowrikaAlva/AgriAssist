// src/app/api/chatbot/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Handles POST requests to /api/chatbot
export async function POST(request: Request) {
  try {
    const { message, language } = await request.json();

    if (!message) {
      return new NextResponse(JSON.stringify({ message: 'Message is required' }), { status: 400 });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Define the system prompt with language instruction
    const systemPrompt = `You are AgriAssist, an expert agricultural advisor. Answer all questions concisely in a helpful, friendly tone, focusing on farming advice. Respond in ${language} language.`;

    // Generate content
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `User: ${message}` }
    ]);

    const response = await result.response;
    const aiResponseText = response.text() || "Sorry, I couldn't process that request.";

    // Return the AI's response to the client
    return NextResponse.json({
      sender: 'ai',
      text: aiResponseText,
      timestamp: Date.now(),
    });

  } catch (error: any) {
    console.error('Chatbot API Route Error:', error);

    // Check for quota exceeded error
    if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('Too Many Requests')) {
      return new NextResponse(JSON.stringify({ message: 'AI service quota exceeded. Please try again later or consider upgrading your plan.' }), {
        status: 429,
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Internal Server Error during AI communication' }), {
      status: 500,
    });
  }
}
