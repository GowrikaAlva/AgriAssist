// src/app/api/market/route.ts

import { NextResponse } from 'next/server';

// Handles GET requests to /api/market
export async function GET(request: Request) {
  try {
    // 1. Get the API Key securely from the server environment
    const AGMARKNET_API_KEY = process.env.AGMARKNET_API_KEY; 
    
    // 2. Define the external API call URL
    const externalApiUrl = `https://api.agmarknet.gov.in/v1/latestprices?key=${AGMARKNET_API_KEY}`;
    
    // 3. Make the external API request
    const response = await fetch(externalApiUrl, {
      next: { revalidate: 60 } // Optional: Cache for 60 seconds
    });

    if (!response.ok) {
      // Forward the external API's error status
      return new NextResponse(JSON.stringify({ message: 'Failed to fetch external market data' }), {
        status: response.status,
      });
    }

    const data = await response.json();
    
    // 4. Return the processed data to the client
    return NextResponse.json({ prices: data.prices });

  } catch (error) {
    console.error('Market API Route Error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}