import React, { useState } from 'react';
import { AlertTriangle, Filter, ShieldAlert, Clock, ChevronRight, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const EarlyWarningCenter: React.FC = () => {
  const { reports, selectReport, setActiveTab } = useApp();

  const [selectedInstallation, setSelectedInstallation] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedPrecursor, setSelectedPrecursor] = useState<string>('ALL');
  const [selectedBarrier, setSelectedBarrier] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Extract unique filter lists
  const installations = Array.from(new Set(reports.map(r => r.installation)));
  const precursors = Array.from(new Set(reports.map(r => r.sifPrecursor)));
  const barriers = Array.from(new Set(reports.map(r => r.barrier)));

  // Apply actual filtering logic
  const filteredReports = reports.filter(r => {
    if (selectedInstallation !== 'ALL' && r.installation !== selectedInstallation) return false;
    if (selectedSeverity !== 'ALL' && r.severity !== selectedSeverity) return false;
    if (selectedPrecursor !== 'ALL' && r.sifPrecursor !== selectedPrecursor) return false;
    if (selectedBarrier !== 'ALL' && r.barrier !== selectedBarrier) return false;
    if (searchFilter && !r.narrative.toLowerCase().includes(searchFilter.toLowerCase()) && !r.asset.toLowerCase().includes(searchFilter.toLowerCase()) && !r.id.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 uppercase">
                Active Radar
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Multivariate Early Warning</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Early Warning Center</h1>
            <p className="text-xs text-slate-500">
              Aggregated early warning signals across critical precursor clusters, degrading barriers, and repeated control lapses.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500 block">Filtered Results</span>
          <span className="text-xl font-black text-slate-900 font-mono">{filteredReports.length} Signals</span>
        </div>
      </div>

      {/* Filter Bar (Section 24: FILTERS MUST ACTUALLY WORK!) */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
          <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-oil-600" />
            Active Warning Filters
          </span>
          {(selectedInstallation !== 'ALL' || selectedSeverity !== 'ALL' || selectedPrecursor !== 'ALL' || selectedBarrier !== 'ALL' || searchFilter) && (
            <button
              onClick={() => {
                setSelectedInstallation('ALL');
                setSelectedSeverity('ALL');
                setSelectedPrecursor('ALL');
                setSelectedBarrier('ALL');
                setSearchFilter('');
              }}
              className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Installation</label>
            <select
              value={selectedInstallation}
              onChange={(e) => setSelectedInstallation(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-oil-500"
            >
              <option value="ALL">All Installations ({installations.length})</option>
              {installations.map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-oil-500"
            >
              <option value="ALL">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">SIF Precursor</label>
            <select
              value={selectedPrecursor}
              onChange={(e) => setSelectedPrecursor(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-oil-500 truncate"
            >
              <option value="ALL">All Precursors</option>
              {precursors.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Barrier System</label>
            <select
              value={selectedBarrier}
              onChange={(e) => setSelectedBarrier(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-oil-500 truncate"
            >
              <option value="ALL">All Barriers</option>
              {barriers.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Search Keywords</label>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search narrative, asset..."
              className="w-full p-2 border border-slate-300 rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-oil-500"
            />
          </div>

        </div>
      </div>

      {/* Filtered Alerts Stream */}
      <div className="space-y-3">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => {
                selectReport(report.id);
                setActiveTab('report-analyzer');
              }}
              className="p-4 bg-white border border-slate-200 hover:border-oil-600 rounded-xl shadow-xs hover:shadow-sm cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-mono font-bold text-oil-700">{report.id}</span>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold text-slate-700">{report.installation}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">{report.asset}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-oil-700 transition-colors line-clamp-1">
                  {report.sifPrecursor} — {report.hazard}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 font-mono">
                  "{report.narrative}"
                </p>
              </div>

              <div className="flex items-center space-x-3 flex-shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Risk Score</div>
                  <div className="font-mono font-black text-rose-600 text-sm">{report.riskScore}/100</div>
                </div>

                <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                  report.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                  report.severity === 'High' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {report.severity}
                </span>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-oil-600 transition-all" />
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="font-semibold text-slate-700">No signals match the active filter criteria.</p>
            <p className="text-xs text-slate-400 mt-1">Adjust or clear the filters above to expand results.</p>
          </div>
        )}
      </div>
    </div>
  );
};
