// Use this directive to make it a Client Component
'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { PriceChart } from '@/components/charts/PriceChart';
import { YieldPredictorChart } from '@/components/charts/YieldPredictorChart';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function DashboardPage() {
  // Placeholder data for demonstration
  const stats = [
    { title: 'Current Price', value: '$2,100', unit: '/Ton' },
    { title: 'Yield Forecast', value: '5.2 Tons', unit: '/Acre' },
    { title: 'Weather Alerts', value: '2 Active', unit: 'Critical' },
  ];

  return (
    <div className="flex">
      <Sidebar activeRoute="dashboard" />
      <div className="flex-1 ml-80">
        <Navbar title="Dashboard Overview" showLanguageSelector={false} />
        <main className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Analytics Summary</h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <DashboardCard key={stat.title} title={stat.title} value={stat.value} unit={stat.unit} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Price Chart Container */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">Historical Price Trend</h3>
              <PriceChart /> {/* Assumes PriceChart handles its own data loading */}
            </div>

            {/* Yield Predictor Chart Container */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-4">Predicted Yield</h3>
              <YieldPredictorChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}