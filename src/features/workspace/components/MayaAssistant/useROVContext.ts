// features/workspace/components/MayaAssistant/useROVContext.ts (NEW)

import { useLocation } from 'react-router-dom';
import { useProjectStore } from '@/features/workspace/stores/projectStore';
import { ROV_REGISTRY } from '@/services/rovs/ROVRegistry';

// derive a type for ROV entries from the registry values
type ROVProfile = typeof ROV_REGISTRY[keyof typeof ROV_REGISTRY];

// derive specific context union types from the ROVProfile shape
type CreatorSpace = ROVProfile['contexts'] extends { creatorSpaces?: (infer C)[] } ? C : string;
type PipelineStage = ROVProfile['contexts'] extends { pipelineStages?: (infer P)[] } ? P : string;
type ProjectType = ROVProfile['contexts'] extends { projectTypes?: (infer T)[] } ? T : string;

export interface ROVContext {
  activeROVs: ROVProfile[];
  primaryROV: ROVProfile | null;
  creatorSpace: CreatorSpace | null;
  pipelineStage: PipelineStage | null;
  projectType: ProjectType | null;
}

export default function useROVContext(): ROVContext {
  // read router location and current project from the store
  const location = useLocation();
  const currentProject = useProjectStore(state => state.currentProject);

  // Detect Creator Space from route
  const creatorSpace: CreatorSpace | null = detectCreatorSpace(location.pathname) as CreatorSpace | null;
  
  // Type guard to check for stage property on project
  function hasStage(p: any): p is { stage: string } {
    return p && typeof p.stage === 'string';
  }
  
  // Detect Pipeline Stage from project or route
  const pipelineStage: PipelineStage | null = hasStage(currentProject)
    ? (currentProject.stage as PipelineStage)
    : (detectPipelineStage(location.pathname) as PipelineStage | null);
  
  // Get project type (ensure typed as ProjectType | null)
  const projectType: ProjectType | null = typeof currentProject?.type === 'string'
    ? (currentProject?.type as unknown as ProjectType)
    : null;
  
  // Find matching ROVs
  const activeROVs = Object.values(ROV_REGISTRY).filter(rov => {
    const matchesSpace = !rov.contexts.creatorSpaces || 
      (creatorSpace !== null && rov.contexts.creatorSpaces.includes(creatorSpace));
    const matchesStage = !rov.contexts.pipelineStages || 
      (pipelineStage !== null && rov.contexts.pipelineStages.includes(pipelineStage));
    const matchesType = !rov.contexts.projectTypes || 
      (projectType !== null && rov.contexts.projectTypes.includes(projectType));
    
    return matchesSpace || matchesStage || matchesType;
  });
  
  // Determine primary ROV (stage guide takes precedence, then guild mentor)
  const primaryROV = activeROVs.find(r => r.role === 'stage-guide') ||
                     activeROVs.find(r => r.role === 'guild-mentor') ||
                     activeROVs[0] || null;
  
  return {
    activeROVs,
    primaryROV,
    creatorSpace,
    pipelineStage,
    projectType
  };
}

function detectCreatorSpace(pathname: string): string | null {
  const spaceMap: Record<string, string> = {
    '/programmes/stemgeneers': 'stemgeneers',
    '/programmes/techreneurs': 'techreneurs',
    '/programmes/pageturners': 'pageturners',
    '/programmes/gtechcasters': 'gtechcasters',
    '/programmes/silk-stilettos': 'silk-stilettos',
    '/programmes/kaywanas-court': 'kaywanas-court',
  };
  
  for (const [path, space] of Object.entries(spaceMap)) {
    if (pathname.startsWith(path)) return space;
  }
  return null;
}

function detectPipelineStage(pathname: string): string | null {
  if (pathname.includes('/sandbox')) return 'sandbox';
  if (pathname.includes('/journal') || pathname.includes('/creators-journal')) return 'journal';
  if (pathname.includes('/impact-lab') || pathname.includes('/studio')) return 'impact-lab';
  if (pathname.includes('/certification') || pathname.includes('/provenance')) return 'certification';
  if (pathname.includes('/cyberstore') || pathname.includes('/marketplace')) return 'cyberstore';
  return null;
}
