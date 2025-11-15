// Use this directive to make it a Client Component
'use client';

// Import useState and useEffect
import { useState, useEffect, ChangeEventHandler } from 'react';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { PriceChart } from '@/components/charts/PriceChart';
import { YieldPredictorChart } from '@/components/charts/YieldPredictorChart';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

// Define a type for our forecast data
type ForecastItem = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  rain?: {
    '3h': number;
  };
};

// --- NEW ---
// Define our soil types
type SoilType = 'sandy' | 'clay' | 'loamy' | 'unknown';

// --- NEW ---
// Helper function to get soil advice
const getSoilAdvice = (soil: SoilType, forecast: ForecastItem | null) => {
  const rain = forecast?.rain?.['3h'] || 0;
  const temp = forecast?.main.temp || 20; // Default to 20°C

  switch (soil) {
    case 'sandy':
      if (rain > 1) {
        return 'Good. Sandy soil drains well, preventing root rot. Be sure to check nutrients, as rain can wash them away.';
      }
      if (temp > 25) {
        return 'High Risk. Sandy soil dries out very fast. Requires frequent irrigation in hot weather.';
      }
      return 'Good drainage, but low nutrient retention. Prone to drying out. Best for drought-resistant crops like carrots or potatoes.';
    case 'clay':
      if (rain > 1) {
        return 'High Risk. Clay soil retains too much water. Risk of waterlogging and root rot. Ensure proper drainage.';
      }
      if (temp > 25) {
        return 'Good. Clay soil holds moisture well in hot weather, but can become compacted and hard.';
      }
      return 'High nutrient retention, but poor drainage. Can become waterlogged or crack when dry. Good for broccoli or cabbage.';
    case 'loamy':
      if (rain > 1 && rain < 5) {
        return 'Excellent. Loamy soil holds moisture well while still draining. Ideal conditions.';
      }
      return 'Ideal soil. A balanced mix of sand, silt, and clay. Good drainage and high nutrient retention. Suitable for most crops.';
    default:
      return 'Please select a soil type to see suitability suggestions and advice.';
  }
};

export default function DashboardPage() {
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [loading, setLoading] = useState('location');
  
  // --- NEW ---
  // Add state for the selected soil type
  const [soilType, setSoilType] = useState<SoilType>('unknown');

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      setLoading('done');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLoading('weather');
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `/api/weather?lat=${latitude}&lon=${longitude}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch weather forecast');
          }
          const data = await response.json();
          setForecast(data.forecast);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading('done');
        }
      },
      (error) => {
        console.error('Error getting location: ', error);
        setLoading('done');
      }
    );
  }, []);

  const currentWeather = forecast ? forecast[0] : null;
  const isLoading = loading !== 'done';
  const rainAmount = currentWeather?.rain?.['3h'] || 0;

  const stats = [
    { title: 'Current Price(Wheat)', value: '$2,230', unit: '/Ton' },
    {
      title: 'Current Temp',
      value: isLoading ? '...' : `${currentWeather?.main.temp.toFixed(1)}°C`,
      unit: isLoading ? 'Loading...' : currentWeather?.weather[0].description || 'N/A',
    },
    {
      title: 'Humidity',
      value: isLoading ? '...' : `${currentWeather?.main.humidity}%`,
      unit: 'Current',
    },
    {
      title: 'Rainfall (3h)',
      value: isLoading ? '...' : `${rainAmount.toFixed(1)} mm`,
      unit: rainAmount > 0 ? 'Expected' : 'None expected',
    },
  ];

  // --- NEW ---
  // Event handler for the select dropdown
  const handleSoilChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSoilType(e.target.value as SoilType);
  };
  
  // --- NEW ---
  // Get the dynamic advice
  const soilAdvice = getSoilAdvice(soilType, currentWeather);

  return (
    <div className="flex">
      <Sidebar activeRoute="dashboard" />
      <div className="flex-1">
        <Navbar title="Dashboard Overview" />
        <main className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Analytics Summary
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <DashboardCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                unit={stat.unit}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4 text-gray-800">
                Historical Price Trend
              </h3>
              <PriceChart />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4 text-gray-800">Predicted Yield</h3>
              <YieldPredictorChart forecastData={forecast} />
            </div>
          </div>

          {/* --- NEW SECTION --- */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-4 text-gray-800">
              Soil Suitability & Suggestions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dropdown Selector */}
              <div className="md:col-span-1">
                <label
                  htmlFor="soilType"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Select Your Soil Type:
                </label>
                <select
                  id="soilType"
                  name="soilType"
                  value={soilType}
                  onChange={handleSoilChange}
                  className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 text-gray-900"
                >
                  <option value="unknown">-- Select Soil --</option>
                  <option value="sandy">Sandy Soil</option>
                  <option value="clay">Clay Soil</option>
                  <option value="loamy">Loamy Soil</option>
                </select>
              </div>

              {/* Advice Display */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Suggestions (Factoring in Forecast):
                </h4>
                <p className="text-gray-800">
                  {soilAdvice}
                </p>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}