// src/systems/rovs/personalities/collector/CollectorROV.tsx
// 📝 Collector — The Story Journalist

import React from 'react';

export interface StoryFlag {
  id: string;
  type: 'breakthrough' | 'heritage' | 'mentoring' | 'impact' | 'comeback';
  priority: 'high' | 'medium' | 'low';
  headline: string;
  summary: string;
  learnerId: string;
  learnerName: string;
  programme: string;
  publishTarget: 'joystick' | 'raydyo' | 'both';
  flaggedAt: Date;
  status: 'flagged' | 'drafting' | 'review' | 'published' | 'archived';
}

export interface CollectorProps {
  learnerId: string;
  onStoryFlagged: (story: StoryFlag) => void;
  onDraftCreated: (storyId: string, draft: string) => void;
}

/**
 * Collector ROV - Identifies and drafts compelling stories
 * 
 * Personality: Curious journalist who always asks "tell me more"
 * Primary Role: Story identification and content creation
 */
export const CollectorROV: React.FC<CollectorProps> = ({
  learnerId,
  onStoryFlagged,
  onDraftCreated
}) => {
  const [flaggedStories, setFlaggedStories] = React.useState<StoryFlag[]>([]);

  const messages: Record<string, string[]> = {
    story: [
      "This could be a great story for Joystick. Tell me more about how you figured that out?",
      "I'm sensing a story here. Can I ask you a few questions?",
      "The way you described that — our community needs to hear this."
    ],
    mentoring: [
      "The way you helped Marcus learn — that's exactly the kind of story we love to share.",
      "Teaching moments like this inspire others. Can we document it?",
      "This mentoring session could help so many others. Mind if I capture it?"
    ],
    heritage: [
      "Elder knowledge being passed down. This needs to be documented. Can we record?",
      "Four generations of wisdom in one recipe. This belongs in our archive.",
      "Stories like this are why we exist. Let's preserve this properly."
    ],
    impact: [
      "You just helped your first community member. That's front-page material!",
      "From learner to teacher in three months. That's the Wembley Wonders story.",
      "This repair saved £200 and kept a device out of landfill. Story gold!"
    ]
  };

  const flagStory = (
    type: StoryFlag['type'],
    headline: string,
    summary: string,
    learnerName: string,
    programme: string
  ) => {
    const story: StoryFlag = {
      id: `story-${Date.now()}`,
      type,
      priority: type === 'heritage' || type === 'breakthrough' ? 'high' : 'medium',
      headline,
      summary,
      learnerId,
      learnerName,
      programme,
      publishTarget: type === 'heritage' ? 'both' : 'joystick',
      flaggedAt: new Date(),
      status: 'flagged'
    };
    
    setFlaggedStories(prev => [...prev, story]);
    onStoryFlagged(story);
  };

  return (
    <div className="rov-collector" data-rov="collector">
      <div className="rov-avatar">📝</div>
      <div className="rov-content">
        <div className="rov-name">Collector</div>
        <div className="rov-role">Story Journalist</div>
        <div className="rov-queue">
          {flaggedStories.filter(s => s.status === 'flagged').length} stories in queue
        </div>
      </div>
    </div>
  );
};

export const collectorUtils = {
  generateHeadline: (type: StoryFlag['type'], context: string): string => {
    const templates: Record<string, string[]> = {
      breakthrough: [
        "From Struggle to Success: {context}",
        "The Moment Everything Clicked: {context}",
        "Against the Odds: {context}"
      ],
      heritage: [
        "Preserving What Matters: {context}",
        "Wisdom Across Generations: {context}",
        "Our Heritage, Our Future: {context}"
      ],
      mentoring: [
        "Paying It Forward: {context}",
        "When Learners Become Teachers: {context}",
        "The Mentoring Effect: {context}"
      ],
      impact: [
        "Making a Difference: {context}",
        "Community Impact: {context}",
        "Real Change, Real People: {context}"
      ],
      comeback: [
        "Back and Stronger: {context}",
        "The Return: {context}",
        "Never Too Late: {context}"
      ]
    };
    
    const options = templates[type] || templates.impact;
    const template = options[Math.floor(Math.random() * options.length)];
    return template.replace('{context}', context);
  },

  assessPublicationPotential: (story: StoryFlag): number => {
    let score = 50; // Base score
    
    if (story.type === 'heritage') score += 30;
    if (story.type === 'breakthrough') score += 20;
    if (story.type === 'mentoring') score += 15;
    if (story.priority === 'high') score += 20;
    
    return Math.min(100, score);
  }
};

export default CollectorROV;
