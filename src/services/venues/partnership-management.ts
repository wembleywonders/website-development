export type PartnershipStatus = 'prospective' | 'negotiating' | 'active' | 'paused' | 'ended';
export interface VenuePartnership { id: string; venueName: string; status: PartnershipStatus; contact: { name: string; email: string }; bookings: { date: string; programme: string; attendees: number }[]; }
class PartnershipManagementService {
  private partnerships: Map<string, VenuePartnership> = new Map();
  create(venueName: string, contact: VenuePartnership['contact']) { const p = { id: `vp-${Date.now()}`, venueName, status: 'prospective' as PartnershipStatus, contact, bookings: [] }; this.partnerships.set(p.id, p); return p; }
  updateStatus(id: string, status: PartnershipStatus) { const p = this.partnerships.get(id); if (p) p.status = status; return !!p; }
  recordBooking(id: string, date: string, programme: string, attendees: number) { const p = this.partnerships.get(id); if (p) p.bookings.push({ date, programme, attendees }); return !!p; }
  getActive() { return Array.from(this.partnerships.values()).filter(p => p.status === 'active'); }
  getTotalAttendees(id: string) { return this.partnerships.get(id)?.bookings.reduce((s, b) => s + b.attendees, 0) || 0; }
}
export const partnershipManagementService = new PartnershipManagementService();
export default partnershipManagementService;
