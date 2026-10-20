export type CenterStatus = 'open' | 'lunch_break' | 'closed' | 'weekend';

export interface ServiceItem {
  id: string;
  name: string;
  nameTl: string;
  category: 'general' | 'maternal' | 'immunization' | 'dental' | 'senior' | 'tbdots' | 'family_planning';
  description: string;
  descriptionTl: string;
  iconName: string;
  availabilityDays: string;
  requirements: string[];
}

export interface HealthCenter {
  id: string;
  name: string;
  shortName: string;
  barangay: string;
  catchmentAreas: string[];
  address: string;
  landmark: string;
  contactNumber: string;
  emergencyNumber: string;
  email: string;
  headPhysician: string;
  operatingHours: {
    weekdays: string;
    lunchBreak: string;
    saturday: string;
    sunday: string;
  };
  services: ServiceItem[];
  urls: {
    websiteUrl: string;
    schedulingUrl: string;
    infoUrl: string;
  };
  specialAdvisory?: string;
}

export interface OperationalStatusResult {
  status: CenterStatus;
  statusText: string;
  statusTextTl: string;
  subText: string;
  badgeColor: string;
  dotColor: string;
  isOpen: boolean;
  nextChangeText: string;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reduceMotion: boolean;
  language: 'en' | 'tl';
}

export type StatusSimulationMode = 'realtime' | 'force_open' | 'force_lunch' | 'force_closed';
