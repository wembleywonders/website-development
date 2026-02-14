// src/components/finance/types/finance.ts
// Shared types for Creator Finance Suite

// ============================================
// TAX TYPES
// ============================================

export interface TaxBand {
  name: string;
  threshold: number;
  rate: number;
}

export interface TaxYearConfig {
  year: string;
  personalAllowance: number;
  personalAllowanceLimit: number;
  basicRateThreshold: number;
  higherRateThreshold: number;
  additionalRateThreshold: number;
  basicRate: number;
  higherRate: number;
  additionalRate: number;
  class2NIWeekly: number;
  class2NIThreshold: number;
  class4NILowerThreshold: number;
  class4NIUpperThreshold: number;
  class4NIRate: number;
  class4NIUpperRate: number;
  studentLoanPlan1Threshold: number;
  studentLoanPlan2Threshold: number;
  studentLoanRate: number;
}

export interface TaxCalculation {
  grossIncome: number;
  expenses: number;
  profit: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  class2NI: number;
  class4NI: number;
  studentLoan: number;
  totalTax: number;
  effectiveRate: number;
  takeHome: number;
  monthlySetAside: number;
  weeklySetAside: number;
  breakdown: TaxBreakdownItem[];
}

export interface TaxBreakdownItem {
  label: string;
  amount: number;
  type: 'income' | 'deduction' | 'tax' | 'subtotal' | 'total';
  note?: string;
}

// ============================================
// PENSION TYPES
// ============================================

export interface PensionProjection {
  age: number;
  year: number;
  contributions: number;
  employerMatch: number;
  growth: number;
  totalValue: number;
}

export interface PensionScenario {
  name: string;
  monthlyContribution: number;
  annualContribution: number;
  projectedPot: number;
  monthlyIncome: number;
  annualIncome: number;
  taxRelief: number;
  actualCost: number;
}

export interface PensionSettings {
  currentAge: number;
  retirementAge: number;
  currentPot: number;
  monthlyContribution: number;
  employerMatch: number;
  expectedGrowthRate: number;
  inflationRate: number;
  annuityRate: number;
}

// ============================================
// INVOICE TYPES
// ============================================

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceClient {
  name: string;
  email: string;
  address?: string;
  company?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  createdAt: Date;
  dueDate: Date;
  client: InvoiceClient;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  vatRate?: number;
  vatAmount?: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
  paymentTerms: '0' | '7' | '14' | '30';
  bankDetails: BankDetails;
  autoSetAside: SetAsideConfig;
}

export interface BankDetails {
  accountName: string;
  sortCode: string;
  accountNumber: string;
  bankName?: string;
  reference?: string;
}

export interface SetAsideConfig {
  enabled: boolean;
  taxPercent: number;
  niPercent: number;
  pensionPercent: number;
  holidayPercent: number;
  sickPayAmount: number;
}

// ============================================
// EXPENSE TYPES
// ============================================

export type ExpenseCategory = 
  | 'supplies'
  | 'travel'
  | 'software'
  | 'equipment'
  | 'phone'
  | 'internet'
  | 'home-office'
  | 'marketing'
  | 'professional-services'
  | 'insurance'
  | 'training'
  | 'meals'
  | 'other';

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: ExpenseCategory;
  description: string;
  supplier?: string;
  receiptUrl?: string;
  receiptFile?: File;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
  notes?: string;
  taxDeductible: boolean;
  deductiblePercent: number;
}

export interface ExpenseSummary {
  totalExpenses: number;
  byCategory: Record<ExpenseCategory, number>;
  taxDeductible: number;
  nonDeductible: number;
  monthlyAverage: number;
}

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; icon: string; defaultDeductible: number }> = {
  'supplies': { label: 'Supplies & Materials', icon: '🛒', defaultDeductible: 100 },
  'travel': { label: 'Travel & Transport', icon: '🚗', defaultDeductible: 100 },
  'software': { label: 'Software & Subscriptions', icon: '💻', defaultDeductible: 100 },
  'equipment': { label: 'Equipment', icon: '🎛️', defaultDeductible: 100 },
  'phone': { label: 'Phone & Mobile', icon: '📱', defaultDeductible: 50 },
  'internet': { label: 'Internet', icon: '🌐', defaultDeductible: 50 },
  'home-office': { label: 'Home Office', icon: '🏠', defaultDeductible: 100 },
  'marketing': { label: 'Marketing & Advertising', icon: '📢', defaultDeductible: 100 },
  'professional-services': { label: 'Professional Services', icon: '👔', defaultDeductible: 100 },
  'insurance': { label: 'Insurance', icon: '🛡️', defaultDeductible: 100 },
  'training': { label: 'Training & Education', icon: '📚', defaultDeductible: 100 },
  'meals': { label: 'Meals & Entertainment', icon: '🍽️', defaultDeductible: 50 },
  'other': { label: 'Other', icon: '📦', defaultDeductible: 100 },
};

// ============================================
// SICK PAY CIRCLE TYPES
// ============================================

export interface SickPayCircle {
  id: string;
  name: string;
  memberCount: number;
  monthlyContribution: number;
  weeklyBenefit: number;
  maxWeeksPerYear: number;
  waitingPeriodMonths: number;
  currentPot: number;
  reserveFund: number;
}

export interface SickPayMembership {
  odUserId: string;
  odCircleId: string;
  joinedAt: Date;
  status: 'pending' | 'active' | 'suspended' | 'cancelled';
  contributionsPaid: number;
  claimsUsed: number;
  claimsRemaining: number;
  nextContributionDue: Date;
}

export interface SickPayClaim {
  id: string;
  odMembershipId: string;
  startDate: Date;
  endDate?: Date;
  reason: string;
  weeksRequested: number;
  weeksPaid: number;
  amountPaid: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  selfCertified: boolean;
  doctorsNote?: string;
}

// ============================================
// HOLIDAY FUND TYPES
// ============================================

export interface HolidayFund {
  balance: number;
  dailyRate: number;
  daysAvailable: number;
  targetDays: number;
  monthlyContribution: number;
  bookedDays: HolidayBooking[];
}

export interface HolidayBooking {
  id: string;
  startDate: Date;
  endDate: Date;
  days: number;
  paid: boolean;
  paidAmount: number;
}

// ============================================
// FINANCE DASHBOARD TYPES
// ============================================

export interface FinanceSummary {
  currentMonth: {
    grossIncome: number;
    expenses: number;
    netIncome: number;
    taxSetAside: number;
    pensionContributed: number;
    holidayFundContributed: number;
    spendableIncome: number;
  };
  yearToDate: {
    grossIncome: number;
    expenses: number;
    profit: number;
    taxDue: number;
    taxPaid: number;
    taxOwed: number;
  };
  pots: {
    tax: { balance: number; target: number; onTrack: boolean };
    holiday: { balance: number; daysAvailable: number };
    pension: { balance: number; monthlyContribution: number };
    sickPay: { weeksAvailable: number; memberSince: Date | null };
  };
  upcomingDeadlines: FinanceDeadline[];
  alerts: FinanceAlert[];
}

export interface FinanceDeadline {
  id: string;
  title: string;
  date: Date;
  type: 'tax' | 'vat' | 'pension' | 'insurance' | 'other';
  amount?: number;
  urgent: boolean;
}

export interface FinanceAlert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    handler: () => void;
  };
  dismissible: boolean;
}

// ============================================
// MAYA CONVERSATION TYPES
// ============================================

export type MayaFinanceTopic = 
  | 'tax-overview'
  | 'tax-saving'
  | 'pension-start'
  | 'pension-increase'
  | 'holiday-fund'
  | 'sick-pay'
  | 'expense-tracking'
  | 'invoice-help'
  | 'deadline-reminder'
  | 'general-advice';

export interface MayaFinancePrompt {
  topic: MayaFinanceTopic;
  trigger: 'automatic' | 'user-initiated' | 'contextual';
  context?: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface MayaFinanceResponse {
  message: string;
  suggestions?: string[];
  actions?: MayaAction[];
  followUp?: MayaFinancePrompt;
}

export interface MayaAction {
  id: string;
  label: string;
  type: 'link' | 'modal' | 'function';
  target: string;
  primary?: boolean;
}