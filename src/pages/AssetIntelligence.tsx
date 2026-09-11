import React, { useState } from 'react';
import { Layers, Flame, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Activity, Wrench, Info } from 'lucide-react';
import { SYNTHETIC_ASSETS, AssetDetail } from '../data/assets';
import { useApp } from '../context/AppContext';

export const AssetIntelligence: React.FC = () => {
  const { safetyDebtScore, correctiveActions, barrierHealth, reports } = useApp();

  const [selectedAssetId, setSelectedAssetId] = useState<string>('AST-VAL-01');

  const selectedAsset = SYNTHETIC_ASSETS.find(a => a.id === selectedAssetId) || SYNTHETIC_ASSETS[0];

  const LIFECYCLE_STAGES = [
    'Inspection',
    'Observation',
    'Repeated Issue',
    'Degradation',
    'Maintenance',
    'Risk Escalation'
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
                Hardware Lifecycle
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Asset Health & Integrity</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Asset Safety Intelligence & Lifecycle</h1>
            <p className="text-xs text-slate-500">
              Tracking degradation progression across wellheads, pipelines, separation vessels, and workover rigs.
            </p>
          </div>
        </div>

        {/* Safety Debt Metric Callout (Section 27) */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center space-x-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-amber-500 text-charcoal-950 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-bold text-amber-900 uppercase">Safety Debt</span>
              <span className="text-[10px] text-amber-700 font-mono font-semibold">({safetyDebtScore}/100)</span>
            </div>
            <div className="text-[10px] text-amber-800 font-semibold">
              Proposed Intelligence Metric
            </div>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SYNTHETIC_ASSETS.map((asset) => {
          const isSelected = asset.id === selectedAssetId;
          const isCritical = asset.riskRating === 'Critical';

          return (
            <div
              key={asset.id}
              onClick={() => setSelectedAssetId(asset.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'border-oil-600 bg-oil-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-500">{asset.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  isCritical ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {asset.riskRating}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{asset.name}</h3>
              <p className="text-[11px] text-slate-500">{asset.installation}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Health: <span className="font-bold text-slate-700">{asset.healthScore}%</span></span>
                <span className="font-semibold text-oil-700">{asset.lifecycleStage}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Asset Detailed Lifecycle Dossier */}
      {selectedAsset && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400">{selectedAsset.category} • {selectedAsset.installation}</span>
              <h2 className="text-base font-bold text-slate-900">{selectedAsset.name}</h2>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Last Inspected</span>
                <span className="font-mono font-bold text-slate-800">{selectedAsset.lastInspectionDate}</span>
              </div>
              <div className="pl-4 border-l border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">30-Day Failure Count</span>
                <span className="font-mono font-bold text-rose-600 text-sm">{selectedAsset.failureCount30d} Events</span>
              </div>
            </div>
          </div>

          {/* 6-Stage Lifecycle Progress Bar */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
              Degradation Lifecycle Progression:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {LIFECYCLE_STAGES.map((stage, idx) => {
                const isCurrent = selectedAsset.lifecycleStage === stage;
                const stageIndex = LIFECYCLE_STAGES.indexOf(selectedAsset.lifecycleStage);
                const isPast = idx <= stageIndex;

                return (
                  <div
                    key={stage}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center space-y-1 ${
                      isCurrent
                        ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold shadow-xs'
                        : isPast
                        ? 'border-oil-500 bg-oil-50/50 text-oil-800 font-semibold'
                        : 'border-slate-200 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono">Stage {idx + 1}</span>
                    <span className="text-[11px] leading-tight">{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integrity Notes & Mitigation Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-600 uppercase text-[10px]">Mechanical Integrity Observation:</span>
              <p className="text-slate-800 leading-relaxed font-medium">{selectedAsset.integrityNotes}</p>
            </div>

            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-1">
              <span className="font-bold text-oil-800 uppercase text-[10px]">Corrective Maintenance Protocol:</span>
              <p className="text-emerald-950 leading-relaxed font-medium">{selectedAsset.mitigationPlan}</p>
            </div>
          </div>

        </div>
      )}

      {/* Safety Debt Explainer Card (Section 27) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Safety Debt Calculation Framework (Proposed Intelligence Metric)
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Safety Debt quantifies cumulative organizational risk resulting from repeated unresolved precursors, deferred preventative maintenance, overdue corrective actions, and reliance on temporary containment repairs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px]">Repeated Precursors:</span>
            <span className="font-bold text-slate-900">+12 pts (Energy Isolation)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px]">Overdue Corrective Actions:</span>
            <span className="font-bold text-rose-600">+16 pts (2 Overdue)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px]">Degrading Barriers:</span>
            <span className="font-bold text-amber-600">+18 pts (LOTO & Fall)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-500 block text-[10px]">Temporary Repairs Active:</span>
            <span className="font-bold text-slate-900">+22 pts (Drip pan / clamps)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
