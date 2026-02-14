// src/services/maya/conversation/quickActions/generalActions.ts
import { ROVResponse, MembershipTier, PageType } from '../types';

export class GeneralActionsHandler {
  
  static handleNavigationHelp(pageType?: PageType): ROVResponse {
    const pageSpecificHelp = {
      shop: "You're in our Community Shop section. Here you can find local businesses, creator products, and support community commerce.",
      programme: "This is our Programmes section where you can explore learning pathways, seasonal workshops, and skill development opportunities.",
      community: "You're viewing community support and engagement options, including ways to get involved and find local resources.",
      framework: "This section explains how Wembley Wonders operates, our governance structure, and community ownership model."
    };

    const generalHelp = pageSpecificHelp[pageType as keyof typeof pageSpecificHelp] || 
                       "I can help you navigate around the site. Use the main menu to explore different sections, or ask me about specific topics you're interested in.";

    return {
      text: `**Navigation Help**\n\n${generalHelp}\n\n**Main sections:**\n• **Home** - Overview and latest updates\n• **Programmes** - Learning and development opportunities\n• **Community** - Support services and engagement\n• **Shop** - Local business directory and creator marketplace\n• **About** - Our story, team, and how we work\n\nWhat specific area would you like to explore?`,
      expression: 'helpful',
      personality: 'helper'
    };
  }

  static handleMembershipInfo(): ROVResponse {
    return {
      text: "**Membership Benefits**\n\nJoin our community and help build local wealth:\n\n**Member Advantages:**\n• Reduced fees for all programmes and workshops\n• Priority booking for popular sessions\n• Access to member-only events and networking\n• Voting rights on community priorities\n• Free equipment lending from our library\n\n**Membership Tiers:**\n• **Basic Member:** £10/month - Core benefits and community access\n• **Supporting Member:** £25/month - Enhanced resources and priority support\n• **Champion Member:** £50/month - Leadership opportunities and advanced programmes\n\n**Community Investment:**\n• Your membership fees stay in the local community\n• Direct investment in expanding programmes and resources\n• Supporting other community members through sliding scale fees\n• Building assets that benefit everyone long-term\n\n**Getting Started:**\n• Attend a community event or visit our space\n• Meet with staff to discuss your interests and needs\n• Choose the membership level that works for you\n• Start participating in programmes and community activities\n\nReady to become a member? Contact us to arrange a welcome meeting!",
      expression: 'helpful',
      personality: 'helper'
    };
  }

  static handleMemberDashboard(): ROVResponse {
    return {
      text: "**Member Dashboard Access**\n\nAs a member, you have access to enhanced features:\n\n**Your Member Benefits:**\n• **Programme History:** Track your completed workshops and skills\n• **Booking Priority:** Reserve spots in popular sessions\n• **Resource Library:** Access exclusive materials and tools\n• **Community Network:** Connect with other members\n• **Governance Participation:** Vote on community priorities\n\n**Current Opportunities:**\n• View upcoming workshops with member discounts\n• Join member-only events and networking sessions\n• Access equipment lending with priority booking\n• Participate in community decision-making processes\n\n**Next Steps:**\n• Book your next programme or workshop\n• Join a community working group\n• Attend the next member assembly meeting\n• Explore mentor or volunteer opportunities\n\n**Need Support?**\n• Contact our team for guidance on making the most of membership\n• Join member orientation sessions\n• Connect with member buddies for peer support\n\nWhat would you like to explore first in your member journey?",
      expression: 'helpful',
      personality: 'helper'
    };
  }

  static handleApplicationGuide(): ROVResponse {
    return {
      text: "**Application Process Guide**\n\nApplying to Wembley Wonders programmes:\n\n**What You Need:**\n• Basic information about yourself and your interests\n• Description of what you hope to achieve\n• Any relevant experience or skills (not required, just helpful)\n• Indication of your availability and commitment level\n\n**Application Steps:**\n1. **Initial Interest:** Complete online form or visit us in person\n2. **Welcome Meeting:** Chat with staff about your goals and our programmes\n3. **Programme Match:** Find the right pathway for your interests and schedule\n4. **Start Participating:** Begin with workshops, events, or volunteer opportunities\n\n**No Barriers Approach:**\n• No formal qualifications required\n• Sliding scale fees based on ability to pay\n• Flexible scheduling for different life circumstances\n• Support available for any accessibility needs\n\n**What Happens Next:**\n• Quick response within 48 hours of application\n• Welcome meeting scheduled at your convenience\n• Immediate access to community events and resources\n• Ongoing support throughout your journey with us\n\nReady to apply? Contact Judith Fontanelle (contact@wembleywonders.org, 0208 902 9991) or visit us at 123 High Road, Wembley HA9 6AA.",
      expression: 'helpful',
      personality: 'pathfinder'
    };
  }
}
