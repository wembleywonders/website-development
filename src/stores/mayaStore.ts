import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Import Maya system types
import type { UserContext, BehaviorPattern } from '../utils/maya/contextDetection';
import type { CommunityFact } from '../data/maya/communityKnowledge';
import { getCurrentProgramme, getTimeContext } from '../utils/maya/contextDetection';

// Enhanced types for Wembley Wonders Maya store
interface MayaMessage {
  id: string;
  text: string;
  sender: 'user' | 'maya' | 'specialist';
  timestamp: Date;
  type?: 'message' | 'recommendation' | 'guidance' | 'celebration' | 'jargon' | 'safeguarding' | 'ecosystem';
  rovPersonality?: string;
  metadata?: {
    progressTracking?: boolean;
    contextualHelp?: boolean;
    safeguardingAlert?: boolean;
    jargonExplanation?: boolean;
    ecosystemComponent?: 'passionistas' | 'scrap-cat' | 'full-cycle';
  };
}

interface CommunityProfile {
  interests: string[];
  experience: 'beginner' | 'some-experience' | 'experienced';
  availability: 'flexible' | 'evenings' | 'weekends' | 'weekdays';
  commitmentLevel: 'drop-in' | 'regular' | 'active-volunteer';
  preferredProgrammes: ('trubble-bass' | 'kaywana-court' | 'bright-sparks' | 'connoisseurs')[];
  skillsToLearn: string[];
  membershipGoal: 'participate' | 'volunteer' | 'leadership';
  safeguardingStatus?: 'not-required' | 'pending' | 'cleared' | 'requires-review';
  // New ecosystem engagement
  passionistasInterest?: boolean;
  scrapCatContributions?: string[];
  ecosystemUnderstanding?: 'basic' | 'partial' | 'complete';
}

interface VisitorSession {
  sessionId: string;
  startTime: Date;
  currentPage: string;
  pageViews: string[];
  timePerPage: Record<string, number>;
  totalTimeOnSite: number;
  jargonTermsHovered: string[];
  behaviorPattern: BehaviorPattern['type'];
  interests: string[];
  isFirstVisit: boolean;
  visitCount: number;
}

interface CommunityEngagement {
  programmeAttendance: Record<string, number>;
  eventsAttended: string[];
  contributionsToRadyo: number;
  articlesInJoystick: number;
  mentoringSessions: number;
  communityImpactScore: number;
  achievementBadges: string[];
  // New ecosystem engagement tracking
  passionistasActivities: {
    promotions: number;
    reviews: number;
    funding: number;
    fanEvents: number;
  };
  scrapCatContributions: {
    itemsDonated: number;
    materialsRecycled: string[];
    workshopsAttended: number;
    savingsGenerated: number;
  };
  ecosystemCompletions: number;
}

interface MayaState {
  // Core conversation management
  mayaConversation: MayaMessage[];
  conversationHistory: MayaMessage[];
  isTyping: boolean;
  activeROV: 'maya' | 'specialist';
  
  // Enhanced user profiling for community focus
  communityProfile: Partial<CommunityProfile>;
  userContext: UserContext;
  
  // Visitor tracking and guidance
  visitorSession: VisitorSession | null;
  isVisitorGuideActive: boolean;
  contextualGuidance: string[];
  
  // Community knowledge and programmes
  currentProgramme: {
    name: string;
    description: string;
    status: string;
  };
  season: string;
  communityKnowledge: CommunityFact[];
  
  // Enhanced ecosystem understanding
  ecosystemComponents: {
    passionistas: {
      active: boolean;
      activities: ('promote' | 'review' | 'fund' | 'celebrate')[];
      supportedCreators: string[];
    };
    scrapCat: {
      active: boolean;
      materialTypes: ('electronics' | 'fabric' | 'audio' | 'training')[];
      workshopsSavings: Record<string, number>;
    };
  };
  
  // Community engagement tracking
  engagement: CommunityEngagement;
  membershipTier: 'visitor' | 'participant' | 'member' | 'active-volunteer';
  
  // Actions
  addMessage: (message: Omit<MayaMessage, 'id'>) => void;
  executeCommand: (command: string, data?: any) => void;
  updateCommunityProfile: (profile: Partial<CommunityProfile>) => void;
  updateUserContext: (context: Partial<UserContext>) => void;
  
  // Visitor session management
  initializeVisitorSession: () => void;
  updateVisitorSession: (updates: Partial<VisitorSession>) => void;
  recordJargonInteraction: (term: string) => void;
  
  // Community engagement
  recordProgrammeAttendance: (programme: string) => void;
  recordCommunityContribution: (type: 'raydyo' | 'joystick' | 'mentoring', count?: number) => void;
  awardAchievement: (badge: string) => void;
  
  // New ecosystem engagement
  recordPassionistasActivity: (activity: 'promote' | 'review' | 'fund' | 'celebrate', creator?: string) => void;
  recordScrapCatContribution: (materialType: 'electronics' | 'fabric' | 'audio' | 'training', savingsAmount?: number) => void;
  explainEcosystemConnection: (component: 'passionistas' | 'scrap-cat' | 'full-cycle') => void;
  
  // Maya intelligence
  generateMayaResponse: (userMessage: string) => void;
  generateContextualSuggestion: () => void;
  assessMembershipReadiness: () => boolean;
  
  // Context management
  setMayaContext: (contextData: { context: string; data: Record<string, any> }) => void;
  
  // Utility actions
  switchROV: () => void;
  toggleVisitorGuide: () => void;
  clearConversation: () => void;
  resetSession: () => void;
}

export const useMayaStore = create<MayaState>()(
  persist(
    (set, get) => ({
      // Initial state
      mayaConversation: [],
      conversationHistory: [],
      isTyping: false,
      activeROV: 'maya',
      
      communityProfile: {},
      userContext: {
        isLoggedIn: false,
        userType: 'visitor',
        currentPage: '/',
        timeOnPage: 0,
        scrollDepth: 0,
        visitCount: 1,
        behaviorPattern: { type: 'browsing', confidence: 0.5, indicators: [], suggestedActions: [] },
        interests: [],
        lastActivity: new Date()
      },
      
      visitorSession: null,
      isVisitorGuideActive: false,
      contextualGuidance: [],
      
      currentProgramme: getCurrentProgramme(),
      season: getTimeContext(),
      communityKnowledge: [],
      
      // Enhanced ecosystem components
      ecosystemComponents: {
        passionistas: {
          active: true,
          activities: ['promote', 'review', 'fund', 'celebrate'],
          supportedCreators: []
        },
        scrapCat: {
          active: true,
          materialTypes: ['electronics', 'fabric', 'audio', 'training'],
          workshopsSavings: {
            'stem-labs': 70,
            'audio-workshops': 60,
            'fashion-labs': 40,
            'leadership-training': 30
          }
        }
      },
      
      engagement: {
        programmeAttendance: {},
        eventsAttended: [],
        contributionsToRadyo: 0,
        articlesInJoystick: 0,
        mentoringSessions: 0,
        communityImpactScore: 0,
        achievementBadges: [],
        // New ecosystem engagement
        passionistasActivities: {
          promotions: 0,
          reviews: 0,
          funding: 0,
          fanEvents: 0
        },
        scrapCatContributions: {
          itemsDonated: 0,
          materialsRecycled: [],
          workshopsAttended: 0,
          savingsGenerated: 0
        },
        ecosystemCompletions: 0
      },
      membershipTier: 'visitor',

      // Enhanced message handling
      addMessage: (message) => {
        const newMessage: MayaMessage = {
          ...message,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };

        set((state) => ({
          mayaConversation: [...state.mayaConversation, newMessage],
          conversationHistory: [...state.conversationHistory, newMessage],
        }));

        // Auto-respond with Maya if it's a user message
        if (message.sender === 'user') {
          setTimeout(() => {
            get().generateMayaResponse(message.text);
          }, 1000 + Math.random() * 2000);
        }
      },

      // Enhanced command execution for ecosystem context
      executeCommand: (command, data) => {
        const [action, parameter] = command.split(':');
        
        switch (action) {
          case 'programme_interest':
            get().updateCommunityProfile({ 
              preferredProgrammes: [...(get().communityProfile.preferredProgrammes || []), parameter as any] 
            });
            get().addMessage({
              text: `Great choice! ${parameter} is fantastic. I'll show you how it connects to our Passionistas fanclub for promotion and Scrap Cat recycling for affordable materials. It's all part of our circular community ecosystem!`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'ecosystem',
              metadata: { ecosystemComponent: 'full-cycle' }
            });
            break;
            
          case 'ecosystem_interest':
            if (parameter === 'passionistas') {
              get().updateCommunityProfile({ passionistasInterest: true });
              get().explainEcosystemConnection('passionistas');
            } else if (parameter === 'scrap-cat') {
              get().explainEcosystemConnection('scrap-cat');
            } else if (parameter === 'full-cycle') {
              get().explainEcosystemConnection('full-cycle');
            }
            break;
            
          case 'membership_interest':
            get().updateCommunityProfile({ membershipGoal: parameter as any });
            get().addMessage({
              text: `Excellent! I see you're interested in ${parameter}. This opens up the complete ecosystem - from workshop participation through to Passionistas fanclub amplification and Scrap Cat sustainability. Let me explain the pathway and what support you'll get.`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'ecosystem',
              metadata: { ecosystemComponent: 'full-cycle' }
            });
            break;
            
          case 'programme_attended':
            get().recordProgrammeAttendance(parameter);
            break;
            
          case 'passionistas_activity':
            get().recordPassionistasActivity(parameter as any, data);
            break;
            
          case 'scrap_cat_contribution':
            get().recordScrapCatContribution(parameter as any, data);
            break;
            
          case 'jargon_explained':
            get().recordJargonInteraction(parameter);
            break;
            
          case 'community_contribution':
            get().recordCommunityContribution(parameter as any, data);
            break;
            
          case 'safeguarding_alert':
            set({ activeROV: 'specialist' });
            get().addMessage({
              text: `I'm bringing in our specialist ROV to ensure you get accurate information about safeguarding protocols. Community safety is our top priority in all ecosystem activities.`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'safeguarding',
              metadata: { safeguardingAlert: true }
            });
            break;
        }
      },

      // Enhanced Maya response generation with ecosystem awareness
      generateMayaResponse: (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        const { currentProgramme, communityProfile, userContext, ecosystemComponents } = get();
        
        let response = '';
        let type: MayaMessage['type'] = 'message';
        let metadata = {};

        // Ecosystem-specific responses
        if (lowerMessage.includes('passionistas') || lowerMessage.includes('fanclub') || lowerMessage.includes('fan')) {
          response = `The Passionistas Fanclub is how we amplify and sustain all our community outputs! They promote creators, test new work, provide funding through crowdsourcing, and organize celebration events. When you complete a programme, your work gets showcased to this supportive network who help it reach wider audiences and generate income opportunities.`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'passionistas' };
        } else if (lowerMessage.includes('scrap cat') || lowerMessage.includes('recycling') || (lowerMessage.includes('materials') && lowerMessage.includes('cost'))) {
          response = `Scrap Cat is our recycling mascot that makes workshops affordable! We save 70% on STEM materials, 60% on audio equipment, 40% on fashion supplies, and 30% on training resources. Community donations of old electronics, fabric, and equipment become learning materials. It's practical sustainability that reduces costs and builds community connections.`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'scrap-cat' };
        } else if (lowerMessage.includes('ecosystem') || lowerMessage.includes('circular') || lowerMessage.includes('loop')) {
          response = `Our ecosystem is beautifully circular! You start with workshops (using Scrap Cat recycled materials), join programmes to create real outputs, showcase your work to the community, then Passionistas amplify it while Scrap Cat recycles any waste back into new workshop materials. Nothing is wasted, everyone is supported, and the cycle continues!`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'full-cycle' };
        } else if (lowerMessage.includes('programme') || lowerMessage.includes('program')) {
          response = `We have four seasonal programmes that all connect to our ecosystem: Trubble n Bass (music → radio shows → fanclub promotion), Kaywana's Court (drama → live shows → watch parties), Bright Sparks (STEM → prototypes → crowdfunding), and Connoisseurs Club (leadership → community roles → recognition). Right now, ${currentProgramme.name} is ${currentProgramme.status}. Which creative pathway interests you?`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'full-cycle' };
        } else if (lowerMessage.includes('cost') || lowerMessage.includes('free') || lowerMessage.includes('fee') || lowerMessage.includes('afford')) {
          response = `Programmes are free to attend, and Scrap Cat recycling keeps material costs minimal. Membership has a small monthly fee but opens up the complete ecosystem - programme access, Passionistas network support, and potential income from showcased work. Many members earn back their membership fees through opportunities the fanclub creates!`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'full-cycle' };
        } else if (lowerMessage.includes('member') || lowerMessage.includes('join')) {
          response = `Membership unlocks the full ecosystem experience! You get priority programme access, Passionistas fanclub support for your creative work, ability to contribute materials to Scrap Cat, and most importantly - your outputs get amplified by our supportive community network. It's not just participation, it's becoming part of a creative economy.`;
          type = 'ecosystem';
          metadata = { ecosystemComponent: 'full-cycle' };
        } else if (lowerMessage.includes('time') || lowerMessage.includes('commitment')) {
          response = `The ecosystem is designed to be flexible. Programmes run 8 weeks with 2-hour weekly sessions. Passionistas activities happen when you want to support others. Scrap Cat contributions are whenever convenient. You can engage at your own pace - some people focus on one programme annually, others get deeply involved in multiple ecosystem components.`;
          type = 'guidance';
        } else if (lowerMessage.includes('safeguard') || lowerMessage.includes('child') || lowerMessage.includes('young')) {
          response = `All youth involvement requires enhanced safeguarding clearance and specific training - this applies across all ecosystem components. I'm bringing in our Security & Safeguarding ROV to ensure you get accurate information about our protection policies for workshops, programmes, fanclub activities, and recycling sessions.`;
          type = 'safeguarding';
          metadata = { safeguardingAlert: true };
          set({ activeROV: 'specialist' });
        } else if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
          if (userContext.currentPage === '/programmes') {
            response = `I see you're exploring our programmes. Each one creates a pathway from learning through to community showcase and fanclub amplification. What specific aspect interests you - the skills development, the creative outputs, or the community support network?`;
          } else if (userContext.currentPage === '/workshops') {
            response = `Looking at workshops? Remember, these use Scrap Cat recycled materials to keep costs low, and lead into programmes where your work gets showcased to our Passionistas network. What type of skills development appeals to you most?`;
          } else {
            response = `I'm here to help you understand our complete community ecosystem! I can explain how workshops connect to programmes, how the Passionistas fanclub supports creators, how Scrap Cat makes everything affordable, or help you find the right entry point for your interests.`;
          }
          type = 'guidance';
        } else {
          // Contextual responses with ecosystem awareness
          if (userContext.behaviorPattern.type === 'deciding') {
            response = `I can see you're taking time to explore what we offer. That's smart! Our ecosystem is comprehensive - from workshops through to income-generating opportunities. What matters most to you: learning new skills, creating meaningful work, or being part of a supportive community network?`;
          } else if (userContext.currentPage === '/about') {
            response = `Learning about our organization shows you're thinking seriously about involvement. We're designed as a complete circular ecosystem where your contributions are valued, amplified, and sustained. What aspects of our integrated approach interest you most?`;
          } else {
            const responses = [
              `Welcome to Wembley Wonders' creative ecosystem! I'm here to show you how workshops, programmes, fanclub support, and recycling all connect. What interests you most?`,
              `Every successful community member started by understanding our ecosystem. From workshops to showcases to fanclub amplification - where would you like to begin exploring?`,
              `Our circular community system ensures nothing is wasted and everyone is supported. What draws you to community involvement, and how can I show you the pathway that fits?`,
            ];
            response = responses[Math.floor(Math.random() * responses.length)];
          }
        }

        // Add Maya's response
        get().addMessage({
          text: response,
          sender: get().activeROV,
          timestamp: new Date(),
          type,
          metadata
        });
      },

      // New ecosystem explanation function
      explainEcosystemConnection: (component) => {
        let response = '';
        
        if (component === 'passionistas') {
          response = `The Passionistas Fanclub creates a sustainable creative economy around all our outputs! They promote Rayd-yo shows, organize watch parties for Kaywana's Court performances, crowdfund STEM prototypes, and celebrate leadership achievements. It's how creators get audiences, feedback, and income opportunities. Would you like to join as a fan supporter or focus on creating work for them to amplify?`;
        } else if (component === 'scrap-cat') {
          response = `Scrap Cat recycling makes workshops accessible by turning community donations into learning materials! Your old laptop becomes STEM lab equipment, fabric scraps become fashion materials, broken audio gear gets repaired for music workshops. It saves massive costs while building neighborhood connections. Would you like to donate materials or participate in recycling workshops?`;
        } else if (component === 'full-cycle') {
          response = `Here's the complete cycle: Start with workshops (using Scrap Cat materials) → Join programmes (apply skills to real projects) → Showcase outputs (radio, performances, publications) → Passionistas amplify (promotion, funding, celebration) → Waste gets recycled back to Scrap Cat → New people inspired to join workshops. It's a perfect circular system where everyone benefits and nothing is wasted!`;
        }
        
        get().addMessage({
          text: response,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: component }
        });
      },

      // New ecosystem engagement tracking
      recordPassionistasActivity: (activity, creator) => {
        set((state) => {
          const updates = { ...state.engagement.passionistasActivities };
          updates[`${activity}s` as keyof typeof updates] += 1;
          
          return {
            engagement: {
              ...state.engagement,
              passionistasActivities: updates,
              communityImpactScore: state.engagement.communityImpactScore + 15
            }
          };
        });
        
        const activityNames = {
          promote: 'promotion',
          review: 'review',
          fund: 'funding contribution',
          celebrate: 'celebration event'
        };
        
        get().addMessage({
          text: `Thank you for your ${activityNames[activity]}! This is exactly how the Passionistas network supports our creative community. Your amplification helps creators reach wider audiences and build sustainable creative practices.`,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: 'passionistas' }
        });
      },

      recordScrapCatContribution: (materialType, savingsAmount = 0) => {
        set((state) => ({
          engagement: {
            ...state.engagement,
            scrapCatContributions: {
              ...state.engagement.scrapCatContributions,
              itemsDonated: state.engagement.scrapCatContributions.itemsDonated + 1,
              materialsRecycled: [...state.engagement.scrapCatContributions.materialsRecycled, materialType],
              savingsGenerated: state.engagement.scrapCatContributions.savingsGenerated + savingsAmount
            },
            communityImpactScore: state.engagement.communityImpactScore + 20
          }
        }));
        
        const materialNames = {
          electronics: 'electronics and tech equipment',
          fabric: 'fabric and craft materials',
          audio: 'audio equipment and cables',
          training: 'training and educational materials'
        };
        
        get().addMessage({
          text: `Wonderful Scrap Cat contribution! Your ${materialNames[materialType]} will help reduce workshop costs and provide hands-on learning materials for other community members. This kind of practical sustainability is what makes our ecosystem work for everyone.`,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: 'scrap-cat' }
        });
      },

      // Community profile management (enhanced)
      updateCommunityProfile: (profile) => {
        set((state) => ({
          communityProfile: { ...state.communityProfile, ...profile }
        }));
      },

      updateUserContext: (context) => {
        set((state) => ({
          userContext: { ...state.userContext, ...context }
        }));
      },

      // Visitor session management
      initializeVisitorSession: () => {
        const existingSession = localStorage.getItem('maya-visitor-session');
        let session: VisitorSession;
        
        if (existingSession) {
          const parsed = JSON.parse(existingSession);
          session = {
            ...parsed,
            startTime: new Date(parsed.startTime),
            visitCount: parsed.visitCount + 1,
            isFirstVisit: false
          };
        } else {
          session = {
            sessionId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            startTime: new Date(),
            currentPage: '/',
            pageViews: ['/'],
            timePerPage: {},
            totalTimeOnSite: 0,
            jargonTermsHovered: [],
            behaviorPattern: 'browsing',
            interests: [],
            isFirstVisit: true,
            visitCount: 1
          };
        }
        
        set({ visitorSession: session });
        localStorage.setItem('maya-visitor-session', JSON.stringify(session));
      },

      updateVisitorSession: (updates) => {
        set((state) => {
          if (!state.visitorSession) return state;
          
          const updatedSession = { ...state.visitorSession, ...updates };
          localStorage.setItem('maya-visitor-session', JSON.stringify(updatedSession));
          
          return { visitorSession: updatedSession };
        });
      },

      recordJargonInteraction: (term) => {
        set((state) => {
          if (!state.visitorSession) return state;
          
          const updatedTerms = [...state.visitorSession.jargonTermsHovered];
          if (!updatedTerms.includes(term)) {
            updatedTerms.push(term);
          }
          
          const updatedSession = {
            ...state.visitorSession,
            jargonTermsHovered: updatedTerms
          };
          
          localStorage.setItem('maya-visitor-session', JSON.stringify(updatedSession));
          
          return { visitorSession: updatedSession };
        });
      },

      // Community engagement tracking (enhanced with ecosystem components)
      recordProgrammeAttendance: (programme) => {
        set((state) => ({
          engagement: {
            ...state.engagement,
            programmeAttendance: {
              ...state.engagement.programmeAttendance,
              [programme]: (state.engagement.programmeAttendance[programme] || 0) + 1
            },
            communityImpactScore: state.engagement.communityImpactScore + 10
          }
        }));
        
        get().addMessage({
          text: `Wonderful! I've recorded your attendance at ${programme}. Every session builds your skills and connects you deeper into our ecosystem. Your work here could be showcased to the Passionistas network and any materials saved could benefit future Scrap Cat recycling efforts!`,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: 'full-cycle' }
        });
      },

      recordCommunityContribution: (type, count = 1) => {
        set((state) => {
          const updates: Partial<CommunityEngagement> = {
            communityImpactScore: state.engagement.communityImpactScore + (count * 25)
          };
          
          if (type === 'raydyo') {
            updates.contributionsToRadyo = state.engagement.contributionsToRadyo + count;
          } else if (type === 'joystick') {
            updates.articlesInJoystick = state.engagement.articlesInJoystick + count;
          } else if (type === 'mentoring') {
            updates.mentoringSessions = state.engagement.mentoringSessions + count;
          }
          
          return {
            engagement: { ...state.engagement, ...updates }
          };
        });
        
        const contributionNames = {
          raydyo: 'Rayd-yo podcast/radio contribution',
          joystick: 'Joystick e-zine article',
          mentoring: 'mentoring session'
        };
        
        get().addMessage({
          text: `Excellent ${contributionNames[type]}! This is exactly how our ecosystem creates value - your contribution will be promoted by the Passionistas fanclub, reach wider audiences, and inspire others to join our creative community. You're part of the circular success story!`,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: 'passionistas' }
        });
      },

      awardAchievement: (badge) => {
        set((state) => ({
          engagement: {
            ...state.engagement,
            achievementBadges: [...state.engagement.achievementBadges, badge],
            communityImpactScore: state.engagement.communityImpactScore + 50
          }
        }));
        
        get().addMessage({
          text: `Achievement unlocked: ${badge}! Your growing involvement demonstrates how our ecosystem supports individual growth while building community strength. The Passionistas network will celebrate this milestone, and your success inspires others to join the creative journey!`,
          sender: 'maya',
          timestamp: new Date(),
          type: 'ecosystem',
          metadata: { ecosystemComponent: 'full-cycle' }
        });
      },

      // Enhanced Maya intelligence with ecosystem awareness
      generateContextualSuggestion: () => {
        const { userContext, communityProfile, engagement, currentProgramme } = get();
        
        if (userContext.behaviorPattern.type === 'deciding' && userContext.timeOnPage > 120) {
          get().addMessage({
            text: `I can see you're taking time to understand our ecosystem - that shows wisdom! Based on your browsing, would you like me to explain how our circular system works, suggest a specific entry point, or show you the complete journey from workshops to community recognition?`,
            sender: 'maya',
            timestamp: new Date(),
            type: 'ecosystem',
            metadata: { ecosystemComponent: 'full-cycle' }
          });
        } else if (userContext.currentPage === '/programmes' && userContext.timeOnPage > 60) {
          get().addMessage({
            text: `The programme page shows how skills become community outputs! Since ${currentProgramme.name} is ${currentProgramme.status}, this is perfect timing. Each programme connects to Passionistas amplification and uses Scrap Cat materials - would you like to see the complete pathway for one that interests you?`,
            sender: 'maya',
            timestamp: new Date(),
            type: 'ecosystem',
            metadata: { ecosystemComponent: 'full-cycle' }
          });
        } else if (userContext.currentPage === '/workshops' && userContext.timeOnPage > 90) {
          get().addMessage({
            text: `I see you're exploring workshops - these are where the ecosystem begins! Using Scrap Cat recycled materials keeps costs low, and your skills development leads to programmes where the Passionistas network can amplify your creative work. Which workshop type appeals to you most?`,
            sender: 'maya',
            timestamp: new Date(),
            type: 'ecosystem',
            metadata: { ecosystemComponent: 'scrap-cat' }
          });
        }
      },

      assessMembershipReadiness: () => {
        const { engagement, communityProfile } = get();
        const totalAttendance = Object.values(engagement.programmeAttendance).reduce((sum, count) => sum + count, 0);
        const passionistasEngagement = Object.values(engagement.passionistasActivities).reduce((sum, count) => sum + count, 0);
        const scrapCatEngagement = engagement.scrapCatContributions.itemsDonated + engagement.scrapCatContributions.workshopsAttended;

        return (
          totalAttendance >= 3 ||
          engagement.communityImpactScore >= 100 ||
          passionistasEngagement >= 2 ||
          scrapCatEngagement >= 2 ||
          (['regular', 'active-volunteer'].includes(communityProfile.commitmentLevel ?? ''))
        );
      },

      // Context management
      setMayaContext: (contextData) => {
        set((state) => ({
          userContext: {
            ...state.userContext,
            currentPage: contextData.data.currentPage || state.userContext.currentPage,
            lastActivity: new Date()
          }
        }));
        
        // Auto-generate contextual ecosystem guidance based on page context
        if (contextData.context === 'programmes') {
          setTimeout(() => {
            get().addMessage({
              text: `I see you're exploring our programmes! Each one is part of our complete ecosystem - workshops provide foundation skills using Scrap Cat materials, programmes create real outputs, and the Passionistas network amplifies your work. Would you like me to explain how this circular system creates opportunities for recognition and income?`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'ecosystem',
              metadata: { ecosystemComponent: 'full-cycle' }
            });
          }, 3000);
        } else if (contextData.context === 'team') {
          setTimeout(() => {
            get().addMessage({
              text: `Our team facilitates the complete ecosystem journey! Each specialist guides you from workshops through programmes to community showcases, while coordinating with both Passionistas amplification and Scrap Cat sustainability efforts. It's comprehensive support for your creative development!`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'ecosystem',
              metadata: { ecosystemComponent: 'full-cycle' }
            });
          }, 3000);
        } else if (contextData.context === 'workshops') {
          setTimeout(() => {
            get().addMessage({
              text: `Workshops are where the ecosystem begins! We use Scrap Cat recycled materials to keep costs down, and every skill you develop here connects to our programmes where the Passionistas network can amplify your creative outputs. What type of skills development interests you most?`,
              sender: 'maya',
              timestamp: new Date(),
              type: 'ecosystem',
              metadata: { ecosystemComponent: 'scrap-cat' }
            });
          }, 3000);
        }
      },

      // Utility actions
      switchROV: () => {
        set((state) => ({
          activeROV: state.activeROV === 'maya' ? 'specialist' : 'maya'
        }));
      },

      toggleVisitorGuide: () => {
        set((state) => ({
          isVisitorGuideActive: !state.isVisitorGuideActive
        }));
      },

      clearConversation: () => {
        set({ mayaConversation: [] });
      },

      resetSession: () => {
        localStorage.removeItem('maya-visitor-session');
        set({
          visitorSession: null,
          mayaConversation: [],
          userContext: {
            isLoggedIn: false,
            userType: 'visitor',
            currentPage: '/',
            timeOnPage: 0,
            scrollDepth: 0,
            visitCount: 1,
            behaviorPattern: { type: 'browsing', confidence: 0.5, indicators: [], suggestedActions: [] },
            interests: [],
            lastActivity: new Date()
          }
        });
      },
    }),
    {
      name: 'maya-store',
      partialize: (state) => ({
        communityProfile: state.communityProfile,
        engagement: state.engagement,
        ecosystemComponents: state.ecosystemComponents,
        membershipTier: state.membershipTier,
        conversationHistory: state.conversationHistory.slice(-100), // Keep last 100 messages
        communityKnowledge: state.communityKnowledge
      }),
    }
  )
);

// Enhanced helper hooks for Wembley Wonders ecosystem focus
export const useMayaCommunityGuidance = () => {
  const store = useMayaStore();
  return {
    getProgrammeRecommendations: (interests: string[]) => {
      const programmes = [];
      if (interests.some(i => ['music', 'media', 'audio'].includes(i))) {
        programmes.push('trubble-bass');
      }
      if (interests.some(i => ['drama', 'writing', 'arts', 'creative'].includes(i))) {
        programmes.push('kaywana-court');
      }
      if (interests.some(i => ['stem', 'technology', 'business', 'innovation'].includes(i))) {
        programmes.push('bright-sparks');
      }
      if (interests.some(i => ['leadership', 'governance', 'community'].includes(i))) {
        programmes.push('connoisseurs');
      }
      return programmes;
    },
    
    getMembershipPathwayRecommendation: (profile: CommunityProfile) => {
      if (profile.membershipGoal === 'leadership' || profile.commitmentLevel === 'active-volunteer') {
        return {
          recommended: 'active-volunteer',
          path: 'Start as participant → Regular member → Active volunteer member',
          timeline: '6-12 months',
          requirements: 'Programme completion, community contribution, Passionistas engagement, safeguarding clearance',
          ecosystemBenefits: 'Full fanclub network access, Scrap Cat coordination role, showcase priority'
        };
      } else if (profile.commitmentLevel === 'regular') {
        return {
          recommended: 'member',
          path: 'Start as participant → Regular member',
          timeline: '1-3 months',
          requirements: 'Attend programmes, pay membership fee, engage with ecosystem',
          ecosystemBenefits: 'Passionistas network support, Scrap Cat material access, showcase opportunities'
        };
      } else {
        return {
          recommended: 'participant',
          path: 'Drop-in participation',
          timeline: 'Immediate',
          requirements: 'Just turn up to programme sessions',
          ecosystemBenefits: 'Basic Scrap Cat materials, workshop access, community showcases'
        };
      }
    },
    
    getEngagementLevel: () => {
      const { engagement } = store;
      const totalContributions = 
        engagement.contributionsToRadyo + 
        engagement.articlesInJoystick + 
        engagement.mentoringSessions;
      const totalAttendance = Object.values(engagement.programmeAttendance).reduce((sum, count) => sum + count, 0);
      const passionistasTotal = Object.values(engagement.passionistasActivities).reduce((sum, count) => sum + count, 0);
      const scrapCatTotal = engagement.scrapCatContributions.itemsDonated + engagement.scrapCatContributions.workshopsAttended;
      
      const ecosystemEngagement = passionistasTotal + scrapCatTotal;
      
      if (totalContributions >= 3 || totalAttendance >= 8 || ecosystemEngagement >= 5 || engagement.communityImpactScore >= 200) {
        return 'high';
      } else if (totalContributions >= 1 || totalAttendance >= 3 || ecosystemEngagement >= 2 || engagement.communityImpactScore >= 50) {
        return 'medium';
      } else {
        return 'low';
      }
    },

    // New ecosystem-specific guidance
    getEcosystemReadiness: (profile: CommunityProfile) => {
      const { engagement } = store;
      
      if (profile.passionistasInterest) {
        return {
          component: 'passionistas',
          readiness: engagement.communityImpactScore >= 50 ? 'ready' : 'developing',
          nextSteps: engagement.communityImpactScore >= 50 
            ? ['Join fanclub activities', 'Support other creators', 'Organize events']
            : ['Complete more programmes', 'Create showcase-worthy work', 'Build community connections']
        };
      } else if (profile.scrapCatContributions && profile.scrapCatContributions.length > 0) {
        return {
          component: 'scrap-cat',
          readiness: 'active',
          nextSteps: ['Attend recycling workshops', 'Coordinate material drives', 'Mentor sustainable practices']
        };
      } else {
        return {
          component: 'full-cycle',
          readiness: 'exploring',
          nextSteps: ['Try a workshop', 'Understand the ecosystem', 'Find your creative pathway']
        };
      }
    }
  };
};

export const useMayaEcosystemTracking = () => {
  const store = useMayaStore();
  return {
    passionistasActivities: store.engagement.passionistasActivities,
    scrapCatContributions: store.engagement.scrapCatContributions,
    recordPassionistasActivity: store.recordPassionistasActivity,
    recordScrapCatContribution: store.recordScrapCatContribution,
    ecosystemComponents: store.ecosystemComponents,
    communityImpactScore: store.engagement.communityImpactScore,
    ecosystemCompletions: store.engagement.ecosystemCompletions
  };
};

export const useMayaVisitorTracking = () => {
  const store = useMayaStore();
  return {
    session: store.visitorSession,
    initializeSession: store.initializeVisitorSession,
    updateSession: store.updateVisitorSession,
    recordJargon: store.recordJargonInteraction,
    isFirstVisit: store.visitorSession?.isFirstVisit ?? true,
    behaviorPattern: store.visitorSession?.behaviorPattern ?? 'browsing'
  };
};

export default useMayaStore;