// src/services/maya/conversation/types.ts
export interface ROVResponse {
  text: string;
  expression: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  personality: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
}

export interface PageTemplateContext {
  pageType?: 'standard' | 'shop' | 'programme' | 'community' | 'framework';
  pageTitle?: string;
  contentType?: string;
  actionType?: string;
}

export type QuickActionType = 
  | 'capabilities' | 'navigation'
  | 'shop_guide' | 'local_business' | 'creator_info'
  | 'programme_match' | 'skills_guide' | 'workshop_info'
  | 'community_help' | 'involvement_guide' | 'hub_info'
  | 'framework_guide' | 'org_structure' | 'governance_info'
  | 'membership_info' | 'member_dashboard' | 'application_guide';

export type PageType = 'standard' | 'shop' | 'programme' | 'community' | 'framework';
export type MembershipTier = 'visitor' | 'membership' | 'connector' | 'curator' | 'champion' | 'apply';