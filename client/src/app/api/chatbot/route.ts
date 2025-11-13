// src/app/api/chatbot/route.ts

import { NextResponse } from 'next/server';

// Handles POST requests to /api/chatbot
export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new NextResponse(JSON.stringify({ message: 'Message is required' }), { status: 400 });
    }
    
    // 1. Set up the connection to the external AI service
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const externalApiUrl = 'https://api.openai.com/v1/chat/completions';
    
    // 2. Define the request payload for the AI model
    const systemPrompt = "You are AgriAssist, an expert agricultural advisor. Answer all questions concisely in a helpful, friendly tone, focusing on farming advice.";
    
    const response = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      // Error from the external AI service
      const errorDetail = await response.text();
      return new NextResponse(JSON.stringify({ message: 'AI Service Error', detail: errorDetail }), {
        status: response.status,
      });
    }

    const data = await response.json();
    const aiResponseText = data.choices[0]?.message?.content || "Sorry, I couldn't process that request.";

    // 3. Return the AI's response to the client
    return NextResponse.json({
      sender: 'ai',
      text: aiResponseText,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('Chatbot API Route Error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error during AI communication' }), {
      status: 500,
    });
  }
}