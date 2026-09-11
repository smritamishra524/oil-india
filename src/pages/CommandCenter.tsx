import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Flame,
  Activity,
  FileCheck2,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  Share2,
  Dna,
  GitFork,
  Cpu,
  Clock,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../utils/translations';

const COLORS = ['#006837', '#e11d48', '#d97706', '#2563eb', '#7c3aed', '#059669'];

export const CommandCenter: React.FC = () => {
  const {
    reports,
    barrierHealth,
    correctiveActions,
    weakSignalClusters,
    precursorVelocity,
    safetyDebtScore,
    language,
    setActiveTab,
    selectReport,
    preloadFlagshipJudgeDemo
  } = useApp();

  const t = TRANSLATIONS[language];

  // Dynamic KPI calculations from shared state
  const totalReportsCount = reports.length;
  const sifPotentialCount = reports.filter(r => r.sifPotential === 'SIF-Capable' || r.sifPotential === 'Potential SIF').length;
  const criticalPrecursorsCount = reports.filter(r => r.severity === 'Critical').length;
  const degradingBarriersCount = barrierHealth.filter(b => b.currentStatus === 'Critical' || b.currentStatus === 'Degrading').length;
  const openActionsCount = correctiveActions.filter(a => a.status !== 'CLOSED').length;

  // Chart 1: Precursor Distribution
  const precursorCounts: Record<string, number> = {};
  reports.forEach(r => {
    precursorCounts[r.sifPrecursor] = (precursorCounts[r.sifPrecursor] || 0) + 1;
  });
  const precursorChartData = Object.entries(precursorCounts).map(([name, count]) => ({
    name: name.replace(' Failure', '').replace(' Exposure', ''),
    count
  })).slice(0, 5);

  // Chart 2: 7-Day SIF Risk Trend
  const trendData = [
    { day: 'Day -6', sifRisk: 74, weakSignals: 8 },
    { day: 'Day -5', sifRisk: 78, weakSignals: 12 },
    { day: 'Day -4', sifRisk: 76, weakSignals: 11 },
    { day: 'Day -3', sifRisk: 82, weakSignals: 15 },
    { day: 'Day -2', sifRisk: 85, weakSignals: 18 },
    { day: 'Day -1', sifRisk: 89, weakSignals: 22 },
    { day: 'Today', sifRisk: 92, weakSignals: 25 },
  ];

  // Chart 3: Installation Risk Ranking
  const installationCounts: Record<string, { highRisk: number; total: number }> = {};
  reports.forEach(r => {
    if (!installationCounts[r.installation]) {
      installationCounts[r.installation] = { highRisk: 0, total: 0 };
    }
    installationCounts[r.installation].total += 1;
    if (r.severity === 'Critical') {
      installationCounts[r.installation].highRisk += 1;
    }
  });
  const installationChartData = Object.entries(installationCounts).map(([name, val]) => ({
    name: name.split(' ')[0],
    highRisk: val.highRisk,
    total: val.total
  })).slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Welcome & Judge Pitch Banner */}
      <div className="bg-gradient-to-r from-charcoal-900 via-oil-950 to-charcoal-900 border border-charcoal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-oil-600/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-oil-500/20 text-oil-300 font-mono text-[10px] font-bold border border-oil-500/30 uppercase tracking-wider">
                Enterprise SIF Early Warning
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-amber-400 text-xs font-semibold">OISD / IOGP Life-Saving Rules Integration</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              OIL HSE Intelligence • Command Center
            </h1>
            <p className="text-sm text-slate-300">
              "Detect the weak signals before they become serious events." Connected, explainable SIF precursor discovery across Oil India Limited operational assets.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={preloadFlagshipJudgeDemo}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-charcoal-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>RUN FLAGSHIP JUDGE DEMO</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero 6 KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* KPI 1: Total Reports */}
        <div
          onClick={() => setActiveTab('report-analyzer')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-oil-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.totalReports}</span>
            <FileCheck2 className="w-4 h-4 text-slate-400 group-hover:text-oil-600 transition-colors" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalReportsCount}</div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-semibold">+100% verified</span> in unified store
          </div>
        </div>

        {/* KPI 2: SIF-Potential */}
        <div
          onClick={() => setActiveTab('sif-dna')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-rose-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.sifPotential}</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">{sifPotentialCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">
            <span className="font-semibold text-rose-600">{Math.round((sifPotentialCount / totalReportsCount) * 100)}%</span> of total observations
          </div>
        </div>

        {/* KPI 3: Critical Precursors */}
        <div
          onClick={() => setActiveTab('precursor-velocity')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-amber-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.activeCriticalPrecursors}</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{criticalPrecursorsCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">
            Top: <span className="font-semibold text-slate-700">Energy Isolation</span>
          </div>
        </div>

        {/* KPI 4: High-Risk Installations */}
        <div
          onClick={() => setActiveTab('installation-map')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-oil-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.highRiskInstallations}</span>
            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-oil-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">3</div>
          <div className="text-[10px] text-slate-400 mt-1">
            Lead: <span className="font-semibold text-slate-700">Duliajan / Bagjan</span>
          </div>
        </div>

        {/* KPI 5: Degrading Barriers */}
        <div
          onClick={() => setActiveTab('barrier-degradation')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-rose-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.degradingBarriers}</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">{degradingBarriersCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">
            Critical: <span className="font-semibold text-rose-600">Energy Isolation</span>
          </div>
        </div>

        {/* KPI 6: Open Corrective Actions */}
        <div
          onClick={() => setActiveTab('corrective-actions')}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow hover:border-blue-500 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-semibold uppercase">{t.openCorrectiveActions}</span>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{openActionsCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">
            <span className="font-semibold text-rose-600">2 Overdue</span> actions pending
          </div>
        </div>

      </div>

      {/* Signature Innovations Quick-Launch Bar (Section 1 Core USP) */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-oil-400" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-300">
              5 Signature Product Innovations (Core OIL Differentiation)
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any innovation to explore connected intelligence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          
          <button
            onClick={() => setActiveTab('sif-dna')}
            className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-oil-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <Dna className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
            </div>
            <div className="text-xs font-bold text-white">1. SIF Precursor DNA</div>
            <div className="text-[10px] text-slate-400 mt-1">Multi-stage causal breakdown from Activity to Consequence.</div>
          </button>

          <button
            onClick={() => setActiveTab('weak-signal-fusion')}
            className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-oil-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <Share2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400" />
            </div>
            <div className="text-xs font-bold text-white">2. Weak Signal Fusion</div>
            <div className="text-[10px] text-slate-400 mt-1">Fuses minor leaks, vibrations, and delays into emerging clusters.</div>
          </button>

          <button
            onClick={() => setActiveTab('barrier-degradation')}
            className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-oil-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldAlert className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400" />
            </div>
            <div className="text-xs font-bold text-white">3. Barrier Degradation</div>
            <div className="text-[10px] text-slate-400 mt-1">Temporal tracking of safety barriers (Healthy → Warning → Critical).</div>
          </button>

          <button
            onClick={() => setActiveTab('sif-pathway')}
            className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-oil-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <GitFork className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
            </div>
            <div className="text-xs font-bold text-white">4. SIF Pathway</div>
            <div className="text-[10px] text-slate-400 mt-1">Interactive causal graphs linking unsafe acts to SIF escalation.</div>
          </button>

          <button
            onClick={() => setActiveTab('counterfactual-sif')}
            className="text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
            </div>
            <div className="text-xs font-bold text-white">5. Counterfactual Simulator</div>
            <div className="text-[10px] text-slate-400 mt-1">What-if simulation: change barrier condition and test outcomes.</div>
          </button>

        </div>
      </div>

      {/* Main Charts & Early Warning Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Charts */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart 1: SIF Risk Trend Over Time */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">SIF Precursor Escalation & Weak Signal Velocity</h3>
                <p className="text-xs text-slate-500">Trailing 7-day cumulative precursor index across high-hazard operations</p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                +18% Velocity Acceleration
              </span>
            </div>
            
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006837" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#006837" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorSignals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="sifRisk" stroke="#006837" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRisk)" name="SIF Risk Index" />
                  <Area type="monotone" dataKey="weakSignals" stroke="#e11d48" strokeWidth={2} fillOpacity={1} fill="url(#colorSignals)" name="Active Weak Signals" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Top Precursor Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Critical SIF Precursor Breakdown</h3>
              <p className="text-xs text-slate-500 mb-4">Frequency of identified primary hazard precursors</p>
              
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={precursorChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={90} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', fontSize: '11px', color: '#fff' }} />
                    <Bar dataKey="count" fill="#006837" radius={[0, 4, 4, 0]}>
                      {precursorChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Top Installation Critical Exposures</h3>
              <p className="text-xs text-slate-500 mb-4">Field breakdown of critical observations</p>
              
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={installationChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '6px', fontSize: '11px', color: '#fff' }} />
                    <Bar dataKey="highRisk" fill="#e11d48" name="Critical Risk" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="#cbd5e1" name="Total Reports" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Early Warning Feed (Section 8 & 24) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-subtle-pulse" />
              <h3 className="text-sm font-bold text-slate-900">Early Warning Feed</h3>
            </div>
            <span className="text-[11px] font-medium text-slate-400">Live Synthesis</span>
          </div>

          <p className="text-xs text-slate-500">
            Connected early warning anomalies detected from raw observation feeds. Every item is interactive:
          </p>

          <div className="space-y-3 flex-1 overflow-y-auto">
            
            {/* Alert 1: Critical Precursor */}
            <div
              onClick={() => {
                selectReport('OIL-REP-2026-1001');
                setActiveTab('report-analyzer');
              }}
              className="p-3 bg-rose-50/70 border border-rose-200 rounded-lg hover:border-rose-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Critical Precursor Detected
                </span>
                <span className="text-[10px] text-rose-600 font-mono">Just Now</span>
              </div>
              <p className="text-xs text-slate-700">
                Workover Rig WOR-07 (Duliajan): Master valve isolation failure with 45 psi trapped line pressure.
              </p>
              <div className="mt-2 text-[10px] font-semibold text-rose-700 flex items-center gap-1">
                View Precursor Analysis & Evidence <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Alert 2: Cluster Emerging */}
            <div
              onClick={() => setActiveTab('weak-signal-fusion')}
              className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg hover:border-amber-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-amber-800 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-amber-600" />
                  Weak Signal Cluster Emerging
                </span>
                <span className="text-[10px] text-amber-600 font-mono">1h ago</span>
              </div>
              <p className="text-xs text-slate-700">
                Cluster WSC-01: 4 weak signals (leak, vibration, delay, isolation) connected on Rig WOR-07.
              </p>
              <div className="mt-2 text-[10px] font-semibold text-amber-700 flex items-center gap-1">
                Inspect Signal Fusion Matrix <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Alert 3: Barrier Degradation */}
            <div
              onClick={() => setActiveTab('barrier-degradation')}
              className="p-3 bg-red-50/70 border border-red-200 rounded-lg hover:border-red-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-red-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                  Barrier Degradation Detected
                </span>
                <span className="text-[10px] text-red-600 font-mono">Today</span>
              </div>
              <p className="text-xs text-slate-700">
                Energy Isolation (LOTO) barrier dropped to 38% Health (CRITICAL). 14 failures recorded.
              </p>
              <div className="mt-2 text-[10px] font-semibold text-red-700 flex items-center gap-1">
                View 5-Month Degradation Timeline <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Alert 4: Overdue Action */}
            <div
              onClick={() => setActiveTab('corrective-actions')}
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-400 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  Corrective Action Overdue
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Yesterday</span>
              </div>
              <p className="text-xs text-slate-700">
                Action CA-2026-072: Derrick monkey board anchor proof-testing pending verification.
              </p>
              <div className="mt-2 text-[10px] font-semibold text-slate-700 flex items-center gap-1">
                Review Action Verification <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('early-warning')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors text-center"
            >
              Open Full Early Warning Center
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
