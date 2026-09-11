import React, { useState } from 'react';
import { BookOpen, Search, Shield, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { IOGP_KNOWLEDGE_CARDS } from '../data/knowledgeBase';

export const KnowledgeBaseView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = IOGP_KNOWLEDGE_CARDS.filter(c =>
    c.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.hazard.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.primaryBarrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-oil-100 text-oil-700 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-oil-100 text-oil-800 uppercase">
                Industry Standard
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">IOGP 9 Life-Saving Rules</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">HSE Knowledge Base & Life-Saving Rules</h1>
            <p className="text-xs text-slate-500">
              Operational safety cards mapping critical controls, barriers, common precursors, and OIL standard references.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Life-Saving Rules..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-oil-500"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCards.map((card) => (
          <div
            key={card.rule}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 hover:border-oil-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black uppercase text-oil-800">{card.rule}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                  IOGP Standard
                </span>
              </div>

              <div className="text-xs font-bold text-slate-900 italic">
                "{card.tagline}"
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Primary Hazard:</span>
                <p className="text-slate-700">{card.hazard}</p>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase text-slate-500">Critical Controls:</span>
                <ul className="space-y-1">
                  {card.criticalControls.slice(0, 3).map((ctrl, i) => (
                    <li key={i} className="text-slate-700 flex items-start gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-oil-600 flex-shrink-0 mt-0.5" />
                      <span>{ctrl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded text-xs text-rose-950 space-y-1">
                <span className="text-[10px] font-bold uppercase text-rose-800">Common Field Precursor:</span>
                <p className="text-[11px] font-medium">{card.commonPrecursors[0]}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
              Ref: {card.oilStandardRef}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
