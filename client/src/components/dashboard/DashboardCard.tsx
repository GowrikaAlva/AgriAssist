// DashboardCard.tsx

interface DashboardCardProps {
  title: string;
  value: string;
  unit: string;
}

export function DashboardCard({ title, value, unit }: DashboardCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
      <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-base font-semibold text-green-600">{unit}</span>
      </div>
    </div>
  );
}