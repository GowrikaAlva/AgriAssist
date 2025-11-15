// src/app/(health)/health/page.tsx

'use client';

import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { CropHealthCard } from '@/components/dashboard/CropHealthCard';

export default function CropHealthPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeRoute="health" />

      {/* Background Image Container */}
      <div
        className="flex-1 min-h-screen relative ml-80"
        style={{
          backgroundImage: "url('/images/bg-farm.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: '70% center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Page Content */}
        <div className="relative z-10">
          <Navbar title="Crop Health Analyzer" showLanguageSelector={false} />

          <main className="p-6 md:p-10">
            {/* Main Heading */}
            <h2 className="text-4xl font-extrabold mb-10 text-[#5B3B1F] border-b-4 border-[#CBB18A] pb-3 shadow-lg inline-block px-2 bg-white/30 backdrop-blur-sm rounded-md">
              🌾 AI-Powered Disease Detection
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* CropHealthCard (Glassmorphic Container) */}
              <div className="lg:col-span-2">
                <div
                  className="p-6 md:p-8 rounded-3xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow:
                      '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <CropHealthCard />
                </div>
              </div>

              {/* Best Practice Guide (Glassmorphic Container) */}
              <div className="lg:col-span-1">
                <div
                  className="p-6 md:p-8 min-h-full flex flex-col justify-start rounded-3xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow:
                      '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-[#2F1F0F] flex items-center drop-shadow-sm">
                    🌿 Best Practice Guidelines
                  </h3>

                  <ul className="list-none space-y-6 text-[#2F1F0F] font-semibold leading-relaxed drop-shadow-sm text-lg">
                    <li className="flex items-start">
                      <span className="text-[#4C7C4C] font-extrabold text-3xl mr-3 leading-none">•</span>
                      <span>
                        <b>Clarity First:</b> Take a clear, focused photo of a single affected leaf for accurate
                        analysis.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="text-[#4C7C4C] font-extrabold text-3xl mr-3 leading-none">•</span>
                      <span>
                        <b>Lighting:</b> Use natural light and avoid shadows or flash glare.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="text-[#4C7C4C] font-extrabold text-3xl mr-3 leading-none">•</span>
                      <span>
                        <b>File Size:</b> Keep the photo under 2MB for faster uploads and smoother processing.
                      </span>
                    </li>

                    <li className="flex items-start">
                      <span className="text-[#4C7C4C] font-extrabold text-3xl mr-3 leading-none">•</span>
                      <span>
                        <b>Coverage:</b> Works best for common pests and diseases in your crop region.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
