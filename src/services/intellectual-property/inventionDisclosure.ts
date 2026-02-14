export type DisclosureStatus = 'draft' | 'submitted' | 'approved' | 'rejected';
export interface InventorInfo { id: string; name: string; contributionPercentage: number; signed: boolean; }
export interface InventionDisclosure { id: string; title: string; abstract: string; inventors: InventorInfo[]; status: DisclosureStatus; createdAt: string; }
class InventionDisclosureService {
  private disclosures: Map<string, InventionDisclosure> = new Map();
  create(creatorId: string, creatorName: string, title: string) { const d = { id: `idf-${Date.now()}`, title, abstract: '', inventors: [{ id: creatorId, name: creatorName, contributionPercentage: 100, signed: false }], status: 'draft' as DisclosureStatus, createdAt: new Date().toISOString() }; this.disclosures.set(d.id, d); return d; }
  get(id: string) { return this.disclosures.get(id) || null; }
  submit(id: string) { const d = this.disclosures.get(id); if (d && d.title && d.abstract && d.inventors.every(i => i.signed)) { d.status = 'submitted'; return { success: true }; } return { success: false, errors: ['Missing fields or signatures'] }; }
}
export const inventionDisclosureService = new InventionDisclosureService();
export default inventionDisclosureService;
