import React, { useState } from 'react';
import { HarvestingInput, HarvestingResult, WeatherData, Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import { Scissors, Clock, CloudRain, AlertTriangle, CheckCircle2, BookmarkPlus, ShieldCheck, Sparkles, Box } from 'lucide-react';

interface HarvestingAdvisorModuleProps {
  weather: WeatherData | null;
  language: Language;
  onSaveReport?: (title: string, type: 'harvest', summary: string, data: HarvestingResult) => void;
}

export const HarvestingAdvisorModule: React.FC<HarvestingAdvisorModuleProps> = ({ weather, language, onSaveReport }) => {
  const t = TRANSLATIONS[language];

  const [selectedCrop, setSelectedCrop] = useState<string>('Paddy / Rice');
  const [growthStage, setGrowthStage] = useState<'Early Maturing (30% ripe)' | 'Peak Readiness (80-90% ripe)' | 'Fully Ripe / Drying' | 'Overripe / Weather Exposed'>('Peak Readiness (80-90% ripe)');

  const [result, setResult] = useState<HarvestingResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const rainChance = weather?.rainProbability ?? 60;
      let score = 85;
      let decision: HarvestingResult['harvestDecision'] = 'Harvest in 2-3 Days';
      let urgency: HarvestingResult['urgencyLevel'] = 'info';
      let exp = 'Crop is in peak maturity stage. Weather conditions are clear for harvesting.';

      if (growthStage.includes('Peak Readiness')) {
        if (rainChance > 50) {
          score = 92;
          decision = 'Harvest Immediately';
          urgency = 'critical';
          exp = `Incoming rain chance (${rainChance}%) risks causing grain moisture rot and lodging. Harvest immediately during dry daylight windows.`;
        } else {
          score = 95;
          decision = 'Harvest in 2-3 Days';
          urgency = 'success';
          exp = 'Optimal grain hardness achieved with dry weather forecast. Plan harvesting equipment for tomorrow.';
        }
      } else if (growthStage.includes('Early Maturing')) {
        score = 45;
        decision = 'Wait 1 Week';
        urgency = 'warning';
        exp = 'Grains/fruits are still filling starch. Early harvesting causes premature shriveling and low market weight.';
      } else if (growthStage.includes('Overripe')) {
        score = 88;
        decision = 'Harvest Immediately';
        urgency = 'critical';
        exp = 'Overripe crops shatter easily in wind and attract birds/rodents. Harvest without delay.';
      }

      const lossTips = [
        'Harvest during dry morning hours after dew evaporates to prevent mold formation in storage bags.',
        'Use clean tarpaulins under thresher machines to prevent soil contamination.',
        'Dry grains down to 12–14% moisture content before sealing bags to prevent post-harvest mold.',
        'Store harvested bags on wooden pallets, away from damp floors and walls.',
      ];

      const resData: HarvestingResult = {
        cropName: selectedCrop,
        growthStage,
        readinessScore: score,
        harvestDecision: decision,
        urgencyLevel: urgency,
        explanation: exp,
        lossReductionTips: lossTips,
        postHarvestStorageAdvice: 'Keep grains in moisture-proof hermetic bags or ventilated granaries treated with neem leaf extracts to deter storage pests.',
        disclaimerNote: 'Note: Local field moisture meter checks are recommended alongside weather forecast alerts.',
        analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setResult(resData);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleSave = () => {
    if (result && onSaveReport) {
      onSaveReport(
        `Harvest Advisory (${result.cropName})`,
        'harvest',
        `Decision: ${result.harvestDecision} | Maturity: ${result.growthStage}`,
        result
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Module Banner */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 transition-all">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold">
            <Scissors className="w-6 h-6 text-sky-800" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{t.harvestTitle}</h2>
            <p className="text-xs text-slate-500">{t.harvestSub}</p>
          </div>
        </div>

        {/* Input Controls */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.cropNameLabel}</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Paddy / Rice">Paddy / Rice</option>
              <option value="Tomato">Tomato</option>
              <option value="Maize / Corn">Maize / Corn</option>
              <option value="Wheat">Wheat</option>
              <option value="Cotton">Cotton</option>
              <option value="Chili">Chili</option>
              <option value="Groundnut">Groundnut</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.growthStageLabel}</label>
            <select
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Early Maturing (30% ripe)">Early Maturing (30% ripe)</option>
              <option value="Peak Readiness (80-90% ripe)">Peak Readiness (80-90% ripe)</option>
              <option value="Fully Ripe / Drying">Fully Ripe / Drying</option>
              <option value="Overripe / Weather Exposed">Overripe / Weather Exposed</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.analyzeHarvestBtn}</span>
          </button>
        </div>
      </div>

      {/* Output Results */}
      {result && (
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 space-y-4 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-sky-800 uppercase bg-sky-100 px-2 py-0.5 rounded-md">
                Harvest Timing Advisory
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {result.cropName} — {result.growthStage}
              </h3>
            </div>

            {onSaveReport && (
              <button
                type="button"
                onClick={handleSave}
                disabled={savedSuccess}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  savedSuccess
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                <span>{savedSuccess ? 'Saved to Reports!' : 'Save Harvest Report'}</span>
              </button>
            )}
          </div>

          {/* Decision Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start space-x-3 ${
              result.urgencyLevel === 'critical'
                ? 'bg-rose-900 text-white border-rose-800'
                : result.urgencyLevel === 'warning'
                ? 'bg-amber-800 text-white border-amber-700'
                : 'bg-emerald-800 text-white border-emerald-700'
            }`}
          >
            <Clock className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-extrabold uppercase text-amber-200">{t.harvestDecisionTitle}</div>
              <div className="text-lg font-black text-white">{result.harvestDecision}</div>
              <p className="text-xs text-slate-100 mt-1 leading-relaxed">{result.explanation}</p>
            </div>
          </div>

          {/* Loss Reduction Tips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              {t.lossReductionTipsTitle}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.lossReductionTips.map((tip, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post-Harvest Storage Advice */}
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-start space-x-3 text-sky-950">
            <Box className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-sky-900 uppercase">{t.storageTitle}</div>
              <p className="text-xs text-sky-950 mt-0.5">{result.postHarvestStorageAdvice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
