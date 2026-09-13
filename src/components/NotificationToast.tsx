import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Award } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'reward';
  title: string;
  message: string;
  points?: number;
}

interface NotificationToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
      <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3 ${
        toast.type === 'reward' 
          ? 'bg-amber-50/95 border-amber-300 text-amber-900 shadow-amber-200/50' 
          : toast.type === 'success'
          ? 'bg-emerald-50/95 border-emerald-300 text-emerald-900 shadow-emerald-200/50'
          : 'bg-sky-50/95 border-sky-300 text-sky-900 shadow-sky-200/50'
      }`}>
        <div className="p-1.5 rounded-xl bg-white shadow-2xs shrink-0 mt-0.5">
          {toast.type === 'reward' && <Award className="h-5 w-5 text-amber-500 fill-amber-100" />}
          {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          {toast.type === 'info' && <Info className="h-5 w-5 text-sky-600" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">{toast.title}</h4>
            {toast.points && (
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                +{toast.points} pts
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5 opacity-90 leading-relaxed">{toast.message}</p>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
