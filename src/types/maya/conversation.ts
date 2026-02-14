export interface ConversationMessage {
  id: string;
  text: string;
  sender: 'maya' | 'user';
  timestamp: Date;
  pageContext: string;
  expression?: 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';
  rovPersonality?: 'pathfinder' | 'helper' | 'insight' | 'business' | 'emergency' | 'justice' | 'mindful';
}

export interface ConversationState {
  messages: ConversationMessage[];
  currentPage: string;
  userJourney: string[];
  lastInteraction: Date;
  preferredROV?: string;
  dragPosition?: { x: number; y: number };
}

export interface PageContext {
  route: string;
  title: string;
  section: 'home' | 'about' | 'programs' | 'membership' | 'business' | 'apply';
  userIntent: 'browsing' | 'learning' | 'applying' | 'engaging';
}
