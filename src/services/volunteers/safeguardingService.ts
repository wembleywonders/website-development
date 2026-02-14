export type DBSStatus = 'not-required' | 'required' | 'pending' | 'completed' | 'expired';
export interface SafeguardingRecord { id: string; personId: string; personName: string; dbsStatus: DBSStatus; trainingCompleted: boolean; incidents: string[]; }
export interface SafeguardingIncident { id: string; reportedBy: string; severity: 'low' | 'medium' | 'high' | 'critical'; description: string; status: 'reported' | 'investigating' | 'resolved'; }
class SafeguardingService {
  private records: Map<string, SafeguardingRecord> = new Map();
  private incidents: Map<string, SafeguardingIncident> = new Map();
  createRecord(personId: string, personName: string) { const r = { id: `sg-${Date.now()}`, personId, personName, dbsStatus: 'not-required' as DBSStatus, trainingCompleted: false, incidents: [] }; this.records.set(personId, r); return r; }
  getRecord(personId: string) { return this.records.get(personId) || null; }
  updateDBS(personId: string, status: DBSStatus) { const r = this.records.get(personId); if (r) r.dbsStatus = status; return !!r; }
  reportIncident(incident: Omit<SafeguardingIncident, 'id' | 'status'>) { const i = { ...incident, id: `inc-${Date.now()}`, status: 'reported' as const }; this.incidents.set(i.id, i); return i; }
  canWorkWithChildren(personId: string) { const r = this.records.get(personId); return r ? r.dbsStatus === 'completed' && r.trainingCompleted : false; }
}
export const safeguardingService = new SafeguardingService();
export default safeguardingService;
