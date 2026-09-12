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
