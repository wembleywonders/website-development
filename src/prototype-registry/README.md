# Prototype Registry

## Wembley Wonders CIC - Community Innovation IP System

A comprehensive system for tracking community innovations from initial concept through to marketplace commercialisation, with full intellectual property documentation and attribution.

---

## Overview

The Prototype Registry serves three core functions:

1. **Innovation Tracking** - Document and version prototypes created in workshops and programmes
2. **IP Management** - Capture invention disclosures, prior art, and protection status
3. **Marketplace Bridge** - Prepare protected innovations for the Cyberstore

This system embodies Wembley Wonders' commitment to community ownership of intellectual property, ensuring creators retain rights while benefiting from collective support.

---

## Architecture

```
prototype-registry/
├── index.ts                 # Module exports
├── types/
│   └── index.ts             # TypeScript type definitions
├── services/
│   └── prototypeRegistry.ts # Core business logic
└── components/
    ├── PrototypeRegistryDashboard.tsx
    ├── PrototypeRegistryDashboard.module.scss
    ├── InventionDisclosureForm.tsx
    └── InventionDisclosureForm.module.scss
```

---

## Integration Points

### Programme Sandboxes

Each programme sandbox can integrate the Prototype Registry:

```tsx
// In pages/programmes/stemgeneers/sandbox.tsx
import { prototypeRegistry } from '@/prototype-registry';

// When a participant completes a build
const handlePrototypeComplete = async (buildData) => {
  await prototypeRegistry.createPrototype({
    title: buildData.name,
    description: buildData.description,
    category: 'hardware',
    programme: 'stemgeneers',
    creators: [{ id: participant.id, name: participant.name, role: 'lead', contributionPercentage: 100 }]
  });
};
```

### Cyberstore

Products listed in the Cyberstore can link to their Prototype Registry entries:

```tsx
// In marketplace/integrations/prototypeTracking.ts
import { prototypeRegistry } from '@/prototype-registry';

export const listPrototypeInStore = async (prototypeId: string, pricing: PricingModel) => {
  const prototype = await prototypeRegistry.getPrototype(prototypeId);
  
  if (prototype.ipStatus === 'unprotected') {
    throw new Error('Prototype must have IP protection before listing');
  }
  
  await prototypeRegistry.listOnMarketplace(prototypeId, pricing, defaultLicense);
};
```

### ROV System

Maya's ROVs can guide users through the prototyping process:

```tsx
// In rovs/studio/PrototypeMentorROV.tsx
const PrototypeMentorROV = {
  name: 'Prototype Mentor',
  capabilities: [
    'guide-invention-disclosure',
    'explain-ip-options',
    'suggest-prior-art-search',
    'track-iteration-progress'
  ],
  
  async handleQuery(query: string, context: ROVContext) {
    if (context.currentPrototype) {
      // Provide contextual guidance based on prototype status
    }
  }
};
```

---

## Key Concepts

### Ownership Model

Wembley Wonders uses a **55/25/20 revenue share model**:

- **55%** to creators
- **25%** to the community fund
- **20%** to platform operations

This is configured per-prototype and can be adjusted based on community contribution level.

### IP Status Flow

graph TD
    unprotected --> disclosure-filed
    disclosure-filed --> under-review
    disclosure-filed --> approved
    under-review --> approved
    approved --> patent-pending
    patent-pending --> patent-granted
    patent-granted --> marketplace
```
unprotected
    │
    ▼
disclosure-filed ──► under-review
    │                    │
    ▼                    ▼
patent-pending ◄─── approved
    │
    ▼
patent-granted
    │
    ▼
marketplace
```

Alternative paths include:

- `design-registered` for design patents
- `trademarked` for brand protection
- `open-source` / `creative-commons` for open licensing

### Iteration Tracking

Every change to a prototype is versioned:

```typescript
await prototypeRegistry.addIteration(prototypeId, {
  title: 'Added solar panel efficiency improvements',
  description: 'Increased panel angle for better sun capture',
  changes: ['Modified mount angle from 30° to 45°', 'Added reflective backing'],
  createdBy: userId,
  workshopSession: 'stemgeneers-cohort-3-week-6',
  witnessed: true,
  witnessedBy: mentorId
});
```

The `witnessed` flag is crucial for patent applications - it provides evidence of development dates.

---

## Programme-Specific Usage

### STEMgeneers

Focus: **Hardware prototyping and utility patents**

```typescript
const stemPrototype = await prototypeRegistry.createPrototype({
  title: 'Modular Sensor Array',
  category: 'hardware',
  programme: 'stemgeneers',
  // Equipment used helps track what was available
  equipmentUsed: ['3D Printer', 'Soldering Station', 'Oscilloscope']
});
```

### Silk Stilettos

Focus: **Fashion-tech and design patents**

```typescript
const fashionPrototype = await prototypeRegistry.createPrototype({
  title: 'LED-Responsive Evening Wear',
  category: 'fashion-tech',
  programme: 'silk-stilettos',
  // Fashion often combines utility and design protection
  skills: ['Pattern Making', 'Electronics', 'Wearable Tech']
});
```

### TECHreneurs

Focus: **Business models and licensing strategies**

```typescript
// TECHreneurs helps participants evaluate IP strategies
const assessment = await prototypeRegistry.assessPatentability(disclosureId, {
  noveltyScore: 7,
  nonObviousnessScore: 6,
  utilityScore: 8,
  recommendation: 'moderate-candidate',
  suggestedIPStrategy: ['utility-patent', 'trade-secret'],
  reasoning: 'Strong utility but prior art exists in adjacent field'
});
```

---

## API Reference

### PrototypeRegistryService

```typescript
// Create
createPrototype(data: CreatePrototypeInput): Promise<Prototype>

// Read
getPrototype(id: string): Promise<Prototype | null>
searchPrototypes(params: PrototypeSearchParams): Promise<PrototypeSearchResult>
getPrototypesByProgramme(programme: ProgrammeSource): Promise<Prototype[]>
getPrototypesByCreator(creatorId: string): Promise<Prototype[]>

// Update
updatePrototype(id: string, updates: Partial<Prototype>): Promise<Prototype>
updateStatus(prototypeId: string, newStatus: PrototypeStatus): Promise<void>
updateIPStatus(prototypeId: string, newIPStatus: IPStatus): Promise<void>

// Iterations
addIteration(prototypeId: string, data: CreateIterationInput): Promise<Iteration>
getIterationHistory(prototypeId: string): Promise<Iteration[]>

// Creators
addCreator(prototypeId: string, creator: Creator): Promise<void>
updateCreatorContribution(prototypeId: string, creatorId: string, percentage: number): Promise<void>
removeCreator(prototypeId: string, creatorId: string): Promise<void>

// IP
createDisclosure(prototypeId: string, data: CreateDisclosureInput): Promise<InventionDisclosure>
submitDisclosure(disclosureId: string): Promise<void>
assessPatentability(disclosureId: string, assessment: PatentabilityAssessmentInput): Promise<void>
searchPriorArt(query: string): Promise<PriorArtSearchResult>

// Marketplace
listOnMarketplace(prototypeId: string, pricing: PricingModel, license: License): Promise<void>
recordSale(prototypeId: string, saleData: SaleRecord): Promise<void>
recordLicense(prototypeId: string, licenseData: LicenseRecord): Promise<void>

// Audit
getEventHistory(prototypeId: string): Promise<PrototypeEvent[]>
```

---

## Database Schema (Backend Reference)

When implementing the Spring Boot backend, use these entities:

```java
@Entity
public class Prototype {
    @Id
    private String id;
    private String title;
    private String slug;
    
    @Enumerated(EnumType.STRING)
    private PrototypeStatus status;
    
    @Enumerated(EnumType.STRING)
    private IPStatus ipStatus;
    
    @ManyToOne
    private Programme programme;
    
    @OneToMany(mappedBy = "prototype")
    private List<Creator> creators;
    
    @OneToMany(mappedBy = "prototype")
    private List<Iteration> iterations;
    
    private Integer communityContribution;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
```

---

## Security Considerations

1. **Creator Consent** - All inventors must give explicit consent before their names are included in disclosures
2. **Confidentiality** - Disclosures should be treated as confidential until IP protection is in place
3. **Access Control** - Only creators and authorised staff can edit prototype details
4. **Audit Trail** - All changes are logged with timestamps and user attribution

---

## Future Enhancements

- [ ] Integration with Google Patents API for automated prior art search
- [ ] Connection to UK IPO for direct filing
- [ ] Blockchain timestamping for invention evidence
- [ ] AI-assisted patentability scoring
- [ ] Cross-programme collaboration tracking

---

## Contact

### Wembley Wonders CIC

- Company No: 12960817
- Address: Flat 2, 452 High Road, Wembley HA9 7AY
- Email: <admin@wembleywonders.org>
- Phone: 0208 902 9991
