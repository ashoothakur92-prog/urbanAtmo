import React, { useState } from 'react';
import { 
  Home, 
  User, 
  CircleDot, 
  FileText, 
  Flame, 
  Store, 
  Award, 
  Wind, 
  Grid, 
  X 
} from 'lucide-react';
import { PageType } from '../types';

interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isHindi?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  onNavigate,
  isHindi = false
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const moreItems: { id: PageType; label: string; labelHi: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'report-issue', label: 'Report Issue', labelHi: 'समस्या दर्ज करें', icon: <FileText className="h-5 w-5 text-emerald-600" />, desc: 'Garbage, burning, polluted drains' },
    { id: 'sell-junk', label: 'Sell Junk', labelHi: 'कबाड़ बेचें', icon: <Flame className="h-5 w-5 text-amber-500" />, desc: 'Paper, plastics, metals doorstep pickup' },
    { id: 'scrap-dealers', label: 'Nearby Scrap Dealers', labelHi: 'कबाड़ीवाले / केंद्र', icon: <Store className="h-5 w-5 text-teal-600" />, desc: 'Verified recycling hubs with maps' },
    { id: 'rewards', label: 'GreenRewards', labelHi: 'ग्रीन रिवॉर्ड्स', icon: <Award className="h-5 w-5 text-amber-600" />, desc: 'Redeem coupons & plant trees' },
    { id: 'aqi-guide', label: 'The AQI Scale Guide', labelHi: 'एक्यूआई गाइड', icon: <Wind className="h-5 w-5 text-sky-600" />, desc: '0-500 scale, masks & health rules' },
  ];

  const handleItemClick = (page: PageType) => {
    onNavigate(page);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* Pop-up More Drawer for mobile users */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-t-3xl p-5 pb-24 shadow-2xl border-t border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {isHindi ? 'सभी सेवाएं और उपकरण' : 'Urban Services & Modules'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'त्वरित पहुंच के लिए चुनें' : 'Smart India Hackathon Citizen Hub'}
                </p>
              </div>
              <button 
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {moreItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-colors cursor-pointer ${
                    currentPage === item.id 
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold' 
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm block">
                      {isHindi ? item.labelHi : item.label}
                    </span>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {item.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exact Recreation of Screenshot 1 & 2 Mobile Navigation Bar */}
      <div className="fixed bottom-3 inset-x-0 z-40 md:hidden flex justify-center px-4 pointer-events-none">
        <div className="w-full max-w-sm pointer-events-auto">
          <div className="relative bg-[#009b55] rounded-full shadow-2xl shadow-emerald-950/30 px-5 py-2.5 flex items-center justify-between text-white border border-emerald-400/30 backdrop-blur-sm">
            
            {/* Left: Home Button */}
            <button
              onClick={() => onNavigate('home')}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                currentPage === 'home' 
                  ? 'text-white font-bold scale-105' 
                  : 'text-emerald-100/80 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-full ${currentPage === 'home' ? 'bg-white/20' : ''}`}>
                <Home className="h-5 w-5" />
              </div>
              <span className="text-[11px] tracking-tight">
                {isHindi ? 'होम' : 'Home'}
              </span>
            </button>

            {/* Center: Elevated Floating "Live Segregation" Circular Button matching screenshot */}
            <div className="relative -top-4 flex flex-col items-center">
              <button
                onClick={() => onNavigate('waste-segregation')}
                className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                  currentPage === 'waste-segregation'
                    ? 'bg-white text-emerald-700 ring-4 ring-emerald-300/60 scale-105'
                    : 'bg-[#009b55] text-white ring-4 ring-white shadow-emerald-900/40 hover:scale-105'
                }`}
                title="Live Waste Segregation"
              >
                {/* Outer and inner concentric circles matching the screenshot target icon */}
                <div className={`w-8 h-8 rounded-full border-3 flex items-center justify-center ${
                  currentPage === 'waste-segregation' ? 'border-emerald-600' : 'border-white'
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full ${
                    currentPage === 'waste-segregation' ? 'bg-emerald-600' : 'bg-white'
                  }`} />
                </div>
              </button>
              <span className="text-[10px] font-bold text-white mt-0.5 tracking-tight whitespace-nowrap drop-shadow-xs">
                {isHindi ? 'लाइव सेग्रिगेशन' : 'Live Segregation'}
              </span>
            </div>

            {/* Quick Menu / More Drawer trigger */}
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                showMoreMenu ? 'text-amber-300 font-bold' : 'text-emerald-100/80 hover:text-white'
              }`}
              title="More Services"
            >
              <div className={`p-1.5 rounded-full ${showMoreMenu ? 'bg-white/20' : ''}`}>
                <Grid className="h-5 w-5" />
              </div>
              <span className="text-[11px] tracking-tight">
                {isHindi ? 'सेवाएं' : 'Services'}
              </span>
            </button>

            {/* Right: Profile Button matching screenshot */}
            <button
              onClick={() => onNavigate('profile')}
              className={`flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                currentPage === 'profile' 
                  ? 'text-white font-bold scale-105' 
                  : 'text-emerald-100/80 hover:text-white'
              }`}
            >
              <div className={`p-1.5 rounded-full ${currentPage === 'profile' ? 'bg-white/20' : ''}`}>
                <User className="h-5 w-5" />
              </div>
              <span className="text-[11px] tracking-tight">
                {isHindi ? 'प्रोफ़ाइल' : 'Profile'}
              </span>
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
