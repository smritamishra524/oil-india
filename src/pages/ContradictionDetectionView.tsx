import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContradictionDetectionView: React.FC = () => {
  const { selectedReport, reports, selectReport, setActiveTab } = useApp();

  if (!selectedReport) return null;

  // Filter reports with contradictions
  const reportsWithContradictions = reports.filter(r => r.contradictions && r.contradictions.length > 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase">
                Semantic Disconnect
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Procedural Inconsistency</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Contradiction Detection Engine</h1>
            <p className="text-xs text-slate-500">
              Detects conflicting statements within reports (e.g. "Line isolated" vs "Residual pressure observed", "Permit issued" vs "Gas test omitted").
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
              {r.id} • {r.asset} ({r.contradictions.length > 0 ? '⚠️ Contradiction' : 'Clean'})
            </option>
          ))}
        </select>
      </div>

      {/* Target Report Contradiction Inspection */}
      <div className="space-y-4">
        {selectedReport.contradictions.length > 0 ? (
          <div className="space-y-4">
            {selectedReport.contradictions.map((c) => (
              <div key={c.id} className="bg-white border border-rose-300 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <h3 className="text-sm font-bold text-rose-900">Critical Semantic Contradiction Detected ({c.id})</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 uppercase">
                    High SIF Risk Impact
                  </span>
                </div>

                {/* Side-by-side statements comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Statement A (Report Premise):</span>
                    <p className="text-slate-900 font-semibold">{c.statementA}</p>
                  </div>

                  <div className="p-4 bg-rose-50/80 rounded-lg border border-rose-200 space-y-1">
                    <span className="font-bold text-rose-600 uppercase text-[10px]">Statement B (Observed Reality):</span>
                    <p className="text-rose-950 font-bold">{c.statementB}</p>
                  </div>
                </div>

                {/* Analysis & Risk Implication */}
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-2">
                  <div>
                    <span className="font-bold uppercase text-[10px] text-amber-800">AI Root Cause Analysis:</span>
                    <p className="mt-0.5 font-medium">{c.analysis}</p>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60">
                    <span className="font-bold uppercase text-[10px] text-amber-800">Operational Risk Implication:</span>
                    <p className="mt-0.5 font-medium">{c.riskImplication}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Report Reference: <span className="font-mono font-semibold">{selectedReport.id}</span></span>
                  <button
                    onClick={() => {
                      selectReport(selectedReport.id);
                      setActiveTab('report-analyzer');
                    }}
                    className="px-4 py-2 bg-oil-600 text-white rounded-lg text-xs font-bold hover:bg-oil-700 transition-colors"
                  >
                    Open in Report Analyzer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800">No Internal Semantic Contradictions Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Statements in report {selectedReport.id} are logically consistent with observed control barriers.
            </p>
          </div>
        )}
      </div>

      {/* Other Reports Flagged with Contradictions */}
      {reportsWithContradictions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Other Flagged Reports with Contradictions in Database ({reportsWithContradictions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reportsWithContradictions.map((r) => (
              <div
                key={r.id}
                onClick={() => selectReport(r.id)}
                className="p-3 bg-slate-50 hover:bg-rose-50/40 rounded-lg border border-slate-200 hover:border-rose-300 cursor-pointer text-xs space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800">{r.id}</span>
                  <span className="text-rose-600 font-bold">{r.contradictions.length} Conflict(s)</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1">{r.asset} • {r.installation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
