import React, { useState } from 'react';
import styles from './CreativeWritingStudio.module.css';

interface CreativeWritingStudioProps {
  onComplete: () => void;
}

type GenreType = 'fiction' | 'poetry' | 'memoir' | 'flash' | null;

interface Prompt {
  title: string;
  starter: string;
  guidance: string;
}

const CreativeWritingStudio: React.FC<CreativeWritingStudioProps> = ({ onComplete }) => {
  const [selectedGenre, setSelectedGenre] = useState<GenreType>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [content, setContent] = useState('');

  const genres = {
    fiction: {
      title: 'Short Fiction',
      icon: '📚',
      description: 'Craft compelling short stories with strong characters and vivid settings',
      prompts: [
        {
          title: 'The Object',
          starter: 'Write about an ordinary object that holds extraordinary meaning...',
          guidance: 'Focus on showing emotion through action and detail. What does this object reveal about your character?'
        },
        {
          title: 'The Unexpected Visitor',
          starter: 'Someone arrives unannounced. The door opens, and...',
          guidance: 'Build tension through dialogue and body language. What does each character want from this encounter?'
        }
      ]
    },
    poetry: {
      title: 'Poetry',
      icon: '✍️',
      description: 'Express emotion and truth through verse, rhythm, and imagery',
      prompts: [
        {
          title: 'Sound of Home',
          starter: 'What does home sound like? Write a poem using only sensory details...',
          guidance: 'Avoid explaining or telling. Use concrete images: rain on zinc roofs, market vendors calling, grandmother\'s humming.'
        },
        {
          title: 'Between Two Places',
          starter: 'I stand between... (complete this line and continue)',
          guidance: 'Explore duality, transition, belonging. Let the rhythm match the emotion—short lines for tension, longer for reflection.'
        }
      ]
    },
    memoir: {
      title: 'Personal Memoir',
      icon: '📖',
      description: 'Share your truth through authentic personal narrative',
      prompts: [
        {
          title: 'The First Time',
          starter: 'The first time I understood... was when...',
          guidance: 'Write the scene, not the lesson. Show us that moment of realization through specific details and dialogue.'
        },
        {
          title: 'Recipe for Memory',
          starter: 'My [grandmother/mother/father] made... and while cooking, they always...',
          guidance: 'Food carries culture. What did the cooking teach you? What conversations happened while hands were busy?'
        }
      ]
    },
    flash: {
      title: 'Flash Fiction',
      icon: '⚡',
      description: 'Tell a complete story in under 500 words',
      prompts: [
        {
          title: 'Last Line First',
          starter: 'Start with this ending: "And that\'s why I never went back." Now write the story that leads to it.',
          guidance: 'Work backwards. Every sentence must earn its place. What\'s the ONE thing this story is about?'
        },
        {
          title: 'Overheard',
          starter: 'You overhear a conversation that changes everything...',
          guidance: 'Flash fiction needs a turn—a moment where everything shifts. Build to that moment, then stop.'
        }
      ]
    }
  };

  const handleGenreSelect = (genre: GenreType) => {
    setSelectedGenre(genre);
  };

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleBack = () => {
    if (selectedPrompt) {
      setSelectedPrompt(null);
      setContent('');
    } else if (selectedGenre) {
      setSelectedGenre(null);
    } else {
      onComplete();
    }
  };

  const handleSave = () => {
    // Create downloadable file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPrompt?.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  // Genre Selection Screen
  if (!selectedGenre) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Creative Writing Studio</h1>
          <p className={styles.subtitle}>Choose your genre and start writing</p>
        </div>

        <div className={styles.genreGrid}>
          {Object.entries(genres).map(([key, genre]) => (
            <div
              key={key}
              className={styles.genreCard}
              onClick={() => handleGenreSelect(key as GenreType)}
            >
              <div className={styles.genreIcon}>{genre.icon}</div>
              <h3 className={styles.genreTitle}>{genre.title}</h3>
              <p className={styles.genreDescription}>{genre.description}</p>
              <div className={styles.genreButton}>Start Writing →</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Prompt Selection Screen
  if (!selectedPrompt && selectedGenre) {
    const genreData = genres[selectedGenre];
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back to Genres
          </button>
          <h1 className={styles.title}>{genreData.title}</h1>
          <p className={styles.subtitle}>Choose a writing prompt</p>
        </div>

        <div className={styles.promptGrid}>
          {genreData.prompts.map((prompt, index) => (
            <div
              key={index}
              className={styles.promptCard}
              onClick={() => handlePromptSelect(prompt)}
            >
              <h3 className={styles.promptTitle}>{prompt.title}</h3>
              <p className={styles.promptStarter}>{prompt.starter}</p>
              <p className={styles.promptGuidance}>💡 {prompt.guidance}</p>
              <div className={styles.promptButton}>Choose This Prompt →</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Writing Screen
  return (
    <div className={styles.writingContainer}>
      <div className={styles.writingHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Prompts
        </button>
        <div className={styles.promptInfo}>
          <h2 className={styles.currentPrompt}>{selectedPrompt?.title}</h2>
          <p className={styles.currentGuidance}>{selectedPrompt?.guidance}</p>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.editorToolbar}>
          <div className={styles.counts}>
            <span className={styles.count}>Words: {wordCount}</span>
            <span className={styles.count}>Characters: {charCount}</span>
          </div>
        </div>

        <textarea
          className={styles.editor}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={selectedPrompt?.starter}
          autoFocus
        />

        <div className={styles.editorFooter}>
          <button onClick={handleSave} className={styles.saveButton} disabled={wordCount === 0}>
            💾 Download ({wordCount > 0 ? 'Free Download' : 'Write something first'})
          </button>
          <button onClick={onComplete} className={styles.doneButton}>
            Save & Continue →
          </button>
        </div>

        <p className={styles.memberNote}>
          💡 <strong>Free users:</strong> 3 downloads per month. <strong>Members:</strong> Unlimited saves, 
          Maya AI feedback, submit to Joystick e-zine!
        </p>
      </div>
    </div>
  );
};

export default CreativeWritingStudio;