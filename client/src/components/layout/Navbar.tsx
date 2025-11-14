// Navbar.tsx

import { UserCircle, Bell, Settings } from "lucide-react";

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-white shadow-xl p-4 sticky top-0 z-20 border-b border-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Title/Logo Area with Glossy Brown-Green-Yellow Gradient */}
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {/* Gradient: Brown (Earth) -> Yellow (Sunlight/Ripening) -> Green (Health) */}
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r 
              from-amber-800 via-yellow-400 to-green-600 
              hover:from-amber-900 hover:to-lime-700 transition duration-300"
            >
              {title}
            </span>
          </h2>
        </div>

        {/* Action and User Icons */}
        <div className="flex items-center space-x-4">
          
          {/* Action Icons (using deep brown and vibrant yellow/green for accents) */}
          <div className="hidden sm:flex items-center space-x-4">
            <button 
              className="text-amber-800 hover:text-yellow-500 transition duration-150 p-2 rounded-full hover:bg-yellow-50"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            <button 
              className="text-amber-800 hover:text-green-600 transition duration-150 p-2 rounded-full hover:bg-green-50"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* User Icon */}
          <div className="group flex items-center space-x-2 cursor-pointer transition p-1.5 rounded-full border border-amber-800 hover:bg-yellow-50 duration-200">
            <UserCircle size={28} className="text-yellow-600 group-hover:text-amber-800 transition" />
            <span className="hidden md:inline text-sm font-semibold text-amber-900 group-hover:text-yellow-700 transition pr-2">
                User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}