import React from 'react';
import { WeatherAdvisory } from '../types';
import { Clock, AlertTriangle, CloudRain, CheckSquare, Calendar, ArrowRight } from 'lucide-react';

interface WhenToActCardProps {
  advisory: WeatherAdvisory | null;
}

export const WhenToActCard: React.FC<WhenToActCardProps> = ({ advisory }) => {
  if (!advisory) return null;

  const getUrgencyStyles = (level: WeatherAdvisory['urgencyLevel']) => {
    switch (level) {
      case 'critical':
        return {
          banner: 'bg-rose-950/90 text-white border-rose-800',
          badge: 'bg-rose-500 text-white animate-pulse',
          card: 'bg-rose-950/80 border-rose-800 text-rose-100',
          accent: 'text-rose-400',
        };
      case 'warning':
        return {
          banner: 'bg-amber-950/90 text-white border-amber-800',
          badge: 'bg-amber-400 text-amber-950 font-bold',
          card: 'bg-amber-950/80 border-amber-800 text-amber-100',
          accent: 'text-amber-400',
        };
      case 'info':
        return {
          banner: 'bg-sky-950/90 text-white border-sky-800',
          badge: 'bg-sky-400 text-sky-950 font-bold',
          card: 'bg-sky-950/80 border-sky-800 text-sky-100',
          accent: 'text-sky-400',
        };
      default:
        return {
          banner: 'bg-[#072416] text-white border-emerald-800',
          badge: 'bg-[#22c55e] text-slate-950 font-bold',
          card: 'bg-[#072416]/80 border-emerald-800 text-emerald-100',
          accent: 'text-emerald-400',
        };
    }
  };

  const styles = getUrgencyStyles(advisory.urgencyLevel);

  return (
    <div id="whentoact-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-[#1b5035]/80 text-white transition-all">
      {/* Top Banner with Urgency Badge */}
      <div className={`px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${styles.banner}`}>
        <div className="flex items-center space-x-2.5">
          <Clock className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Weather-Based "When to Act" Advisory
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-300 font-medium">Recommended Window:</span>
          <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide shadow-xs ${styles.badge}`}>
            {advisory.urgency}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Main Advisory Box */}
        <div className={`p-4 rounded-xl border mb-4 ${styles.card}`}>
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-[#0e3b26] border border-emerald-700 shrink-0 mt-0.5">
              <CloudRain className={`w-5 h-5 ${styles.accent}`} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white mb-1">{advisory.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-normal">{advisory.detail}</p>
            </div>
          </div>
        </div>

        {/* Action Timeframe & Field Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#072416] border border-emerald-800/80 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Target Timeframe</div>
              <div className="text-sm font-extrabold text-white">{advisory.actionTimeframe}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#072416] border border-emerald-800/80 flex items-center space-x-3">
            <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Field Rule</div>
              <div className="text-xs font-bold text-white">Do pruning only during dry sunlight hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
