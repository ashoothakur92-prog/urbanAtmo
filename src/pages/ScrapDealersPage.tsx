import React, { useState } from 'react';
import { 
  Store, 
  MapPin, 
  Star, 
  Phone, 
  Navigation, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Search, 
  X,
  Compass,
  Layers
} from 'lucide-react';
import { MOCK_DEALERS } from '../data/mockData';
import { ScrapDealer } from '../types';

interface ScrapDealersPageProps {
  isHindi: boolean;
}

export const ScrapDealersPage: React.FC<ScrapDealersPageProps> = ({ isHindi }) => {
  const [dealers, setDealers] = useState<ScrapDealer[]>(MOCK_DEALERS);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Modals
  const [callModalDealer, setCallModalDealer] = useState<ScrapDealer | null>(null);
  const [directionsDealer, setDirectionsDealer] = useState<ScrapDealer | null>(null);

  const materialsFilterOptions = [
    'All',
    'Paper & Cardboard',
    'Plastics',
    'Iron & Metal',
    'E-Waste',
    'Old Clothes'
  ];

  const filteredDealers = dealers.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = d.distanceKm <= maxDistance;
    const matchesRating = d.rating >= minRating;
    const matchesMaterial = selectedMaterial === 'All' || d.materials.some(m => m.toLowerCase().includes(selectedMaterial.toLowerCase()));

    return matchesSearch && matchesDistance && matchesRating && matchesMaterial;
  });

  return (
    <div id="scrap-dealers-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-7">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-2">
          <Store className="h-3.5 w-3.5 text-teal-600" />
          <span>{isHindi ? 'निकटतम कबाड़ीवाले व केंद्र' : 'Verified Recyclers Network'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isHindi ? 'निकटतम कबाड़ीवाले एवं रिसाइक्लिंग केंद्र' : 'Nearby Scrap Dealers & Recycling Centres'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isHindi 
            ? 'गुरुग्राम व दिल्ली एनसीआर में सत्यापित कबाड़ीवाले खोजें, सीधे कॉल करें या दिशा-निर्देश प्राप्त करें।'
            : 'Find verified scrap dealers, municipal kiosks, and e-waste collection points in Gurugram / Delhi NCR.'}
        </p>
      </div>

      {/* Interactive Map Visual Placeholder */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 h-64 sm:h-72">
        {/* Stylized vector map background representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 opacity-90" />
        
        {/* Grid lines simulating map streets */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* User Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="relative flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-white items-center justify-center text-white text-[9px] font-bold">
              You
            </span>
          </div>
          <span className="text-[10px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-full mt-1 border border-slate-700">
            Sector 14, Gurugram
          </span>
        </div>

        {/* Dealer Markers on Map */}
        {dealers.map((d, index) => {
          const positions = [
            { top: '30%', left: '35%' },
            { top: '65%', left: '60%' },
            { top: '25%', left: '70%' },
            { top: '75%', left: '25%' },
            { top: '40%', left: '80%' },
          ];
          const pos = positions[index % positions.length];

          return (
            <button
              key={d.id}
              onClick={() => setDirectionsDealer(d)}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white shadow-lg hover:scale-125 transition-transform text-slate-800 flex items-center gap-1 border border-emerald-500 cursor-pointer group z-10"
              title={d.name}
            >
              <Store className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px] font-bold px-1 hidden sm:inline max-w-[80px] truncate text-slate-800">
                {d.name.split(' ')[0]}
              </span>
            </button>
          );
        })}

        {/* Map Header Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white text-xs flex items-center gap-1.5 pointer-events-auto">
            <Compass className="h-3.5 w-3.5 text-emerald-400" />
            <span>Interactive Eco-Map (Gurugram Ward 14)</span>
          </div>
          <span className="text-[10px] bg-emerald-500/90 text-white px-2 py-1 rounded-lg font-bold">
            {filteredDealers.length} Active Hubs
          </span>
        </div>

        {/* Map Footer status */}
        <div className="absolute bottom-3 left-3 text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg">
          Click any pin on map or list below for turn-by-turn navigation
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dealers by name, sector, or market..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          
          {/* Material categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Material:</span>
            </span>
            {materialsFilterOptions.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedMaterial === mat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>

          {/* Distance Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Max Distance:</span>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="bg-slate-100 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700 border-none cursor-pointer focus:outline-none"
            >
              <option value={1}>Within 1 km</option>
              <option value={3}>Within 3 km</option>
              <option value={5}>Within 5 km</option>
            </select>
          </div>

        </div>
      </div>

      {/* Dealer Cards List */}
      <div className="space-y-4">
        {filteredDealers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 text-slate-400">
            <Store className="h-10 w-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium">No dealers match your current filters.</p>
            <button
              onClick={() => { setSelectedMaterial('All'); setMaxDistance(5); setSearchQuery(''); }}
              className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Dealer Info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {dealer.name}
                  </h3>
                  {dealer.verified && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{dealer.address}</span>
                </p>

                {/* Rating and Distance */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{dealer.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({dealer.reviewsCount})</span>
                  </div>

                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {dealer.distance}
                  </span>

                  <span className={`text-[11px] font-medium ${dealer.isOpen ? 'text-emerald-600' : 'text-slate-400'}`}>
                    • {dealer.openStatus}
                  </span>
                </div>

                {/* Accepted Materials Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dealer.materials.map((mat, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Call and Directions */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button
                  onClick={() => setCallModalDealer(dealer)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Dealer</span>
                </button>

                <button
                  onClick={() => setDirectionsDealer(dealer)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Directions</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Call Dealer Modal Simulator */}
      {callModalDealer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Direct Contact</h3>
              <button 
                onClick={() => setCallModalDealer(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <Phone className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">{callModalDealer.name}</h4>
              <p className="font-mono font-extrabold text-lg text-emerald-700">{callModalDealer.phone}</p>
              <p className="text-xs text-slate-400">{callModalDealer.timing}</p>
            </div>

            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-2xl">
              Ask about today's live rate for paper, cardboard, copper or electronic scrap.
            </p>

            <div className="flex gap-2">
              <a
                href={`tel:${callModalDealer.phone}`}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center shadow-xs cursor-pointer block"
              >
                Open Phone Dialer
              </a>
              <button
                onClick={() => setCallModalDealer(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directions Modal Simulator */}
      {directionsDealer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-1.5">
                <Navigation className="h-4 w-4 text-emerald-600" />
                <span>Route Preview</span>
              </h3>
              <button 
                onClick={() => setDirectionsDealer(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
              <h4 className="font-bold text-sm text-emerald-950">{directionsDealer.name}</h4>
              <p className="text-xs text-emerald-800">{directionsDealer.address}</p>
              <div className="pt-2 flex items-center gap-3 text-xs font-bold text-emerald-700">
                <span>Distance: {directionsDealer.distance}</span>
                <span>•</span>
                <span>ETA: ~6 mins driving / 14 mins walk</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">1.</span>
                <span>Head South on Sector 14 Main Road toward Old DLF</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">2.</span>
                <span>Turn right at Huda Market circle; destination on left</span>
              </div>
            </div>

            <button
              onClick={() => setDirectionsDealer(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
