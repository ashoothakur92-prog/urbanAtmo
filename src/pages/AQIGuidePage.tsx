import React, { useState } from 'react';
import { 
  Wind, 
  ArrowDown, 
  ShieldAlert, 
  HeartPulse, 
  Activity, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  Sliders,
  Sparkles
} from 'lucide-react';
import { AQI_LEVELS_INFO } from '../data/mockData';
import { AQIScaleVisual } from '../components/AQIScaleVisual';

interface AQIGuidePageProps {
  isHindi: boolean;
}

export const AQIGuidePage: React.FC<AQIGuidePageProps> = ({ isHindi }) => {
  const [testAQI, setTestAQI] = useState<number>(115);

  const matchedLevel = AQI_LEVELS_INFO.find(lvl => testAQI >= lvl.min && testAQI <= lvl.max) || AQI_LEVELS_INFO[2];

  const pollutantsInfo = [
    {
      name: 'PM2.5 (Fine Particulate Matter)',
      size: '< 2.5 micrometers',
      sources: 'Vehicle exhaust, biomass burning, coal plants, secondary chemical reactions',
      impact: 'Microscopic particles that penetrate deep into lungs and enter the bloodstream, causing cardiovascular & respiratory distress.'
    },
    {
      name: 'PM10 (Coarse Dust & Particulates)',
      size: '< 10 micrometers',
      sources: 'Road dust, construction debris, agricultural tilling, unpaved surfaces',
      impact: 'Irritates eyes, nose, and throat, triggering asthma attacks and chronic bronchitis.'
    },
    {
      name: 'Ground-level Ozone (O₃)',
      size: 'Secondary Gas',
      sources: 'Formed when NOx and VOCs react under hot summer sunlight',
      impact: 'Damages lung tissue, makes breathing painful during heavy outdoor athletic exertion.'
    },
    {
      name: 'Nitrogen Dioxide (NO₂)',
      size: 'Combustion Gas',
      sources: 'Heavy diesel trucks, vehicular traffic jams, thermal power stations',
      impact: 'Inflames the lining of the lungs and reduces immunity to lung infections.'
    }
  ];

  return (
    <div id="aqi-guide-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold mb-2">
          <Wind className="h-3.5 w-3.5 text-sky-600" />
          <span>{isHindi ? 'राष्ट्रीय वायु गुणवत्ता सूचकांक' : 'Central Pollution Control Board (CPCB) Standard'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'वायु गुणवत्ता गाइड (AQI Scale 0 to 500)' : 'Understanding the AQI Scale: 0 to 500'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isHindi 
            ? 'कम संख्या मतलब स्वच्छ हवा। अधिक संख्या मतलब अधिक स्वास्थ्य जोखिम।'
            : 'Lower numbers mean cleaner air. Higher numbers mean more health risk.'}
        </p>
      </div>

      {/* Screenshot 2 Visual Layout Component (Interactive Full Display) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md">
        <AQIScaleVisual showButton={false} isHindi={isHindi} />
      </div>

      {/* Interactive Citizen AQI Checker Tool */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 mb-1">
              <Sliders className="h-3.5 w-3.5" />
              <span>Interactive Diagnostic Tool</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Check Health Advisory for Any AQI Number
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Drag the slider to test what actions students, athletes, and elderly should take at that level.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Test Level</span>
            <span 
              className="text-3xl font-black font-mono px-3 py-1 rounded-xl bg-white/10 inline-block mt-0.5"
              style={{ color: matchedLevel.colorCode }}
            >
              {testAQI}
            </span>
          </div>
        </div>

        {/* Range input slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="10"
            max="480"
            value={testAQI}
            onChange={(e) => setTestAQI(Number(e.target.value))}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span>0 Good</span>
            <span>100 Moderate</span>
            <span>200 Unhealthy</span>
            <span>300 V.Unhealthy</span>
            <span>500 Hazardous</span>
          </div>
        </div>

        {/* Dynamic Advisory Output Box */}
        <div 
          className="p-5 rounded-2xl border transition-all space-y-2 bg-slate-800/80"
          style={{ borderColor: matchedLevel.colorCode }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span 
              className="px-3 py-1 rounded-full text-xs font-black"
              style={{ backgroundColor: matchedLevel.colorCode, color: testAQI > 200 ? '#ffffff' : '#0f172a' }}
            >
              {matchedLevel.category} ({matchedLevel.range})
            </span>

            <span className="text-xs font-bold text-slate-300">
              Mask: {matchedLevel.maskRecommended ? '⚠️ N95 Mask Advised' : '✓ Mask Not Required'}
            </span>
          </div>

          <p className="text-sm font-semibold text-white pt-1">
            "{matchedLevel.healthSummary}"
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            {matchedLevel.advice}
          </p>
        </div>
      </section>

      {/* Citizen Health Guidance Table by Demographic */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-rose-500" />
          <span>Recommended Actions by Citizen Demographic</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
              🏫 School Children & Students
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              When AQI crosses 150, physical education classes should shift indoors. Outdoor morning assemblies should be suspended when AQI exceeds 200.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">
              🏃 Morning Walkers & Athletes
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reschedule heavy aerobic jogs from early winter morning inversions to late afternoon (2 PM - 5 PM) when sun disperses surface particulate layers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-extrabold text-purple-800 uppercase tracking-wider block">
              🧓 Seniors & Asthmatics
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep emergency inhalers accessible, seal leaky window cracks, and operate indoor HEPA purifiers in closed bedrooms when AQI crosses 150.
            </p>
          </div>
        </div>
      </section>

      {/* Key Air Pollutants Explained */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-teal-600" />
            <span>Key Pollutants That Drive Urban AQI</span>
          </h3>
          <p className="text-xs text-slate-500">
            A comprehensive citizen primer on what you inhale in metro corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pollutantsInfo.map((p, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-900">{p.name}</h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                  {p.size}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Sources: </span>
                {p.sources}
              </p>
              <p className="text-xs text-slate-600 font-medium pt-1 border-t border-slate-200/60">
                ⚠️ {p.impact}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
