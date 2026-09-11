import React, { useState } from 'react';
import { MapPin, ShieldAlert, AlertTriangle, ChevronRight, Activity, Layers, Info } from 'lucide-react';
import { SYNTHETIC_INSTALLATIONS, InstallationInfo } from '../data/installations';
import { useApp } from '../context/AppContext';

export const InstallationRiskMap: React.FC = () => {
  const { reports, setActiveTab } = useApp();

  const [selectedInstId, setSelectedInstId] = useState<string>('INS-01');

  const selectedInst = SYNTHETIC_INSTALLATIONS.find(i => i.id === selectedInstId) || SYNTHETIC_INSTALLATIONS[0];

  const relatedReports = reports.filter(r => r.installation === selectedInst.name).slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-oil-100 text-oil-700 flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-oil-100 text-oil-800 uppercase">
                  Geospatial Overview
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs font-semibold text-slate-500">Field Asset Concentration</span>
              </div>
              <h1 className="text-xl font-black text-slate-900">OIL Installation Risk Matrix</h1>
              <p className="text-xs text-slate-500">
                Interactive schematic visualization of Oil India operational sectors and precursor concentration.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Safety Rule */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>Synthetic / demo locations and scores — does not represent live confidential OIL operational data.</span>
        </div>
      </div>

      {/* Schematic Map & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 Cols): Schematic Visual Map Container */}
        <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-charcoal-800">
            <span className="font-bold uppercase tracking-wider text-slate-300">
              India Operational Sectors (Assam, Rajasthan, Arunachal)
            </span>
            <span className="text-[11px] font-mono text-oil-400">Click node to inspect installation</span>
          </div>

          {/* Schematic SVG Map Grid */}
          <div className="relative w-full h-80 my-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] rounded-xl border border-charcoal-800/80 p-4">
            
            {/* Ambient sector labels */}
            <div className="absolute top-4 left-6 text-xs font-mono font-bold text-slate-500">
              WESTERN SECTOR (RAJASTHAN)
            </div>
            <div className="absolute bottom-6 right-6 text-xs font-mono font-bold text-slate-500">
              NORTHEAST BASIN (ASSAM & ARUNACHAL)
            </div>

            {/* Render Installation Nodes */}
            {SYNTHETIC_INSTALLATIONS.map((inst) => {
              const isSelected = inst.id === selectedInstId;
              const isCritical = inst.riskScore >= 80;

              return (
                <div
                  key={inst.id}
                  onClick={() => setSelectedInstId(inst.id)}
                  style={{ left: `${inst.coordinates.x}%`, top: `${inst.coordinates.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  {/* Ping animation for high risk */}
                  {isCritical && (
                    <div className="absolute -inset-1.5 rounded-full bg-rose-500/40 animate-ping" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform ${
                      isSelected
                        ? 'bg-amber-400 text-charcoal-950 ring-4 ring-amber-400/30 scale-125'
                        : isCritical
                        ? 'bg-rose-600 text-white hover:scale-110'
                        : 'bg-oil-600 text-white hover:scale-110'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>

                  {/* Tooltip on hover/select */}
                  <div className={`absolute left-1/2 -translate-x-1/2 top-8 px-2.5 py-1 bg-charcoal-950/90 border border-charcoal-700 text-white rounded-md text-[11px] font-semibold whitespace-nowrap shadow-xl pointer-events-none transition-opacity ${
                    isSelected ? 'opacity-100 z-20' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {inst.name} ({inst.riskScore})
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-charcoal-800">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-600" /> Critical (&gt;80)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-oil-600" /> Stable/Warning</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Selected</span>
            </div>
            <span>8 Active Installations</span>
          </div>

        </div>

        {/* Right Column (5 Cols): Selected Installation Dossier */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">{selectedInst.region} • {selectedInst.state}</span>
              <h2 className="text-base font-bold text-slate-900">{selectedInst.name}</h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-rose-600 font-mono">{selectedInst.riskScore}/100</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Installation Risk</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {selectedInst.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Primary Precursor:</span>
              <span className="font-bold text-rose-700 truncate block">{selectedInst.topPrecursor}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Barrier Health:</span>
              <span className={`font-bold uppercase ${
                selectedInst.barrierHealth === 'Critical' ? 'text-rose-600' :
                selectedInst.barrierHealth === 'Degrading' ? 'text-amber-600' :
                'text-emerald-600'
              }`}>{selectedInst.barrierHealth}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">SIF Potential Count:</span>
              <span className="font-mono font-bold text-slate-900">{selectedInst.sifPotentialCount} Reports</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Open Actions:</span>
              <span className="font-mono font-bold text-slate-900">{selectedInst.openActions} Pending</span>
            </div>
          </div>

          {/* Related reports from this installation */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Recent Observations at {selectedInst.name}:
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {relatedReports.map(r => (
                <div
                  key={r.id}
                  onClick={() => setActiveTab('report-analyzer')}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 cursor-pointer text-xs flex items-center justify-between"
                >
                  <span className="font-mono text-slate-700 font-medium truncate max-w-[180px]">{r.asset}</span>
                  <span className="font-bold text-rose-600 text-[11px]">{r.sifPrecursor}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
