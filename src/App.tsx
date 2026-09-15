import React, { useState } from 'react';
import { 
  PageType, 
  UserProfile, 
  EnvironmentalReport, 
  ScrapBooking, 
  EcoReward,
  AQIData 
} from './types';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_CITY_AQI, 
  INITIAL_REPORTS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

// Pages
import { Dashboard } from './pages/Dashboard';
import { ReportIssuePage } from './pages/ReportIssuePage';
import { WasteSegregationPage } from './pages/WasteSegregationPage';
import { SellJunkPage } from './pages/SellJunkPage';
import { ScrapDealersPage } from './pages/ScrapDealersPage';
import { RewardsPage } from './pages/RewardsPage';
import { AQIGuidePage } from './pages/AQIGuidePage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [reports, setReports] = useState<EnvironmentalReport[]>(INITIAL_REPORTS);
  const [selectedCity, setSelectedCity] = useState<string>('Gurugram');
  const [isHindi, setIsHindi] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const currentAQIData = INITIAL_CITY_AQI[selectedCity] || INITIAL_CITY_AQI['Gurugram'];

  const showToast = (type: 'success' | 'info' | 'reward', title: string, message: string, points?: number) => {
    setToast({
      id: Date.now().toString(),
      type,
      title,
      message,
      points
    });
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLanguage = () => {
    setIsHindi(!isHindi);
    showToast(
      'info',
      isHindi ? 'Switched to English' : 'हिन्दी भाषा सक्रिय की गई',
      isHindi ? 'Interface set to English mode' : 'नागरिक सुविधाएं अब हिन्दी में उपलब्ध हैं'
    );
  };

  // Report environmental issue handler
  const handleSubmitReport = (newReport: EnvironmentalReport) => {
    setReports(prev => [newReport, ...prev]);
    
    // Award 50 points to citizen
    const updatedPoints = user.points + 50;
    const updatedUser: UserProfile = {
      ...user,
      points: updatedPoints,
      reportsSubmitted: user.reportsSubmitted + 1
    };
    setUser(updatedUser);

    showToast(
      'success',
      isHindi ? 'शिकायत दर्ज हुई (+50 अंक)' : 'Environmental Report Lodged',
      isHindi ? `आईडी #${newReport.id} नगर निगम को प्रेषित की गई` : `Assigned ID #${newReport.id} to Municipal Ward Inspector`,
      50
    );
  };

  // Sell Junk / Scrap booking handler
  const handleBookPickup = (booking: ScrapBooking) => {
    const totalKg = booking.items.reduce((acc, item) => acc + item.weightKg, 0);
    const pointsAwarded = booking.pointsEarned;

    const updatedUser: UserProfile = {
      ...user,
      points: user.points + pointsAwarded,
      wasteRecycledKg: parseFloat((user.wasteRecycledKg + totalKg).toFixed(1)),
      co2SavedKg: parseFloat((user.co2SavedKg + (totalKg * 1.6)).toFixed(1)),
      totalEarningsInr: user.totalEarningsInr + booking.totalEarnings
    };
    setUser(updatedUser);

    showToast(
      'reward',
      isHindi ? 'कबाड़ पिकअप शेड्यूल्ड!' : 'Scrap Pickup Scheduled!',
      isHindi 
        ? `₹${booking.totalEarnings} अनुमानित राशि। +${pointsAwarded} ग्रीनपॉइंट्स जोड़े गए!` 
        : `Est. payout ₹${booking.totalEarnings}. Earned +${pointsAwarded} GreenPoints!`,
      pointsAwarded
    );
  };

  // Rewards redemption handler
  const handleRedeemReward = (reward: EcoReward) => {
    const updatedUser: UserProfile = {
      ...user,
      points: Math.max(0, user.points - reward.pointsCost)
    };
    setUser(updatedUser);

    showToast(
      'success',
      isHindi ? 'रिवॉर्ड रिडीम हुआ!' : 'Reward Successfully Claimed!',
      isHindi ? `${reward.title} कोड आपके प्रोफाइल में सुरक्षित है` : `${reward.title} unlocked. Code ready to use!`
    );
  };

  // Quiz or bonus point award handler
  const handleEarnPoints = (points: number, reason: string) => {
    setUser(prev => ({ ...prev, points: prev.points + points }));
    showToast('reward', 'GreenPoints Awarded!', reason, points);
  };

  // Reset all state to defaults
  const handleResetData = () => {
    setUser(INITIAL_USER_PROFILE);
    setReports(INITIAL_REPORTS);
    setSelectedCity('Gurugram');
    showToast('info', 'Demo Data Reset', 'Restored to original initial state.');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      user.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#f7faf8] text-slate-900'
    }`}>
      
      {/* Toast Alert Component */}
      <NotificationToast toast={toast} onClose={() => setToast(null)} />

      {/* Desktop Responsive Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        isHindi={isHindi}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <Dashboard
            user={user}
            aqiData={currentAQIData}
            reports={reports}
            onNavigate={handleNavigate}
            onCityChange={(city) => setSelectedCity(city)}
            isHindi={isHindi}
          />
        )}

        {currentPage === 'report-issue' && (
          <ReportIssuePage
            reports={reports}
            onSubmitReport={handleSubmitReport}
            isHindi={isHindi}
          />
        )}

        {currentPage === 'waste-segregation' && (
          <WasteSegregationPage
            onEarnPoints={handleEarnPoints}
            isHindi={isHindi}
          />
        )}

        {currentPage === 'sell-junk' && (
          <SellJunkPage
            onBookPickup={handleBookPickup}
            isHindi={isHindi}
          />
        )}

        {currentPage === 'scrap-dealers' && (
          <ScrapDealersPage
            isHindi={isHindi}
          />
        )}

        {currentPage === 'rewards' && (
          <RewardsPage
            user={user}
            onRedeemReward={handleRedeemReward}
            isHindi={isHindi}
          />
        )}

        {currentPage === 'aqi-guide' && (
          <AQIGuidePage
            isHindi={isHindi}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            user={user}
            onUpdateProfile={(updated) => setUser(updated)}
            onResetData={handleResetData}
            isHindi={isHindi}
          />
        )}
      </main>

      {/* Desktop Footer */}
      <footer className="hidden md:block py-6 border-t border-slate-200/80 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">UrbanAtmo</span>
            <span>•</span>
            <span>Smart India Hackathon Project 2026</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">“Breathe Better. Live Greener.”</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <button onClick={() => handleNavigate('aqi-guide')} className="hover:text-emerald-700 cursor-pointer">
              AQI Scale Guide
            </button>
            <button onClick={() => handleNavigate('waste-segregation')} className="hover:text-emerald-700 cursor-pointer">
              Bin Protocols
            </button>
            <button onClick={() => handleNavigate('scrap-dealers')} className="hover:text-emerald-700 cursor-pointer">
              Verified Scrap Hubs
            </button>
            <button onClick={() => handleNavigate('report-issue')} className="hover:text-emerald-700 cursor-pointer">
              Civic Enforcement
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Bottom Navigation Bar matching Screenshot 1 & 2 */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isHindi={isHindi}
      />

    </div>
  );
}
