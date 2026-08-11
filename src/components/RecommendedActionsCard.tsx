import React from 'react';
import { RecommendedAction } from '../types';
import { ShieldCheck, Scissors, Droplet, Sparkles, Wind, Sprout, CheckCircle2 } from 'lucide-react';

interface RecommendedActionsCardProps {
  actions: RecommendedAction[];
}

export const RecommendedActionsCard: React.FC<RecommendedActionsCardProps> = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  const getCategoryIcon = (category: RecommendedAction['category']) => {
    switch (category) {
      case 'Immediate':
        return <Scissors className="w-5 h-5 text-rose-400" />;
      case 'Watering':
        return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'Sanitation':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Prevention':
        return <Wind className="w-5 h-5 text-teal-400" />;
      case 'Nutrition':
        return <Sprout className="w-5 h-5 text-emerald-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getCategoryBadge = (category: RecommendedAction['category']) => {
    switch (category) {
      case 'Immediate':
        return 'bg-rose-950/90 text-rose-200 border-rose-700';
      case 'Watering':
        return 'bg-sky-950/90 text-sky-200 border-sky-700';
      case 'Sanitation':
        return 'bg-amber-950/90 text-amber-200 border-amber-700';
      case 'Prevention':
        return 'bg-teal-950/90 text-teal-200 border-teal-700';
      case 'Nutrition':
        return 'bg-emerald-950/90 text-emerald-200 border-emerald-700';
      default:
        return 'bg-emerald-950/90 text-emerald-200 border-emerald-700';
    }
  };

  return (
    <div id="actions-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl border border-[#1b5035]/80 text-white transition-all">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-emerald-400 border border-emerald-800/80 flex items-center justify-center font-semibold">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Recommended Practical Actions</h2>
          <p className="text-xs text-slate-300">Safe, non-toxic, and straightforward steps to protect your crop</p>
        </div>
      </div>

      {/* Grid of Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-emerald-800/80 bg-[#072416]/80 hover:bg-[#0a2f1c] hover:border-emerald-500/80 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-[#0e3b26] border border-emerald-700">
                    {getCategoryIcon(action.category)}
                  </div>
                  <h3 className="text-sm font-bold text-white">{action.title}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryBadge(action.category)} uppercase tracking-wider`}>
                  {action.category}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed pl-0.5">{action.description}</p>
            </div>

            <div className="mt-3 pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Farmer Friendly Step
              </span>
              <span>Step #{idx + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
