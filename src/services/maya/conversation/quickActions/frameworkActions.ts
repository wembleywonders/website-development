// src/services/maya/conversation/quickActions/frameworkActions.ts
import { ROVResponse, MembershipTier } from '../types';

export class FrameworkActionsHandler {
  
  static handleFrameworkGuide(): ROVResponse {
    return {
      text: "**The 5C Framework Explained**\n\nOur community development approach:\n\n**1. Create**\n• Develop individual skills and talents\n• Produce content, products, and services\n• Build something meaningful for the community\n\n**2. Connect**\n• Network with peers and mentors\n• Link different community groups\n• Bridge skills and opportunities\n\n**3. Cultivate**\n• Grow sustainable community resources\n• Develop local leadership capacity\n• Nurture long-term relationships\n\n**4. Compete**\n• Showcase skills and achievements\n• Apply for opportunities and funding\n• Demonstrate community impact\n\n**5. Champion**\n• Advocate for community needs\n• Lead initiatives and support others\n• Represent community interests\n\n**How It Works:**\nEach person progresses through these elements, building individual capacity while strengthening community wealth. Everyone contributes according to their abilities and benefits according to their needs.\n\nWhich aspect of the framework interests you most?",
      expression: 'helpful',
      personality: 'insight'
    };
  }

  static handleOrgStructure(): ROVResponse {
    return {
      text: "**How Wembley Wonders is Organized**\n\n**Legal Structure:**\n• Community Interest Company (CIC)\n• Asset lock protects community resources\n• Regulated for social benefit, not private profit\n\n**Governance Structure:**\n• Community members have voting rights\n• Board includes community representatives\n• Transparent decision-making processes\n• Regular community meetings and consultations\n\n**Team Structure:**\n• **Directors:** Strategic leadership and oversight\n• **Staff:** Day-to-day operations and programme delivery\n• **Volunteers:** Community support and specialist skills\n• **Members:** Active participants with governance rights\n\n**Community Ownership:**\n• Assets belong to the community\n• Surpluses reinvested in programmes\n• Democratic participation in major decisions\n• Local control of resources and priorities\n\n**Accountability:**\n• Annual reports to community and regulators\n• Open financial records\n• Regular community feedback sessions\n• External evaluation and improvement\n\nWant to know more about any specific aspect of how we operate?",
      expression: 'helpful',
      personality: 'insight'
    };
  }

  static handleGovernanceInfo(): ROVResponse {
    return {
      text: "**How We Share Power**\n\n**Democratic Participation:**\n• All members have voting rights on major decisions\n• Regular community assemblies for input and feedback\n• Open board meetings with community representation\n• Transparent consultation on strategic changes\n\n**Decision-Making Levels:**\n• **Community Assembly:** Major strategic decisions, budget priorities\n• **Board:** Operational oversight, policy implementation\n• **Staff Team:** Day-to-day programme delivery\n• **Working Groups:** Specific project development and delivery\n\n**Community Representation:**\n• Board includes elected community representatives\n• Working groups open to all interested members\n• Regular surveys and feedback collection\n• Community advocates for different groups and interests\n\n**Power Distribution:**\n• No individual or small group controls all decisions\n• Resources allocated based on community priorities\n• Leadership roles rotated and shared\n• Transparency in all financial and operational matters\n\n**Your Role:**\n• Members can propose initiatives and vote on priorities\n• Volunteers can join working groups and influence delivery\n• Everyone can attend community meetings and voice opinions\n\nInterested in getting more involved in community governance?",
      expression: 'helpful',
      personality: 'insight'
    };
  }
}