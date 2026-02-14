import { pageIndexer } from './pageIndexer';

interface ContentResponse {
  text: string;
  expression: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  personality: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
  sources: 'page-content' | 'knowledge-base' | 'navigation';
}

class ContentAwareROVService {
  
  async getContentAwareResponse(query: string): Promise<ContentResponse> {
    try {
      // Get current page content
      const pageContent = pageIndexer.getCurrentPageContent();
      
      // Search current page for relevant information
      const searchResults = pageIndexer.searchPageContent(query, pageContent);
      
      // If page has relevant content, use it
      if (searchResults.relevanceScore > 0.3) {
        return this.generatePageBasedResponse(searchResults, pageContent, query);
      }
      
      // If no relevant content on current page, suggest navigation
      const relevantNavigation = pageIndexer.findRelevantNavigation(query, pageContent);
      if (relevantNavigation.length > 0) {
        return this.generateNavigationResponse(relevantNavigation, query);
      }
      
      // Fall back to indicating no page content found
      return {
        text: `I don't see specific information about "${query}" on this page, but I can help you find it or connect you with our team for detailed information.`,
        expression: 'thinking',
        personality: 'helper',
        sources: 'knowledge-base'
      };
      
    } catch (error) {
      console.warn('Content extraction failed:', error);
      return {
        text: `I'd be happy to help with information about "${query}". Let me connect you with our team or suggest relevant resources.`,
        expression: 'helpful',
        personality: 'helper',
        sources: 'knowledge-base'
      };
    }
  }
  
  private generatePageBasedResponse(
    searchResults: any, 
    pageContent: any, 
    query: string
  ): ContentResponse {
    let response = "";
    
    if (searchResults.headings.length > 0) {
      response += `Based on this page, here's what I can tell you about ${query}:\n\n`;
      
      // Use the most relevant heading as context
      const mainHeading = searchResults.headings[0];
      response += `**${mainHeading}**\n\n`;
    }
    
    if (searchResults.paragraphs.length > 0) {
      // Use the most relevant paragraph
      const mainContent = searchResults.paragraphs[0];
      // Trim to reasonable length
      const trimmedContent = mainContent.length > 300 
        ? mainContent.substring(0, 300) + "..."
        : mainContent;
      
      response += trimmedContent + "\n\n";
      
      if (searchResults.paragraphs.length > 1) {
        response += "There's more detailed information on this page. ";
      }
    }
    
    response += "Would you like me to elaborate on any specific aspect, or help you find additional information?";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'insight',
      sources: 'page-content'
    };
  }
  
  private generateNavigationResponse(
    navigationOptions: { text: string; href: string }[], 
    query: string
  ): ContentResponse {
    let response = `I can help you find information about "${query}". Based on this site, you might want to check:\n\n`;
    
    navigationOptions.forEach(option => {
      response += `• **${option.text}** - This section might have what you're looking for\n`;
    });
    
    response += "\nWould you like me to help you navigate to any of these sections, or provide other assistance?";
    
    return {
      text: response,
      expression: 'helpful',
      personality: 'pathfinder',
      sources: 'navigation'
    };
  }
}

export const contentAwareROV = new ContentAwareROVService();
