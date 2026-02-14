// src/components/sandboxes/discovery/challenges/CircuitChallenge.tsx
// STEMgineers: Wire a simple LED circuit
// Visual circuit builder with drag-and-drop

import React, { useState, useCallback } from 'react';
import './ChallengeBase.css';

interface CircuitChallengeProps {
  onComplete: (result: { completed: boolean; circuit?: CircuitState; timeSpent: number }) => void;
  onSkip: () => void;
}

interface CircuitState {
  batteryConnected: boolean;
  ledConnected: boolean;
  resistorConnected: boolean;
  switchConnected: boolean;
  switchOn: boolean;
  circuitComplete: boolean;
}

interface Component {
  id: string;
  name: string;
  emoji: string;
  description: string;
  required: boolean;
}

const COMPONENTS: Component[] = [
  { id: 'battery', name: 'Battery', emoji: '🔋', description: 'Power source (3V)', required: true },
  { id: 'led', name: 'LED', emoji: '💡', description: 'Light Emitting Diode', required: true },
  { id: 'resistor', name: 'Resistor', emoji: '⚡', description: 'Limits current (protects LED)', required: true },
  { id: 'switch', name: 'Switch', emoji: '🔘', description: 'Controls the circuit', required: false }
];

const CircuitChallenge: React.FC<CircuitChallengeProps> = ({ onComplete, onSkip }) => {
  const [placedComponents, setPlacedComponents] = useState<string[]>([]);
  const [connections, setConnections] = useState<Record<string, boolean>>({
    'battery-resistor': false,
    'resistor-led': false,
    'led-battery': false,
    'switch-active': false
  });
  const [switchOn, setSwitchOn] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const isComponentPlaced = (id: string) => placedComponents.includes(id);
  
  const placeComponent = useCallback((id: string) => {
    if (!placedComponents.includes(id)) {
      setPlacedComponents(prev => [...prev, id]);
    }
  }, [placedComponents]);

  const removeComponent = useCallback((id: string) => {
    setPlacedComponents(prev => prev.filter(c => c !== id));
    // Reset related connections
    setConnections(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (key.includes(id)) {
          updated[key] = false;
        }
      });
      return updated;
    });
  }, []);

  const toggleConnection = useCallback((connectionId: string) => {
    // Check if both components are placed
    const [comp1, comp2] = connectionId.split('-');
    if (comp2 === 'active') {
      // Switch toggle
      if (isComponentPlaced('switch')) {
        setSwitchOn(prev => !prev);
      }
      return;
    }
    
    if (isComponentPlaced(comp1) && isComponentPlaced(comp2)) {
      setConnections(prev => ({
        ...prev,
        [connectionId]: !prev[connectionId]
      }));
    }
  }, [placedComponents]);

  // Check if circuit is complete
  const hasSwitch = isComponentPlaced('switch');
  const circuitComplete = 
    isComponentPlaced('battery') &&
    isComponentPlaced('led') &&
    isComponentPlaced('resistor') &&
    connections['battery-resistor'] &&
    connections['resistor-led'] &&
    connections['led-battery'] &&
    (!hasSwitch || switchOn);

  const ledLit = circuitComplete;

  const handleSubmit = useCallback(() => {
    onComplete({
      completed: true,
      circuit: {
        batteryConnected: connections['battery-resistor'],
        ledConnected: connections['resistor-led'] && connections['led-battery'],
        resistorConnected: connections['battery-resistor'] && connections['resistor-led'],
        switchConnected: hasSwitch,
        switchOn,
        circuitComplete
      },
      timeSpent: Math.floor((Date.now() - startTime) / 1000)
    });
  }, [connections, hasSwitch, switchOn, circuitComplete, startTime, onComplete]);

  const requiredPlaced = COMPONENTS.filter(c => c.required).every(c => isComponentPlaced(c.id));

  return (
    <div className="challenge-container circuit-challenge">
      <div className="circuit-instructions">
        <p>Build a working LED circuit! Drag components to the board, then connect them.</p>
      </div>

      {/* Component Tray */}
      <div className="component-tray">
        <h4>Components</h4>
        <div className="components-list">
          {COMPONENTS.map(comp => (
            <div
              key={comp.id}
              className={`component-item ${isComponentPlaced(comp.id) ? 'placed' : ''}`}
              onClick={() => !isComponentPlaced(comp.id) && placeComponent(comp.id)}
            >
              <span className="comp-emoji">{comp.emoji}</span>
              <span className="comp-name">{comp.name}</span>
              {comp.required && !isComponentPlaced(comp.id) && (
                <span className="required-badge">Required</span>
              )}
              {isComponentPlaced(comp.id) && (
                <span className="placed-badge">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Circuit Board */}
      <div className="circuit-board">
        <div className="board-title">Circuit Board</div>
        
        {/* Visual Circuit Layout */}
        <div className="circuit-layout">
          {/* Battery Position */}
          <div className="circuit-slot battery-slot">
            {isComponentPlaced('battery') ? (
              <div className="placed-component" onClick={() => removeComponent('battery')}>
                <span className="big-emoji">🔋</span>
                <span className="label">Battery</span>
                <span className="remove-hint">Click to remove</span>
              </div>
            ) : (
              <div className="empty-slot">
                <span className="slot-label">Battery here</span>
              </div>
            )}
          </div>

          {/* Wire: Battery to Resistor */}
          <div 
            className={`wire wire-horizontal ${connections['battery-resistor'] ? 'connected' : ''}`}
            onClick={() => toggleConnection('battery-resistor')}
          >
            <span className="wire-label">
              {connections['battery-resistor'] ? '🔗 Connected' : '➕ Click to connect'}
            </span>
          </div>

          {/* Resistor Position */}
          <div className="circuit-slot resistor-slot">
            {isComponentPlaced('resistor') ? (
              <div className="placed-component" onClick={() => removeComponent('resistor')}>
                <span className="big-emoji">⚡</span>
                <span className="label">Resistor</span>
                <span className="remove-hint">Click to remove</span>
              </div>
            ) : (
              <div className="empty-slot">
                <span className="slot-label">Resistor here</span>
              </div>
            )}
          </div>

          {/* Wire: Resistor to LED */}
          <div 
            className={`wire wire-horizontal ${connections['resistor-led'] ? 'connected' : ''}`}
            onClick={() => toggleConnection('resistor-led')}
          >
            <span className="wire-label">
              {connections['resistor-led'] ? '🔗 Connected' : '➕ Click to connect'}
            </span>
          </div>

          {/* LED Position */}
          <div className="circuit-slot led-slot">
            {isComponentPlaced('led') ? (
              <div className={`placed-component ${ledLit ? 'lit' : ''}`} onClick={() => removeComponent('led')}>
                <span className="big-emoji">{ledLit ? '💡' : '⚫'}</span>
                <span className="label">LED {ledLit ? '(ON!)' : '(off)'}</span>
                <span className="remove-hint">Click to remove</span>
              </div>
            ) : (
              <div className="empty-slot">
                <span className="slot-label">LED here</span>
              </div>
            )}
          </div>

          {/* Wire: LED back to Battery */}
          <div 
            className={`wire wire-return ${connections['led-battery'] ? 'connected' : ''}`}
            onClick={() => toggleConnection('led-battery')}
          >
            <span className="wire-label">
              {connections['led-battery'] ? '🔗 Return wire' : '➕ Complete circuit'}
            </span>
          </div>

          {/* Optional Switch */}
          {isComponentPlaced('switch') && (
            <div className="switch-section">
              <div 
                className={`switch-component ${switchOn ? 'on' : 'off'}`}
                onClick={() => setSwitchOn(!switchOn)}
              >
                <span className="big-emoji">🔘</span>
                <span className="label">Switch: {switchOn ? 'ON' : 'OFF'}</span>
                <span className="switch-hint">Click to toggle</span>
              </div>
            </div>
          )}
        </div>

        {/* Circuit Status */}
        <div className={`circuit-status ${circuitComplete ? 'success' : ''}`}>
          {circuitComplete ? (
            <>
              <span className="status-icon">✨</span>
              <span>Circuit complete! LED is lit!</span>
            </>
          ) : (
            <>
              <span className="status-icon">🔧</span>
              <span>Circuit incomplete - keep connecting!</span>
            </>
          )}
        </div>
      </div>

      {/* Hint Section */}
      <div className="hint-section">
        <button 
          className="btn-hint"
          onClick={() => setShowHint(!showHint)}
        >
          💡 {showHint ? 'Hide' : 'Show'} Hint
        </button>
        
        {showHint && (
          <div className="hint-content">
            <p><strong>Circuit order:</strong> Battery → Resistor → LED → back to Battery</p>
            <p><strong>Why a resistor?</strong> Without it, too much current flows and the LED burns out!</p>
            <p><strong>Tip:</strong> Electricity flows in a complete loop. All connections must be made.</p>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="circuit-checklist">
        <h4>Checklist</h4>
        <ul>
          <li className={isComponentPlaced('battery') ? 'done' : ''}>
            {isComponentPlaced('battery') ? '✅' : '⬜'} Place battery
          </li>
          <li className={isComponentPlaced('resistor') ? 'done' : ''}>
            {isComponentPlaced('resistor') ? '✅' : '⬜'} Place resistor
          </li>
          <li className={isComponentPlaced('led') ? 'done' : ''}>
            {isComponentPlaced('led') ? '✅' : '⬜'} Place LED
          </li>
          <li className={connections['battery-resistor'] && connections['resistor-led'] && connections['led-battery'] ? 'done' : ''}>
            {connections['battery-resistor'] && connections['resistor-led'] && connections['led-battery'] ? '✅' : '⬜'} Connect all wires
          </li>
          <li className={ledLit ? 'done' : ''}>
            {ledLit ? '✅' : '⬜'} LED lights up!
          </li>
        </ul>
      </div>

      <div className="tips-compact">
        <strong>Real world:</strong> This is exactly how simple circuits work! 
        Understanding this lets you diagnose why things don't turn on.
      </div>

      <div className="challenge-actions">
        <button className="btn-skip" onClick={onSkip}>
          Skip this challenge
        </button>
        <button 
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!circuitComplete}
        >
          {circuitComplete ? '✅ Circuit Complete!' : 'Light up the LED to continue'}
        </button>
      </div>
    </div>
  );
};

export default CircuitChallenge;