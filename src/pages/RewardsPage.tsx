import React, { useState } from 'react';
import { 
  Award, 
  Coins, 
  Trophy, 
  Sprout, 
  Recycle, 
  Sparkles, 
  Crown, 
  Wind, 
  CheckCircle2, 
  Lock, 
  Gift, 
  ArrowRight, 
  Users, 
  Building2, 
  TreePine,
  ExternalLink,
  Flame,
  FileCheck
} from 'lucide-react';
import { BADGES_DATA, LEADERBOARD_CITIZENS, LEADERBOARD_COLLEGES, LEADERBOARD_WARDS, ECO_REWARDS } from '../data/mockData';
import { Badge, EcoReward, UserProfile } from '../types';

interface RewardsPageProps {
  user: UserProfile;
  onRedeemReward: (reward: EcoReward) => void;
  isHindi: boolean;
}

export const RewardsPage: React.FC<RewardsPageProps> = ({
  user,
  onRedeemReward,
  isHindi
}) => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'citizens' | 'colleges' | 'wards'>('citizens');
  const [rewardsList, setRewardsList] = useState<EcoReward[]>(() => {
    try {
      const saved = localStorage.getItem('urbanatmo_rewards_list');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ECO_REWARDS;
  });
  const [selectedRewardToRedeem, setSelectedRewardToRedeem] = useState<EcoReward | null>(null);
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  // Persist rewards list across refreshes
  React.useEffect(() => {
    try {
      localStorage.setItem('urbanatmo_rewards_list', JSON.stringify(rewardsList));
    } catch {}
  }, [rewardsList]);

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="h-6 w-6 text-emerald-600" />;
      case 'Recycle': return <Recycle className="h-6 w-6 text-blue-600" />;
      case 'Award': return <Award className="h-6 w-6 text-amber-500" />;
      case 'Crown': return <Crown className="h-6 w-6 text-purple-600" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6 text-teal-600" />;
      case 'Wind': return <Wind className="h-6 w-6 text-sky-500" />;
      default: return <Award className="h-6 w-6 text-emerald-600" />;
    }
  };

  const handleRedeem = (reward: EcoReward) => {
    if (user.points < reward.pointsCost) return;
    setSelectedRewardToRedeem(reward);
    setClaimedCode(reward.code || 'URBAN-ECO-CLAIMED');
    onRedeemReward(reward);
    
    // mark local claimed
    setRewardsList(prev => prev.map(r => r.id === reward.id ? { ...r, claimed: true } : r));
  };

  return (
    <div id="rewards-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <Trophy className="h-3.5 w-3.5 text-amber-300" />
              <span>Smart India Civic Gamification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isHindi ? 'ग्रीनपॉइंट्स और नागरिक पुरस्कार' : 'GreenPoints™ & Citizen Rewards'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-md">
              {isHindi 
                ? 'कचरा अलग करने, प्रदूषण रिपोर्ट करने और रीसाइक्लिंग करने पर अंक अर्जित करें और पुरस्कार जीतें।'
                : 'Turn your everyday green actions into tangible eco-rewards, sapling sponsorships, and official civic honor.'}
            </p>
          </div>

          {/* Points Balance Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center min-w-[180px] shadow-lg">
            <span className="text-xs font-semibold text-emerald-200 block uppercase tracking-wider">
              {isHindi ? 'वर्तमान ग्रीनपॉइंट्स' : 'Total GreenPoints'}
            </span>
            <div className="flex items-center justify-center gap-1.5 my-1">
              <Award className="h-7 w-7 text-amber-300 fill-amber-300/30" />
              <span className="text-4xl font-black font-mono tracking-tight">{user.points}</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 inline-block mt-1">
              Level {user.level}: {user.levelTitle}
            </span>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/15">
          <div className="flex items-center justify-between text-xs font-medium text-emerald-100 mb-1.5">
            <span>Level 3: Waste Warrior</span>
            <span className="font-mono font-bold">1,450 / 2,000 pts (72% to Eco Hero)</span>
          </div>
          <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full w-[72%] transition-all duration-1000" />
          </div>
        </div>
      </div>

      {/* How to Earn Points Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-600" />
          <span>{isHindi ? 'ग्रीनपॉइंट्स कैसे कमाएं?' : 'Earn GreenPoints from Civic Actions'}</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              +50
            </div>
            <h4 className="font-bold text-xs text-slate-800">Report Issue</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Validated hazard reports</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              +10/kg
            </div>
            <h4 className="font-bold text-xs text-slate-800">Recycle Junk</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Paper, plastic, metal scrap</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              +30
            </div>
            <h4 className="font-bold text-xs text-slate-800">Segregation Quiz</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Test waste knowledge</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-2 font-bold text-xs">
              +100
            </div>
            <h4 className="font-bold text-xs text-slate-800">Clean-up Drives</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Community volunteering</p>
          </div>
        </div>
      </section>

      {/* Badges Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {isHindi ? 'आपके नागरिक बैज (Citizen Badges)' : 'Citizen Badges & Achievements'}
            </h2>
            <p className="text-xs text-slate-500">
              Unlock prestigious credentials recognized by municipal authorities.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            4 / 6 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {BADGES_DATA.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/70 border-slate-200/60 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-2xl ${badge.unlocked ? 'bg-emerald-50 shadow-2xs' : 'bg-slate-200'}`}>
                    {getBadgeIcon(badge.icon)}
                  </div>
                  {badge.unlocked ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>{badge.progressPercent}%</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                  {isHindi ? badge.titleHi : badge.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-medium text-slate-400">
                {badge.unlockedDate || `${badge.progressPercent}% Completed`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Leaderboard */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>{isHindi ? 'कम्युनिटी लीडरबोर्ड' : 'Community Leaderboard'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {isHindi ? 'शीर्ष नागरिक, कॉलेज और वार्ड रैंकिंग' : 'Top sustainability champions in Gurugram / Delhi NCR'}
            </p>
          </div>

          {/* Leaderboard Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-full self-start sm:self-center">
            <button
              onClick={() => setActiveLeaderboardTab('citizens')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeLeaderboardTab === 'citizens' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Local Citizens
            </button>
            <button
              onClick={() => setActiveLeaderboardTab('colleges')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeLeaderboardTab === 'colleges' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Colleges
            </button>
            <button
              onClick={() => setActiveLeaderboardTab('wards')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeLeaderboardTab === 'wards' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Wards
            </button>
          </div>
        </div>

        {/* Citizens List */}
        {activeLeaderboardTab === 'citizens' && (
          <div className="space-y-2">
            {LEADERBOARD_CITIZENS.map((userItem) => {
              const displayName = userItem.isCurrentUser ? `${user.name} (You)` : userItem.name;
              const displayPoints = userItem.isCurrentUser ? user.points : userItem.points;
              return (
                <div
                  key={userItem.rank}
                  className={`p-3 sm:p-4 rounded-2xl flex items-center justify-between transition-all ${
                    userItem.isCurrentUser
                      ? 'bg-emerald-50 border-2 border-emerald-400 font-semibold'
                      : 'bg-slate-50/70 border border-slate-100 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-black text-sm ${
                      userItem.rank === 1 ? 'text-amber-500 font-extrabold' :
                      userItem.rank === 2 ? 'text-slate-400 font-bold' :
                      userItem.rank === 3 ? 'text-amber-700 font-bold' : 'text-slate-500'
                    }`}>
                      #{userItem.rank}
                    </span>
                    <img
                      src={userItem.isCurrentUser && user.avatarUrl ? user.avatarUrl : userItem.avatar}
                      alt={displayName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {displayName}
                      </h4>
                      <p className="text-[11px] text-slate-500">{userItem.locality}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-700">
                      {displayPoints} pts
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {userItem.badgesCount} badges
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Colleges List */}
        {activeLeaderboardTab === 'colleges' && (
          <div className="space-y-2">
            {LEADERBOARD_COLLEGES.map((col) => (
              <div
                key={col.rank}
                className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-sm text-slate-700">
                    #{col.rank}
                  </span>
                  <div className="p-2 rounded-xl bg-white shadow-2xs">
                    <Building2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{col.name}</h4>
                    <p className="text-[11px] text-slate-500">{col.locality} • {col.members} student volunteers</p>
                  </div>
                </div>
                <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-700">
                  {col.points.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Municipal Wards List */}
        {activeLeaderboardTab === 'wards' && (
          <div className="space-y-2">
            {LEADERBOARD_WARDS.map((ward) => (
              <div
                key={ward.rank}
                className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-bold text-sm text-slate-700">
                    #{ward.rank}
                  </span>
                  <div className="p-2 rounded-xl bg-white shadow-2xs">
                    <Recycle className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{ward.name}</h4>
                    <p className="text-[11px] text-slate-500">{ward.locality} • {ward.wasteDivertedKg} kg diverted</p>
                  </div>
                </div>
                <span className="font-mono font-extrabold text-xs sm:text-sm text-emerald-700">
                  {ward.points.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Rewards Catalog */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isHindi ? 'रिवॉर्ड्स कैटलॉग (Redeemable Rewards)' : 'Redeem GreenRewards Catalog'}
          </h2>
          <p className="text-xs text-slate-500">
            Use your accumulated GreenPoints for certified organic vouchers, trees planted, and summit passes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewardsList.map((rew) => {
            const canAfford = user.points >= rew.pointsCost;
            return (
              <div
                key={rew.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                      {rew.provider}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 font-mono bg-emerald-100/60 px-2.5 py-1 rounded-full">
                      {rew.pointsCost} pts
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {rew.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {rew.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{rew.expiresIn}</span>
                  
                  {rew.claimed ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      Claimed: {rew.code}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRedeem(rew)}
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        canAfford 
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Now' : 'Need more pts'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Claimed Modal Simulator */}
      {selectedRewardToRedeem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Gift className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">Reward Claimed!</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedRewardToRedeem.title}</p>
            </div>

            <div className="p-3 bg-slate-100 rounded-2xl border border-dashed border-slate-300">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Your Voucher / Certificate Code:</span>
              <span className="font-mono font-black text-lg text-emerald-800 tracking-wider">
                {claimedCode}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Show this code at the partner store, during municipal verification, or apply online at checkout.
            </p>

            <button
              onClick={() => setSelectedRewardToRedeem(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer shadow-md"
            >
              Done & Save to Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
