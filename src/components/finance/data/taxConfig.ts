// src/components/finance/data/taxConfig.ts
// UK Tax Configuration for Self-Employed Creators

import { TaxYearConfig } from '../types/finance';

export const TAX_YEARS: Record<string, TaxYearConfig> = {
  '2024-25': {
    year: '2024-25',
    personalAllowance: 12570,
    personalAllowanceLimit: 100000,
    basicRateThreshold: 50270,
    higherRateThreshold: 125140,
    additionalRateThreshold: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    class2NIWeekly: 3.45,
    class2NIThreshold: 12570,
    class4NILowerThreshold: 12570,
    class4NIUpperThreshold: 50270,
    class4NIRate: 0.09,
    class4NIUpperRate: 0.02,
    studentLoanPlan1Threshold: 22015,
    studentLoanPlan2Threshold: 27295,
    studentLoanRate: 0.09,
  },
  '2025-26': {
    year: '2025-26',
    personalAllowance: 12570,
    personalAllowanceLimit: 100000,
    basicRateThreshold: 50270,
    higherRateThreshold: 125140,
    additionalRateThreshold: 125140,
    basicRate: 0.20,
    higherRate: 0.40,
    additionalRate: 0.45,
    class2NIWeekly: 3.50,
    class2NIThreshold: 12570,
    class4NILowerThreshold: 12570,
    class4NIUpperThreshold: 50270,
    class4NIRate: 0.08,
    class4NIUpperRate: 0.02,
    studentLoanPlan1Threshold: 22500,
    studentLoanPlan2Threshold: 27660,
    studentLoanRate: 0.09,
  },
};

export const CURRENT_TAX_YEAR = '2024-25';

export const TAX_DEADLINES = [
  { date: '2025-01-31', description: 'Self Assessment tax return deadline', type: 'tax' },
  { date: '2025-01-31', description: 'Pay tax owed for 2023-24', type: 'payment' },
  { date: '2025-07-31', description: 'Second payment on account', type: 'payment' },
  { date: '2025-10-05', description: 'Register for Self Assessment (if new)', type: 'registration' },
];

export const SIMPLIFIED_EXPENSES = {
  vehicle: {
    car: 0.45, // First 10,000 miles
    carOver10k: 0.25, // After 10,000 miles
    motorcycle: 0.24,
    bicycle: 0.20,
  },
  homeOffice: {
    hours25to50: 10, // £10/month
    hours51to100: 18, // £18/month
    hoursOver100: 26, // £26/month
    flatRate: 6, // £6/week without tracking hours
  },
};

export const ALLOWABLE_EXPENSES = [
  { category: 'Office & Premises', examples: ['Rent', 'Utilities', 'Insurance', 'Repairs'] },
  { category: 'Travel', examples: ['Public transport', 'Fuel', 'Parking', 'Accommodation'] },
  { category: 'Staff', examples: ['Wages', 'Subcontractors', 'Employer NI'] },
  { category: 'Stock & Materials', examples: ['Raw materials', 'Goods for resale', 'Packaging'] },
  { category: 'Legal & Professional', examples: ['Accountant fees', 'Legal fees', 'Professional subscriptions'] },
  { category: 'Marketing', examples: ['Advertising', 'Website costs', 'Business cards'] },
  { category: 'Technology', examples: ['Software subscriptions', 'Computer equipment', 'Phone bills'] },
  { category: 'Finance', examples: ['Bank charges', 'Interest on loans', 'Credit card fees'] },
  { category: 'Training', examples: ['Courses', 'Books', 'Conferences'] },
];