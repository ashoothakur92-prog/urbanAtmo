import React, { useState } from 'react';
import { 
  Recycle, 
  Truck, 
  Building, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Coins, 
  Info, 
  Plus, 
  Minus, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { SCRAP_MATERIALS } from '../data/mockData';
import { ScrapBooking, ScrapMaterial } from '../types';

interface SellJunkPageProps {
  onBookPickup: (booking: ScrapBooking) => void;
  isHindi: boolean;
}

export const SellJunkPage: React.FC<SellJunkPageProps> = ({
  onBookPickup,
  isHindi
}) => {
  // Quantities state per material id (in kg)
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'paper-news': 10,
    'paper-carton': 5,
    'plastic-pet': 3,
    'metal-iron': 4
  });

  const [serviceType, setServiceType] = useState<'pickup' | 'dropoff'>('pickup');
  const [address, setAddress] = useState('House 42, Sector 14, Near Community Centre, Gurugram');
  const [pincode, setPincode] = useState('122001');
  const [preferredDate, setPreferredDate] = useState('Tomorrow (Sunday)');
  const [preferredSlot, setPreferredSlot] = useState('10:00 AM - 1:00 PM');
  const [notes, setNotes] = useState('Please bring digital weighing scale.');
  const [bookingConfirmation, setBookingConfirmation] = useState<ScrapBooking | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleDirectInput = (id: string, value: string) => {
    const num = Math.max(0, parseFloat(value) || 0);
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  // Calculate totals
  const totalWeight = Object.entries(quantities).reduce<number>((acc, [_, qty]) => acc + Number(qty), 0);

  const totalEstimatedEarnings = SCRAP_MATERIALS.reduce((acc, mat) => {
    const qty = quantities[mat.id] || 0;
    return acc + (qty * mat.ratePerKg);
  }, 0);

  // Bonus for self-dropoff (₹2 extra per kg)
  const finalEarnings = serviceType === 'dropoff' 
    ? totalEstimatedEarnings + (totalWeight * 2) 
    : totalEstimatedEarnings;

  const pointsToEarn = Math.round(totalWeight * 10);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalWeight <= 0) return;

    const itemsBooked = SCRAP_MATERIALS
      .filter(m => (quantities[m.id] || 0) > 0)
      .map(m => ({
        materialId: m.id,
        materialName: m.name,
        weightKg: quantities[m.id],
        estimatedPrice: quantities[m.id] * m.ratePerKg
      }));

    const booking: ScrapBooking = {
      id: `KAB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      items: itemsBooked,
      totalEarnings: finalEarnings,
      pointsEarned: pointsToEarn,
      serviceType,
      address: serviceType === 'pickup' ? `${address}, Pincode: ${pincode}` : 'Self Drop-off at Sector 14 Verified Hub',
      date: preferredDate,
      timeSlot: preferredSlot,
      status: 'Scheduled',
      createdAt: 'Today'
    };

    onBookPickup(booking);
    setBookingConfirmation(booking);
  };

  return (
    <div id="sell-junk-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <Coins className="h-3.5 w-3.5 text-amber-600" />
          <span>{isHindi ? 'घर बैठे कबाड़ बेचें' : 'Smart Doorstep Kabadiwala'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'कबाड़ / रीसाइक्लेबल बेचें' : 'Sell Junk & Recyclables for Cash'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isHindi 
            ? 'अखबार, गत्ता, प्लास्टिक और धातुओं का सही मूल्य प्राप्त करें और लैंडफिल प्रदूषण रोकें।'
            : 'Select materials, get live estimated prices with certified digital weighing scales, and earn cash + GreenPoints.'}
        </p>

        {/* Demo Disclaimer Pill */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px]">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          <span>Note: Listed rates are illustrative demo estimates based on NCR wholesale scrap markets.</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingConfirmation && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-xl space-y-4 animate-in zoom-in-95">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-950">
                  {isHindi ? 'कबाड़ पिकअप सफलतापूर्वक बुक हुआ!' : 'Recycling Pickup Confirmed!'}
                </h3>
                <p className="text-xs text-emerald-800">
                  Booking Reference: <span className="font-mono font-bold">#{bookingConfirmation.id}</span>
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">
              {bookingConfirmation.serviceType === 'pickup' ? 'Free Doorstep Pickup' : 'Self Drop-off'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-emerald-100 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Estimated Payout:</span>
              <span className="text-lg font-extrabold text-emerald-700">₹{bookingConfirmation.totalEarnings}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">GreenPoints Bonus:</span>
              <span className="text-lg font-extrabold text-amber-600">+{bookingConfirmation.pointsEarned} pts</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Scheduled Date:</span>
              <span className="text-sm font-bold text-slate-800">{bookingConfirmation.date} ({bookingConfirmation.timeSlot})</span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            📍 Address: <span className="font-semibold text-slate-800">{bookingConfirmation.address}</span>. A verified collector will call 15 minutes before arrival.
          </p>

          <button
            onClick={() => setBookingConfirmation(null)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done & Book Another
          </button>
        </div>
      )}

      {/* Main Grid: Left Materials Selection, Right Dynamic Earnings Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Material Selector */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Recycle className="h-5 w-5 text-emerald-600" />
              <span>{isHindi ? '1. सामग्री व मात्रा चुनें' : '1. Select Materials & Quantity'}</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {totalWeight} kg total selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCRAP_MATERIALS.map((mat) => {
              const qty = quantities[mat.id] || 0;
              const subtotal = qty * mat.ratePerKg;

              return (
                <div 
                  key={mat.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    qty > 0 
                      ? 'bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-400/40 shadow-xs' 
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">
                        {mat.name}
                      </h4>
                      <span className="text-xs font-bold text-emerald-700 mt-0.5 inline-block">
                        ₹{mat.ratePerKg} / {mat.unit}
                      </span>
                    </div>

                    {mat.popular && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(mat.id, -1)}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition-colors cursor-pointer"
                        disabled={qty <= 0}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>

                      <div className="relative w-16 text-center">
                        <input
                          type="number"
                          min="0"
                          value={qty === 0 ? '' : qty}
                          onChange={(e) => handleDirectInput(mat.id, e.target.value)}
                          placeholder="0"
                          className="w-full text-center font-extrabold text-slate-900 bg-transparent py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded"
                        />
                        <span className="text-[10px] text-slate-400 absolute right-1 top-2">kg</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateQuantity(mat.id, 1)}
                        className="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Est. Subtotal</span>
                      <span className="text-xs font-extrabold text-slate-800">
                        ₹{subtotal}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Dynamic Live Bill & Booking Form */}
        <div className="space-y-5">
          
          {/* Earnings Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Estimated Payout
              </span>
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Receipt className="h-4 w-4" />
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-700">
                ₹{finalEarnings}
              </span>
              <p className="text-xs text-slate-500 mt-1">
                For approximately <span className="font-bold text-slate-800">{totalWeight} kg</span> recyclable scrap
              </p>
            </div>

            {/* GreenPoints Incentive */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>GreenPoints Reward:</span>
              </div>
              <span className="font-bold text-amber-700">+{pointsToEarn} pts</span>
            </div>

            {/* Service Mode Toggle: Pickup vs Dropoff */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Select Service Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('pickup')}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'pickup'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Truck className="h-4 w-4 mb-1" />
                  <span>Free Doorstep Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('dropoff')}
                  className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex flex-col justify-between ${
                    serviceType === 'dropoff'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Building className="h-4 w-4 mb-1" />
                  <span>Self Hub Drop-off (+₹2/kg bonus)</span>
                </button>
              </div>
            </div>

            {/* Booking Form Fields */}
            <form onSubmit={handleConfirmBooking} className="space-y-3 pt-2">
              {serviceType === 'pickup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pickup Address:
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Full street address, apartment, sector..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pincode:
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Date:
                  </label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Today (Within 3 hrs)">Today (Express)</option>
                    <option value="Tomorrow (Sunday)">Tomorrow (Sunday)</option>
                    <option value="Monday">Monday</option>
                    <option value="Wednesday">Wednesday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Time Slot:
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="9:00 AM - 12:00 PM">9am - 12pm (Morning)</option>
                    <option value="12:00 PM - 3:00 PM">12pm - 3pm (Afternoon)</option>
                    <option value="3:00 PM - 6:00 PM">3pm - 6pm (Evening)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={totalWeight <= 0}
                className="w-full mt-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{serviceType === 'pickup' ? 'Confirm Doorstep Pickup' : 'Generate Drop-off Pass'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Certified digital weighing scales used</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
