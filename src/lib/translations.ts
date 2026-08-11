import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  selectLanguage: string;
  contactAgronomist: string;
  listenAudio: string;
  stopAudio: string;
  printAdvisory: string;
  safetyVerified: string;

  // Tabs
  tabDashboard: string;
  tabCropHealth: string;
  tabWeather: string;
  tabSoilHealth: string;
  tabCropPlanner: string;
  tabHarvesting: string;
  tabSavedReports: string;

  // Dashboard
  dashboardTitle: string;
  dashboardSub: string;
  quickStatsTitle: string;
  savedScansCount: string;
  weatherRiskTitle: string;
  recentActivityTitle: string;
  noReportsYet: string;
  moduleCards: {
    cropHealthTitle: string;
    cropHealthDesc: string;
    weatherTitle: string;
    weatherDesc: string;
    soilTitle: string;
    soilDesc: string;
    plannerTitle: string;
    plannerDesc: string;
    harvestTitle: string;
    harvestDesc: string;
    reportsTitle: string;
    reportsDesc: string;
  };

  // Soil Module
  soilModuleTitle: string;
  soilModuleSub: string;
  soilTestInputTitle: string;
  phLabel: string;
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  organicMatterLabel: string;
  salinityLabel: string;
  soilTypeLabel: string;
  analyzeSoilBtn: string;
  presetSoilSample1: string;
  presetSoilSample2: string;
  soilDisclaimer: string;

  // Crop Planner Module
  plannerTitle: string;
  plannerSub: string;
  cropNameLabel: string;
  landAreaLabel: string;
  areaUnitLabel: string;
  irrigationLabel: string;
  sowingSeasonLabel: string;
  calculatePlannerBtn: string;
  estimateDisclaimer: string;
  yieldRangeTitle: string;

  // Harvesting Advisor Module
  harvestTitle: string;
  harvestSub: string;
  growthStageLabel: string;
  analyzeHarvestBtn: string;
  harvestDecisionTitle: string;
  lossReductionTipsTitle: string;
  storageTitle: string;

  // Disclaimers
  disclaimerHeader: string;
  expertConsultNote: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'AgroGuide',
    tagline: 'Real-time AI Crop Health, Soil & Weather Advisor',
    selectLanguage: 'Language / భాష / भाषा',
    contactAgronomist: 'Contact Agronomist',
    listenAudio: 'Listen Audio Guide',
    stopAudio: 'Stop Voice Reading',
    printAdvisory: 'Print Advisory',
    safetyVerified: 'Safety Verified',

    tabDashboard: 'Farmer Dashboard',
    tabCropHealth: 'Crop Health',
    tabWeather: 'Weather & When to Act',
    tabSoilHealth: 'Soil Health',
    tabCropPlanner: 'Crop & Yield Planner',
    tabHarvesting: 'Harvesting Advisor',
    tabSavedReports: 'Saved Reports',

    dashboardTitle: 'Welcome to AgroGuide Assistant',
    dashboardSub: 'Select an AI module below or view your latest field weather and saved crop reports.',
    quickStatsTitle: 'Farm Summary Overview',
    savedScansCount: 'Saved Crop Reports',
    weatherRiskTitle: 'Microclimate Fungal Risk',
    recentActivityTitle: 'Recent Crop & Field Activity',
    noReportsYet: 'No saved scans yet. Analyze a crop leaf or soil sample to save a report!',

    moduleCards: {
      cropHealthTitle: '1. Crop Health & Disease Analysis',
      cropHealthDesc: 'Upload a leaf photo to diagnose possible pests or fungal leaf spots with safe recommendations.',
      weatherTitle: '2. Weather & When to Act Advisor',
      weatherDesc: 'Check local microclimate temperature, rain chances, and weather-driven action timing.',
      soilTitle: '3. Soil Health Analysis',
      soilDesc: 'Enter pH and soil test values to understand nutrient balance and simple soil care practices.',
      plannerTitle: '4. Crop & Yield Planner',
      plannerDesc: 'Plan land area, crop spacing, watering schedules, and view estimated harvest yields.',
      harvestTitle: '5. Harvesting Advisor',
      harvestDesc: 'Determine peak harvest readiness, weather timing, and post-harvest crop loss prevention.',
      reportsTitle: '6. Saved Field Reports',
      reportsDesc: 'Review past crop scans, soil logs, and yield recommendations anytime offline.',
    },

    soilModuleTitle: '3. Soil Health Analysis',
    soilModuleSub: 'Enter soil test values to receive simple explanations and safe management practices.',
    soilTestInputTitle: 'Enter Available Soil Test Values',
    phLabel: 'Soil pH (e.g., 6.5)',
    nitrogenLabel: 'Nitrogen (N) Level',
    phosphorusLabel: 'Phosphorus (P) Level',
    potassiumLabel: 'Potassium (K) Level',
    organicMatterLabel: 'Organic Matter (%)',
    salinityLabel: 'Salinity / EC (dS/m)',
    soilTypeLabel: 'Soil Type',
    analyzeSoilBtn: 'Analyze Soil Health',
    presetSoilSample1: 'Preset Sample A: Alkaline Nitrogen Deficient Soil',
    presetSoilSample2: 'Preset Sample B: Healthy Paddy Soil',
    soilDisclaimer: 'Note: Missing soil values are evaluated based on general regional soil baselines. Never invent missing values.',

    plannerTitle: '4. Crop & Yield Planner',
    plannerSub: 'Calculate crop spacing, stage-by-stage field calendar, and estimated harvest yield ranges.',
    cropNameLabel: 'Select Crop',
    landAreaLabel: 'Land Area Size',
    areaUnitLabel: 'Area Unit',
    irrigationLabel: 'Irrigation System',
    sowingSeasonLabel: 'Sowing Season',
    calculatePlannerBtn: 'Generate Crop & Yield Plan',
    estimateDisclaimer: 'ESTIMATE ONLY: Actual harvest yields depend on rain, pest control, and local soil conditions.',
    yieldRangeTitle: 'Estimated Harvest Yield Range',

    harvestTitle: '5. Harvesting Advisor',
    harvestSub: 'Optimize harvest timing based on crop growth stage and local weather to prevent crop loss.',
    growthStageLabel: 'Current Crop Maturity / Stage',
    analyzeHarvestBtn: 'Get Harvest Timing Advisory',
    harvestDecisionTitle: 'Recommended Harvest Decision',
    lossReductionTipsTitle: 'Tips to Reduce Crop Loss',
    storageTitle: 'Post-Harvest Storage & Handling Advice',

    disclaimerHeader: 'Agricultural AI Disclaimer',
    expertConsultNote: 'AI diagnosis is a high-probability estimate and not 100% infallible. Please confirm serious problems with a qualified local agricultural officer.',
  },

  te: {
    appName: 'ఆగ్రోగైడ్ (AgroGuide)',
    tagline: 'రైతుల కోసం నిజసమయ పంట ఆరోగ్యం మరియు వాతావరణ సలహాదారు',
    selectLanguage: 'భాష ఎంచుకోండి',
    contactAgronomist: 'వ్యవసాయాధికారి సంప్రదింపు',
    listenAudio: 'ఆడియో చదవండి',
    stopAudio: 'ఆడియో ఆపండి',
    printAdvisory: 'నివేదిక ప్రింట్ చేయండి',
    safetyVerified: 'భద్రత ధృవీకరించబడింది',

    tabDashboard: 'రైతు డాష్‌బోర్డ్',
    tabCropHealth: 'పంట ఆరోగ్యం',
    tabWeather: 'వాతావరణం & సమయం',
    tabSoilHealth: 'నేల ఆరోగ్యం',
    tabCropPlanner: 'పంట & దిగుబడి ప్రణాళిక',
    tabHarvesting: 'కోత సమయ సలహా',
    tabSavedReports: 'భద్రపరచిన నివేదికలు',

    dashboardTitle: 'ఆగ్రోగైడ్ రైతు సహాయకునికి స్వాగతం',
    dashboardSub: 'కింద ఉన్న ఏఐ మోడ్యూల్‌ను ఎంచుకోండి లేదా మీ పొలం వాతావరణం, పంట నివేదికలను చూడండి.',
    quickStatsTitle: 'వ్యవసాయ వివరాల సారాంశం',
    savedScansCount: 'భద్రపరచిన నివేదికలు',
    weatherRiskTitle: 'వాతావరణ తెగులు ముప్పు',
    recentActivityTitle: 'ఇటీవలి పంట కార్యకలాపాలు',
    noReportsYet: 'ఇంకా ఎలాంటి నివేదికలు సేవ్ చేయబడలేదు. నివేదికను సేవ్ చేయడానికి ఆకు ఫోటోను విశ్లేషించండి!',

    moduleCards: {
      cropHealthTitle: '1. పంట ఆరోగ్యం & వ్యాధి విశ్లేషణ',
      cropHealthDesc: 'ఆకు ఫోటో అప్‌లోడ్ చేసి వ్యాధి లేదా తెగులును గుర్తించి సురక్షిత నివారణ చర్యలు పొందండి.',
      weatherTitle: '2. వాతావరణం & ఏ సమయంలో చర్య తీసుకోవాలి',
      weatherDesc: 'స్థానిక ఉష్ణోగ్రత, వర్ష సూచన మరియు తెగుళ్ళ వ్యాప్తి నియంత్రణ సమయాన్ని తెలుసుకోండి.',
      soilTitle: '3. నేల ఆరోగ్య విశ్లేషణ',
      soilDesc: 'పి.హెచ్ (pH), నత్రజని, భాస్వరం సారం నమోదు చేసి నేల యాజమాన్య సూచనలు చూడండి.',
      plannerTitle: '4. పంట & దిగుబడి ప్రణాళిక',
      plannerDesc: 'పొలం విస్తీర్ణం నమోదు చేసి నీటి యాజమాన్యం మరియు అంచనా దిగుబడి వివరాలు పొందండి.',
      harvestTitle: '5. కోత సమయ సలహాదారు',
      harvestDesc: 'పంట పక్వత మరియు వర్ష వాతావరణాన్ని బట్టి సరైన కోత సమయం తెలుసుకోండి.',
      reportsTitle: '6. భద్రపరచిన పొలం నివేదికలు',
      reportsDesc: 'మీరు గతంలో చేసిన విశ్లేషణలను ఎప్పుడైనా ఉచితంగా మళ్ళీ చూడండి.',
    },

    soilModuleTitle: '3. నేల ఆరోగ్య విశ్లేషణ (Soil Health)',
    soilModuleSub: 'మీ మట్టి పరీక్ష వివరాలను నమోదు చేసి సరళమైన వివరణలు మరియు సలహాలు పొందండి.',
    soilTestInputTitle: 'మట్టి పరీక్ష వివరాలు ఎంటర్ చేయండి',
    phLabel: 'నేల పి.హెచ్ (pH, ఉదా: 6.5)',
    nitrogenLabel: 'నత్రజని (Nitrogen - N)',
    phosphorusLabel: 'భాస్వరం (Phosphorus - P)',
    potassiumLabel: 'పొటాషియం (Potassium - K)',
    organicMatterLabel: 'సేంద్రీయ కర్బనం (%)',
    salinityLabel: 'లవణీయత / EC',
    soilTypeLabel: 'నేల రకం',
    analyzeSoilBtn: 'నేల ఆరోగ్యాన్ని విశ్లేషించండి',
    presetSoilSample1: 'ఉదాహరణ 1: నత్రజని లోపం ఉన్న నేల',
    presetSoilSample2: 'ఉదాహరణ 2: ఆరోగ్యకరమైన వరి పొలం నేల',
    soilDisclaimer: 'గమనిక: లభ్యం కాని నేల వివరాలు ప్రాంతీయ సగటుల ఆధారంగా విశ్లేషించబడతాయి.',

    plannerTitle: '4. పంట & దిగుబడి ప్రణాళిక',
    plannerSub: 'విత్తనాల మోతాదు, నీటి తడులు మరియు అంచనా దిగుబడి గణన.',
    cropNameLabel: 'పంటను ఎంచుకోండి',
    landAreaLabel: 'పొలం వైశాల్యం',
    areaUnitLabel: 'కొలత ప్రమాణం',
    irrigationLabel: 'నీటి పారుదల విధానం',
    sowingSeasonLabel: 'విత్తే కాలం',
    calculatePlannerBtn: 'దిగుబడి ప్రణాళికను సిద్ధం చేయండి',
    estimateDisclaimer: 'అంచనా మాత్రమే: నిజమైన దిగుబడి వర్షపాతం మరియు తెగుళ్ళ యాజమాన్యంపై ఆధారపడి ఉంటుంది.',
    yieldRangeTitle: 'అంచనా పంట దిగుబడి',

    harvestTitle: '5. కోత సమయ సలహాదారు',
    harvestSub: 'పంట నష్టాన్ని తగ్గించడానికి వాతావరణం మరియు పక్వత ఆధారంగా కోత సమయం నిర్ణయించండి.',
    growthStageLabel: 'ప్రస్తుత పంట దశ / పక్వత',
    analyzeHarvestBtn: 'కోత సమయ సలహా పొందండి',
    harvestDecisionTitle: 'సిఫార్సు చేసిన కోత నిర్ణయం',
    lossReductionTipsTitle: 'పంట నష్టం తగ్గించే చిట్కాలు',
    storageTitle: 'కోత అనంతర ధాన్యం నిల్వ జాగ్రత్తలు',

    disclaimerHeader: 'వ్యవసాయ ఏఐ నోటీస్',
    expertConsultNote: 'ఏఐ విశ్లేషణ 100% ఖచ్చితమైనది కాకపోవచ్చు. తీవ్రమైన సమస్యల విషయంలో స్థానిక వ్యవసాయాధికారిని సంప్రదించండి.',
  },

  hi: {
    appName: 'एग्रोगाइड (AgroGuide)',
    tagline: 'किसानों के लिए रीयल-टाइम फसल स्वास्थ्य, मृदा और मौसम सलाहकार',
    selectLanguage: 'भाषा चुनें',
    contactAgronomist: 'कृषि विशेषज्ञ से संपर्क करें',
    listenAudio: 'आवाज में सुनें',
    stopAudio: 'आवाज बंद करें',
    printAdvisory: 'रिपोर्ट प्रिंट करें',
    safetyVerified: 'सुरक्षा सत्यापित',

    tabDashboard: 'किसान डैशबोर्ड',
    tabCropHealth: 'फसल स्वास्थ्य',
    tabWeather: 'मौसम और समय',
    tabSoilHealth: 'मृदा स्वास्थ्य',
    tabCropPlanner: 'फसल एवं पैदावार योजना',
    tabHarvesting: 'कटाई सलाहकार',
    tabSavedReports: 'संरक्षित रिपोर्ट',

    dashboardTitle: 'एग्रोगाइड किसान सहायक में आपका स्वागत है',
    dashboardSub: 'नीचे एआई मॉड्यूल चुनें या अपने खेत का मौसम और सुरक्षित रिपोर्ट देखें।',
    quickStatsTitle: 'कृषि सारांश अवलोकन',
    savedScansCount: 'संरक्षित रिपोर्टें',
    weatherRiskTitle: 'मौसम के कारण फफूंद जोखिम',
    recentActivityTitle: 'हाल की फसल गतिविधियां',
    noReportsYet: 'अभी कोई रिपोर्ट सहेजी नहीं गई है। सहेजने के लिए पत्ती की फोटो का विश्लेषण करें!',

    moduleCards: {
      cropHealthTitle: '1. फसल स्वास्थ्य एवं रोग विश्लेषण',
      cropHealthDesc: 'पत्ती की तस्वीर अपलोड करें और संभावित कीट/रोग की पहचान कर सुरक्षित उपाय पाएं।',
      weatherTitle: '2. मौसम और कार्रवाई का सही समय',
      weatherDesc: 'स्थानीय तापमान, बारिश की संभावना और छिड़काव/कटाई का सही समय जानें।',
      soilTitle: '3. मृदा स्वास्थ्य विश्लेषण',
      soilDesc: 'मिट्टी की जांच (pH, नाइट्रोजन, फास्फोरस) का विवरण दर्ज कर साधारण भाषा में सलाह पाएं।',
      plannerTitle: '4. फसल एवं पैदावार योजनाकार',
      plannerDesc: 'खेत का क्षेत्रफल दर्ज कर सिंचाई शेड्यूल और अनुमानित उपज की जानकारी प्राप्त करें।',
      harvestTitle: '5. फसल कटाई सलाहकार',
      harvestDesc: 'फसल की परिपक्वता और मौसम को ध्यान में रखकर कटाई का सही समय चुनें।',
      reportsTitle: '6. सहेजी गई रिपोर्टें',
      reportsDesc: 'अपनी पुरानी जांच और सलाह को किसी भी समय ऑफ़लाइन देखें।',
    },

    soilModuleTitle: '3. मृदा स्वास्थ्य विश्लेषण (Soil Health)',
    soilModuleSub: 'मिट्टी परीक्षण के मान दर्ज करें और आसान भाषा में देखभाल के तरीके जानें।',
    soilTestInputTitle: 'उपलब्ध मिट्टी परीक्षण मान दर्ज करें',
    phLabel: 'मिट्टी का pH (उदा: 6.5)',
    nitrogenLabel: 'नाइट्रोजन (N) का स्तर',
    phosphorusLabel: 'फास्फोरस (P) का स्तर',
    potassiumLabel: 'पोटेशियम (K) का स्तर',
    organicMatterLabel: 'जैविक कार्बन (%)',
    salinityLabel: 'लवणता / EC',
    soilTypeLabel: 'मिट्टी का प्रकार',
    analyzeSoilBtn: 'मृदा स्वास्थ्य का विश्लेषण करें',
    presetSoilSample1: 'नमूना 1: नाइट्रोजन की कमी वाली क्षारीय मिट्टी',
    presetSoilSample2: 'नमूना 2: स्वस्थ धान के खेत की मिट्टी',
    soilDisclaimer: 'ध्यान दें: अनुपलब्ध मानों का आंकलन सामान्य क्षेत्रीय आधार पर किया जाता है।',

    plannerTitle: '4. फसल एवं पैदावार योजनाकार',
    plannerSub: 'फसल की दूरी, सिंचाई चक्र और अनुमानित पैदावार की गणना करें।',
    cropNameLabel: 'फसल चुनें',
    landAreaLabel: 'खेत का क्षेत्रफल',
    areaUnitLabel: 'क्षेत्रफल इकाई',
    irrigationLabel: 'सिंचाई का साधन',
    sowingSeasonLabel: 'बुआई का मौसम',
    calculatePlannerBtn: 'पैदावार योजना बनाएं',
    estimateDisclaimer: 'केवल अनुमान: वास्तविक पैदावार बारिश, कीट नियंत्रण और मिट्टी की स्थिति पर निर्भर करती है।',
    yieldRangeTitle: 'अनुमानित फसल पैदावार',

    harvestTitle: '5. फसल कटाई सलाहकार',
    harvestSub: 'फसल के नुकसान को रोकने के लिए मौसम और फसल परिपक्वता के अनुसार कटाई करें।',
    growthStageLabel: 'फसल की वर्तमान स्थिति/परिपक्वता',
    analyzeHarvestBtn: 'कटाई का सही समय जानें',
    harvestDecisionTitle: 'अनुशंसित कटाई निर्णय',
    lossReductionTipsTitle: 'फसल का नुकसान कम करने के उपाय',
    storageTitle: 'कटाई के बाद भंडारण और सुरक्षा सलाह',

    disclaimerHeader: 'कृषि एआई अस्वीकरण',
    expertConsultNote: 'एआई निदान 100% सटीक नहीं हो सकता। गंभीर समस्या होने पर स्थानीय कृषि अधिकारी से परामर्श करें।',
  },
};
