import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSandbox } from '../../../contexts/SandboxContext';
import './GtechCastersSandboxPage.css';

// ── Document Templates ──────────────────────────────────────────────────────

const TEMPLATES: Record<string, { label: string; icon: string; body: string }> = {
  podcast_runsheet: {
    label: 'Podcast Runsheet',
    icon: '🎙️',
    body: `# Podcast Runsheet\n\n**Show:** \n**Episode:** \n**Date:** \n**Host(s):** \n\n---\n\n## Pre-Show Checklist\n- [ ] Mics tested\n- [ ] Recording software armed\n- [ ] Guest briefed\n\n## Segment Plan\n\n| Time | Segment | Notes |\n|------|---------|-------|\n| 00:00 | Intro / theme | |\n| 02:00 | Welcome | |\n| 05:00 | Main interview | |\n| 25:00 | Community shout-outs | |\n| 28:00 | Outro / CTA | |\n\n## Key Questions\n1. \n2. \n3. \n\n## Post-Show\n- [ ] Export MP3\n- [ ] Upload to Raydyo\n- [ ] Post to Joystick\n`,
  },
  interview_plan: {
    label: 'Interview Plan',
    icon: '🎤',
    body: `# Interview Plan\n\n**Subject:** \n**Date / Location:** \n**Interviewer:** \n**Duration:** \n\n---\n\n## Background Research\n\n*Key facts about the interviewee or topic:*\n\n- \n- \n\n## Opening\n\n> Set the scene — who are we talking to and why does it matter to the Wembley community?\n\n## Core Questions\n\n1. **[Warm-up]** \n2. **[Main story]** \n3. **[Deeper dive]** \n4. **[Community angle]** \n5. **[Forward look]** \n\n## Follow-up Probes\n\n- Can you say more about…\n- What did that feel like?\n- What would you say to young people who…\n\n## Closing\n\n- Thank subject\n- Confirm any embargoes\n- Arrange photo/image sign-off\n`,
  },
  show_notes: {
    label: 'Show Notes',
    icon: '📋',
    body: `# Show Notes\n\n**Programme:** \n**Episode / Edition:** \n**Published:** \n\n---\n\n## Summary\n\n*Two or three sentences describing the episode:*\n\n\n\n## Chapters\n\n- **00:00** — \n- **05:00** — \n- **15:00** — \n- **25:00** — \n\n## People & Links Mentioned\n\n| Name / Resource | Link |\n|----------------|------|\n| | |\n| | |\n\n## Transcript Highlights\n\n> \n\n## Tags\n\n\`wembleywonders\` \`gtechcasters\` \n`,
  },
  broadcast_script: {
    label: 'Broadcast Script',
    icon: '📡',
    body: `# Broadcast Script\n\n**Show:** \n**Presenter:** \n**TX Date / Time:** \n\n---\n\n## INTRO\n\n*[MUSIC STING — fade under]*\n\n**PRESENTER:** Good [morning/afternoon/evening] Wembley — you're listening to [show name] on Raydyo. I'm [name], and today...\n\n---\n\n## ITEM 1\n\n**DUR:** \n\n**PRESENTER:** \n\n*[CUE AUDIO / CLIP]*\n\n---\n\n## ITEM 2\n\n**DUR:** \n\n**PRESENTER:** \n\n---\n\n## OUTRO\n\n**PRESENTER:** That's all for today. Remember — if it happens in Wembley, G-Tech Casters is there. Until next time.\n\n*[OUTRO MUSIC — full]*\n\n---\n*Script ends*\n`,
  },
};

// ── Types ───────────────────────────────────────────────────────────────────

interface DocState {
  id: string;
  templateKey: string;
  title: string;
  content: string;
  saved: boolean;
  createdAt: Date;
}

type MenuKey = 'file' | 'edit' | 'insert' | null;

// ── Helpers ─────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function newDoc(templateKey: string): DocState {
  const tpl = TEMPLATES[templateKey];
  return {
    id: generateId(),
    templateKey,
    title: `Untitled ${tpl.label}`,
    content: tpl.body,
    saved: false,
    createdAt: new Date(),
  };
}

// ── Main Component ───────────────────────────────────────────────────────────

const GtechCastersSandboxPage: React.FC = () => {
  const { updateProgress, addAchievement } = useSandbox();

  // Documents
  const [docs, setDocs] = useState<DocState[]>([newDoc('podcast_runsheet')]);
  const [activeId, setActiveId] = useState<string>(docs[0].id);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);

  // Editor ref for exec commands
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // History for undo/redo per doc
  const historyRef = useRef<Record<string, { stack: string[]; cursor: number }>>({});

  const activeDoc = docs.find((d) => d.id === activeId)!;

  // ── Undo / Redo history ──────────────────────────────────────────────────

  const pushHistory = useCallback((id: string, content: string) => {
    if (!historyRef.current[id]) {
      historyRef.current[id] = { stack: [content], cursor: 0 };
      return;
    }
    const h = historyRef.current[id];
    // Trim forward history
    h.stack = h.stack.slice(0, h.cursor + 1);
    h.stack.push(content);
    h.cursor = h.stack.length - 1;
  }, []);

  const applyHistory = useCallback(
    (delta: 1 | -1) => {
      const h = historyRef.current[activeId];
      if (!h) return;
      const next = h.cursor + delta;
      if (next < 0 || next >= h.stack.length) return;
      h.cursor = next;
      setDocs((prev) =>
        prev.map((d) =>
          d.id === activeId ? { ...d, content: h.stack[next], saved: false } : d
        )
      );
    },
    [activeId]
  );

  // ── Content change ────────────────────────────────────────────────────────

  const handleContentChange = useCallback(
    (val: string) => {
      pushHistory(activeId, val);
      setDocs((prev) =>
        prev.map((d) =>
          d.id === activeId ? { ...d, content: val, saved: false } : d
        )
      );
      updateProgress('gtechcasters_sandbox', Math.min(100, val.length / 10));
    },
    [activeId, pushHistory, updateProgress]
  );

  // ── File operations ───────────────────────────────────────────────────────

  const handleNew = (templateKey: string) => {
    const doc = newDoc(templateKey);
    historyRef.current[doc.id] = { stack: [doc.content], cursor: 0 };
    setDocs((prev) => [...prev, doc]);
    setActiveId(doc.id);
    setOpenMenu(null);
  };

  const handleSave = () => {
    setDocs((prev) =>
      prev.map((d) => (d.id === activeId ? { ...d, saved: true } : d))
    );
    addAchievement('Draft Saved');
    setOpenMenu(null);
  };

  const handleExport = () => {
    const blob = new Blob([activeDoc.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDoc.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addAchievement('Content Exported');
    setOpenMenu(null);
  };

  const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const doc: DocState = {
        id: generateId(),
        templateKey: 'podcast_runsheet',
        title: file.name.replace(/\.[^.]+$/, ''),
        content,
        saved: true,
        createdAt: new Date(),
      };
      historyRef.current[doc.id] = { stack: [content], cursor: 0 };
      setDocs((prev) => [...prev, doc]);
      setActiveId(doc.id);
    };
    reader.readAsText(file);
    setOpenMenu(null);
  };

  // ── Edit operations ───────────────────────────────────────────────────────

  const insertAtCursor = (text: string) => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = activeDoc.content;
    const next = val.slice(0, start) + text + val.slice(end);
    handleContentChange(next);
    // Restore cursor after React re-render
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + text.length;
      ta.focus();
    });
  };

  const handleCopy = () => {
    const ta = editorRef.current;
    if (!ta) return;
    const selected = activeDoc.content.slice(ta.selectionStart, ta.selectionEnd);
    navigator.clipboard.writeText(selected);
    setOpenMenu(null);
  };

  const handleCut = () => {
    const ta = editorRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = activeDoc.content.slice(start, end);
    navigator.clipboard.writeText(selected);
    const next = activeDoc.content.slice(0, start) + activeDoc.content.slice(end);
    handleContentChange(next);
    setOpenMenu(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      insertAtCursor(text);
    } catch {
      // Clipboard access denied — silent fail
    }
    setOpenMenu(null);
  };

  // ── Insert operations ─────────────────────────────────────────────────────

  const insertImage = () => {
    insertAtCursor('\n![Image description](https://)\n');
    setOpenMenu(null);
  };

  const insertLink = () => {
    insertAtCursor('[Link text](https://)');
    setOpenMenu(null);
  };

  const insertTable = () => {
    insertAtCursor(
      '\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| | | |\n| | | |\n'
    );
    setOpenMenu(null);
  };

  // ── Close menus on outside click ─────────────────────────────────────────

  useEffect(() => {
    const close = () => setOpenMenu(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // ── Initialise history for first doc ─────────────────────────────────────

  useEffect(() => {
    docs.forEach((d) => {
      if (!historyRef.current[d.id]) {
        historyRef.current[d.id] = { stack: [d.content], cursor: 0 };
      }
    });
  }, [docs]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's') { e.preventDefault(); handleSave(); }
        if (e.key === 'z') { e.preventDefault(); applyHistory(-1); }
        if (e.key === 'y') { e.preventDefault(); applyHistory(1); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSave, applyHistory]);

  // ── Render ────────────────────────────────────────────────────────────────

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="casters-sandbox">

      {/* ── Header ── */}
      <header className="cs-header">
        <div className="cs-header-brand">
          <span className="cs-brand-icon">📡</span>
          <span className="cs-brand-name">G-Tech Casters</span>
          <span className="cs-brand-sub">Production Sandbox</span>
        </div>
        <div className="cs-header-doc-title">
          <input
            className="cs-title-input"
            value={activeDoc.title}
            onChange={(e) =>
              setDocs((prev) =>
                prev.map((d) =>
                  d.id === activeId ? { ...d, title: e.target.value, saved: false } : d
                )
              )
            }
          />
          {!activeDoc.saved && <span className="cs-unsaved-dot" title="Unsaved changes" />}
        </div>
        <div className="cs-header-meta">
          {TEMPLATES[activeDoc.templateKey].icon}{' '}
          {TEMPLATES[activeDoc.templateKey].label}
        </div>
      </header>

      {/* ── Menubar ── */}
      <nav className="cs-menubar" onMouseDown={(e) => e.stopPropagation()}>

        {/* FILE */}
        <div className="cs-menu-item">
          <button
            className={`cs-menu-btn ${openMenu === 'file' ? 'active' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'file' ? null : 'file')}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="cs-dropdown">
              <div className="cs-dropdown-section-label">New…</div>
              {Object.entries(TEMPLATES).map(([key, tpl]) => (
                <button key={key} className="cs-dropdown-btn" onClick={() => handleNew(key)}>
                  {tpl.icon} {tpl.label}
                </button>
              ))}
              <div className="cs-dropdown-divider" />
              <button className="cs-dropdown-btn" onClick={() => fileInputRef.current?.click()}>
                📂 Open file…
              </button>
              <button className="cs-dropdown-btn" onClick={handleSave}>
                💾 Save <kbd>Ctrl S</kbd>
              </button>
              <button className="cs-dropdown-btn" onClick={handleExport}>
                ⬇️ Export as .txt
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md"
                style={{ display: 'none' }}
                onChange={handleOpen}
              />
            </div>
          )}
        </div>

        {/* EDIT */}
        <div className="cs-menu-item">
          <button
            className={`cs-menu-btn ${openMenu === 'edit' ? 'active' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'edit' ? null : 'edit')}
          >
            Edit
          </button>
          {openMenu === 'edit' && (
            <div className="cs-dropdown">
              <button className="cs-dropdown-btn" onClick={() => { applyHistory(-1); setOpenMenu(null); }}>
                ↩ Undo <kbd>Ctrl Z</kbd>
              </button>
              <button className="cs-dropdown-btn" onClick={() => { applyHistory(1); setOpenMenu(null); }}>
                ↪ Redo <kbd>Ctrl Y</kbd>
              </button>
              <div className="cs-dropdown-divider" />
              <button className="cs-dropdown-btn" onClick={handleCut}>✂️ Cut</button>
              <button className="cs-dropdown-btn" onClick={handleCopy}>📋 Copy</button>
              <button className="cs-dropdown-btn" onClick={handlePaste}>📌 Paste</button>
            </div>
          )}
        </div>

        {/* INSERT */}
        <div className="cs-menu-item">
          <button
            className={`cs-menu-btn ${openMenu === 'insert' ? 'active' : ''}`}
            onClick={() => setOpenMenu(openMenu === 'insert' ? null : 'insert')}
          >
            Insert
          </button>
          {openMenu === 'insert' && (
            <div className="cs-dropdown">
              <button className="cs-dropdown-btn" onClick={insertImage}>🖼️ Image</button>
              <button className="cs-dropdown-btn" onClick={insertLink}>🔗 Link</button>
              <button className="cs-dropdown-btn" onClick={insertTable}>📊 Table</button>
            </div>
          )}
        </div>

        {/* Toolbar shortcuts */}
        <div className="cs-toolbar-spacer" />
        <div className="cs-toolbar-shortcuts">
          <button className="cs-toolbar-btn" title="Save (Ctrl+S)" onClick={handleSave}>💾</button>
          <button className="cs-toolbar-btn" title="Undo (Ctrl+Z)" onClick={() => applyHistory(-1)}>↩</button>
          <button className="cs-toolbar-btn" title="Redo (Ctrl+Y)" onClick={() => applyHistory(1)}>↪</button>
          <button className="cs-toolbar-btn" title="Insert Link" onClick={insertLink}>🔗</button>
          <button className="cs-toolbar-btn" title="Insert Table" onClick={insertTable}>📊</button>
        </div>
      </nav>

      {/* ── Tab bar ── */}
      <div className="cs-tabs">
        {docs.map((d) => (
          <button
            key={d.id}
            className={`cs-tab ${d.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(d.id)}
          >
            {TEMPLATES[d.templateKey].icon} {d.title}
            {!d.saved && <span className="cs-tab-dot" />}
          </button>
        ))}
      </div>

      {/* ── Editor + Preview ── */}
      <div className="cs-workspace">
        <div className="cs-editor-pane">
          <textarea
            ref={editorRef}
            className="cs-editor"
            value={activeDoc.content}
            onChange={(e) => handleContentChange(e.target.value)}
            spellCheck
            placeholder="Start writing…"
          />
        </div>
        <div className="cs-preview-pane">
          <div className="cs-preview-label">Preview</div>
          <div className="cs-preview-content">
            {activeDoc.content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.slice(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
              if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
              if (line.startsWith('> ')) return <blockquote key={i}>{line.slice(2)}</blockquote>;
              if (line.startsWith('- [ ] ')) return <p key={i} className="cs-check">☐ {line.slice(6)}</p>;
              if (line.startsWith('- [x] ') || line.startsWith('- [X] ')) return <p key={i} className="cs-check done">☑ {line.slice(6)}</p>;
              if (line.startsWith('- ')) return <p key={i} className="cs-bullet">• {line.slice(2)}</p>;
              if (line.startsWith('---')) return <hr key={i} />;
              if (line.startsWith('|')) {
                const cells = line.split('|').filter(Boolean).map(c => c.trim());
                if (cells.every(c => /^[-:]+$/.test(c))) return null;
                return (
                  <div key={i} className="cs-table-row">
                    {cells.map((c, j) => <span key={j} className="cs-table-cell">{c}</span>)}
                  </div>
                );
              }
              if (line === '') return <br key={i} />;
              // inline bold/italic
              const rendered = line
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>');
              return <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
            })}
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <footer className="cs-statusbar">
        <span>{activeDoc.content.split(/\s+/).filter(Boolean).length} words</span>
        <span>{activeDoc.content.split('\n').length} lines</span>
        <span className={activeDoc.saved ? 'cs-status-saved' : 'cs-status-unsaved'}>
          {activeDoc.saved ? '✓ Saved' : '● Unsaved'}
        </span>
        <span>{docs.length} doc{docs.length !== 1 ? 's' : ''} open</span>
      </footer>
    </div>
  );
};

export default GtechCastersSandboxPage;