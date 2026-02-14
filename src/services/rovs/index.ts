export { rovBridgeService } from './ROVBridge';
export { rovCapabilitiesService } from './ROVCapabilities';
export const ROV_REGISTRY = {
  maya: { id: 'maya', name: 'Maya', icon: '🌟' }, 'marketing-coach': { id: 'marketing-coach', name: 'Marketing Coach', icon: '📣' },
  'portfolio-builder': { id: 'portfolio-builder', name: 'Portfolio Builder', icon: '🎨' }, 'milestone-coach': { id: 'milestone-coach', name: 'Milestone Coach', icon: '🎯' },
  'client-comms': { id: 'client-comms', name: 'Client Comms', icon: '💬' }, 'finance-guide': { id: 'finance-guide', name: 'Finance Guide', icon: '💰' },
  'collab-finder': { id: 'collab-finder', name: 'Collab Finder', icon: '🤝' }, 'tech-support': { id: 'tech-support', name: 'Tech Support', icon: '🔧' },
  'heritage-archivist': { id: 'heritage-archivist', name: 'Heritage Archivist', icon: '📜' }
} as const;
