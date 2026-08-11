import React from 'react';
import { ActiveTab, WeatherData, Language, SavedReport } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import {
  Stethoscope,
  CloudSun,
  TestTube2,
  Sprout,
  Scissors,
  BookmarkCheck,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  SunMedium,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface FarmerDashboardProps {
  onNavigate: (tab: ActiveTab) => void;
  weather: WeatherData | null;
  savedCount: number;
  recentReport?: SavedReport;
  language: Language;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  onNavigate,
  weather,
  savedCount,
  recentReport,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6 pt-2">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-[#092e1d]/80 backdrop-blur-md border border-emerald-800/70 shadow-2xl text-white">
        <div className="relative z-10 max-w-3xl space-y-3">
          {/* Tag Pill */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0d3f28] text-emerald-300 text-xs font-bold border border-emerald-700/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Farming Assistant</span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Welcome to <span className="text-emerald-400">AgroGuide</span> Assistant
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
            {t.dashboardSub}
          </p>

          {/* Location & Microclimate Capsule Bar */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center gap-3 bg-[#061f13]/90 backdrop-blur-md border border-emerald-800/80 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 shadow-lg">
              <div 
                onClick={() => onNavigate('weather')} 
                className="flex items-center space-x-1.5 text-emerald-300 hover:text-white cursor-pointer transition-colors"
              >
                <span>📍</span>
                <span className="font-bold text-white">{weather?.locationName || 'Vijayawada, Andhra Pradesh'}</span>
              </div>

              <span className="text-emerald-800 hidden sm:inline">|</span>

              <div className="flex items-center space-x-1.5">
                <SunMedium className="w-4 h-4 text-amber-400" />
                <span>{weather ? `${weather.temperatureC}°C ${weather.condition}` : '31°C Clear Sky'}</span>
              </div>

              <span className="text-emerald-800 hidden sm:inline">|</span>

              <div className="flex items-center space-x-1.5">
                <span className="text-sky-400">💧</span>
                <span>{weather ? `${weather.humidity}% Humidity` : '45% Humidity'}</span>
              </div>

              <span className="text-emerald-800 hidden sm:inline">|</span>

              <div className="flex items-center space-x-1.5">
                <span className="text-emerald-400">💨</span>
                <span>{weather ? `${weather.windKmH} km/h Wind` : '12 km/h Wind Speed'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Leaf Background Graphic */}
        <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <Sprout className="w-64 h-64 text-emerald-300" />
        </div>
      </div>

      {/* 6 Core AI Tools & Advisors Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: Crop Health */}
        <div
          onClick={() => onNavigate('cropHealth')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-emerald-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-emerald-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <Stethoscope className="w-7 h-7 text-emerald-900" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors mb-1.5">
              {t.moduleCards.cropHealthTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.cropHealthDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>Analyze Crop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2: Weather & When to Act */}
        <div
          onClick={() => onNavigate('weather')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-sky-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#bae6fd] text-sky-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <CloudSun className="w-7 h-7 text-sky-900" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-sky-300 transition-colors mb-1.5">
              {t.moduleCards.weatherTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.weatherDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#0284c7] hover:bg-[#0369a1] text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>Check Weather</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3: Soil Health */}
        <div
          onClick={() => onNavigate('soilHealth')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-amber-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#fef08a] text-amber-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <TestTube2 className="w-7 h-7 text-amber-900" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
              {t.moduleCards.soilTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.soilDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#ca8a04] hover:bg-[#a16207] text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>Analyze Soil</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 4: Crop & Yield Planner */}
        <div
          onClick={() => onNavigate('cropPlanner')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-emerald-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#a7f3d0] text-emerald-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-7 h-7 text-emerald-950" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors mb-1.5">
              {t.moduleCards.plannerTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.plannerDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#16a34a] hover:bg-[#15803d] text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>Plan Crop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 5: Harvesting Advisor */}
        <div
          onClick={() => onNavigate('harvesting')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-amber-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#ffedd5] text-amber-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <Scissors className="w-7 h-7 text-amber-900" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-1.5">
              {t.moduleCards.harvestTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.harvestDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#ea580c] hover:bg-[#c2410c] text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>Get Advice</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 6: Saved Reports */}
        <div
          onClick={() => onNavigate('savedReports')}
          className="group bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 border border-[#1b5035]/80 hover:border-purple-500/80 shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-full bg-[#ddd6fe] text-purple-950 flex items-center justify-center font-bold mb-4 shadow-md group-hover:scale-105 transition-transform">
              <BookmarkCheck className="w-7 h-7 text-purple-900" />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-purple-300 transition-colors mb-1.5">
              {t.moduleCards.reportsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-6">
              {t.moduleCards.reportsDesc}
            </p>
          </div>
          <button
            type="button"
            className="w-fit bg-[#6366f1] hover:bg-[#4f46e5] text-white font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md group-hover:pr-5"
          >
            <span>View Reports</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row: 3 Wide Horizontal Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Saved Crop Reports */}
        <div
          onClick={() => onNavigate('savedReports')}
          className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-4 border border-[#1b5035]/80 hover:border-emerald-500/70 shadow-lg transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#0e3b26] text-emerald-400 rounded-2xl border border-emerald-800/80 shrink-0">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">{t.savedScansCount}</div>
              <div className="text-lg font-black text-white">{savedCount} Records</div>
              <div className="text-[11px] text-slate-300">View all your saved crop analysis reports.</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>

        {/* Microclimate Weather Risk */}
        <div
          onClick={() => onNavigate('weather')}
          className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-4 border border-[#1b5035]/80 hover:border-amber-500/70 shadow-lg transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#3a2800]/80 text-amber-400 rounded-2xl border border-amber-800/80 shrink-0">
              <SunMedium className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">{t.weatherRiskTitle}</div>
              <div className="text-base font-black text-amber-300">
                {weather ? `${weather.humidity}% Humidity (${weather.humidityRisk} Risk)` : '45% Humidity (Low Risk)'}
              </div>
              <div className="text-[11px] text-slate-300">Fungal risk is low for the next 3 days.</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>

        {/* Recent Activity Status */}
        <div
          onClick={() => onNavigate(recentReport ? 'savedReports' : 'cropHealth')}
          className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-4 border border-[#1b5035]/80 hover:border-emerald-500/70 shadow-lg transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-[#0e3b26] text-emerald-400 rounded-2xl border border-emerald-800/80 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300">{t.recentActivityTitle}</div>
              <div className="text-sm font-black text-white truncate max-w-[170px]">
                {recentReport ? recentReport.title : 'Tomato Leaf Scan — Leaf Blight Detected'}
              </div>
              <div className="text-[11px] text-slate-300">
                {recentReport ? new Date(recentReport.timestamp).toLocaleDateString() : '11 May 2025, 10:45 AM'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
        </div>
      </div>
    </div>
  );
};
