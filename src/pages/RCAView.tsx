import React, { useState, useEffect } from 'react';
import { GitPullRequest, HelpCircle, Save, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RCAView: React.FC = () => {
  const { selectedReport, reports, selectReport } = useApp();

  const [fiveWhys, setFiveWhys] = useState<string[]>([
    'Why was residual pressure observed in the line during maintenance?',
    'Because master valve MV-104 had internal seat passing allowing crude to seep past the wedge.',
    'Why was the seat passing not identified prior to worker entry into cellar?',
    'Because physical bleedoff verification and test gauge check were omitted on the permit.',
    'Why were verification checks omitted prior to authorizing cellar entry?',
    'Root Cause: Systemic culture of assuming valve seal integrity and lack of mandatory four-eyes witness check protocol.'
  ]);

  const [fishbone, setFishbone] = useState<Record<string, string[]>>({
    People: ['Lack of dedicated isolation authority witness', 'Assumption that closing valve guarantees zero energy'],
    Process: ['Permit signed remotely in office without joint site walkdown', 'Zero-energy checklist item bypassed'],
    Equipment: ['Valve MV-104 internal seat wear (safety debt)', 'Analog gauge needle clogged with wax residue'],
    Environment: ['Confined geometry in wellhead cellar restricting escape', 'Low ambient lighting during night changeover'],
    Management: ['Operational pressure to expedite well-pulling schedule', 'No formal audit on LOTO key custody'],
    Procedure: ['OISD-145 double-block-and-bleed standard not updated for aging wells', 'Lack of positive mechanical blind insertion requirement']
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleWhyChange = (index: number, val: string) => {
    const updated = [...fiveWhys];
    updated[index] = val;
    setFiveWhys(updated);
  };

  const handleFishboneAdd = (category: string) => {
    const val = prompt(`Add new factor for ${category}:`);
    if (val && val.trim()) {
      setFishbone(prev => ({
        ...prev,
        [category]: [...prev[category], val.trim()]
      }));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">
                Diagnostic RCA
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Root Cause Decomposition</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">Root Cause Analysis (5-Why & Fishbone)</h1>
            <p className="text-xs text-slate-500">
              Interactive 5-Why progression and Ishikawa Fishbone categories for {selectedReport?.id}.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-oil-600 hover:bg-oil-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'RCA Saved to Repository!' : 'Save RCA Investigation'}</span>
        </button>
      </div>

      {/* 5-Why Analysis Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            5-Why Causal Drilling Chain
          </h2>
          <span className="text-[11px] text-slate-400">Editable inputs for incident investigators</span>
        </div>

        <div className="space-y-3">
          {fiveWhys.map((text, idx) => {
            const isRoot = idx === fiveWhys.length - 1;
            return (
              <div key={idx} className="flex items-start space-x-3 text-xs">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold flex-shrink-0 ${
                  isRoot ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {idx === 0 ? 'Q1' : idx === 1 ? 'A1' : idx === 2 ? 'Q2' : idx === 3 ? 'A2' : idx === 4 ? 'Q3' : 'RC'}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                    {idx === 0 ? 'Problem Statement' : idx % 2 === 1 ? `Causal Level ${(idx + 1) / 2}` : `Interrogative Level ${idx / 2 + 1}`}
                  </span>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => handleWhyChange(idx, e.target.value)}
                    className={`w-full p-2.5 rounded-lg border text-xs outline-none transition-all ${
                      isRoot ? 'border-rose-300 bg-rose-50 font-bold text-rose-950 focus:ring-1 focus:ring-rose-500' :
                      'border-slate-200 bg-slate-50 focus:bg-white focus:ring-1 focus:ring-purple-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fishbone / Ishikawa Root Cause (6 Categories) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Ishikawa Fishbone Root Cause Diagram (6 Enterprise Categories)
          </h2>
          <span className="text-[11px] text-slate-400">Click "+ Add" to contribute factors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(fishbone).map(([cat, factors]) => (
            <div key={cat} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                <span className="font-bold text-xs uppercase text-slate-800">{cat}</span>
                <button
                  onClick={() => handleFishboneAdd(cat)}
                  className="text-[10px] font-bold text-oil-600 hover:text-oil-800 px-1.5 py-0.5 rounded bg-oil-50 border border-oil-200"
                >
                  + Add Factor
                </button>
              </div>
              <ul className="space-y-1.5 text-xs">
                {factors.map((f, i) => (
                  <li key={i} className="text-slate-700 flex items-start gap-1.5">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
