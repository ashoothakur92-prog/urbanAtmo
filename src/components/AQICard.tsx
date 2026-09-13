import React, { useState } from 'react';
import { 
  MapPin, 
  Wind, 
  Droplets, 
  CloudRain, 
  ChevronRight, 
  Sliders, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { AQIData, PageType } from '../types';
import { AQI_LEVELS_INFO } from '../data/mockData';

interface AQICardProps {
  aqiData: AQIData;
  onNavigate: (page: PageType) => void;
  onCityChange?: (city: string) => void;
  availableCities?: string[];
  isHindi?: boolean;
}

export const AQICard: React.FC<AQICardProps> = ({
  aqiData,
  onNavigate,
  onCityChange,
  availableCities = ['Gurugram', 'New Delhi', 'Noida', 'Bengaluru', 'Mumbai', 'Jaipur'],
  isHindi = false
}) => {
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [showSimModal, setShowSimModal] = useState(false);
  const [simAQI, setSimAQI] = useState<number>(aqiData.aqi);

  // Derive level info based on current or simulated AQI
  const currentAQI = showSimModal ? simAQI : aqiData.aqi;
  
  const getLevelInfo = (aqi: number) => {
    return AQI_LEVELS_INFO.find(lvl => aqi >= lvl.min && aqi <= lvl.max) || AQI_LEVELS_INFO[1];
  };

  const currentLevel = getLevelInfo(currentAQI);

  // Convert temperature
  const displayTemp = tempUnit === 'C' 
    ? aqiData.temperature 
    : Math.round((aqiData.temperature * 9/5) + 32);

  // Card background styling based on AQI level
  const getCardStyle = () => {
    if (currentAQI <= 50) {
      return 'from-emerald-50 via-teal-50 to-sky-100 border-emerald-200/80 shadow-emerald-100/50';
    } else if (currentAQI <= 100) {
      return 'from-sky-100 via-sky-50 to-amber-50 border-sky-200/80 shadow-sky-100/50';
    } else if (currentAQI <= 150) {
      return 'from-amber-50 via-orange-50 to-orange-100/70 border-orange-200 shadow-orange-100/50';
    } else if (currentAQI <= 200) {
      return 'from-orange-100/80 via-red-50 to-rose-100 border-red-200 shadow-red-100/50';
    } else if (currentAQI <= 300) {
      return 'from-purple-50 via-purple-100/70 to-indigo-100 border-purple-200 shadow-purple-100/50';
    } else {
      return 'from-rose-100/90 via-red-100 to-stone-200 border-rose-300 shadow-rose-200/50';
    }
  };

  return (
    <div id="live-aqi-card-container" className="relative">
      {/* Main AQI Card matching Screenshot 1 visual styling */}
      <div 
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getCardStyle()} p-6 sm:p-7 border shadow-lg transition-all duration-500`}
      >
        {/* Decorative cloud-like soft background accents */}
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/40 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-teal-100/40 blur-xl pointer-events-none" />

        {/* Top bar with location switcher and live indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
              Live AQI
            </span>
            <span 
              className="text-xl sm:text-2xl font-extrabold px-1.5 py-0.5 rounded-lg"
              style={{ color: currentLevel.colorCode }}
            >
              {currentAQI}
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              AQI (US)
            </span>
          </div>

          {/* City / Temperature section */}
          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="flex items-center justify-end gap-1 text-slate-800 font-bold text-lg sm:text-xl">
                <span>{displayTemp}°</span>
                <div className="text-xs font-semibold text-slate-400 flex items-center ml-0.5">
                  <button 
                    onClick={() => setTempUnit('C')} 
                    className={`cursor-pointer transition-colors ${tempUnit === 'C' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    C
                  </button>
                  <span className="mx-0.5 text-slate-300">|</span>
                  <button 
                    onClick={() => setTempUnit('F')} 
                    className={`cursor-pointer transition-colors ${tempUnit === 'F' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    F
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-slate-600 font-medium">
                <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                {onCityChange ? (
                  <select 
                    value={aqiData.city}
                    onChange={(e) => onCityChange(e.target.value)}
                    className="bg-transparent border-none text-slate-700 font-semibold cursor-pointer focus:outline-none pr-1 py-0"
                  >
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                ) : (
                  <span>{aqiData.city}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Category Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-4 relative z-10">
          <span className="text-sm font-semibold text-slate-700">
            {isHindi ? 'वायु गुणवत्ता:' : 'Air Quality is'}
          </span>
          <span 
            className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-xs transition-colors"
            style={{ 
              backgroundColor: currentLevel.colorCode,
              color: currentAQI > 200 ? '#ffffff' : '#1e293b'
            }}
          >
            {isHindi ? currentLevel.categoryHi : currentLevel.category}
          </span>

          <button
            onClick={() => setShowSimModal(!showSimModal)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-emerald-700 bg-white/70 hover:bg-white px-2.5 py-1 rounded-full border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
            title="Simulate different AQI values for testing"
          >
            <Sliders className="h-3 w-3" />
            <span className="hidden sm:inline">Simulate AQI</span>
          </button>
        </div>

        {/* Pollutants and Weather Grid matching Screenshot 1 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-t border-slate-200/60 relative z-10">
          {/* Left Column: PM2.5, PM10, Precipitation, Humidity, Wind */}
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center justify-between sm:justify-start sm:gap-4 font-semibold text-slate-800">
              <span>PM2.5 : <span className="font-bold">{aqiData.pm25} µg/m³</span></span>
            </div>
            <div className="flex items-center justify-between sm:justify-start sm:gap-4 font-semibold text-slate-800">
              <span>PM10 : <span className="font-bold">{aqiData.pm10} µg/m³</span></span>
            </div>
            
            <div className="pt-2 grid grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <CloudRain className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                <span>Rain: {aqiData.precipitation}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                <span>Hum: {aqiData.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span>Wind: {aqiData.windSpeed} mph</span>
              </div>
            </div>
          </div>

          {/* Right Column: Time and Weather note */}
          <div className="sm:text-right flex flex-col justify-between text-xs text-slate-600">
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wider text-[10px]">
                Current Condition
              </span>
              <p className="font-semibold text-slate-700 text-sm">{aqiData.weatherCondition}</p>
            </div>
            <div className="mt-2 text-slate-500">
              <p>{aqiData.timeString}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Health Advisory Box */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs relative z-10">
          <AlertCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-slate-800">Health Recommendation: </span>
            <span className="text-slate-600">
              {isHindi ? currentLevel.healthSummaryHi : currentLevel.healthSummary} {currentLevel.advice}
            </span>
          </div>
          <button 
            onClick={() => onNavigate('aqi-guide')}
            className="text-emerald-700 font-bold inline-flex items-center gap-0.5 hover:underline shrink-0 ml-1 cursor-pointer"
          >
            <span>Guide</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Interactive AQI Simulation Slider Drawer */}
        {showSimModal && (
          <div className="mt-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 text-xs shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5 text-emerald-600" />
                Live AQI Level Simulator (Hackathon Demo)
              </span>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100">
                AQI: {simAQI}
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="450" 
              step="5"
              value={simAQI}
              onChange={(e) => setSimAQI(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
              <span className="text-emerald-600">Good (25)</span>
              <span className="text-amber-500">Mod (75)</span>
              <span className="text-orange-500">Sens (130)</span>
              <span className="text-red-500">Unhealthy (180)</span>
              <span className="text-purple-600">V.Unhealthy (250)</span>
              <span className="text-rose-900">Hazardous (400)</span>
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <button 
                onClick={() => setSimAQI(aqiData.aqi)}
                className="px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium cursor-pointer"
              >
                Reset to Live
              </button>
              <button 
                onClick={() => setShowSimModal(false)}
                className="px-2.5 py-1 text-[11px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
