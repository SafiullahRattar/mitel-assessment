export type PlanType = 'basic' | 'lite' | 'premium' | 'ultimate';

export type PlanStatus = 'active' | 'inactive';

export interface Features {
  conferenceCalling: boolean;
  callWaiting: boolean;
  voicemail: boolean;
}

export interface RawUser {
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

export interface User extends RawUser {
  warnings: string[];
}

export const PLAN_DESCRIPTIONS: Record<PlanType, string> = {
  basic: 'The Basics Package',
  lite: 'The Lite Package',
  premium: 'The Premium Package',
  ultimate: 'The Ultimate Package',

}

export const FEATURE_LABELS_TO_SHOW: Record<keyof Features, string> = {
  conferenceCalling: 'Conference Calling',
  callWaiting: 'Call Waiting',
  voicemail: 'Voicemail',
};

export const FEATURE_KEYS = Object.keys(FEATURE_LABELS_TO_SHOW) as (keyof Features)[];

