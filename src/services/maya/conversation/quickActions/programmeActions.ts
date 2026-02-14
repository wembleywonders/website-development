// src/services/maya/conversation/quickActions/programmeActions.ts
import { ROVResponse, MembershipTier } from '../types';

export class ProgrammeActionsHandler {
  
  static handleProgrammeMatching(): ROVResponse {
    return {
      text: "**Find Your Programme Match**\n\n**Tell me about your interests:**\n\n**Creative & Media (Trubble n Bass)**\n• Music production and audio\n• Video content creation\n• Digital storytelling\n\n**Drama & Performance (Kaywana's Court)**\n• Acting and performance skills\n• Community theatre\n• Cultural expression\n\n**STEM & Enterprise (Bright Sparks)**\n• Coding and web development\n• Business and entrepreneurship\n• Technical problem-solving\n\n**Heritage & Community**\n• Cultural preservation\n• Community organizing\n• Local history projects\n\nWhat sparks your interest? I can provide detailed information about pathways and next steps!",
      expression: 'helpful',
      personality: 'pathfinder'
    };
  }

  static handleSkillsGuide(): ROVResponse {
    return {
      text: "**Skills Development Pathways**\n\nOur approach builds both individual skills and community wealth:\n\n**Digital Literacy Foundation**\n• Computer basics and internet safety\n• Email and digital communication\n• Online services and resources\n\n**Creative Skills**\n• Content creation tools\n• Design and multimedia\n• Performance and presentation\n\n**Technical Skills**\n• Coding and web development\n• Digital marketing\n• Equipment operation\n\n**Enterprise Skills**\n• Business planning\n• Financial literacy\n• Customer service\n\n**Community Leadership**\n• Project management\n• Public speaking\n• Mentoring and coaching\n\n**Progression Routes:**\nVisitor → Member → Connector → Curator → Champion\n\nEach level unlocks new opportunities and responsibilities. Which skills interest you most?",
      expression: 'helpful',
      personality: 'pathfinder'
    };
  }

  static handleWorkshopInfo(): ROVResponse {
    return {
      text: "**Workshop Schedule Information**\n\nWe run seasonal programmes with regular workshops:\n\n**Current Format:**\n• **Quarterly themes** - Different focus each season\n• **Weekly sessions** - Regular skill-building meetings\n• **Community showcases** - Celebrate achievements\n• **Flexible participation** - Join at your level\n\n**Typical Workshop Structure:**\n• Introduction and goal-setting\n• Hands-on learning activities\n• Peer collaboration time\n• Project development support\n• Reflection and next steps\n\n**Accessibility:**\n• All skill levels welcome\n• Equipment provided\n• Multiple time slots available\n• Childcare support where possible\n\nFor current workshop schedules and booking, contact Judith Fontanelle (contact@wembleywonders.org, 0208 902 9991). What type of workshops interest you?",
      expression: 'helpful',
      personality: 'pathfinder'
    };
  }
}