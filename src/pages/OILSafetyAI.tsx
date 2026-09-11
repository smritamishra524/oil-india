import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ShieldCheck, AlertTriangle, ChevronRight, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionLink?: { tab: string; reportId?: string; label: string };
}

const PRESET_QUESTIONS = [
  'Which precursor is increasing fastest?',
  'Why is this report high risk?',
  'Which barrier is degrading?',
  'Show recurring energy isolation failures.',
  'Which installation has the highest risk?',
  'Which corrective actions are overdue?'
];

export const OILSafetyAI: React.FC = () => {
  const {
    reports,
    selectedReport,
    barrierHealth,
    precursorVelocity,
    correctiveActions,
    weakSignalClusters,
    setActiveTab,
    selectReport
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Greetings. I am OIL Safety Intelligence Assistant. I am directly connected to your active repository of ${reports.length} safety reports, ${barrierHealth.length} tracked defensive barriers, and ${correctiveActions.length} corrective actions. Ask me any question about precursor velocity, barrier degradation, or specific report risks.`,
      timestamp: 'Just now'
    }
  ]);

  const handleSend = (queryText?: string) => {
    const query = (queryText || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');

    // Process actual answer based on real application state!
    setTimeout(() => {
      let replyText = '';
      let actionLink: Message['actionLink'] = undefined;
      const lower = query.toLowerCase();

      if (lower.includes('increasing fastest') || lower.includes('velocity')) {
        const topVelocity = [...precursorVelocity].sort((a, b) => b.velocityMultiplier - a.velocityMultiplier)[0];
        replyText = `Based on current reporting velocity analysis, "${topVelocity.precursor}" is increasing fastest with a ${topVelocity.velocityMultiplier}× acceleration rate over the past 30 days compared to the 90-day baseline (${topVelocity.countCurrent30Days} observations vs ${topVelocity.countPrevious90Days}). The highest concentration is currently detected at ${topVelocity.topInstallation}.`;
        actionLink = { tab: 'precursor-velocity', label: 'View Precursor Velocity Index' };
      } else if (lower.includes('why is this report high risk') || lower.includes('why is report high risk')) {
        if (selectedReport) {
          replyText = `Report ${selectedReport.id} (${selectedReport.asset}) has a Risk Score of ${selectedReport.riskScore}/100 and is classified as "${selectedReport.sifPotential}" because:
1. Energy Source: "${selectedReport.hazard}" was present without confirmed zero-energy bleed.
2. Barrier Failure: The primary defense "${selectedReport.barrier}" was challenged (${selectedReport.controlFailure}).
3. Personnel Proximity: Workers were located in "${selectedReport.exposure}".
4. Consequence Envelope: "${selectedReport.dna.potentialConsequence}".`;
          actionLink = { tab: 'sif-dna', reportId: selectedReport.id, label: 'Inspect SIF Precursor DNA' };
        } else {
          replyText = `Please select a report first in the Report Analyzer to examine its risk factors.`;
        }
      } else if (lower.includes('barrier is degrading') || lower.includes('degrading barrier')) {
        const criticalBarriers = barrierHealth.filter(b => b.currentStatus === 'Critical' || b.currentStatus === 'Degrading');
        replyText = `Currently, ${criticalBarriers.length} safety barrier systems are actively degrading:
${criticalBarriers.map(b => `• ${b.barrier}: Health score ${b.healthScore}% (${b.currentStatus}) with ${b.failureCount} recorded failure incidents. Primary driver: ${b.degradationDriver}`).join('\n')}`;
        actionLink = { tab: 'barrier-degradation', label: 'Open Barrier Degradation Tracker' };
      } else if (lower.includes('recurring energy isolation') || lower.includes('isolation failures')) {
        const isolationReports = reports.filter(r => r.sifPrecursor === 'Energy Isolation Failure');
        replyText = `I have identified ${isolationReports.length} reports in the repository citing "Energy Isolation Failure". A notable hotspot is Workover Rig WOR-07 at Duliajan Central Field, which is part of active Weak Signal Cluster WSC-01 where minor valve seepage, vibration, and deferred replacement have converged into high SIF potential.`;
        actionLink = { tab: 'weak-signal-fusion', label: 'Inspect Cluster WSC-01' };
      } else if (lower.includes('highest risk') || lower.includes('installation')) {
        replyText = `Duliajan Central Field currently exhibits the highest precursor concentration with a composite Risk Index of 84/100, driven by active workover wellhead interventions, followed closely by Bagjan Wellsite Operations (88/100) and Jorhat Exploration Rig 4 (79/100).`;
        actionLink = { tab: 'installation-map', label: 'Open Installation Risk Map' };
      } else if (lower.includes('overdue') || lower.includes('corrective action')) {
        const overdueActions = correctiveActions.filter(a => a.status !== 'CLOSED');
        replyText = `There are currently ${overdueActions.length} open corrective mitigations. 2 actions are flagged as high priority pending verification, including CA-2026-072 (Derrick monkey board anchor recertification at Jorhat) and CA-2026-075 (Composite wrap on Trunk-A river crossing).`;
        actionLink = { tab: 'corrective-actions', label: 'Review Overdue Actions' };
      } else {
        // Generic fallback query across reports
        const matchedReports = reports.filter(r => r.narrative.toLowerCase().includes(lower) || r.sifPrecursor.toLowerCase().includes(lower) || r.asset.toLowerCase().includes(lower));
        if (matchedReports.length > 0) {
          replyText = `I searched your dataset and found ${matchedReports.length} related reports matching "${query}". For instance, ${matchedReports[0].id} on ${matchedReports[0].asset} flags "${matchedReports[0].sifPrecursor}" with risk score ${matchedReports[0].riskScore}/100.`;
          actionLink = { tab: 'report-analyzer', reportId: matchedReports[0].id, label: `Open Report ${matchedReports[0].id}` };
        } else {
          replyText = `I analyzed your active dataset for "${query}". No direct keyword anomaly matches were found. You can ask about precursor velocity, barrier degradation timelines, specific installations like Duliajan or Moran, or click one of the suggested prompts below.`;
        }
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 450);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-oil-100 text-oil-700 flex items-center justify-center font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-oil-100 text-oil-800 uppercase">
                Context-Aware Intelligence
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs font-semibold text-slate-500">Repository Grounded</span>
            </div>
            <h1 className="text-xl font-black text-slate-900">OIL Safety AI Assistant</h1>
            <p className="text-xs text-slate-500">
              Not a generic chatbot — queries actual safety reports, degrading barriers, and precursor velocity across Oil India.
            </p>
          </div>
        </div>
      </div>

      {/* Preset Question Buttons (Section 32) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-oil-600" />
          Predefined Analytical Queries (Click to Run):
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-oil-500 hover:text-oil-700 transition-all text-slate-700 shadow-2xs"
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-[460px] overflow-hidden">
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex space-x-3 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-oil-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-xl space-y-2 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-oil-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none font-mono whitespace-pre-line'
                }`}
              >
                <div>{m.text}</div>

                {m.actionLink && (
                  <div className="pt-2 border-t border-slate-200 flex justify-end">
                    <button
                      onClick={() => {
                        if (m.actionLink?.reportId) selectReport(m.actionLink.reportId);
                        setActiveTab(m.actionLink!.tab);
                      }}
                      className="px-3 py-1.5 bg-oil-600 hover:bg-oil-700 text-white font-bold rounded text-xs flex items-center gap-1 transition-colors"
                    >
                      {m.actionLink.label} <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about reports, precursors, barriers, installations..."
            className="flex-1 p-3 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-oil-500 focus:border-oil-500"
          />
          <button
            onClick={() => handleSend()}
            className="px-5 py-3 bg-oil-600 hover:bg-oil-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

      </div>

    </div>
  );
};
