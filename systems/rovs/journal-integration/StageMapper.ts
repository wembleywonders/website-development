// src/systems/rovs/journal-integration/StageMapper.ts
// Maps activities to the 5Cs framework stages

export type Stage = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate';

export interface StageMapping {
  activityType: string;
  primaryStage: Stage;
  secondaryStages: Stage[];
  description: string;
}

export interface LearnerStageProgress {
  learnerId: string;
  connect: number;
  create: number;
  cultivate: number;
  compete: number;
  celebrate: number;
  currentStage: Stage;
  stageHistory: Array<{ stage: Stage; enteredAt: Date }>;
}

export class StageMapper {
  private mappings: StageMapping[];

  constructor() {
    this.mappings = [
      // CONNECT stage activities
      { activityType: 'registration', primaryStage: 'connect', secondaryStages: [], description: 'Initial registration' },
      { activityType: 'orientation', primaryStage: 'connect', secondaryStages: [], description: 'Platform orientation' },
      { activityType: 'preferences', primaryStage: 'connect', secondaryStages: [], description: 'Setting preferences' },
      { activityType: 'mentor-match', primaryStage: 'connect', secondaryStages: ['cultivate'], description: 'Mentor matching' },
      
      // CREATE stage activities
      { activityType: 'workshop', primaryStage: 'create', secondaryStages: [], description: 'Workshop participation' },
      { activityType: 'build', primaryStage: 'create', secondaryStages: [], description: 'Building/making' },
      { activityType: 'repair', primaryStage: 'create', secondaryStages: [], description: 'Repair work' },
      { activityType: 'recording', primaryStage: 'create', secondaryStages: [], description: 'Audio/video recording' },
      { activityType: 'writing', primaryStage: 'create', secondaryStages: [], description: 'Content writing' },
      { activityType: 'practice', primaryStage: 'create', secondaryStages: [], description: 'Skill practice' },
      
      // CULTIVATE stage activities
      { activityType: 'reflection', primaryStage: 'cultivate', secondaryStages: [], description: 'Self-reflection' },
      { activityType: 'feedback', primaryStage: 'cultivate', secondaryStages: [], description: 'Receiving feedback' },
      { activityType: 'mentoring-received', primaryStage: 'cultivate', secondaryStages: ['connect'], description: 'Mentoring session' },
      { activityType: 'peer-review', primaryStage: 'cultivate', secondaryStages: [], description: 'Peer review' },
      
      // COMPETE stage activities
      { activityType: 'assessment', primaryStage: 'compete', secondaryStages: [], description: 'Badge assessment' },
      { activityType: 'showcase', primaryStage: 'compete', secondaryStages: ['celebrate'], description: 'Work showcase' },
      { activityType: 'pitchfest', primaryStage: 'compete', secondaryStages: ['celebrate'], description: 'Pitch competition' },
      { activityType: 'performance', primaryStage: 'compete', secondaryStages: ['celebrate'], description: 'Live performance' },
      
      // CELEBRATE stage activities
      { activityType: 'badge-earned', primaryStage: 'celebrate', secondaryStages: [], description: 'Badge achievement' },
      { activityType: 'publication', primaryStage: 'celebrate', secondaryStages: [], description: 'Story published' },
      { activityType: 'mentoring-given', primaryStage: 'celebrate', secondaryStages: ['cultivate'], description: 'Mentoring others' },
      { activityType: 'graduation', primaryStage: 'celebrate', secondaryStages: [], description: 'Programme completion' }
    ];
  }

  /**
   * Get stage for an activity type
   */
  getStage(activityType: string): Stage {
    const mapping = this.mappings.find(m => m.activityType === activityType);
    return mapping?.primaryStage || 'create';
  }

  /**
   * Get all stages an activity contributes to
   */
  getAllStages(activityType: string): Stage[] {
    const mapping = this.mappings.find(m => m.activityType === activityType);
    if (!mapping) return ['create'];
    return [mapping.primaryStage, ...mapping.secondaryStages];
  }

  /**
   * Calculate learner's stage progress
   */
  calculateProgress(activities: Array<{ type: string; timestamp: Date }>): LearnerStageProgress {
    const progress: LearnerStageProgress = {
      learnerId: '',
      connect: 0,
      create: 0,
      cultivate: 0,
      compete: 0,
      celebrate: 0,
      currentStage: 'connect',
      stageHistory: []
    };

    activities.forEach(activity => {
      const stages = this.getAllStages(activity.type);
      stages.forEach(stage => {
        progress[stage]++;
      });
    });

    // Determine current stage based on progress
    const total = progress.connect + progress.create + progress.cultivate + 
                  progress.compete + progress.celebrate;
    
    if (total === 0) {
      progress.currentStage = 'connect';
    } else if (progress.celebrate > 0) {
      progress.currentStage = 'celebrate';
    } else if (progress.compete > 0) {
      progress.currentStage = 'compete';
    } else if (progress.cultivate > 0) {
      progress.currentStage = 'cultivate';
    } else if (progress.create > 0) {
      progress.currentStage = 'create';
    }

    return progress;
  }

  /**
   * Get stage description
   */
  getStageDescription(stage: Stage): {
    name: string;
    emoji: string;
    description: string;
    activities: string[];
  } {
    const stages: Record<Stage, any> = {
      connect: {
        name: 'Connect',
        emoji: '🤝',
        description: 'Building relationships and understanding your journey',
        activities: ['Registration', 'Orientation', 'Mentor matching']
      },
      create: {
        name: 'Create',
        emoji: '🛠️',
        description: 'Hands-on learning and skill building',
        activities: ['Workshops', 'Building', 'Recording', 'Practice']
      },
      cultivate: {
        name: 'Cultivate',
        emoji: '🌱',
        description: 'Deepening skills through feedback and reflection',
        activities: ['Mentoring', 'Peer review', 'Reflection']
      },
      compete: {
        name: 'Compete',
        emoji: '🏆',
        description: 'Demonstrating skills and earning recognition',
        activities: ['Assessment', 'Showcase', 'Pitchfest']
      },
      celebrate: {
        name: 'Celebrate',
        emoji: '🎉',
        description: 'Sharing achievements and giving back',
        activities: ['Badge awards', 'Publication', 'Mentoring others']
      }
    };

    return stages[stage];
  }
}

export default StageMapper;