// src/app/api/weather/route.ts

import { NextResponse } from 'next/server';

// Handles GET requests to /api/weather?lat=X&lon=Y
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return new NextResponse(JSON.stringify({ message: 'Missing latitude or longitude' }), { status: 400 });
  }

  try {
    const WEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
    const externalApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    const response = await fetch(externalApiUrl);

    if (!response.ok) {
      return new NextResponse(JSON.stringify({ message: 'Failed to fetch weather data' }), {
        status: response.status,
      });
    }

    const data = await response.json();
    
    // Process and simplify the external data before returning
    return NextResponse.json({ forecast: data.list.slice(0, 5) }); 

  } catch (error) {
    console.error('Weather API Route Error:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}