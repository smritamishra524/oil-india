import { IOPGLLifeSavingRule } from '../types';

export interface KnowledgeCard {
  rule: IOPGLLifeSavingRule;
  tagline: string;
  hazard: string;
  criticalControls: string[];
  primaryBarrier: string;
  commonPrecursors: string[];
  recommendedIntervention: string;
  oilStandardRef: string;
  iconName: string;
}

export const IOGP_KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    rule: 'Energy Isolation',
    tagline: 'Verify isolation and zero energy before work begins.',
    hazard: 'Pressurized hydrocarbons, residual hydraulic fluid, high-voltage electricity, or stored mechanical springs.',
    criticalControls: [
      'Positive physical isolation (spades, blinds, double block & bleed, racked-out breakers).',
      'Lockout/Tagout (LOTO) personal padlocks and tags applied on all isolation boundaries.',
      'Documented zero-energy bleedoff and verification using calibrated test gauge or test for dead.',
      'Independent four-eyes physical audit by authorized isolation coordinator.'
    ],
    primaryBarrier: 'Energy Isolation (LOTO)',
    commonPrecursors: [
      'Valves passing internally after closure.',
      'Lock placed on wrong valve or tag omitted.',
      'Bleed valve opened without verifying zero gauge pressure.',
      'Assumption that line is empty without physical drain confirmation.'
    ],
    recommendedIntervention: 'Halt work immediately upon detecting pressure indicator needle deflection; re-isolate upstream and purge under supervisor sign-off.',
    oilStandardRef: 'OIL-SOP-HSE-ISO-004 (Rev 3): Mandatory LOTO & Bleed Verification Protocol',
    iconName: 'Lock'
  },
  {
    rule: 'Work at Height',
    tagline: 'Protect yourself against falling when working at height.',
    hazard: 'Working above 1.8 meters, open grating edges, derrick monkey boards, tank roofs, and scaffold platforms.',
    criticalControls: [
      'Full body harness with dual shock-absorbing lanyards ensuring 100% tie-off.',
      'Engineered and load-tested anchorage points rated to at least 22.2 kN (5,000 lbs).',
      'Certified scaffold with green inspection tag, toe boards, and double guardrails.',
      'Self-retracting lifeline (inertia reel) for ladder climbing and monkey board transfer.'
    ],
    primaryBarrier: 'Fall Protection System',
    commonPrecursors: [
      'Unhooking lanyard while moving between structural beams.',
      'Tying off to uncertified scaffolding tubes or conduit lines.',
      'Scaffold planks unlashed or loose floor gratings around drilling cellar.',
      'Defective harness with frayed stitching or missing carabiner keepers.'
    ],
    recommendedIntervention: 'Execute stop-work order; install temporary horizontal wire rope lifeline; replace uncertified anchorages before continuing.',
    oilStandardRef: 'OIL-SOP-HSE-WAH-012: Working at Height & Fall Prevention in Drilling/Workover',
    iconName: 'ShieldAlert'
  },
  {
    rule: 'Confined Space',
    tagline: 'Obtain authorization before entering a confined space.',
    hazard: 'Toxic gas (H2S, CO), flammable hydrocarbon vapors, oxygen deficiency (<19.5%), engulfment by liquids or sludge.',
    criticalControls: [
      'Mechanical positive disconnection (blinding) of all piping inlets.',
      'Continuous multi-gas atmospheric testing (LEL, O2, H2S, CO) at all vertical strata.',
      'Continuous mechanical forced-air ventilation (explosion-proof eductors).',
      'Dedicated standby sentry positioned at manhole entrance with emergency rescue harness.'
    ],
    primaryBarrier: 'Ventilation & Air Monitoring',
    commonPrecursors: [
      'Entering tank to take quick gas sample before full ventilation cycle.',
      'Standby person leaving entry hatch unattended.',
      'Piping isolated by closed valves without positive blind insertion.',
      'Sludge agitation releasing sudden trapped pocket of H2S.'
    ],
    recommendedIntervention: 'Immediate crew evacuation upon gas detector chirp; purge vessel with 5 air volume turnovers before re-testing.',
    oilStandardRef: 'OIL-SOP-HSE-CSE-007: Confined Space Entry & Vessel Turnaround Standard',
    iconName: 'Box'
  },
  {
    rule: 'Hot Work',
    tagline: 'Control flammables and ignition sources in hazardous areas.',
    hazard: 'Open flames, electric welding arcs, grinding sparks in hydrocarbon processing plants, wellheads, or battery zones.',
    criticalControls: [
      'Continuous combustible gas testing (0% LEL) within 15-meter radius.',
      'Fire blanket habitat enclosure and pressurization when hot work occurs in Zone 1/Zone 2.',
      'Dedicated trained fire watch observer equipped with dual pressurized fire extinguishers.',
      'Covering all sewer drains, vents, and oil pits within 15 meters.'
    ],
    primaryBarrier: 'Hot Work Isolation & Fire Watch',
    commonPrecursors: [
      'Welding sparks flying past frayed fire blankets toward open sample points.',
      'Fire watch individual multitasking or leaving hot work station.',
      'Intermittent gas puffs from distant relief valve discharge.',
      'Grinding without pre-job LEL perimeter survey.'
    ],
    recommendedIntervention: 'Extinguish torch instantly; shut off oxygen/acetylene manifolds; re-evaluate hazardous zone classification.',
    oilStandardRef: 'OIL-SOP-HSE-HWP-002: Hot Work Permitting & Flash Fire Safeguards',
    iconName: 'Flame'
  },
  {
    rule: 'Line of Fire',
    tagline: 'Keep yourself and others out of the line of fire.',
    hazard: 'Pressurized release trajectories, winch cable recoil, suspended loads, high-torque tongs, and vehicle movements.',
    criticalControls: [
      'Engineered physical barriers and standoff exclusion zones around tensioned lines.',
      'Whipcheck safety cables installed on all high-pressure flexible hoses.',
      'Positioning personnel strictly outside rotating machinery arc and pipe swing radius.',
      'Clear designated walkways and high-visibility PPE in active rig yards.'
    ],
    primaryBarrier: 'Exclusion Zone & Barricading',
    commonPrecursors: [
      'Standing directly in front of pump discharge valve during startup.',
      'Worker resting hand on tensioned wireline guide pulley.',
      'Unbarricaded test area during hydrostatic line proof-testing.',
      'Walking beneath rig floor during pipe tripping.'
    ],
    recommendedIntervention: 'Demarcate red exclusion zone with rigid interlocking barriers; install remote pressure actuators to remove workers from line of fire.',
    oilStandardRef: 'OIL-SOP-HSE-LOF-009: Line-of-Fire Mitigation & Standoff Protocols',
    iconName: 'Target'
  },
  {
    rule: 'Safe Mechanical Lifting',
    tagline: 'Plan lifting operations and control the lift area.',
    hazard: 'Dropped pipe bundles, crane tipping, snapped slings, rigging failure over equipment or personnel.',
    criticalControls: [
      'Approved critical lift plan reviewed and signed for all lifts > 75% crane capacity.',
      'Inspected and color-coded lifting slings, shackles, and spreader beams within proof-test validity.',
      'Tag lines used to guide loads without placing hands directly on suspended material.',
      'Strict barricade preventing any person from walking or standing under suspended load.'
    ],
    primaryBarrier: 'Certified Lifting Rigging & Plan',
    commonPrecursors: [
      'Guiding suspended tubular load with bare hands instead of tag lines.',
      'Using uncertified shop-made lifting eye without WLL stamp.',
      'Rigger standing directly between suspended load and stationary container (pinch hazard).',
      'Wind gusts exceeding crane manufacturer operating envelope.'
    ],
    recommendedIntervention: 'Lower load to ground; verify sling angle capacity using chart; install 360-degree perimeter tape.',
    oilStandardRef: 'OIL-SOP-HSE-LIFT-005: Heavy Crane & Rigging Operations Standard',
    iconName: 'Anchor'
  },
  {
    rule: 'Bypassing Safety Controls',
    tagline: 'Obtain authorization before overriding or disabling safety controls.',
    hazard: 'Defeating safety interlocks, bridging ESD pushbuttons, bypassing fire & gas alarms, defeating relief valves.',
    criticalControls: [
      'Formal Management of Change (MOC) and Safety Critical Element (SCE) bypass authorization.',
      'Time-limited bypass log recorded in Central Control Room with active shift handover note.',
      'Compensating temporary safeguards (e.g. 24/7 dedicated manual operator watch at bypass station).',
      'Automated reminder alarm and visual annunciator flashing on SCADA screen.'
    ],
    primaryBarrier: 'Emergency Shutdown (ESD)',
    commonPrecursors: [
      'Placing jumper wire across transmitter to suppress nuisance trip without root-cause fix.',
      'Inlet emergency shutdown valve (SDV) pinned open with wooden wedge.',
      'High-level alarm disabled in crude settling tank during heavy inflow.',
      'Unrecorded bypass left active across shift relief.'
    ],
    recommendedIntervention: 'Reinstate safety interlock immediately; initiate Incident Investigation and execute emergency MOC review.',
    oilStandardRef: 'OIL-SOP-HSE-BYP-011: Management of Safety Critical Element (SCE) Overrides',
    iconName: 'AlertTriangle'
  },
  {
    rule: 'Driving',
    tagline: 'Follow safe driving rules for all company transport and road tanker movements.',
    hazard: 'Vehicle rollover, collision with pipeline manifolds, fatigue in oilfield transport, crude tanker spills.',
    criticalControls: [
      'Mandatory three-point seatbelt compliance for driver and all passengers.',
      'In-Vehicle Monitoring System (IVMS) tracking speed, harsh braking, and route compliance.',
      'Journey Management Plan (JMP) authorized for nighttime and remote desert/jungle transit.',
      'Zero mobile phone or communication device distraction while operating vehicle.'
    ],
    primaryBarrier: 'Exclusion Zone & Barricading',
    commonPrecursors: [
      'Speeding on unpaved gravel access roads near active wellheads.',
      'Driver fatigue during extended 12-hour oil dispatch shifts.',
      'Overloading light transport vehicle with drilling drill-bits.',
      'Reversing heavy truck without trained banksman guide.'
    ],
    recommendedIntervention: 'Mandatory rest halt; review IVMS telemetry exception log; issue warning notice to transport contractor.',
    oilStandardRef: 'OIL-SOP-HSE-DRV-003: Land Transport & Journey Management Policy',
    iconName: 'Truck'
  },
  {
    rule: 'Work Authorisation',
    tagline: 'Work with a valid permit when required.',
    hazard: 'Unauthorized simultaneous operations (SIMOPS), conflicting activities, uncommunicated process state changes.',
    criticalControls: [
      'Integrated permit-to-work (PTW) cross-referenced against active SIMOPS matrix.',
      'Mandatory on-site joint site inspection by Permit Issuer and Permit Receiver prior to work start.',
      'Pre-job Toolbox Talk (TBT) communicating task hazards, barriers, and emergency abort signals.',
      'Permit suspended and hand-back logged whenever field conditions or personnel change.'
    ],
    primaryBarrier: 'Permit to Work (PTW) & JSA',
    commonPrecursors: [
      'Signing cold work permit in control room without visiting remote wellsite.',
      'Starting hot welding adjacent to active hydro-testing without cross-referencing permits.',
      'Permit receiver leaving site and handing task to subcontractor without re-briefing.',
      'Working past permit expiry time without formal shift extension.'
    ],
    recommendedIntervention: 'Cease all work immediately; collect permits; convene emergency on-site joint assessment with Asset In-Charge.',
    oilStandardRef: 'OIL-SOP-HSE-PTW-001: Integrated Electronic Permit to Work (e-PTW) System',
    iconName: 'FileCheck'
  }
];
