# Publication Pipeline Documentation

## Overview

The Publication Pipeline transforms learner achievements and community stories into published content for Joystick (e-zine) and Rayd-yo (radio/podcast).

---

## Pipeline Stages

```
┌─────────────────────────────────────────────────────────────┐
│  1️⃣ FLAGGING                                                │
│     Collector ROV identifies story-worthy moments           │
│     - Breakthrough achievements                              │
│     - Heritage preservation                                  │
│     - Mentoring moments                                      │
│     - Community impact                                       │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  2️⃣ DRAFTING                                                │
│     Draft Generator creates initial content                  │
│     - Headline generation                                    │
│     - Lead paragraph                                         │
│     - Story structure                                        │
│     - Placeholder quotes                                     │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  3️⃣ EDITORIAL REVIEW                                        │
│     Human editors refine content                             │
│     - Conduct interviews                                     │
│     - Verify facts                                           │
│     - Polish writing                                         │
│     - Add media                                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  4️⃣ PUBLICATION                                             │
│     Content goes live                                        │
│     - Joystick article                                       │
│     - Rayd-yo episode                                        │
│     - Social promotion                                       │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  5️⃣ IMPACT TRACKING                                         │
│     Impact Tracker measures success                          │
│     - Views and reads                                        │
│     - Shares and engagement                                  │
│     - Real-world outcomes                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Story Triggers

### High Priority

| Trigger | Description | Platform |
|---------|-------------|----------|
| `elder-teaching` | Elder passing on knowledge | Both |
| `cultural-preservation` | Heritage content | Both |
| `first-success-after-failures` | Breakthrough moment | Joystick |
| `learner-becomes-teacher` | Mentoring transition | Joystick |

### Medium Priority

| Trigger | Description | Platform |
|---------|-------------|----------|
| `community-benefit` | Helping community members | Joystick |
| `device-saved` | Successful repair | Joystick |
| `return-after-absence` | Comeback story | Joystick |

### Low Priority

| Trigger | Description | Platform |
|---------|-------------|----------|
| `first-badge` | Initial achievement | Joystick |
| `first-workshop` | First participation | Joystick |

---

## Draft Structure

### Joystick Article

```markdown
# [HEADLINE]
## [SUBHEADLINE]

[LEAD PARAGRAPH - hook + who/what]

## The Journey
[Background and context]

## The Challenge
[Obstacles faced]

## The Breakthrough
[The moment of success]

## What It Means
[Impact and significance]

## What's Next
[Future plans]

---
[CALL TO ACTION]
```

### Rayd-yo Episode

```markdown
# Episode: [TITLE]

## Format
- Duration: [XX] minutes
- Type: [Interview / Feature / Documentary]

## Segments
1. Introduction (2 min)
2. Background (5 min)
3. Main story (10 min)
4. Impact discussion (5 min)
5. Call to action (2 min)

## Guests
- [Learner name]
- [Mentor name if applicable]

## Music
- Intro: [Track]
- Outro: [Track]
```

---

## Editorial Queue

### Queue States

| State | Description | Actions Available |
|-------|-------------|-------------------|
| `pending` | Awaiting review | Assign, Reject |
| `in-review` | Being edited | Approve, Reject, Return |
| `approved` | Ready to publish | Publish |
| `published` | Live | Track impact |
| `rejected` | Not suitable | Archive |

### Priority Handling

High priority stories are:
- Displayed at top of queue
- Flagged for immediate attention
- May bypass standard review timeline

---

## Impact Metrics

### Quantitative

| Metric | Description | Target |
|--------|-------------|--------|
| Views | Page/episode loads | 100+ |
| Reads | Completed reads | 50%+ |
| Shares | Social shares | 10+ |
| Comments | Engagement | 5+ |

### Qualitative

| Outcome | Description | Verification |
|---------|-------------|--------------|
| `signup` | New member from story | Platform tracking |
| `enquiry` | Contact from story | Form submission |
| `donation` | Financial support | Payment record |
| `partnership` | Business connection | Manual verification |
| `media-mention` | External coverage | Link/screenshot |

### Impact Score

```typescript
// Views contribution (max 20 points)
score += Math.min(20, views / 50);

// Engagement rate (max 30 points)
const engagementRate = (comments + shares + reactions) / views;
score += Math.min(30, engagementRate * 300);

// Shares contribution (max 20 points)
score += Math.min(20, shares * 2);

// Outcomes contribution (max 30 points)
score += Math.min(30, verifiedOutcomes * 10);
```

---

## Content Guidelines

### Voice

- **Authentic**: Let learners tell their own stories
- **Celebratory**: Focus on achievements
- **Inclusive**: Represent diverse voices
- **Hopeful**: Inspire others

### Copyright

- Always obtain consent
- Credit all contributors
- Respect privacy choices
- Archive consent forms

### Accessibility

- Alt text for images
- Captions for video
- Transcripts for audio
- Plain language

---

## API Reference

### Flag Story

```
POST /api/stories/flag
{
  "learnerId": "...",
  "type": "breakthrough",
  "headline": "From Struggle to Success",
  "summary": "...",
  "context": {...}
}
```

### Submit to Queue

```
POST /api/editorial/submit
{
  "storyId": "...",
  "draftId": "...",
  "platform": "joystick",
  "priority": "high"
}
```

### Track Impact

```
POST /api/impact/{storyId}/event
{
  "type": "share",
  "platform": "twitter",
  "content": "..."
}
```

---

## Consent Management

### Required Consents

| Consent Type | Required For | Expiry |
|--------------|--------------|--------|
| `story-interview` | Joystick article | 1 year |
| `audio-recording` | Rayd-yo episode | 1 year |
| `photo-publication` | Visual content | 1 year |
| `name-use` | Attribution | Ongoing |

### Consent Form

```
STORY PUBLICATION CONSENT

I, [NAME], consent to:
☐ Being interviewed for a story
☐ My story being published on Joystick
☐ My voice being recorded for Rayd-yo
☐ Photos of me being published
☐ My name being used

I understand I can withdraw consent at any time
before publication.

Signature: ___________
Date: ___________
```

---

*Document Version: 1.0*
*Created: December 2025*
