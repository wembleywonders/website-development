export namespace BusinessROVTypes {
  export interface BusinessROVProps {
    onSponsorshipInquiry: (tier: 'bronze' | 'silver' | 'gold') => void;
    currentStep: string;
    businessData?: Record<string, unknown>;
  }
}
