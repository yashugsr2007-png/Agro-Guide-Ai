import React, { useState } from 'react';
import { SoilData, SoilAnalysisResult, Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import { TestTube2, Sparkles, CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck, RefreshCw, BookmarkPlus, Info } from 'lucide-react';

interface SoilHealthModuleProps {
  language: Language;
  onSaveReport?: (title: string, type: 'soil', summary: string, data: SoilAnalysisResult) => void;
}

export const SoilHealthModule: React.FC<SoilHealthModuleProps> = ({ language, onSaveReport }) => {
  const t = TRANSLATIONS[language];

  const [ph, setPh] = useState<string>('6.8');
  const [nitrogen, setNitrogen] = useState<string>('180');
  const [phosphorus, setPhosphorus] = useState<string>('22');
  const [potassium, setPotassium] = useState<string>('190');
  const [organicMatter, setOrganicMatter] = useState<string>('1.8');
  const [salinityEc, setSalinityEc] = useState<string>('0.9');
  const [soilType, setSoilType] = useState<string>('Loamy Soil');

  const [analysis, setAnalysis] = useState<SoilAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const parsedPh = ph ? parseFloat(ph) : undefined;
      const parsedN = nitrogen ? parseFloat(nitrogen) : undefined;
      const parsedP = phosphorus ? parseFloat(phosphorus) : undefined;
      const parsedK = potassium ? parseFloat(potassium) : undefined;
      const parsedOM = organicMatter ? parseFloat(organicMatter) : undefined;
      const parsedEC = salinityEc ? parseFloat(salinityEc) : undefined;

      const concerns: string[] = [];
      const practices: string[] = [];

      // Evaluate pH
      let phEval = 'Slightly Acidic to Neutral (Ideal for most crops)';
      if (parsedPh !== undefined) {
        if (parsedPh < 5.5) {
          phEval = `Strongly Acidic (pH ${parsedPh})`;
          concerns.push('Acidic soil restricts phosphorus uptake and root elongation.');
          practices.push('Apply agricultural lime or wood ash 3-4 weeks prior to sowing.');
        } else if (parsedPh > 7.5) {
          phEval = `Alkaline Soil (pH ${parsedPh})`;
          concerns.push('Alkaline pH locks up Micronutrients like Iron and Zinc.');
          practices.push('Incorporate well-rotted organic compost, green manure, or gypsum to buffer alkaline pH.');
        } else {
          phEval = `Optimal Neutral Soil pH (${parsedPh})`;
          practices.push('Maintain current balanced soil pH with organic mulch layer.');
        }
      }

      // Evaluate N-P-K
      if (parsedN !== undefined && parsedN < 200) {
        concerns.push('Low available Nitrogen (N) — risk of pale yellow foliage and stunted growth.');
        practices.push('Apply green manuring (e.g., Sesbania/Dhaincha) or well-composted farmyard manure.');
      } else if (parsedN !== undefined && parsedN >= 200) {
        practices.push('Adequate Nitrogen reserve. Avoid excessive synthetic nitrogen top-dressing.');
      }

      if (parsedP !== undefined && parsedP < 20) {
        concerns.push('Low Phosphorus (P) — weak root development and delayed flowering.');
        practices.push('Apply rock phosphate or mycorrhizal bio-fertilizers to enhance phosphorus mobility.');
      }

      if (parsedK !== undefined && parsedK < 150) {
        concerns.push('Sub-optimal Potassium (K) — higher susceptibility to water drought stress and lodging.');
        practices.push('Incorporate wood ash or organic potash sources into root zone.');
      }

      if (parsedOM !== undefined && parsedOM < 1.5) {
        concerns.push('Low Organic Matter (<1.5%) — poor soil water holding capacity and biological activity.');
        practices.push('Practice zero-tillage or crop residue incorporation after harvest.');
      }

      if (parsedEC !== undefined && parsedEC > 2.0) {
        concerns.push('Elevated Electrical Conductivity / Salinity (>2.0 dS/m) — salt stress on young roots.');
        practices.push('Provide deep leaching irrigation with fresh water to flush salts below the root zone.');
      }

      if (concerns.length === 0) {
        concerns.push('No severe chemical imbalances detected based on the entered parameters.');
      }

      const simpleExplanation = parsedPh
        ? `Your ${soilType} has a pH of ${parsedPh}. ${
            parsedPh >= 6.0 && parsedPh <= 7.2
              ? 'Nutrients are readily available for plant root absorption.'
              : 'Adjusting soil amendments will improve nutrient availability.'
          }`
        : `Your ${soilType} test parameters indicate general field suitability with proper organic composting.`;

      const result: SoilAnalysisResult = {
        phEvaluation: phEval,
        nutrientBalanceSummary: `Evaluated ${soilType} based strictly on user-provided values.`,
        identifiedConcerns: concerns,
        suggestedPractices: practices,
        simpleExplanation,
        disclaimerNote: 'Note: AI soil evaluation translates lab numbers into simple practices. Always verify major field fertilizations with local agricultural officers.',
        analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setAnalysis(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const loadPreset = (presetType: 'acidic' | 'healthy') => {
    if (presetType === 'acidic') {
      setPh('5.2');
      setNitrogen('140');
      setPhosphorus('12');
      setPotassium('120');
      setOrganicMatter('1.1');
      setSalinityEc('0.5');
      setSoilType('Red Sandy Soil');
    } else {
      setPh('6.8');
      setNitrogen('260');
      setPhosphorus('28');
      setPotassium('210');
      setOrganicMatter('2.4');
      setSalinityEc('0.8');
      setSoilType('Black Loamy Soil');
    }
  };

  const handleSave = () => {
    if (analysis && onSaveReport) {
      onSaveReport(
        `Soil Health Report (${soilType})`,
        'soil',
        `pH: ${ph || 'Unmeasured'} | Evaluation: ${analysis.phEvaluation}`,
        analysis
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
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <TestTube2 className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">{t.soilModuleTitle}</h2>
            <p className="text-xs text-slate-500">{t.soilModuleSub}</p>
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {t.soilTestInputTitle}
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => loadPreset('acidic')}
                className="text-[11px] px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-200 transition-colors"
              >
                {t.presetSoilSample1}
              </button>
              <button
                type="button"
                onClick={() => loadPreset('healthy')}
                className="text-[11px] px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-200 transition-colors"
              >
                {t.presetSoilSample2}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.phLabel}</label>
              <input
                type="number"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
                placeholder="e.g. 6.5"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.nitrogenLabel}</label>
              <input
                type="number"
                value={nitrogen}
                onChange={(e) => setNitrogen(e.target.value)}
                placeholder="e.g. 180 kg/ha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.phosphorusLabel}</label>
              <input
                type="number"
                value={phosphorus}
                onChange={(e) => setPhosphorus(e.target.value)}
                placeholder="e.g. 22 kg/ha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.potassiumLabel}</label>
              <input
                type="number"
                value={potassium}
                onChange={(e) => setPotassium(e.target.value)}
                placeholder="e.g. 190 kg/ha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.organicMatterLabel}</label>
              <input
                type="number"
                step="0.1"
                value={organicMatter}
                onChange={(e) => setOrganicMatter(e.target.value)}
                placeholder="e.g. 1.8%"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t.salinityLabel}</label>
              <input
                type="number"
                step="0.1"
                value={salinityEc}
                onChange={(e) => setSalinityEc(e.target.value)}
                placeholder="e.g. 0.9 dS/m"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-700">{t.soilTypeLabel}:</span>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="Loamy Soil">Loamy Soil (Ideal)</option>
                <option value="Clay Soil">Clay Soil (Heavy Water Hold)</option>
                <option value="Red Sandy Soil">Red Sandy Soil (Quick Draining)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (High Nutrient Hold)</option>
                <option value="Alluvial Soil">Alluvial River Basin Soil</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                  <span>Analyzing Soil Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{t.analyzeSoilBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Soil Analysis Output Result */}
      {analysis && (
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 space-y-4 transition-all">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-extrabold text-slate-900">Soil Health Evaluation Summary</h3>
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
                <span>{savedSuccess ? 'Saved to Reports!' : 'Save Soil Report'}</span>
              </button>
            )}
          </div>

          {/* pH Status Banner */}
          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase text-amber-900">pH & Reaction Status</div>
              <div className="text-sm font-extrabold text-amber-950">{analysis.phEvaluation}</div>
              <p className="text-xs text-amber-900 mt-1">{analysis.simpleExplanation}</p>
            </div>
          </div>

          {/* Identified Concerns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Identified Soil Health Concerns
            </h4>
            <div className="space-y-1.5">
              {analysis.identifiedConcerns.map((concern, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-950 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{concern}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Safe Practices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Suggested General Soil Management Practices
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {analysis.suggestedPractices.map((practice, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{practice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{t.soilDisclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
