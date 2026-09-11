export type TranslationKey = 
  | 'orgName'
  | 'tagline'
  | 'prototypeBanner'
  | 'aiDecisionSupport'
  | 'commandCenter'
  | 'aiAnalysis'
  | 'reportAnalyzer'
  | 'sifDna'
  | 'historicalSimilarity'
  | 'missingEvidence'
  | 'contradictions'
  | 'precursorIntelligence'
  | 'weakSignalFusion'
  | 'barrierDegradation'
  | 'precursorVelocity'
  | 'sifPathway'
  | 'simulation'
  | 'counterfactualSif'
  | 'recommendedIntervention'
  | 'riskAndAssets'
  | 'earlyWarning'
  | 'installationRiskMap'
  | 'assetIntelligence'
  | 'actionCenter'
  | 'correctiveActions'
  | 'rca'
  | 'intelligence'
  | 'oilSafetyAi'
  | 'knowledgeBase'
  | 'frontline'
  | 'reportHazard'
  | 'voiceReporting'
  | 'settings'
  | 'language'
  | 'addReport'
  | 'judgeDemoMode'
  | 'searchPlaceholder'
  | 'totalReports'
  | 'sifPotential'
  | 'activeCriticalPrecursors'
  | 'highRiskInstallations'
  | 'degradingBarriers'
  | 'openCorrectiveActions'
  | 'safetyDebt'
  | 'proposedMetric'
  | 'accept'
  | 'edit'
  | 'reject'
  | 'status'
  | 'exportAnalysis'
  | 'uploadReportFile'
  | 'pasteReportText'
  | 'analyzeButton'
  | 'evidenceQuotes'
  | 'resetDemoData';

export const TRANSLATIONS: Record<'en' | 'hi', Record<TranslationKey, string>> = {
  en: {
    orgName: 'OIL INDIA LIMITED',
    tagline: 'Detect the weak signals before they become serious events.',
    prototypeBanner: 'PROTOTYPE • SYNTHETIC SAFETY DATA',
    aiDecisionSupport: 'AI outputs are decision-support signals and require qualified HSE validation.',
    commandCenter: 'Command Center',
    aiAnalysis: 'AI Analysis',
    reportAnalyzer: 'Report Analyzer',
    sifDna: 'SIF Precursor DNA',
    historicalSimilarity: 'Historical Similarity',
    missingEvidence: 'Missing Evidence',
    contradictions: 'Contradiction Detection',
    precursorIntelligence: 'Precursor Intelligence',
    weakSignalFusion: 'Weak Signal Fusion',
    barrierDegradation: 'Barrier Degradation',
    precursorVelocity: 'Precursor Velocity',
    sifPathway: 'SIF Pathway',
    simulation: 'Simulation',
    counterfactualSif: 'Counterfactual SIF Simulator',
    recommendedIntervention: 'Recommended Intervention',
    riskAndAssets: 'Risk & Assets',
    earlyWarning: 'Early Warning Center',
    installationRiskMap: 'Installation Risk Map',
    assetIntelligence: 'Asset Intelligence',
    actionCenter: 'Action Center',
    correctiveActions: 'Corrective Actions',
    rca: 'RCA (5-Why & Fishbone)',
    intelligence: 'Intelligence',
    oilSafetyAi: 'OIL Safety AI',
    knowledgeBase: 'HSE Knowledge Base',
    frontline: 'Frontline',
    reportHazard: 'Report Hazard',
    voiceReporting: 'Voice Reporting',
    settings: 'Settings',
    language: 'Language / भाषा',
    addReport: '+ ADD REPORT',
    judgeDemoMode: '🎯 JUDGE DEMO MODE',
    searchPlaceholder: 'Search reports, precursors, assets, installations, actions...',
    totalReports: 'Total Safety Reports',
    sifPotential: 'SIF-Potential Reports',
    activeCriticalPrecursors: 'Active Critical Precursors',
    highRiskInstallations: 'High-Risk Installations',
    degradingBarriers: 'Degrading Barriers',
    openCorrectiveActions: 'Open Corrective Actions',
    safetyDebt: 'Safety Debt',
    proposedMetric: 'Proposed Intelligence Metric',
    accept: 'Accept AI Assessment',
    edit: 'Edit Classification',
    reject: 'Reject & Flag AI Output',
    status: 'Status',
    exportAnalysis: 'Export Analysis Report',
    uploadReportFile: 'Upload Report File (PDF, DOCX, TXT, CSV)',
    pasteReportText: 'Paste Report Text',
    analyzeButton: 'ANALYZE WITH OIL HSE INTELLIGENCE',
    evidenceQuotes: 'Extracted Direct Evidence Quotes',
    resetDemoData: 'Reset Demo Data to Default'
  },
  hi: {
    orgName: 'ऑयल इंडिया लिमिटेड (OIL)',
    tagline: 'गंभीर घटनाओं में बदलने से पहले कमजोर संकेतों का पता लगाएं।',
    prototypeBanner: 'प्रोटोटाइप • कृत्रिम सुरक्षा डेटा (SYNTHETIC DATA)',
    aiDecisionSupport: 'एआई आउटपुट निर्णय-समर्थन संकेत हैं और योग्य एचएसई सत्यापन की आवश्यकता होती है।',
    commandCenter: 'कमांड सेंटर',
    aiAnalysis: 'एआई विश्लेषण',
    reportAnalyzer: 'रिपोर्ट विश्लेषक',
    sifDna: 'एसआईएफ प्रीकर्सर डीएनए',
    historicalSimilarity: 'ऐतिहासिक समानता',
    missingEvidence: 'अनुपस्थित साक्ष्य जांच',
    contradictions: 'विरोधाभास पहचान',
    precursorIntelligence: 'प्रीकर्सर इंटेलिजेंस',
    weakSignalFusion: 'वीक सिग्नल संलयन',
    barrierDegradation: 'बैरियर क्षरण विश्लेषण',
    precursorVelocity: 'प्रीकर्सर वेग',
    sifPathway: 'एसआईएफ पाथवे',
    simulation: 'सिमुलेशन',
    counterfactualSif: 'काउंटरफैक्चुअल एसआईएफ सिम्युलेटर',
    recommendedIntervention: 'अनुशंसित हस्तक्षेप',
    riskAndAssets: 'जोखिम एवं संपत्तियां',
    earlyWarning: 'प्रारंभिक चेतावनी केंद्र',
    installationRiskMap: 'प्रतिष्ठान जोखिम मानचित्र',
    assetIntelligence: 'उपकरण बुद्धिमत्ता',
    actionCenter: 'कार्रवाई केंद्र',
    correctiveActions: 'सुधारात्मक कार्रवाइयां',
    rca: 'मूल कारण विश्लेषण (5-Why व फिशबोन)',
    intelligence: 'बुद्धिमत्ता',
    oilSafetyAi: 'ऑयल सुरक्षा एआई',
    knowledgeBase: 'एचएसई ज्ञानकोष',
    frontline: 'फ्रंटलाइन',
    reportHazard: 'खतरे की रिपोर्ट करें',
    voiceReporting: 'ध्वनि रिपोर्टिंग',
    settings: 'सेटिंग्स',
    language: 'भाषा / Language',
    addReport: '+ नई रिपोर्ट जोड़ें',
    judgeDemoMode: '🎯 जज डेमो मोड',
    searchPlaceholder: 'रिपोर्ट, प्रीकर्सर, उपकरण, प्रतिष्ठान खोजें...',
    totalReports: 'कुल सुरक्षा रिपोर्टें',
    sifPotential: 'एसआईएफ क्षमता वाली रिपोर्टें',
    activeCriticalPrecursors: 'सक्रिय महत्वपूर्ण प्रीकर्सर',
    highRiskInstallations: 'उच्च जोखिम वाले प्रतिष्ठान',
    degradingBarriers: 'क्षरणशील सुरक्षा बैरियर',
    openCorrectiveActions: 'लंबित सुधारात्मक कार्रवाइयां',
    safetyDebt: 'सुरक्षा ऋण (Safety Debt)',
    proposedMetric: 'प्रस्तावित इंटेलिजेंस मेट्रिक',
    accept: 'एआई मूल्यांकन स्वीकार करें',
    edit: 'वर्गीकरण संपादित करें',
    reject: 'अस्वीकार करें व रिपोर्ट करें',
    status: 'स्थिति',
    exportAnalysis: 'विश्लेषण रिपोर्ट डाउनलोड करें',
    uploadReportFile: 'फ़ाइल अपलोड करें (PDF, DOCX, TXT, CSV)',
    pasteReportText: 'रिपोर्ट पाठ चिपकाएँ (Paste)',
    analyzeButton: 'ऑयल एचएसई एआई से विश्लेषण करें',
    evidenceQuotes: 'निष्कर्षित प्रत्यक्ष साक्ष्य उद्धरण',
    resetDemoData: 'डेमो डेटा रीसेट करें'
  }
};
