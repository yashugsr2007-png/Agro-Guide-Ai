import React from 'react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import { LayoutDashboard, Stethoscope, CloudSun, TestTube2, Sprout, Scissors, BookmarkCheck } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  language: Language;
  savedCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  language,
  savedCount,
}) => {
  const t = TRANSLATIONS[language];

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: t.tabDashboard,
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'cropHealth',
      label: t.tabCropHealth,
      icon: <Stethoscope className="w-4 h-4" />,
    },
    {
      id: 'weather',
      label: t.tabWeather,
      icon: <CloudSun className="w-4 h-4" />,
    },
    {
      id: 'soilHealth',
      label: t.tabSoilHealth,
      icon: <TestTube2 className="w-4 h-4" />,
    },
    {
      id: 'cropPlanner',
      label: t.tabCropPlanner,
      icon: <Sprout className="w-4 h-4" />,
    },
    {
      id: 'harvesting',
      label: t.tabHarvesting,
      icon: <Scissors className="w-4 h-4" />,
    },
    {
      id: 'savedReports',
      label: t.tabSavedReports,
      icon: <BookmarkCheck className="w-4 h-4" />,
      badge: savedCount,
    },
  ];

  return (
    <div className="bg-[#0a2f1c] border-b border-emerald-900/80 sticky top-[65px] z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1.5 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none" aria-label="Modules">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2d8351] text-white shadow-md ring-1 ring-emerald-400/50'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-emerald-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-amber-400 text-amber-950' : 'bg-emerald-900 text-emerald-200 border border-emerald-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
