import React, { useState } from 'react';
import { Settings, Globe, RefreshCw, Download, ShieldCheck, Database, FileText, Check, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../utils/translations';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, resetToDemo, auditTrail, reports, correctiveActions } = useApp();
  const t = TRANSLATIONS[language];

  const [resetConfirmed, setResetConfirmed] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demo data and restore initial synthetic OIL reports and corrective actions?')) {
      resetToDemo();
      setResetConfirmed(true);
      setTimeout(() => setResetConfirmed(false), 2500);
    }
  };

  const handleExportAll = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      reports,
      correctiveActions,
      auditTrail
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OIL_HSE_Complete_Data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center space-x-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
              System Configuration
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs font-semibold text-slate-500">Preferences & Audit Log</span>
          </div>
          <h1 className="text-xl font-black text-slate-900">{t.settings}</h1>
          <p className="text-xs text-slate-500">
            Localization, demo dataset lifecycle management, and full compliance audit trail.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Selection Card (Section 36) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-oil-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.language}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Translate the entire application interface between English and Official Hindi. Language choice persists in LocalStorage across browser sessions.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setLanguage('en')}
              className={`p-3.5 rounded-xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
                language === 'en'
                  ? 'border-oil-600 bg-oil-50 text-oil-800 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <span>English (Default)</span>
              {language === 'en' && <Check className="w-4 h-4 text-oil-600" />}
            </button>

            <button
              onClick={() => setLanguage('hi')}
              className={`p-3.5 rounded-xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
                language === 'hi'
                  ? 'border-oil-600 bg-oil-50 text-oil-800 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <span>हिन्दी (Hindi)</span>
              {language === 'hi' && <Check className="w-4 h-4 text-oil-600" />}
            </button>
          </div>
        </div>

        {/* Demo Management & Export (Section 45 & 46) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
            <Database className="w-4 h-4 text-slate-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Data Management & Persistence
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Uploaded reports, corrective actions, and validations persist locally in your browser. You can export or restore default demo data at any time.
          </p>

          <div className="flex flex-col space-y-2 pt-2">
            <button
              onClick={handleExportAll}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Export Complete Dataset (JSON)</span>
            </button>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-rose-600" />
              <span>{resetConfirmed ? 'Reset Complete!' : t.resetDemoData}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Enterprise Audit Trail (Section 31) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-oil-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Enterprise Compliance Audit Trail ({auditTrail.length} Events)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Immutable Event Log</span>
        </div>

        <p className="text-xs text-slate-500">
          Chronological record tracing the lifecycle: Report Received → AI Analyzed → Precursor Detected → HSE Reviewed → Corrective Action Created → Verified.
        </p>

        <div className="space-y-2 max-h-72 overflow-y-auto">
          {auditTrail.map((ev) => (
            <div
              key={ev.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className={`px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase ${
                    ev.severity === 'critical' ? 'bg-rose-100 text-rose-800' :
                    ev.severity === 'warning' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {ev.eventType}
                  </span>
                  <span className="font-semibold text-slate-800">{ev.user}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{ev.details}</p>
              </div>

              <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">
                {ev.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
