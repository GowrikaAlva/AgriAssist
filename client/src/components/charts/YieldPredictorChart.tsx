'use client';

// 1. Define the shape of the forecast data we expect
// This type MUST match the type you defined in page.tsx
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
};

// 2. Define the props this component will accept
type ChartProps = {
  forecastData: ForecastItem[] | null;
};

// 3. Accept the 'forecastData' prop here (this fixes the error)
export function YieldPredictorChart({ forecastData }: ChartProps) {
  
  // 4. Handle the loading or error state
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed rounded-lg">
        <p className="text-gray-400">Waiting for forecast data...</p>
      </div>
    );
  }

  // 5. This is a placeholder for your ML model.
  // We'll just find the average temperature from the 5-day forecast.
  const averageTemp =
    forecastData.reduce((acc, item) => acc + item.main.temp, 0) /
    forecastData.length;

  let prediction = 'Wheat, Potatoes';
  let advice = 'Cooler weather. Suitable for hardy crops.';

  if (averageTemp > 25) {
    prediction = 'Maize, Cotton, Rice';
    advice = 'High heat. Ensure consistent irrigation.';
  } else if (averageTemp > 18) {
    prediction = 'Soybeans, Tomatoes';
    advice = 'Good growing conditions. Monitor for pests.';
  }

  // 6. Render the placeholder prediction
  return (
    <div className="h-64 w-full p-4 flex flex-col justify-between bg-white rounded-lg">
      <div>
        <h4 className="text-lg font-semibold text-gray-700">5-Day Outlook</h4>
        <p className="text-2xl font-bold text-green-600">{prediction}</p>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-md font-medium text-gray-600">Advice</h4>
        <p className="text-gray-500">{advice}</p>
        <p className="text-xs text-gray-600 mt-2">
          (Based on avg. 5-day temp: {averageTemp.toFixed(1)}°C)
        </p>
      </div>
    </div>
  );
}