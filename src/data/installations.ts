export interface InstallationInfo {
  id: string;
  name: string;
  state: string;
  region: string;
  type: 'Production Field' | 'Drilling & Workover' | 'Gas Processing Plant' | 'Pipeline Network';
  riskScore: number;
  sifPotentialCount: number;
  topPrecursor: string;
  barrierHealth: 'Healthy' | 'Warning' | 'Degrading' | 'Critical';
  openActions: number;
  reportCount: number;
  trend: 'improving' | 'stable' | 'worsening';
  coordinates: { x: number; y: number }; // Relative coordinates on schematic map
  description: string;
}

export const SYNTHETIC_INSTALLATIONS: InstallationInfo[] = [
  {
    id: 'INS-01',
    name: 'Duliajan Central Field',
    state: 'Assam',
    region: 'Upper Assam Basin',
    type: 'Production Field',
    riskScore: 84,
    sifPotentialCount: 14,
    topPrecursor: 'Energy Isolation Failure',
    barrierHealth: 'Degrading',
    openActions: 8,
    reportCount: 38,
    trend: 'worsening',
    coordinates: { x: 74, y: 32 },
    description: 'Core operational hub of OIL in Assam; high concentration of workover and crude gathering stations.'
  },
  {
    id: 'INS-02',
    name: 'Moran Oil Field',
    state: 'Assam',
    region: 'Brahmaputra Valley',
    type: 'Production Field',
    riskScore: 68,
    sifPotentialCount: 9,
    topPrecursor: 'Uncontained Hydrocarbon Leakage',
    barrierHealth: 'Warning',
    openActions: 5,
    reportCount: 26,
    trend: 'stable',
    coordinates: { x: 68, y: 36 },
    description: 'Mature crude oil field with aging pipeline infrastructure and secondary recovery injection pumps.'
  },
  {
    id: 'INS-03',
    name: 'Digboi Refinery Area & Fields',
    state: 'Assam',
    region: 'Upper Assam Basin',
    type: 'Production Field',
    riskScore: 72,
    sifPotentialCount: 11,
    topPrecursor: 'Hot Work Ignition Precursor',
    barrierHealth: 'Warning',
    openActions: 6,
    reportCount: 22,
    trend: 'improving',
    coordinates: { x: 78, y: 28 },
    description: 'Historic operational sector with heavy brownfield turnaround and pipeline manifold crossings.'
  },
  {
    id: 'INS-04',
    name: 'Jorhat Exploration Rig 4',
    state: 'Assam',
    region: 'South Bank Basin',
    type: 'Drilling & Workover',
    riskScore: 79,
    sifPotentialCount: 12,
    topPrecursor: 'Failed Fall Protection',
    barrierHealth: 'Degrading',
    openActions: 7,
    reportCount: 19,
    trend: 'worsening',
    coordinates: { x: 64, y: 40 },
    description: 'Deep exploration drilling rig operating high-pressure mud systems and mast work at height.'
  },
  {
    id: 'INS-05',
    name: 'Bagjan Wellsite Operations',
    state: 'Assam',
    region: 'Tinsukia District',
    type: 'Production Field',
    riskScore: 88,
    sifPotentialCount: 16,
    topPrecursor: 'Energy Isolation Failure',
    barrierHealth: 'Critical',
    openActions: 9,
    reportCount: 31,
    trend: 'worsening',
    coordinates: { x: 76, y: 25 },
    description: 'High-pressure gas reservoir wellsites requiring stringent well integrity and double block-and-bleed barriers.'
  },
  {
    id: 'INS-06',
    name: 'Rajasthan Block-RJ (Jaisalmer)',
    state: 'Rajasthan',
    region: 'Western Desert',
    type: 'Gas Processing Plant',
    riskScore: 61,
    sifPotentialCount: 6,
    topPrecursor: 'Uncontained Hydrocarbon Leakage',
    barrierHealth: 'Healthy',
    openActions: 3,
    reportCount: 18,
    trend: 'improving',
    coordinates: { x: 22, y: 42 },
    description: 'Natural gas production and compression plants in arid desert conditions; sour gas treating units.'
  },
  {
    id: 'INS-07',
    name: 'Dandewala Gas Plant',
    state: 'Rajasthan',
    region: 'Western Desert',
    type: 'Gas Processing Plant',
    riskScore: 58,
    sifPotentialCount: 5,
    topPrecursor: 'Toxic Atmosphere Exposure',
    barrierHealth: 'Healthy',
    openActions: 2,
    reportCount: 14,
    trend: 'stable',
    coordinates: { x: 25, y: 46 },
    description: 'High throughput natural gas processing unit supplying NTPC power generation.'
  },
  {
    id: 'INS-08',
    name: 'Kumchai Field (Arunachal)',
    state: 'Arunachal Pradesh',
    region: 'Northeast Foothills',
    type: 'Drilling & Workover',
    riskScore: 74,
    sifPotentialCount: 8,
    topPrecursor: 'Suspended Load Rigging Failure',
    barrierHealth: 'Warning',
    openActions: 4,
    reportCount: 15,
    trend: 'stable',
    coordinates: { x: 82, y: 22 },
    description: 'Rugged foothill terrain operations with heavy logistical mechanical lifting challenges.'
  }
];
