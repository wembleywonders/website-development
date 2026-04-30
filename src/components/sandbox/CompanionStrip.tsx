// src/components/sandbox/CompanionStrip.tsx
// Renders up to 2 docked companion panels alongside the primary workspace.
// Each companion is a reduced but live version of a tab panel.
// On mobile, companions collapse to a swipe-up drawer.
// Imports useDockState from hooks/useDockState.

import React from "react";
import "./CompanionStrip.css";
import { DockedCompanion } from "../../hooks/useDockState";

// ─── Single companion panel ───────────────────────────────────────────────────

interface CompanionPanelProps {
  companion: DockedCompanion;
  onUndock: (id: string) => void;
}

const CompanionPanel: React.FC<CompanionPanelProps> = ({ companion, onUndock }) => (
  <div className="cs-panel" style={{ "--cs-accent": companion.colour } as React.CSSProperties}>
    <div className="cs-panel__header">
      <span className="cs-panel__label">{companion.label}</span>
      <span className="cs-panel__programme">{companion.programme}</span>
      <button
        className="cs-panel__close"
        onClick={() => onUndock(companion.id)}
        aria-label="Close companion"
      >
        ×
      </button>
    </div>
    <div className="cs-panel__body">
      {companion.content}
    </div>
  </div>
);

// ─── Dock button (rendered inside each tab panel) ─────────────────────────────

interface DockButtonProps {
  label: string;
  isDocked: boolean;
  onDock: () => void;
  onUndock: () => void;
  colour?: string;
}

export const DockButton: React.FC<DockButtonProps> = ({
  label, isDocked, onDock, onUndock, colour = "#9b7fe8"
}) => (
  <button
    className={`cs-dock-btn${isDocked ? " cs-dock-btn--active" : ""}`}
    style={{ "--cs-accent": colour } as React.CSSProperties}
    onClick={isDocked ? onUndock : onDock}
    title={isDocked ? "Remove companion" : "Open as companion"}
  >
    <span className="cs-dock-btn__icon">{isDocked ? "⊟" : "⊞"}</span>
    <span className="cs-dock-btn__label">
      {isDocked ? "Close companion" : "Open alongside"}
    </span>
  </button>
);

// ─── Companion strip ──────────────────────────────────────────────────────────

interface CompanionStripProps {
  companions: DockedCompanion[];
  onUndock: (id: string) => void;
  onUndockAll: () => void;
}

const CompanionStrip: React.FC<CompanionStripProps> = ({
  companions,
  onUndock,
  onUndockAll,
}) => {
  if (companions.length === 0) return null;

  return (
    <aside className="cs-strip" aria-label="Companion panels">
      <div className="cs-strip__controls">
        <span className="cs-strip__count">
          {companions.length} companion{companions.length > 1 ? "s" : ""} open
        </span>
        {companions.length > 1 && (
          <button className="cs-strip__close-all" onClick={onUndockAll}>
            Close all
          </button>
        )}
      </div>
      <div className="cs-strip__panels">
        {companions.map(c => (
          <CompanionPanel key={c.id} companion={c} onUndock={onUndock} />
        ))}
      </div>
    </aside>
  );
};

export default CompanionStrip;
