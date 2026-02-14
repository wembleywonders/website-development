// Visitor Guide Component for Maya
// Provides contextual guidance and jargon explanations for visitors

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  detectBehaviorPattern, 
  detectInterests, 
  generateContextualGuidance,
  detectJargonNeed,
  getCurrentProgramme,
  getTimeContext 
} from '../../utils/maya/contextDetection';
import { 
  getRelevantKnowledge, 
  getJargonDefinition, 
  commonQuestions 
} from '../../data/maya/communityKnowledge';
import type { UserContext, BehaviorPattern } from '../../utils/maya/contextDetection';

interface VisitorGuideProps {
  isVisible: boolean;
  onToggle: () => void;
  onJargonHover?: (term: string, definition: string) => void;
}

interface VisitorSession {
  startTime: Date;
  visitCount: number;
  pagesVisited: string[];
  timeSpentPerPage: Record<string, number>;
  scrollDepthPerPage: Record<string, number>;
  interactionCount: number;
}

export const VisitorGuide: React.FC<VisitorGuideProps> = ({ 
  isVisible, 
  onToggle, 
  onJargonHover 
}) => {
  const location = useLocation();
  const [session, setSession] = useState<VisitorSession>(() => {
    const stored = localStorage.getItem('ww_visitor_session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          startTime: new Date(parsed.startTime)
        };
      } catch {
        // Fall back to new session if parsing fails
      }
    }
    
    return {
      startTime: new Date(),
      visitCount: 1,
      pagesVisited: [location.pathname],
      timeSpentPerPage: {},
      scrollDepthPerPage: {},
      interactionCount: 0
    };
  });

  const [userContext, setUserContext] = useState<UserContext>({
    isLoggedIn: false,
    userType: 'visitor',
    currentPage: location.pathname,
    timeOnPage: 0,
    scrollDepth: 0,
    visitCount: session.visitCount,
    behaviorPattern: { type: 'browsing', confidence: 0.5, indicators: [], suggestedActions: [] },
    interests: [],
    lastActivity: new Date()
  });

  const [guidance, setGuidance] = useState<string[]>([]);
  const [availableHelp, setAvailableHelp] = useState<string[]>([]);
  const [currentProgramme, setCurrentProgramme] = useState(getCurrentProgramme());

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const timeOnPage = (Date.now() - startTime) / 1000;
      setUserContext(prev => ({ ...prev, timeOnPage }));
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset;
      const scrollDepth = documentHeight > 0 ? scrollTop / documentHeight : 0;
      
      setUserContext(prev => ({ ...prev, scrollDepth }));
      setSession(prev => ({
        ...prev,
        scrollDepthPerPage: {
          ...prev.scrollDepthPerPage,
          [location.pathname]: Math.max(scrollDepth, prev.scrollDepthPerPage[location.pathname] || 0)
        }
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Update session tracking on page change
  useEffect(() => {
    setSession(prev => {
      const updatedSession = {
        ...prev,
        pagesVisited: prev.pagesVisited.includes(location.pathname) 
          ? prev.pagesVisited 
          : [...prev.pagesVisited, location.pathname],
        visitCount: prev.pagesVisited.includes(location.pathname) 
          ? prev.visitCount 
          : prev.visitCount + 1
      };

      // Persist to localStorage (visitor session only, no personal data)
      localStorage.setItem('ww_visitor_session', JSON.stringify({
        ...updatedSession,
        startTime: updatedSession.startTime.toISOString()
      }));

      return updatedSession;
    });

    setUserContext(prev => ({ 
      ...prev, 
      currentPage: location.pathname,
      timeOnPage: 0,
      scrollDepth: 0
    }));
  }, [location.pathname]);

  // Analyze behavior and generate guidance
  useEffect(() => {
    const behaviorPattern = detectBehaviorPattern({
      timeOnPage: userContext.timeOnPage,
      scrollDepth: userContext.scrollDepth,
      visitCount: session.visitCount,
      currentPage: location.pathname
    });

    const interests = detectInterests(
      session.pagesVisited, 
      session.timeSpentPerPage
    );

    const updatedContext = {
      ...userContext,
      behaviorPattern,
      interests
    };

    setUserContext(updatedContext);

    // Generate contextual guidance
    const contextualGuidance = generateContextualGuidance(updatedContext);
    setGuidance(contextualGuidance);

    // Check for jargon that might need explanation
    const pageContent = document.body.textContent || '';
    const jargonTerms = detectJargonNeed(pageContent, behaviorPattern);
    setAvailableHelp(jargonTerms);

  }, [userContext.timeOnPage, userContext.scrollDepth, session.visitCount, location.pathname]);

  // Handle jargon hover explanations
  const handleJargonRequest = useCallback((term: string) => {
    const definition = getJargonDefinition(term);
    if (definition && onJargonHover) {
      onJargonHover(term, definition.content);
    }
    
    setSession(prev => ({
      ...prev,
      interactionCount: prev.interactionCount + 1
    }));
  }, [onJargonHover]);

  // Generate quick answers to common questions
  const getQuickAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('cost') || lowerQuestion.includes('price') || lowerQuestion.includes('fee')) {
      return commonQuestions.cost;
    }
    if (lowerQuestion.includes('time') || lowerQuestion.includes('commitment') || lowerQuestion.includes('hours')) {
      return commonQuestions.time;
    }
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('beginner') || lowerQuestion.includes('skill')) {
      return commonQuestions.experience;
    }
    if (lowerQuestion.includes('membership') || lowerQuestion.includes('join') || lowerQuestion.includes('member')) {
      return commonQuestions.membership;
    }
    if (lowerQuestion.includes('transport') || lowerQuestion.includes('location') || lowerQuestion.includes('travel')) {
      return commonQuestions.transport;
    }
    if (lowerQuestion.includes('childcare') || lowerQuestion.includes('children') || lowerQuestion.includes('kids')) {
      return commonQuestions.childcare;
    }
    if (lowerQuestion.includes('accessible') || lowerQuestion.includes('disability') || lowerQuestion.includes('accommodation')) {
      return commonQuestions.accessibility;
    }
    
    return "I'd be happy to help! Could you be more specific about what you'd like to know?";
  };

  // Get programme-specific guidance
  const getProgrammeGuidance = (programmeName: string): string[] => {
    const guidance: string[] = [];
    const season = getTimeContext();
    
    switch (programmeName.toLowerCase()) {
      case 'trubble n bass':
        guidance.push("Our Spring music programme! Learn sound engineering and produce content for Rayd-yo.");
        guidance.push("No musical experience needed - we start with basics and build up.");
        if (season === 'spring') {
          guidance.push("This programme is currently running. Check if spaces are available!");
        }
        break;
        
      case 'kaywana\'s court':
        guidance.push("Summer drama and creative arts! Includes LARP, writing workshops, and arts & crafts.");
        guidance.push("Perfect for creative expression and trying new storytelling approaches.");
        if (season === 'summer') {
          guidance.push("This programme is active now. Great time to jump in!");
        }
        break;
        
      case 'bright sparks':
        guidance.push("Autumn STEM and entrepreneurship showcase for STEMgineers and Tech-preneurs.");
        guidance.push("Build prototypes, develop business ideas, and present to the community.");
        if (season === 'autumn') {
          guidance.push("Registration period for our tech showcase programme!");
        }
        break;
        
      case 'connoisseurs social club':
        guidance.push("Winter governance and leadership programme culminating in our AGM.");
        guidance.push("Learn about community organizing and democratic participation.");
        if (season === 'winter') {
          guidance.push("Perfect timing to join our leadership development programme!");
        }
        break;
    }
    
    return guidance;
  };

  // Check if visitor seems ready for next steps
  const isReadyForAction = (): boolean => {
    return (
      userContext.behaviorPattern.type === 'deciding' ||
      userContext.timeOnPage > 180 ||
      session.pagesVisited.length >= 3 ||
      userContext.interests.length > 2
    );
  };

  // Generate next step suggestions
  const getNextSteps = (): string[] => {
    const steps: string[] = [];
    
    if (isReadyForAction()) {
      if (userContext.currentPage === '/calendar' && userContext.interests.includes('programmes')) {
        steps.push("Ready to try a programme? Most people start with our current seasonal offering.");
        steps.push(`Right now that's ${currentProgramme.name}: ${currentProgramme.description}`);
      }
      
      if (userContext.interests.includes('membership')) {
        steps.push("Interested in membership? You can start participating and upgrade later.");
        steps.push("Many people begin as drop-in participants to test the waters.");
      }
      
      if (userContext.currentPage === '/about' && userContext.timeOnPage > 120) {
        steps.push("You've thoroughly reviewed our approach. Ready to get involved?");
        steps.push("The 'Get Started' page can help match you with suitable programmes.");
      }
    }
    
    return steps;
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="visitor-guide">
      <div className="visitor-guide-header">
        <h3>Maya's Visitor Guide</h3>
        <button onClick={onToggle} className="guide-close-btn">×</button>
      </div>
      
      <div className="visitor-guide-content">
        {/* Current context information */}
        <div className="context-info">
          <p className="behavior-indicator">
            You're {userContext.behaviorPattern.type === 'browsing' ? 'browsing' : 
                   userContext.behaviorPattern.type === 'exploring' ? 'exploring our options' :
                   userContext.behaviorPattern.type === 'deciding' ? 'considering your options' :
                   userContext.behaviorPattern.type === 'returning' ? 'back for another look' :
                   'spending time here'} 
            {session.visitCount > 1 && ` (visit #${session.visitCount})`}
          </p>
          
          {currentProgramme.name && (
            <p className="current-programme">
              Current focus: <strong>{currentProgramme.name}</strong> - {currentProgramme.status}
            </p>
          )}
        </div>

        {/* Contextual guidance */}
        {guidance.length > 0 && (
          <div className="contextual-guidance">
            <h4>For You Right Now:</h4>
            <ul>
              {guidance.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Jargon help */}
        {availableHelp.length > 0 && (
          <div className="jargon-help">
            <h4>Terms I Can Explain:</h4>
            <div className="jargon-terms">
              {availableHelp.map((term, index) => (
                <button 
                  key={index}
                  className="jargon-btn"
                  onClick={() => handleJargonRequest(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next steps */}
        {getNextSteps().length > 0 && (
          <div className="next-steps">
            <h4>Ready for Next Steps?</h4>
            <ul>
              {getNextSteps().map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Quick questions */}
        <div className="quick-questions">
          <h4>Quick Questions:</h4>
          <div className="question-buttons">
            {Object.keys(commonQuestions).slice(0, 4).map((key) => (
              <button 
                key={key}
                className="question-btn"
                onClick={() => {
                  const answer = getQuickAnswer(key);
                  alert(answer); // Replace with proper modal/tooltip in production
                }}
              >
                {key === 'cost' ? 'Cost?' : 
                 key === 'time' ? 'Time commitment?' :
                 key === 'experience' ? 'Need experience?' :
                 key === 'membership' ? 'Membership?': key}
              </button>
            ))}
          </div>
        </div>

        {/* Contact prompt for complex questions */}
        <div className="contact-prompt">
          <p>Have specific questions? <a href="mailto:hello@wembleywonders.org">Let's chat!</a></p>
        </div>
      </div>
    </div>
  );
};

// Styles for the Visitor Guide (add to your CSS)
export const visitorGuideStyles = `
.visitor-guide {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 320px;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 1rem;
  color: #f8fafc;
  z-index: 1000;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.visitor-guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
}

.visitor-guide-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.guide-close-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-close-btn:hover {
  color: #f8fafc;
}

.visitor-guide-content {
  padding: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

.context-info {
  margin-bottom: 1rem;
}

.behavior-indicator {
  font-size: 0.9rem;
  color: #cbd5e1;
  margin: 0 0 0.5rem 0;
}

.current-programme {
  font-size: 0.9rem;
  color: #8b5cf6;
  margin: 0;
}

.contextual-guidance h4,
.jargon-help h4,
.next-steps h4,
.quick-questions h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #f8fafc;
  margin: 0 0 0.5rem 0;
}

.contextual-guidance ul,
.next-steps ul {
  margin: 0;
  padding-left: 1rem;
  list-style-type: disc;
}

.contextual-guidance li,
.next-steps li {
  font-size: 0.85rem;
  color: #cbd5e1;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.jargon-terms,
.question-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.jargon-btn,
.question-btn {
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.jargon-btn:hover,
.question-btn:hover {
  background: rgba(139, 92, 246, 0.3);
  border-color: rgba(139, 92, 246, 0.5);
  color: #ddd6fe;
}

.contact-prompt {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.contact-prompt p {
  font-size: 0.85rem;
  color: #cbd5e1;
  margin: 0;
  text-align: center;
}

.contact-prompt a {
  color: #8b5cf6;
  text-decoration: none;
}

.contact-prompt a:hover {
  color: #a78bfa;
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .visitor-guide {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 1rem 1rem 0 0;
  }
}
`;

export default VisitorGuide;