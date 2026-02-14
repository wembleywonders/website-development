// src/components/sandboxes/mini/RepairSketchSandbox.tsx
// Mini-sandbox: Draw a 4-panel repair diagram
// Programme: Scrap Cat
// Constraint: 4 panels, 10 minute session

import React, { useState, useRef, useCallback, useEffect } from 'react';
import MiniSandboxBase, { SandboxConstraints, SandboxPrompt } from './MiniSandboxBase';
import './RepairSketchSandbox.css';

// ============================================
// PROMPTS
// ============================================

const REPAIR_PROMPTS: SandboxPrompt[] = [
  {
    id: 'repair-phone-screen',
    title: 'Phone Screen Replacement',
    brief: 'Draw a 4-panel guide showing how to replace a cracked phone screen. Panel 1: Tools needed. Panel 2: Opening the phone. Panel 3: Removing old screen. Panel 4: Installing new screen.',
    category: 'Mobile Repair',
    hints: [
      'Label the tools in Panel 1',
      'Show where the clips/screws are',
      'Arrows show direction of movement'
    ],
    inspiration: 'iFixit teardown guides are famous for their clear visuals. Even complex repairs become approachable when broken into simple steps with good diagrams.'
  },
  {
    id: 'repair-headphones',
    title: 'Headphone Cable Fix',
    brief: 'Draw a 4-panel guide for fixing headphones where sound only comes from one ear. Panel 1: Diagnose the problem. Panel 2: Find the break. Panel 3: Strip the wire. Panel 4: Reconnect.',
    category: 'Audio Repair',
    hints: [
      'Show the "flex test" to find the break',
      'Color-code the internal wires',
      'Show the soldering/twisting step'
    ],
    inspiration: 'The best repair guides assume nothing. Someone has never held a soldering iron. Your drawings need to communicate to a complete beginner.'
  },
  {
    id: 'repair-laptop-fan',
    title: 'Laptop Running Hot',
    brief: 'Draw a 4-panel guide for cleaning a laptop\'s cooling system. Panel 1: Symptoms. Panel 2: Opening the laptop. Panel 3: Cleaning the fan/heatsink. Panel 4: Reassembly.',
    category: 'Computer Repair',
    hints: [
      'Show the symptoms visually (hot areas, fan noise)',
      'Mark which screws to remove',
      'Show dust removal technique'
    ],
    inspiration: 'Many laptops end up in landfill because people think "it\'s broken" when they just need dust cleaned out. A simple guide saves devices.'
  },
  {
    id: 'repair-kettle',
    title: 'Kettle Won\'t Turn On',
    brief: 'Draw a 4-panel troubleshooting guide for an electric kettle that won\'t switch on. Panel 1: Safety first. Panel 2: Check connections. Panel 3: Test the switch. Panel 4: Common fixes.',
    category: 'Appliance Repair',
    hints: [
      'ALWAYS show unplugging first!',
      'The base connection is often the problem',
      'Thermal cut-out might be tripped'
    ],
    inspiration: 'Most "broken" small appliances have simple fixes. The hardest part is convincing people to look instead of throwing away.'
  }
];

// ============================================
// TYPES
// ============================================

interface Panel {
  id: number;
  title: string;
  canvas: HTMLCanvasElement | null;
  hasContent: boolean;
}

type Tool = 'pen' | 'eraser' | 'arrow' | 'circle' | 'text';

// ============================================
// COMPONENT
// ============================================

const RepairSketchSandbox: React.FC = () => {
  const [currentPrompt] = useState<SandboxPrompt>(
    REPAIR_PROMPTS[Math.floor(Math.random() * REPAIR_PROMPTS.length)]
  );
  const [activePanel, setActivePanel] = useState(0);
  const [panelTitles, setPanelTitles] = useState(['', '', '', '']);
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [panelHasContent, setPanelHasContent] = useState([false, false, false, false]);
  
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null, null]);
  const contextRefs = useRef<(CanvasRenderingContext2D | null)[]>([null, null, null, null]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const constraints: SandboxConstraints = {
    maxItems: 4,
    timeLimit: 10,
  };

  const COLORS = ['#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  // Initialize canvases
  useEffect(() => {
    canvasRefs.current.forEach((canvas, i) => {
      if (canvas && !contextRefs.current[i]) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          contextRefs.current[i] = ctx;
        }
      }
    });
  }, []);

  const getCanvasCoords = useCallback((e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRefs.current[activePanel];
    const ctx = contextRefs.current[activePanel];
    if (!canvas || !ctx) return;

    const coords = getCanvasCoords(e, canvas);
    lastPosRef.current = coords;
    setIsDrawing(true);

    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
    ctx.lineWidth = currentTool === 'eraser' ? lineWidth * 3 : lineWidth;
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  }, [activePanel, currentColor, currentTool, lineWidth, getCanvasCoords]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRefs.current[activePanel];
    const ctx = contextRefs.current[activePanel];
    if (!canvas || !ctx || !lastPosRef.current) return;

    const coords = getCanvasCoords(e, canvas);
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    lastPosRef.current = coords;
    
    // Mark panel as having content
    setPanelHasContent(prev => {
      const updated = [...prev];
      updated[activePanel] = true;
      return updated;
    });
  }, [isDrawing, activePanel, getCanvasCoords]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    lastPosRef.current = null;
  }, []);

  const clearPanel = useCallback((panelIndex: number) => {
    const canvas = canvasRefs.current[panelIndex];
    const ctx = contextRefs.current[panelIndex];
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setPanelHasContent(prev => {
      const updated = [...prev];
      updated[panelIndex] = false;
      return updated;
    });
  }, []);

  const updatePanelTitle = useCallback((index: number, title: string) => {
    setPanelTitles(prev => {
      const updated = [...prev];
      updated[index] = title;
      return updated;
    });
  }, []);

  const completedPanels = panelHasContent.filter(Boolean).length;

  return (
    <MiniSandboxBase
      sandboxId="repair-sketch"
      sandboxName="4-Panel Repair Guide"
      sandboxEmoji="✏️"
      programme="Scrap Cat"
      constraints={constraints}
      prompt={currentPrompt}
    >
      <div className="repair-sketch-sandbox">
        {/* Progress */}
        <div className="sketch-progress">
          <div className="panel-indicators">
            {[0, 1, 2, 3].map(i => (
              <button
                key={i}
                className={`panel-indicator ${activePanel === i ? 'active' : ''} ${panelHasContent[i] ? 'has-content' : ''}`}
                onClick={() => setActivePanel(i)}
              >
                <span className="panel-num">{i + 1}</span>
                {panelHasContent[i] && <span className="check">✓</span>}
              </button>
            ))}
          </div>
          <span className="progress-text">{completedPanels}/4 panels drawn</span>
        </div>

        {/* Tool Palette */}
        <div className="tool-palette">
          <div className="tool-group">
            <span className="tool-label">Tools:</span>
            <button 
              className={`tool-btn ${currentTool === 'pen' ? 'active' : ''}`}
              onClick={() => setCurrentTool('pen')}
              title="Pen"
            >
              ✏️
            </button>
            <button 
              className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
              onClick={() => setCurrentTool('eraser')}
              title="Eraser"
            >
              🧹
            </button>
          </div>

          <div className="tool-group">
            <span className="tool-label">Color:</span>
            <div className="color-options">
              {COLORS.map(color => (
                <button
                  key={color}
                  className={`color-btn ${currentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="tool-group">
            <span className="tool-label">Size:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
          </div>

          <button 
            className="btn-clear-panel"
            onClick={() => clearPanel(activePanel)}
          >
            🗑️ Clear Panel {activePanel + 1}
          </button>
        </div>

        {/* Drawing Area */}
        <div className="drawing-area">
          <div className="panel-header">
            <span className="panel-number">Panel {activePanel + 1} of 4</span>
            <input
              type="text"
              value={panelTitles[activePanel]}
              onChange={(e) => updatePanelTitle(activePanel, e.target.value)}
              placeholder={`Title for panel ${activePanel + 1}...`}
              className="panel-title-input"
            />
          </div>

          <div className="canvas-container">
            <canvas
              ref={el => { canvasRefs.current[activePanel] = el; }}
              width={600}
              height={400}
              className="drawing-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          <div className="panel-navigation">
            <button
              onClick={() => setActivePanel(Math.max(0, activePanel - 1))}
              disabled={activePanel === 0}
            >
              ← Previous
            </button>
            <button
              onClick={() => setActivePanel(Math.min(3, activePanel + 1))}
              disabled={activePanel === 3}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Preview Grid */}
        <div className="preview-section">
          <h4>📋 Your Repair Guide</h4>
          <div className="preview-grid">
            {[0, 1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`preview-panel ${activePanel === i ? 'active' : ''}`}
                onClick={() => setActivePanel(i)}
              >
                <div className="preview-header">
                  <span className="preview-num">{i + 1}</span>
                  <span className="preview-title">
                    {panelTitles[i] || `Panel ${i + 1}`}
                  </span>
                </div>
                <div className="preview-canvas">
                  {panelHasContent[i] ? (
                    <canvas
                      width={150}
                      height={100}
                      ref={el => {
                        if (el && canvasRefs.current[i]) {
                          const ctx = el.getContext('2d');
                          if (ctx) {
                            ctx.drawImage(canvasRefs.current[i]!, 0, 0, 150, 100);
                          }
                        }
                      }}
                    />
                  ) : (
                    <span className="empty-indicator">Empty</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawing Tips */}
        <div className="tips-panel">
          <h4>🎯 Repair Guide Drawing Tips</h4>
          <ul>
            <li><strong>Labels matter</strong> - Name every part and tool</li>
            <li><strong>Arrows show direction</strong> - Which way to pull, push, twist</li>
            <li><strong>Keep it simple</strong> - Stick figures and boxes work fine</li>
            <li><strong>Danger in red</strong> - Mark hot/sharp/electrical hazards</li>
          </ul>
        </div>
      </div>
    </MiniSandboxBase>
  );
};

export default RepairSketchSandbox;