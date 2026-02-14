interface PageContent {
  route: string;
  title: string;
  headings: string[];
  paragraphs: string[];
  links: { text: string; href: string }[];
  metadata: {
    description?: string;
    keywords?: string[];
  };
}

class PageContentIndexer {
  
  getCurrentPageContent(): PageContent {
    const route = window.location.pathname;
    const title = document.title;
    
    // Extract headings (h1, h2, h3, h4)
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
      .map(h => h.textContent?.trim())
      .filter(text => text && text.length > 0) as string[];
    
    // Extract paragraphs and meaningful text content
    const paragraphs = Array.from(document.querySelectorAll('p, li, .description, .content'))
      .map(p => p.textContent?.trim())
      .filter(text => text && text.length > 10 && !text.includes('©')) as string[];
    
    // Extract navigation links
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map(link => ({
        text: link.textContent?.trim() || '',
        href: (link as HTMLAnchorElement).href
      }))
      .filter(link => link.text.length > 0 && !link.text.includes('Login'));
    
    // Extract metadata
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywordsContent = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const keywords = keywordsContent.split(',').map(k => k.trim()).filter(k => k.length > 0);
    
    return {
      route,
      title,
      headings,
      paragraphs,
      links,
      metadata: { description, keywords }
    };
  }
  
  searchPageContent(query: string, pageContent: PageContent): {
    headings: string[];
    paragraphs: string[];
    relevanceScore: number;
  } {
    const searchTerms = query.toLowerCase().split(' ')
      .filter(term => term.length > 2); // Filter out small words
    
    const matchingHeadings = pageContent.headings.filter(heading =>
      searchTerms.some(term => heading.toLowerCase().includes(term))
    );
    
    const matchingParagraphs = pageContent.paragraphs.filter(paragraph =>
      searchTerms.some(term => paragraph.toLowerCase().includes(term))
    ).slice(0, 3); // Limit to most relevant paragraphs
    
    // Calculate relevance score
    const totalMatches = matchingHeadings.length + matchingParagraphs.length;
    const relevanceScore = Math.min(totalMatches / searchTerms.length, 1);
    
    return {
      headings: matchingHeadings,
      paragraphs: matchingParagraphs,
      relevanceScore
    };
  }
  
  findRelevantNavigation(query: string, pageContent: PageContent): { text: string; href: string }[] {
    const searchTerms = query.toLowerCase().split(' ');
    
    return pageContent.links.filter(link =>
      searchTerms.some(term => link.text.toLowerCase().includes(term))
    ).slice(0, 3);
  }
}

export const pageIndexer = new PageContentIndexer();
