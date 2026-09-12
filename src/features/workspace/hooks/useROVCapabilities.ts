// src/features/workspace/hooks/useROVCapabilities.ts
//
// CORRECTED 15 Aug 2026: the previous version (June 2026 draft, applied
// without verification) called rovCapabilitiesService.canFullyAutomate()
// and .needsHumanApproval() — NEITHER exists on the real service, and the
// underlying ROVCapability shape has no automation-level field for either
// concept to check. That version would have thrown at runtime. Rewritten
// to match the real, confirmed exports of src/services/rovs/ROVCapabilities.ts:
// getForROV(rovId), getByCategory(category), canHandle(rovId, capId).
//
// NOTE: if a consumer of this hook genuinely needs an automation-level
// distinction (can this capability run unattended vs needs human sign-off),
// that requires adding a field to ROVCapability itself first — that's a
// separate, larger change to the service, not something this hook can
// paper over. Flag if that's actually needed.
//
// Also worth knowing: ROVId here — maya, marketing-coach, portfolio-builder,
// milestone-coach, client-comms, finance-guide, collab-finder, tech-support,
// heritage-archivist — is a third, independent ROV naming scheme, distinct
// from both the 24-character roster and the 9-archetype ROVsPage.tsx system.
// See the ROV naming collision entry in the outstanding-tasks tracker.

import { useMemo } from 'react';
import rovCapabilitiesService, {
  type ROVId,
  type ROVCapability,
} from '../../../services/rovs/ROVCapabilities';

export function useROVCapabilities(rovId: ROVId) {
  return useMemo(() => {
    const capabilities = rovCapabilitiesService.getForROV(rovId);

    return {
      capabilities,
      canHandle: (capId: string) => rovCapabilitiesService.canHandle(rovId, capId),
      getByCategory: (category: ROVCapability['category']) =>
        rovCapabilitiesService.getByCategory(category).filter((c) => c.rovId === rovId),
    };
  }, [rovId]);
}