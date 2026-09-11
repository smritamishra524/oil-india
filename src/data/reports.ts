import { SafetyReport, CorrectiveAction, AuditEvent, WeakSignalCluster, BarrierHealth, PrecursorVelocityItem } from '../types';

export const INITIAL_SYNTHETIC_REPORTS: SafetyReport[] = [
  // 1. FLAGSHIP REPORT: Workover + Energy Isolation Failure
  {
    id: 'OIL-REP-2026-1001',
    date: '2026-09-08',
    installation: 'Duliajan Central Field',
    asset: 'Workover Rig WOR-07',
    activity: 'Workover',
    reportType: 'Incident Precursor',
    narrative: 'During maintenance on Workover Rig WOR-07 wellhead, the master valve was not properly isolated and residual pressure of 45 psi remained in the line while workers were present in the cellar without zero-energy verification.',
    hazard: 'Stored / Residual Energy',
    exposure: 'Workers within Unisolated Work Zone',
    barrier: 'Energy Isolation (LOTO)',
    controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
    sifPrecursor: 'Energy Isolation Failure',
    iogpRule: 'Energy Isolation',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 92,
    confidence: 94,
    evidence: [
      'valve was not properly isolated',
      'residual pressure of 45 psi remained in the line',
      'workers were present in the cellar without zero-energy verification'
    ],
    missingEvidence: [
      {
        id: 'ME-01',
        category: 'Zero-Energy Verification',
        criticalItem: 'Physical Bleed & Zero-Pressure Gauge Verification',
        whyCritical: 'Without documented zero-energy physical confirmation, residual stored volume can discharge upon bolt loosening.',
        severity: 'High',
        suggestedPrompt: 'Did the maintenance lead verify zero pressure at the vent valve prior to cold cut/flange crack?'
      },
      {
        id: 'ME-02',
        category: 'Four-Eyes Verification',
        criticalItem: 'Independent Isolation Authority Sign-off',
        whyCritical: 'IOGP Rule 4 mandates independent verification of positive blind / valve isolation.',
        severity: 'Medium',
        suggestedPrompt: 'Confirm if an authorized isolation officer performed an independent physical valve walkdown.'
      }
    ],
    completenessScore: 68,
    contradictions: [
      {
        id: 'CONT-01',
        statementA: 'Work clearance permit issued indicating cold work readiness.',
        statementB: 'Residual pressure observed in the manifold while crew was actively positioned in cellar.',
        analysis: 'Dangerous procedural mismatch: Permit issued without physical bleed line confirmation.',
        riskImplication: 'High-pressure sudden fluid ejection directly impacting technicians in confined cellar space.'
      }
    ],
    dna: {
      activity: 'Workover',
      hazard: 'Stored / Residual Energy',
      exposure: 'Workers within Unisolated Work Zone',
      barrier: 'Energy Isolation (LOTO)',
      controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
      sifPrecursor: 'Energy Isolation Failure',
      iogpRule: 'Energy Isolation',
      potentialConsequence: 'Catastrophic line burst or sudden blind flange ejection striking personnel at close range.',
      riskContribution: [
        { factor: 'Trapped Hydrocarbon Pressure (45 psi)', percentage: 40, description: 'Line contained stored hydraulic energy sufficient to cause blunt trauma impact.' },
        { factor: 'Failure of Positive Physical Isolation', percentage: 30, description: 'Relied on passing gate valve rather than positive spade or double-block-bleed.' },
        { factor: 'Cellar Confined Geometry', percentage: 20, description: 'Escape paths restricted; workers positioned in direct trajectory of wellhead flange.' },
        { factor: 'Omission of Independent Verification', percentage: 10, description: 'Toolpusher sign-off given remotely without on-site bleed check.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Mandate independent zero-energy physical bleed verification and formal LOTO tag walkdown prior to line opening.',
      secondary: 'Install calibrated digital pressure test ports with certified lockout car-seals on isolation boundary valves.',
      verificationStep: 'HSE Field Engineer and Area Production In-Charge dual signature on Zero-Energy Isolation Certificate.',
      responsibleRole: 'Field Maintenance Superintendent & Production Lead',
      priority: 'Immediate',
      barrierReinforced: 'Positive Physical Energy Isolation (LOTO)'
    },
    validation: {
      status: 'HSE Reviewed',
      validatedBy: 'Senior HSE Officer (Duliajan)',
      validatedAt: '2026-09-08 14:30',
      notes: 'Confirmed critical precursor. Operation immediately shut down for 4 hours until mechanical blind inserted.'
    },
    sourceType: 'synthetic'
  },

  // 2. WEAK SIGNAL 1 for Cluster 1: Minor Leak on same valve
  {
    id: 'OIL-REP-2026-0982',
    date: '2026-09-01',
    installation: 'Duliajan Central Field',
    asset: 'Workover Rig WOR-07',
    activity: 'Workover',
    reportType: 'Unsafe Condition',
    narrative: 'Minor crude seepage observed past gland packing of master isolation valve MV-104 during rig-up. Temporary drip pan placed.',
    hazard: 'Stored / Residual Energy',
    exposure: 'Workers within Unisolated Work Zone',
    barrier: 'Energy Isolation (LOTO)',
    controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
    sifPrecursor: 'Energy Isolation Failure',
    iogpRule: 'Energy Isolation',
    severity: 'Medium',
    sifPotential: 'Potential SIF',
    riskScore: 71,
    confidence: 88,
    evidence: ['Minor crude seepage observed past gland packing of master isolation valve MV-104', 'Temporary drip pan placed'],
    missingEvidence: [],
    completenessScore: 85,
    contradictions: [],
    dna: {
      activity: 'Workover',
      hazard: 'Stored / Residual Energy',
      exposure: 'Workers within Unisolated Work Zone',
      barrier: 'Energy Isolation (LOTO)',
      controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
      sifPrecursor: 'Energy Isolation Failure',
      iogpRule: 'Energy Isolation',
      potentialConsequence: 'Gland seal catastrophic failure leading to high velocity spray of crude.',
      riskContribution: [
        { factor: 'Degraded Mechanical Packing', percentage: 45, description: 'Packing experiencing seal degradation under pressure.' },
        { factor: 'Temporary Containment Reliance', percentage: 35, description: 'Using drip pan instead of replacing valve packing.' },
        { factor: 'Inspection Gap', percentage: 20, description: 'No torque check on packing gland nuts.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Replace gland packing set under cold isolation before resuming high-pressure pumping.',
      secondary: 'Log asset safety debt ticket for valve overhaul.',
      verificationStep: 'Soap bubble and ultrasonic leakage test after repacking.',
      responsibleRole: 'Rig Mechanic Lead',
      priority: 'High',
      barrierReinforced: 'Wellhead Primary Pressure Boundary'
    },
    validation: { status: 'Validated', validatedBy: 'Mechanical Engineer', validatedAt: '2026-09-02' },
    sourceType: 'synthetic'
  },

  // 3. WEAK SIGNAL 2 for Cluster 1: Abnormal Vibration / Delay
  {
    id: 'OIL-REP-2026-0965',
    date: '2026-08-25',
    installation: 'Duliajan Central Field',
    asset: 'Workover Rig WOR-07',
    activity: 'Workover',
    reportType: 'Unsafe Condition',
    narrative: 'Abnormal hydraulic pulsation detected in wellhead manifold lines. Valve replacement scheduled for last week was deferred due to rig availability.',
    hazard: 'Stored / Residual Energy',
    exposure: 'Workers within Unisolated Work Zone',
    barrier: 'Energy Isolation (LOTO)',
    controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
    sifPrecursor: 'Energy Isolation Failure',
    iogpRule: 'Energy Isolation',
    severity: 'High',
    sifPotential: 'Potential SIF',
    riskScore: 78,
    confidence: 90,
    evidence: ['Abnormal hydraulic pulsation detected', 'Valve replacement scheduled for last week was deferred'],
    missingEvidence: [],
    completenessScore: 82,
    contradictions: [],
    dna: {
      activity: 'Workover',
      hazard: 'Stored / Residual Energy',
      exposure: 'Workers within Unisolated Work Zone',
      barrier: 'Energy Isolation (LOTO)',
      controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
      sifPrecursor: 'Energy Isolation Failure',
      iogpRule: 'Energy Isolation',
      potentialConsequence: 'Fatigue rupture of pulsed line fittings under cyclic stress.',
      riskContribution: [
        { factor: 'Maintenance Deferral (Safety Debt)', percentage: 50, description: 'Operational priority overridden scheduled barrier overhaul.' },
        { factor: 'Cyclic Hydraulic Fatigue', percentage: 35, description: 'Pulsations weakening threaded connections.' },
        { factor: 'Crew Familiarity / Normalization', percentage: 15, description: 'Tolerating vibration as normal rig condition.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Enforce non-deferral policy on safety critical isolation valves.',
      secondary: 'Dampen hydraulic line vibrations with rated vibration clamps.',
      verificationStep: 'Superintendent sign-off on vibration spectral analysis.',
      responsibleRole: 'Asset Maintenance Manager',
      priority: 'Immediate',
      barrierReinforced: 'Asset Integrity & Maintenance Barrier'
    },
    validation: { status: 'Validated', validatedBy: 'Asset Integrity Lead', validatedAt: '2026-08-26' },
    sourceType: 'synthetic'
  },

  // 4. CLUSTER 2: Pipeline Leakage & Integrity at Moran
  {
    id: 'OIL-REP-2026-0941',
    date: '2026-09-06',
    installation: 'Moran Oil Field',
    asset: 'Crude Pipeline Trunk-A',
    activity: 'Pipeline Maintenance',
    reportType: 'Incident Precursor',
    narrative: 'Ultrasonic survey on 24-inch crude trunkline bend near river crossing identified localized wall loss down to 3.2 mm. Pinhole seep noted under insulation with soil discoloration.',
    hazard: 'High Pressure Fluid',
    exposure: 'Nearby Operators Exposed to Gas Plume',
    barrier: 'Pressure Relief & Bleedoff System',
    controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
    sifPrecursor: 'Uncontained Hydrocarbon Leakage',
    iogpRule: 'Bypassing Safety Controls',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 89,
    confidence: 92,
    evidence: ['localized wall loss down to 3.2 mm', 'Pinhole seep noted under insulation with soil discoloration'],
    missingEvidence: [],
    completenessScore: 88,
    contradictions: [],
    dna: {
      activity: 'Pipeline Maintenance',
      hazard: 'High Pressure Fluid',
      exposure: 'Nearby Operators Exposed to Gas Plume',
      barrier: 'Pressure Relief & Bleedoff System',
      controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
      sifPrecursor: 'Uncontained Hydrocarbon Leakage',
      iogpRule: 'Bypassing Safety Controls',
      potentialConsequence: 'Full-bore pipeline rupture releasing pressurized crude and hydrocarbon vapor into river eco-zone.',
      riskContribution: [
        { factor: 'Severe Wall Thinning (<30% remaining)', percentage: 45, description: 'Internal and external corrosion accelerated by river soil moisture.' },
        { factor: 'Pipeline Operating Pressure (60 bar)', percentage: 35, description: 'Operating hoop stress exceeds degraded wall burst capacity.' },
        { factor: 'Delayed Repair Execution', percentage: 20, description: 'Clamp repair delayed pending monsoon waters receding.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Immediately reduce pumping line pressure by 50% and mobilize hot-tap composite repair sleeve team.',
      secondary: 'Establish 100m containment boom downstream in river.',
      verificationStep: 'Continuous pressure monitoring and hydro-acoustic leak detection survey.',
      responsibleRole: 'Pipeline General Manager',
      priority: 'Immediate',
      barrierReinforced: 'Pipeline Physical Containment Barrier'
    },
    validation: { status: 'Validated', validatedBy: 'Head of Pipeline Safety', validatedAt: '2026-09-07' },
    sourceType: 'synthetic'
  },

  // 5. Work at Height at Jorhat Rig 4
  {
    id: 'OIL-REP-2026-0928',
    date: '2026-09-05',
    installation: 'Jorhat Exploration Rig 4',
    asset: 'Jorhat Exploration Rig 4',
    activity: 'Work at Height',
    reportType: 'Unsafe Act',
    narrative: 'Derrickman observed on monkey board platform at 28 meters height without 100% tie-off while positioning drill pipes into fingerboard during high wind gusts.',
    hazard: 'Fall from Height',
    exposure: 'Elevated Technician without Fall Restraint',
    barrier: 'Fall Protection System',
    controlFailure: 'Missing / Improper 100% Tie-Off',
    sifPrecursor: 'Failed Fall Protection',
    iogpRule: 'Work at Height',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 91,
    confidence: 96,
    evidence: [
      'Derrickman observed on monkey board platform at 28 meters height without 100% tie-off',
      'positioning drill pipes into fingerboard during high wind gusts'
    ],
    missingEvidence: [
      {
        id: 'ME-03',
        category: 'Tie-Off Method',
        criticalItem: '100% Continuous Fall Restraint / Anchor Point Certification',
        whyCritical: 'Failure to document anchorage integrity leaves fall arrest effectiveness unconfirmed.',
        severity: 'High',
        suggestedPrompt: 'Was certified 5,000 lbs anchor point identified and was double-lanyard 100% tie-off practiced?'
      }
    ],
    completenessScore: 74,
    contradictions: [],
    dna: {
      activity: 'Work at Height',
      hazard: 'Fall from Height',
      exposure: 'Elevated Technician without Fall Restraint',
      barrier: 'Fall Protection System',
      controlFailure: 'Missing / Improper 100% Tie-Off',
      sifPrecursor: 'Failed Fall Protection',
      iogpRule: 'Work at Height',
      potentialConsequence: '28-meter freefall onto rig sub-floor resulting in fatal impact trauma.',
      riskContribution: [
        { factor: 'Extreme Height Exposure (28m)', percentage: 45, description: 'Fall from monkey board has 99%+ fatality probability without arrest.' },
        { factor: 'Total Absence of Mechanical Arrest', percentage: 35, description: 'Lanyard unclipped to gain lateral reach during pipe racking.' },
        { factor: 'Adverse Weather (High Wind)', percentage: 20, description: 'Wind loading destabilizing balance on narrow grating.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Immediate stand-down of elevated operations until 100% dual-lanyard tie-off and inertia reel anchor testing is certified.',
      secondary: 'Install self-locking horizontal wire guide across fingerboard racking console.',
      verificationStep: 'Rig Safety Officer physical harness audit and derrickman competency re-assessment.',
      responsibleRole: 'Toolpusher & Rig Safety Lead',
      priority: 'Immediate',
      barrierReinforced: 'Fall Protection and Fall Arrest System'
    },
    validation: { status: 'Validated', validatedBy: 'Drilling Superintendent', validatedAt: '2026-09-05' },
    sourceType: 'synthetic'
  },

  // 6. Confined Space at Bagjan Wellsite
  {
    id: 'OIL-REP-2026-0912',
    date: '2026-09-03',
    installation: 'Bagjan Wellsite Operations',
    asset: 'High-Pressure 3-Phase Test Separator V-201',
    activity: 'Confined Space Entry',
    reportType: 'Incident Precursor',
    narrative: 'Contractor tank cleaning crew attempted vessel entry into 3-phase test separator before gas test certificate was issued. Entry permit was signed in office without field atmosphere verification.',
    hazard: 'Oxygen Deficiency / Toxic Fumes',
    exposure: 'Entry Team in Enclosed Vessel',
    barrier: 'Ventilation & Air Monitoring',
    controlFailure: 'Inadequate Gas Testing Before Entry',
    sifPrecursor: 'Confined Space Engulfment',
    iogpRule: 'Confined Space',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 94,
    confidence: 95,
    evidence: [
      'attempted vessel entry into 3-phase test separator before gas test certificate was issued',
      'Entry permit was signed in office without field atmosphere verification'
    ],
    missingEvidence: [
      {
        id: 'ME-04',
        category: 'Life Support Controls',
        criticalItem: 'Continuous Multi-Gas Monitoring & Dedicated Standby Person Log',
        whyCritical: 'Atmospheric inversion can occur without sensory warning in enclosed hydrocarbons.',
        severity: 'High',
        suggestedPrompt: 'Attach continuous LEL, O2, H2S calibration logs and Standby Sentry entry-exit manifest.'
      }
    ],
    completenessScore: 65,
    contradictions: [
      {
        id: 'CONT-02',
        statementA: 'Permit indicated gas test completed and safe for hot and cold work.',
        statementB: 'Gas detector calibration kit was still in transit and testing had not occurred.',
        analysis: 'Critical procedural failure: Permit signed in office prior to physical field gas testing.',
        riskImplication: 'Workers entering potentially oxygen-deficient or H2S enriched vessel without breathing apparatus.'
      }
    ],
    dna: {
      activity: 'Confined Space Entry',
      hazard: 'Oxygen Deficiency / Toxic Fumes',
      exposure: 'Entry Team in Enclosed Vessel',
      barrier: 'Ventilation & Air Monitoring',
      controlFailure: 'Inadequate Gas Testing Before Entry',
      sifPrecursor: 'Confined Space Engulfment',
      iogpRule: 'Confined Space',
      potentialConsequence: 'Immediate loss of consciousness from H2S or oxygen deficiency (<12%) resulting in dual asphyxiation.',
      riskContribution: [
        { factor: 'Toxic Gas Entrapment (Sludge degassing)', percentage: 40, description: 'Residual sour crude sludge releases volatile organics upon disturbance.' },
        { factor: 'Premature Entry Clearance', percentage: 35, description: 'Permit signed without multi-gas reading at top/middle/bottom.' },
        { factor: 'Lack of Standby Rescue Personnel', percentage: 25, description: 'No external sentry equipped with positive pressure SCBA.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Lock vessel hatch with physical padlock; revoke PTW and conduct disciplinary review of permit issuer.',
      secondary: 'Deploy pneumatic eductors for 12 hours followed by dual certified gas tester verification.',
      verificationStep: 'HSE Manager personal walkdown and continuous gas readout record upload.',
      responsibleRole: 'Installation HSE Manager',
      priority: 'Immediate',
      barrierReinforced: 'Confined Space Life Support & Verification Barrier'
    },
    validation: { status: 'HSE Reviewed', validatedBy: 'Executive HSE Inspector', validatedAt: '2026-09-04' },
    sourceType: 'synthetic'
  },

  // 7. Hot work near classified area at Digboi
  {
    id: 'OIL-REP-2026-0895',
    date: '2026-08-30',
    installation: 'Digboi Refinery Area & Fields',
    asset: 'Main Crude Oil Transfer Pump P-102B',
    activity: 'Hot Work & Welding',
    reportType: 'Unsafe Act',
    narrative: 'Electric arc welding on structural baseplate performed 4 meters away from crude transfer pump while pump gland had active weeping. Fire blanket was torn and flammable gas detector was out of battery.',
    hazard: 'Ignition Source in Hazardous Zone',
    exposure: 'Personnel in Direct Line-of-Fire',
    barrier: 'Hot Work Isolation & Fire Watch',
    controlFailure: 'Bypassed Interlock / Safeguard Overridden',
    sifPrecursor: 'Hot Work Ignition Precursor',
    iogpRule: 'Hot Work',
    severity: 'High',
    sifPotential: 'SIF-Capable',
    riskScore: 86,
    confidence: 93,
    evidence: [
      'Electric arc welding performed 4 meters away from crude transfer pump while pump gland had active weeping',
      'Fire blanket was torn and flammable gas detector was out of battery'
    ],
    missingEvidence: [],
    completenessScore: 82,
    contradictions: [],
    dna: {
      activity: 'Hot Work & Welding',
      hazard: 'Ignition Source in Hazardous Zone',
      exposure: 'Personnel in Direct Line-of-Fire',
      barrier: 'Hot Work Isolation & Fire Watch',
      controlFailure: 'Bypassed Interlock / Safeguard Overridden',
      sifPrecursor: 'Hot Work Ignition Precursor',
      iogpRule: 'Hot Work',
      potentialConsequence: 'Flash fire ignition of crude vapor cloud engulfing welder and area operators.',
      riskContribution: [
        { factor: 'Ignition Source in Zone 1 Envelope', percentage: 40, description: 'Welding arc within 4m of volatile leaking hydrocarbon.' },
        { factor: 'Failed Fire Barrier (Torn blanket)', percentage: 35, description: 'Thermal sparks escaping habitat enclosure.' },
        { factor: 'Uncalibrated / Unpowered Gas Detector', percentage: 25, description: 'Zero warning of flammable vapor concentration buildup.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Instant suspension of hot work; replace gas detector with bump-tested calibrated unit; repair pump gland leak.',
      secondary: 'Enforce 15-meter buffer zone and install pressurized welding habitat with fresh air positive purge.',
      verificationStep: 'Continuous LEL monitoring at 0% and dedicated fire watch equipped with 50kg dry powder trolley.',
      responsibleRole: 'Maintenance Supervisor & Fire Watch Lead',
      priority: 'Immediate',
      barrierReinforced: 'Hot Work Fire Containment & Ignition Suppression'
    },
    validation: { status: 'Validated', validatedBy: 'Fire & Safety Officer', validatedAt: '2026-08-31' },
    sourceType: 'synthetic'
  },

  // 8. Mechanical lifting at Kumchai
  {
    id: 'OIL-REP-2026-0880',
    date: '2026-08-28',
    installation: 'Kumchai Field (Arunachal)',
    asset: 'Wellhead WH-12B',
    activity: 'Mechanical Lifting',
    reportType: 'Incident Precursor',
    narrative: 'Mobile crane lifting 6-ton blowout preventer (BOP) stack used synthetic web sling with visible cut on edge. Rigger walked beneath suspended load to guide alignment pin with hands instead of tag lines.',
    hazard: 'Dropped Object',
    exposure: 'Ground Crew beneath Suspended Load',
    barrier: 'Certified Lifting Rigging & Plan',
    controlFailure: 'Uncertified Rigging Hardware / Exceeded WLL',
    sifPrecursor: 'Suspended Load Rigging Failure',
    iogpRule: 'Safe Mechanical Lifting',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 90,
    confidence: 94,
    evidence: [
      'used synthetic web sling with visible cut on edge',
      'Rigger walked beneath suspended load to guide alignment pin with hands instead of tag lines'
    ],
    missingEvidence: [],
    completenessScore: 84,
    contradictions: [],
    dna: {
      activity: 'Mechanical Lifting',
      hazard: 'Dropped Object',
      exposure: 'Ground Crew beneath Suspended Load',
      barrier: 'Certified Lifting Rigging & Plan',
      controlFailure: 'Uncertified Rigging Hardware / Exceeded WLL',
      sifPrecursor: 'Suspended Load Rigging Failure',
      iogpRule: 'Safe Mechanical Lifting',
      potentialConsequence: 'Sling failure resulting in 6-ton BOP stack dropping directly onto rigger, causing fatal crush.',
      riskContribution: [
        { factor: 'Damaged Rigging Hardware', percentage: 40, description: 'Severed webbing reduces safe working load below 6-ton dynamic weight.' },
        { factor: 'Line of Fire Violation', percentage: 35, description: 'Personnel positioned beneath gravity trajectory of suspended load.' },
        { factor: 'Absence of Hands-Free Tools', percentage: 25, description: 'Guiding heavy equipment with bare hands instead of dual tag lines.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Lower BOP to stable timbers; cut damaged sling in half to prevent reuse; issue stop work order.',
      secondary: 'Conduct all heavy lifts utilizing rated 4-leg wire rope slings with certified master links.',
      verificationStep: 'Rigging supervisor pre-lift checklist sign-off and mandatory 10m exclusion radius tape.',
      responsibleRole: 'Lifting Superintendent & Crane Operator',
      priority: 'Immediate',
      barrierReinforced: 'Rigging Integrity & Crane Load Path Barrier'
    },
    validation: { status: 'Validated', validatedBy: 'Field Operations Manager', validatedAt: '2026-08-29' },
    sourceType: 'synthetic'
  },

  // 9. Drilling well control precursor at Duliajan
  {
    id: 'OIL-REP-2026-0871',
    date: '2026-08-22',
    installation: 'Duliajan Central Field',
    asset: 'Wellhead Isolation Master Valve MV-104',
    activity: 'Drilling',
    reportType: 'Incident Precursor',
    narrative: 'Pit gain of 8 barrels detected during drilling at 3,200m depth. Mud weight was found 0.4 ppg below programmed pore pressure due to water addition without engineer clearance.',
    hazard: 'High Pressure Fluid',
    exposure: 'Workers within Unisolated Work Zone',
    barrier: 'Pressure Relief & Bleedoff System',
    controlFailure: 'Bypassed Interlock / Safeguard Overridden',
    sifPrecursor: 'High-Pressure Blowout / Ejection',
    iogpRule: 'Bypassing Safety Controls',
    severity: 'Critical',
    sifPotential: 'SIF-Capable',
    riskScore: 88,
    confidence: 91,
    evidence: ['Pit gain of 8 barrels detected during drilling', 'Mud weight was found 0.4 ppg below programmed pore pressure'],
    missingEvidence: [],
    completenessScore: 80,
    contradictions: [],
    dna: {
      activity: 'Drilling',
      hazard: 'High Pressure Fluid',
      exposure: 'Workers within Unisolated Work Zone',
      barrier: 'Pressure Relief & Bleedoff System',
      controlFailure: 'Bypassed Interlock / Safeguard Overridden',
      sifPrecursor: 'High-Pressure Blowout / Ejection',
      iogpRule: 'Bypassing Safety Controls',
      potentialConsequence: 'Uncontrolled kick escalating to primary well control failure and surface blowout.',
      riskContribution: [
        { factor: 'Hydrostatic Pressure Underbalance', percentage: 45, description: 'Underbalanced column allowing reservoir fluid influx.' },
        { factor: 'Unauthorized Fluid Dilution', percentage: 35, description: 'Water added to mud pits without mud engineer testing.' },
        { factor: 'Kick Detection Latency', percentage: 20, description: 'PVT sensor calibration lagged by 15 minutes.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Space out drill string, shut in well on annular BOP, record SIDPP and SICP, and execute Wait & Weight kill method.',
      secondary: 'Weight up reserve mud pits with barite to required 12.2 ppg kill weight.',
      verificationStep: 'Drilling Superintendent and Rig Specialist dual sign-off on kill sheet calculations.',
      responsibleRole: 'Drilling Superintendent & Mud Engineer',
      priority: 'Immediate',
      barrierReinforced: 'Primary Hydrostatic & Secondary Mechanical Well Control'
    },
    validation: { status: 'Validated', validatedBy: 'General Manager (Drilling)', validatedAt: '2026-08-23' },
    sourceType: 'synthetic'
  },

  // 10. Energy Isolation repeat report at Duliajan
  {
    id: 'OIL-REP-2026-0855',
    date: '2026-08-18',
    installation: 'Duliajan Central Field',
    asset: 'Wellhead Isolation Master Valve MV-104',
    activity: 'General Maintenance',
    reportType: 'Unsafe Act',
    narrative: 'Fitter removed flange bolts on bypass line while master valve MV-104 isolation tag had wrong equipment number written. Lock was present but key was left in padlock.',
    hazard: 'Stored / Residual Energy',
    exposure: 'Workers within Unisolated Work Zone',
    barrier: 'Energy Isolation (LOTO)',
    controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
    sifPrecursor: 'Energy Isolation Failure',
    iogpRule: 'Energy Isolation',
    severity: 'High',
    sifPotential: 'SIF-Capable',
    riskScore: 85,
    confidence: 93,
    evidence: [
      'isolation tag had wrong equipment number written',
      'Lock was present but key was left in padlock'
    ],
    missingEvidence: [],
    completenessScore: 80,
    contradictions: [],
    dna: {
      activity: 'General Maintenance',
      hazard: 'Stored / Residual Energy',
      exposure: 'Workers within Unisolated Work Zone',
      barrier: 'Energy Isolation (LOTO)',
      controlFailure: 'Isolation Not Verified / Zero-Energy Unchecked',
      sifPrecursor: 'Energy Isolation Failure',
      iogpRule: 'Energy Isolation',
      potentialConsequence: 'Inadvertent valve opening by third party during line breaking causing pressurized fluid spray.',
      riskContribution: [
        { factor: 'Defeated Lockout Security (Key left in lock)', percentage: 40, description: 'Negates physical prevention of unauthorized valve operation.' },
        { factor: 'Tag Misidentification', percentage: 35, description: 'Incorrect equipment tag creates confusion during emergency isolation.' },
        { factor: 'Flange Bolt Removal Sequence Violation', percentage: 25, description: 'Removing far bolts before breaking seal away from body.' }
      ]
    },
    recommendedIntervention: {
      primary: 'Re-apply verified personal padlock with key in possession of lead technician; replace tag with correct asset ID.',
      secondary: 'Conduct refresher briefing on LOTO key custody protocols across maintenance division.',
      verificationStep: 'HSE supervisor spot-check of all active LOTO boards in Central Field.',
      responsibleRole: 'Field Maintenance Lead',
      priority: 'Immediate',
      barrierReinforced: 'LOTO Physical Security & Chain of Custody'
    },
    validation: { status: 'Validated', validatedBy: 'HSE Supervisor', validatedAt: '2026-08-19' },
    sourceType: 'synthetic'
  }
];

// Helper to generate 50 additional interconnected synthetic reports for robust statistics and realistic timeline trends
export function generateInterconnectedReports(): SafetyReport[] {
  const reports = [...INITIAL_SYNTHETIC_REPORTS];
  const installations = [
    'Duliajan Central Field',
    'Moran Oil Field',
    'Digboi Refinery Area & Fields',
    'Jorhat Exploration Rig 4',
    'Bagjan Wellsite Operations',
    'Rajasthan Block-RJ (Jaisalmer)',
    'Dandewala Gas Plant',
    'Kumchai Field (Arunachal)'
  ];

  const assets = [
    'Wellhead Isolation Master Valve MV-104',
    'Workover Rig WOR-07',
    'Crude Pipeline Trunk-A',
    'High-Pressure 3-Phase Test Separator V-201',
    'Main Crude Oil Transfer Pump P-102B',
    'Wellhead WH-12B'
  ];

  const scenarios = [
    {
      act: 'Workover' as const,
      haz: 'Stored / Residual Energy' as const,
      exp: 'Workers within Unisolated Work Zone' as const,
      bar: 'Energy Isolation (LOTO)' as const,
      cf: 'Isolation Not Verified / Zero-Energy Unchecked' as const,
      sif: 'Energy Isolation Failure' as const,
      rule: 'Energy Isolation' as const,
      narrative: 'Residual pressure noted in manifold during tubing pulling. Bleed valve was clogged with wax precipitate preventing accurate gauge reading.'
    },
    {
      act: 'Pipeline Maintenance' as const,
      haz: 'High Pressure Fluid' as const,
      exp: 'Nearby Operators Exposed to Gas Plume' as const,
      bar: 'Pressure Relief & Bleedoff System' as const,
      cf: 'Isolation Not Verified / Zero-Energy Unchecked' as const,
      sif: 'Uncontained Hydrocarbon Leakage' as const,
      rule: 'Bypassing Safety Controls' as const,
      narrative: 'Gas detector alarm sounded at 22% LEL along manifold junction. Flange gasket showed signs of thermal deterioration.'
    },
    {
      act: 'Work at Height' as const,
      haz: 'Fall from Height' as const,
      exp: 'Elevated Technician without Fall Restraint' as const,
      bar: 'Fall Protection System' as const,
      cf: 'Missing / Improper 100% Tie-Off' as const,
      sif: 'Failed Fall Protection' as const,
      rule: 'Work at Height' as const,
      narrative: 'Scaffold toe-board missing on platform 4 meters above ground. Technician was working without chin-strap on safety helmet.'
    },
    {
      act: 'Confined Space Entry' as const,
      haz: 'Oxygen Deficiency / Toxic Fumes' as const,
      exp: 'Entry Team in Enclosed Vessel' as const,
      bar: 'Ventilation & Air Monitoring' as const,
      cf: 'Inadequate Gas Testing Before Entry' as const,
      sif: 'Confined Space Engulfment' as const,
      rule: 'Confined Space' as const,
      narrative: 'Ventilation fan stopped working for 20 minutes during vessel internal visual inspection. Workers did not immediately evacuate.'
    },
    {
      act: 'Hot Work & Welding' as const,
      haz: 'Ignition Source in Hazardous Zone' as const,
      exp: 'Personnel in Direct Line-of-Fire' as const,
      bar: 'Hot Work Isolation & Fire Watch' as const,
      cf: 'Bypassed Interlock / Safeguard Overridden' as const,
      sif: 'Hot Work Ignition Precursor' as const,
      rule: 'Hot Work' as const,
      narrative: 'Grinding sparks observed landing near open oily water sump. Fire extinguisher on site was overdue for annual hydrostatic test.'
    },
    {
      act: 'Mechanical Lifting' as const,
      haz: 'Dropped Object' as const,
      exp: 'Ground Crew beneath Suspended Load' as const,
      bar: 'Certified Lifting Rigging & Plan' as const,
      cf: 'Uncertified Rigging Hardware / Exceeded WLL' as const,
      sif: 'Suspended Load Rigging Failure' as const,
      rule: 'Safe Mechanical Lifting' as const,
      narrative: 'Crane operator initiated blind lift without designated signalman in visual contact. Load hovered over electrical cable tray.'
    }
  ];

  // Generate 45 additional historical records spread across past 90 days
  for (let i = 1; i <= 45; i++) {
    const sc = scenarios[i % scenarios.length];
    const inst = installations[i % installations.length];
    const asset = assets[i % assets.length];
    const dayOffset = (i * 2) % 85;
    const reportDate = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const riskScore = 65 + ((i * 7) % 28);
    const id = `OIL-REP-HIST-${1000 + i}`;

    reports.push({
      id,
      date: reportDate,
      installation: inst,
      asset: asset,
      activity: sc.act,
      reportType: riskScore > 75 ? 'Incident Precursor' : 'Unsafe Condition',
      narrative: `${sc.narrative} Location: ${inst}, Unit: ${asset}.`,
      hazard: sc.haz,
      exposure: sc.exp,
      barrier: sc.bar,
      controlFailure: sc.cf,
      sifPrecursor: sc.sif,
      iogpRule: sc.rule,
      severity: riskScore > 85 ? 'Critical' : riskScore > 70 ? 'High' : 'Medium',
      sifPotential: riskScore > 78 ? 'SIF-Capable' : 'Potential SIF',
      riskScore,
      confidence: 85 + (i % 10),
      evidence: [sc.narrative],
      missingEvidence: [],
      completenessScore: 78 + (i % 18),
      contradictions: [],
      dna: {
        activity: sc.act,
        hazard: sc.haz,
        exposure: sc.exp,
        barrier: sc.bar,
        controlFailure: sc.cf,
        sifPrecursor: sc.sif,
        iogpRule: sc.rule,
        potentialConsequence: `Escalation of ${sc.haz} resulting in personnel injury or equipment loss.`,
        riskContribution: [
          { factor: 'Hardware / Barrier Failure', percentage: 40, description: 'Failure of protective control or barrier.' },
          { factor: 'Human / Procedural Lapse', percentage: 35, description: 'Non-compliance with established safety standard.' },
          { factor: 'Environmental Factors', percentage: 25, description: 'Field geometry and ambient operational conditions.' }
        ]
      },
      recommendedIntervention: {
        primary: `Enforce strict compliance with ${sc.rule} guidelines and conduct on-site verification.`,
        secondary: 'Review task risk assessment and ensure all crew members attend toolbox talk.',
        verificationStep: 'Supervisory sign-off on pre-job safety checklist.',
        responsibleRole: 'Field HSE Officer',
        priority: riskScore > 80 ? 'Immediate' : 'High',
        barrierReinforced: sc.bar
      },
      validation: {
        status: i % 3 === 0 ? 'Validated' : i % 2 === 0 ? 'HSE Reviewed' : 'AI Suggested',
        validatedBy: i % 2 === 0 ? 'Area HSE Coordinator' : undefined,
        validatedAt: i % 2 === 0 ? reportDate : undefined
      },
      sourceType: 'synthetic'
    });
  }

  return reports;
}

export const INITIAL_CORRECTIVE_ACTIONS: CorrectiveAction[] = [
  {
    id: 'CA-2026-081',
    reportId: 'OIL-REP-2026-1001',
    title: 'Install Digital Verification Gauge on Master Valve MV-104',
    description: 'Procure and calibrate digital wireless pressure transmitter on wellhead bleed manifold with dual LOTO car-seal brackets.',
    owner: 'Arunav Sharma (Chief Maintenance Engineer)',
    targetDate: '2026-09-18',
    priority: 'Critical',
    status: 'IN PROGRESS',
    verificationMethod: 'Physical pressure test certificate and supervisory field audit walkdown.',
    barrierAddressed: 'Energy Isolation (LOTO)',
    installation: 'Duliajan Central Field',
    createdAt: '2026-09-08 15:00'
  },
  {
    id: 'CA-2026-079',
    reportId: 'OIL-REP-2026-0982',
    title: 'Workover Rig WOR-07 Hydraulic System Seal Overhaul',
    description: 'Replace degraded chevron packing and gland follower bolts on master isolation valve MV-104 during planned rig move.',
    owner: 'Priyanka Saikia (Rig Mechanic Lead)',
    targetDate: '2026-09-14',
    priority: 'High',
    status: 'OPEN',
    verificationMethod: 'Hydrostatic pressure test to 3,000 psi for 15 minutes with zero pressure drop.',
    barrierAddressed: 'Energy Isolation (LOTO)',
    installation: 'Duliajan Central Field',
    createdAt: '2026-09-02 11:20'
  },
  {
    id: 'CA-2026-075',
    reportId: 'OIL-REP-2026-0941',
    title: 'Composite Wrap Repair on Trunk-A River Crossing Bend',
    description: 'Mobilize specialist wrapping contractor to apply clock-spring composite reinforcing sleeve on 3.2mm thinned pipe wall.',
    owner: 'Diganta Borah (Pipeline Maintenance Lead)',
    targetDate: '2026-09-12',
    priority: 'Critical',
    status: 'IN PROGRESS',
    verificationMethod: 'Ultrasonic wall thickness measurement and hydro-acoustic acoustic emission monitoring.',
    barrierAddressed: 'Pressure Relief & Bleedoff System',
    installation: 'Moran Oil Field',
    createdAt: '2026-09-06 16:45'
  },
  {
    id: 'CA-2026-072',
    reportId: 'OIL-REP-2026-0928',
    title: 'Recertify Derrick Monkey Board Fall Arrest Anchors',
    description: 'Execute proof-load test to 22.2 kN on all derrick anchor points and replace worn inertia reels.',
    owner: 'Rajesh Gogoi (Toolpusher)',
    targetDate: '2026-09-09',
    priority: 'Critical',
    status: 'AWAITING VERIFICATION',
    verificationMethod: 'Third-party NDT load test certification and safety officer visual tagging.',
    barrierAddressed: 'Fall Protection System',
    installation: 'Jorhat Exploration Rig 4',
    createdAt: '2026-09-05 18:00'
  },
  {
    id: 'CA-2026-068',
    reportId: 'OIL-REP-2026-0912',
    title: 'Mandatory Gas Detector Docking Station & Calibration Check',
    description: 'Implement daily automated bump-test docking station at Bagjan stores and revoke manual paper gas test waivers.',
    owner: 'Bhupen Nath (HSE Officer)',
    targetDate: '2026-09-10',
    priority: 'High',
    status: 'CLOSED',
    verificationMethod: 'Automated digital calibration logs uploaded directly to Central HSE SCADA server.',
    verifiedBy: 'Senior HSE Director',
    verifiedAt: '2026-09-07 09:30',
    barrierAddressed: 'Ventilation & Air Monitoring',
    installation: 'Bagjan Wellsite Operations',
    createdAt: '2026-09-03 14:15'
  }
];

export const INITIAL_AUDIT_TRAIL: AuditEvent[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-08 14:15',
    reportId: 'OIL-REP-2026-1001',
    eventType: 'REPORT_RECEIVED',
    user: 'System Ingestion (Field Upload)',
    details: 'Received raw report file regarding Workover Rig WOR-07 wellhead isolation.',
    severity: 'info'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-09-08 14:16',
    reportId: 'OIL-REP-2026-1001',
    eventType: 'AI_ANALYSIS_COMPLETED',
    user: 'OIL HSE Intelligence Engine',
    details: 'NLP extraction identified Energy Isolation Failure as Critical SIF Precursor (Risk Score: 92, SIF-Capable).',
    severity: 'critical'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-09-08 14:18',
    reportId: 'OIL-REP-2026-1001',
    eventType: 'BARRIER_DEGRADED',
    user: 'Barrier Health Engine',
    details: 'Energy Isolation barrier in Duliajan Central Field transitioned from WARNING to DEGRADING state.',
    severity: 'warning'
  },
  {
    id: 'AUD-904',
    timestamp: '2026-09-08 14:30',
    reportId: 'OIL-REP-2026-1001',
    eventType: 'HSE_REVIEWED',
    user: 'Senior HSE Officer (Duliajan)',
    details: 'Officer reviewed and validated AI-detected precursor; confirmed line-of-fire cellar exposure.',
    severity: 'info'
  },
  {
    id: 'AUD-905',
    timestamp: '2026-09-08 15:00',
    reportId: 'OIL-REP-2026-1001',
    actionId: 'CA-2026-081',
    eventType: 'ACTION_CREATED',
    user: 'Senior HSE Officer (Duliajan)',
    details: 'Created Critical Corrective Action CA-2026-081 assigned to Arunav Sharma.',
    severity: 'info'
  }
];

export const INITIAL_WEAK_SIGNAL_CLUSTERS: WeakSignalCluster[] = [
  {
    id: 'WSC-01',
    title: 'Workover Wellhead Isolation & Accumulator Degradation',
    installation: 'Duliajan Central Field',
    asset: 'Workover Rig WOR-07',
    reportIds: ['OIL-REP-2026-1001', 'OIL-REP-2026-0982', 'OIL-REP-2026-0965', 'OIL-REP-2026-0855'],
    commonFactors: [
      'Repeated valve isolation anomalies on wellhead master valve MV-104',
      'Cyclic hydraulic pressure pulsation in manifold lines',
      'Temporary drip pan containment used in place of positive mechanical packing repair',
      'Maintenance deferral linked to continuous well-pulling schedule'
    ],
    timeline: [
      { date: '2026-08-18', event: 'LOTO key custody violation and tag misidentification', reportId: 'OIL-REP-2026-0855' },
      { date: '2026-08-25', event: 'Abnormal hydraulic pulsation & valve replacement deferred', reportId: 'OIL-REP-2026-0965' },
      { date: '2026-09-01', event: 'Minor crude weeping past valve packing with drip pan placed', reportId: 'OIL-REP-2026-0982' },
      { date: '2026-09-08', event: 'Residual 45 psi trapped in line while workers inside cellar', reportId: 'OIL-REP-2026-1001' }
    ],
    clusterRisk: 93,
    confidence: 94,
    dominantPrecursor: 'Energy Isolation Failure',
    recommendedIntervention: 'Execute comprehensive wellhead barrier stand-down on WOR-07; replace valve MV-104 before next tubing trip.',
    status: 'Active Warning'
  },
  {
    id: 'WSC-02',
    title: 'River Crossing Pipeline Wall Thinning & Flange Seepage',
    installation: 'Moran Oil Field',
    asset: 'Crude Pipeline Trunk-A',
    reportIds: ['OIL-REP-2026-0941'],
    commonFactors: [
      'Accelerated internal corrosion near river bend #4',
      'Intermittent low-pressure hydrocarbon seepage under insulation',
      'Cathodic protection potential drop recorded during wet season'
    ],
    timeline: [
      { date: '2026-08-15', event: 'Cathodic protection survey flagged low voltage at bend #4', reportId: 'OIL-REP-HIST-1014' },
      { date: '2026-09-06', event: 'Ultrasonic survey detected 3.2mm remaining wall and pinhole leak', reportId: 'OIL-REP-2026-0941' }
    ],
    clusterRisk: 86,
    confidence: 90,
    dominantPrecursor: 'Uncontained Hydrocarbon Leakage',
    recommendedIntervention: 'Apply immediate composite pressure sleeve and install acoustic leak detection sensors.',
    status: 'Active Warning'
  },
  {
    id: 'WSC-03',
    title: 'Derrick Racking Monkey Board Fall Restraint Bypasses',
    installation: 'Jorhat Exploration Rig 4',
    asset: 'Jorhat Exploration Rig 4',
    reportIds: ['OIL-REP-2026-0928'],
    commonFactors: [
      'Monkey board personnel uncoupling lanyards to extend lateral reach',
      'High wind velocity conditions during night trips',
      'Frayed secondary safety lines on fingerboard'
    ],
    timeline: [
      { date: '2026-08-20', event: 'Near miss when derrickman slipped on oily grating', reportId: 'OIL-REP-HIST-1022' },
      { date: '2026-09-05', event: 'Derrickman observed at 28m height without 100% tie-off', reportId: 'OIL-REP-2026-0928' }
    ],
    clusterRisk: 88,
    confidence: 91,
    dominantPrecursor: 'Failed Fall Protection',
    recommendedIntervention: 'Install rigid horizontal lifeline across fingerboard and mandate dual-hook harness protocols.',
    status: 'Active Warning'
  }
];

export const INITIAL_BARRIER_HEALTH: BarrierHealth[] = [
  {
    barrier: 'Energy Isolation (LOTO)',
    currentStatus: 'Critical',
    healthScore: 38,
    failureCount: 14,
    trend: 'degrading',
    monthlyHistory: [
      { month: 'May 2026', status: 'HEALTHY', score: 88 },
      { month: 'Jun 2026', status: 'HEALTHY', score: 82 },
      { month: 'Jul 2026', status: 'WARNING', score: 68 },
      { month: 'Aug 2026', status: 'DEGRADING', score: 51 },
      { month: 'Sep 2026', status: 'CRITICAL', score: 38 }
    ],
    degradationDriver: 'Persistent failure to perform independent zero-energy physical bleed verification before flange breaking.',
    relatedReportIds: ['OIL-REP-2026-1001', 'OIL-REP-2026-0982', 'OIL-REP-2026-0965', 'OIL-REP-2026-0855'],
    openActionCount: 3
  },
  {
    barrier: 'Fall Protection System',
    currentStatus: 'Degrading',
    healthScore: 52,
    failureCount: 9,
    trend: 'degrading',
    monthlyHistory: [
      { month: 'May 2026', status: 'HEALTHY', score: 90 },
      { month: 'Jun 2026', status: 'WARNING', score: 74 },
      { month: 'Jul 2026', status: 'WARNING', score: 69 },
      { month: 'Aug 2026', status: 'DEGRADING', score: 58 },
      { month: 'Sep 2026', status: 'DEGRADING', score: 52 }
    ],
    degradationDriver: 'Intermittent 100% tie-off omissions during mast transfer and uncertified anchor points.',
    relatedReportIds: ['OIL-REP-2026-0928'],
    openActionCount: 2
  },
  {
    barrier: 'Ventilation & Air Monitoring',
    currentStatus: 'Warning',
    healthScore: 64,
    failureCount: 7,
    trend: 'stable',
    monthlyHistory: [
      { month: 'May 2026', status: 'HEALTHY', score: 85 },
      { month: 'Jun 2026', status: 'HEALTHY', score: 80 },
      { month: 'Jul 2026', status: 'WARNING', score: 70 },
      { month: 'Aug 2026', status: 'WARNING', score: 65 },
      { month: 'Sep 2026', status: 'WARNING', score: 64 }
    ],
    degradationDriver: 'Delays in multi-gas sensor calibration and premature entry permit sign-off.',
    relatedReportIds: ['OIL-REP-2026-0912'],
    openActionCount: 1
  },
  {
    barrier: 'Pressure Relief & Bleedoff System',
    currentStatus: 'Warning',
    healthScore: 61,
    failureCount: 8,
    trend: 'degrading',
    monthlyHistory: [
      { month: 'May 2026', status: 'HEALTHY', score: 89 },
      { month: 'Jun 2026', status: 'HEALTHY', score: 84 },
      { month: 'Jul 2026', status: 'WARNING', score: 72 },
      { month: 'Aug 2026', status: 'WARNING', score: 66 },
      { month: 'Sep 2026', status: 'WARNING', score: 61 }
    ],
    degradationDriver: 'Wax fouling in bleed lines and expired bench test certificates on auxiliary relief valves.',
    relatedReportIds: ['OIL-REP-2026-0941', 'OIL-REP-2026-0871'],
    openActionCount: 2
  },
  {
    barrier: 'Certified Lifting Rigging & Plan',
    currentStatus: 'Healthy',
    healthScore: 82,
    failureCount: 4,
    trend: 'improving',
    monthlyHistory: [
      { month: 'May 2026', status: 'WARNING', score: 71 },
      { month: 'Jun 2026', status: 'HEALTHY', score: 78 },
      { month: 'Jul 2026', status: 'HEALTHY', score: 80 },
      { month: 'Aug 2026', status: 'HEALTHY', score: 81 },
      { month: 'Sep 2026', status: 'HEALTHY', score: 82 }
    ],
    degradationDriver: 'Isolated rigging damage incidents quickly isolated and removed from service.',
    relatedReportIds: ['OIL-REP-2026-0880'],
    openActionCount: 1
  }
];

export const INITIAL_PRECURSOR_VELOCITY: PrecursorVelocityItem[] = [
  {
    precursor: 'Energy Isolation Failure',
    countPrevious90Days: 5,
    countCurrent30Days: 12,
    velocityMultiplier: 2.4,
    classification: 'INCREASING',
    riskCategory: 'High',
    topInstallation: 'Duliajan Central Field'
  },
  {
    precursor: 'Uncontained Hydrocarbon Leakage',
    countPrevious90Days: 6,
    countCurrent30Days: 8,
    velocityMultiplier: 1.33,
    classification: 'INCREASING',
    riskCategory: 'High',
    topInstallation: 'Moran Oil Field'
  },
  {
    precursor: 'Failed Fall Protection',
    countPrevious90Days: 7,
    countCurrent30Days: 8,
    velocityMultiplier: 1.14,
    classification: 'STABLE',
    riskCategory: 'Medium',
    topInstallation: 'Jorhat Exploration Rig 4'
  },
  {
    precursor: 'Confined Space Engulfment',
    countPrevious90Days: 4,
    countCurrent30Days: 3,
    velocityMultiplier: 0.75,
    classification: 'DECLINING',
    riskCategory: 'Low',
    topInstallation: 'Bagjan Wellsite Operations'
  },
  {
    precursor: 'Suspended Load Rigging Failure',
    countPrevious90Days: 5,
    countCurrent30Days: 4,
    velocityMultiplier: 0.8,
    classification: 'DECLINING',
    riskCategory: 'Low',
    topInstallation: 'Kumchai Field (Arunachal)'
  }
];
