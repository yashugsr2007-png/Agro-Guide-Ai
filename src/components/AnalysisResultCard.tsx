import React from 'react';
import { CropAnalysisResult } from '../types';
import { AlertTriangle, CheckCircle, Info, ShieldAlert, Sparkles, Stethoscope, HelpCircle } from 'lucide-react';

interface AnalysisResultCardProps {
  analysis: CropAnalysisResult | null;
  isAnalyzing: boolean;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ analysis, isAnalyzing }) => {
  if (isAnalyzing) {
    return (
      <div id="analysis-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#1b5035]/80 animate-pulse text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-800/80"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-emerald-900/60 rounded w-1/3"></div>
            <div className="h-3 bg-emerald-900/40 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-20 bg-emerald-900/40 rounded-xl mb-4"></div>
        <div className="h-12 bg-emerald-900/40 rounded-xl"></div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const getSeverityBadge = (severity: CropAnalysisResult['severity']) => {
    switch (severity) {
      case 'Severe':
      case 'High':
        return {
          bg: 'bg-rose-950/90 text-rose-200 border-rose-700',
          icon: ShieldAlert,
          label: `${severity} Risk`,
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-950/90 text-amber-200 border-amber-700',
          icon: AlertTriangle,
          label: 'Moderate Impact',
        };
      case 'Low':
        return {
          bg: 'bg-yellow-950/90 text-yellow-200 border-yellow-700',
          icon: Info,
          label: 'Low Impact',
        };
      default:
        return {
          bg: 'bg-emerald-950/90 text-emerald-200 border-emerald-700',
          icon: CheckCircle,
          label: 'Healthy Crop',
        };
    }
  };

  const severityBadge = getSeverityBadge(analysis.severity);
  const SeverityIcon = severityBadge.icon;

  return (
    <div id="analysis-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl border border-[#1b5035]/80 text-white transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-emerald-900/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-slate-950 flex items-center justify-center shadow-md">
            <Stethoscope className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-[#072416] px-2.5 py-0.5 rounded-md border border-emerald-800">
                AI Crop Analysis
              </span>
              <span className="text-xs text-slate-300">{analysis.analyzedAt}</span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">
              {analysis.cropType}: <span className="text-emerald-400">{analysis.conditionName}</span>
            </h2>
          </div>
        </div>

        {/* Severity Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${severityBadge.bg} shrink-0`}>
          <SeverityIcon className="w-4 h-4" />
          <span>{severityBadge.label}</span>
        </div>
      </div>

      {/* Confidence Bar & Percentage */}
      <div className="bg-[#072416]/80 border border-emerald-800/80 rounded-xl p-3.5 mb-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1.5">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Possible Match Probability:
          </span>
          <span className="text-sm font-extrabold text-emerald-400">{analysis.confidence}% Match</span>
        </div>

        <div className="w-full h-2.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700 rounded-full"
            style={{ width: `${analysis.confidence}%` }}
          ></div>
        </div>
        <p className="text-[11px] text-slate-300 mt-1">
          Estimated based on visual spot patterns, leaf margin color, and microclimate profile.
        </p>
      </div>

      {/* Simple English Explanation */}
      <div className="mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">Simple Explanation</h3>
        <p className="text-sm text-slate-100 leading-relaxed bg-[#072416]/80 p-3.5 rounded-xl border border-emerald-800/80">
          {analysis.summary}
        </p>
      </div>

      {/* Symptoms list */}
      {analysis.symptoms && analysis.symptoms.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Key Visible Symptoms</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
            {analysis.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start space-x-2 bg-[#072416]/70 p-2.5 rounded-xl border border-emerald-800/70">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mandatory Agricultural Disclaimer Note */}
      <div className="bg-[#3a2800]/80 border border-amber-700/80 rounded-xl p-3.5 text-xs text-amber-200 flex items-start space-x-2.5">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">Agricultural Safety Disclaimer: </span>
          <span>{analysis.disclaimerNote}</span>
        </div>
      </div>
    </div>
  );
};
