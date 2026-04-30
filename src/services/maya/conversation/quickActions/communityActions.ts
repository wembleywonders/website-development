// src/services/maya/conversation/quickActions/communityActions.ts
import { ROVResponse, MembershipTier } from '../types';

export class CommunityActionsHandler {
  
  static handleCommunityHelp(): ROVResponse {
    return {
      text: "**Community Support Options**\n\nWe provide direct support and connections to wider services:\n\n**Direct Support:**\n• Digital skills training\n• Equipment lending library\n• Community workspace access\n• Mentoring and guidance\n\n**Connected Services:**\n• Housing advice and advocacy\n• Benefits and financial guidance\n• Healthcare navigation\n• Employment support\n• Legal advice connections\n\n**Community Resources:**\n• Local community hubs\n• Cultural and faith organizations\n• Mutual aid networks\n• Emergency response coordination\n\n**Crisis Support:**\nIf you need immediate help with housing, benefits, health, or safety, I can connect you directly with appropriate services.\n\n**How to Access:**\n• Drop-in during weekday hours\n• Contact our team directly\n• Attend community events\n• Join as a member for ongoing support\n\nWhat type of support would be most helpful right now?",
      expression: 'helpful',
      personality: 'helper'
    };
  }

  static handleInvolvementGuide(): ROVResponse {
    return {
      text: "**Ways to Get Involved**\n\nJoin us in building community wealth in Wembley:\n\n**As a Participant:**\n• Attend workshops and programmes\n• Use our community resources\n• Connect with neighbors and peers\n\n**As a Volunteer:**\n• Support workshop facilitation\n• Help with community events\n• Mentor new participants\n• Administrative and technical tasks\n\n**As a Member:**\n• Vote on community priorities\n• Access member-only resources\n• Reduced fees for programmes\n• Enhanced networking opportunities\n\n**As a Community Partner:**\n• Collaborate on local initiatives\n• Provide work experience opportunities\n• Share expertise and resources\n• Co-create community solutions\n\n**Getting Started:**\n1. Visit us or attend an event\n2. Explore what interests you most\n3. Start with volunteer or participant roles\n4. Consider membership as you get more involved\n\nWhat type of involvement appeals to you?",
      expression: 'excited',
      personality: 'helper'
    };
  }

  static handleHubInfo(): ROVResponse {
    return {
      text: "**Local Community Hubs**\n\nWembley has several community spaces and organizations:\n\n**Wembley Wonders Base:**\n• 452 High Road, Wembley HA9 7AY\n• Open weekdays 9am-5pm\n• Digital skills training and community workspace\n\n**Partner Organizations:**\n• Local libraries with community programmes\n• Cultural centers and faith-based organizations\n• Residents' associations and community groups\n• Youth centers and after-school programmes\n\n**Services Available:**\n• Meeting spaces for community groups\n• Computer and internet access\n• Skills training and workshops\n• Advice and support services\n• Cultural events and celebrations\n\n**Community Networks:**\n• Mutual aid groups for practical support\n• Cultural associations for specific communities\n• Residents' groups for local issues\n• Interest-based clubs and societies\n\nFor specific hub information or to connect with local groups, contact Judith Fontanelle (contact@wembleywonders.org). What type of community connection are you looking for?",
      expression: 'helpful',
      personality: 'helper'
    };
  }
}