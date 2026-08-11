export type Language = 'en' | 'te' | 'hi';

export type ActiveTab =
  | 'dashboard'
  | 'cropHealth'
  | 'weather'
  | 'soilHealth'
  | 'cropPlanner'
  | 'harvesting'
  | 'savedReports';

export interface WeatherData {
  locationName: string;
  temperatureC: number;
  temperatureF: number;
  humidity: number;
  condition: string;
  icon: string;
  rainProbability: number;
  windKmH: number;
  humidityRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
  forecastSummary: string;
}

export interface RecommendedAction {
  category: 'Immediate' | 'Watering' | 'Sanitation' | 'Prevention' | 'Nutrition';
  title: string;
  description: string;
}

export interface WeatherAdvisory {
  urgency: 'Act Within 12 Hours' | 'Act Today' | 'Monitor Daily' | 'Routine Maintenance';
  urgencyLevel: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  detail: string;
  actionTimeframe: string;
}

export interface CropAnalysisResult {
  cropType: string;
  conditionName: string;
  scientificName?: string;
  confidence: number; // e.g. 88
  severity: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Healthy';
  summary: string;
  symptoms: string[];
  recommendedActions: RecommendedAction[];
  weatherAdvisory: WeatherAdvisory;
  disclaimerNote: string;
  analyzedAt: string;
}

export interface SampleCrop {
  id: string;
  cropName: string;
  issueName: string;
  description: string;
  imageUrl: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe' | 'Healthy';
  presetAnalysis: CropAnalysisResult;
}

// Soil Health Module Types
export interface SoilData {
  ph?: number;
  nitrogen?: number; // mg/kg or kg/ha
  phosphorus?: number; // mg/kg or kg/ha
  potassium?: number; // mg/kg or kg/ha
  organicMatter?: number; // %
  salinityEc?: number; // dS/m
  soilType?: string; // Sandy, Loamy, Clay, Alluvial, Black Soil, Red Soil
}

export interface SoilAnalysisResult {
  phEvaluation: string; // e.g. Slightly Acidic (6.2)
  nutrientBalanceSummary: string;
  identifiedConcerns: string[];
  suggestedPractices: string[];
  simpleExplanation: string;
  disclaimerNote: string;
  analyzedAt: string;
}

// Crop & Yield Planner Module Types
export interface CropPlannerInput {
  cropName: string;
  landArea: number;
  areaUnit: 'acres' | 'hectares' | 'guntas';
  irrigationType: 'Drip' | 'Canal / Flood' | 'Sprinkler' | 'Rainfed';
  soilType: string;
  sowingSeason: 'Kharif (Monsoon)' | 'Rabi (Winter)' | 'Zaid (Summer)' | 'Year-round';
}

export interface CropPlannerResult {
  cropName: string;
  landArea: number;
  areaUnit: string;
  estimatedYieldMin: number;
  estimatedYieldMax: number;
  yieldUnit: string;
  estimateNotice: string;
  recommendedSpacing: string;
  waterSchedule: string;
  keyManagementPhases: {
    phaseName: string;
    dayRange: string;
    recommendedCare: string;
  }[];
  marketAdvice: string;
  analyzedAt: string;
}

// Harvesting Advisor Types
export interface HarvestingInput {
  cropName: string;
  growthStage: 'Early Maturing (30% ripe)' | 'Peak Readiness (80-90% ripe)' | 'Fully Ripe / Drying' | 'Overripe / Weather Exposed';
  weatherForecast: string;
  humidityLevel: number;
}

export interface HarvestingResult {
  cropName: string;
  growthStage: string;
  readinessScore: number; // 0 - 100
  harvestDecision: 'Harvest Immediately' | 'Harvest in 2-3 Days' | 'Wait 1 Week' | 'Postpone Due to Rain';
  urgencyLevel: 'critical' | 'warning' | 'info' | 'success';
  explanation: string;
  lossReductionTips: string[];
  postHarvestStorageAdvice: string;
  disclaimerNote: string;
  analyzedAt: string;
}

// Saved Scans & Reports
export interface SavedReport {
  id: string;
  title: string;
  type: 'crop' | 'soil' | 'yield' | 'harvest';
  date: string;
  summary: string;
  data: CropAnalysisResult | SoilAnalysisResult | CropPlannerResult | HarvestingResult;
}

