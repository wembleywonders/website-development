export interface RevenueShare { id: string; prototypeId: string; totalAmount: number; splits: { recipientId: string; percentage: number; amount: number; status: 'pending' | 'paid' }[]; createdAt: string; }
class RevenueShareService {
  private shares: Map<string, RevenueShare> = new Map();
  private SPLIT = { creator: 0.55, community: 0.25, platform: 0.20 };
  calculateSplit(prototypeId: string, total: number, creatorId: string) { const s = { id: `rs-${Date.now()}`, prototypeId, totalAmount: total, splits: [{ recipientId: creatorId, percentage: 55, amount: total * this.SPLIT.creator, status: 'pending' as const }, { recipientId: 'community-fund', percentage: 25, amount: total * this.SPLIT.community, status: 'pending' as const }, { recipientId: 'platform', percentage: 20, amount: total * this.SPLIT.platform, status: 'pending' as const }], createdAt: new Date().toISOString() }; this.shares.set(s.id, s); return s; }
  processPayouts(id: string) { const s = this.shares.get(id); if (s) s.splits.forEach(sp => sp.status = 'paid'); return !!s; }
  getCreatorEarnings(creatorId: string) { return Array.from(this.shares.values()).flatMap(s => s.splits).filter(sp => sp.recipientId === creatorId && sp.status === 'paid').reduce((sum, sp) => sum + sp.amount, 0); }
}
export const revenueShareService = new RevenueShareService();
export default revenueShareService;
