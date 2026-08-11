import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, Sparkles, RefreshCw, Leaf, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SAMPLE_CROPS } from '../data/sampleCrops';
import { SampleCrop } from '../types';

interface CropUploadCardProps {
  selectedImage: string | null;
  cropHint: string;
  onImageSelect: (base64Image: string) => void;
  onCropHintChange: (hint: string) => void;
  onSelectSample: (sample: SampleCrop) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onReset: () => void;
}

export const CropUploadCard: React.FC<CropUploadCardProps> = ({
  selectedImage,
  cropHint,
  onImageSelect,
  onCropHintChange,
  onSelectSample,
  onAnalyze,
  isAnalyzing,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid crop or leaf photo.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelect(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div id="upload-section" className="bg-[#0c311f]/85 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#1b5035]/80 text-white transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#0e3b26] text-emerald-400 border border-emerald-800/80 flex items-center justify-center font-semibold">
            <Leaf className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Crop Leaf Photo Upload</h2>
            <p className="text-xs text-slate-300">Take a clear photo of an affected leaf or leaf underside</p>
          </div>
        </div>

        {selectedImage && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-emerald-300 hover:text-white bg-[#0e3b26] hover:bg-emerald-900/80 rounded-xl border border-emerald-700/80 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Change Photo</span>
          </button>
        )}
      </div>

      {/* Main Upload Dropzone or Selected Image Preview */}
      {!selectedImage ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer bg-[#072416]/70 hover:bg-[#0a2f1c] ${
            dragActive ? 'border-emerald-400 bg-emerald-950/90 ring-4 ring-emerald-500/30' : 'border-emerald-800/80'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileChange}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#0e3b26] text-emerald-400 border border-emerald-700 flex items-center justify-center shadow-inner">
            <Upload className="w-7 h-7 text-emerald-400" />
          </div>

          <p className="text-sm font-bold text-white mb-1">
            Tap to upload leaf photo or drag & drop here
          </p>
          <p className="text-xs text-slate-300 max-w-sm mx-auto mb-4">
            For best accuracy, ensure bright daylight and crisp focus on spots or yellowing edges.
          </p>

          {/* Action buttons inside dropzone */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="px-4 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 text-xs font-black rounded-xl shadow-md flex items-center space-x-2 transition-all"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>Take Photo with Camera</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-4 py-2.5 bg-[#0e3b26] hover:bg-emerald-900 text-white text-xs font-bold rounded-xl border border-emerald-700/80 shadow-md flex items-center space-x-2 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Browse Photos</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-2xl overflow-hidden relative group shadow-md border border-emerald-800">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
            <img
              src={selectedImage}
              alt="Uploaded crop leaf sample"
              className="w-full h-full object-cover max-h-[280px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <div className="flex items-center justify-between w-full text-white">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-emerald-900/90 border border-emerald-500/50 rounded-lg text-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Photo Ready for Analysis
                </span>
                <span className="text-xs text-slate-300 font-mono">100% RGB Scan Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preset Sample Gallery for Fast Demo */}
      <div className="mt-4 pt-4 border-t border-emerald-900/80">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Demo Samples (Tap to Test Instantly):
          </span>
          <span className="text-[11px] text-slate-400">4 Preset Conditions</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SAMPLE_CROPS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="p-2 rounded-xl border border-emerald-800/80 hover:border-emerald-500 bg-[#072416]/80 hover:bg-[#0a2f1c] transition-all text-left flex items-center space-x-2.5 group"
            >
              <img
                src={sample.imageUrl}
                alt={sample.cropName}
                className="w-10 h-10 rounded-lg object-cover border border-emerald-700/80 shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{sample.cropName}</div>
                <div className="text-[11px] text-emerald-300 truncate">{sample.issueName}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Optional Crop Hint Input & Main Analyze Button */}
      <div className="mt-4 pt-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={cropHint}
            onChange={(e) => onCropHintChange(e.target.value)}
            placeholder="Optional crop name (e.g., Tomato, Maize, Rice, Cotton)..."
            className="w-full px-3.5 py-2.5 bg-[#072416] border border-emerald-800 rounded-xl text-xs sm:text-sm text-white placeholder-emerald-200/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!selectedImage || isAnalyzing}
          className={`px-6 py-3 rounded-xl text-sm font-black shadow-md transition-all flex items-center justify-center space-x-2 shrink-0 ${
            !selectedImage || isAnalyzing
              ? 'bg-emerald-950/60 text-slate-500 border border-emerald-900/50 cursor-not-allowed opacity-70'
              : 'bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 active:scale-[0.99] ring-2 ring-emerald-400/40'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
              <span>Analyzing Crop with AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span className="text-base">Analyze Crop Health</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
