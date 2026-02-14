export type UserIntent = 'question' | 'request' | 'greeting' | 'farewell' | 'complaint' | 'help-seeking' | 'unknown';
export type EmotionalTone = 'positive' | 'negative' | 'neutral' | 'frustrated' | 'confused' | 'urgent';
export interface ContextAnalysis { intent: UserIntent; tone: EmotionalTone; urgency: 'low' | 'medium' | 'high'; topics: string[]; }
class ContextDetectionService {
  analyzeMessage(message: string): ContextAnalysis {
    const msg = message.toLowerCase();
    const intent: UserIntent = /\?/.test(msg) ? 'question' : /please|help|need/.test(msg) ? 'request' : /^(hi|hello|hey)/.test(msg) ? 'greeting' : /bye|thanks/.test(msg) ? 'farewell' : 'unknown';
    const tone: EmotionalTone = /great|amazing|love/.test(msg) ? 'positive' : /bad|terrible|hate/.test(msg) ? 'negative' : /frustrated|annoyed/.test(msg) ? 'frustrated' : /confused|lost/.test(msg) ? 'confused' : 'neutral';
    const urgency = /urgent|asap|emergency/.test(msg) ? 'high' : /soon|quickly/.test(msg) ? 'medium' : 'low';
    const topics: string[] = []; ['stemgeneers', 'techreneurs', 'kaywana', 'pageturners', 'raydyo', 'joystick'].forEach(p => { if (msg.includes(p)) topics.push(p); });
    return { intent, tone, urgency, topics };
  }
}
export const contextDetectionService = new ContextDetectionService();
export default contextDetectionService;
