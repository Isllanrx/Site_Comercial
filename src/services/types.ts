export interface Vehicle {
  id: number;
  image: string;
  caption: string;
  badge: string;
  instagramUrl: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export interface BankRate {
  excellent: number;
  good: number;
  regular: number;
  basic: number;
}

export interface BankConfig {
  name: string;
  carRates: BankRate;
  motorcycleRates: BankRate;
  iof: number;
  adminFee: number;
  carInsurance: number;
  motorcycleInsurance: number;
  riskSpread: BankRate;
  fixedFees: BankRate;
  registrationFee: number;
}

export type BankConfigs = Record<string, BankConfig>;
