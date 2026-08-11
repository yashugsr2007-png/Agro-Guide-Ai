import React from 'react';
import { Sprout, Volume2, VolumeX, PhoneCall, Printer, Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onOpenConsultModal: () => void;
  onPrintAdvisory: () => void;
  hasAnalysis: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  isSpeaking,
  onToggleSpeech,
  onOpenConsultModal,
  onPrintAdvisory,
  hasAnalysis,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="bg-[#072416] text-white shadow-md border-b border-emerald-900/80 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Tagline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md ring-2 ring-emerald-400/30">
                <Sprout className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                    Agro<span className="text-emerald-400">Guide</span>
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 font-semibold">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    AI Assistant
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80 font-medium truncate max-w-[280px] sm:max-w-none">
                  {t.tagline}
                </p>
              </div>
            </div>

            {/* Mobile Action Shortcuts */}
            <div className="flex md:hidden items-center space-x-2">
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="bg-emerald-950 text-emerald-100 text-xs font-bold py-2 px-2.5 rounded-lg border border-emerald-700 appearance-none pr-6 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिंदी</option>
                </select>
                <Globe className="w-3.5 h-3.5 text-emerald-300 absolute right-1.5 top-2.5 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={onToggleSpeech}
                title={t.listenAudio}
                className={`p-2 rounded-lg border ${
                  isSpeaking
                    ? 'bg-amber-400 text-amber-950 border-amber-300 animate-pulse'
                    : 'bg-emerald-900/80 text-emerald-100 border-emerald-700/80'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop Right Action Bar */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Language Selector Dropdown */}
            <div className="flex items-center space-x-1.5 bg-[#0b3320] px-3 py-2 rounded-xl border border-emerald-800/80 text-white">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-emerald-100 text-xs font-bold focus:outline-none cursor-pointer py-0.5 pr-1"
                aria-label={t.selectLanguage}
              >
                <option value="en" className="bg-emerald-950 text-white">English (US/Global)</option>
                <option value="te" className="bg-emerald-950 text-white">తెలుగు (Telugu)</option>
                <option value="hi" className="bg-emerald-950 text-white">हिंदी (Hindi)</option>
              </select>
            </div>

            {/* Audio Voice Reading */}
            <button
              type="button"
              onClick={onToggleSpeech}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shadow-xs ${
                isSpeaking
                  ? 'bg-amber-400 text-amber-950 border-amber-300 animate-pulse'
                  : 'bg-[#0e3b26] text-white border border-emerald-700/70 hover:bg-[#134930]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-950" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.listenAudio}</span>
                </>
              )}
            </button>

            {/* Contact Agronomist */}
            <button
              type="button"
              onClick={onOpenConsultModal}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0e3b26] text-white border border-emerald-700/70 hover:bg-[#134930] transition-all shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{t.contactAgronomist}</span>
            </button>

            {/* Print Advisory */}
            {hasAnalysis && (
              <button
                type="button"
                onClick={onPrintAdvisory}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0e3b26] text-white border border-emerald-700/70 hover:bg-[#134930] transition-all shadow-xs"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>{t.printAdvisory}</span>
              </button>
            )}

            {/* Safety Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-[11px] text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.safetyVerified}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

