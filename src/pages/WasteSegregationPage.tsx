import React, { useState } from 'react';
import { 
  Search, 
  Camera, 
  Recycle, 
  AlertOctagon, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  X,
  Apple,
  Package,
  Cpu,
  AlertTriangle,
  ShieldAlert,
  Info
} from 'lucide-react';
import { WASTE_CATEGORIES, WASTE_LOOKUP_ITEMS } from '../data/mockData';
import { WasteBinType, WasteCategoryInfo } from '../types';

interface WasteSegregationPageProps {
  onEarnPoints?: (points: number, reason: string) => void;
  isHindi: boolean;
}

export const WasteSegregationPage: React.FC<WasteSegregationPageProps> = ({
  onEarnPoints,
  isHindi
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WasteBinType>('wet');
  const [aiScanItem, setAiScanItem] = useState<{ name: string; category: WasteBinType; confidence: number; advice: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<Record<number, number>>({});

  // Filter items from lookup database
  const searchResults = searchQuery.trim() === ''
    ? []
    : WASTE_LOOKUP_ITEMS.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hindiName.includes(searchQuery)
      );

  const activeCatInfo = WASTE_CATEGORIES.find(c => c.id === selectedCategory) || WASTE_CATEGORIES[0];

  // Quick simulated camera AI scans
  const aiPresets = [
    { label: 'Plastic Bottle', name: 'PET Beverage Bottle', category: 'dry' as WasteBinType, confidence: 98, advice: 'Empty all liquids, crush to compact volume, replace cap, and place inside Blue Bin.' },
    { label: 'Banana Peel', name: 'Organic Banana Skin', category: 'wet' as WasteBinType, confidence: 99, advice: 'Place directly in Green Kitchen Bin for soil composting. Do not wrap in polythene.' },
    { label: 'Lithium Battery', name: 'Cylindrical Dry Battery', category: 'ewaste' as WasteBinType, confidence: 95, advice: 'Toxic heavy metals inside! Place in Orange/E-Waste drop box or sell via UrbanAtmo scrap portal.' },
    { label: 'Medicine Foil', name: 'Expired Medicine Strip', category: 'hazardous' as WasteBinType, confidence: 96, advice: 'Hazardous domestic chemical waste. Hand over in marked red bin pouch.' }
  ];

  const handleSimulateAIScan = (preset: typeof aiPresets[0]) => {
    setIsScanning(true);
    setAiScanItem(null);
    setTimeout(() => {
      setIsScanning(false);
      setAiScanItem(preset);
    }, 800);
  };

  // Mini-Quiz questions
  const quizQuestions = [
    {
      question: isHindi ? 'दूध की खाली थैली (Milk Pouch) किस डिब्बे में जानी चाहिए?' : 'Which bin should a rinsed, clean milk pouch go into?',
      options: ['Green Bin (Wet Waste)', 'Blue Bin (Dry Waste)', 'Red Bin (Hazardous)'],
      correct: 1,
      explanation: isHindi ? 'साफ दूध की थैली प्लास्टिक है और इसे नीले डिब्बे में पुनर्चक्रण के लिए डाला जाता है।' : 'Clean dry plastics are 100% recyclable and belong in the Blue Bin.'
    },
    {
      question: isHindi ? 'सब्जियों और फलों के छिलके किसमें डालने चाहिए?' : 'Where do vegetable scraps and fruit peels belong?',
      options: ['Green Bin (Wet Waste)', 'Blue Bin (Dry Waste)', 'Orange Bin (E-Waste)'],
      correct: 0,
      explanation: isHindi ? 'यह जैविक अपशिष्ट है जो खाद बन सकता है।' : 'Organic kitchen scraps belong in the Green Bin for composting.'
    },
    {
      question: isHindi ? 'पुरानी दवाइयां और सिरप की बोतलें किस श्रेणी में आती हैं?' : 'Where do expired medicines and medical syrups belong?',
      options: ['Green Bin', 'Blue Bin', 'Red Bin (Domestic Hazardous)'],
      correct: 2,
      explanation: isHindi ? 'दवाइयां रासायनिक रूप से विषाक्त होती हैं, इन्हें लाल डिब्बे में रखा जाता है।' : 'Medicines are toxic chemicals that contaminate groundwater if dumped; use the Red Bin.'
    }
  ];

  const handleSelectQuizAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswered(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswered[idx] === q.correct) score += 1;
    });
    setQuizScore(score);
    if (score === 3 && onEarnPoints) {
      onEarnPoints(30, 'Waste Segregation Quiz Master');
    }
  };

  const getCategoryIcon = (id: WasteBinType) => {
    switch (id) {
      case 'wet': return <Apple className="h-5 w-5" />;
      case 'dry': return <Package className="h-5 w-5" />;
      case 'ewaste': return <Cpu className="h-5 w-5" />;
      case 'hazardous': return <AlertTriangle className="h-5 w-5" />;
      case 'sanitary': return <ShieldAlert className="h-5 w-5" />;
    }
  };

  return (
    <div id="waste-segregation-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <Recycle className="h-3.5 w-3.5" />
          <span>{isHindi ? 'राष्ट्रीय स्वच्छ भारत गाइड' : 'Swachh Bharat Segregation Protocol'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'लाइव कचरा पृथक्करण केंद्र' : 'Live Waste Segregation Guide'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isHindi 
            ? 'सही डिब्बे में कचरा अलग करके पर्यावरण और स्वच्छता कर्मियों की रक्षा करें।'
            : 'Sort at the source. Learn bin color standards, search any household item, or test our simulated AI waste scanner.'}
        </p>
      </div>

      {/* Interactive Item Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-md">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-emerald-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi 
              ? 'किसी वस्तु का नाम लिखें (उदा. banana peel, plastic bottle, battery, milk pouch)...'
              : 'Type any item (e.g. banana peel, plastic bottle, battery, medicine strip, pizza box)...'}
            className="w-full pl-12 pr-10 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none text-sm sm:text-base font-medium transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Instant Search Results */}
        {searchQuery.trim() !== '' && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {searchResults.length} {searchResults.length === 1 ? 'Match Found' : 'Matches Found'}:
            </span>
            {searchResults.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
                Item not in quick list. By general rule: If it decomposes within days, it goes to Green Bin. If clean and manufactured, Blue Bin.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {searchResults.map((res, i) => (
                  <div 
                    key={i} 
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{res.name}</h4>
                        <span className="text-xs text-slate-500">{res.hindiName}</span>
                      </div>
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full text-white shrink-0 ${
                        res.category === 'wet' ? 'bg-emerald-600' :
                        res.category === 'dry' ? 'bg-blue-600' :
                        res.category === 'ewaste' ? 'bg-orange-600' :
                        res.category === 'hazardous' ? 'bg-red-600' : 'bg-amber-600'
                      }`}>
                        {res.categoryName.split(' ')[0]} Bin
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                      💡 {res.instruction}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Colourful Bin Category Tabs & Visual Guide */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Recycle className="h-5 w-5 text-emerald-600" />
          <span>{isHindi ? 'नगर निगम डिब्बों के मानक रंग' : 'Official Municipal Bin Categories'}</span>
        </h2>

        {/* 5 Distinct Category Tabs with Indian Municipal Bin Colors */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {WASTE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'ring-2 ring-slate-900 shadow-md scale-[1.02]' 
                    : 'hover:bg-slate-50 border-slate-200'
                }`}
                style={{
                  backgroundColor: isSelected ? cat.binColor : '#ffffff',
                  color: isSelected ? '#ffffff' : '#1e293b'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/30 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.id.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm leading-tight">
                    {cat.name.split(' ')[0]} {cat.name.split(' ')[1]}
                  </h3>
                  <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {cat.binColorName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="w-3.5 h-3.5 rounded-full" 
                  style={{ backgroundColor: activeCatInfo.binColor }} 
                />
                <h3 className="text-xl font-black text-slate-900">
                  {activeCatInfo.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">{activeCatInfo.nameHi}</p>
            </div>
            <span 
              className="self-start sm:self-center px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xs"
              style={{ backgroundColor: activeCatInfo.binColor }}
            >
              {activeCatInfo.binColorName}
            </span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {activeCatInfo.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Examples (What Goes In) */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>What to Put in This Bin:</span>
              </h4>
              <ul className="space-y-1.5">
                {activeCatInfo.examples.map((ex, i) => (
                  <li key={i} className="text-xs text-emerald-900 flex items-start gap-1.5 font-medium">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Do Not Mix (Strict Warnings) */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <AlertOctagon className="h-4 w-4 text-rose-600" />
                <span>What Should NEVER be Mixed:</span>
              </h4>
              <ul className="space-y-1.5">
                {activeCatInfo.doNotMix.map((ex, i) => (
                  <li key={i} className="text-xs text-rose-900 flex items-start gap-1.5 font-medium">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Citizen Pro-Tip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs flex items-start gap-2.5">
            <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Collector Guideline: </span>
              <span className="text-slate-600">{activeCatInfo.tips}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Camera / AI Waste Identification Demo */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-1.5">
              <Sparkles className="h-3 w-3" />
              <span>Smart Camera Feature</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              AI Waste Identification & Bin Classifier
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Snap a picture of any item with your phone camera for automated neural classification.
            </p>
          </div>

          <label className="self-start sm:self-center px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors shadow-md flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Upload Item Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={() => handleSimulateAIScan(aiPresets[0])} 
              className="hidden" 
            />
          </label>
        </div>

        {/* Demo Quick Presets */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <span className="text-xs font-bold text-slate-300 block">
            Or test simulated AI recognition with quick samples:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {aiPresets.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleSimulateAIScan(preset)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer text-left"
              >
                <span className="block truncate">{preset.label}</span>
                <span className="text-[10px] text-emerald-300 font-normal">Test Scan →</span>
              </button>
            ))}
          </div>

          {/* Scanning Animation State */}
          {isScanning && (
            <div className="py-6 text-center text-xs text-emerald-300 animate-pulse flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span>Analyzing visual texture and material contours...</span>
            </div>
          )}

          {/* AI Detection Result Box */}
          {aiScanItem && !isScanning && (
            <div className="mt-3 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-xs space-y-2 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-extrabold text-white text-sm">{aiScanItem.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 font-mono font-bold">
                  {aiScanItem.confidence}% Confidence
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">{aiScanItem.advice}</p>
            </div>
          )}
        </div>
      </section>

      {/* Citizen Waste Quiz for GreenPoints */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isHindi ? 'नागरिक पृथक्करण क्विज़ (30 अंक)' : 'Quick Waste Segregation Quiz'}
              </h3>
              <p className="text-xs text-slate-500">
                {isHindi ? '3 प्रश्नों का उत्तर देकर +30 ग्रीनपॉइंट्स कमाएं' : 'Score 3/3 to unlock +30 GreenPoints bonus'}
              </p>
            </div>
          </div>
          {quizScore !== null && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              Score: {quizScore}/3
            </span>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q, qIndex) => (
            <div key={qIndex} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                {qIndex + 1}. {q.question}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {q.options.map((opt, oIndex) => {
                  const isSelected = quizAnswered[qIndex] === oIndex;
                  const isCorrect = quizScore !== null && oIndex === q.correct;
                  const isWrong = quizScore !== null && isSelected && oIndex !== q.correct;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelectQuizAnswer(qIndex, oIndex)}
                      className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                        isCorrect
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-600'
                          : isSelected
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {quizScore !== null && (
                <p className="text-[11px] text-slate-600 italic mt-1">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={handleCheckQuiz}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {quizScore !== null ? 'Recalculate Quiz Score' : 'Submit Answers & Claim Points'}
          </button>
        </div>
      </section>

    </div>
  );
};
