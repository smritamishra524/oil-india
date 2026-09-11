import React, { useState } from 'react';
import {
  GitFork,
  ArrowRight,
  AlertTriangle,
  Shield,
  CheckCircle2,
  ChevronRight,
  Info,
  Flame,
  User,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SIFPathway: React.FC = () => {
  const { selectedReport, reports, selectReport } = useApp();

  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  if (!selectedReport) return null;

  // Build the 6-step causal escalation pathway based on report text and classification
  const PATHWAY_NODES = [
    {
      step: 1,
      title: 'Unsafe Condition / Act',
      desc: selectedReport.narrative.slice(0, 75) + '...',
      evidence: selectedReport.evidence[0] || 'Unsafe condition initiated during operations.',
      barrier: selectedReport.barrier,
      riskContribution: '15%',
      intervention: 'Enforce pre-task Toolbox Talk and Permit-to-Work adherence.'
    },
    {
      step: 2,
      title: 'Failed / Bypassed Control',
      desc: selectedReport.controlFailure,
      evidence: 'Absence of physical zero-energy bleedoff verification.',
      barrier: selectedReport.barrier,
      riskContribution: '25%',
      intervention: 'Independent four-eyes verification before releasing mechanical clamp.'
    },
    {
      step: 3,
      title: 'Active Hazardous Energy',
      desc: selectedReport.hazard,
      evidence: 'Pressurized hydrocarbon volume or elevated potential energy present.',
      barrier: 'Pressure Relief & Bleedoff System',
      riskContribution: '30%',
      intervention: 'Full depressurization through flare header and drain verification.'
    },
    {
      step: 4,
      title: 'Personnel Exposure Proximity',
      desc: selectedReport.exposure,
      evidence: 'Crew positioned directly adjacent to unisolated wellhead cellar.',
      barrier: 'Exclusion Zone & Barricading',
      riskContribution: '15%',
      intervention: 'Red-tape standoff perimeter around active hydraulic components.'
    },
    {
      step: 5,
      title: 'Direct Line of Fire',
      desc: 'Line-of-Fire Trajectory without Standoff Barrier',
      evidence: 'Technicians located in the discharge path of pressurized flange bolts.',
      barrier: 'Deflection Shield & Engineered Standoff',
      riskContribution: '20%',
      intervention: 'Install blast deflection mats and use remote hydraulic tensioners.'
    },
    {
      step: 6,
      title: 'SIF Escalation Potential',
      desc: selectedReport.dna.potentialConsequence,
      evidence: 'Severe injury or fatality outcome envelope.',
      barrier: 'Emergency Shutdown (ESD)',
      riskContribution: 'Critical Consequence',
      intervention: selectedReport.recommendedIntervention.primary
    }
  ];

  const currentNode = PATHWAY_NODES[selectedNodeIndex];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <GitFork className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">
                Hero Innovation #4
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Causal Flow Analysis</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">SIF Escalation Pathway Graph</h1>
            <p className="text-xs text-slate-500">
              Interactive causal network tracing how an initial condition propagates through control failures into SIF potential.
            </p>
          </div>
        </div>

        {/* Report Selector */}
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

      {/* Pathway Node Graph Flow */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Causal Sequence for {selectedReport.id} ({selectedReport.asset})
          </span>
          <span className="text-[11px] text-slate-400">Click any pathway node to inspect intervention options</span>
        </div>

        {/* Horizontal Node Train */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 pt-2">
          {PATHWAY_NODES.map((node, idx) => {
            const isSelected = selectedNodeIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedNodeIndex(idx)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 shadow-md scale-105 z-10'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center">
                      {node.step}
                    </span>
                    <span className="text-[9px] font-bold font-mono text-rose-600">{node.riskContribution}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{node.title}</h4>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 line-clamp-2">{node.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail & Mitigation Window */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Node Findings */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Selected Pathway Node #{currentNode.step}: {currentNode.title}
            </h3>
            <span className="text-xs font-bold text-rose-600">Contribution: {currentNode.riskContribution}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Node Description:</span>
            <div className="font-semibold text-slate-800">{currentNode.desc}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500">Extracted Report Evidence:</span>
            <div className="p-3 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-md text-xs text-amber-950 font-medium">
              "{currentNode.evidence}"
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Defensive Barrier:</span>
            <span className="font-semibold text-rose-700">{currentNode.barrier}</span>
          </div>
        </div>

        {/* Breaking the Pathway */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Intervention Point: How to Break this Pathway
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Barrier Reinforcement
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            By implementing proactive verification at Node #{currentNode.step}, the escalation chain is severed before reaching serious event potential:
          </p>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-oil-800">
              <CheckCircle2 className="w-4 h-4 text-oil-600" />
              Targeted Field Intervention:
            </div>
            <p className="leading-relaxed">
              {currentNode.intervention}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400">Accountability:</span>
            <div className="font-semibold text-slate-700">{selectedReport.recommendedIntervention.responsibleRole}</div>
          </div>
        </div>

      </div>

    </div>
  );
};
