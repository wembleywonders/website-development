# ROV System Integration Guide

## Overview

The ROV (Remote Operation Vehicle) system is a fleet of AI assistants that support learners throughout their Wembley Wonders journey. This document explains how to integrate ROVs into the platform.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ROV Orchestrator                      │
│  Coordinates all ROVs, routes events, manages state     │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌─────▼─────┐   ┌─────▼─────┐
    │Learning │    │  Journal  │   │   Badge   │
    │ Support │    │Integration│   │Integration│
    └────┬────┘    └─────┬─────┘   └─────┬─────┘
         │               │               │
    ┌────▼────────────────▼────────────────▼────┐
    │              10 ROV Personalities          │
    │  Pathfinder | Discovery | Insight | etc.  │
    └───────────────────────────────────────────┘
```

---

## Quick Start

### 1. Initialize the Orchestrator

```typescript
import { ROVOrchestrator } from '@/systems/rovs/learning-support';

// Create orchestrator for a learner session
const orchestrator = new ROVOrchestrator(learnerId);

// Activate additional ROVs based on activity
orchestrator.activateROV('discovery');
orchestrator.activateROV('fixer');
```

### 2. Emit Events

```typescript
// When learner starts an activity
orchestrator.emit({
  id: `event-${Date.now()}`,
  rovId: 'discovery',
  eventType: 'activity-started',
  payload: { type: 'repair', device: 'laptop' },
  timestamp: new Date(),
  priority: 'medium'
});
```

### 3. Listen for ROV Messages

```typescript
orchestrator.on('rov-message', (event) => {
  // Display message in UI
  showNotification({
    rovEmoji: event.payload.emoji,
    rovName: event.payload.name,
    message: event.payload.message
  });
});
```

---

## Event Types

| Event | Description | Triggered By |
|-------|-------------|--------------|
| `activity-started` | Learner begins activity | User action |
| `activity-completed` | Learner completes activity | User action |
| `breakthrough-detected` | Insight ROV detects achievement | Insight analysis |
| `help-requested` | Learner asks for help | User action |
| `content-created` | Learner creates content | System detection |
| `heritage-content` | Cultural content flagged | Collector ROV |
| `session-long` | Session exceeds threshold | Mindful ROV |
| `first-interaction` | New user pair interaction | Guardian ROV |
| `media-capture` | Photo/video recording | User action |
| `accessibility-need` | Accessibility requirement detected | Alex ROV |

---

## ROV Routing

Events are automatically routed to appropriate ROVs:

```typescript
const routingRules: Record<string, ROVPersonalityId[]> = {
  'activity-started': ['discovery', 'mindful'],
  'activity-completed': ['discovery', 'insight', 'pathfinder'],
  'breakthrough-detected': ['insight', 'collector'],
  'help-requested': ['helper', 'fixer'],
  'content-created': ['keeper', 'collector'],
  'heritage-content': ['keeper', 'collector'],
  'session-long': ['mindful'],
  'first-interaction': ['guardian', 'helper'],
  'media-capture': ['guardian', 'keeper'],
  'accessibility-need': ['alex']
};
```

---

## Journal Integration

ROVs automatically log to the Creator's Journal:

```typescript
import { JournalWriter } from '@/systems/rovs/journal-integration';

const journal = new JournalWriter();

// ROV creates entry
journal.createEntry(
  learnerId,
  'observation',
  'First successful repair!',
  'Learner completed laptop screen replacement independently.',
  'discovery-rov',
  { stage: 'create', programme: 'Scrap Cat' }
);
```

---

## Badge Integration

ROVs collect evidence and assess readiness:

```typescript
import { EvidenceCollector, ReadinessAssessor } from '@/systems/rovs/badge-integration';

const collector = new EvidenceCollector();
const assessor = new ReadinessAssessor();

// Collect evidence
collector.collect(
  learnerId,
  'sc-builder',
  'RA2.1',
  'observation',
  'Supervised repair completed',
  'Learner completed supervised repair of laptop screen',
  'discovery-rov'
);

// Assess readiness
const portfolio = collector.getPortfolio(learnerId, 'sc-builder', 13);
const assessment = assessor.assess(
  learnerId,
  'sc-builder',
  portfolio,
  skillDemonstrations,
  timeSpentMinutes,
  45 // required GLH
);

if (assessment.isReady) {
  // Notify learner they can request assessment
}
```

---

## Publication Pipeline

Stories flow through the publication pipeline:

```typescript
import { StoryFlagger, DraftGenerator, EditorialQueue } from '@/systems/rovs/publication-pipeline';

const flagger = new StoryFlagger();
const generator = new DraftGenerator();
const queue = new EditorialQueue();

// Collector ROV flags a story
const story = flagger.checkForStory(
  learnerId,
  learnerName,
  'first-success-after-failures',
  { programme: 'Scrap Cat', badgeId: 'sc-builder' }
);

if (story) {
  // Generate draft
  const draft = generator.generateDraft(story);
  
  // Submit to editorial queue
  queue.submit(story.id, draft.id, 'joystick', story.priority);
}
```

---

## UI Components

### Displaying ROV Status

```tsx
import { ROVStatusIndicator } from '@/components/rov-widgets';

<ROVStatusIndicator
  rovs={activeRovs}
  onROVClick={(rovId) => showROVDetails(rovId)}
/>
```

### Showing Notifications

```tsx
import { NotificationContainer } from '@/components/rov-widgets';

<NotificationContainer
  notifications={rovNotifications}
  onDismiss={(id) => dismissNotification(id)}
  position="bottom-right"
/>
```

### Suggestion Bubble

```tsx
import { ROVSuggestionBubble } from '@/components/rov-widgets';

<ROVSuggestionBubble
  rovEmoji="🧭"
  rovName="Pathfinder"
  suggestions={pathfinderSuggestions}
  onAccept={(id) => acceptSuggestion(id)}
  onDismiss={(id) => dismissSuggestion(id)}
  onDismissAll={() => dismissAllSuggestions()}
/>
```

---

## Best Practices

1. **Don't overwhelm learners** — Limit notifications to important events
2. **Let ROVs collaborate** — Events can trigger multiple ROVs
3. **Respect privacy** — Guardian ROV monitors but doesn't intrude
4. **Celebrate achievements** — Pathfinder should recognize milestones
5. **Preserve heritage** — Flag cultural content for Keeper ROV

---

## Testing ROVs

```typescript
// Mock ROV responses for testing
const mockOrchestrator = {
  emit: jest.fn(),
  activateROV: jest.fn(),
  getActiveROVs: () => ['pathfinder', 'guardian']
};

// Test event routing
mockOrchestrator.emit({
  eventType: 'activity-completed',
  payload: { type: 'repair' }
});

expect(mockOrchestrator.emit).toHaveBeenCalled();
```

---

*Document Version: 1.0*
*Created: December 2025*
