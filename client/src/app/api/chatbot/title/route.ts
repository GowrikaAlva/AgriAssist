import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Handles POST requests to /api/chatbot/title
export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return new NextResponse(JSON.stringify({ title: 'New Chat' }), { status: 400 });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Define the system prompt for generating chat titles
        const systemPrompt = "Generate a very simple, concise title (max 4 words) for a chat conversation based on the user's first message. Keep it simple and direct.";

        // Generate content
        const result = await model.generateContent([
            { text: systemPrompt },
            { text: `User's first message: "${message}"` }
        ]);

        const response = await result.response;
        const title = response.text()?.trim() || 'New Chat';

        // Ensure title is not too long
        const finalTitle = title.length > 50 ? title.substring(0, 47) + '...' : title;

        // Return the generated title
        return NextResponse.json({
            title: finalTitle,
        });

    } catch (error: any) {
        console.error('Chat Title Generation Error:', error);

        // Check for quota exceeded error
        if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('Too Many Requests')) {
            return new NextResponse(JSON.stringify({ title: 'New Chat' }), {
                status: 429,
            });
        }

        return new NextResponse(JSON.stringify({ title: 'New Chat' }), {
            status: 500,
        });
    }
}
