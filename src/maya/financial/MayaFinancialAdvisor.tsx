/*
 * G-TECH COMMUNITY PLATFORM IP PROTECTION
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 * 
 * MAYA FINANCIAL ADVISOR MODULE
 * 
 * "The industry won't teach you this. Maya will."
 * 
 * Helps creators understand:
 * - What to charge (and why)
 * - True cost of their work
 * - Tax obligations (explained simply)
 * - Business deductions they're missing
 * - Employment costs if hiring
 */

import React, { useState, useMemo } from 'react';

// ============================================
// UK TAX RATES 2024/25
// ============================================

export const UK_TAX_RATES_2024_25 = {
  // Income Tax
  personalAllowance: 12570,
  personalAllowanceTaperThreshold: 100000,
  basicRateLimit: 50270,
  higherRateLimit: 125140,
  
  basicRate: 0.20,
  higherRate: 0.40,
  additionalRate: 0.45,
  
  // National Insurance - Self Employed
  class2Weekly: 3.45,
  class2Threshold: 12570,
  class4LowerLimit: 12570,
  class4UpperLimit: 50270,
  class4MainRate: 0.09,
  class4AdditionalRate: 0.02,
  
  // National Insurance - Employed/Employer
  employeeNIThreshold: 12570,
  employeeNIUpperLimit: 50270,
  employeeNIMainRate: 0.12,
  employeeNIAdditionalRate: 0.02,
  
  employerNIThreshold: 9100,
  employerNIRate: 0.138,
  
  // Pension Auto-Enrolment
  pensionEmployeeMin: 0.05,
  pensionEmployerMin: 0.03,
  pensionQualifyingLower: 6240,
  pensionQualifyingUpper: 50270,
  
  // Student Loans
  studentLoanPlan1Threshold: 24990,
  studentLoanPlan2Threshold: 27295,
  studentLoanPlan4Threshold: 31395,
  studentLoanPostgradThreshold: 21000,
  studentLoanRate: 0.09,
  postgradLoanRate: 0.06,
  
  // VAT
  vatThreshold: 90000,
  vatStandardRate: 0.20,
  vatReducedRate: 0.05,
  
  // Mileage Allowances
  carFirst10000: 0.45,
  carAfter10000: 0.25,
  motorcycle: 0.24,
  bicycle: 0.20,
  
  // Simplified Home Office
  homeOfficeSimplified: {
    '25-50': 10,   // £10/month for 25-50 hours
    '51-100': 18,  // £18/month for 51-100 hours
    '101+': 26     // £26/month for 101+ hours
  },
  
  // Statutory Payments
  sspWeekly: 116.75,
  smpWeekly: 184.03,
  
  // Minimum Wage (April 2024)
  minimumWage: {
    '23+': 11.44,
    '21-22': 11.44,
    '18-20': 8.60,
    'under18': 6.40,
    'apprentice': 6.40
  }
};

// ============================================
// TYPES
// ============================================

export type ProgrammeId = 
  | 'trubble-n-bass' 
  | 'silk-stilettos' 
  | 'scrap-cat' 
  | 'techreneurs'
  | 'g-tech-casters'
  | 'kaywanas-court'
  | 'pageturners'
  | 'joystick'
  | 'stemgeneers'
  | 'bright-sparks';

export interface CostItem {
  id: string;
  label: string;
  amount: number;
  category: 'materials' | 'labour' | 'overhead' | 'travel' | 'equipment' | 'other';
  isDeductible: boolean;
  notes?: string;
}

export interface PricingResult {
  totalCosts: number;
  costBreakdown: {
    materials: number;
    labour: number;
    overhead: number;
    travel: number;
    equipment: number;
    other: number;
  };
  suggestedPrices: {
    minimum: number;     // Cost + 20% margin
    recommended: number; // Cost + 50% margin
    premium: number;     // Cost + 100% margin
  };
  hourlyEquivalent: number;
  mayaAdvice: string;
}

export interface TaxEstimate {
  grossIncome: number;
  allowableExpenses: number;
  taxableProfit: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoan: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
  monthlyTakeHome: number;
  mayaExplanation: string;
}

export interface EmploymentCostResult {
  grossSalary: number;
  employerNI: number;
  pensionContribution: number;
  apprenticeship?: number;
  totalCostToEmployer: number;
  percentageOverhead: number;
  mayaAdvice: string;
}

// ============================================
// PROGRAMME-SPECIFIC PRICING GUIDES
// ============================================

export const PROGRAMME_PRICING_GUIDES: Record<ProgrammeId, {
  name: string;
  icon: string;
  commonCosts: { label: string; typical: string; category: CostItem['category'] }[];
  pricingTips: string[];
  industryRates: { item: string; low: number; mid: number; high: number }[];
  deductibleExpenses: string[];
  mayaQuote: string;
}> = {
  'trubble-n-bass': {
    name: 'Trubble n Bass',
    icon: '🎵',
    commonCosts: [
      { label: 'Studio time (per hour)', typical: '£20-50', category: 'overhead' },
      { label: 'Sample packs/sounds', typical: '£10-100', category: 'materials' },
      { label: 'Mixing/mastering', typical: '£50-300', category: 'labour' },
      { label: 'Distribution (annual)', typical: '£20-50', category: 'overhead' },
      { label: 'Software subscriptions', typical: '£10-50/month', category: 'equipment' },
      { label: 'Session musician', typical: '£50-200', category: 'labour' },
    ],
    pricingTips: [
      "Streaming pays fractions of pennies. Don't rely on it alone.",
      "Sync licensing (TV, film, ads) pays £500-50,000+ per placement.",
      "Ghost production: charge £200-2000+ per track, depending on buyer's reach.",
      "Beat leases vs exclusives: leases stack up, exclusives pay more upfront.",
      "Always keep your publishing rights unless they're paying SERIOUS money."
    ],
    industryRates: [
      { item: 'Beat lease (basic)', low: 25, mid: 50, high: 100 },
      { item: 'Beat lease (premium)', low: 100, mid: 200, high: 500 },
      { item: 'Exclusive beat', low: 200, mid: 500, high: 2000 },
      { item: 'Full production', low: 300, mid: 800, high: 3000 },
      { item: 'Mixing (per track)', low: 50, mid: 150, high: 400 },
      { item: 'Mastering (per track)', low: 30, mid: 75, high: 200 },
    ],
    deductibleExpenses: [
      'Software subscriptions (DAW, plugins)',
      'Sample packs and sound libraries',
      'Studio equipment and instruments',
      'Acoustic treatment',
      'Hard drives and storage',
      'Reference headphones/monitors',
      'Music courses and training',
      'PRO membership fees (PRS, PPL)',
    ],
    mayaQuote: "T-Pain said he made millions but saw thousands. Know what you're owed before you sign anything."
  },

  'silk-stilettos': {
    name: 'Silk & Stilettos',
    icon: '👗',
    commonCosts: [
      { label: 'Fabric (per metre)', typical: '£5-50', category: 'materials' },
      { label: 'Haberdashery (zips, buttons)', typical: '£5-30', category: 'materials' },
      { label: 'Pattern paper/tools', typical: '£10-50', category: 'equipment' },
      { label: 'Sewing machine maintenance', typical: '£50-100/year', category: 'equipment' },
      { label: 'Photography (lookbook)', typical: '£100-500', category: 'overhead' },
      { label: 'Packaging/labels', typical: '£1-5 per item', category: 'materials' },
    ],
    pricingTips: [
      "Time yourself making each piece. Your labour has value.",
      "Fabric cost is usually 20-30% of final price, not 50%.",
      "Custom/bespoke commands 2-3x ready-to-wear prices.",
      "Alterations: charge for your expertise, not just time.",
      "Wholesale to boutiques: typically 50% of retail price."
    ],
    industryRates: [
      { item: 'Simple alterations', low: 10, mid: 25, high: 50 },
      { item: 'Custom dress', low: 150, mid: 400, high: 1500 },
      { item: 'Jacket/blazer', low: 200, mid: 500, high: 2000 },
      { item: 'Wedding dress', low: 500, mid: 1500, high: 5000 },
      { item: 'Costume/cosplay', low: 100, mid: 300, high: 1000 },
      { item: 'Streetwear piece', low: 50, mid: 120, high: 300 },
    ],
    deductibleExpenses: [
      'Fabrics and materials',
      'Sewing machine and equipment',
      'Mannequins and dress forms',
      'Pattern-making software',
      'Photography for portfolio',
      'Market stall fees',
      'Website and e-commerce fees',
      'Fashion courses and workshops',
    ],
    mayaQuote: "Ozwald Boateng didn't discount his way onto Savile Row. Neither should you."
  },

  'scrap-cat': {
    name: 'Scrap Cat',
    icon: '♻️',
    commonCosts: [
      { label: 'Base materials (sourced)', typical: '£0-20', category: 'materials' },
      { label: 'Finishing supplies', typical: '£5-30', category: 'materials' },
      { label: 'Tools maintenance', typical: '£20-50/year', category: 'equipment' },
      { label: 'Market/event fees', typical: '£20-100', category: 'overhead' },
      { label: 'Collection/sourcing trips', typical: '£10-30', category: 'travel' },
      { label: 'Workshop space', typical: '£50-200/month', category: 'overhead' },
    ],
    pricingTips: [
      "Your sourcing time IS work time. Include it.",
      "Upcycled doesn't mean cheap. It means unique.",
      "Story adds value: 'Made from...' commands premium.",
      "Commission work: get 50% deposit upfront.",
      "Workshops can earn more than products (£30-60/person)."
    ],
    industryRates: [
      { item: 'Small decorative item', low: 15, mid: 35, high: 80 },
      { item: 'Furniture piece (small)', low: 50, mid: 150, high: 400 },
      { item: 'Furniture piece (large)', low: 150, mid: 400, high: 1000 },
      { item: 'Custom commission', low: 100, mid: 300, high: 800 },
      { item: 'Workshop (2hr)', low: 25, mid: 45, high: 75 },
      { item: 'Corporate workshop', low: 200, mid: 500, high: 1500 },
    ],
    deductibleExpenses: [
      'Tools and equipment',
      'Finishing materials (paint, varnish)',
      'Transport for sourcing',
      'Market stall fees',
      'Photography',
      'Website costs',
      'Workshop materials',
      'Storage costs',
    ],
    mayaQuote: "Yinka Ilori turned discarded chairs into gallery pieces. Your trash finds have stories worth paying for."
  },

  'techreneurs': {
    name: 'TECHreneurs',
    icon: '💻',
    commonCosts: [
      { label: 'Domain/hosting', typical: '£50-200/year', category: 'overhead' },
      { label: 'Software subscriptions', typical: '£20-200/month', category: 'equipment' },
      { label: 'Development tools', typical: '£0-50/month', category: 'equipment' },
      { label: 'API costs', typical: 'Variable', category: 'overhead' },
      { label: 'Marketing/ads', typical: '£50-500/month', category: 'overhead' },
      { label: 'Legal/accounting', typical: '£500-2000/year', category: 'other' },
    ],
    pricingTips: [
      "Hourly rates for beginners: £25-40. Mid-level: £50-80. Senior: £100+.",
      "Project rates: estimate hours × 1.5, then add your rate.",
      "Retainers provide stable income. Offer maintenance packages.",
      "Value-based pricing: what's the client's ROI?",
      "SaaS: Monthly recurring > one-time payments."
    ],
    industryRates: [
      { item: 'Simple website', low: 300, mid: 800, high: 2000 },
      { item: 'E-commerce site', low: 1000, mid: 3000, high: 10000 },
      { item: 'Web app (MVP)', low: 3000, mid: 10000, high: 30000 },
      { item: 'Mobile app (simple)', low: 5000, mid: 15000, high: 50000 },
      { item: 'Hourly consulting', low: 40, mid: 75, high: 150 },
      { item: 'Monthly retainer', low: 300, mid: 800, high: 2000 },
    ],
    deductibleExpenses: [
      'Computer and equipment',
      'Software and subscriptions',
      'Internet costs (proportion)',
      'Home office costs',
      'Professional development',
      'Conference tickets',
      'Books and courses',
      'Professional memberships',
    ],
    mayaQuote: "Jamal Edwards built SBTV from his bedroom. Your laptop is a business asset—treat it like one."
  },

  'g-tech-casters': {
    name: 'G-Tech Casters',
    icon: '🎙️',
    commonCosts: [
      { label: 'Microphone', typical: '£50-300', category: 'equipment' },
      { label: 'Hosting platform', typical: '£0-20/month', category: 'overhead' },
      { label: 'Editing software', typical: '£0-30/month', category: 'equipment' },
      { label: 'Acoustic treatment', typical: '£20-200', category: 'equipment' },
      { label: 'Guest booking platform', typical: '£0-50/month', category: 'overhead' },
      { label: 'Transcription service', typical: '£1-2/minute', category: 'overhead' },
    ],
    pricingTips: [
      "Sponsorships: £15-50 per 1000 downloads (CPM).",
      "Podcast production services: £30-100/episode.",
      "Don't undersell ad reads. Your audience trusts you.",
      "Live events can 10x your podcast income.",
      "Patreon/memberships: even 100 supporters at £5 = £500/month."
    ],
    industryRates: [
      { item: 'Podcast editing (per ep)', low: 30, mid: 75, high: 200 },
      { item: 'Full production', low: 100, mid: 250, high: 600 },
      { item: 'Audio branding/intro', low: 50, mid: 150, high: 500 },
      { item: 'Sponsorship (per 1k)', low: 15, mid: 30, high: 50 },
      { item: 'Guest booking fee', low: 0, mid: 50, high: 200 },
      { item: 'Live show ticket', low: 10, mid: 25, high: 50 },
    ],
    deductibleExpenses: [
      'Microphone and audio equipment',
      'Hosting and distribution fees',
      'Editing software',
      'Soundproofing materials',
      'Guest travel expenses',
      'Marketing costs',
      'Website and branding',
      'Professional development',
    ],
    mayaQuote: "Trevor Nelson didn't wait for radio to notice him. He built his own platform. So can you."
  },

  'kaywanas-court': {
    name: "Kaywana's Court",
    icon: '🎭',
    commonCosts: [
      { label: 'Rehearsal space', typical: '£10-30/hour', category: 'overhead' },
      { label: 'Costume/wardrobe', typical: '£20-200', category: 'materials' },
      { label: 'Headshots', typical: '£100-400', category: 'overhead' },
      { label: 'Showreel editing', typical: '£100-500', category: 'overhead' },
      { label: 'Casting site subscriptions', typical: '£100-200/year', category: 'overhead' },
      { label: 'Classes/coaching', typical: '£50-150/session', category: 'other' },
    ],
    pricingTips: [
      "Equity minimum: know it, demand it.",
      "Self-tape setup: one-time cost, endless auditions.",
      "Corporate/training videos: £300-1000/day.",
      "Voiceover: build a home setup, work from anywhere.",
      "Teaching drama: £30-60/hour. Groups = more per hour."
    ],
    industryRates: [
      { item: 'Student film (day)', low: 0, mid: 50, high: 100 },
      { item: 'Low budget film (day)', low: 100, mid: 250, high: 500 },
      { item: 'Commercial (buyout)', low: 500, mid: 2000, high: 10000 },
      { item: 'Corporate video', low: 300, mid: 600, high: 1200 },
      { item: 'Theatre (weekly)', low: 400, mid: 600, high: 1000 },
      { item: 'Voiceover (per hour)', low: 100, mid: 250, high: 500 },
    ],
    deductibleExpenses: [
      'Acting classes and coaching',
      'Headshots and photography',
      'Showreel production',
      'Casting site subscriptions',
      'Travel to auditions',
      'Costume and wardrobe',
      'Agent commission (if applicable)',
      'Union fees (Equity)',
    ],
    mayaQuote: "Daniel Kaluuya worked for 10 years before 'overnight success.' Your training is an investment, not an expense."
  },

  'pageturners': {
    name: 'PageTurners',
    icon: '📚',
    commonCosts: [
      { label: 'Editing (per 1000 words)', typical: '£5-15', category: 'labour' },
      { label: 'Cover design', typical: '£100-500', category: 'overhead' },
      { label: 'ISBN', typical: '£0-90', category: 'overhead' },
      { label: 'Formatting', typical: '£50-200', category: 'labour' },
      { label: 'Proof copies', typical: '£20-50', category: 'materials' },
      { label: 'Marketing/ads', typical: '£50-500', category: 'overhead' },
    ],
    pricingTips: [
      "Traditional publishing: you get 7-15% of cover price.",
      "Self-publishing: you keep 35-70% (Amazon KDP).",
      "Ghostwriting: £2000-20,000+ per book.",
      "Editing services: £0.01-0.03 per word.",
      "Writing workshops: £50-200 per session."
    ],
    industryRates: [
      { item: 'Blog post (500 words)', low: 30, mid: 75, high: 200 },
      { item: 'Article (1000 words)', low: 50, mid: 150, high: 400 },
      { item: 'Copywriting (per page)', low: 50, mid: 150, high: 400 },
      { item: 'Ghostwriting (book)', low: 2000, mid: 8000, high: 25000 },
      { item: 'Editing (per 1000w)', low: 5, mid: 10, high: 20 },
      { item: 'Writing workshop', low: 50, mid: 120, high: 300 },
    ],
    deductibleExpenses: [
      'Research materials and books',
      'Writing software',
      'Professional editing',
      'Cover design',
      'ISBN and publishing fees',
      'Marketing and promotion',
      'Website and domain',
      'Writing courses and conferences',
    ],
    mayaQuote: "Malorie Blackman got 82 rejections before her first yes. Each 'no' is a tax-deductible lesson."
  },

  'joystick': {
    name: 'Joystick',
    icon: '🎮',
    commonCosts: [
      { label: 'Game engine (Unity/Unreal)', typical: '£0-2000', category: 'equipment' },
      { label: 'Art assets', typical: '£20-500', category: 'materials' },
      { label: 'Music/SFX', typical: '£20-300', category: 'materials' },
      { label: 'Dev kit/hardware', typical: '£300-1000', category: 'equipment' },
      { label: 'Publishing fees', typical: '£25-100', category: 'overhead' },
      { label: 'Marketing', typical: '£100-5000', category: 'overhead' },
    ],
    pricingTips: [
      "Steam/Epic take 30%. Price accordingly.",
      "Mobile free-to-play: monetise carefully, ethically.",
      "Game jams = portfolio + networking + practice.",
      "Contract work: £25-100/hour depending on specialism.",
      "Asset creation: passive income through marketplaces."
    ],
    industryRates: [
      { item: '2D art asset pack', low: 10, mid: 30, high: 100 },
      { item: '3D model', low: 20, mid: 75, high: 300 },
      { item: 'Game soundtrack', low: 100, mid: 400, high: 2000 },
      { item: 'Level design (contract)', low: 300, mid: 800, high: 2000 },
      { item: 'QA testing (hourly)', low: 12, mid: 18, high: 30 },
      { item: 'Full indie game', low: 5, mid: 15, high: 30 },
    ],
    deductibleExpenses: [
      'Game engine licenses',
      'Development software',
      'Asset purchases',
      'Hardware (PC, consoles)',
      'Publishing fees',
      'Marketing costs',
      'Conference attendance (GDC, etc)',
      'Online courses',
    ],
    mayaQuote: "Every game on your phone started with someone saying 'I could make that.' Now you can too."
  },

  'stemgeneers': {
    name: 'STEMgeneers',
    icon: '🔬',
    commonCosts: [
      { label: 'Components/materials', typical: '£10-100', category: 'materials' },
      { label: 'Prototyping tools', typical: '£50-500', category: 'equipment' },
      { label: '3D printing', typical: '£5-50 per print', category: 'materials' },
      { label: 'Testing equipment', typical: '£100-1000', category: 'equipment' },
      { label: 'Safety equipment', typical: '£20-100', category: 'equipment' },
      { label: 'Patent search', typical: '£100-500', category: 'other' },
    ],
    pricingTips: [
      "STEM tutoring: £30-80/hour. Group sessions scale better.",
      "Prototype development: charge for iterations, not just final.",
      "Technical writing: £0.10-0.30 per word.",
      "Workshop facilitation: £200-500 per half-day.",
      "Consulting: £50-150/hour depending on specialism."
    ],
    industryRates: [
      { item: 'STEM tutoring (hr)', low: 25, mid: 50, high: 100 },
      { item: 'Technical writing (1000w)', low: 80, mid: 200, high: 500 },
      { item: 'Prototype development', low: 200, mid: 800, high: 3000 },
      { item: 'School workshop', low: 150, mid: 350, high: 600 },
      { item: 'Consulting (hr)', low: 50, mid: 100, high: 200 },
      { item: 'CAD design (hr)', low: 30, mid: 60, high: 120 },
    ],
    deductibleExpenses: [
      'Components and materials',
      'Tools and equipment',
      '3D printer and filament',
      'Software licenses',
      'Safety equipment',
      'Professional memberships',
      'Courses and certifications',
      'Travel to clients/schools',
    ],
    mayaQuote: "Maggie Aderin-Pocock was told to lower her expectations. She worked on the Hubble Telescope. Know your worth."
  },

  'bright-sparks': {
    name: 'Bright Sparks',
    icon: '⚡',
    commonCosts: [
      { label: 'Activity materials', typical: '£5-30', category: 'materials' },
      { label: 'Venue hire', typical: '£20-100/session', category: 'overhead' },
      { label: 'Insurance', typical: '£100-300/year', category: 'overhead' },
      { label: 'DBS check', typical: '£23-40', category: 'other' },
      { label: 'First aid training', typical: '£50-150', category: 'other' },
      { label: 'Certificates/badges', typical: '£1-5 each', category: 'materials' },
    ],
    pricingTips: [
      "Youth work: £12-25/hour depending on qualifications.",
      "Holiday clubs: £25-50/day per child.",
      "After-school clubs: £5-15 per session per child.",
      "Birthday parties: £150-400 for 2 hours.",
      "School contracts: negotiate termly rates."
    ],
    industryRates: [
      { item: 'Youth session (hr)', low: 12, mid: 18, high: 30 },
      { item: 'Holiday club (day)', low: 25, mid: 40, high: 60 },
      { item: 'After-school club', low: 5, mid: 10, high: 15 },
      { item: 'Birthday party (2hr)', low: 150, mid: 250, high: 400 },
      { item: 'School workshop', low: 100, mid: 200, high: 400 },
      { item: 'Training (to staff)', low: 200, mid: 400, high: 800 },
    ],
    deductibleExpenses: [
      'Activity materials and supplies',
      'Venue hire',
      'Insurance (public liability)',
      'DBS checks',
      'First aid and safeguarding training',
      'Equipment and games',
      'Travel to venues',
      'Marketing and flyers',
    ],
    mayaQuote: "Lenny Henry started entertaining at youth clubs. Every session you run could spark someone's future."
  }
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

/**
 * Calculate pricing based on costs
 */
export function calculatePricing(
  costs: CostItem[],
  hoursWorked: number,
  programmeId?: ProgrammeId
): PricingResult {
  const breakdown = {
    materials: 0,
    labour: 0,
    overhead: 0,
    travel: 0,
    equipment: 0,
    other: 0
  };

  costs.forEach(cost => {
    breakdown[cost.category] += cost.amount;
  });

  const totalCosts = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  const suggestedPrices = {
    minimum: Math.ceil(totalCosts * 1.2),      // 20% margin
    recommended: Math.ceil(totalCosts * 1.5),  // 50% margin
    premium: Math.ceil(totalCosts * 2)         // 100% margin
  };

  const hourlyEquivalent = hoursWorked > 0 
    ? Math.round(suggestedPrices.recommended / hoursWorked) 
    : 0;

  // Generate Maya's advice based on the numbers
  let mayaAdvice = '';
  
  if (hourlyEquivalent < UK_TAX_RATES_2024_25.minimumWage['23+']) {
    mayaAdvice = `At this price, you're earning less than minimum wage (£${UK_TAX_RATES_2024_25.minimumWage['23+']}/hr). Your skills deserve more. Consider the recommended price.`;
  } else if (hourlyEquivalent < 15) {
    mayaAdvice = `£${hourlyEquivalent}/hour is a start, but as you build your reputation, aim for £20-30+. Your expertise grows with every project.`;
  } else if (hourlyEquivalent >= 15 && hourlyEquivalent < 30) {
    mayaAdvice = `£${hourlyEquivalent}/hour is solid. You're valuing your work properly. Don't let anyone tell you to discount.`;
  } else {
    mayaAdvice = `£${hourlyEquivalent}/hour reflects your expertise. Own it. 23 other creators in Brent are charging similar rates.`;
  }

  if (programmeId) {
    const guide = PROGRAMME_PRICING_GUIDES[programmeId];
    if (guide) {
      mayaAdvice += ` ${guide.mayaQuote}`;
    }
  }

  return {
    totalCosts,
    costBreakdown: breakdown,
    suggestedPrices,
    hourlyEquivalent,
    mayaAdvice
  };
}

/**
 * Calculate self-employment tax estimate
 */
export function calculateSelfEmploymentTax(
  grossIncome: number,
  allowableExpenses: number,
  studentLoanPlan?: 'plan1' | 'plan2' | 'plan4' | 'postgrad' | 'none'
): TaxEstimate {
  const rates = UK_TAX_RATES_2024_25;
  const taxableProfit = Math.max(0, grossIncome - allowableExpenses);
  
  // Calculate Income Tax
  let incomeTax = 0;
  let remainingIncome = taxableProfit;
  
  // Personal allowance (tapers if income > £100k)
  let personalAllowance = rates.personalAllowance;
  if (taxableProfit > rates.personalAllowanceTaperThreshold) {
    const reduction = Math.floor((taxableProfit - rates.personalAllowanceTaperThreshold) / 2);
    personalAllowance = Math.max(0, personalAllowance - reduction);
  }
  
  remainingIncome -= personalAllowance;
  
  if (remainingIncome > 0) {
    // Basic rate
    const basicRateBand = Math.min(remainingIncome, rates.basicRateLimit - personalAllowance);
    if (basicRateBand > 0) {
      incomeTax += basicRateBand * rates.basicRate;
      remainingIncome -= basicRateBand;
    }
    
    // Higher rate
    if (remainingIncome > 0) {
      const higherRateBand = Math.min(remainingIncome, rates.higherRateLimit - rates.basicRateLimit);
      if (higherRateBand > 0) {
        incomeTax += higherRateBand * rates.higherRate;
        remainingIncome -= higherRateBand;
      }
    }
    
    // Additional rate
    if (remainingIncome > 0) {
      incomeTax += remainingIncome * rates.additionalRate;
    }
  }
  
  // Calculate National Insurance (Class 2 and Class 4)
  let nationalInsurance = 0;
  
  if (taxableProfit > rates.class2Threshold) {
    // Class 2: flat weekly rate
    nationalInsurance += rates.class2Weekly * 52;
    
    // Class 4
    const class4Band = Math.min(
      Math.max(0, taxableProfit - rates.class4LowerLimit),
      rates.class4UpperLimit - rates.class4LowerLimit
    );
    nationalInsurance += class4Band * rates.class4MainRate;
    
    // Class 4 additional rate
    if (taxableProfit > rates.class4UpperLimit) {
      nationalInsurance += (taxableProfit - rates.class4UpperLimit) * rates.class4AdditionalRate;
    }
  }
  
  // Calculate Student Loan
  let studentLoan = 0;
  if (studentLoanPlan && studentLoanPlan !== 'none') {
    let threshold = 0;
    let rate = rates.studentLoanRate;
    
    switch (studentLoanPlan) {
      case 'plan1':
        threshold = rates.studentLoanPlan1Threshold;
        break;
      case 'plan2':
        threshold = rates.studentLoanPlan2Threshold;
        break;
      case 'plan4':
        threshold = rates.studentLoanPlan4Threshold;
        break;
      case 'postgrad':
        threshold = rates.studentLoanPostgradThreshold;
        rate = rates.postgradLoanRate;
        break;
    }
    
    if (taxableProfit > threshold) {
      studentLoan = (taxableProfit - threshold) * rate;
    }
  }
  
  const totalTax = Math.round(incomeTax + nationalInsurance + studentLoan);
  const takeHome = taxableProfit - totalTax;
  const effectiveRate = taxableProfit > 0 ? (totalTax / taxableProfit) * 100 : 0;
  const monthlyTakeHome = Math.round(takeHome / 12);
  
  // Generate Maya's explanation
  let mayaExplanation = '';
  
  if (taxableProfit <= rates.personalAllowance) {
    mayaExplanation = `Good news: your profit (£${taxableProfit.toLocaleString()}) is within the tax-free allowance. You won't owe income tax, but keep records anyway.`;
  } else if (taxableProfit <= rates.basicRateLimit) {
    mayaExplanation = `You're in the basic rate band. You'll pay 20% tax on £${(taxableProfit - personalAllowance).toLocaleString()} plus National Insurance. Set aside about £${Math.round(totalTax / 12)}/month.`;
  } else {
    mayaExplanation = `You're earning well! Some of your income is taxed at 40%. Consider pension contributions—they reduce your tax bill AND build your future.`;
  }
  
  if (allowableExpenses === 0) {
    mayaExplanation += ` You've claimed no expenses—are you sure? Most creators can deduct equipment, software, travel, and more.`;
  }
  
  return {
    grossIncome,
    allowableExpenses,
    taxableProfit,
    incomeTax: Math.round(incomeTax),
    nationalInsurance: Math.round(nationalInsurance),
    studentLoan: Math.round(studentLoan),
    totalTax,
    takeHome,
    effectiveRate: Math.round(effectiveRate * 10) / 10,
    monthlyTakeHome,
    mayaExplanation
  };
}

/**
 * Calculate cost of employing someone
 */
export function calculateEmploymentCost(
  grossSalary: number,
  includePension: boolean = true,
  pensionRate: number = UK_TAX_RATES_2024_25.pensionEmployerMin
): EmploymentCostResult {
  const rates = UK_TAX_RATES_2024_25;
  
  // Employer's National Insurance
  let employerNI = 0;
  if (grossSalary > rates.employerNIThreshold) {
    employerNI = (grossSalary - rates.employerNIThreshold) * rates.employerNIRate;
  }
  
  // Pension contribution
  let pensionContribution = 0;
  if (includePension && grossSalary >= rates.pensionQualifyingLower) {
    const qualifyingEarnings = Math.min(grossSalary, rates.pensionQualifyingUpper) - rates.pensionQualifyingLower;
    pensionContribution = qualifyingEarnings * pensionRate;
  }
  
  const totalCostToEmployer = grossSalary + employerNI + pensionContribution;
  const percentageOverhead = ((totalCostToEmployer - grossSalary) / grossSalary) * 100;
  
  let mayaAdvice = `Paying someone £${grossSalary.toLocaleString()} actually costs you £${Math.round(totalCostToEmployer).toLocaleString()} (${Math.round(percentageOverhead)}% more). `;
  
  if (percentageOverhead > 15) {
    mayaAdvice += `Factor this in when pricing jobs that need extra hands.`;
  }
  
  if (!includePension) {
    mayaAdvice += ` Note: You must auto-enrol eligible workers into a pension.`;
  }
  
  return {
    grossSalary,
    employerNI: Math.round(employerNI),
    pensionContribution: Math.round(pensionContribution),
    totalCostToEmployer: Math.round(totalCostToEmployer),
    percentageOverhead: Math.round(percentageOverhead * 10) / 10,
    mayaAdvice
  };
}

/**
 * Calculate mileage allowance
 */
export function calculateMileageAllowance(
  miles: number,
  vehicleType: 'car' | 'motorcycle' | 'bicycle' = 'car'
): { allowance: number; explanation: string } {
  const rates = UK_TAX_RATES_2024_25;
  let allowance = 0;
  let explanation = '';
  
  if (vehicleType === 'car') {
    if (miles <= 10000) {
      allowance = miles * rates.carFirst10000;
      explanation = `${miles} miles × 45p = £${allowance.toFixed(2)}`;
    } else {
      const first10k = 10000 * rates.carFirst10000;
      const remainder = (miles - 10000) * rates.carAfter10000;
      allowance = first10k + remainder;
      explanation = `First 10,000 miles × 45p = £${first10k.toFixed(2)}, remaining ${miles - 10000} miles × 25p = £${remainder.toFixed(2)}. Total: £${allowance.toFixed(2)}`;
    }
  } else if (vehicleType === 'motorcycle') {
    allowance = miles * rates.motorcycle;
    explanation = `${miles} miles × 24p = £${allowance.toFixed(2)}`;
  } else {
    allowance = miles * rates.bicycle;
    explanation = `${miles} miles × 20p = £${allowance.toFixed(2)}`;
  }
  
  return { allowance: Math.round(allowance * 100) / 100, explanation };
}

/**
 * Calculate VAT liability
 */
export function checkVATThreshold(
  annualTurnover: number
): { mustRegister: boolean; shouldVoluntary: boolean; explanation: string } {
  const threshold = UK_TAX_RATES_2024_25.vatThreshold;
  const mustRegister = annualTurnover > threshold;
  
  // Voluntary registration might be beneficial if mostly B2B
  const shouldVoluntary = annualTurnover > threshold * 0.7 && annualTurnover <= threshold;
  
  let explanation = '';
  
  if (mustRegister) {
    explanation = `Your turnover (£${annualTurnover.toLocaleString()}) exceeds the £${threshold.toLocaleString()} threshold. You MUST register for VAT. This isn't optional.`;
  } else if (shouldVoluntary) {
    explanation = `You're approaching the VAT threshold. If you sell mostly to businesses (B2B), voluntary registration could help—you'd reclaim VAT on purchases. If you sell to consumers, probably wait.`;
  } else {
    explanation = `Your turnover is below the £${threshold.toLocaleString()} threshold. No need to register for VAT yet, but track it.`;
  }
  
  return { mustRegister, shouldVoluntary, explanation };
}

// ============================================
// REACT COMPONENTS
// ============================================

interface MayaFinancialAdvisorProps {
  programmeId?: ProgrammeId;
  className?: string;
}

export const MayaFinancialAdvisor: React.FC<MayaFinancialAdvisorProps> = ({
  programmeId,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'pricing' | 'tax' | 'employment' | 'guide'>('pricing');
  const guide = programmeId ? PROGRAMME_PRICING_GUIDES[programmeId] : null;
  
  return (
    <div className={`maya-financial-advisor ${className}`}>
      <header className="mfa-header">
        <div className="mfa-avatar">👩🏾‍💼</div>
        <div className="mfa-title">
          <h2>Maya Financial Advisor</h2>
          <p>The industry won't teach you this. I will.</p>
        </div>
      </header>
      
      <nav className="mfa-tabs">
        <button 
          className={activeTab === 'pricing' ? 'active' : ''}
          onClick={() => setActiveTab('pricing')}
        >
          💰 Pricing
        </button>
        <button 
          className={activeTab === 'tax' ? 'active' : ''}
          onClick={() => setActiveTab('tax')}
        >
          📊 Tax
        </button>
        <button 
          className={activeTab === 'employment' ? 'active' : ''}
          onClick={() => setActiveTab('employment')}
        >
          👥 Hiring
        </button>
        {guide && (
          <button 
            className={activeTab === 'guide' ? 'active' : ''}
            onClick={() => setActiveTab('guide')}
          >
            {guide.icon} {guide.name}
          </button>
        )}
      </nav>
      
      <main className="mfa-content">
        {activeTab === 'pricing' && <PricingCalculator programmeId={programmeId} />}
        {activeTab === 'tax' && <TaxEstimator />}
        {activeTab === 'employment' && <EmploymentCostCalculator />}
        {activeTab === 'guide' && guide && <ProgrammeGuide guide={guide} />}
      </main>
    </div>
  );
};

// ============================================
// PRICING CALCULATOR COMPONENT
// ============================================

interface PricingCalculatorProps {
  programmeId?: ProgrammeId;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ programmeId }) => {
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [newCost, setNewCost] = useState({ label: '', amount: 0, category: 'materials' as CostItem['category'] });
  const [result, setResult] = useState<PricingResult | null>(null);
  
  const addCost = () => {
    if (newCost.label && newCost.amount > 0) {
      setCosts([...costs, {
        id: Date.now().toString(),
        ...newCost,
        isDeductible: true
      }]);
      setNewCost({ label: '', amount: 0, category: 'materials' });
    }
  };
  
  const removeCost = (id: string) => {
    setCosts(costs.filter(c => c.id !== id));
  };
  
  const calculate = () => {
    setResult(calculatePricing(costs, hoursWorked, programmeId));
  };
  
  return (
    <div className="pricing-calculator">
      <h3>What Should I Charge?</h3>
      <p className="intro">Add your costs and time. I'll help you price properly.</p>
      
      <div className="cost-input-form">
        <input
          type="text"
          placeholder="What did you spend on?"
          value={newCost.label}
          onChange={(e) => setNewCost({ ...newCost, label: e.target.value })}
        />
        <input
          type="number"
          placeholder="£"
          value={newCost.amount || ''}
          onChange={(e) => setNewCost({ ...newCost, amount: parseFloat(e.target.value) || 0 })}
        />
        <select
          value={newCost.category}
          onChange={(e) => setNewCost({ ...newCost, category: e.target.value as CostItem['category'] })}
        >
          <option value="materials">Materials</option>
          <option value="labour">Labour (others)</option>
          <option value="overhead">Overhead</option>
          <option value="travel">Travel</option>
          <option value="equipment">Equipment</option>
          <option value="other">Other</option>
        </select>
        <button onClick={addCost}>Add</button>
      </div>
      
      {costs.length > 0 && (
        <div className="costs-list">
          <h4>Your Costs</h4>
          {costs.map(cost => (
            <div key={cost.id} className="cost-item">
              <span className="cost-label">{cost.label}</span>
              <span className="cost-category">{cost.category}</span>
              <span className="cost-amount">£{cost.amount.toFixed(2)}</span>
              <button onClick={() => removeCost(cost.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
      
      <div className="hours-input">
        <label>
          <span>Hours you worked:</span>
          <input
            type="number"
            value={hoursWorked || ''}
            onChange={(e) => setHoursWorked(parseFloat(e.target.value) || 0)}
            placeholder="0"
          />
        </label>
      </div>
      
      <button className="calculate-btn" onClick={calculate} disabled={costs.length === 0}>
        Calculate My Price
      </button>
      
      {result && (
        <div className="pricing-result">
          <div className="result-breakdown">
            <h4>Cost Breakdown</h4>
            <div className="breakdown-grid">
              {Object.entries(result.costBreakdown).map(([key, value]) => (
                value > 0 && (
                  <div key={key} className="breakdown-item">
                    <span>{key}</span>
                    <span>£{value.toFixed(2)}</span>
                  </div>
                )
              ))}
              <div className="breakdown-item total">
                <span>Total Cost</span>
                <span>£{result.totalCosts.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="suggested-prices">
            <h4>Suggested Prices</h4>
            <div className="price-options">
              <div className="price-option minimum">
                <span className="price-label">Minimum (20% margin)</span>
                <span className="price-value">£{result.suggestedPrices.minimum}</span>
              </div>
              <div className="price-option recommended">
                <span className="price-label">Recommended (50%)</span>
                <span className="price-value">£{result.suggestedPrices.recommended}</span>
                <span className="price-badge">✓ Fair</span>
              </div>
              <div className="price-option premium">
                <span className="price-label">Premium (100%)</span>
                <span className="price-value">£{result.suggestedPrices.premium}</span>
              </div>
            </div>
            
            {hoursWorked > 0 && (
              <p className="hourly-equivalent">
                At recommended price, that's <strong>£{result.hourlyEquivalent}/hour</strong> for your time.
              </p>
            )}
          </div>
          
          <div className="maya-advice">
            <div className="maya-icon">👩🏾‍💼</div>
            <p>{result.mayaAdvice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// TAX ESTIMATOR COMPONENT
// ============================================

const TaxEstimator: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [studentLoan, setStudentLoan] = useState<'none' | 'plan1' | 'plan2' | 'plan4' | 'postgrad'>('none');
  const [result, setResult] = useState<TaxEstimate | null>(null);
  
  const calculate = () => {
    setResult(calculateSelfEmploymentTax(grossIncome, expenses, studentLoan));
  };
  
  return (
    <div className="tax-estimator">
      <h3>Self-Employment Tax Estimate</h3>
      <p className="intro">See what you'll owe before it's due. No surprises.</p>
      
      <div className="tax-inputs">
        <div className="input-group">
          <label>Total Income (before expenses)</label>
          <div className="input-with-prefix">
            <span>£</span>
            <input
              type="number"
              value={grossIncome || ''}
              onChange={(e) => setGrossIncome(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="input-group">
          <label>Business Expenses</label>
          <div className="input-with-prefix">
            <span>£</span>
            <input
              type="number"
              value={expenses || ''}
              onChange={(e) => setExpenses(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
          <small>Equipment, software, materials, travel, etc.</small>
        </div>
        
        <div className="input-group">
          <label>Student Loan?</label>
          <select value={studentLoan} onChange={(e) => setStudentLoan(e.target.value as any)}>
            <option value="none">No student loan</option>
            <option value="plan1">Plan 1 (started before 2012)</option>
            <option value="plan2">Plan 2 (started after 2012)</option>
            <option value="plan4">Plan 4 (Scotland)</option>
            <option value="postgrad">Postgraduate Loan</option>
          </select>
        </div>
      </div>
      
      <button className="calculate-btn" onClick={calculate} disabled={grossIncome === 0}>
        Calculate My Tax
      </button>
      
      {result && (
        <div className="tax-result">
          <div className="result-summary">
            <div className="summary-item">
              <span>Taxable Profit</span>
              <span>£{result.taxableProfit.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Income Tax</span>
              <span>£{result.incomeTax.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>National Insurance</span>
              <span>£{result.nationalInsurance.toLocaleString()}</span>
            </div>
            {result.studentLoan > 0 && (
              <div className="summary-item">
                <span>Student Loan</span>
                <span>£{result.studentLoan.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-item total">
              <span>Total Tax</span>
              <span>£{result.totalTax.toLocaleString()}</span>
            </div>
            <div className="summary-item take-home">
              <span>You Keep</span>
              <span>£{result.takeHome.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="effective-rate">
            <span>Effective tax rate: <strong>{result.effectiveRate}%</strong></span>
            <span>Monthly take-home: <strong>£{result.monthlyTakeHome.toLocaleString()}</strong></span>
          </div>
          
          <div className="maya-advice">
            <div className="maya-icon">👩🏾‍💼</div>
            <p>{result.mayaExplanation}</p>
          </div>
          
          <div className="tax-tips">
            <h4>💡 Ways to Reduce Your Tax Bill</h4>
            <ul>
              <li><strong>Pension contributions</strong> - reduce taxable income AND build retirement savings</li>
              <li><strong>Claim ALL expenses</strong> - equipment, software, home office, travel, training</li>
              <li><strong>Timing</strong> - buy equipment before tax year end if you need it anyway</li>
              <li><strong>Incorporation</strong> - if earning over £50k, consider limited company</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// EMPLOYMENT COST CALCULATOR
// ============================================

const EmploymentCostCalculator: React.FC = () => {
  const [grossSalary, setGrossSalary] = useState(0);
  const [includePension, setIncludePension] = useState(true);
  const [result, setResult] = useState<EmploymentCostResult | null>(null);
  
  const calculate = () => {
    setResult(calculateEmploymentCost(grossSalary, includePension));
  };
  
  return (
    <div className="employment-calculator">
      <h3>True Cost of Hiring Someone</h3>
      <p className="intro">Thinking of bringing someone on? Here's what it really costs.</p>
      
      <div className="employment-inputs">
        <div className="input-group">
          <label>Annual Salary</label>
          <div className="input-with-prefix">
            <span>£</span>
            <input
              type="number"
              value={grossSalary || ''}
              onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)}
              placeholder="0"
            />
          </div>
        </div>
        
        <div className="input-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={includePension}
              onChange={(e) => setIncludePension(e.target.checked)}
            />
            Include employer pension (3% minimum)
          </label>
        </div>
      </div>
      
      <button className="calculate-btn" onClick={calculate} disabled={grossSalary === 0}>
        Calculate True Cost
      </button>
      
      {result && (
        <div className="employment-result">
          <div className="result-summary">
            <div className="summary-item">
              <span>Gross Salary</span>
              <span>£{result.grossSalary.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Employer's NI (13.8%)</span>
              <span>£{result.employerNI.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span>Pension Contribution</span>
              <span>£{result.pensionContribution.toLocaleString()}</span>
            </div>
            <div className="summary-item total">
              <span>Total Cost to You</span>
              <span>£{result.totalCostToEmployer.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="overhead-rate">
            <span>That's <strong>{result.percentageOverhead}%</strong> more than the salary alone.</span>
          </div>
          
          <div className="maya-advice">
            <div className="maya-icon">👩🏾‍💼</div>
            <p>{result.mayaAdvice}</p>
          </div>
          
          <div className="alternatives">
            <h4>💡 Alternatives to Employment</h4>
            <ul>
              <li><strong>Freelancers/Contractors</strong> - no NI, no pension, but often higher rates</li>
              <li><strong>Revenue share</strong> - pay based on results, align incentives</li>
              <li><strong>Apprenticeships</strong> - lower rates, funding available</li>
              <li><strong>Internships</strong> - but pay at least minimum wage (it's the law)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// PROGRAMME GUIDE COMPONENT
// ============================================

interface ProgrammeGuideProps {
  guide: typeof PROGRAMME_PRICING_GUIDES[ProgrammeId];
}

const ProgrammeGuide: React.FC<ProgrammeGuideProps> = ({ guide }) => {
  return (
    <div className="programme-guide">
      <h3>{guide.icon} {guide.name} Pricing Guide</h3>
      
      <div className="maya-quote">
        <div className="maya-icon">👩🏾‍💼</div>
        <p>"{guide.mayaQuote}"</p>
      </div>
      
      <section className="guide-section">
        <h4>💰 Industry Rates</h4>
        <div className="rates-table">
          <div className="rates-header">
            <span>Service/Product</span>
            <span>Low</span>
            <span>Mid</span>
            <span>High</span>
          </div>
          {guide.industryRates.map((rate, i) => (
            <div key={i} className="rates-row">
              <span>{rate.item}</span>
              <span>£{rate.low}</span>
              <span className="recommended">£{rate.mid}</span>
              <span>£{rate.high}</span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="guide-section">
        <h4>📋 Common Costs</h4>
        <div className="costs-list">
          {guide.commonCosts.map((cost, i) => (
            <div key={i} className="common-cost">
              <span className="cost-name">{cost.label}</span>
              <span className="cost-typical">{cost.typical}</span>
              <span className="cost-category">{cost.category}</span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="guide-section">
        <h4>💡 Pricing Tips</h4>
        <ul className="tips-list">
          {guide.pricingTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>
      
      <section className="guide-section">
        <h4>✅ Tax-Deductible Expenses</h4>
        <p className="deductible-intro">Keep receipts for all of these:</p>
        <div className="deductible-grid">
          {guide.deductibleExpenses.map((expense, i) => (
            <span key={i} className="deductible-item">✓ {expense}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MayaFinancialAdvisor;