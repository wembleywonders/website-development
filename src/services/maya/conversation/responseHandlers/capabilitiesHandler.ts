// src/services/maya/conversation/responseHandlers/capabilitiesHandler.ts
import { ROVResponse, PageType } from '../types';

export class CapabilitiesHandler {
  
  static handleCapabilitiesRequest(pageType?: PageType): ROVResponse {
    let baseCapabilities = "I'm here to help you navigate Wembley Wonders and connect you with broader support services!\n\n**What I can help with:**\n\n• **Wembley Wonders programs** - STEM courses, content creation, volunteering, membership\n• **Page content** - I can read and reference information on the current page\n• **Community signposting** - Connect you with local services for housing, benefits, health, legal advice, employment, and crisis support\n• **Staff connections** - Direct contact with our team members\n• **Detailed explanations** - Comprehensive information when you ask me to elaborate\n\n";
    
    const pageSpecificHelp = {
      shop: "**Shop-Specific Help:** I can guide you through our community marketplace, explain local business opportunities, and connect you with creator resources.\n\n",
      programme: "**Programme-Specific Help:** I can help match you with learning pathways, explain workshop formats, and guide you through skill development options.\n\n",
      community: "**Community-Specific Help:** I can connect you with support services, explain involvement opportunities, and help you find local resources.\n\n",
      framework: "**Framework-Specific Help:** I can explain our 5C approach, organizational structure, and how community governance works.\n\n"
    };
    
    const contextualHelp = pageType ? pageSpecificHelp[pageType as keyof typeof pageSpecificHelp] || '' : '';
    
    return {
      text: baseCapabilities + contextualHelp + "**Signposting Services:** If you need support beyond what we offer directly - whether it's benefits advice, housing help, health services, or crisis support - I can connect you with the right local organizations.\n\n**What makes me helpful:** I remember our conversation, can read page content, provide detailed responses, and importantly, I know when to connect you with specialist external support services.\n\nWhat brings you here today?",
      expression: 'helpful',
      personality: 'helper'
    };
  }

  static handleHelpRequest(pageType?: PageType): ROVResponse {
    const pageContextHelp = {
      shop: " I'm particularly helpful here for navigating our community marketplace and understanding local business opportunities.",
      programme: " On this programmes page, I can help you find the right learning pathway and understand our workshop approach.",
      community: " In this community section, I can connect you with support services and involvement opportunities.",
      framework: " Here I can explain our organizational approach and community governance structure."
    };
    
    const contextualNote = pageType ? pageContextHelp[pageType as keyof typeof pageContextHelp] || '' : '';
    
    return {
      text: `I'm Maya, designed to help you find what you need both within Wembley Wonders and in the broader community!${contextualNote}\n\n**How I work:**\n• I can read content on the page you're viewing\n• I remember our entire conversation for context\n• I can signpost you to local support services when needed\n• I can connect you directly with our staff for specific Wembley Wonders queries\n\n**Best ways to interact:**\n• Ask about our programs, venues, or community topics\n• Tell me if you need help with housing, benefits, health, employment, or other life challenges\n• Ask me to elaborate when you want more detail\n• Let me know if you're facing any difficulties - I can connect you with appropriate support\n\n**Community Navigator:** I'm not just here for Wembley Wonders - if you need broader support, I can signpost you to the right services.\n\nWhat would you like to explore?`,
      expression: 'helpful',
      personality: 'helper'
    };
  }
}