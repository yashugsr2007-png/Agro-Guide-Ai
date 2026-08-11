import React from 'react';
import { WeatherData } from '../types';
import { CloudRain, Droplets, Thermometer, Wind, AlertCircle, ShieldAlert, Sun, CloudFog } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData | null;
  isLoading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, isLoading }) => {
  if (isLoading) {
    return (
      <div id="weather-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#1b5035]/80 animate-pulse text-white">
        <div className="h-6 bg-emerald-900/60 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          <div className="h-16 bg-emerald-900/40 rounded-xl"></div>
          <div className="h-16 bg-emerald-900/40 rounded-xl"></div>
          <div className="h-16 bg-emerald-900/40 rounded-xl"></div>
          <div className="h-16 bg-emerald-900/40 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const getHumidityRiskBadge = (risk: WeatherData['humidityRisk']) => {
    switch (risk) {
      case 'Severe':
        return {
          bg: 'bg-rose-950/90 text-rose-200 border-rose-700',
          icon: ShieldAlert,
          label: 'Severe Fungal & Mold Risk',
        };
      case 'High':
        return {
          bg: 'bg-amber-950/90 text-amber-200 border-amber-700',
          icon: AlertCircle,
          label: 'High Humidity Risk',
        };
      case 'Moderate':
        return {
          bg: 'bg-yellow-950/90 text-yellow-200 border-yellow-700',
          icon: AlertCircle,
          label: 'Moderate Spore Risk',
        };
      default:
        return {
          bg: 'bg-emerald-950/90 text-emerald-200 border-emerald-700',
          icon: Sun,
          label: 'Low Disease Risk',
        };
    }
  };

  const riskBadge = getHumidityRiskBadge(weather.humidityRisk);
  const RiskIcon = riskBadge.icon;

  return (
    <div id="weather-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl border border-[#1b5035]/80 text-white transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-sky-400 border border-emerald-800/80 flex items-center justify-center">
            <CloudRain className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Local Weather & Crop Moisture</h2>
            <p className="text-xs text-slate-300">{weather.locationName}</p>
          </div>
        </div>

        {/* Humidity Risk Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${riskBadge.bg}`}>
          <RiskIcon className="w-3.5 h-3.5" />
          <span>{riskBadge.label}</span>
        </div>
      </div>

      {/* Metrics 4-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3.5">
        {/* Temperature */}
        <div className="bg-[#072416]/80 border border-emerald-800/80 rounded-xl p-3 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-800">
            <Thermometer className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xs text-slate-300 font-medium">Temperature</div>
            <div className="text-base font-bold text-white">
              {weather.temperatureC}°C <span className="text-xs text-slate-400 font-normal">({weather.temperatureF}°F)</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-[#072416]/80 border border-emerald-800/80 rounded-xl p-3 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-sky-950/80 text-sky-400 border border-sky-800">
            <Droplets className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-xs text-slate-300 font-medium">Relative Humidity</div>
            <div className="text-base font-bold text-white">{weather.humidity}%</div>
          </div>
        </div>

        {/* Rain Probability */}
        <div className="bg-[#072416]/80 border border-emerald-800/80 rounded-xl p-3 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-800">
            <CloudRain className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs text-slate-300 font-medium">Rain Chance</div>
            <div className="text-base font-bold text-white">{weather.rainProbability}%</div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="bg-[#072416]/80 border border-emerald-800/80 rounded-xl p-3 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-teal-950/80 text-teal-400 border border-teal-800">
            <Wind className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="text-xs text-slate-300 font-medium">Wind Speed</div>
            <div className="text-base font-bold text-white">{weather.windKmH} km/h</div>
          </div>
        </div>
      </div>

      {/* Forecast & Crop Impact Summary */}
      <div className="bg-[#072416]/90 border border-emerald-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 flex items-start space-x-2.5">
        <CloudFog className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-emerald-300">Weather Microclimate Summary: </span>
          <span>{weather.forecastSummary}</span>
        </div>
      </div>
    </div>
  );
};
