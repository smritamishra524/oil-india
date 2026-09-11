import React from 'react';
import { History, Search, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HistoricalSimilarity: React.FC = () => {
  const { selectedReport, reports, selectReport, setActiveTab } = useApp();

  if (!selectedReport) return null;

  // Calculate similarity against other reports in repository
  const similarReports = reports
    .filter(r => r.id !== selectedReport.id)
    .map(r => {
      let score = 40;
      if (r.activity === selectedReport.activity) score += 20;
      if (r.hazard === selectedReport.hazard) score += 20;
      if (r.barrier === selectedReport.barrier) score += 15;
      if (r.sifPrecursor === selectedReport.sifPrecursor) score += 15;
      if (r.installation === selectedReport.installation) score += 10;
      return {
        report: r,
        similarityScore: Math.min(96, score)
      };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, 6);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <History className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
                AI Similarity Search
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Pattern Corroboration</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Historical Pattern Similarity</h1>
            <p className="text-xs text-slate-500">
              Cross-referencing report {selectedReport.id} against past OIL near-misses and precursor records to identify recurrent weaknesses.
            </p>
          </div>
        </div>

        <select
          value={selectedReport.id}
          onChange={(e) => selectReport(e.target.value)}
          className="text-xs p-2 border border-slate-300 rounded-lg bg-slate-50 font-medium max-w-[240px] truncate outline-none"
        >
          {reports.slice(0, 20).map(r => (
            <option key={r.id} value={r.id}>
              {r.id} • {r.asset} ({r.sifPrecursor})
            </option>
          ))}
        </select>
      </div>

      {/* Target Report Context */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-oil-400 font-mono font-bold">{selectedReport.id}</span>
          <span className="text-slate-400 mx-2">•</span>
          <span className="font-semibold text-slate-200">{selectedReport.installation} ({selectedReport.asset})</span>
          <p className="text-slate-300 mt-1 font-mono text-[11px] line-clamp-1">"{selectedReport.narrative}"</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="px-2 py-1 bg-slate-800 rounded font-bold text-oil-300">{selectedReport.sifPrecursor}</span>
          <span className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded font-bold">{selectedReport.barrier}</span>
        </div>
      </div>

      {/* Similar Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarReports.map(({ report, similarityScore }, idx) => (
          <div
            key={report.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3 hover:border-oil-500 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-slate-800">{report.id}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{report.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-xs font-mono text-oil-700">{similarityScore}%</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Match</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-mono line-clamp-2">
              "{report.narrative}"
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Common Barrier:</span>
                <span className="font-semibold text-rose-700 truncate block">{report.barrier}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Common Precursor:</span>
                <span className="font-semibold text-slate-800 truncate block">{report.sifPrecursor}</span>
              </div>
            </div>

            {/* Historical Lesson Learned */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1 text-oil-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-oil-600" />
                Previous Corrective Lesson Learned:
              </div>
              <p className="text-[11px] text-emerald-900 leading-relaxed">
                {report.recommendedIntervention.primary}
              </p>
            </div>

            <button
              onClick={() => {
                selectReport(report.id);
                setActiveTab('report-analyzer');
              }}
              className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded transition-colors text-center flex items-center justify-center gap-1"
            >
              Open Full Analysis <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
