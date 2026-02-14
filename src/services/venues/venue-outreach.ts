export type OutreachStatus = 'identified' | 'contacted' | 'responded' | 'converted' | 'declined';
export interface VenueProspect { id: string; name: string; type: string; address: string; postcode: string; status: OutreachStatus; outreachHistory: { date: string; action: string }[]; priority: 'low' | 'medium' | 'high'; }
class VenueOutreachService {
  private prospects: Map<string, VenueProspect> = new Map();
  add(name: string, type: string, address: string, postcode: string) { const p = { id: `vpr-${Date.now()}`, name, type, address, postcode, status: 'identified' as OutreachStatus, outreachHistory: [], priority: 'medium' as const }; this.prospects.set(p.id, p); return p; }
  recordOutreach(id: string, action: string) { const p = this.prospects.get(id); if (p) { p.outreachHistory.push({ date: new Date().toISOString(), action }); if (action.includes('contact')) p.status = 'contacted'; } return !!p; }
  updateStatus(id: string, status: OutreachStatus) { const p = this.prospects.get(id); if (p) p.status = status; return !!p; }
  getByStatus(status: OutreachStatus) { return Array.from(this.prospects.values()).filter(p => p.status === status); }
  getByPostcode(prefix: string) { return Array.from(this.prospects.values()).filter(p => p.postcode.toUpperCase().startsWith(prefix.toUpperCase())); }
}
export const venueOutreachService = new VenueOutreachService();
export default venueOutreachService;
