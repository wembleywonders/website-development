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
