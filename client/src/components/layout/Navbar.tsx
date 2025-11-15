// Navbar.tsx

import { UserCircle, Bell, Settings, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/languageContext";

interface NavbarProps {
  title: string;
  showLanguageSelector?: boolean;
}

export default function Navbar({ title, showLanguageSelector = true }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages: Array<'English' | 'Hindi' | 'Kannada' | 'Tamil' | 'Telugu'> = ['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu'];

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

          {/* Language Selector */}
          {showLanguageSelector && (
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 text-amber-800 hover:text-green-600 transition duration-150 p-2 rounded-lg hover:bg-green-50"
                aria-label="Language selector"
              >
                <Globe size={20} />
                <span className="text-sm font-medium">{language}</span>
                <span className="text-xs">▼</span>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setLanguage(language);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition duration-150 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

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
