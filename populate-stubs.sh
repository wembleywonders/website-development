#!/bin/bash
BASE="src/services"

echo "🚀 Populating stub services..."

cat > ${BASE}/volunteers/recruitmentService.ts << 'EOF'
export type RecruitmentStage = 'inquiry' | 'application' | 'screening' | 'interview' | 'dbs-check' | 'training' | 'placement' | 'active' | 'inactive' | 'withdrawn';
export type VolunteerRole = 'workshop-facilitator' | 'mentor' | 'event-support' | 'tech-support' | 'admin-support' | 'community-ambassador' | 'safeguarding-lead' | 'programme-coordinator';
export interface VolunteerApplication { id: string; applicantId: string; name: string; email: string; phone: string; preferredRoles: VolunteerRole[]; skills: string[]; stage: RecruitmentStage; submittedAt: string; }
class RecruitmentService {
  private applications: Map<string, VolunteerApplication> = new Map();
  submitApplication(app: Omit<VolunteerApplication, 'id' | 'stage' | 'submittedAt'>): VolunteerApplication {
    const newApp: VolunteerApplication = { ...app, id: `va-${Date.now()}`, stage: 'application', submittedAt: new Date().toISOString() };
    this.applications.set(newApp.id, newApp); return newApp;
  }
  getApplication(id: string) { return this.applications.get(id) || null; }
  getAllApplications() { return Array.from(this.applications.values()); }
  advanceStage(id: string, stage: RecruitmentStage) { const a = this.applications.get(id); if (a) a.stage = stage; return !!a; }
}
export const recruitmentService = new RecruitmentService();
export default recruitmentService;
EOF

cat > ${BASE}/volunteers/programRecruitment.ts << 'EOF'
export type WWProgramme = 'stemgeneers' | 'techreneurs' | 'g-tech-casters' | 'kaywanas-court' | 'pageturners' | 'raydyo' | 'joystick' | 'scrap-cat';
export type ProgrammeRole = 'lead-facilitator' | 'assistant-facilitator' | 'mentor' | 'tech-support' | 'admin-coordinator';
export interface ProgrammeVolunteerNeed { id: string; programme: WWProgramme; role: ProgrammeRole; requiredSkills: string[]; spotsAvailable: number; spotsFilled: number; status: 'open' | 'filled' | 'closed'; }
export interface ProgrammeVolunteer { id: string; volunteerId: string; name: string; programme: WWProgramme; role: ProgrammeRole; hoursContributed: number; }
class ProgramRecruitmentService {
  private needs: Map<string, ProgrammeVolunteerNeed> = new Map();
  private volunteers: Map<string, ProgrammeVolunteer> = new Map();
  createNeed(need: Omit<ProgrammeVolunteerNeed, 'id' | 'spotsFilled' | 'status'>) { const n = { ...need, id: `pvn-${Date.now()}`, spotsFilled: 0, status: 'open' as const }; this.needs.set(n.id, n); return n; }
  getOpenNeeds() { return Array.from(this.needs.values()).filter(n => n.status === 'open'); }
  assignVolunteer(needId: string, volunteerId: string, name: string) { const need = this.needs.get(needId); if (!need) return null; const pv = { id: `pv-${Date.now()}`, volunteerId, name, programme: need.programme, role: need.role, hoursContributed: 0 }; this.volunteers.set(pv.id, pv); need.spotsFilled++; return pv; }
  logHours(pvId: string, hours: number) { const v = this.volunteers.get(pvId); if (v) v.hoursContributed += hours; return !!v; }
}
export const programRecruitmentService = new ProgramRecruitmentService();
export default programRecruitmentService;
EOF

cat > ${BASE}/volunteers/volunteerMatching.ts << 'EOF'
export interface VolunteerProfile { id: string; name: string; skills: { skill: string; level: number }[]; availability: { day: string; time: string }[]; preferences: { preferredRoles: string[]; preferredProgrammes: string[] }; }
export interface Opportunity { id: string; title: string; programme: string; role: string; requiredSkills: { skill: string; minLevel: number }[]; }
export interface MatchResult { volunteer: VolunteerProfile; opportunity: Opportunity; score: number; recommended: boolean; }
class VolunteerMatchingService {
  private volunteers: Map<string, VolunteerProfile> = new Map();
  private opportunities: Map<string, Opportunity> = new Map();
  registerVolunteer(p: VolunteerProfile) { this.volunteers.set(p.id, p); }
  registerOpportunity(o: Opportunity) { this.opportunities.set(o.id, o); }
  findMatches(oppId: string, limit = 10): MatchResult[] {
    const opp = this.opportunities.get(oppId); if (!opp) return [];
    return Array.from(this.volunteers.values()).map(v => {
      const skillMatch = opp.requiredSkills.filter(rs => v.skills.some(vs => vs.skill === rs.skill && vs.level >= rs.minLevel)).length / (opp.requiredSkills.length || 1);
      const prefMatch = v.preferences.preferredRoles.includes(opp.role) ? 0.3 : 0;
      return { volunteer: v, opportunity: opp, score: skillMatch * 0.7 + prefMatch, recommended: skillMatch > 0.5 };
    }).sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
export const volunteerMatchingService = new VolunteerMatchingService();
export default volunteerMatchingService;
EOF

cat > ${BASE}/volunteers/safeguardingService.ts << 'EOF'
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
EOF

cat > ${BASE}/maya/conversation/rovContextDetection.ts << 'EOF'
export type ROVId = 'maya' | 'marketing-coach' | 'portfolio-builder' | 'milestone-coach' | 'client-comms' | 'finance-guide' | 'collab-finder' | 'tech-support' | 'heritage-archivist';
export interface ROVContextResult { detectedROV: ROVId; confidence: number; triggers: string[]; suggestedHandoff: boolean; }
const KEYWORDS: Record<ROVId, string[]> = {
  'maya': ['help', 'hello', 'start'], 'marketing-coach': ['marketing', 'promote', 'brand'], 'portfolio-builder': ['portfolio', 'showcase'],
  'milestone-coach': ['goal', 'progress', 'track'], 'client-comms': ['client', 'email', 'message'], 'finance-guide': ['price', 'money', 'income'],
  'collab-finder': ['collaborate', 'partner'], 'tech-support': ['error', 'broken', 'not working'], 'heritage-archivist': ['heritage', 'caribbean', 'recipe']
};
class ROVContextDetectionService {
  detectContext(message: string): ROVContextResult {
    const msg = message.toLowerCase(); let best: ROVId = 'maya', score = 0, triggers: string[] = [];
    for (const [rov, kws] of Object.entries(KEYWORDS)) { const matches = kws.filter(k => msg.includes(k)); if (matches.length > score) { score = matches.length; best = rov as ROVId; triggers = matches; } }
    return { detectedROV: best, confidence: Math.min(1, score * 0.3), triggers, suggestedHandoff: score > 0 && best !== 'maya' };
  }
}
export const rovContextDetectionService = new ROVContextDetectionService();
export default rovContextDetectionService;
EOF

cat > ${BASE}/maya/conversation/contextDetection.ts << 'EOF'
export type UserIntent = 'question' | 'request' | 'greeting' | 'farewell' | 'complaint' | 'help-seeking' | 'unknown';
export type EmotionalTone = 'positive' | 'negative' | 'neutral' | 'frustrated' | 'confused' | 'urgent';
export interface ContextAnalysis { intent: UserIntent; tone: EmotionalTone; urgency: 'low' | 'medium' | 'high'; topics: string[]; }
class ContextDetectionService {
  analyzeMessage(message: string): ContextAnalysis {
    const msg = message.toLowerCase();
    const intent: UserIntent = /\?/.test(msg) ? 'question' : /please|help|need/.test(msg) ? 'request' : /^(hi|hello|hey)/.test(msg) ? 'greeting' : /bye|thanks/.test(msg) ? 'farewell' : 'unknown';
    const tone: EmotionalTone = /great|amazing|love/.test(msg) ? 'positive' : /bad|terrible|hate/.test(msg) ? 'negative' : /frustrated|annoyed/.test(msg) ? 'frustrated' : /confused|lost/.test(msg) ? 'confused' : 'neutral';
    const urgency = /urgent|asap|emergency/.test(msg) ? 'high' : /soon|quickly/.test(msg) ? 'medium' : 'low';
    const topics: string[] = []; ['stemgeneers', 'techreneurs', 'kaywana', 'pageturners', 'raydyo', 'joystick'].forEach(p => { if (msg.includes(p)) topics.push(p); });
    return { intent, tone, urgency, topics };
  }
}
export const contextDetectionService = new ContextDetectionService();
export default contextDetectionService;
EOF

cat > ${BASE}/maya/conversation/responseHandlers/signpostingHandler.ts << 'EOF'
export interface SignpostResource { id: string; name: string; description: string; category: string; url?: string; phone?: string; tags: string[]; }
const RESOURCES: SignpostResource[] = [
  { id: 'stemgeneers', name: 'STEMgeneers', description: 'STEM education', category: 'programme', tags: ['stem', 'science', 'tech'] },
  { id: 'samaritans', name: 'Samaritans', description: '24/7 emotional support', category: 'emergency', phone: '116 123', tags: ['crisis', 'mental health'] },
  { id: 'citizens-advice', name: 'Citizens Advice Brent', description: 'Free advice', category: 'local', phone: '0800 144 8848', tags: ['advice', 'legal', 'benefits'] }
];
class SignpostingHandlerService {
  findResources(query: string, limit = 5) {
    const q = query.toLowerCase();
    const matched = RESOURCES.filter(r => r.name.toLowerCase().includes(q) || r.tags.some(t => q.includes(t))).slice(0, limit);
    return { matchedResources: matched, suggestedMessage: matched.length ? `Try: ${matched.map(r => r.name).join(', ')}` : 'No matches found' };
  }
  detectCrisis(message: string) { return { isCrisis: /suicide|harm|unsafe|emergency/.test(message.toLowerCase()), severity: 'high' }; }
  getEmergencyResources() { return RESOURCES.filter(r => r.category === 'emergency'); }
}
export const signpostingHandlerService = new SignpostingHandlerService();
export default signpostingHandlerService;
EOF

cat > ${BASE}/intellectual-property/index.ts << 'EOF'
export { inventionDisclosureService } from './inventionDisclosure';
export { patentabilityAssessmentService } from './patentabilityAssessment';
export { revenueShareService } from './revenueShareService';
export { ipStatusTrackerService } from './ipStatusTracker';
export { licensingService } from './licensingService';
EOF

cat > ${BASE}/intellectual-property/inventionDisclosure.ts << 'EOF'
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
EOF

cat > ${BASE}/intellectual-property/patentabilityAssessment.ts << 'EOF'
export type AssessmentResult = 'patentable' | 'potentially-patentable' | 'not-patentable' | 'needs-more-info';
export interface PatentabilityAssessment { id: string; disclosureId: string; criteria: Record<string, { score: number; notes: string }>; result: AssessmentResult; }
class PatentabilityAssessmentService {
  private assessments: Map<string, PatentabilityAssessment> = new Map();
  create(disclosureId: string) { const a = { id: `pa-${Date.now()}`, disclosureId, criteria: { novelty: { score: 0, notes: '' }, 'inventive-step': { score: 0, notes: '' }, 'industrial-applicability': { score: 0, notes: '' } }, result: 'needs-more-info' as AssessmentResult }; this.assessments.set(a.id, a); return a; }
  updateCriteria(id: string, criterion: string, score: number, notes: string) { const a = this.assessments.get(id); if (a) { a.criteria[criterion] = { score, notes }; const avg = Object.values(a.criteria).reduce((s, c) => s + c.score, 0) / 3; a.result = avg >= 7 ? 'patentable' : avg >= 5 ? 'potentially-patentable' : 'not-patentable'; } return !!a; }
  get(id: string) { return this.assessments.get(id) || null; }
}
export const patentabilityAssessmentService = new PatentabilityAssessmentService();
export default patentabilityAssessmentService;
EOF

cat > ${BASE}/intellectual-property/revenueShareService.ts << 'EOF'
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
EOF

cat > ${BASE}/intellectual-property/ipStatusTracker.ts << 'EOF'
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
EOF

cat > ${BASE}/intellectual-property/licensingService.ts << 'EOF'
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
EOF

cat > ${BASE}/venues/partnership-management.ts << 'EOF'
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
EOF

cat > ${BASE}/venues/venue-outreach.ts << 'EOF'
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
EOF

cat > ${BASE}/rovs/index.ts << 'EOF'
export { rovBridgeService } from './ROVBridge';
export { rovCapabilitiesService } from './ROVCapabilities';
export const ROV_REGISTRY = {
  maya: { id: 'maya', name: 'Maya', icon: '🌟' }, 'marketing-coach': { id: 'marketing-coach', name: 'Marketing Coach', icon: '📣' },
  'portfolio-builder': { id: 'portfolio-builder', name: 'Portfolio Builder', icon: '🎨' }, 'milestone-coach': { id: 'milestone-coach', name: 'Milestone Coach', icon: '🎯' },
  'client-comms': { id: 'client-comms', name: 'Client Comms', icon: '💬' }, 'finance-guide': { id: 'finance-guide', name: 'Finance Guide', icon: '💰' },
  'collab-finder': { id: 'collab-finder', name: 'Collab Finder', icon: '🤝' }, 'tech-support': { id: 'tech-support', name: 'Tech Support', icon: '🔧' },
  'heritage-archivist': { id: 'heritage-archivist', name: 'Heritage Archivist', icon: '📜' }
} as const;
EOF

cat > ${BASE}/rovs/ROVBridge.ts << 'EOF'
export type ROVId = 'maya' | 'marketing-coach' | 'portfolio-builder' | 'milestone-coach' | 'client-comms' | 'finance-guide' | 'collab-finder' | 'tech-support' | 'heritage-archivist';
export interface ROVSession { id: string; userId: string; currentROV: ROVId; previousROV?: ROVId; messageCount: number; handoffHistory: { from: ROVId; to: ROVId; timestamp: string }[]; }
const GREETINGS: Record<ROVId, string> = { maya: "Hey! I'm Maya!", 'marketing-coach': "Let's build your brand!", 'portfolio-builder': "Let's showcase your work!", 'milestone-coach': "Let's track your goals!", 'client-comms': "Let's craft your message!", 'finance-guide': "Let's talk pricing!", 'collab-finder': "Let's find partners!", 'tech-support': "Tech troubles? I got you!", 'heritage-archivist': "Let's preserve your heritage!" };
class ROVBridgeService {
  private sessions: Map<string, ROVSession> = new Map();
  startSession(userId: string, rov: ROVId = 'maya') { const s = { id: `s-${Date.now()}`, userId, currentROV: rov, messageCount: 0, handoffHistory: [] }; this.sessions.set(s.id, s); return s; }
  handoff(sessionId: string, toROV: ROVId) { const s = this.sessions.get(sessionId); if (s) { s.handoffHistory.push({ from: s.currentROV, to: toROV, timestamp: new Date().toISOString() }); s.previousROV = s.currentROV; s.currentROV = toROV; } return !!s; }
  getGreeting(rov: ROVId) { return GREETINGS[rov]; }
  getSession(id: string) { return this.sessions.get(id) || null; }
}
export const rovBridgeService = new ROVBridgeService();
export default rovBridgeService;
EOF

cat > ${BASE}/rovs/ROVCapabilities.ts << 'EOF'
export type ROVId = 'maya' | 'marketing-coach' | 'portfolio-builder' | 'milestone-coach' | 'client-comms' | 'finance-guide' | 'collab-finder' | 'tech-support' | 'heritage-archivist';
export interface ROVCapability { id: string; name: string; rovId: ROVId; category: 'information' | 'action' | 'creation' | 'guidance'; }
const CAPABILITIES: ROVCapability[] = [
  { id: 'maya-navigate', name: 'Navigate', rovId: 'maya', category: 'guidance' }, { id: 'marketing-strategy', name: 'Marketing Strategy', rovId: 'marketing-coach', category: 'guidance' },
  { id: 'portfolio-review', name: 'Portfolio Review', rovId: 'portfolio-builder', category: 'action' }, { id: 'milestone-set', name: 'Set Goals', rovId: 'milestone-coach', category: 'action' },
  { id: 'comms-email', name: 'Draft Email', rovId: 'client-comms', category: 'creation' }, { id: 'finance-pricing', name: 'Pricing', rovId: 'finance-guide', category: 'guidance' },
  { id: 'collab-match', name: 'Find Partners', rovId: 'collab-finder', category: 'action' }, { id: 'tech-fix', name: 'Troubleshoot', rovId: 'tech-support', category: 'guidance' },
  { id: 'heritage-recipe', name: 'Record Recipe', rovId: 'heritage-archivist', category: 'creation' }
];
class ROVCapabilitiesService {
  getForROV(rovId: ROVId) { return CAPABILITIES.filter(c => c.rovId === rovId); }
  getByCategory(cat: ROVCapability['category']) { return CAPABILITIES.filter(c => c.category === cat); }
  canHandle(rovId: ROVId, capId: string) { return CAPABILITIES.some(c => c.id === capId && c.rovId === rovId); }
}
export const rovCapabilitiesService = new ROVCapabilitiesService();
export default rovCapabilitiesService;
EOF

echo "✅ All 18 stub services populated!"
