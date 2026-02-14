export interface LicenseTerms { type: 'exclusive' | 'non-exclusive'; territory: string[]; royaltyRate?: number; duration: { start: string; end?: string }; }
export interface License { id: string; ipAssetId: string; licensee: { id: string; name: string }; terms: LicenseTerms; status: 'draft' | 'active' | 'terminated'; revenueGenerated: number; }
class LicensingService {
  private licenses: Map<string, License> = new Map();
  create(ipAssetId: string, licensee: License['licensee'], terms: LicenseTerms) { const l = { id: `lic-${Date.now()}`, ipAssetId, licensee, terms, status: 'draft' as const, revenueGenerated: 0 }; this.licenses.set(l.id, l); return l; }
  activate(id: string) { const l = this.licenses.get(id); if (l) l.status = 'active'; return !!l; }
  recordRevenue(id: string, amount: number) { const l = this.licenses.get(id); if (l) l.revenueGenerated += amount; return !!l; }
  calculateRoyalty(id: string, sales: number) { const l = this.licenses.get(id); return l?.terms.royaltyRate ? sales * (l.terms.royaltyRate / 100) : 0; }
  get(id: string) { return this.licenses.get(id) || null; }
}
export const licensingService = new LicensingService();
export default licensingService;
