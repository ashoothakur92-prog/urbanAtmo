import React from 'react';
import { AQI_LEVELS_INFO } from '../data/mockData';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { PageType } from '../types';

interface AQIScaleVisualProps {
  onNavigate?: (page: PageType) => void;
  showButton?: boolean;
  highlightCategory?: string;
  isHindi?: boolean;
}

export const AQIScaleVisual: React.FC<AQIScaleVisualProps> = ({
  onNavigate,
  showButton = true,
  highlightCategory,
  isHindi = false
}) => {
  return (
    <div id="aqi-scale-component" className="w-full bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm">
      {/* Title section matching Screenshot 2 */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {isHindi ? 'एक्यूआई पैमाना: 0 से 500' : 'The AQI Scale: 0 to 500'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isHindi 
            ? 'कम संख्या मतलब स्वच्छ हवा। अधिक संख्या मतलब स्वास्थ्य जोखिम।'
            : 'Lower numbers mean cleaner air. Higher numbers mean more health risk.'}
        </p>
      </div>

      {/* Main visual scale with vertical arrow on left matching Screenshot 2 */}
      <div className="flex items-stretch gap-3 sm:gap-6 max-w-xl mx-auto">
        {/* Vertical arrow indicator */}
        <div className="flex flex-col items-center justify-between py-2 shrink-0 w-6 sm:w-8">
          <div className="w-0.5 sm:w-1 flex-1 bg-emerald-600 relative rounded-full flex items-center justify-center">
            {/* Centered rotated label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
              <span className="text-[9px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase px-2 py-0.5 bg-white/95 dark:bg-slate-800 rounded border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                {isHindi ? 'स्वास्थ्य जोखिम बढ़ता है' : 'HEALTH RISK INCREASES'}
              </span>
            </div>
          </div>
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 -mt-1 shrink-0" />
        </div>

        {/* The 6 bands list */}
        <div className="flex-1 space-y-3">
          {AQI_LEVELS_INFO.map((level) => {
            const isHighlighted = highlightCategory && highlightCategory.toLowerCase() === level.category.toLowerCase();
            return (
              <div 
                key={level.range}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-2 rounded-2xl transition-all ${
                  isHighlighted ? 'bg-slate-100 ring-2 ring-emerald-500' : 'hover:bg-slate-50'
                }`}
              >
                {/* Colored range badge matching screenshot */}
                <div 
                  className="w-full sm:w-28 py-2 px-3 rounded-xl text-white font-extrabold text-sm sm:text-base text-center shadow-xs shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: level.colorCode }}
                >
                  {level.range}
                </div>

                {/* Category & Description */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {isHindi ? level.categoryHi : level.category}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {isHindi ? level.healthSummaryHi : level.healthSummary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer note matching Screenshot 2 */}
      <div className="mt-5 text-center">
        <p className="text-[11px] text-slate-400 italic">
          {isHindi 
            ? 'उस दिन का सबसे खराब प्रदूषक अंतिम एक्यूआई स्कोर तय करता है।'
            : 'The worst pollutant that day sets the score.'}
        </p>

        {showButton && onNavigate && (
          <div className="mt-4">
            <button
              onClick={() => onNavigate('aqi-guide')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm border border-emerald-200 transition-colors cursor-pointer shadow-2xs"
            >
              <span>{isHindi ? 'विस्तृत वायु गुणवत्ता गाइड देखें' : 'View Full AQI & Mask Guide'}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
