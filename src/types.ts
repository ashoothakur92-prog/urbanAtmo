export type PageType = 
  | 'home' 
  | 'report-issue' 
  | 'waste-segregation' 
  | 'sell-junk' 
  | 'scrap-dealers' 
  | 'rewards' 
  | 'aqi-guide' 
  | 'profile';

export type AQICategory = 
  | 'Good' 
  | 'Moderate' 
  | 'Unhealthy for Sensitive Groups' 
  | 'Unhealthy' 
  | 'Very Unhealthy' 
  | 'Hazardous';

export interface AQIData {
  aqi: number;
  category: AQICategory;
  city: string;
  state: string;
  temperature: number; // Celsius
  tempUnit: 'C' | 'F';
  weatherCondition: string;
  timeString: string;
  pm25: number;
  pm10: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  healthRecommendation: string;
  healthRecommendationHi?: string;
}

export type IssueCategory = 
  | 'garbage_dumping' 
  | 'open_burning' 
  | 'overflowing_bins' 
  | 'polluted_water' 
  | 'illegal_dumping' 
  | 'air_pollution';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type ReportStatus = 'Submitted' | 'In Review' | 'Resolved';

export interface EnvironmentalReport {
  id: string;
  category: IssueCategory;
  categoryLabel: string;
  description: string;
  location: string;
  urgency: UrgencyLevel;
  status: ReportStatus;
  createdAt: string;
  photoUrl?: string;
  statusNote?: string;
  pointsAwarded?: number;
}

export type WasteBinType = 'wet' | 'dry' | 'ewaste' | 'hazardous' | 'sanitary';

export interface WasteCategoryInfo {
  id: WasteBinType;
  name: string;
  nameHi: string;
  binColor: string;
  binColorName: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  iconName: string;
  description: string;
  examples: string[];
  doNotMix: string[];
  tips: string;
}

export interface WasteItemLookup {
  name: string;
  hindiName: string;
  category: WasteBinType;
  categoryName: string;
  instruction: string;
}

export interface ScrapMaterial {
  id: string;
  name: string;
  hindiName: string;
  ratePerKg: number; // in INR
  icon: string;
  unit: string;
  category: 'paper' | 'plastic' | 'metal' | 'glass' | 'ewaste' | 'cloth';
  popular?: boolean;
}

export interface ScrapBooking {
  id: string;
  items: { materialId: string; materialName: string; weightKg: number; estimatedPrice: number }[];
  totalEarnings: number;
  pointsEarned: number;
  serviceType: 'pickup' | 'dropoff';
  address: string;
  date: string;
  timeSlot: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ScrapDealer {
  id: string;
  name: string;
  distance: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  address: string;
  openStatus: string;
  isOpen: boolean;
  phone: string;
  materials: string[];
  timing: string;
  verified: boolean;
  latitude: number;
  longitude: number;
}

export interface Badge {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progressPercent: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  locality: string;
  points: number;
  isCurrentUser?: boolean;
  badgesCount: number;
}

export interface EcoReward {
  id: string;
  title: string;
  provider: string;
  pointsCost: number;
  category: 'coupon' | 'certificate' | 'nature' | 'event';
  description: string;
  code?: string;
  expiresIn?: string;
  claimed?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  sector: string;
  points: number;
  level: number;
  levelTitle: string;
  avatarUrl: string;
  reportsSubmitted: number;
  reportsResolved: number;
  wasteRecycledKg: number;
  co2SavedKg: number;
  totalEarningsInr: number;
  darkMode: boolean;
  highAqiAlerts: boolean;
  recyclingReminders: boolean;
  language: 'en' | 'hi';
}
