// File: src/systems/rovs/personalities/kaywana/AnansewaWithTracking.tsx
//
// Kaywana's Court is the venue — the platform's central virtual auditorium,
// named after Edgar Mittelholzer's book character. Anansewa is the persona
// who hosts it and does the voice-teaching.
//
// Converted from a component to a hook: this file's job is exposing
// tracking functions to whatever screen needs them (e.g. KaywanasAtrium.tsx),
// not rendering its own UI. Import useAnansewaTracking() wherever a member
// action in the Court should log a coverage touch.

import { useTransformationStore } from '@/stores/transformationStore';
import { useJournalStore } from '@/stores/journalStore';

// Local station actions map onto journalStore's canonical CoverageCategory
// ('craft' | 'pricing' | 'ip' | 'technical' | 'showcase') rather than
// inventing their own list, so getCoverageSummary() can group touches from
// every suite's hook consistently.
type LocalStationAction = 'content' | 'voice-coaching' | 'showcase-prep';
const CATEGORY_MAP: Record<LocalStationAction, 'craft' | 'showcase'> = {
  'content': 'showcase',
  'voice-coaching': 'craft',
  'showcase-prep': 'showcase',
};

export const useAnansewaTracking = () => {
  const { recordSolutionDeployment, trackMilestone } = useTransformationStore();
  const { addEntry } = useJournalStore();

  // Shared coverage signal — every activity in this station logs a touch
  // against the Compete/Celebrate coverage view, regardless of which
  // specific thing the member came here to do. Soft nudge only: this never
  // blocks anything, it just gives the Journal's coverage view something
  // to count.
  const recordStationTouch = (action: LocalStationAction, description: string) => {
    trackMilestone({
      type: 'showcase-completed',
      description,
      rovSupport: 'Anansewa',
    });

    addEntry({
      stage: 3,
      cPhase: 'celebrate',
      entryType: 'coverage-touch',
      content: description,
      emotionalState: 'proud',
      isPrivate: false,
      coverageCategory: CATEGORY_MAP[action],
      coverageStation: "Kaywana's Court",
    });
  };

  const recordCulturalPreservation = (elderName: string, storyTitle: string, medium: string) => {
    recordSolutionDeployment({
      title: `${elderName}'s Story: ${storyTitle}`,
      description: `Cultural heritage preserved through ${medium}`,
      category: 'content',
      usersReached: 0,
      feedback: [],
      showcasedAt: ['Rayd-yo', "Kaywana's Court Archive"],
    });

    recordStationTouch('content', `Preserved and shared ${elderName}'s cultural story`);
  };

  const recordVoiceCoachingSession = (memberName: string, focusArea: string) => {
    recordSolutionDeployment({
      title: `${memberName}'s voice session: ${focusArea}`,
      description: `Voice coaching session focused on ${focusArea}`,
      category: 'skill-development',
      usersReached: 0,
      feedback: [],
      showcasedAt: [],
    });

    recordStationTouch('voice-coaching', `Worked on ${focusArea} with Anansewa`);
  };

  const recordShowcasePrep = (memberName: string, showcaseContext: string) => {
    recordStationTouch(
      'showcase-prep',
      `${memberName} prepared for ${showcaseContext} at Kaywana's Court`
    );
  };

  return {
    recordCulturalPreservation,
    recordVoiceCoachingSession,
    recordShowcasePrep,
  };
};