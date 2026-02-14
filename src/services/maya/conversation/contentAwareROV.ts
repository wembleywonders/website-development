// src/services/maya/conversation/contentAwareROV.ts
import { pageIndexer } from '../content/pageIndexer';

interface ContentAwareResponse {
  text: string;
  expression: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  personality: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
  sources: 'page-content' | 'knowledge-base' | 'navigation-suggestion';
}

class ContentAwareROVService {
  
  async getContentAwareResponse(query: string): Promise<ContentAwareResponse> {
    try {
      // Get current page content
      const pageContent = pageIndexer.getCurrentPageContent();
      
      // Search current page for relevant info
      const searchResults = pageIndexer.searchPageContent(query, pageContent);
      
      // Check if we have relevant content with good relevance score
      if (searchResults.relevanceScore > 0.3 && 
          (searchResults.headings.length > 0 || searchResults.paragraphs.length > 0)) {
        return this.generateResponseFromPageContent(searchResults, query, pageContent);
      }
      
      // Check for navigation suggestions
      const navSuggestions = pageIndexer.findRelevantNavigation(query, pageContent);
      if (navSuggestions.length > 0) {
        return this.generateNavigationResponse(navSuggestions, query);
      }
      
      // Otherwise, fall back to general navigation suggestion
      return this.generateNavigationSuggestion(query);
    } catch (error) {
      console.warn('ContentAwareROV error:', error);
      return this.generateNavigationSuggestion(query);
    }
  }

  // Legacy method for backward compatibility
  async getPageAwareResponse(query: string, currentPage: string): Promise<string> {
    const response = await this.getContentAwareResponse(query);
    return response.text;
  }
  
  private generateResponseFromPageContent(
    searchResults: { headings: string[]; paragraphs: string[]; relevanceScore: number },
    query: string,
    pageContent: any
  ): ContentAwareResponse {
    let responseText = "Based on the information on this page:\n\n";
    
    // Include relevant headings
    if (searchResults.headings.length > 0) {
      responseText += `**Relevant sections:**\n${searchResults.headings.map(h => `• ${h}`).join('\n')}\n\n`;
    }
    
    // Include relevant content
    if (searchResults.paragraphs.length > 0) {
      const firstParagraph = searchResults.paragraphs[0];
      const truncated = firstParagraph.length > 200 
        ? firstParagraph.substring(0, 200) + '...' 
        : firstParagraph;
      responseText += `**Content:** ${truncated}\n\n`;
    }
    
    responseText += "Would you like me to elaborate on any specific aspect, or help you find more detailed information?";
    
    return {
      text: responseText,
      expression: 'helpful',
      personality: 'helper',
      sources: 'page-content'
    };
  }

  private generateNavigationResponse(
    navSuggestions: { text: string; href: string }[],
    query: string
  ): ContentAwareResponse {
    let responseText = "I found some relevant sections that might help with your question:\n\n";
    
    navSuggestions.forEach(link => {
      responseText += `• **${link.text}** - This section might have what you're looking for\n`;
    });
    
    responseText += "\nWould you like me to help you navigate to any of these sections, or do you need more specific information?";
    
    return {
      text: responseText,
      expression: 'helpful',
      personality: 'pathfinder',
      sources: 'navigation-suggestion'
    };
  }

  private generateNavigationSuggestion(query: string): ContentAwareResponse {
    // Generate contextual navigation suggestions based on query
    let suggestion = "I don't see specific information about that on this page. ";
    
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('programme') || queryLower.includes('workshop') || queryLower.includes('course')) {
      suggestion += "You might find what you're looking for on our Programmes page, which has detailed information about our learning pathways and workshops.";
    } else if (queryLower.includes('membership') || queryLower.includes('join') || queryLower.includes('member')) {
      suggestion += "For membership information and benefits, check out our Membership page or Individual Benefits section.";
    } else if (queryLower.includes('business') || queryLower.includes('shop') || queryLower.includes('local')) {
      suggestion += "For business and local commerce information, visit our Community Shop or Business sections.";
    } else if (queryLower.includes('contact') || queryLower.includes('staff') || queryLower.includes('team')) {
      suggestion += "You can find contact information and team details on our About Us or Team pages.";
    } else {
      suggestion += "Try exploring our main navigation menu or ask me to connect you with a team member who can help with your specific question.";
    }
    
    return {
      text: suggestion,
      expression: 'helpful',
      personality: 'pathfinder',
      sources: 'navigation-suggestion'
    };
  }
}

export const contentAwareROV = new ContentAwareROVService();