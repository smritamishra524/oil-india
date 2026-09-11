import React from 'react';
import {
  LayoutDashboard,
  Search,
  Dna,
  History,
  FileQuestion,
  AlertOctagon,
  Share2,
  ShieldAlert,
  TrendingUp,
  GitFork,
  Cpu,
  CheckSquare,
  AlertTriangle,
  MapPin,
  Layers,
  ClipboardList,
  GitPullRequest,
  Bot,
  BookOpen,
  Send,
  Mic,
  Settings,
  Flame,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../utils/translations';

interface NavItem {
  id: string;
  labelKey: keyof typeof TRANSLATIONS['en'];
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, language, reports, correctiveActions, barrierHealth } = useApp();
  const t = TRANSLATIONS[language];

  const openActionsCount = correctiveActions.filter(a => a.status !== 'CLOSED').length;
  const criticalBarriersCount = barrierHealth.filter(b => b.currentStatus === 'Critical' || b.currentStatus === 'Degrading').length;

  const NAV_GROUPS: NavGroup[] = [
    {
      groupName: 'OVERVIEW',
      items: [
        { id: 'command-center', labelKey: 'commandCenter', icon: LayoutDashboard }
      ]
    },
    {
      groupName: 'AI ANALYSIS',
      items: [
        { id: 'report-analyzer', labelKey: 'reportAnalyzer', icon: Search },
        { id: 'sif-dna', labelKey: 'sifDna', icon: Dna, badge: 'Hero', badgeColor: 'bg-emerald-100 text-emerald-800' },
        { id: 'historical-similarity', labelKey: 'historicalSimilarity', icon: History },
        { id: 'missing-evidence', labelKey: 'missingEvidence', icon: FileQuestion },
        { id: 'contradiction-detection', labelKey: 'contradictions', icon: AlertOctagon }
      ]
    },
    {
      groupName: 'PRECURSOR INTELLIGENCE',
      items: [
        { id: 'weak-signal-fusion', labelKey: 'weakSignalFusion', icon: Share2, badge: 'Hero', badgeColor: 'bg-emerald-100 text-emerald-800' },
        { id: 'barrier-degradation', labelKey: 'barrierDegradation', icon: ShieldAlert, badge: criticalBarriersCount > 0 ? `${criticalBarriersCount} Degraded` : undefined, badgeColor: 'bg-rose-100 text-rose-800' },
        { id: 'precursor-velocity', labelKey: 'precursorVelocity', icon: TrendingUp },
        { id: 'sif-pathway', labelKey: 'sifPathway', icon: GitFork, badge: 'Hero', badgeColor: 'bg-emerald-100 text-emerald-800' }
      ]
    },
    {
      groupName: 'SIMULATION',
      items: [
        { id: 'counterfactual-sif', labelKey: 'counterfactualSif', icon: Cpu, badge: 'Hero', badgeColor: 'bg-purple-100 text-purple-800' },
        { id: 'recommended-intervention', labelKey: 'recommendedIntervention', icon: CheckSquare }
      ]
    },
    {
      groupName: 'RISK & ASSETS',
      items: [
        { id: 'early-warning', labelKey: 'earlyWarning', icon: AlertTriangle },
        { id: 'installation-map', labelKey: 'installationRiskMap', icon: MapPin },
        { id: 'asset-intelligence', labelKey: 'assetIntelligence', icon: Layers }
      ]
    },
    {
      groupName: 'ACTION CENTER',
      items: [
        { id: 'corrective-actions', labelKey: 'correctiveActions', icon: ClipboardList, badge: openActionsCount, badgeColor: 'bg-amber-100 text-amber-800' },
        { id: 'rca', labelKey: 'rca', icon: GitPullRequest }
      ]
    },
    {
      groupName: 'INTELLIGENCE',
      items: [
        { id: 'oil-safety-ai', labelKey: 'oilSafetyAi', icon: Bot },
        { id: 'knowledge-base', labelKey: 'knowledgeBase', icon: BookOpen }
      ]
    },
    {
      groupName: 'FRONTLINE',
      items: [
        { id: 'frontline-report', labelKey: 'reportHazard', icon: Send },
        { id: 'voice-reporting', labelKey: 'voiceReporting', icon: Mic }
      ]
    },
    {
      groupName: 'SYSTEM',
      items: [
        { id: 'settings', labelKey: 'settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col h-[calc(100vh-69px)] border-r border-slate-800 select-none overflow-hidden">
      
      {/* Scrollable Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              {group.groupName}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const label = t[item.labelKey] || item.labelKey;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`nav-${item.id}`}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-oil-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-oil-400'}`} />
                    <span className="truncate">{label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full flex-shrink-0 ${
                        item.badgeColor || (isActive ? 'bg-oil-800 text-oil-200' : 'bg-slate-800 text-slate-400')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Safety Metric Footer */}
      <div className="p-3 border-t border-slate-800/90 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Safety Debt
          </span>
          <span className="font-mono font-bold text-amber-400">68 / 100</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
        </div>
        <div className="text-[9px] text-slate-400 mt-1 font-mono">
          Proposed Intelligence Metric
        </div>
      </div>

    </aside>
  );
};
