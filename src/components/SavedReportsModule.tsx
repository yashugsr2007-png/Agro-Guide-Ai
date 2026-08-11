import React, { useState } from 'react';
import { SavedReport, Language } from '../types';
import { TRANSLATIONS } from '../lib/translations';
import { BookmarkCheck, Trash2, Printer, Search, Stethoscope, TestTube2, Sprout, Scissors, FileText, X } from 'lucide-react';

interface SavedReportsModuleProps {
  reports: SavedReport[];
  language: Language;
  onDeleteReport: (id: string) => void;
  onPrintReport?: (report: SavedReport) => void;
}

export const SavedReportsModule: React.FC<SavedReportsModuleProps> = ({
  reports,
  language,
  onDeleteReport,
  onPrintReport,
}) => {
  const t = TRANSLATIONS[language];
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);

  const filteredReports = reports.filter((rep) => {
    const matchesType = filterType === 'all' || rep.type === filterType;
    const matchesSearch =
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getIconForType = (type: SavedReport['type']) => {
    switch (type) {
      case 'crop':
        return <Stethoscope className="w-4 h-4 text-emerald-600" />;
      case 'soil':
        return <TestTube2 className="w-4 h-4 text-amber-600" />;
      case 'yield':
        return <Sprout className="w-4 h-4 text-emerald-700" />;
      case 'harvest':
        return <Scissors className="w-4 h-4 text-sky-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200/80 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <BookmarkCheck className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Saved Scans & Advisory Reports</h2>
              <p className="text-xs text-slate-500">Access offline records of crop scans, soil tests, and harvesting plans.</p>
            </div>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Total Saved: {reports.length}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop, disease, or report title..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'crop', 'soil', 'yield', 'harvest'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                  filterType === type
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-8 text-center border border-slate-200/80 shadow-xs">
          <BookmarkCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">{t.noReportsYet}</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Use any of the AI modules above and click "Save Report" to store diagnostic logs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-slate-100">{getIconForType(report.type)}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {report.type} report
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{report.date}</span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 line-clamp-1">{report.title}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{report.summary}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-900 underline"
                >
                  View Details
                </button>

                <div className="flex items-center space-x-2">
                  {onPrintReport && (
                    <button
                      type="button"
                      onClick={() => onPrintReport(report)}
                      title="Print Report"
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDeleteReport(report.id)}
                    title="Delete Report"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative border border-slate-200/80">
            <button
              type="button"
              onClick={() => setSelectedReport(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              {getIconForType(selectedReport.type)}
              <span className="text-xs font-bold uppercase text-slate-500">{selectedReport.type} Report</span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">{selectedReport.title}</h3>
            <p className="text-xs text-slate-500 mb-4">Saved on {selectedReport.date}</p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 border border-slate-200 mb-4 whitespace-pre-wrap">
              {JSON.stringify(selectedReport.data, null, 2)}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
