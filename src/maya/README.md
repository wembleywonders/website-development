# Maya Pedagogical System

Maya is Wembley Wonders' AI companion that guides users through a 5-stage journey from consumer to independent creator. Unlike traditional help systems, Maya implements a **pedagogical fade-out**: she becomes quieter as users develop competence, only returning to share pattern insights.

## Design Philosophy

> "Maya's silence is not absence—it's the sound of the user's own voice becoming primary."

### The 5 Pedagogical Stages

| Stage | User State | Maya's Role | Key Shift |
| ----- | ---------- | ----------- | --------- |
| **1. Orientation** | "I don't know what's possible" | Narrator of cause-and-effect | Tools respond to me |
| **2. Imitation** | "Show me how others do it" | Intent translator | I can reproduce results |
| **3. Variation** | "What if I change this?" | Reflective mirror | My choices matter |
| **4. Intentionality** | "What am I trying to make?" | Tradeoff partner | I decide what success means |
| **5. Professionalization** | "Can this sustain me?" | Pattern analyst | I own my process |

### Maya's Modes

```text
ACTIVE → HANDOFF → WITNESS → RE_ENTRY → PARTNER
```

- **ACTIVE**: Inline overlays, proactive tips, names effects
- **HANDOFF**: One-time transition message: "You're making deliberate choices now..."
- **WITNESS**: Collapsed icon, pull-only, silent pattern tracking
- **RE_ENTRY**: Returns with consent-based pattern insight
- **PARTNER**: Minimal presence, process mirroring

## Installation

```bash
# Copy the maya-components folder to your src directory
cp -r maya-components/* src/maya/

# Install zustand if not present
npm install zustand
```

## File Structure

src/maya/
├── index.ts                          # Main exports
├── types/
│   └── mayaTypes.ts                  # Type definitions & constants
├── stores/
│   └── mayaStore.ts                  # Zustand store with full state machine
└── components/
    ├── MayaCompanion.tsx             # Main floating Maya component
    ├── MayaCompanion.module.css
    └── sandboxes/shared/
        ├── MayaConversation.tsx      # Embedded sandbox Maya
        └── MayaConversation.module.css

src/maya/
├── index.ts                          # Main exports
├── types/
│   └── mayaTypes.ts                  # Type definitions & constants
├── stores/
│   └── mayaStore.ts                  # Zustand store with full state machine
└── components/
    ├── MayaCompanion.tsx             # Main floating Maya component
    ├── MayaCompanion.module.css
    └── sandboxes/shared/
        ├── MayaConversation.tsx      # Embedded sandbox Maya
        └── MayaConversation.module.css
```
src/maya/
├── index.ts                          # Main exports
├── types/
│   └── mayaTypes.ts                  # Type definitions & constants
├── stores/
│   └── mayaStore.ts                  # Zustand store with full state machine
└── components/
    ├── MayaCompanion.tsx             # Main floating Maya component
    ├── MayaCompanion.module.css
    └── sandboxes/shared/
        ├── MayaConversation.tsx      # Embedded sandbox Maya
        └── MayaConversation.module.css
```

## Usage

### 1. Add MayaCompanion to your app (floating widget)

```tsx
// App.tsx
import { MayaCompanion } from './maya';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Routes>...</Routes>
      
      {/* Maya floating companion - appears in corner */}
      <MayaCompanion position="bottom-right" />
    </div>
  );
}
```

### 2. Use MayaConversation in sandboxes (embedded)

```tsx
// SandboxPage.tsx
import { 
  MayaWelcome, 
  MayaHint, 
  MayaReflection,
  MayaSilentIndicator 
} from './maya';

function SandboxPage() {
  return (
    <div className="sandbox-layout">
      {/* Sidebar with Maya */}
      <aside className="sidebar">
        <MayaWelcome sandboxId="pageturners" />
        <MayaSilentIndicator onClick={() => {/* open chat */}} />
      </aside>
      
      {/* Main canvas */}
      <main className="canvas">
        {/* Your sandbox content */}
      </main>
    </div>
  );
}
```

### 3. Track user actions for quiet moment triggers

```tsx
import { useMayaTracking } from './maya';

function ToolButton({ tool, onClick }) {
  const { trackAction, recordToolUsed } = useMayaTracking();
  
  const handleClick = () => {
    // Track for quiet moment triggers
    trackAction('tool_use');
    recordToolUsed(tool.id);
    
    // Do the actual action
    onClick();
  };
  
  return <button onClick={handleClick}>{tool.name}</button>;
}
```

### 4. Track project naming (strong intent signal)

```tsx
import { useMayaTracking } from './maya';

function ProjectTitle() {
  const { trackProjectNamed } = useMayaTracking();
  
  const handleTitleChange = (title) => {
    if (title.trim()) {
      trackProjectNamed(); // Signals user has intent
    }
    // Save title...
  };
  
  return <input onChange={(e) => handleTitleChange(e.target.value)} />;
}
```

### 5. Handle error recovery (resilience signal)

```tsx
import { useMayaTracking } from './maya';

function ErrorBoundary({ children }) {
  const { trackErrorResolved } = useMayaTracking();
  const errorStartTime = useRef<number | null>(null);
  
  const handleError = () => {
    errorStartTime.current = Date.now();
  };
  
  const handleRecovery = () => {
    if (errorStartTime.current) {
      const timeToResolve = Date.now() - errorStartTime.current;
      trackErrorResolved(timeToResolve);
      errorStartTime.current = null;
    }
  };
  
  // ...
}
```

## The Quiet Moment

Maya goes quiet when THREE signals converge:

```typescript
// From mayaTypes.ts
const isReadyForSilence = (triggers: QuietMomentTriggers): boolean => {
  const hasAgency = triggers.selfDirectedActions.unpromptedToolUses >= 5;
  const hasIntent = triggers.intentSignals.namedProject || 
                    triggers.intentSignals.consistentDirection >= 4;
  const hasResilience = triggers.resilienceSignals.resolvedWithoutHelp;
  
  return hasAgency && hasIntent && hasResilience;
};
```

When all three converge, Maya delivers the handoff message:

> "You're making deliberate choices now. I'll step back—call me if you want reflection."

## Concept Introduction Flow

```text
UI Action → Maya Names It → General Concepts Reference
```

1. **First Encounter (UI)**: User clicks [+ Layer] and sees it appear
2. **Naming (Maya)**: "Layers let you test ideas without committing"
3. **Formalization (General Concepts)**: Searchable definition in help

## Components Reference

### MayaCompanion

Main floating widget. Use at app root level.

```tsx
<MayaCompanion 
  position="bottom-right"  // or bottom-left, top-right, top-left
  className="custom-class"
/>
```

### MayaConversation

Embedded conversation for sandboxes.

```tsx
<MayaConversation
  message="Custom message"
  type="narration"  // narration, intent, reflection, tradeoff, pattern
  variant="panel"   // inline, panel, minimal
  onResponse={(text) => handleResponse(text)}
/>
```

### MayaWelcome

Stage-appropriate welcome message.

```tsx
<MayaWelcome sandboxId="pageturners" />
```

### MayaHint

Contextual hint that can be dismissed.

```tsx
<MayaHint 
  hint="Optional custom hint"
  tool="current-tool-id"
  onDismiss={() => setShowHint(false)}
/>
```

### MayaReflection

End-of-session reflection prompt.

```tsx
<MayaReflection 
  onResponse={(response) => saveReflection(response)}
  custom="Optional custom prompt"
/>
```

### MayaSilentIndicator

Shows Maya is available but silent (WITNESS mode).

```tsx
<MayaSilentIndicator onClick={() => openMayaChat()} />
```

## Store Hooks

```tsx
import { 
  useMayaStore,     // Full store access
  useMayaStage,     // currentStage, stageDef, advanceStage
  useMayaMode,      // currentMode, shouldShowInline, isProactive
  useMayaMessages,  // messages, addMessage, clearMessages
  useMayaTracking   // trackAction, trackProjectNamed, etc.
} from './maya';
```

## Customization

### Disable Maya

```tsx
const setMayaEnabled = useMayaStore((s) => s.setMayaEnabled);
setMayaEnabled(false);
```

### Disable proactive hints

```tsx
const setShowHints = useMayaStore((s) => s.setShowHints);
setShowHints(false);
```

### Disable session-end reflections

```tsx
const setReflectionPrompts = useMayaStore((s) => s.setReflectionPrompts);
setReflectionPrompts(false);
```

### Reset Maya state

```tsx
const resetMaya = useMayaStore((s) => s.resetMaya);
resetMaya(); // Clears all progress, resets to Stage 1
```

## CSS Variables

Override these in your global CSS to customize colors:

```css
:root {
  --maya-primary: #8B5CF6;
  --maya-bg: #1E1B4B;
  --maya-text: #F5F3FF;
  --maya-gold: #F59E0B;
  --maya-insight: #10B981;
}
```

---

## Design Principles Reminder

1. **Maya explains intent, not mechanics** - The UI teaches how; Maya explains why
2. **Silence is earned** - Not timer-based, but trigger-based
3. **Identity language matters** - "Your project", "Your process", "Your style"
4. **Failure must be productive** - Errors visible, recovery easy, lessons legible
5. **Learning by making decisions** - Every interaction forces a choice
