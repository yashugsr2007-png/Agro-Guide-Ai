import React, { useState } from 'react';
import { CropPlannerInput, CropPlannerResult, Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import { Sprout, Calendar, Droplets, AlertCircle, Sparkles, CheckCircle2, BookmarkPlus, ShieldCheck, Ruler, ArrowUpRight } from 'lucide-react';

interface CropPlannerModuleProps {
  language: Language;
  onSaveReport?: (title: string, type: 'yield', summary: string, data: CropPlannerResult) => void;
}

const CROP_PRESETS = [
  { name: 'Paddy / Rice', avgYieldPerAcre: 22, unit: 'Quintals', spacing: '20 cm × 15 cm', waterDays: 'Flooded / 3-5 days' },
  { name: 'Tomato', avgYieldPerAcre: 180, unit: 'Quintals', spacing: '60 cm × 45 cm', waterDays: 'Drip every 2 days' },
  { name: 'Maize / Corn', avgYieldPerAcre: 30, unit: 'Quintals', spacing: '60 cm × 20 cm', waterDays: 'Sprinkler every 5 days' },
  { name: 'Cotton', avgYieldPerAcre: 12, unit: 'Quintals', spacing: '90 cm × 45 cm', waterDays: 'Furrow every 7 days' },
  { name: 'Wheat', avgYieldPerAcre: 20, unit: 'Quintals', spacing: '22.5 cm rows', waterDays: '4-5 critical irrigations' },
  { name: 'Chili', avgYieldPerAcre: 40, unit: 'Quintals', spacing: '60 cm × 30 cm', waterDays: 'Drip every 2-3 days' },
  { name: 'Groundnut', avgYieldPerAcre: 14, unit: 'Quintals', spacing: '30 cm × 10 cm', waterDays: 'Light watering at pegging' },
];

export const CropPlannerModule: React.FC<CropPlannerModuleProps> = ({ language, onSaveReport }) => {
  const t = TRANSLATIONS[language];

  const [selectedCrop, setSelectedCrop] = useState<string>('Paddy / Rice');
  const [landArea, setLandArea] = useState<string>('2.5');
  const [areaUnit, setAreaUnit] = useState<'acres' | 'hectares' | 'guntas'>('acres');
  const [irrigationType, setIrrigationType] = useState<'Drip' | 'Canal / Flood' | 'Sprinkler' | 'Rainfed'>('Canal / Flood');
  const [sowingSeason, setSowingSeason] = useState<'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)' | 'Year-round'>('Kharif (Monsoon)');

  const [planResult, setPlanResult] = useState<CropPlannerResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const areaVal = parseFloat(landArea) || 1.0;
      let multiplierInAcres = areaVal;
      if (areaUnit === 'hectares') multiplierInAcres = areaVal * 2.471;
      if (areaUnit === 'guntas') multiplierInAcres = areaVal / 40.0;

      const preset = CROP_PRESETS.find((c) => c.name === selectedCrop) || CROP_PRESETS[0];

      const baseMin = Math.round(preset.avgYieldPerAcre * 0.85 * multiplierInAcres);
      const baseMax = Math.round(preset.avgYieldPerAcre * 1.15 * multiplierInAcres);

      const result: CropPlannerResult = {
        cropName: selectedCrop,
        landArea: areaVal,
        areaUnit,
        estimatedYieldMin: baseMin,
        estimatedYieldMax: baseMax,
        yieldUnit: preset.unit,
        estimateNotice: 'ESTIMATE ONLY: Real yield varies with actual rainfall, weather pest pressure, and fertilizer quality.',
        recommendedSpacing: preset.spacing,
        waterSchedule: preset.waterDays,
        keyManagementPhases: [
          {
            phaseName: 'Seed Bed & Germination (Days 1–15)',
            dayRange: 'Days 1–15',
            recommendedCare: 'Treat seed with bio-fungicide. Maintain light moisture without waterlogging.',
          },
          {
            phaseName: 'Vegetative Growth & Root Establishment (Days 16–45)',
            dayRange: 'Days 16–45',
            recommendedCare: 'Apply balanced basal NPK fertilizer. Perform weeding at day 20 and 40.',
          },
          {
            phaseName: 'Flowering & Grain/Fruit Formation (Days 46–80)',
            dayRange: 'Days 46–80',
            recommendedCare: 'Critical watering window. Ensure steady soil moisture. Scout for early pest larvae.',
          },
          {
            phaseName: 'Maturation & Harvest Preparation (Days 81–110)',
            dayRange: 'Days 81–110',
            recommendedCare: 'Withhold irrigation 10-14 days prior to harvest to allow uniform drying.',
          },
        ],
        marketAdvice: 'Monitor regional wholesale mandis 2 weeks before harvest to book transport and lock fair prices.',
        analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setPlanResult(result);
      setIsCalculating(false);
    }, 400);
  };

  const handleSave = () => {
    if (planResult && onSaveReport) {
      onSaveReport(
        `Crop & Yield Plan (${planResult.cropName})`,
        'yield',
        `${planResult.landArea} ${planResult.areaUnit} | Est. Yield: ${planResult.estimatedYieldMin}–${planResult.estimatedYieldMax} ${planResult.yieldUnit}`,
        planResult
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Module Title Banner */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 transition-all">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            <Sprout className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{t.plannerTitle}</h2>
            <p className="text-xs text-slate-500">{t.plannerSub}</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.cropNameLabel}</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {CROP_PRESETS.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.landAreaLabel}</label>
            <input
              type="number"
              step="0.5"
              value={landArea}
              onChange={(e) => setLandArea(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.areaUnitLabel}</label>
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="acres">Acres</option>
              <option value="hectares">Hectares</option>
              <option value="guntas">Guntas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t.irrigationLabel}</label>
            <select
              value={irrigationType}
              onChange={(e) => setIrrigationType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Canal / Flood">Canal / Flood Irrigation</option>
              <option value="Drip">Drip Irrigation</option>
              <option value="Sprinkler">Sprinkler System</option>
              <option value="Rainfed">Rainfed / Monsoon</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.calculatePlannerBtn}</span>
          </button>
        </div>
      </div>

      {/* Output Results */}
      {planResult && (
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 space-y-4 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-100 px-2 py-0.5 rounded-md">
                Crop Plan & Yield Projection
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-1">
                {planResult.cropName} ({planResult.landArea} {planResult.areaUnit})
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
                <span>{savedSuccess ? 'Saved to Reports!' : 'Save Yield Plan'}</span>
              </button>
            )}
          </div>

          {/* Prominent ESTIMATE ONLY Warning Banner */}
          <div className="p-3.5 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl flex items-start space-x-3 text-amber-950">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-xs uppercase text-amber-900">PROMINENT NOTICE: ESTIMATE ONLY — </span>
              <span className="text-xs font-medium">{planResult.estimateNotice}</span>
            </div>
          </div>

          {/* Estimated Yield Range Highlight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 bg-emerald-900 text-white rounded-xl shadow-xs col-span-1 sm:col-span-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-emerald-300 uppercase">{t.yieldRangeTitle}</div>
                <div className="text-2xl font-black text-amber-300 mt-1">
                  {planResult.estimatedYieldMin} – {planResult.estimatedYieldMax}
                </div>
                <div className="text-xs text-emerald-200 font-medium">{planResult.yieldUnit} Total</div>
              </div>
              <div className="text-[10px] text-emerald-300/80 mt-2">Based on standard regional agronomic baselines</div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
              <Ruler className="w-6 h-6 text-emerald-700 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Recommended Plant Spacing</div>
                <div className="text-sm font-bold text-slate-900">{planResult.recommendedSpacing}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
              <Droplets className="w-6 h-6 text-sky-700 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Watering Cycle</div>
                <div className="text-sm font-bold text-slate-900">{planResult.waterSchedule}</div>
              </div>
            </div>
          </div>

          {/* Key Growth Timetable */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Stage-by-Stage Field Management Schedule
            </h4>
            <div className="space-y-2">
              {planResult.keyManagementPhases.map((phase, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{phase.phaseName}</div>
                      <div className="text-[11px] text-slate-600">{phase.recommendedCare}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    {phase.dayRange}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
