import React, { useState } from 'react';
import styles from './GameDesign.module.css';

interface GameDesignProps {
  onComplete: () => void;
}

type GameType = 'larp' | 'cyoa' | 'puzzle' | null;

interface Choice {
  text: string;
  outcome: string;
}

const GameDesign: React.FC<GameDesignProps> = ({ onComplete }) => {
  const [selectedType, setSelectedType] = useState<GameType>(null);
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [scenes, setScenes] = useState<Array<{id: number; title: string; content: string; choices: Choice[]}>>([
    { id: 1, title: 'Opening Scene', content: '', choices: [] }
  ]);
  const [currentScene, setCurrentScene] = useState(0);

  const gameTypes = {
    larp: {
      title: 'LARP Scenario',
      icon: '⚔️',
      description: 'Live Action Role Play - immersive character-driven experiences',
      guidance: 'Create characters, relationships, secrets, and objectives for players to discover through roleplay'
    },
    cyoa: {
      title: 'Choose Your Own Adventure',
      icon: '🔀',
      description: 'Branching narrative where readers make choices',
      guidance: 'Each scene should offer meaningful choices that lead to different outcomes'
    },
    puzzle: {
      title: 'Narrative Puzzle',
      icon: '🧩',
      description: 'Story-driven mystery or challenge',
      guidance: 'Weave clues and revelations into the narrative for players to solve'
    }
  };

  const handleTypeSelect = (type: GameType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    if (selectedType) {
      if (window.confirm('Are you sure? Your progress will be lost.')) {
        setSelectedType(null);
        setGameTitle('');
        setGameDescription('');
        setScenes([{ id: 1, title: 'Opening Scene', content: '', choices: [] }]);
        setCurrentScene(0);
      }
    } else {
      onComplete();
    }
  };

  const addScene = () => {
    const newScene = {
      id: scenes.length + 1,
      title: `Scene ${scenes.length + 1}`,
      content: '',
      choices: []
    };
    setScenes([...scenes, newScene]);
    setCurrentScene(scenes.length);
  };

  const updateScene = (field: 'title' | 'content', value: string) => {
    const updated = [...scenes];
    updated[currentScene][field] = value;
    setScenes(updated);
  };

  const addChoice = () => {
    const updated = [...scenes];
    updated[currentScene].choices.push({ text: '', outcome: '' });
    setScenes(updated);
  };

  const updateChoice = (index: number, field: 'text' | 'outcome', value: string) => {
    const updated = [...scenes];
    updated[currentScene].choices[index][field] = value;
    setScenes(updated);
  };

  const removeChoice = (index: number) => {
    const updated = [...scenes];
    updated[currentScene].choices.splice(index, 1);
    setScenes(updated);
  };

  const handleExport = () => {
    const gameData = {
      title: gameTitle,
      description: gameDescription,
      type: selectedType,
      scenes: scenes
    };

    const content = `# ${gameTitle}\n\n${gameDescription}\n\nType: ${gameTypes[selectedType!].title}\n\n` +
      scenes.map(scene => {
        let sceneText = `## ${scene.title}\n\n${scene.content}\n`;
        if (scene.choices.length > 0) {
          sceneText += '\n**Choices:**\n';
          scene.choices.forEach((choice, i) => {
            sceneText += `${i + 1}. ${choice.text}\n   → ${choice.outcome}\n`;
          });
        }
        return sceneText;
      }).join('\n\n---\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `game-${gameTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalWords = scenes.reduce((sum, scene) => {
    const sceneWords = scene.content.split(/\s+/).filter(w => w.length > 0).length;
    const choiceWords = scene.choices.reduce((cSum, choice) => {
      return cSum + choice.text.split(/\s+/).filter(w => w.length > 0).length +
             choice.outcome.split(/\s+/).filter(w => w.length > 0).length;
    }, 0);
    return sum + sceneWords + choiceWords;
  }, 0);

  // Type Selection
  if (!selectedType) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Game Design & Interactive Stories</h1>
          <p className={styles.subtitle}>Create LARP scenarios, branching narratives, and story-driven experiences</p>
        </div>

        <div className={styles.typeGrid}>
          {Object.entries(gameTypes).map(([key, type]) => (
            <div
              key={key}
              className={styles.typeCard}
              onClick={() => handleTypeSelect(key as GameType)}
            >
              <div className={styles.typeIcon}>{type.icon}</div>
              <h3 className={styles.typeTitle}>{type.title}</h3>
              <p className={styles.typeDescription}>{type.description}</p>
              <p className={styles.typeGuidance}>💡 {type.guidance}</p>
              <div className={styles.typeButton}>Start Designing →</div>
            </div>
          ))}
        </div>

        <div className={styles.infoBox}>
          <h3>🎮 Why Game Design?</h3>
          <p>
            Interactive storytelling combines narrative craft with player agency. Your stories 
            become experiences where participants shape outcomes through their choices.
          </p>
        </div>
      </div>
    );
  }

  // Game Design Interface
  return (
    <div className={styles.designContainer}>
      <div className={styles.designHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Game Types
        </button>
        <div className={styles.gameInfo}>
          <input
            type="text"
            className={styles.titleInput}
            placeholder="Game Title"
            value={gameTitle}
            onChange={(e) => setGameTitle(e.target.value)}
          />
          <textarea
            className={styles.descriptionInput}
            placeholder="Brief description of your game..."
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className={styles.designLayout}>
        {/* Scene Navigator */}
        <div className={styles.sceneNav}>
          <h3 className={styles.navTitle}>Scenes ({scenes.length})</h3>
          {scenes.map((scene, index) => (
            <div
              key={scene.id}
              className={`${styles.sceneNavItem} ${index === currentScene ? styles.active : ''}`}
              onClick={() => setCurrentScene(index)}
            >
              <span className={styles.sceneNumber}>{index + 1}</span>
              <span className={styles.sceneTitle}>{scene.title || `Scene ${index + 1}`}</span>
            </div>
          ))}
          <button onClick={addScene} className={styles.addSceneButton}>
            + Add Scene
          </button>
        </div>

        {/* Scene Editor */}
        <div className={styles.sceneEditor}>
          <div className={styles.editorHeader}>
            <input
              type="text"
              className={styles.sceneTitleInput}
              placeholder="Scene Title"
              value={scenes[currentScene].title}
              onChange={(e) => updateScene('title', e.target.value)}
            />
            <div className={styles.stats}>
              <span>Scene {currentScene + 1} of {scenes.length}</span>
              <span>Total Words: {totalWords}</span>
            </div>
          </div>

          <textarea
            className={styles.sceneContent}
            placeholder="Write the scene narrative here... Describe what happens, set the mood, introduce characters..."
            value={scenes[currentScene].content}
            onChange={(e) => updateScene('content', e.target.value)}
          />

          {/* Choices Section */}
          {(selectedType === 'cyoa' || selectedType === 'puzzle') && (
            <div className={styles.choicesSection}>
              <div className={styles.choicesHeader}>
                <h4>Player Choices</h4>
                <button onClick={addChoice} className={styles.addChoiceButton}>
                  + Add Choice
                </button>
              </div>

              {scenes[currentScene].choices.map((choice, index) => (
                <div key={index} className={styles.choiceItem}>
                  <div className={styles.choiceNumber}>{index + 1}</div>
                  <div className={styles.choiceInputs}>
                    <input
                      type="text"
                      placeholder="Choice text (what the player sees)"
                      value={choice.text}
                      onChange={(e) => updateChoice(index, 'text', e.target.value)}
                      className={styles.choiceText}
                    />
                    <input
                      type="text"
                      placeholder="Outcome (what happens if they choose this)"
                      value={choice.outcome}
                      onChange={(e) => updateChoice(index, 'outcome', e.target.value)}
                      className={styles.choiceOutcome}
                    />
                  </div>
                  <button
                    onClick={() => removeChoice(index)}
                    className={styles.removeChoice}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* LARP Character Notes */}
          {selectedType === 'larp' && (
            <div className={styles.larpNotes}>
              <h4>💡 LARP Design Tips:</h4>
              <ul>
                <li>Create character sheets with secrets and objectives</li>
                <li>Define relationships between characters (allies, rivals, family)</li>
                <li>Include props, locations, and time periods</li>
                <li>Give each character something they want and something they fear</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.designFooter}>
        <button onClick={handleExport} className={styles.exportButton} disabled={!gameTitle || totalWords < 50}>
          💾 Export Game Design
        </button>
        <button onClick={onComplete} className={styles.doneButton}>
          Save & Continue →
        </button>
        <p className={styles.memberNote}>
          <strong>Members:</strong> Playtest with community, get feedback, submit to Joystick for publication!
        </p>
      </div>
    </div>
  );
};

export default GameDesign;