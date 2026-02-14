import { ConversationMessage } from '../../../types/maya/conversation';
import { PathfinderROVProps } from '../../../systems/rovs/personalities/pathfinder/PathfinderROVTypes';
import { HelperSupportROVProps } from '../../../systems/rovs/personalities/helper/HelperSupportROVTypes';
import { InsightAnalysisROVProps } from '../../../systems/rovs/personalities/insight/InsightAnalysisROVTypes';

interface ROVResponse {
  text: string;
  expression: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  personality: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
}

class ROVBridgeService {
  
  async getPathfinderResponse(
    userMessage: string, 
    pageContext: string,
    membershipTier: string
  ): Promise<ROVResponse> {
    // Create context for PathfinderROV
    const objective = this.deriveObjectiveFromMessage(userMessage, pageContext);
    const context = {
      currentPage: pageContext,
      membershipTier,
      userGoal: objective
    };

    // This would connect to your actual PathfinderROV logic
    // For now, returning contextual guidance based on PathfinderROV's purpose
    const responses = this.getPathfinderGuidance(objective, pageContext, membershipTier);
    
    return {
      text: responses.text,
      expression: responses.expression,
      personality: 'pathfinder'
    };
  }

  async getHelperResponse(
    userMessage: string,
    pageContext: string,
    membershipTier: string
  ): Promise<ROVResponse> {
    const supportType = this.classifySupportNeeded(userMessage);
    const response = this.getHelperSupportGuidance(supportType, pageContext, membershipTier);
    
    return {
      text: response.text,
      expression: response.expression,
      personality: 'helper'
    };
  }

  async getInsightResponse(
    userMessage: string,
    pageContext: string,
    membershipTier: string
  ): Promise<ROVResponse> {
    const analysisType = this.classifyAnalysisNeeded(userMessage);
    const response = this.getInsightAnalysisGuidance(analysisType, pageContext, membershipTier);
    
    return {
      text: response.text,
      expression: response.expression,
      personality: 'insight'
    };
  }

  selectBestROV(
    userMessage: string,
    pageContext: string,
    membershipTier: string
  ): 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful' {
    const lowerMessage = userMessage.toLowerCase();
    
    // Emergency situations
    if (lowerMessage.includes('emergency') || lowerMessage.includes('crisis') || lowerMessage.includes('urgent')) {
      return 'emergency';
    }
    
    // Business context
    if (pageContext.includes('business') || pageContext.includes('investment') || 
        lowerMessage.includes('partner') || lowerMessage.includes('sponsor')) {
      return 'business';
    }
    
    // Application/journey guidance
    if (lowerMessage.includes('apply') || lowerMessage.includes('how do i') || 
        lowerMessage.includes('get started') || pageContext.includes('apply')) {
      return 'pathfinder';
    }
    
    // Analysis/insights for members
    if (membershipTier !== 'visitor' && (lowerMessage.includes('analyze') || 
        lowerMessage.includes('insight') || lowerMessage.includes('data'))) {
      return 'insight';
    }
    
    // Mental health/wellbeing
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || 
        lowerMessage.includes('mental health') || lowerMessage.includes('wellbeing')) {
      return 'mindful';
    }
    
    // Compliance/governance
    if (lowerMessage.includes('policy') || lowerMessage.includes('rules') || 
        lowerMessage.includes('governance') || lowerMessage.includes('compliance')) {
      return 'justice';
    }
    
    // Default to helper for general support
    return 'helper';
  }

  private deriveObjectiveFromMessage(message: string, pageContext: string): string {
    // Derive user objective based on message content and page context
    if (message.toLowerCase().includes('apply')) return 'membership-application';
    if (message.toLowerCase().includes('learn')) return 'skill-development';
    if (pageContext.includes('business')) return 'business-partnership';
    return 'general-guidance';
  }

  private classifySupportNeeded(message: string): 'technical' | 'navigation' | 'information' | 'general' {
    const lower = message.toLowerCase();
    if (lower.includes('how') || lower.includes('where')) return 'navigation';
    if (lower.includes('what') || lower.includes('when')) return 'information';
    if (lower.includes('error') || lower.includes('problem')) return 'technical';
    return 'general';
  }

  private classifyAnalysisNeeded(message: string): 'community' | 'personal' | 'program' | 'general' {
    const lower = message.toLowerCase();
    if (lower.includes('community') || lower.includes('impact')) return 'community';
    if (lower.includes('my') || lower.includes('progress')) return 'personal';
    if (lower.includes('program') || lower.includes('course')) return 'program';
    return 'general';
  }

  private getPathfinderGuidance(objective: string, pageContext: string, membershipTier: string) {
    // This should integrate with your actual PathfinderROV logic
    const guidanceMap = {
      'membership-application': {
        text: "I can guide you through the membership application process. Let's start by understanding your interests and how you'd like to contribute to the Wembley community.",
        expression: 'helpful' as const
      },
      'skill-development': {
        text: "I'll help you navigate our skill development pathways. Based on your current tier, I can recommend specific programs that align with your goals.",
        expression: 'excited' as const
      },
      'business-partnership': {
        text: "I can help you explore partnership opportunities that align with genuine community development rather than traditional advertising.",
        expression: 'thinking' as const
      },
      'general-guidance': {
        text: "I'm here to help you navigate your journey with Wembley Wonders. What specific area would you like guidance on?",
        expression: 'neutral' as const
      }
    };

    return guidanceMap[objective as keyof typeof guidanceMap] || guidanceMap['general-guidance'];
  }

  private getHelperSupportGuidance(supportType: string, pageContext: string, membershipTier: string) {
    const supportMap = {
      'navigation': {
        text: "I can help you find what you're looking for. Which section would be most helpful - our programs, membership information, or community resources?",
        expression: 'helpful' as const
      },
      'information': {
        text: "I have access to comprehensive information about our community programs and services. What specific details can I provide?",
        expression: 'neutral' as const
      },
      'technical': {
        text: "I can help troubleshoot technical issues. Let me connect you with the right resources or guide you through the solution.",
        expression: 'concerned' as const
      },
      'general': {
        text: "How can I assist you today? I'm here to help with any questions about Wembley Wonders.",
        expression: 'helpful' as const
      }
    };

    return supportMap[supportType as keyof typeof supportMap] || supportMap['general'];
  }

  private getInsightAnalysisGuidance(analysisType: string, pageContext: string, membershipTier: string) {
    const insightMap = {
      'community': {
        text: "I can provide insights into community trends and impact metrics. What aspect of community development would you like to analyze?",
        expression: 'thinking' as const
      },
      'personal': {
        text: `As a ${membershipTier} member, I can analyze your progress and suggest optimization strategies for your community involvement.`,
        expression: 'helpful' as const
      },
      'program': {
        text: "I can provide detailed analysis of program effectiveness and outcomes. Which program would you like insights on?",
        expression: 'excited' as const
      },
      'general': {
        text: "I can provide analytical insights to help inform your decisions. What would you like me to analyze?",
        expression: 'neutral' as const
      }
    };

    return insightMap[analysisType as keyof typeof insightMap] || insightMap['general'];
  }
}

export const rovBridge = new ROVBridgeService();
