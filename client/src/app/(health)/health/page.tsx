// src/app/(health)/health/page.tsx

'use client'; 

import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { CropHealthCard } from '@/components/dashboard/CropHealthCard'; // Reusing the card component

export default function CropHealthPage() {
  return (
    <div className="flex">
      {/* Note: You will need to update Sidebar's activeRoute prop type later */}
      <Sidebar activeRoute="health" /> 
      <div className="flex-1">
        <Navbar title="Crop Health Analyzer" />
        <main className="p-6 md:p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">AI-Powered Disease Detection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CropHealthCard />
            
            {/* Additional info or instructions can go here */}
            <div className="bg-white p-6 rounded-lg shadow min-h-[400px]">
                <h3 className="text-xl font-medium mb-4">How to Get Best Results</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Take a clear, focused photo of a single affected leaf.</li>
                    <li>Ensure the lighting is natural and even.</li>
                    <li>Upload photos under 2MB for faster analysis.</li>
                    <li>Analysis works best for common pests/diseases in your region.</li>
                </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}