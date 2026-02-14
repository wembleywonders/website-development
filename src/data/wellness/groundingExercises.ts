/**
 * Grounding Exercises - Types & Data
 * ===================================
 * 
 * Evidence-based grounding and calming techniques
 * For use with Mindful ROV specialist
 * 
 * These exercises help with:
 * - Anxiety and panic attacks
 * - Dissociation
 * - Overwhelming emotions
 * - Stress management
 */

// ============================================
// TYPES
// ============================================

export interface GroundingStep {
  instruction: string;
  duration?: number; // seconds
  breathPhase?: 'inhale' | 'hold' | 'exhale' | 'rest';
  sensoryFocus?: 'see' | 'touch' | 'hear' | 'smell' | 'taste';
}

export interface GroundingExercise {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  bestFor: string[];
  steps: GroundingStep[];
  completionMessage: string;
  audioGuided?: boolean;
  category: 'breathing' | 'sensory' | 'movement' | 'cognitive';
}

export interface MoodCheckIn {
  id: string;
  label: string;
  emoji: string;
  followUp: string;
  suggestedExercises: string[];
}

// ============================================
// MOOD CHECK-IN OPTIONS
// ============================================

export const MOOD_OPTIONS: MoodCheckIn[] = [
  {
    id: 'anxious',
    label: 'Anxious / Worried',
    emoji: '😰',
    followUp: "Anxiety is tough. Let's try something to help calm your nervous system.",
    suggestedExercises: ['box-breathing', '5-4-3-2-1', 'body-scan']
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    emoji: '😵',
    followUp: "When everything feels like too much, we focus on just one thing at a time.",
    suggestedExercises: ['5-4-3-2-1', 'cold-water', 'feet-on-floor']
  },
  {
    id: 'panicking',
    label: 'Panicking / Can\'t Breathe',
    emoji: '😨',
    followUp: "You're safe. Let's slow things down together. Focus on my words.",
    suggestedExercises: ['physiological-sigh', 'feet-on-floor', 'cold-water']
  },
  {
    id: 'disconnected',
    label: 'Disconnected / Numb',
    emoji: '😶',
    followUp: "Let's gently reconnect you with the present moment.",
    suggestedExercises: ['5-4-3-2-1', 'body-scan', 'temperature-check']
  },
  {
    id: 'sad',
    label: 'Sad / Low',
    emoji: '😢',
    followUp: "It's okay to feel sad. Let's do something gentle together.",
    suggestedExercises: ['self-compassion', 'body-scan', 'gratitude-anchor']
  },
  {
    id: 'angry',
    label: 'Angry / Frustrated',
    emoji: '😤',
    followUp: "That energy needs somewhere to go. Let's channel it safely.",
    suggestedExercises: ['tension-release', 'box-breathing', 'cold-water']
  },
  {
    id: 'restless',
    label: 'Restless / Can\'t Settle',
    emoji: '🤯',
    followUp: "Sometimes we need to move before we can be still.",
    suggestedExercises: ['tension-release', 'butterfly-hug', 'feet-on-floor']
  }
];

// ============================================
// GROUNDING EXERCISES
// ============================================

export const GROUNDING_EXERCISES: GroundingExercise[] = [
  // BREATHING EXERCISES
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    shortName: 'Box',
    description: 'A simple 4-4-4-4 breathing pattern used by Navy SEALs to stay calm under pressure.',
    icon: '⬜',
    duration: '2-3 minutes',
    difficulty: 'easy',
    bestFor: ['Anxiety', 'Stress', 'Before difficult conversations', 'Sleep'],
    category: 'breathing',
    steps: [
      { instruction: 'Get comfortable. Sit or lie down.', duration: 3 },
      { instruction: 'Breathe IN slowly through your nose...', duration: 4, breathPhase: 'inhale' },
      { instruction: 'HOLD your breath gently...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT slowly through your mouth...', duration: 4, breathPhase: 'exhale' },
      { instruction: 'HOLD empty...', duration: 4, breathPhase: 'rest' },
      { instruction: 'Breathe IN...', duration: 4, breathPhase: 'inhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'Breathe OUT...', duration: 4, breathPhase: 'exhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'rest' },
      { instruction: 'Continue this pattern. IN...', duration: 4, breathPhase: 'inhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'OUT...', duration: 4, breathPhase: 'exhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'rest' },
      { instruction: 'One more round. IN...', duration: 4, breathPhase: 'inhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'hold' },
      { instruction: 'OUT...', duration: 4, breathPhase: 'exhale' },
      { instruction: 'HOLD...', duration: 4, breathPhase: 'rest' },
      { instruction: 'Return to normal breathing. Notice how you feel.', duration: 5 }
    ],
    completionMessage: "Well done. Your nervous system is now calmer. Use this anytime you need it."
  },
  {
    id: 'physiological-sigh',
    name: 'Physiological Sigh',
    shortName: 'Sigh',
    description: 'The fastest way to calm down — a double inhale followed by a long exhale. Backed by Stanford research.',
    icon: '😮‍💨',
    duration: '30 seconds',
    difficulty: 'easy',
    bestFor: ['Panic', 'Quick reset', 'Before speaking', 'Immediate calm'],
    category: 'breathing',
    steps: [
      { instruction: 'Take a deep breath IN through your nose...', duration: 2, breathPhase: 'inhale' },
      { instruction: 'Now take a second short breath IN on top of that...', duration: 1, breathPhase: 'inhale' },
      { instruction: 'Slowly breathe OUT through your mouth... let it all go...', duration: 6, breathPhase: 'exhale' },
      { instruction: 'Again: deep breath IN...', duration: 2, breathPhase: 'inhale' },
      { instruction: 'Second sip of air IN...', duration: 1, breathPhase: 'inhale' },
      { instruction: 'Long slow breath OUT...', duration: 6, breathPhase: 'exhale' },
      { instruction: 'One more time: IN...', duration: 2, breathPhase: 'inhale' },
      { instruction: 'And a little more IN...', duration: 1, breathPhase: 'inhale' },
      { instruction: 'And release... OUT...', duration: 6, breathPhase: 'exhale' }
    ],
    completionMessage: "That's it. Three physiological sighs can shift your entire state. Remember this one."
  },

  // SENSORY EXERCISES
  {
    id: '5-4-3-2-1',
    name: '5-4-3-2-1 Grounding',
    shortName: '5-4-3-2-1',
    description: 'Engage all five senses to anchor yourself in the present moment.',
    icon: '🖐️',
    duration: '3-5 minutes',
    difficulty: 'easy',
    bestFor: ['Dissociation', 'Panic attacks', 'Flashbacks', 'Feeling unreal'],
    category: 'sensory',
    steps: [
      { instruction: 'Look around you. Name 5 things you can SEE.', duration: 15, sensoryFocus: 'see' },
      { instruction: "Say them out loud if you can. 'I see...'", duration: 10, sensoryFocus: 'see' },
      { instruction: 'Now name 4 things you can physically TOUCH or FEEL.', duration: 12, sensoryFocus: 'touch' },
      { instruction: 'The chair beneath you. Your feet on the floor. Your clothes on your skin.', duration: 10, sensoryFocus: 'touch' },
      { instruction: 'Name 3 things you can HEAR right now.', duration: 10, sensoryFocus: 'hear' },
      { instruction: 'Near sounds. Far sounds. Your own breathing.', duration: 8, sensoryFocus: 'hear' },
      { instruction: 'Name 2 things you can SMELL.', duration: 8, sensoryFocus: 'smell' },
      { instruction: "If you can't smell anything, name 2 smells you like.", duration: 8, sensoryFocus: 'smell' },
      { instruction: 'Name 1 thing you can TASTE.', duration: 6, sensoryFocus: 'taste' },
      { instruction: 'Or notice the taste in your mouth right now.', duration: 6, sensoryFocus: 'taste' },
      { instruction: 'Take a breath. You are here. You are present. You are safe.', duration: 5 }
    ],
    completionMessage: "You did it. You're grounded in the present moment. Your body is here, right now, and you're okay."
  },
  {
    id: 'cold-water',
    name: 'Cold Water Reset',
    shortName: 'Cold Water',
    description: 'Use cold water to activate your dive reflex and quickly calm your nervous system.',
    icon: '💧',
    duration: '1-2 minutes',
    difficulty: 'easy',
    bestFor: ['Panic', 'Intense emotions', 'Can\'t calm down', 'Dissociation'],
    category: 'sensory',
    steps: [
      { instruction: 'Get cold water — from a tap, a bottle, or use ice.', duration: 5 },
      { instruction: 'Splash cold water on your face, especially your forehead and cheeks.', duration: 8 },
      { instruction: 'Or hold ice cubes in your hands.', duration: 5 },
      { instruction: 'Focus on the cold sensation. Really feel it.', duration: 10 },
      { instruction: 'Notice how it shocks your system into the present.', duration: 8 },
      { instruction: 'Take a slow breath.', duration: 4, breathPhase: 'inhale' },
      { instruction: 'And release.', duration: 4, breathPhase: 'exhale' },
      { instruction: 'Repeat the cold water if needed.', duration: 5 }
    ],
    completionMessage: "The cold activates your parasympathetic nervous system. It's biology, not magic — but it works like magic."
  },
  {
    id: 'temperature-check',
    name: 'Temperature Check',
    shortName: 'Temperature',
    description: 'Notice temperature sensations around your body to reconnect with physical reality.',
    icon: '🌡️',
    duration: '2 minutes',
    difficulty: 'easy',
    bestFor: ['Dissociation', 'Feeling numb', 'Disconnection'],
    category: 'sensory',
    steps: [
      { instruction: 'Close your eyes if comfortable. Or soften your gaze.', duration: 3 },
      { instruction: 'Notice the temperature of the air on your face.', duration: 6 },
      { instruction: 'Is it warm? Cool? Moving?', duration: 5 },
      { instruction: 'Notice the temperature of your hands.', duration: 5, sensoryFocus: 'touch' },
      { instruction: 'Are they warm or cold?', duration: 4 },
      { instruction: 'Notice the temperature of your feet.', duration: 5, sensoryFocus: 'touch' },
      { instruction: 'Notice where your body feels warmest.', duration: 5 },
      { instruction: 'Notice where it feels coolest.', duration: 5 },
      { instruction: 'Take a breath and open your eyes.', duration: 4 }
    ],
    completionMessage: "You're connected to your body again. Temperature is always there to anchor you."
  },

  // MOVEMENT EXERCISES
  {
    id: 'feet-on-floor',
    name: 'Feet on Floor',
    shortName: 'Feet',
    description: 'A simple but powerful grounding technique — feel your feet connected to the ground.',
    icon: '🦶',
    duration: '1-2 minutes',
    difficulty: 'easy',
    bestFor: ['Quick grounding', 'Meetings', 'Public spaces', 'Anxiety'],
    category: 'movement',
    steps: [
      { instruction: 'Place both feet flat on the floor.', duration: 3 },
      { instruction: 'If you can, take your shoes off. If not, that\'s fine.', duration: 4 },
      { instruction: 'Press your feet down. Feel the ground beneath you.', duration: 6 },
      { instruction: 'Notice the pressure on your heels.', duration: 5, sensoryFocus: 'touch' },
      { instruction: 'Notice the pressure on the balls of your feet.', duration: 5, sensoryFocus: 'touch' },
      { instruction: 'Notice your toes.', duration: 4, sensoryFocus: 'touch' },
      { instruction: 'Imagine roots growing from your feet into the ground.', duration: 6 },
      { instruction: 'You are anchored. You are supported. The ground is holding you.', duration: 6 },
      { instruction: 'Take a breath.', duration: 4, breathPhase: 'inhale' }
    ],
    completionMessage: "You're grounded. Literally. Use this anytime — no one will know you're doing it."
  },
  {
    id: 'tension-release',
    name: 'Progressive Tension Release',
    shortName: 'Tension',
    description: 'Tense and release muscle groups to discharge stress from your body.',
    icon: '💪',
    duration: '5 minutes',
    difficulty: 'moderate',
    bestFor: ['Physical tension', 'Anger', 'Restlessness', 'Before sleep'],
    category: 'movement',
    steps: [
      { instruction: 'Sit or lie comfortably. Take a breath.', duration: 4 },
      { instruction: 'HANDS: Make tight fists. Squeeze hard for 5 seconds...', duration: 5 },
      { instruction: 'And release. Feel the tension drain away.', duration: 5 },
      { instruction: 'ARMS: Tense your whole arms. Squeeze...', duration: 5 },
      { instruction: 'And release. Let them go heavy.', duration: 5 },
      { instruction: 'SHOULDERS: Raise them up to your ears. Hold...', duration: 5 },
      { instruction: 'And drop them down. Release.', duration: 5 },
      { instruction: 'FACE: Scrunch up your whole face. Squeeze...', duration: 5 },
      { instruction: 'And release. Relax your jaw.', duration: 5 },
      { instruction: 'STOMACH: Tense your belly. Hold...', duration: 5 },
      { instruction: 'And release.', duration: 5 },
      { instruction: 'LEGS: Tense your whole legs. Squeeze...', duration: 5 },
      { instruction: 'And release.', duration: 5 },
      { instruction: 'FEET: Curl your toes tight. Hold...', duration: 5 },
      { instruction: 'And release.', duration: 5 },
      { instruction: 'Now notice your whole body. Heavy. Relaxed. Calm.', duration: 6 }
    ],
    completionMessage: "You've released tension you were carrying. Your body is lighter now."
  },
  {
    id: 'butterfly-hug',
    name: 'Butterfly Hug',
    shortName: 'Butterfly',
    description: 'A self-soothing technique using bilateral stimulation — cross your arms and tap alternate shoulders.',
    icon: '🦋',
    duration: '2 minutes',
    difficulty: 'easy',
    bestFor: ['Self-soothing', 'Distress', 'Feeling alone', 'Trauma recovery'],
    category: 'movement',
    steps: [
      { instruction: 'Cross your arms over your chest, hands on opposite shoulders.', duration: 5 },
      { instruction: 'Like you\'re giving yourself a hug.', duration: 3 },
      { instruction: 'Now gently tap your left shoulder with your right hand.', duration: 3 },
      { instruction: 'Then your right shoulder with your left hand.', duration: 3 },
      { instruction: 'Continue alternating. Left... right... left... right...', duration: 10 },
      { instruction: 'Keep a slow, steady rhythm. Like a butterfly\'s wings.', duration: 10 },
      { instruction: 'Breathe naturally as you tap.', duration: 10 },
      { instruction: 'Continue as long as you need. Left... right...', duration: 15 },
      { instruction: 'Slow down the tapping.', duration: 5 },
      { instruction: 'Stop and hold yourself gently.', duration: 5 },
      { instruction: 'You are safe. You are held.', duration: 5 }
    ],
    completionMessage: "The butterfly hug activates both sides of your brain. You can soothe yourself. You just did."
  },

  // COGNITIVE EXERCISES
  {
    id: 'body-scan',
    name: 'Quick Body Scan',
    shortName: 'Body Scan',
    description: 'Systematically notice sensations throughout your body to reconnect and ground.',
    icon: '🧘',
    duration: '3-4 minutes',
    difficulty: 'moderate',
    bestFor: ['Disconnection', 'Before sleep', 'Stress', 'Awareness'],
    category: 'cognitive',
    steps: [
      { instruction: 'Close your eyes or soften your gaze.', duration: 3 },
      { instruction: 'Take a slow breath in... and out.', duration: 5 },
      { instruction: 'Bring your attention to the top of your head.', duration: 4 },
      { instruction: 'Notice any sensations there. Tension? Tingling? Nothing?', duration: 5 },
      { instruction: 'Move your attention to your forehead and eyes.', duration: 5 },
      { instruction: 'Notice your jaw. Is it clenched? Let it soften.', duration: 5 },
      { instruction: 'Notice your neck and shoulders.', duration: 5 },
      { instruction: 'Your arms and hands. Are they tense?', duration: 5 },
      { instruction: 'Your chest. Notice your heartbeat if you can.', duration: 5 },
      { instruction: 'Your stomach. Is it tight or soft?', duration: 5 },
      { instruction: 'Your hips and lower back.', duration: 4 },
      { instruction: 'Your thighs and knees.', duration: 4 },
      { instruction: 'Your lower legs, ankles, feet.', duration: 5 },
      { instruction: 'Now feel your whole body at once. Present. Alive. Here.', duration: 6 }
    ],
    completionMessage: "You've reconnected with your body. It's always here, waiting for you to come back to it."
  },
  {
    id: 'self-compassion',
    name: 'Self-Compassion Break',
    shortName: 'Compassion',
    description: 'Three phrases to offer yourself kindness in difficult moments.',
    icon: '💜',
    duration: '2 minutes',
    difficulty: 'moderate',
    bestFor: ['Self-criticism', 'Shame', 'Failure', 'Sadness'],
    category: 'cognitive',
    steps: [
      { instruction: 'Place your hand on your heart if comfortable.', duration: 4 },
      { instruction: 'Acknowledge the difficulty. Say: "This is a moment of suffering."', duration: 6 },
      { instruction: 'Or: "This is hard right now."', duration: 4 },
      { instruction: 'Acknowledge shared humanity. Say: "Suffering is part of being human."', duration: 6 },
      { instruction: 'Or: "Other people feel this way too. I\'m not alone."', duration: 5 },
      { instruction: 'Offer yourself kindness. Say: "May I be kind to myself."', duration: 6 },
      { instruction: 'Or: "May I give myself the compassion I need."', duration: 5 },
      { instruction: 'Take a breath. Feel the warmth of your hand on your chest.', duration: 5 },
      { instruction: 'You deserve kindness. Especially from yourself.', duration: 5 }
    ],
    completionMessage: "You spoke kindly to yourself. That takes courage. Keep practicing."
  },
  {
    id: 'gratitude-anchor',
    name: 'Gratitude Anchor',
    shortName: 'Gratitude',
    description: 'Name three things you\'re grateful for to shift your emotional state.',
    icon: '🙏',
    duration: '2 minutes',
    difficulty: 'easy',
    bestFor: ['Low mood', 'Perspective', 'Morning routine', 'Before sleep'],
    category: 'cognitive',
    steps: [
      { instruction: 'Take a breath. Get present.', duration: 4 },
      { instruction: 'Think of ONE thing you\'re grateful for today.', duration: 6 },
      { instruction: 'It can be small. A cup of tea. A message from someone. Sunshine.', duration: 6 },
      { instruction: 'Really feel the gratitude. Let it land.', duration: 5 },
      { instruction: 'Think of a SECOND thing.', duration: 6 },
      { instruction: 'Something about your life, your body, your world.', duration: 5 },
      { instruction: 'And a THIRD thing.', duration: 6 },
      { instruction: 'Three anchors of gratitude.', duration: 4 },
      { instruction: 'Take a breath and carry these with you.', duration: 5 }
    ],
    completionMessage: "Gratitude rewires your brain over time. Three things a day changes everything."
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get exercise by ID
 */
export function getExercise(id: string): GroundingExercise | undefined {
  return GROUNDING_EXERCISES.find(ex => ex.id === id);
}

/**
 * Get exercises by category
 */
export function getExercisesByCategory(category: GroundingExercise['category']): GroundingExercise[] {
  return GROUNDING_EXERCISES.filter(ex => ex.category === category);
}

/**
 * Get quick exercises (under 2 minutes)
 */
export function getQuickExercises(): GroundingExercise[] {
  return GROUNDING_EXERCISES.filter(ex => 
    ex.duration.includes('30 seconds') || 
    ex.duration.includes('1-2 minutes') ||
    ex.duration.includes('1 minute')
  );
}

/**
 * Get exercises for a specific mood
 */
export function getExercisesForMood(moodId: string): GroundingExercise[] {
  const mood = MOOD_OPTIONS.find(m => m.id === moodId);
  if (!mood) return [];
  
  return mood.suggestedExercises
    .map(id => getExercise(id))
    .filter((ex): ex is GroundingExercise => ex !== undefined);
}

/**
 * Get a random exercise
 */
export function getRandomExercise(): GroundingExercise {
  const index = Math.floor(Math.random() * GROUNDING_EXERCISES.length);
  return GROUNDING_EXERCISES[index];
}

export default GROUNDING_EXERCISES;