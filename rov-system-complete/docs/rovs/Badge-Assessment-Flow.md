# Badge Assessment Flow

## Overview

This document describes how ROVs support the badge assessment process from evidence collection to certification.

---

## Assessment Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      LEARNER ACTIVITY                        │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│    🔬 Discovery ROV observes and logs activity              │
│    - Records skills demonstrated                             │
│    - Captures evidence (photos, videos, logs)               │
│    - Notes time spent                                        │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│    📝 Evidence Collector stores in portfolio                 │
│    - Maps evidence to badge criteria                         │
│    - Tracks completion percentage                            │
│    - Links ROV source                                        │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│    💡 Insight ROV analyzes patterns                          │
│    - Detects skill mastery                                   │
│    - Identifies breakthrough moments                         │
│    - Calculates readiness score                              │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Ready ≥ 85%?    │
                    └─────────┬─────────┘
                         YES  │  NO
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
┌───────────────────────────┐  ┌───────────────────────────┐
│ 🧭 Pathfinder notifies    │  │ 🧭 Pathfinder suggests    │
│   learner of readiness    │  │   next steps to improve   │
└─────────────┬─────────────┘  └───────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│    Learner requests assessment                               │
└─────────────────────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│    Human assessor reviews portfolio                          │
│    - Checks evidence against criteria                        │
│    - May request additional evidence                         │
│    - Makes assessment decision                               │
└─────────────────────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│    📚 Keeper archives certificate and evidence              │
│    - Generates verification code                             │
│    - Stores permanently                                      │
│    - Updates learner record                                  │
└─────────────────────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────┐
│    🎉 Celebrate!                                             │
│    - 🧭 Pathfinder announces achievement                     │
│    - 📝 Collector flags for story potential                 │
│    - Badge added to profile                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Evidence Collection

### Automatic Collection

Discovery ROV automatically collects evidence when:
- Learner completes a workshop activity
- Learner submits work in the platform
- Assessor observes a practical session
- Learner uploads files to portfolio

### Manual Collection

Learners can also manually add:
- Photos of completed work
- Videos demonstrating skills
- Written reflections
- External certificates

### Evidence Types

| Type | Description | Collected By |
|------|-------------|--------------|
| `observation` | Assessor/mentor observation | Human + Discovery |
| `document` | Written work, plans | Learner upload |
| `photo` | Visual evidence | Learner/Discovery |
| `video` | Demonstration | Learner/Discovery |
| `audio` | Recordings | Learner/Discovery |
| `testimony` | Third-party statement | Human verified |

---

## Readiness Assessment

### Calculation Components

```typescript
// Evidence readiness (50% weight)
const evidenceReadiness = (criteriaMetCount / criteriaTotalCount) * 100;

// Skill readiness (30% weight)
const skillReadiness = calculateSkillConfidence(demonstrations);

// Time investment (20% weight)
const timeInvestment = (hoursLogged / requiredGLH) * 100;

// Overall readiness
const overallReadiness = 
  (evidenceReadiness * 0.5) + 
  (skillReadiness * 0.3) + 
  (timeInvestment * 0.2);
```

### Readiness Thresholds

| Score | Recommendation | Action |
|-------|----------------|--------|
| 85-100 | Ready | Request assessment |
| 70-84 | Almost ready | Minor gaps to fill |
| 50-69 | Making progress | Continue building evidence |
| 0-49 | Getting started | Focus on learning activities |

---

## Assessment Decision

### Human Assessor Review

The assessor reviews:
1. Evidence portfolio completeness
2. Evidence quality and authenticity
3. Mapping to assessment criteria
4. Any additional observations

### Decision Outcomes

| Decision | Description | Next Steps |
|----------|-------------|------------|
| **Pass** | All criteria met | Certificate issued |
| **Refer** | Some criteria not met | Specific actions identified |
| **Not Yet Competent** | Significant gaps | Additional learning needed |

---

## Quality Assurance

### Internal Verification (IV)

- 25% of assessments sampled
- 100% for new assessors
- IQA reviews decisions

### External Verification (EV)

- Annual OCN London visit
- Evidence sampling
- Centre quality check

---

## API Endpoints

### Submit Evidence

```
POST /api/badges/{badgeId}/evidence
{
  "criterionRef": "RA2.1",
  "type": "observation",
  "title": "Supervised repair completed",
  "description": "...",
  "fileRef": "upload-123.jpg"
}
```

### Get Readiness

```
GET /api/badges/{badgeId}/readiness
Response: {
  "overallReadiness": 87,
  "evidenceReadiness": 92,
  "skillReadiness": 80,
  "timeInvestment": 85,
  "recommendation": "ready",
  "gapsIdentified": [],
  "suggestedActions": []
}
```

### Request Assessment

```
POST /api/badges/{badgeId}/assessment-request
{
  "learnerId": "...",
  "portfolioId": "...",
  "notes": "Ready for assessment"
}
```

---

## ROV Interactions

### Discovery → Evidence Collector

When Discovery observes activity:
```
Discovery: "Logging skill demonstration: soldering"
→ EvidenceCollector.collect(learnerId, badgeId, criterion, ...)
```

### Evidence Collector → Insight

When evidence reaches threshold:
```
EvidenceCollector: "Portfolio at 80%"
→ Insight.assessReadiness(portfolio)
```

### Insight → Pathfinder

When readiness confirmed:
```
Insight: "Readiness score: 87%"
→ Pathfinder.notifyReady(badgeId)
```

### Keeper → Certificate

When assessment passed:
```
Assessor: "Pass"
→ Keeper.issueCertificate(learnerId, badgeId)
→ Keeper.archive(evidence)
```

---

*Document Version: 1.0*
*Created: December 2025*
