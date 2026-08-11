import React from 'react';
import { X, PhoneCall, Building2, Send, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AgronomistConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropName?: string;
  conditionName?: string;
}

export const AgronomistConsultModal: React.FC<AgronomistConsultModalProps> = ({
  isOpen,
  onClose,
  cropName = 'Crop Leaf',
  conditionName = 'Leaf Issue',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/80 relative overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <PhoneCall className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Contact Local Agronomist</h3>
            <p className="text-xs text-slate-500">Connect with qualified agricultural extension officers</p>
          </div>
        </div>

        <div className="space-y-3.5 mb-5 text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <span className="font-bold text-emerald-900">Active Crop Context: </span>
            <span>{cropName} — {conditionName}</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            For major disease outbreaks or severe yield risks, we strongly advise verifying AI findings with your local ministry of agriculture extension agent or village farm counselor.
          </p>

          <div className="space-y-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-bold text-slate-900">National Farmer Helpline</div>
                  <div className="text-[11px] text-slate-500">Toll-Free Agricultural Support</div>
                </div>
              </div>
              <a
                href="tel:18001801551"
                className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold text-xs hover:bg-emerald-800"
              >
                Call Hotline
              </a>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <div>
                  <div className="font-bold text-slate-900">Share Report with Agent</div>
                  <div className="text-[11px] text-slate-500">Send image & weather context via SMS/WhatsApp</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert('Report text copied to clipboard! You can paste it in WhatsApp or SMS to your agricultural advisor.');
                  navigator.clipboard.writeText(`AgroGuide Crop Report: ${cropName} showing ${conditionName}. Weather context evaluated.`);
                }}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-bold text-xs hover:bg-slate-900"
              >
                Copy Text
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
