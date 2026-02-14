// src/services/maya/conversation/rovIntegration.ts
import { ConversationMessage, PageContext } from '../../../types/maya/conversation';
import { programKnowledge, staffDirectory, contactPoints } from '../../../data/maya/programKnowledge';
import { contentAwareROV } from './contentAwareROV';
import { signpostingROV } from './signpostingROV';

// Import modular handlers
import { ShopActionsHandler } from './quickActions/shopActions';
import { ProgrammeActionsHandler } from './quickActions/programmeActions';
import { CommunityActionsHandler } from './quickActions/communityActions';
import { FrameworkActionsHandler } from './quickActions/frameworkActions';
import { GeneralActionsHandler } from './quickActions/generalActions';

// Import response handlers (we'll create these next)
import { CapabilitiesHandler } from './responseHandlers/capabilitiesHandler';
import { ContactHandler } from './responseHandlers/contactHandler';

// Import types
import { ROVResponse, PageTemplateContext, QuickActionType } from './types';

class ROVIntegrationService {
  
  async getContextualResponse(
    userMessage: string, 
    pageContext: string, 
    userJourney: string[], 
    membershipTier: string, 
    templateContext?: PageTemplateContext
  ): Promise<ROVResponse> {
    
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const conversationHistory = this.getRecentConversationContext();
        const response = await this.generateContextualResponse(
          userMessage, 
          pageContext, 
          membershipTier, 
          conversationHistory,
          templateContext
        );
        resolve(response);
      }, 800);
    });
  }

  private getRecentConversationContext(): string[] {
    try {
      const saved = localStorage.getItem('maya_conversation_state');
      if (saved) {
        const state = JSON.parse(saved);
        return state.messages
          .filter((msg: any) => msg.sender === 'maya')
          .slice(-5)
          .map((msg: any) => msg.text.toLowerCase());
      }
    } catch (error) {
      console.warn('Could not load conversation context:', error);
    }
    return [];
  }

  private async generateContextualResponse(
    userMessage: string, 
    pageContext: string, 
    membershipTier: string,
    conversationHistory: string[],
    templateContext?: PageTemplateContext
  ): Promise<ROVResponse> {
    const input = userMessage.toLowerCase();
    
    // Handle PageTemplate quick actions first
    if (templateContext?.actionType) {
      return this.handleQuickAction(templateContext.actionType as QuickActionType, templateContext);
    }
    
    // PRIORITY: Check for signposting needs (external support services)
    if (this.needsSignposting(input)) {
      const signpostingResponse = signpostingROV.getSignpostingResponse(userMessage, pageContext);
      return {
        text: signpostingResponse.text,
        expression: signpostingResponse.expression,
        personality: signpostingResponse.personality
      };
    }
    
    // Handle conversation context - elaboration requests
    if (input.includes('elaborate') && conversationHistory.length > 0) {
      return this.handleElaborationRequest(conversationHistory[conversationHistory.length - 1], userMessage);
    }
    
    // Handle community outreach inquiry
    if (input.includes('migrant') || input.includes('reach them') || input.includes('communities settling')) {
      return this.handleCommunityOutreachInquiry();
    }
    
    // Handle specific venue inquiries
    if (input.includes('kaywana') && input.includes('court')) {
      return this.handleKaywanaCourtInquiry();
    }
    
    // Maya's capabilities and help
    if (input.includes('help') && (input.includes('how') || input.includes('work') || input.includes('use'))) {
      return CapabilitiesHandler.handleHelpRequest(templateContext?.pageType);
    }
    
    if (input.includes('what can you') || input.includes('what do you') || input.includes('capabilities')) {
      return CapabilitiesHandler.handleCapabilitiesRequest(templateContext?.pageType);
    }
    
    // Human contact requests
    if (input.includes('staff') || input.includes('speak to') || input.includes('talk to') || 
        input.includes('contact') || input.includes('call') || input.includes('phone') || input.includes('email') || 
        input.includes('human') || input.includes('person') || input.includes('someone')) {
      return ContactHandler.handleHumanContactRequest(input);
    }
    
    // Try page content for specific inquiries
    const isSpecificInquiry = input.includes('what') || input.includes('how') || input.includes('where') || 
                             input.includes('when') || input.includes('tell me about') || input.includes('explain');
    
    if (isSpecificInquiry && !input.includes('can you do') && !input.includes('help')) {
      try {
        const contentResponse = await contentAwareROV.getContentAwareResponse(userMessage);
        if (contentResponse.sources === 'page-content') {
          return {
            text: contentResponse.text,
            expression: contentResponse.expression,
            personality: contentResponse.personality
          };
        }
      } catch (error) {
        console.warn('Page content search failed');
      }
    }

    return this.generateSpecificResponse(userMessage, pageContext, membershipTier, templateContext);
  }

  private handleQuickAction(actionType: QuickActionType, templateContext?: PageTemplateContext): ROVResponse {
    // Route to appropriate action handler based on action type
    switch (actionType) {
      // General actions
      case 'capabilities':
        return CapabilitiesHandler.handleCapabilitiesRequest(templateContext?.pageType);
      case 'navigation':
        return GeneralActionsHandler.handleNavigationHelp(templateContext?.pageType);
      
      // Shop actions
      case 'shop_guide':
        return ShopActionsHandler.handleShopGuide();
      case 'local_business':
        return ShopActionsHandler.handleLocalBusinessInfo();
      case 'creator_info':
        return ShopActionsHandler.handleCreatorInfo();
      
      // Programme actions
      case 'programme_match':
        return ProgrammeActionsHandler.handleProgrammeMatching();
      case 'skills_guide':
        return ProgrammeActionsHandler.handleSkillsGuide();
      case 'workshop_info':
        return ProgrammeActionsHandler.handleWorkshopInfo();
      
      // Community actions
      case 'community_help':
        return CommunityActionsHandler.handleCommunityHelp();
      case 'involvement_guide':
        return CommunityActionsHandler.handleInvolvementGuide();
      case 'hub_info':
        return CommunityActionsHandler.handleHubInfo();
      
      // Framework actions
      case 'framework_guide':
        return FrameworkActionsHandler.handleFrameworkGuide();
      case 'org_structure':
        return FrameworkActionsHandler.handleOrgStructure();
      case 'governance_info':
        return FrameworkActionsHandler.handleGovernanceInfo();
      
      // Membership actions
      case 'membership_info':
        return GeneralActionsHandler.handleMembershipInfo();
      case 'member_dashboard':
        return GeneralActionsHandler.handleMemberDashboard();
      case 'application_guide':
        return GeneralActionsHandler.handleApplicationGuide();
      
      default:
        return CapabilitiesHandler.handleCapabilitiesRequest(templateContext?.pageType);
    }
  }

  private needsSignposting(input: string): boolean {
    const signpostingKeywords = [
      // Crisis/urgent
      'emergency', 'crisis', 'urgent', 'help', 'nowhere to go', 'desperate',
      // Housing
      'homeless', 'evict', 'housing', 'rent', 'landlord',
      // Benefits/money
      'benefit', 'universal credit', 'money problem', 'debt', 'cant afford', 'financial',
      // Health
      'doctor', 'hospital', 'mental health', 'depression', 'anxiety', 'medical',
      // Legal/immigration
      'visa', 'immigration', 'legal advice', 'solicitor', 'deportation',
      // Employment
      'need job', 'unemployed', 'cv help', 'job search',
      // Food/basic needs
      'food bank', 'hungry', 'cant eat', 'no money for food'
    ];
    
    return signpostingKeywords.some(keyword => input.includes(keyword));
  }

  private handleCommunityOutreachInquiry(): ROVResponse {
    let response = "Great question about reaching migrant communities in Wembley! Community outreach is definitely one of our priorities.\n\n";
    response += "**Our Current Approach:**\n• **Multilingual Communication**: We work with community leaders who can communicate in multiple languages\n• **Cultural Events**: Programs like Kaywana's Court help bridge different communities\n• **Community Partnerships**: We collaborate with local cultural organizations and faith groups\n• **Accessible Programs**: Our STEM and creative programs are designed to be inclusive regardless of background\n\n";
    response += "**Specific Outreach Strategies:**\n• **Word-of-mouth through community networks** - often the most effective\n• **Presence at local community events and markets**\n• **Partnerships with local mosques, temples, and community centres**\n• **Social media in multiple languages**\n• **Working with established community leaders as ambassadors**\n\n";
    response += "Judith Fontanelle (contact@wembleywonders.org) coordinates much of our community outreach and would have detailed insights about reaching specific communities. Are you interested in helping with outreach or connecting a specific community?";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'insight'
    };
  }

  private handleKaywanaCourtInquiry(): ROVResponse {
    let response = "**Kaywana's Court** is one of our four annual community tech-focused celebration events!\n\n";
    response += "**Event Series Context:**\nIt's part of our community calendar alongside:\n• **Trubble n Bass** - Music and technology fusion event\n• **Bright Sparks Showcase** - Display of young creators' projects\n• **Connoisseurs Club** - Networking for STEMgineers and Tech-preneurs\n\n";
    response += "**Purpose & Focus:**\nThese events bring together program participants with the wider community to:\n• Showcase projects and achievements\n• Build connections between different age groups and backgrounds\n• Celebrate community creativity and innovation\n• Provide networking opportunities\n\n";
    response += "For specific details about when it takes place, how to participate, or this year's activities, contact Judith Fontanelle (contact@wembleywonders.org, 0208 902 9991) who coordinates all our community events!";
    
    return {
      text: response,
      expression: 'excited',
      personality: 'insight'
    };
  }

  private handleElaborationRequest(lastResponse: string, userMessage: string): ROVResponse {
    if (lastResponse.includes('kaywana')) {
      return this.handleKaywanaCourtInquiry();
    }
    
    if (lastResponse.includes('migrant') || lastResponse.includes('communities') || lastResponse.includes('reach them')) {
      return this.handleCommunityOutreachInquiry();
    }
    
    return {
      text: "I'd be happy to elaborate! Could you clarify which specific aspect you'd like me to expand on?",
      expression: 'helpful',
      personality: 'helper'
    };
  }

  private generateSpecificResponse(userMessage: string, pageContext: string, membershipTier: string, templateContext?: PageTemplateContext): ROVResponse {
    let baseResponse = "Hello! I'm Maya, your community navigator. I can tell you about Wembley Wonders programs, connect you with our staff, or signpost you to local support services for housing, benefits, health, employment, and other community needs.";
    
    // Add page-specific context if available
    if (templateContext?.pageType) {
      const pageSpecificIntros = {
        shop: " I notice you're exploring our community marketplace - I can help you understand local business opportunities and creator resources.",
        programme: " You're looking at our programmes - I can help match you with learning pathways that suit your interests and goals.",
        community: " You're in our community section - I can connect you with support services and ways to get involved locally.",
        framework: " You're learning about how we operate - I can explain our approach to community ownership and democratic participation."
      };
      
      const pageIntro = pageSpecificIntros[templateContext.pageType as keyof typeof pageSpecificIntros];
      if (pageIntro) {
        baseResponse += pageIntro;
      }
    }
    
    baseResponse += " I can also read and reference content from the page you're currently viewing. How can I help you today?";
    
    return {
      text: baseResponse,
      expression: 'neutral',
      personality: 'helper'
    };
  }
}

export const rovIntegration = new ROVIntegrationService();