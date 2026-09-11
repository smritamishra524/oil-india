import React from 'react';
import { TrendingUp, TrendingDown, Minus, Info, AlertTriangle, ChevronRight, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrecursorVelocity: React.FC = () => {
  const { precursorVelocity, setActiveTab } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                  Acceleration Metric
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs font-semibold text-slate-500">Temporal Rate of Occurrence</span>
              </div>
              <h1 className="text-xl font-black text-slate-900">Precursor Velocity Index</h1>
              <p className="text-xs text-slate-500">
                Measures rate-of-change in precursor reporting between trailing 90 days and current 30 days to flag accelerating hazards.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Safety Rule */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>This is an operational prioritization indicator, not an accident prediction.</span>
        </div>
      </div>

      {/* Velocity Cards Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Active SIF Precursor Velocity Rankings
          </h3>
          <span className="text-xs text-slate-500">Baseline: Trailing 90 Days Normalized</span>
        </div>

        <div className="divide-y divide-slate-200">
          {precursorVelocity.map((pv, idx) => {
            const isIncreasing = pv.classification === 'INCREASING';
            const isDeclining = pv.classification === 'DECLINING';

            return (
              <div key={idx} className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-900">{pv.precursor}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                      isIncreasing ? 'bg-rose-100 text-rose-800' :
                      isDeclining ? 'bg-emerald-100 text-emerald-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {pv.classification}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Highest concentration observed at <span className="font-semibold text-slate-800">{pv.topInstallation}</span>.
                  </p>
                </div>

                {/* Counts & Multiplier */}
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-500">Past 90 Days</div>
                    <div className="font-mono font-bold text-slate-800 text-sm">{pv.countPrevious90Days}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-500">Current 30 Days</div>
                    <div className="font-mono font-bold text-slate-900 text-base">{pv.countCurrent30Days}</div>
                  </div>

                  <div className="text-right pl-4 border-l border-slate-200">
                    <div className="text-xs font-semibold text-slate-500">Velocity Factor</div>
                    <div className={`font-mono font-black text-lg flex items-center gap-1 justify-end ${
                      isIncreasing ? 'text-rose-600' : isDeclining ? 'text-emerald-600' : 'text-slate-700'
                    }`}>
                      {isIncreasing ? <TrendingUp className="w-4 h-4 text-rose-600" /> :
                       isDeclining ? <TrendingDown className="w-4 h-4 text-emerald-600" /> :
                       <Minus className="w-4 h-4 text-slate-500" />}
                      {pv.velocityMultiplier}×
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={() => setActiveTab('barrier-degradation')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    Inspect Barrier Health <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
