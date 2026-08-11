import React, { useState } from 'react';
import { MapPin, Navigation, Search, Check, Globe } from 'lucide-react';

interface LocationCardProps {
  currentLocation: string;
  onLocationChange: (newLocation: string) => void;
  isLoadingWeather: boolean;
}

const PRESET_LOCATIONS = [
  { name: 'Central Valley, Fresno CA', label: 'Central Valley, USA' },
  { name: 'Nairobi, Kenya', label: 'Nairobi, Kenya' },
  { name: 'Punjab, India', label: 'Punjab, India' },
  { name: 'Kansai, Japan', label: 'Kansai, Japan' },
];

export const LocationCard: React.FC<LocationCardProps> = ({
  currentLocation,
  onLocationChange,
  isLoadingWeather,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onLocationChange(inputVal.trim());
      setInputVal('');
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        onLocationChange(`Farm Location (${lat}°, ${lon}°)`);
        setIsLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLocating(false);
        alert('Could not determine automatic location. Please type your city or village name.');
      },
      { timeout: 8000 }
    );
  };

  return (
    <div id="location-section" className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 transition-all">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-semibold">
            <MapPin className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">1. Farm Location</h2>
            <p className="text-xs text-slate-500">Retrieves real-time local weather & microclimate data</p>
          </div>
        </div>

        {/* Current Active Location Pill */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentLocation}</span>
        </span>
      </div>

      {/* Location Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type city, village, or district (e.g., Fresno, Nairobi, Punjab)..."
            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        </div>

        <button
          type="submit"
          disabled={isLoadingWeather || !inputVal.trim()}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <span>Update Location</span>
        </button>

        <button
          type="button"
          onClick={handleGeolocate}
          disabled={isLocating || isLoadingWeather}
          className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl border border-slate-300 transition-all flex items-center justify-center space-x-1.5"
          title="Use GPS device location"
        >
          <Navigation className={`w-4 h-4 text-emerald-700 ${isLocating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'GPS Detect'}</span>
        </button>
      </form>

      {/* Quick Region Presets */}
      <div className="flex items-center space-x-2 pt-1 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          Quick Regions:
        </span>
        {PRESET_LOCATIONS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onLocationChange(preset.name)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all shrink-0 ${
              currentLocation === preset.name
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};
