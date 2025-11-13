import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function MarketPage() {
  return (
    <div className="flex">
      {/* Assuming Sidebar and Navbar are imported and structured correctly */}
      <Sidebar activeRoute="market" />
      <div className="flex-1">
        <Navbar title="Market Insights" />
        <main className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Commodity Market Analysis</h2>
          
          <div className="bg-white p-6 rounded-lg shadow min-h-[500px] flex items-center justify-center">
            <p className="text-gray-500">Market data tables and analysis components will go here.</p>
          </div>
        </main>
      </div>
    </div>
  );
}