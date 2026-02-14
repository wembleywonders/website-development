export type IPStatus = 'unprotected' | 'disclosed' | 'filed' | 'granted' | 'expired';
export interface IPAsset { id: string; prototypeId: string; type: 'patent' | 'trademark' | 'copyright'; title: string; status: IPStatus; filingNumber?: string; timeline: { date: string; event: string }[]; }
class IPStatusTrackerService {
  private assets: Map<string, IPAsset> = new Map();
  create(prototypeId: string, type: IPAsset['type'], title: string) { const a = { id: `ip-${Date.now()}`, prototypeId, type, title, status: 'unprotected' as IPStatus, timeline: [{ date: new Date().toISOString(), event: 'Created' }] }; this.assets.set(a.id, a); return a; }
  updateStatus(id: string, status: IPStatus) { const a = this.assets.get(id); if (a) { a.status = status; a.timeline.push({ date: new Date().toISOString(), event: `Status: ${status}` }); } return !!a; }
  recordFiling(id: string, filingNumber: string) { const a = this.assets.get(id); if (a) { a.filingNumber = filingNumber; a.status = 'filed'; a.timeline.push({ date: new Date().toISOString(), event: `Filed: ${filingNumber}` }); } return !!a; }
  get(id: string) { return this.assets.get(id) || null; }
}
export const ipStatusTrackerService = new IPStatusTrackerService();
export default ipStatusTrackerService;
