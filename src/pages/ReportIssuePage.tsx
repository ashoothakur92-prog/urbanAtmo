import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Trash2, 
  Droplet, 
  Wind, 
  UploadCloud, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileText, 
  Camera, 
  Crosshair,
  Filter,
  Image as ImageIcon,
  X,
  RefreshCw
} from 'lucide-react';
import { EnvironmentalReport, IssueCategory, UrgencyLevel, ReportStatus } from '../types';

interface ReportIssuePageProps {
  reports: EnvironmentalReport[];
  onSubmitReport: (report: EnvironmentalReport) => void;
  isHindi: boolean;
}

export const ReportIssuePage: React.FC<ReportIssuePageProps> = ({
  reports,
  onSubmitReport,
  isHindi
}) => {
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('garbage_dumping');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Sector 14, Main Market Road, Gurugram');
  const [urgency, setUrgency] = useState<UrgencyLevel>('High');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'form' | 'my-reports'>('form');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startDirectCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => console.warn('Video play error:', err));
        }
      } else {
        setCameraError('Camera API is not supported on this device/browser.');
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(err?.message || 'Unable to access camera. Please allow camera permissions.');
    }
  };

  const stopDirectCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setPhotoPreview(dataUrl);
      }
      stopDirectCamera();
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const issueCategories: { id: IssueCategory; label: string; labelHi: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'garbage_dumping', label: 'Garbage Dumping', labelHi: 'कचरा फेंकना', icon: <Trash2 className="h-5 w-5 text-emerald-600" />, desc: 'Unattended piles on streets or plots' },
    { id: 'open_burning', label: 'Open Trash Burning', labelHi: 'कचरा जलाना', icon: <Flame className="h-5 w-5 text-red-500" />, desc: 'Leaves, plastics, smoke hazards' },
    { id: 'overflowing_bins', label: 'Overflowing Bins', labelHi: 'भरे हुए कूड़ेदान', icon: <Trash2 className="h-5 w-5 text-amber-500" />, desc: 'Municipal bins spilling onto road' },
    { id: 'polluted_water', label: 'Polluted Water / Drain', labelHi: 'प्रदूषित नाला / जल', icon: <Droplet className="h-5 w-5 text-sky-600" />, desc: 'Black water, clogged drains, stench' },
    { id: 'illegal_dumping', label: 'Illegal Dumping / Debris', labelHi: 'अवैध मलबा डंपिंग', icon: <AlertTriangle className="h-5 w-5 text-orange-500" />, desc: 'Construction debris, chemical cans' },
    { id: 'air_pollution', label: 'Industrial / Air Pollution', labelHi: 'वायु व धुआं प्रदूषण', icon: <Wind className="h-5 w-5 text-purple-600" />, desc: 'Generator emissions, construction dust' }
  ];

  const samplePhotos = [
    { label: 'Garbage Heap', url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=60' },
    { label: 'Open Smoke Burning', url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&auto=format&fit=crop&q=60' },
    { label: 'Overflowing Blue Bin', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=60' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseLocation = () => {
    setLocation('GPS: Lat 28.4731° N, Long 77.0428° E (Sector 14, Gurugram)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const randomId = `UA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const categoryObj = issueCategories.find(c => c.id === selectedCategory);

    const newReport: EnvironmentalReport = {
      id: randomId,
      category: selectedCategory,
      categoryLabel: isHindi ? categoryObj?.labelHi || '' : categoryObj?.label || '',
      description: description.trim(),
      location: location || 'Gurugram Municipal Area',
      urgency,
      status: 'Submitted',
      createdAt: 'Just now',
      photoUrl: photoPreview || samplePhotos[0].url,
      statusNote: 'Report logged with Municipal Sanitation Control Room. Dispatching inspection team.',
      pointsAwarded: 50
    };

    onSubmitReport(newReport);
    setSubmittedReportId(randomId);
    setDescription('');
    setPhotoPreview('');
  };

  const filteredReports = reports.filter(rep => {
    if (statusFilter === 'All') return true;
    return rep.status === statusFilter;
  });

  return (
    <div id="report-issue-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </span>
            <span>{isHindi ? 'पर्यावरण समस्या दर्ज करें' : 'Report Environmental Issue'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isHindi 
              ? 'कचरा, धुआं, खुला दहन या नाले की शिकायत फोटो के साथ सीधे नगर निगम को भेजें।'
              : 'Empower civic enforcement. Submit photo evidence with location to trigger fast municipal cleanup.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-full shrink-0">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'form' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isHindi ? 'नयी शिकायत' : 'New Report'}
          </button>
          <button
            onClick={() => setActiveTab('my-reports')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'my-reports' 
                ? 'bg-white text-emerald-800 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>{isHindi ? 'मेरी शिकायतें' : 'My Reports'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {reports.length}
            </span>
          </button>
        </div>
      </div>

      {/* Success Modal / Banner after submission */}
      {submittedReportId && (
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">
                  {isHindi ? 'शिकायत सफलतापूर्वक दर्ज हुई!' : 'Report Successfully Submitted!'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-mono text-xs font-bold">
                  #{submittedReportId}
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                {isHindi 
                  ? 'आपकी रिपोर्ट क्षेत्रीय स्वच्छता अधिकारी को भेज दी गई है। आपको +50 ग्रीनपॉइंट्स प्रदान किए गए हैं!'
                  : 'Assigned to Municipal Ward Inspector. You earned +50 GreenPoints for active citizenship!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setActiveTab('my-reports')}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              {isHindi ? 'स्टेटस ट्रैक करें' : 'Track in My Reports'}
            </button>
            <button
              onClick={() => setSubmittedReportId(null)}
              className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold cursor-pointer"
            >
              {isHindi ? 'बंद करें' : 'Dismiss'}
            </button>
          </div>
        </div>
      )}

      {/* Form View */}
      {activeTab === 'form' ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm space-y-6">
          
          {/* 1. Issue Category Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              {isHindi ? '1. समस्या का प्रकार चुनें' : '1. Select Issue Category'}
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {issueCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-white shadow-2xs">
                        {cat.icon}
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {isHindi ? cat.labelHi : cat.label}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Description */}
          <div>
            <label htmlFor="issue-description" className="block text-sm font-bold text-slate-800 mb-1">
              {isHindi ? '2. समस्या का विवरण लिखें' : '2. Describe the Environmental Issue'}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="issue-description"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isHindi 
                ? 'कचरे की स्थिति, दुर्गंध, जलने वाले कचरे या नाले की स्थिति का विवरण दें...'
                : 'Provide specific details (e.g. pile of unsegregated plastic bags burning, blocking pedestrian crossing near school gate)...'}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* 3. Photo Upload with Drag & Drop & Sample Presets */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-bold text-slate-800">
                {isHindi ? '3. फोटो प्रमाण जोड़ें' : '3. Photo Evidence (Recommended)'}
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold">
                Geo-tagged Verification
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Camera & Upload Options */}
              <div className="flex flex-col gap-2.5">
                {/* Direct Camera Button */}
                <button
                  type="button"
                  onClick={startDirectCamera}
                  className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <div className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
                    <Camera className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold block leading-tight">
                      {isHindi ? 'सीधा कैमरा खोलें (Live Camera)' : 'Open Direct Camera'}
                    </span>
                    <span className="text-[10px] text-emerald-100 block">
                      {isHindi ? 'सीधे कैमरे से फोटो खींचें' : 'Take photo instantly using device camera'}
                    </span>
                  </div>
                </button>

                {/* Upload from Gallery / File Box */}
                <label className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl p-4 flex items-center justify-center gap-3 text-center cursor-pointer bg-slate-50/60 hover:bg-emerald-50/30 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <div className="p-2 rounded-xl bg-white shadow-xs text-emerald-600">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-700 block leading-tight">
                      {isHindi ? 'गैलरी / फाइल से चुनें' : 'Upload from Device / Gallery'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      JPG, PNG, WebP up to 10MB
                    </span>
                  </div>
                </label>
              </div>

              {/* Photo Preview & Demo selector */}
              <div className="space-y-2">
                {photoPreview ? (
                  <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200 bg-slate-900 group">
                    <img 
                      src={photoPreview} 
                      alt="Uploaded preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview('')}
                      className="absolute top-2 right-2 px-2 py-1 bg-black/70 hover:bg-black text-white text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <span className="text-[11px] font-bold text-slate-600 block mb-2">
                      {isHindi ? 'या त्वरित डेमो फोटो चुनें:' : 'Or pick a quick demo photo:'}
                    </span>
                    <div className="flex gap-2">
                      {samplePhotos.map((photo, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPhotoPreview(photo.url)}
                          className="flex-1 p-1 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 transition-all text-center cursor-pointer group"
                        >
                          <img 
                            src={photo.url} 
                            alt={photo.label} 
                            className="w-full h-12 rounded-lg object-cover mb-1" 
                          />
                          <span className="text-[9px] font-semibold text-slate-600 group-hover:text-emerald-700 block truncate">
                            {photo.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. Location & Urgency Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Location with Auto-Detect Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="issue-location" className="block text-sm font-bold text-slate-800">
                  {isHindi ? '4. स्थान / पता' : '4. Location Address'}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleUseLocation}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  <Crosshair className="h-3 w-3" />
                  <span>{isHindi ? 'जीपीएस से भरें' : 'Use My GPS'}</span>
                </button>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  id="issue-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Street name, Sector, Gurugram / Delhi..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">
                {isHindi ? '5. प्राथमिकता स्तर' : '5. Urgency Level'}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Low', 'Medium', 'High', 'Critical'] as UrgencyLevel[]).map((level) => {
                  const isSelected = urgency === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                        isSelected
                          ? level === 'Critical' 
                            ? 'bg-red-600 text-white border-red-700 shadow-xs'
                            : level === 'High'
                            ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                            : level === 'Medium'
                            ? 'bg-amber-400 text-slate-900 border-amber-500 shadow-xs'
                            : 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Citizen Reward Notice */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {isHindi 
                  ? 'सत्यापित शिकायत दर्ज करने पर आपको 50 ग्रीनपॉइंट्स मिलेंगे।'
                  : 'Valid reporting awards +50 GreenPoints towards your city eco-ranking.'}
              </span>
            </div>
            <span className="font-bold text-emerald-700 shrink-0">+50 GreenPoints</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isHindi ? 'शिकायत जमा करें (Submit Report)' : 'Submit Report for Municipal Action'}</span>
          </button>

        </form>
      ) : (
        /* My Reports Tracking Section */
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm space-y-4">
          
          {/* Status Filter Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-700">Filter Status:</span>
            </div>

            <div className="flex items-center gap-1">
              {['All', 'Submitted', 'In Review', 'Resolved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-3.5">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <FileText className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium">No reports found in this category.</p>
              </div>
            ) : (
              filteredReports.map((rep) => (
                <div 
                  key={rep.id} 
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{rep.categoryLabel}</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        #{rep.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        rep.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rep.status === 'In Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {rep.status}
                      </span>
                      <span className="text-xs text-slate-400">{rep.createdAt}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rep.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{rep.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">Urgency:</span>
                      <span className={`font-bold ${
                        rep.urgency === 'Critical' ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {rep.urgency}
                      </span>
                    </div>
                    {rep.photoUrl && (
                      <div className="flex items-center gap-1 text-emerald-700 font-medium">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>Photo Attached</span>
                      </div>
                    )}
                  </div>

                  {/* Status Note from Sanitation Inspector */}
                  {rep.statusNote && (
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                      <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">Action Update: </span>
                        <span>{rep.statusNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* Live Direct Camera Viewfinder Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
            {/* Modal Header */}
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-sm">
                  {isHindi ? 'लाइव कैमरा (Live Evidence Capture)' : 'Direct Camera Capture'}
                </span>
              </div>
              <button
                type="button"
                onClick={stopDirectCamera}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder Video Stream */}
            <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
              {cameraError ? (
                <div className="p-6 text-center text-slate-300 max-w-xs space-y-3">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-xs">{cameraError}</p>
                  <label className="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      onChange={(e) => {
                        handleFileUpload(e);
                        stopDirectCamera();
                      }} 
                      className="hidden" 
                    />
                    {isHindi ? 'डिवाइस कैमरा ऐप खोलें' : 'Open Device Camera App'}
                  </label>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Camera Reticle / Guides */}
                  <div className="absolute inset-6 border border-white/30 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between">
                      <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                      <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                    </div>
                    <div className="flex justify-between">
                      <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                      <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Capture Controls */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={stopDirectCamera}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                {isHindi ? 'रद्द करें' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={captureCameraPhoto}
                disabled={!!cameraError}
                className="w-16 h-16 rounded-full bg-white hover:bg-emerald-50 active:scale-95 border-4 border-emerald-500 shadow-lg flex items-center justify-center cursor-pointer transition-transform disabled:opacity-50"
                title="Click to capture photo"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <Camera className="w-5 h-5" />
                </div>
              </button>

              <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={(e) => {
                    handleFileUpload(e);
                    stopDirectCamera();
                  }} 
                  className="hidden" 
                />
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isHindi ? 'नेटिव कैमरा' : 'Native App'}</span>
              </label>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
