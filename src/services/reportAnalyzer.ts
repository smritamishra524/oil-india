import {
  SafetyReport,
  ActivityType,
  HazardType,
  ExposureType,
  BarrierType,
  ControlFailureType,
  SIFPrecursorType,
  IOPGLLifeSavingRule,
  SeverityLevel,
  SIFPotentialLevel,
  MissingEvidenceItem,
  ContradictionItem,
  RecommendedIntervention,
  SIFPrecursorDNA
} from '../types';

interface PatternRule<T> {
  type: T;
  keywords: string[];
  patterns: RegExp[];
  weight: number;
}

const ACTIVITY_PATTERNS: PatternRule<ActivityType>[] = [
  {
    type: 'Workover',
    keywords: ['workover', 'rig', 'pulling', 'tubing', 'casing', 'wireline', 'snubbing', 'slickline', 'wellhead intervention'],
    patterns: [/workover\s+(?:rig|operation|unit)/i, /servicing\s+well/i, /tripping\s+(?:pipe|tubing)/i],
    weight: 12
  },
  {
    type: 'Drilling',
    keywords: ['drilling', 'drill string', 'rotary', 'kelly', 'derrick', 'mud tank', 'bit', 'bop', 'blowout preventer'],
    patterns: [/drill(?:ing)?\s+operation/i, /top\s+drive/i, /drawworks/i, /shale\s+shaker/i],
    weight: 12
  },
  {
    type: 'Pipeline Maintenance',
    keywords: ['pipeline', 'pigging', 'trunkline', 'manifold', 'pipeline leak', 'flange', 'corrosion', 'right of way', 'row', 'excavation'],
    patterns: [/pipeline\s+(?:inspection|section|repair|corrosion)/i, /pig\s+launcher/i, /flowline\s+leak/i],
    weight: 10
  },
  {
    type: 'Work at Height',
    keywords: ['scaffold', 'ladder', 'derrick', 'elevated', 'platform', 'height', 'harness', 'fall arrest', 'monkey board', 'aerial'],
    patterns: [/working\s+at\s+height/i, /overhead\s+work/i, /above\s+(?:2|3|4|5|10)\s*m/i, /elevated\s+platform/i],
    weight: 11
  },
  {
    type: 'Confined Space Entry',
    keywords: ['confined space', 'vessel', 'tank entry', 'separator vessel', 'sump', 'pit', 'enclosed space', 'oxygen deficient', 'manhole'],
    patterns: [/confined\s+space/i, /tank\s+cleaning/i, /vessel\s+entry/i, /inside\s+separator/i],
    weight: 13
  },
  {
    type: 'Hot Work & Welding',
    keywords: ['hot work', 'welding', 'grinding', 'torch', 'sparks', 'cutting', 'flame', 'fire watch', 'brazing'],
    patterns: [/hot\s+work/i, /welding\s+operation/i, /gas\s+cutting/i],
    weight: 11
  },
  {
    type: 'Mechanical Lifting',
    keywords: ['crane', 'sling', 'shackle', 'hoisting', 'lifting', 'rigging', 'winch', 'suspended load', 'hook'],
    patterns: [/crane\s+(?:lift|operation)/i, /suspended\s+load/i, /rigging\s+failure/i],
    weight: 10
  },
  {
    type: 'Electrical Maintenance',
    keywords: ['mcc', 'switchgear', 'transformer', 'arc flash', 'electrical', 'voltage', 'breaker', 'breaker panel', 'substation'],
    patterns: [/electrical\s+(?:isolation|maintenance|panel)/i, /high\s+voltage/i, /lockout\s+tagout/i],
    weight: 10
  },
  {
    type: 'Production Operations',
    keywords: ['production', 'manifold', 'separator', 'gathering station', 'gas lift', 'gcs', 'ocs', 'crude oil', 'flow station'],
    patterns: [/oil\s+collecting\s+station/i, /gas\s+compressor/i, /production\s+manifold/i],
    weight: 9
  },
  {
    type: 'General Maintenance',
    keywords: ['maintenance', 'preventive', 'inspection', 'valve replacement', 'gasket', 'overhaul', 'pump servicing'],
    patterns: [/routine\s+maintenance/i, /servicing/i, /overhaul/i],
    weight: 7
  }
];

const HAZARD_PATTERNS: PatternRule<HazardType>[] = [
  {
    type: 'Stored / Residual Energy',
    keywords: ['pressure', 'residual pressure', 'hydraulic', 'stored energy', 'pneumatic', 'pressurized', 'bleed off', 'trapped pressure', 'valve not holding'],
    patterns: [/residual\s+pressure/i, /stored\s+(?:energy|pressure)/i, /trapped\s+pressure/i, /line\s+pressur/i],
    weight: 15
  },
  {
    type: 'Hydrocarbon Gas Release',
    keywords: ['gas leak', 'methane', 'hydrocarbon', 'flammable gas', 'vapor cloud', 'gas release', 'condensate', 'gas smell', 'lel'],
    patterns: [/gas\s+(?:leak|release|cloud|escape)/i, /hydrocarbon\s+release/i, /lel\s+alarm/i],
    weight: 14
  },
  {
    type: 'Fall from Height',
    keywords: ['fall', 'height', 'unprotected edge', 'slipping', 'scaffolding gap', 'open hatch', 'guardrail missing'],
    patterns: [/fall\s+from\s+height/i, /risk\s+of\s+falling/i, /unprotected\s+edge/i, /without\s+(?:proper\s+)?fall\s+protection/i],
    weight: 14
  },
  {
    type: 'Hydrogen Sulfide (H2S)',
    keywords: ['h2s', 'hydrogen sulfide', 'sour gas', 'rotten egg', 'toxic gas', 'detector alarm', 'breathing apparatus'],
    patterns: [/h2s\s+(?:alarm|exposure|leak|concentration)/i, /hydrogen\s+sulfide/i, /sour\s+(?:gas|crude)/i],
    weight: 15
  },
  {
    type: 'Line of Fire (Machinery/Tension)',
    keywords: ['line of fire', 'pinch point', 'rotating equipment', 'winch line', 'snubbing line', 'tong', 'swivel', 'recoil'],
    patterns: [/line\s+of\s+fire/i, /pinch\s+point/i, /rotating\s+(?:part|shaft)/i, /high\s+tension\s+cable/i],
    weight: 12
  },
  {
    type: 'Dropped Object',
    keywords: ['dropped object', 'falling tool', 'unsecured shackle', 'overhead load', 'snagged', 'dropped pipe', 'derrick floor'],
    patterns: [/dropped\s+object/i, /falling\s+(?:pipe|tool|material)/i, /overhead\s+hazard/i],
    weight: 11
  },
  {
    type: 'High Pressure Fluid',
    keywords: ['high pressure', 'mud line', 'injection line', 'pinhole leak', 'washout', 'whipcheck', 'choke manifold'],
    patterns: [/high\s+pressure\s+(?:fluid|jet|line)/i, /pinhole\s+leak/i, /flange\s+spray/i],
    weight: 13
  },
  {
    type: 'Ignition Source in Hazardous Zone',
    keywords: ['spark', 'hot surface', 'unrated electrical', 'static', 'flame', 'non-intrinsically safe', 'smoking', 'ex zone 1'],
    patterns: [/ignition\s+source/i, /zone\s+[01]/i, /hot\s+surface\s+near\s+leak/i],
    weight: 13
  },
  {
    type: 'Oxygen Deficiency / Toxic Fumes',
    keywords: ['oxygen deficiency', 'suffocation', 'nitrogen purge', 'inert atmosphere', 'toxic fume', 'co poisoning'],
    patterns: [/oxygen\s+(?:deficien|level|low)/i, /nitrogen\s+purge/i, /toxic\s+vapors/i],
    weight: 13
  },
  {
    type: 'Structural Instability',
    keywords: ['scaffold collapse', 'structural integrity', 'foundation settling', 'corroded support', 'rig sub-base'],
    patterns: [/structural\s+(?:damage|defect|instability)/i, /weakened\s+support/i],
    weight: 10
  }
];

const BARRIER_PATTERNS: PatternRule<BarrierType>[] = [
  {
    type: 'Energy Isolation (LOTO)',
    keywords: ['isolation', 'loto', 'lockout', 'tagout', 'bleed', 'depressurize', 'blind flange', 'spade', 'positive isolation', 'valve closed'],
    patterns: [/energy\s+isolation/i, /lockout\s+tagout/i, /blind\s+inserted/i, /valve\s+isolation/i, /loto/i],
    weight: 15
  },
  {
    type: 'Fall Protection System',
    keywords: ['fall protection', 'safety harness', 'lanyard', 'lifeline', 'guardrail', 'safety net', 'inertia reel', 'anchor point'],
    patterns: [/fall\s+protection/i, /safety\s+harness/i, /100%\s+tie[- ]off/i, /life\s*line/i],
    weight: 14
  },
  {
    type: 'Gas Detection & Monitoring',
    keywords: ['gas detector', 'lel monitor', 'fixed detector', 'portable detector', 'gas test', 'explosimeter', 'gas calibration'],
    patterns: [/gas\s+detect/i, /atmospheric\s+test/i, /lel\s+monitor/i, /gas\s+survey/i],
    weight: 13
  },
  {
    type: 'Pressure Relief & Bleedoff System',
    keywords: ['psv', 'pressure relief valve', 'bleed valve', 'blowdown', 'vent line', 'flare line', 'rupture disc'],
    patterns: [/pressure\s+relief/i, /psv/i, /bleed\s+off\s+valve/i, /depressuriz/i],
    weight: 13
  },
  {
    type: 'Permit to Work (PTW) & JSA',
    keywords: ['permit to work', 'ptw', 'jsa', 'job safety analysis', 'risk assessment', 'toolbox talk', 'tbt', 'work clearance'],
    patterns: [/permit\s+to\s+work/i, /ptw/i, /job\s+safety\s+analysis/i, /toolbox\s+talk/i],
    weight: 12
  },
  {
    type: 'Certified Lifting Rigging & Plan',
    keywords: ['lifting plan', 'crane inspection', 'rigger certification', 'tag line', 'sling inspection', 'wll rating'],
    patterns: [/lifting\s+plan/i, /rigging\s+inspection/i, /crane\s+limit\s+switch/i],
    weight: 11
  },
  {
    type: 'Exclusion Zone & Barricading',
    keywords: ['barricade', 'exclusion zone', 'warning tape', 'restricted area', 'red tape', 'barrier tape'],
    patterns: [/exclusion\s+zone/i, /barricad/i, /restricted\s+perimeter/i],
    weight: 10
  },
  {
    type: 'Emergency Shutdown (ESD)',
    keywords: ['esd', 'emergency shutdown', 'deluge', 'quick closing valve', 'remote shutoff', 'safety trip'],
    patterns: [/emergency\s+shutdown/i, /esd\s+valve/i, /trip\s+system/i],
    weight: 12
  }
];

export function analyzeReportNarrative(
  text: string, 
  existingMetadata?: { installation?: string; asset?: string; reportType?: string }
): SafetyReport {
  const normalizedText = text.toLowerCase();
  
  // 1. Identify Activity
  let matchedActivity: ActivityType = 'General Maintenance';
  let highestActivityScore = 0;
  for (const rule of ACTIVITY_PATTERNS) {
    let score = 0;
    rule.keywords.forEach(kw => {
      if (normalizedText.includes(kw)) score += rule.weight;
    });
    rule.patterns.forEach(pat => {
      if (pat.test(text)) score += rule.weight * 1.5;
    });
    if (score > highestActivityScore) {
      highestActivityScore = score;
      matchedActivity = rule.type;
    }
  }

  // 2. Identify Hazard
  let matchedHazard: HazardType = 'Stored / Residual Energy';
  let highestHazardScore = 0;
  for (const rule of HAZARD_PATTERNS) {
    let score = 0;
    rule.keywords.forEach(kw => {
      if (normalizedText.includes(kw)) score += rule.weight;
    });
    rule.patterns.forEach(pat => {
      if (pat.test(text)) score += rule.weight * 1.5;
    });
    if (score > highestHazardScore) {
      highestHazardScore = score;
      matchedHazard = rule.type;
    }
  }

  // 3. Identify Barrier
  let matchedBarrier: BarrierType = 'Energy Isolation (LOTO)';
  let highestBarrierScore = 0;
  for (const rule of BARRIER_PATTERNS) {
    let score = 0;
    rule.keywords.forEach(kw => {
      if (normalizedText.includes(kw)) score += rule.weight;
    });
    rule.patterns.forEach(pat => {
      if (pat.test(text)) score += rule.weight * 1.5;
    });
    if (score > highestBarrierScore) {
      highestBarrierScore = score;
      matchedBarrier = rule.type;
    }
  }

  // If fall hazard detected, align barrier to fall protection unless explicitly gas
  if (matchedHazard === 'Fall from Height' && highestBarrierScore < 20) {
    matchedBarrier = 'Fall Protection System';
  } else if (matchedHazard === 'Hydrocarbon Gas Release' || matchedHazard === 'Hydrogen Sulfide (H2S)') {
    if (!normalizedText.includes('loto') && !normalizedText.includes('isolated')) {
      matchedBarrier = 'Gas Detection & Monitoring';
    }
  }

  // 4. Determine Control Failure & SIF Precursor
  let matchedControlFailure: ControlFailureType = 'Isolation Not Verified / Zero-Energy Unchecked';
  let matchedPrecursor: SIFPrecursorType = 'Energy Isolation Failure';
  let matchedRule: IOPGLLifeSavingRule = 'Energy Isolation';
  let matchedExposure: ExposureType = 'Workers within Unisolated Work Zone';
  let potentialConsequence = 'Uncontrolled Energy Release / Thermal Burns / Impact Injury';

  if (matchedHazard === 'Fall from Height' || matchedActivity === 'Work at Height') {
    matchedControlFailure = 'Missing / Improper 100% Tie-Off';
    matchedPrecursor = 'Failed Fall Protection';
    matchedRule = 'Work at Height';
    matchedExposure = 'Elevated Technician without Fall Restraint';
    potentialConsequence = 'Catastrophic Fall from Elevated Derrick/Platform leading to Fatal Impact';
  } else if (matchedHazard === 'Hydrocarbon Gas Release' || matchedHazard === 'Hydrogen Sulfide (H2S)') {
    matchedControlFailure = 'Inadequate Gas Testing Before Entry';
    matchedPrecursor = 'Uncontained Hydrocarbon Leakage';
    matchedRule = 'Bypassing Safety Controls';
    matchedExposure = 'Nearby Operators Exposed to Gas Plume';
    potentialConsequence = 'Vapor Cloud Explosion (VCE) or Acute Toxic Asphyxiation';
  } else if (matchedActivity === 'Confined Space Entry' || matchedHazard === 'Oxygen Deficiency / Toxic Fumes') {
    matchedControlFailure = 'Inadequate Gas Testing Before Entry';
    matchedPrecursor = 'Confined Space Engulfment';
    matchedRule = 'Confined Space';
    matchedExposure = 'Entry Team in Enclosed Vessel';
    potentialConsequence = 'Rapid Anoxia / Irreversible Asphyxiation inside Enclosed Separator';
  } else if (matchedActivity === 'Mechanical Lifting' || matchedHazard === 'Dropped Object') {
    matchedControlFailure = 'Uncertified Rigging Hardware / Exceeded WLL';
    matchedPrecursor = 'Suspended Load Rigging Failure';
    matchedRule = 'Safe Mechanical Lifting';
    matchedExposure = 'Ground Crew beneath Suspended Load';
    potentialConsequence = 'Crushing Fatality from Structural Rigging Collapse';
  } else if (matchedActivity === 'Hot Work & Welding' || matchedHazard === 'Ignition Source in Hazardous Zone') {
    matchedControlFailure = 'Bypassed Interlock / Safeguard Overridden';
    matchedPrecursor = 'Hot Work Ignition Precursor';
    matchedRule = 'Hot Work';
    matchedExposure = 'Personnel in Direct Line-of-Fire';
    potentialConsequence = 'Hydrocarbon Deflagration / Flash Fire in Classified Area';
  } else if (matchedHazard === 'Line of Fire (Machinery/Tension)') {
    matchedControlFailure = 'Failure to Barricade Line-of-Fire Trajectory';
    matchedPrecursor = 'Heavy Equipment Blind Zone';
    matchedRule = 'Line of Fire';
    matchedExposure = 'Personnel in Direct Line-of-Fire';
    potentialConsequence = 'Severe Impact / Dismemberment in Machinery Trajectory';
  } else {
    // Default Energy Isolation / Stored pressure
    matchedControlFailure = 'Isolation Not Verified / Zero-Energy Unchecked';
    matchedPrecursor = 'Energy Isolation Failure';
    matchedRule = 'Energy Isolation';
    matchedExposure = 'Workers within Unisolated Work Zone';
    potentialConsequence = 'High Pressure Fluid Ejection / Sudden Mechanical Release with Direct Personnel Contact';
  }

  // 5. Evidence Extraction (finding actual excerpts)
  const evidence: string[] = [];
  const sentences = text.split(/(?<=[.!?\n])\s+/).filter(s => s.trim().length > 10);
  
  // Look for sentences mentioning key terms
  const searchKeywords = [
    ...ACTIVITY_PATTERNS.find(a => a.type === matchedActivity)?.keywords || [],
    ...HAZARD_PATTERNS.find(h => h.type === matchedHazard)?.keywords || [],
    ...BARRIER_PATTERNS.find(b => b.type === matchedBarrier)?.keywords || [],
    'pressure', 'valve', 'isolate', 'harness', 'leak', 'permit', 'fail', 'worker', 'without', 'line', 'gas'
  ];

  sentences.forEach(s => {
    const sLower = s.toLowerCase();
    const matchesKeyword = searchKeywords.some(k => sLower.includes(k));
    if (matchesKeyword && evidence.length < 4 && !evidence.includes(s.trim())) {
      evidence.push(s.trim());
    }
  });

  if (evidence.length === 0 && sentences.length > 0) {
    evidence.push(sentences[0].trim());
  }

  // 6. Contradiction Detection
  const contradictions: ContradictionItem[] = [];
  
  const hasIsolatedClaim = /isolated|isolated\s+properly|loto\s+applied|valves?\s+closed|permit\s+signed/i.test(text);
  const hasResidualClaim = /residual\s+pressure|pressure\s+remained|pressure\s+observed|not\s+isolated|not\s+depressuriz/i.test(text);
  
  if (hasIsolatedClaim && hasResidualClaim) {
    contradictions.push({
      id: 'CONT-01',
      statementA: 'Report mentions equipment was isolated or work was cleared.',
      statementB: 'Text documents presence of residual pressure or incomplete isolation verification.',
      analysis: 'Dangerous contradiction: Assumption of isolation while active line pressure remains creates extreme SIF line-of-fire potential.',
      riskImplication: 'Workers may proceed with mechanical disassembly under false perception of zero-energy state.'
    });
  }

  const hasPermitClaim = /permit\s+issued|ptw\s+approved|hot\s+work\s+permit/i.test(text);
  const hasNoCheckClaim = /no\s+gas\s+test|gas\s+test\s+omitted|without\s+verification|no\s+fire\s+watch/i.test(text);

  if (hasPermitClaim && hasNoCheckClaim) {
    contradictions.push({
      id: 'CONT-02',
      statementA: 'Permit-to-work formally documented as issued or authorized.',
      statementB: 'Mandatory physical verification check (gas test / fire watch) recorded as omitted or delayed.',
      analysis: 'Administrative disconnect: Permit clearance given prior to field control verification.',
      riskImplication: 'Regulatory and procedural barrier failure exposing workers to unmonitored atmospheric or fire hazard.'
    });
  }

  // 7. Missing Evidence Detector
  const missingEvidence: MissingEvidenceItem[] = [];
  let completenessScore = 88;

  if (matchedRule === 'Energy Isolation') {
    if (!/zero[- ]energy|gauge\s+zero|bleed\s+check|depressuriz\s+verif/i.test(text)) {
      missingEvidence.push({
        id: 'ME-01',
        category: 'Zero-Energy Verification',
        criticalItem: 'Physical Bleed & Zero-Pressure Gauge Verification',
        whyCritical: 'Without documented zero-energy physical confirmation, residual stored volume can discharge upon bolt loosening.',
        severity: 'High',
        suggestedPrompt: 'Did the maintenance lead verify zero pressure at the vent valve prior to cold cut/flange crack?'
      });
      completenessScore -= 18;
    }
    if (!/independent\s+check|second\s+sign|peer\s+review|supervisor\s+verif/i.test(text)) {
      missingEvidence.push({
        id: 'ME-02',
        category: 'Four-Eyes Verification',
        criticalItem: 'Independent Isolation Authority Sign-off',
        whyCritical: 'IOGP Rule 4 mandates independent verification of positive blind / valve isolation.',
        severity: 'Medium',
        suggestedPrompt: 'Confirm if an authorized isolation officer performed an independent physical valve walkdown.'
      });
      completenessScore -= 12;
    }
  } else if (matchedRule === 'Work at Height') {
    if (!/100%\s+tie[- ]off|double\s+lanyard|anchor\s+rating/i.test(text)) {
      missingEvidence.push({
        id: 'ME-03',
        category: 'Tie-Off Method',
        criticalItem: '100% Continuous Fall Restraint / Anchor Point Certification',
        whyCritical: 'Failure to document anchorage integrity leaves fall arrest effectiveness unconfirmed.',
        severity: 'High',
        suggestedPrompt: 'Was certified 5,000 lbs anchor point identified and was double-lanyard 100% tie-off practiced?'
      });
      completenessScore -= 20;
    }
  } else if (matchedRule === 'Confined Space') {
    if (!/continuous\s+gas|ventilation\s+cfm|standby\s+man/i.test(text)) {
      missingEvidence.push({
        id: 'ME-04',
        category: 'Life Support Controls',
        criticalItem: 'Continuous Multi-Gas Monitoring & Dedicated Standby Person Log',
        whyCritical: 'Atmospheric inversion can occur without sensory warning in enclosed hydrocarbons.',
        severity: 'High',
        suggestedPrompt: 'Attach continuous LEL, O2, H2S calibration logs and Standby Sentry entry-exit manifest.'
      });
      completenessScore -= 25;
    }
  }

  // 8. Risk Scoring & SIF Potential
  let riskScore = 65;
  if (matchedPrecursor === 'Energy Isolation Failure' || matchedPrecursor === 'Uncontained Hydrocarbon Leakage' || matchedPrecursor === 'Confined Space Engulfment') {
    riskScore = 84 + Math.min(12, evidence.length * 2);
  } else if (matchedPrecursor === 'Failed Fall Protection' || matchedPrecursor === 'Suspended Load Rigging Failure') {
    riskScore = 78 + Math.min(10, evidence.length * 2);
  } else {
    riskScore = 58 + Math.min(15, evidence.length * 2);
  }

  // SIF Potential
  let sifPotential: SIFPotentialLevel = 'Potential SIF';
  let severity: SeverityLevel = 'High';
  if (riskScore >= 80) {
    sifPotential = 'SIF-Capable';
    severity = 'Critical';
  } else if (riskScore >= 60) {
    sifPotential = 'Potential SIF';
    severity = 'High';
  } else {
    sifPotential = 'Non-SIF Precursor';
    severity = 'Medium';
  }

  // Confidence calculation based on keyword density and text length
  const matchedTokensCount = (text.match(/valve|pressure|isolated?|leak|fall|height|gas|h2s|crane|permit|rig/gi) || []).length;
  const confidence = Math.min(96, Math.max(68, 72 + matchedTokensCount * 3));

  // 9. Recommended Intervention
  let recommendedIntervention: RecommendedIntervention;
  if (matchedRule === 'Energy Isolation') {
    recommendedIntervention = {
      primary: 'Mandate independent zero-energy physical bleed verification and formal LOTO tag walkdown prior to line opening.',
      secondary: 'Install calibrated digital pressure test ports with certified lockout car-seals on isolation boundary valves.',
      verificationStep: 'HSE Field Engineer and Area Production In-Charge dual signature on Zero-Energy Isolation Certificate.',
      responsibleRole: 'Field Maintenance Superintendent & Production Lead',
      priority: 'Immediate',
      barrierReinforced: 'Positive Physical Energy Isolation (LOTO)'
    };
  } else if (matchedRule === 'Work at Height') {
    recommendedIntervention = {
      primary: 'Immediate stand-down of elevated operations until 100% dual-lanyard tie-off and inertia reel anchor testing is certified.',
      secondary: 'Implement daily pre-use harness inspection tagging and self-retracting lifeline boundary barricade.',
      verificationStep: 'Rig HSE Officer visual audit of anchor points and derrick monkey board harness lanyard clearance.',
      responsibleRole: 'Toolpusher & Rig HSE Officer',
      priority: 'Immediate',
      barrierReinforced: 'Engineered Fall Arrest and 100% Tie-Off System'
    };
  } else if (matchedRule === 'Confined Space') {
    recommendedIntervention = {
      primary: 'Cease vessel entry pending calibrated 4-gas atmospheric profiling (O2, LEL, H2S, CO) at top, middle, and bottom strata.',
      secondary: 'Deploy forced pneumatic air ventilation eductors and assign trained dedicated standby observer equipped with SCBA.',
      verificationStep: 'Gas tester continuous log upload to OIL HSE portal with supervisory entry sign-off.',
      responsibleRole: 'Installation Manager & Certified Gas Tester',
      priority: 'Immediate',
      barrierReinforced: 'Atmospheric Verification & Confined Space Sentry'
    };
  } else {
    recommendedIntervention = {
      primary: 'Halt non-essential activity in danger perimeter; enforce engineered barricading and line-of-fire standoff radius.',
      secondary: 'Conduct on-site tool box talk with crew reinforcing IOGP Life-Saving Rules and mechanical stop-work authority.',
      verificationStep: 'Supervisor verification of barrier integrity and physical tag sign-off.',
      responsibleRole: 'Operations Supervisor',
      priority: 'High',
      barrierReinforced: 'Exclusion Perimeter and Operational Stop-Work'
    };
  }

  // 10. SIF Precursor DNA
  const dna: SIFPrecursorDNA = {
    activity: matchedActivity,
    hazard: matchedHazard,
    exposure: matchedExposure,
    barrier: matchedBarrier,
    controlFailure: matchedControlFailure,
    sifPrecursor: matchedPrecursor,
    iogpRule: matchedRule,
    potentialConsequence: potentialConsequence,
    riskContribution: [
      { factor: 'Hardware / Energy Source Magnitude', percentage: 35, description: 'Stored fluid or mechanical force exceeds biological human threshold.' },
      { factor: 'Control Barrier Breakdown', percentage: 30, description: 'Physical or procedural interlock bypassed, degraded, or omitted.' },
      { factor: 'Personnel Exposure Proximity', percentage: 20, description: 'Workers situated directly in the line of trajectory or hazardous envelope.' },
      { factor: 'Supervisory / Verification Lapse', percentage: 15, description: 'Lack of dual independent sign-off or pre-task verification.' }
    ]
  };

  // Generate ID and synthesis metadata
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const reportId = `OIL-REP-${new Date().getFullYear()}-${randomSuffix}`;
  const currentDate = new Date().toISOString().split('T')[0];

  return {
    id: reportId,
    date: currentDate,
    installation: existingMetadata?.installation || 'Duliajan Central Field',
    asset: existingMetadata?.asset || (matchedActivity === 'Workover' ? 'Workover Rig WOR-07' : matchedActivity === 'Pipeline Maintenance' ? 'Crude Pipeline Trunk-A' : 'Separation Unit SEP-04'),
    activity: matchedActivity,
    reportType: (existingMetadata?.reportType as any) || (riskScore > 75 ? 'Incident Precursor' : 'Unsafe Condition'),
    narrative: text,
    hazard: matchedHazard,
    exposure: matchedExposure,
    barrier: matchedBarrier,
    controlFailure: matchedControlFailure,
    sifPrecursor: matchedPrecursor,
    iogpRule: matchedRule,
    severity: severity,
    sifPotential: sifPotential,
    riskScore: riskScore,
    confidence: confidence,
    evidence: evidence,
    missingEvidence: missingEvidence,
    completenessScore: completenessScore,
    contradictions: contradictions,
    dna: dna,
    recommendedIntervention: recommendedIntervention,
    validation: {
      status: 'AI Suggested'
    },
    sourceType: 'uploaded'
  };
}
