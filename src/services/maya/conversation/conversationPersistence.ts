import { ConversationState, ConversationMessage, PageContext } from '../../../types/maya/conversation';

class ConversationPersistenceService {
  private storageKey = 'maya_conversation_state';
  
  saveConversationState(state: ConversationState): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        ...state,
        messages: state.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })),
        lastInteraction: state.lastInteraction.toISOString()
      }));
    } catch (error) {
      console.warn('Failed to save conversation state:', error);
    }
  }

  loadConversationState(): ConversationState | null {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return null;

      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        messages: parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })),
        lastInteraction: new Date(parsed.lastInteraction)
      };
    } catch (error) {
      console.warn('Failed to load conversation state:', error);
      return null;
    }
  }

  addMessage(message: ConversationMessage): void {
    const state = this.loadConversationState() || this.createInitialState();
    state.messages.push(message);
    state.lastInteraction = new Date();
    this.saveConversationState(state);
  }

  updatePageContext(pageContext: PageContext): void {
    const state = this.loadConversationState() || this.createInitialState();
    state.currentPage = pageContext.route;
    state.userJourney.push(pageContext.route);
    if (state.userJourney.length > 10) {
      state.userJourney = state.userJourney.slice(-10);
    }
    this.saveConversationState(state);
  }

  updateDragPosition(position: { x: number; y: number }): void {
    const state = this.loadConversationState();
    if (state) {
      state.dragPosition = position;
      this.saveConversationState(state);
    }
  }

  clearConversation(): void {
    localStorage.removeItem(this.storageKey);
  }

  private createInitialState(): ConversationState {
    return {
      messages: [],
      currentPage: '/',
      userJourney: ['/'],
      lastInteraction: new Date(),
      dragPosition: { x: 20, y: 20 }
    };
  }
}

export const conversationPersistence = new ConversationPersistenceService();
