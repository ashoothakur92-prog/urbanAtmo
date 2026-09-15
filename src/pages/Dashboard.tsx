import React from 'react';
import { 
  FileText, 
  PlusCircle, 
  Store, 
  Coins, 
  Leaf, 
  Recycle, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { AQIData, PageType, UserProfile, EnvironmentalReport } from '../types';
import { AQICard } from '../components/AQICard';
import { AQIScaleVisual } from '../components/AQIScaleVisual';

interface DashboardProps {
  user: UserProfile;
  aqiData: AQIData;
  reports: EnvironmentalReport[];
  onNavigate: (page: PageType) => void;
  onCityChange: (city: string) => void;
  isHindi: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  aqiData,
  reports,
  onNavigate,
  onCityChange,
  isHindi
}) => {
  // Determine greeting based on current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return isHindi ? 'सुप्रभात' : 'Good Morning';
    if (hour < 17) return isHindi ? 'शुभ दोपहर' : 'Good Afternoon';
    return isHindi ? 'शुभ संध्या' : 'Good Evening';
  };

  const services = [
    {
      id: 'report-issue' as PageType,
      label: isHindi ? 'समस्या दर्ज करें' : 'Report Issue',
      subtext: isHindi ? 'कचरा, प्रदूषण रिपोर्ट करें' : 'Litter, burning & smoke',
      icon: <FileText className="h-6 w-6 text-emerald-700" />,
      tag: isHindi ? '+50 अंक' : '+50 pts'
    },
    {
      id: 'sell-junk' as PageType,
      label: isHindi ? 'कबाड़ बेचें' : 'Sell Junk',
      subtext: isHindi ? 'घर बैठे कबाड़ीवाला बुलाएं' : 'Doorstep recycling pickup',
      icon: <PlusCircle className="h-6 w-6 text-emerald-700" />,
      tag: isHindi ? 'नकद कमाएं' : 'Earn Cash'
    },
    {
      id: 'scrap-dealers' as PageType,
      label: isHindi ? 'निकटतम कबाड़ीवाले' : 'Nearby Scrap Dealer',
      subtext: isHindi ? 'सत्यापित रिसाइक्लिंग केंद्र' : 'Verified eco centres',
      icon: <Store className="h-6 w-6 text-emerald-700" />,
      tag: isHindi ? 'मैप देखें' : 'Near You'
    },
    {
      id: 'rewards' as PageType,
      label: isHindi ? 'ग्रीन रिवॉर्ड्स' : 'Rewards',
      subtext: isHindi ? 'कूपन और पौधे प्राप्त करें' : 'Coupons & saplings',
      icon: <Coins className="h-6 w-6 text-emerald-700" />,
      tag: `${user.points} pts`
    }
  ];

  return (
    <div id="dashboard-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8">
      
      {/* Welcome Header matching Screenshot 1 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {getGreeting()}, {user.name}
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-0.5">
          {isHindi ? 'क्या आप आज एक हरित बदलाव लाने के लिए तैयार हैं...?' : 'Ready to make a difference today...?'}
        </p>
      </div>

      {/* Prominent Live Air-Quality Card matching Screenshot 1 */}
      <AQICard 
        aqiData={aqiData} 
        onNavigate={onNavigate} 
        onCityChange={onCityChange}
        isHindi={isHindi} 
      />

      {/* "Our Services" Section matching Screenshot 1 */}
      <section id="our-services-section">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {isHindi ? 'हमारी सेवाएं' : 'Our Services'}
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {isHindi ? 'नागरिक पोर्टल' : 'Civic Action Portal'}
          </span>
        </div>

        {/* 4 soft rounded pastel green cards matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {services.map((srv) => (
            <button
              key={srv.id}
              onClick={() => onNavigate(srv.id)}
              className="group relative flex flex-col items-center justify-center p-5 rounded-3xl bg-[#d5f5e3]/70 hover:bg-[#c3f0d5] border border-[#b4ecd0] transition-all duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-center"
            >
              {/* Tag in corner */}
              <span className="absolute top-2.5 right-2.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-800/10 text-emerald-900">
                {srv.tag}
              </span>

              {/* Icon */}
              <div className="p-3 rounded-2xl bg-white/80 group-hover:bg-white text-emerald-800 shadow-2xs mb-3 transition-colors">
                {srv.icon}
              </div>

              {/* Label */}
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-emerald-900 transition-colors leading-tight">
                {srv.label}
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">
                {srv.subtext}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Weekly Eco-Impact Summary */}
      <section id="eco-impact-summary-section" className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {isHindi ? 'साप्ताहिक पर्यावरण प्रभाव' : 'Weekly Eco-Impact Summary'}
              </h3>
              <p className="text-xs text-slate-500">
                {isHindi ? 'आपके और आपके वार्ड के योगदान का आंकड़ा' : 'Your personal contribution in Gurugram Ward 14'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>{isHindi ? 'सभी देखें' : 'View Stats'}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Plastic Recycled */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isHindi ? 'प्लास्टिक पुनर्चक्रित' : 'Plastic Recycled'}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">14.5</span>
              <span className="text-xs font-bold text-slate-500">kg</span>
            </div>
            <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <Recycle className="h-3 w-3" />
              <span>+3.2 kg this week</span>
            </div>
          </div>

          {/* Waste Diverted */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isHindi ? 'लैंडफिल से बचाया' : 'Waste Diverted'}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">38.2</span>
              <span className="text-xs font-bold text-slate-500">kg</span>
            </div>
            <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>85% diverted</span>
            </div>
          </div>

          {/* GreenPoints */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isHindi ? 'ग्रीनपॉइंट्स अर्जित' : 'GreenPoints'}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-700">{user.points}</span>
              <span className="text-xs font-bold text-emerald-600">pts</span>
            </div>
            <div className="mt-2 text-[10px] text-amber-600 font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Level 3 Citizen</span>
            </div>
          </div>

          {/* CO2 Saved */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <span className="text-xs font-medium text-slate-500">
              {isHindi ? 'कार्बन उत्सर्जन बचाया' : 'CO₂ Prevented'}
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-teal-700">52.8</span>
              <span className="text-xs font-bold text-teal-600">kg</span>
            </div>
            <div className="mt-2 text-[10px] text-teal-600 font-semibold flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              <span>Equivalent to 3 trees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Civic Waste Segregation Banner */}
      <div 
        onClick={() => onNavigate('waste-segregation')}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 sm:p-6 shadow-lg shadow-emerald-900/10 cursor-pointer group"
      >
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-110 transition-transform" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold mb-2">
              <Recycle className="h-3 w-3" />
              <span>{isHindi ? 'स्मार्ट पृथक्करण गाइड' : 'Live Smart Segregation'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">
              {isHindi ? 'कचरे को सही डिब्बे में अलग करें' : 'Confused where an item goes?'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              {isHindi 
                ? 'केले का छिलका, दूध की थैली या पुरानी दवाइयां खोजें और सही रंग का डिब्बा जानें।'
                : 'Search 50+ household items (milk pouches, battery, tea leaves) or use instant AI camera scan.'}
            </p>
          </div>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('waste-segregation');
            }}
            className="self-start sm:self-center px-4 py-2.5 rounded-full bg-white text-emerald-800 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{isHindi ? 'लाइव गाइड खोलें' : 'Open Live Guide'}</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* AQI Scale Preview matching Screenshot 2 */}
      <AQIScaleVisual 
        onNavigate={onNavigate} 
        showButton={true} 
        highlightCategory={aqiData.category}
        isHindi={isHindi}
      />

      {/* Recent Citizen Reports Section */}
      <section id="recent-reports-section" className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {isHindi ? 'आपकी हालिया शिकायतें' : 'Your Recent Civic Reports'}
            </h3>
            <p className="text-xs text-slate-500">
              {isHindi ? 'नगर निगम द्वारा की गई कार्रवाई' : 'Live tracking with Municipal Enforcement'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('report-issue')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>{isHindi ? 'नयी रिपोर्ट करें' : '+ Report New'}</span>
          </button>
        </div>

        <div className="space-y-3">
          {reports.slice(0, 2).map((rep) => (
            <div 
              key={rep.id} 
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  rep.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {rep.status === 'Resolved' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">{rep.categoryLabel}</h4>
                    <span className="font-mono text-[10px] text-slate-400">#{rep.id}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{rep.location}</p>
                  {rep.statusNote && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      ✓ {rep.statusNote}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  rep.status === 'Resolved' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : rep.status === 'In Review'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-sky-100 text-sky-800'
                }`}>
                  {rep.status}
                </span>
                <span className="text-[11px] text-slate-400">{rep.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Swachh & Green Citizen Tip */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-3 text-xs">
        <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-emerald-950">
            {isHindi ? 'आज का हरित विचार (Daily Green Action)' : 'Today\'s Clean City Tip'}
          </h4>
          <p className="text-emerald-800 mt-0.5 leading-relaxed">
            {isHindi 
              ? 'दूध या छाछ की थैलियों को नीले डिब्बे में डालने से पहले हमेशा थोड़ा धोकर सुखाएं। इससे प्लास्टिक रीसाइक्लिंग 4 गुना अधिक कुशल हो जाती है।'
              : 'Always rinse and air-dry milk pouches or juice boxes before tossing them into the Blue Bin. Clean dry plastics can be transformed into recycled park benches!'}
          </p>
        </div>
      </div>

    </div>
  );
};
