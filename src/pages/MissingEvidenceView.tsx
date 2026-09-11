import React from 'react';
import { FileQuestion, AlertTriangle, CheckCircle2, ChevronRight, Send, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissingEvidenceView: React.FC = () => {
  const { selectedReport, reports, selectReport, setActiveTab } = useApp();

  if (!selectedReport) return null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <FileQuestion className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                Completeness Audit
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Evidence Rigor</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Missing Evidence Detector</h1>
            <p className="text-xs text-slate-500">
              Flags critical verification evidence absent from safety reports (e.g. zero-energy bleed, 4-gas readings, harness anchor rating).
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
              {r.id} • {r.asset} ({r.completenessScore}% Complete)
            </option>
          ))}
        </select>
      </div>

      {/* Completeness Bar Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Report Completeness Score</span>
            <div className="text-3xl font-black text-slate-900 font-mono">{selectedReport.completenessScore}%</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
            selectedReport.completenessScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {selectedReport.completenessScore >= 80 ? 'Standard Completeness' : 'Evidence Deficit Flagged'}
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              selectedReport.completenessScore >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
            }`}
            style={{ width: `${selectedReport.completenessScore}%` }}
          />
        </div>
      </div>

      {/* Missing Items List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Critical Verification Items Absent from Narrative:
        </h3>

        {selectedReport.missingEvidence.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedReport.missingEvidence.map((me) => (
              <div key={me.id} className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    {me.criticalItem}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    {me.severity} Priority
                  </span>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-lg text-xs text-amber-950 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800">Why Critical for SIF Prevention:</span>
                  <p>{me.whyCritical}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Suggested Supervisory Follow-up Prompt:</span>
                  <p className="italic font-medium">"{me.suggestedPrompt}"</p>
                </div>

                <button
                  onClick={() => alert(`Clarification prompt dispatched to field safety officer for ${me.criticalItem}.`)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Request Additional Evidence from Field
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No Critical Missing Evidence Items Detected</p>
            <p className="text-xs text-slate-400 mt-1">This report contains physical zero-energy checks and supervisory verification logs.</p>
          </div>
        )}
      </div>
    </div>
  );
};
