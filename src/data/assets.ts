export interface AssetDetail {
  id: string;
  name: string;
  category: 'Valves & Manifolds' | 'Wellhead Equipment' | 'Pipelines' | 'Tanks & Vessels' | 'Pumps & Compressors' | 'Workover Rigs';
  installation: string;
  riskRating: 'Critical' | 'High' | 'Medium' | 'Low';
  healthScore: number;
  lifecycleStage: 'Inspection' | 'Observation' | 'Repeated Issue' | 'Degradation' | 'Maintenance' | 'Risk Escalation';
  activePrecursors: string[];
  failureCount30d: number;
  lastInspectionDate: string;
  integrityNotes: string;
  mitigationPlan: string;
}

export const SYNTHETIC_ASSETS: AssetDetail[] = [
  {
    id: 'AST-VAL-01',
    name: 'Wellhead Isolation Master Valve MV-104',
    category: 'Valves & Manifolds',
    installation: 'Duliajan Central Field',
    riskRating: 'Critical',
    healthScore: 42,
    lifecycleStage: 'Degradation',
    activePrecursors: ['Energy Isolation Failure', 'High-Pressure Blowout / Ejection'],
    failureCount30d: 4,
    lastInspectionDate: '2026-08-28',
    integrityNotes: 'Internal seat passing detected under 1,200 psi differential. LOTO lock pin hole worn.',
    mitigationPlan: 'Replace double-block gate mechanism during upcoming shutdown; enforce mechanical clamp backing.'
  },
  {
    id: 'AST-RIG-07',
    name: 'Workover Rig WOR-07 Mast & Drawworks',
    category: 'Workover Rigs',
    installation: 'Duliajan Central Field',
    riskRating: 'High',
    healthScore: 58,
    lifecycleStage: 'Repeated Issue',
    activePrecursors: ['Energy Isolation Failure', 'Failed Fall Protection'],
    failureCount30d: 3,
    lastInspectionDate: '2026-09-02',
    integrityNotes: 'Hydraulic accumulator pressure drop and intermittent monkey board tie-off clip fatigue.',
    mitigationPlan: 'Complete hydraulic line overhaul and re-certify fall-arrest inertia reel anchor loops.'
  },
  {
    id: 'AST-PIP-TRK',
    name: 'Crude Pipeline Trunk-A (24-inch River Crossing)',
    category: 'Pipelines',
    installation: 'Moran Oil Field',
    riskRating: 'High',
    healthScore: 52,
    lifecycleStage: 'Observation',
    activePrecursors: ['Uncontained Hydrocarbon Leakage'],
    failureCount30d: 2,
    lastInspectionDate: '2026-08-15',
    integrityNotes: 'Intelligent pigging flagged 38% localized wall thinning adjacent to river scour bend #4.',
    mitigationPlan: 'Schedule composite sleeve wrapping and ultrasonic cathodic protection surveillance.'
  },
  {
    id: 'AST-SEP-04',
    name: 'High-Pressure 3-Phase Test Separator V-201',
    category: 'Tanks & Vessels',
    installation: 'Bagjan Wellsite Operations',
    riskRating: 'Critical',
    healthScore: 36,
    lifecycleStage: 'Risk Escalation',
    activePrecursors: ['Confined Space Engulfment', 'Energy Isolation Failure'],
    failureCount30d: 5,
    lastInspectionDate: '2026-08-30',
    integrityNotes: 'PSV pop test certificate expired; inlet isolation valve passing 15 psi residual gas into vessel.',
    mitigationPlan: 'Full mechanical blind isolation required; replacement PSV-201B dispatched from central stores.'
  },
  {
    id: 'AST-PMP-02',
    name: 'Main Crude Oil Transfer Pump P-102B',
    category: 'Pumps & Compressors',
    installation: 'Digboi Refinery Area & Fields',
    riskRating: 'Medium',
    healthScore: 68,
    lifecycleStage: 'Maintenance',
    activePrecursors: ['Hot Work Ignition Precursor'],
    failureCount30d: 1,
    lastInspectionDate: '2026-09-05',
    integrityNotes: 'Mechanical seal minor weeping (<0.2 l/hr); vibration spectrum elevated on drive end bearing.',
    mitigationPlan: 'Planned mechanical seal rebuild scheduled with nitrogen purge verification.'
  },
  {
    id: 'AST-WHD-12B',
    name: 'Gas Producer Wellhead WH-12B Christmas Tree',
    category: 'Wellhead Equipment',
    installation: 'Rajasthan Block-RJ (Jaisalmer)',
    riskRating: 'Medium',
    healthScore: 74,
    lifecycleStage: 'Inspection',
    activePrecursors: ['Uncontained Hydrocarbon Leakage'],
    failureCount30d: 1,
    lastInspectionDate: '2026-09-08',
    integrityNotes: 'Wing valve packing adjusted; thermal cycling in desert causing flange bolt micro-relaxation.',
    mitigationPlan: 'Torque check program using calibrated hydraulic wrench and anti-corrosion grease seal.'
  }
];
