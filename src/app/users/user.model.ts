export type PlanType = 'basic' | 'lite' | 'premium' | 'ultimate';

export type PlanStatus = 'active' | 'inactive';

export interface Features {
  conferenceCalling: boolean;
  callWaiting: boolean;
  voicemail: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  plan: {
    type: PlanType;
    status: PlanStatus;
    description: string;
    features: Features;
  };
}

export const FEATURE_LABELS_TO_SHOW: Record<keyof Features, string> = {
  conferenceCalling: 'Conference Calling',
  callWaiting: 'Call Waiting',
  voicemail: 'Voicemail',
};

export const FEATURE_KEYS = Object.keys(FEATURE_LABELS_TO_SHOW) as (keyof Features)[];

