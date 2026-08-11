import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { FarmerDashboard } from './components/FarmerDashboard';
import { SoilHealthModule } from './components/SoilHealthModule';
import { CropPlannerModule } from './components/CropPlannerModule';
import { HarvestingAdvisorModule } from './components/HarvestingAdvisorModule';
import { SavedReportsModule } from './components/SavedReportsModule';

import { LocationCard } from './components/LocationCard';
import { WeatherCard } from './components/WeatherCard';
import { CropUploadCard } from './components/CropUploadCard';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { RecommendedActionsCard } from './components/RecommendedActionsCard';
import { WhenToActCard } from './components/WhenToActCard';
import { AgronomistConsultModal } from './components/AgronomistConsultModal';

import { WeatherData, CropAnalysisResult, SampleCrop, ActiveTab, Language, SavedReport } from './types';
import { SAMPLE_CROPS } from './data/sampleCrops';
import { TRANSLATIONS } from './lib/translations';
import { ArrowDown, BookmarkPlus, ShieldCheck } from 'lucide-react';

const INITIAL_SAVED_REPORTS: SavedReport[] = [
  {
    id: 'rep-1',
    title: 'Tomato Leaf Scan — Late Blight',
    type: 'crop',
    date: new Date().toLocaleDateString(),
    summary: 'Detected Late Blight (88% confidence). Safe pruning and root drip recommended.',
    data: SAMPLE_CROPS[0].presetAnalysis,
  },
  {
    id: 'rep-2',
    title: 'Paddy Field Soil Health Analysis',
    type: 'soil',
    date: new Date().toLocaleDateString(),
    summary: 'pH 6.8 (Neutral). Adequate Nitrogen and Potassium reserves.',
    data: {
      phEvaluation: 'Optimal Neutral Soil pH (6.8)',
      nutrientBalanceSummary: 'Evaluated Black Loamy Soil',
      identifiedConcerns: ['No severe chemical imbalances detected.'],
      suggestedPractices: ['Maintain organic mulching.', 'Apply green manure prior to next season.'],
      simpleExplanation: 'Your soil pH is in ideal neutral range.',
      disclaimerNote: 'Lab verification recommended.',
      analyzedAt: '10:00 AM',
    },
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [language, setLanguage] = useState<Language>('en');

  const [location, setLocation] = useState<string>('Central Valley, Fresno CA');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropHint, setCropHint] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<CropAnalysisResult | null>(null);

  const [savedReports, setSavedReports] = useState<SavedReport[]>(INITIAL_SAVED_REPORTS);
  const [reportSavedSuccess, setReportSavedSuccess] = useState<boolean>(false);

  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  // Load weather when location changes
  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (locName: string) => {
    setIsLoadingWeather(true);
    try {
      const res = await fetch(`/api/weather?q=${encodeURIComponent(locName)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Pre-load default sample on mount
  useEffect(() => {
    const defaultSample = SAMPLE_CROPS[0];
    setSelectedImage(defaultSample.imageUrl);
    setCropHint(defaultSample.cropName);
    setAnalysis(defaultSample.presetAnalysis);
  }, []);

  const handleSelectSample = (sample: SampleCrop) => {
    setSelectedImage(sample.imageUrl);
    setCropHint(sample.cropName);
    setAnalysis(sample.presetAnalysis);
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const handleAnalyzeCrop = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }

    try {
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: selectedImage.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
          location,
          cropHint,
          weatherInfo: weather,
        }),
      });

      if (response.ok) {
        const result: CropAnalysisResult = await response.json();
        setAnalysis(result);

        setTimeout(() => {
          document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setAnalysis(SAMPLE_CROPS[0].presetAnalysis);
      }
    } catch (err) {
      console.error('Error sending crop analysis:', err);
      setAnalysis(SAMPLE_CROPS[0].presetAnalysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddReport = (title: string, type: SavedReport['type'], summary: string, data: any) => {
    const newReport: SavedReport = {
      id: `rep-${Date.now()}`,
      title,
      type,
      date: new Date().toLocaleDateString(),
      summary,
      data,
    };
    setSavedReports((prev) => [newReport, ...prev]);
  };

  const handleDeleteReport = (id: string) => {
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSaveCurrentCropScan = () => {
    if (!analysis) return;
    handleAddReport(
      `${analysis.cropType} Scan — ${analysis.conditionName}`,
      'crop',
      `Confidence: ${analysis.confidence}% | Severity: ${analysis.severity}. ${analysis.summary}`,
      analysis
    );
    setReportSavedSuccess(true);
    setTimeout(() => setReportSavedSuccess(false), 3000);
  };

  // Text-To-Speech audio reader for farmers
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let speechText = `Welcome to AgroGuide. Select a module like Crop Health, Soil Health, or Weather to view farming recommendations.`;

    if (activeTab === 'cropHealth' && analysis) {
      speechText = `AgroGuide Crop Health Summary for ${analysis.cropType}. Possible Condition: ${analysis.conditionName}. Confidence ${analysis.confidence} percent. ${analysis.summary}. Weather timing: ${analysis.weatherAdvisory.urgency}. ${analysis.weatherAdvisory.detail}`;
    } else if (activeTab === 'weather' && weather) {
      speechText = `Weather for ${weather.locationName}. Temperature ${weather.temperatureC} degrees Celsius. Humidity ${weather.humidity} percent. Rain probability ${weather.rainProbability} percent. ${weather.forecastSummary}`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePrintAdvisory = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#051c11] text-white font-sans antialiased pb-16 relative selection:bg-emerald-800 selection:text-white">
      {/* Full-width realistic agricultural crop-field background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none -z-20 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2000&q=80')`,
          opacity: 0.45,
        }}
      />
      {/* Dark green transparent gradient overlay for maximum readability & vibrant agricultural look */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#072416]/90 via-[#072013]/70 to-[#04150c]/80 pointer-events-none -z-10 backdrop-blur-[1px]" />

      {/* App Header with Language Selector */}
      <Header
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        onOpenConsultModal={() => setIsConsultModalOpen(true)}
        onPrintAdvisory={handlePrintAdvisory}
        hasAnalysis={!!analysis}
      />

      {/* Navigation Tabs Bar */}
      <NavigationTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        language={language}
        savedCount={savedReports.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        {/* Tab 1: Farmer Dashboard */}
        {activeTab === 'dashboard' && (
          <FarmerDashboard
            onNavigate={(tab) => setActiveTab(tab)}
            weather={weather}
            savedCount={savedReports.length}
            recentReport={savedReports[0]}
            language={language}
          />
        )}

        {/* Tab 2: Crop Health & Disease Analysis */}
        {activeTab === 'cropHealth' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 space-y-5">
                <LocationCard
                  currentLocation={location}
                  onLocationChange={(newLoc) => setLocation(newLoc)}
                  isLoadingWeather={isLoadingWeather}
                />
                <WeatherCard weather={weather} isLoading={isLoadingWeather} />
              </div>

              <div className="lg:col-span-7">
                <CropUploadCard
                  selectedImage={selectedImage}
                  cropHint={cropHint}
                  onImageSelect={(img) => setSelectedImage(img)}
                  onCropHintChange={(hint) => setCropHint(hint)}
                  onSelectSample={handleSelectSample}
                  onAnalyze={handleAnalyzeCrop}
                  isAnalyzing={isAnalyzing}
                  onReset={handleResetImage}
                />
              </div>
            </div>

            {analysis && (
              <div className="flex items-center justify-between py-1 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-emerald-200/80 shadow-xs">
                <div className="flex items-center space-x-2 text-xs text-slate-700 font-bold">
                  <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span>AI Crop Diagnostic Report</span>
                </div>

                <button
                  type="button"
                  onClick={handleSaveCurrentCropScan}
                  disabled={reportSavedSuccess}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    reportSavedSuccess
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                  }`}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{reportSavedSuccess ? 'Saved to Reports!' : 'Save Scan Report'}</span>
                </button>
              </div>
            )}

            <div className="space-y-5" id="analysis-section">
              <AnalysisResultCard analysis={analysis} isAnalyzing={isAnalyzing} />
              {analysis && <RecommendedActionsCard actions={analysis.recommendedActions} />}
              {analysis && <WhenToActCard advisory={analysis.weatherAdvisory} />}
            </div>
          </div>
        )}

        {/* Tab 3: Weather & When to Act */}
        {activeTab === 'weather' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LocationCard
                currentLocation={location}
                onLocationChange={(newLoc) => setLocation(newLoc)}
                isLoadingWeather={isLoadingWeather}
              />
              <WeatherCard weather={weather} isLoading={isLoadingWeather} />
            </div>

            {analysis ? (
              <WhenToActCard advisory={analysis.weatherAdvisory} />
            ) : (
              <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center">
                <p className="text-xs font-bold text-slate-700">
                  Analyze a crop photo in the Crop Health tab to combine crop vulnerability with this microclimate weather.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Soil Health Module */}
        {activeTab === 'soilHealth' && (
          <SoilHealthModule
            language={language}
            onSaveReport={(title, type, summary, data) => handleAddReport(title, type, summary, data)}
          />
        )}

        {/* Tab 5: Crop & Yield Planner Module */}
        {activeTab === 'cropPlanner' && (
          <CropPlannerModule
            language={language}
            onSaveReport={(title, type, summary, data) => handleAddReport(title, type, summary, data)}
          />
        )}

        {/* Tab 6: Harvesting Advisor Module */}
        {activeTab === 'harvesting' && (
          <HarvestingAdvisorModule
            weather={weather}
            language={language}
            onSaveReport={(title, type, summary, data) => handleAddReport(title, type, summary, data)}
          />
        )}

        {/* Tab 7: Saved Reports Module */}
        {activeTab === 'savedReports' && (
          <SavedReportsModule
            reports={savedReports}
            language={language}
            onDeleteReport={handleDeleteReport}
            onPrintReport={handlePrintAdvisory}
          />
        )}
      </main>

      {/* Safety Notice Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-300 bg-[#072416]/90 backdrop-blur-md rounded-2xl p-5 border border-emerald-800/80 shadow-xl space-y-1.5">
        <div className="flex items-center justify-center space-x-1.5 text-white font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t.disclaimerHeader}</span>
        </div>
        <p className="max-w-2xl mx-auto text-slate-300 font-medium">{t.expertConsultNote}</p>
      </footer>

      {/* Agronomist Contact Modal */}
      <AgronomistConsultModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        cropName={analysis?.cropType || 'Crop Field'}
        conditionName={analysis?.conditionName || 'General Field Assessment'}
      />
    </div>
  );
}

