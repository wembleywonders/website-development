export type MayaExpression = 'neutral' | 'thinking' | 'helpful' | 'concerned' | 'excited';

export interface MayaAvatarProps {
  expression: MayaExpression;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export interface ConversationState {
  currentExpression: MayaExpression;
  messageType: 'greeting' | 'helping' | 'thinking' | 'error' | 'success';
  isTyping: boolean;
}
