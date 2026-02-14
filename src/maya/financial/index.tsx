/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

/**
 * Maya Financial Advisor Exports
 * 
 * "The industry won't teach you this. Maya will."
 */

export {
  default as MayaFinancialAdvisor,
  
  // Tax Rates & Constants
  UK_TAX_RATES_2024_25,
  
  // Programme Guides
  PROGRAMME_PRICING_GUIDES,
  
  // Calculation Functions
  calculatePricing,
  calculateSelfEmploymentTax,
  calculateEmploymentCost,
  calculateMileageAllowance,
  checkVATThreshold,
  
  // Types
  type ProgrammeId,
  type CostItem,
  type PricingResult,
  type TaxEstimate,
  type EmploymentCostResult,
} from './MayaFinancialAdvisor';