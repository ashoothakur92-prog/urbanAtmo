import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Award, 
  FileText, 
  Recycle, 
  Leaf, 
  Moon, 
  Sun, 
  Bell, 
  LogOut, 
  Edit3, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  TreePine,
  Sparkles,
  Phone,
  Mail,
  RotateCcw
} from 'lucide-react';
import { UserProfile, Badge } from '../types';
import { BADGES_DATA } from '../data/mockData';

interface ProfilePageProps {
  user: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onResetData: () => void;
  isHindi: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onUpdateProfile,
  onResetData,
  isHindi
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const toggleDarkMode = () => {
    const updated = { ...formData, darkMode: !formData.darkMode };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const toggleHighAqi = () => {
    const updated = { ...formData, highAqiAlerts: !formData.highAqiAlerts };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const toggleReminders = () => {
    const updated = { ...formData, recyclingReminders: !formData.recyclingReminders };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  return (
    <div id="profile-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-44 h-44 rounded-full bg-emerald-50 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
          {/* Avatar with Level Ring */}
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
            />
            <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-emerald-600 text-white shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{user.sector}, {user.city}</span>
                </p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="self-center sm:self-auto px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-emerald-600" />
                <span>{user.points} GreenPoints</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                Level {user.level}: {user.levelTitle}
              </span>

              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                {user.reportsResolved} of {user.reportsSubmitted} Reports Resolved
              </span>
            </div>
          </div>
        </div>

        {/* Success alert */}
        {savedNotice && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        {/* Editable Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-in slide-in-from-top-3">
            <h3 className="font-bold text-sm text-slate-800">Edit Citizen Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ward / Sector</label>
                <input
                  type="text"
                  required
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* "My Environmental Impact" Visual Progress Dashboard */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isHindi ? 'मेरा पर्यावरण प्रभाव (Environmental Impact)' : 'My Lifetime Environmental Impact'}
              </h2>
              <p className="text-xs text-slate-500">
                Civic verified telemetry since joining UrbanAtmo
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            Ward 14 Hero
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-xs text-emerald-900 font-medium">Recycled Material</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-800">{user.wasteRecycledKg}</span>
              <span className="text-xs font-bold text-emerald-600">kg</span>
            </div>
            <p className="text-[10px] text-emerald-700 mt-1">Paper, plastics & metals</p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
            <span className="text-xs text-teal-900 font-medium">CO₂ Prevented</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-teal-800">{user.co2SavedKg}</span>
              <span className="text-xs font-bold text-teal-600">kg</span>
            </div>
            <p className="text-[10px] text-teal-700 mt-1">~5.2 trees planted equiv.</p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
            <span className="text-xs text-sky-900 font-medium">Scrap Sold Payout</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-sky-800">₹{user.totalEarningsInr}</span>
            </div>
            <p className="text-[10px] text-sky-700 mt-1">Direct cash earned</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <span className="text-xs text-amber-900 font-medium">Civic Interventions</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-800">{user.reportsResolved}</span>
              <span className="text-xs font-bold text-amber-600">fixed</span>
            </div>
            <p className="text-[10px] text-amber-700 mt-1">Cleared by municipal vans</p>
          </div>
        </div>

        {/* Visual Progress Bars */}
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Zero-Waste Household Goal (50 kg target)</span>
              <span className="font-bold text-emerald-700">{user.wasteRecycledKg} / 50 kg (97%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-[97%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
              <span>Community Clean Air Shield (10 resolved reports target)</span>
              <span className="font-bold text-teal-700">{user.reportsResolved} / 10 (50%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full w-[50%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Badges Earned Strip */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Earned Badges</h3>
          <span className="text-xs font-bold text-emerald-700">4 Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES_DATA.filter(b => b.unlocked).map((b) => (
            <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-xs font-extrabold text-slate-900 block">{b.title}</span>
              <span className="text-[10px] text-emerald-700 font-semibold">{b.unlockedDate}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences & Settings */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Preferences & Alerts</h3>

        <div className="space-y-3">
          {/* Dark Mode UI Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-2xs">
                {formData.darkMode ? <Moon className="h-4 w-4 text-purple-600" /> : <Sun className="h-4 w-4 text-amber-500" />}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Dark Mode Interface</h4>
                <p className="text-[11px] text-slate-500">Toggle nighttime low-emission theme</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                formData.darkMode ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                formData.darkMode ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* High AQI Alerts */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-2xs">
                <Bell className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Severe AQI Emergency Notifications</h4>
                <p className="text-[11px] text-slate-500">Alert me when Gurugram AQI crosses 200 (Unhealthy)</p>
              </div>
            </div>
            <button
              onClick={toggleHighAqi}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                formData.highAqiAlerts ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                formData.highAqiAlerts ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Weekly Recycling Reminders */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-2xs">
                <Recycle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">Weekly Kabadi / Scrap Reminder</h4>
                <p className="text-[11px] text-slate-500">Prompt on Sunday mornings to bundle cardboard & bottles</p>
              </div>
            </div>
            <button
              onClick={toggleReminders}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                formData.recyclingReminders ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                formData.recyclingReminders ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Reset & Logout Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onResetData}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo Data to Initial Defaults</span>
          </button>

          <button
            onClick={() => alert('Logged out. You can sign in anytime as Alex Sharma.')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

    </div>
  );
};
