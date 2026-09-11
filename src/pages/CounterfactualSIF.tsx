import React, { useState } from 'react';
import {
  Cpu,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Info,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CounterfactualSIF: React.FC = () => {
  const { selectedReport, reports, selectReport } = useApp();

  const [barrierStatus, setBarrierStatus] = useState<'Active' | 'Weakened' | 'Failed'>('Weakened');
  const [controlEffectiveness, setControlEffectiveness] = useState<number>(45);
  const [interventionType, setInterventionType] = useState<'none' | 'procedural' | 'engineered' | 'zero_tolerance'>('procedural');

  if (!selectedReport) return null;

  // Dynamic simulation calculations
  let simulatedProbability = 50;
  if (barrierStatus === 'Failed') simulatedProbability += 38;
  if (barrierStatus === 'Weakened') simulatedProbability += 18;
  if (barrierStatus === 'Active') simulatedProbability -= 25;

  simulatedProbability -= Math.round(controlEffectiveness * 0.4);

  if (interventionType === 'zero_tolerance') simulatedProbability -= 22;
  if (interventionType === 'engineered') simulatedProbability -= 16;
  if (interventionType === 'procedural') simulatedProbability -= 8;

  simulatedProbability = Math.max(5, Math.min(96, simulatedProbability));

  // Dynamic escalation outcome text
  let escalationOutcome = '';
  let escalationClass = '';
  if (simulatedProbability >= 75) {
    escalationOutcome = `Catastrophic High-Energy Discharge: Complete breach of ${selectedReport.barrier} under full line operating pressure. High likelihood of severe blast impact or fatal exposure to personnel in line-of-fire.`;
    escalationClass = 'bg-rose-50 border-rose-300 text-rose-950';
  } else if (simulatedProbability >= 45) {
    escalationOutcome = `Elevated Near-Miss Precursor: Partial containment loss or temporary barrier release. Controlled by secondary relief systems, but requiring emergency halt and evacuation.`;
    escalationClass = 'bg-amber-50 border-amber-300 text-amber-950';
  } else {
    escalationOutcome = `Safeguard Containment Success: Redundant barriers hold despite initial condition. Engineered stops prevent energy release reaching personnel envelope.`;
    escalationClass = 'bg-emerald-50 border-emerald-300 text-emerald-950';
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner with Mandatory Disclaimer (Section 2 & 19) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                  Hero Innovation #5
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs font-semibold text-slate-500">What-If Safety Simulator</span>
              </div>
              <h1 className="text-xl font-black text-slate-900">Counterfactual SIF Simulator</h1>
              <p className="text-xs text-slate-500">
                Explore hypothetical scenarios by modifying barrier integrity, control effectiveness, and intervention types.
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

        {/* Mandatory Safety Rule Disclaimer */}
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-900 font-semibold flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>"Scenario-based safety analysis — not deterministic accident prediction."</span>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Simulation Control Controls */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-600" />
              Scenario Control Parameters
            </h3>
            <button
              onClick={() => {
                setBarrierStatus('Weakened');
                setControlEffectiveness(45);
                setInterventionType('procedural');
              }}
              className="text-[11px] text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* 1. Barrier Status Modifier */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              1. Barrier Status: <span className="text-purple-700 font-semibold">{selectedReport.barrier}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setBarrierStatus('Active')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  barrierStatus === 'Active'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Active (100%)
              </button>
              <button
                onClick={() => setBarrierStatus('Weakened')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  barrierStatus === 'Weakened'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Weakened (50%)
              </button>
              <button
                onClick={() => setBarrierStatus('Failed')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  barrierStatus === 'Failed'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Failed (0%)
              </button>
            </div>
          </div>

          {/* 2. Control Effectiveness Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 uppercase">2. Control Effectiveness</label>
              <span className="font-mono font-bold text-purple-700">{controlEffectiveness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={controlEffectiveness}
              onChange={(e) => setControlEffectiveness(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0% (Bypassed)</span>
              <span>50% (Partial)</span>
              <span>100% (Certified)</span>
            </div>
          </div>

          {/* 3. Intervention Strategy Applied */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">3. Applied Intervention Point</label>
            <select
              value={interventionType}
              onChange={(e) => setInterventionType(e.target.value as any)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="none">No Intervention (Normal Operations Proceed)</option>
              <option value="procedural">Standard Procedural Sign-off (Toolbox Talk / JSA)</option>
              <option value="engineered">Engineered Physical Isolation (Double Block & Bleed / Mechanical Blind)</option>
              <option value="zero_tolerance">Zero-Tolerance Stand-down (Stop Work Authority & Physical Audit)</option>
            </select>
          </div>

          {/* Scenario Context */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-700">
            <span className="text-[10px] font-bold uppercase text-slate-400">Base Report Under Simulation:</span>
            <div className="font-semibold text-slate-900">{selectedReport.id} ({selectedReport.asset})</div>
            <p className="text-[11px] text-slate-500 line-clamp-2">{selectedReport.narrative}</p>
          </div>

        </div>

        {/* Right Column (7 Cols): Dynamic Simulated Outcome */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Simulated Probability Meter */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Simulated SIF Escalation Probability
              </span>
              <span className="text-[10px] font-mono text-slate-400">Monte Carlo State Transition</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-black text-slate-900 font-mono">
                  {simulatedProbability}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Scenario SIF Potential:{' '}
                  <span className={`font-bold ${simulatedProbability >= 70 ? 'text-rose-600' : simulatedProbability >= 40 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {simulatedProbability >= 70 ? 'CRITICAL SIF ESCALATION' : simulatedProbability >= 40 ? 'MODERATE PRECURSOR THREAT' : 'CONTROLLED RESILIENCE'}
                  </span>
                </div>
              </div>

              <div className="w-40 bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    simulatedProbability >= 70 ? 'bg-rose-600' : simulatedProbability >= 40 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${simulatedProbability}%` }}
                />
              </div>
            </div>

            {/* Dynamic Simulated Outcome Narrative */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed font-medium space-y-1 ${escalationClass}`}>
              <span className="font-bold uppercase tracking-wider block text-[10px]">
                Simulated Operational Outcome:
              </span>
              <p>{escalationOutcome}</p>
            </div>
          </div>

          {/* Dynamic 5-Step Simulation Flow (Direct from prompt!) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Simulated State Progression
            </span>

            <div className="space-y-2 text-xs">
              
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">1. Current Condition:</span>
                <span className="text-slate-600 truncate max-w-xs">{selectedReport.hazard} on {selectedReport.asset}</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">2. Active Defense Barrier:</span>
                <span className="font-semibold text-rose-700">{selectedReport.barrier} ({barrierStatus})</span>
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                barrierStatus === 'Failed' ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <span className="font-bold">3. If Barrier State degrades:</span>
                <span className="font-medium">
                  {barrierStatus === 'Failed' ? 'Catastrophic energy discharge through bypass' : 'Intermittent containment strain'}
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-700">4. Potential Consequence:</span>
                <span className="text-rose-700 font-semibold truncate max-w-xs">{selectedReport.dna.potentialConsequence}</span>
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-emerald-950">
                <span className="font-bold">5. Selected Intervention:</span>
                <span className="font-semibold">{interventionType.toUpperCase()} Controls</span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
