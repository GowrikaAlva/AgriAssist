"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data - Replace with API calls later
const commodities = [
  {
    id: 1,
    name: "Rice",
    price: 2850,
    unit: "per quintal",
    change: 5.2,
    trend: "up",
    category: "Grains",
  },
  {
    id: 2,
    name: "Wheat",
    price: 2250,
    unit: "per quintal",
    change: -2.1,
    trend: "down",
    category: "Grains",
  },
  {
    id: 3,
    name: "Cotton",
    price: 5800,
    unit: "per quintal",
    change: 8.5,
    trend: "up",
    category: "Fiber",
  },
  {
    id: 4,
    name: "Sugarcane",
    price: 310,
    unit: "per quintal",
    change: 1.8,
    trend: "up",
    category: "Cash Crops",
  },
  {
    id: 5,
    name: "Soybean",
    price: 4200,
    unit: "per quintal",
    change: -3.2,
    trend: "down",
    category: "Oilseeds",
  },
  {
    id: 6,
    name: "Maize",
    price: 1850,
    unit: "per quintal",
    change: 4.1,
    trend: "up",
    category: "Grains",
  },
  {
    id: 7,
    name: "Potato",
    price: 1200,
    unit: "per quintal",
    change: -5.5,
    trend: "down",
    category: "Vegetables",
  },
  {
    id: 8,
    name: "Onion",
    price: 2500,
    unit: "per quintal",
    change: 12.3,
    trend: "up",
    category: "Vegetables",
  },
];

const priceHistory = [
  { date: "Jan", rice: 2700, wheat: 2300, cotton: 5400 },
  { date: "Feb", rice: 2750, wheat: 2280, cotton: 5500 },
  { date: "Mar", rice: 2800, wheat: 2260, cotton: 5650 },
  { date: "Apr", rice: 2820, wheat: 2250, cotton: 5700 },
  { date: "May", rice: 2850, wheat: 2250, cotton: 5800 },
];

const categories = [
  "All",
  "Grains",
  "Vegetables",
  "Cash Crops",
  "Oilseeds",
  "Fiber",
];

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCommodity, setSelectedCommodity] = useState("Rice");

  const filteredCommodities =
    selectedCategory === "All"
      ? commodities
      : commodities.filter((c) => c.category === selectedCategory);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
      <Sidebar activeRoute="market" />
      <div className="flex-1">
        <Navbar title="Market Insights" />
        <main className="p-4 md:p-8">
          {/* Header Section */}
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Commodity Market Analysis
            </h2>
            <p className="text-gray-600">Real-time prices and market trends</p>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Market Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {filteredCommodities.slice(0, 4).map((commodity) => (
              <div
                key={commodity.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border-l-4 cursor-pointer group"
                style={{
                  borderLeftColor:
                    commodity.trend === "up" ? "#10b981" : "#ef4444",
                }}
                onClick={() => setSelectedCommodity(commodity.name)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {commodity.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {commodity.category}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      commodity.trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {commodity.trend === "up" ? "↑" : "↓"}{" "}
                    {Math.abs(commodity.change)}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{commodity.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    /{commodity.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Price Trend Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Price Trends (Last 5 Months)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rice"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="wheat"
                    stroke="#eab308"
                    strokeWidth={3}
                    dot={{ fill: "#eab308", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cotton"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Rice</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Wheat</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cotton</span>
                </div>
              </div>
            </div>

            {/* Price Comparison Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Current Market Prices
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={filteredCommodities}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="price"
                    fill="url(#colorGradient)"
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Price Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-500 to-yellow-500">
              <h3 className="text-xl font-semibold text-white">
                Detailed Price List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCommodities.map((commodity) => (
                    <tr
                      key={commodity.id}
                      className="hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {commodity.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {commodity.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{commodity.price}{" "}
                          <span className="text-gray-500">
                            / {commodity.unit}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-semibold ${
                            commodity.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {commodity.trend === "up" ? "+" : "-"}
                          {Math.abs(commodity.change)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            commodity.trend === "up"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {commodity.trend === "up" ? "↑ Rising" : "↓ Falling"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-lg mb-1">Best Sellers</h4>
              <p className="text-green-100 text-sm">
                Rice & Cotton showing strong demand
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">💡</div>
              <h4 className="font-semibold text-lg mb-1">Market Tip</h4>
              <p className="text-yellow-100 text-sm">
                Consider selling onions - prices up 12%
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">🌾</div>
              <h4 className="font-semibold text-lg mb-1">Season Update</h4>
              <p className="text-blue-100 text-sm">
                Rabi season prices stabilizing
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
