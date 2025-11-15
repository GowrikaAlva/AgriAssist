// client/src/components/charts/PriceChart.tsx

'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// 1. High-quality mock data to build the UI
const mockData = [
  { date: 'Jan 24', Wheat: 2080, Rice: 2150 },
  { date: 'Feb 24', Wheat: 2120, Rice: 2180 },
  { date: 'Mar 24', Wheat: 2100, Rice: 2200 },
  { date: 'Apr 24', Wheat: 2150, Rice: 2210 },
  { date: 'May 24', Wheat: 2200, Rice: 2250 },
  { date: 'Jun 24', Wheat: 2180, Rice: 2280 },
  { date: 'Jul 24', Wheat: 2230, Rice: 2300 },
];

export function PriceChart() {
  // 2. We remove all the useEffect/useState for fetching
  //    and just render the chart directly.
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockData}
          margin={{
            top: 5,
            right: 20, // Give space for labels
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" fontSize={12} stroke="#6b7280" />
          <YAxis
            tickFormatter={(value) => `$${value}`} // Add dollar sign to Y-axis
            fontSize={12}
            stroke="#6b7280"
          />
          <Tooltip
            formatter={(value: number) => [
              `$${value} /Ton`,
              null, // We don't need a label for the value
            ]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 'none',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Wheat"
            stroke="#16a34a" // green-600
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Rice"
            stroke="#0284c7" // sky-600
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}