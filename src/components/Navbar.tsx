import React, { useState } from 'react';
import { 
  Leaf, 
  Wind, 
  Award, 
  Globe,
  User
} from 'lucide-react';
import { PageType, UserProfile } from '../types';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  user: UserProfile;
  isHindi: boolean;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  user,
  isHindi,
  onToggleLanguage,
  onToggleDarkMode
}) => {
  const [imgError, setImgError] = useState(false);

  const navItems: { id: PageType; label: string; labelHi: string }[] = [
    { id: 'home', label: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { id: 'report-issue', label: 'Report Issue', labelHi: 'समस्या दर्ज करें' },
    { id: 'waste-segregation', label: 'Live Segregation', labelHi: 'कचरा पृथक्करण' },
    { id: 'sell-junk', label: 'Sell Junk', labelHi: 'कबाड़ बेचें' },
    { id: 'scrap-dealers', label: 'Scrap Dealers', labelHi: 'कबाड़ीवाले / केंद्र' },
    { id: 'rewards', label: 'GreenRewards', labelHi: 'ग्रीन रिवॉर्ड्स' },
    { id: 'aqi-guide', label: 'AQI Guide', labelHi: 'एक्यूआई गाइड' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 h-16 sm:h-18">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform shrink-0">
              <Leaf className="w-5 h-5 fill-white/20" />
              <Wind className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                  Urban<span className="text-emerald-600">Atmo</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-normal hidden sm:block whitespace-nowrap">
                {isHindi ? 'स्वच्छ वायु, हरित शहर' : 'Breathe Better. Live Greener.'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 mx-auto">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active 
                      ? 'bg-emerald-50 text-emerald-800 shadow-2xs' 
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{isHindi ? item.labelHi : item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right utility items: Points badge, Language Switcher, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Eco Points Pill */}
            <button
              onClick={() => onNavigate('rewards')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-800 border border-emerald-200/80 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
              title="Your GreenPoints balance"
            >
              <Award className="h-3.5 w-3.5 text-emerald-600 fill-emerald-100" />
              <span className="font-mono">{user.points}</span>
              <span className="hidden sm:inline text-[11px] font-medium text-emerald-600">pts</span>
            </button>

            {/* Language Toggle (English / Hindi) */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200/60"
              title="Switch language between English and हिन्दी"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
            </button>

            {/* Profile Avatar / Link */}
            <button
              onClick={() => onNavigate('profile')}
              aria-label="Profile"
              title={`Citizen Profile: ${user.name}`}
              className={`flex items-center gap-2 p-1 sm:py-1 sm:pr-2.5 sm:pl-1 rounded-full border transition-all cursor-pointer ${
                currentPage === 'profile'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 text-emerald-900 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center overflow-hidden shrink-0 border border-emerald-300">
                {!imgError && user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4 text-emerald-700" />
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[120px] truncate">
                {user.name}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
