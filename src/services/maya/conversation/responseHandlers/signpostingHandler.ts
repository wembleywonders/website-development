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
