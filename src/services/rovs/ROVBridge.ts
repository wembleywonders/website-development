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
