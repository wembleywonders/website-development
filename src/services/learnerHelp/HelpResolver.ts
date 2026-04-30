/**
 * HelpResolver
 * Maps a LearnerHelpContext to a HelpResponse.
 */

import type { LearnerHelpContext, HelpResponse, HelpROVPrompt } from '../../types/learnerHelp';

const ROV_PROFILES: Record<string, Omit<HelpROVPrompt, 'message' | 'suggestedQuestions'>> = {
  'Maya':  { rov: 'Maya',  rovName: 'Maya',    rovAvatar: '🌟', rovColour: '#0ea5e9' },
  'ROV-T': { rov: 'ROV-T', rovName: 'Neville', rovAvatar: '🔧', rovColour: '#10b981' },
  'ROV-P': { rov: 'ROV-P', rovName: 'Maxine',  rovAvatar: '🎭', rovColour: '#7c3aed' },
  'ROV-C': { rov: 'ROV-C', rovName: 'Adaeze',  rovAvatar: '🎨', rovColour: '#db2777' },
  'ROV-B': { rov: 'ROV-B', rovName: 'Solomon', rovAvatar: '💼', rovColour: '#f59e0b' },
};

function rov(guide: keyof typeof ROV_PROFILES, message: string, suggestedQuestions?: string[]): HelpROVPrompt {
  return { ...ROV_PROFILES[guide], message, suggestedQuestions };
}

type TriggerResolver = (ctx: LearnerHelpContext) => HelpResponse | null;

const TRIGGER_MAP: Record<string, TriggerResolver> = {

  'arrange-tab-first-open': (_ctx) => ({
    triggerPoint: 'arrange-tab-first-open',
    rovPrompt: rov('Maya',
      "You've got your rhythm and your feel. Now place a note on beat 1 — any row. Just one note. Hear what happens.",
      ['Which note sounds right?', 'What do the rows mean?', 'Can I skip this step?']
    ),
    tutorial: {
      id: 'arrange-room-basics',
      title: 'How the melody grid works',
      entryStep: 0,
      triggerLabel: 'Not sure where to start?',
    },
  }),

  'melody-grid-no-interaction-30s': (_ctx) => ({
    triggerPoint: 'melody-grid-no-interaction-30s',
    rovPrompt: rov('Maya',
      "The top row is the highest note in your scale. The bottom row is the lowest. Start in the middle — row 4. That's where most melodies live.",
      ['What is a scale?', 'Does it matter which note I pick?']
    ),
  }),

  'first-playback-after-melody': (_ctx) => ({
    triggerPoint: 'first-playback-after-melody',
    rovPrompt: rov('Maya', "That's your idea. Everything from here is just making it clearer."),
    ilpSuggestion: {
      action: 'save-arrangement',
      milestone: 'first-musical-idea',
      ctaLabel: 'Save this idea',
    },
  }),

  'proceed-btn-hover-twice': (_ctx) => ({
    triggerPoint: 'proceed-btn-hover-twice',
    rovPrompt: rov('Maya',
      "There is no 'good enough' here. If it sounds like something to you, it is something. The Production Room will show you the rest."
    ),
  }),

  'feel-selector-no-interaction-20s': (_ctx) => ({
    triggerPoint: 'feel-selector-no-interaction-20s',
    rovPrompt: rov('Maya',
      "Each card plays when you tap it. You're not committing to anything — just listening. Start with the one that sounds closest to what you hear in your head.",
      ['What is Afrobeats?', 'What is Lovers Rock?', 'Can I change my mind later?']
    ),
  }),

  'production-keyboard-first-open': (_ctx) => ({
    triggerPoint: 'production-keyboard-first-open',
    rovPrompt: rov('Maya',
      "Every key on this keyboard is in your scale — there are no wrong notes. Play anything.",
      ['What is scale lock?', 'Which keys should I press?']
    ),
    tutorial: {
      id: 'scale-locked-keyboard',
      title: 'Playing the scale-locked keyboard',
      entryStep: 0,
      triggerLabel: 'How does this keyboard work?',
    },
  }),

  'diagnostic-result-diy-true': (ctx) => {
    const resultTutorialMap: Record<string, string> = {
      'result_bearing':        'pc-cleaning-thermal',
      'result_belt':           'pc-cleaning-thermal',
      'result_carbon_brushes': 'pc-cleaning-thermal',
      'result_washer':         'phone-port-cleaning',
      'result_watch':          'phone-battery-health',
      'result_phone':          'phone-battery-health',
      'result_laptop':         'pc-storage-upgrade',
      'result_bike':           'ebike-brake-adjustment',
    };
    const resultId = ctx.currentContent?.id ?? '';
    const tutorialId = resultTutorialMap[resultId] ?? 'phone-port-cleaning';
    return {
      triggerPoint: 'diagnostic-result-diy-true',
      rovPrompt: rov('ROV-T',
        "You diagnosed it correctly. The repair itself follows the same logic — you already understand what's wrong.",
        ['How long will this take?', 'What tools do I need?', 'Is it safe to attempt?']
      ),
      tutorial: {
        id: tutorialId,
        title: 'Step-by-step repair guide',
        entryStep: 0,
        triggerLabel: 'Ready to attempt this repair?',
      },
      ilpSuggestion: {
        action: 'log-diagnostic-session',
        milestone: `diagnostic-session-${resultId}`,
        ctaLabel: 'Log this diagnosis',
      },
    };
  },

  'session-below-threshold': (_ctx) => ({
    triggerPoint: 'session-below-threshold',
    rovPrompt: rov('ROV-T',
      "You found the fault. The path you took just had an extra step. Here's the shorter route — understanding why it's shorter is the skill.",
      ['Show me the shorter path', 'What did I miss?']
    ),
    tutorial: {
      id: 'diagnostic-methodology',
      title: 'Diagnostic elimination technique',
      entryStep: 0,
      triggerLabel: 'See the shorter path',
    },
  }),

  'physics-box-empty-60s': (_ctx) => ({
    triggerPoint: 'physics-box-empty-60s',
    rovPrompt: rov('ROV-T',
      "Don't worry about the right words. Tell me what you think is happening inside the machine. Start with 'the metal is...' or 'the water is...'"
    ),
  }),

  'activity-step-failed-twice': (ctx) => ({
    triggerPoint: 'activity-step-failed-twice',
    rovPrompt: ctx.facilitatorMode
      ? rov('Maya', "The child may need a different approach. Try asking: 'What do you think happens if we...'")
      : rov('Maya', "That's a tricky one. Try it this way: start with the smallest possible version of what you're trying to do.",
          ['Can you show me?', 'What should I do first?']),
    facilitatorGuidance: ctx.facilitatorMode
      ? "Ask the child to explain what they're trying to do before attempting again."
      : undefined,
  }),

  'activity-completed-first-attempt': (ctx) => ({
    triggerPoint: 'activity-completed-first-attempt',
    rovPrompt: ctx.facilitatorMode
      ? rov('Maya', "One participant is ahead. Ask them to explain their approach to the group before moving on.")
      : rov('Maya', "Nice work. That came naturally to you. Want to try the harder version?"),
  }),

  'generic-uncertainty': (_ctx) => ({
    triggerPoint: 'generic-uncertainty',
    rovPrompt: rov('Maya',
      "Not sure what to do next? That's the right place to be — it means you're at the edge of what you know. That's where learning happens.",
      ['Where should I start?', 'What have I done so far?', 'Can I see an example?']
    ),
  }),
};

export function resolveHelp(ctx: LearnerHelpContext): HelpResponse | null {
  const resolver = TRIGGER_MAP[ctx.triggerPoint] ?? TRIGGER_MAP['generic-uncertainty'];
  return resolver(ctx);
}

export function shouldFireTrigger(triggerPoint: string, firedTriggers: Set<string>, opts?: { allowRepeat?: boolean }): boolean {
  if (opts?.allowRepeat) return true;
  return !firedTriggers.has(triggerPoint);
}
