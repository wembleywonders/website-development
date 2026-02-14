import React, { useState } from 'react';
import styles from './ScriptWriting.module.css';

interface ScriptWritingProps {
  onComplete: () => void;
}

type FormatType = 'stage' | 'radio' | 'screen' | null;

interface Template {
  name: string;
  description: string;
  format: string;
  example: string;
}

const ScriptWriting: React.FC<ScriptWritingProps> = ({ onComplete }) => {
  const [selectedFormat, setSelectedFormat] = useState<FormatType>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [content, setContent] = useState('');

  const formats = {
    stage: {
      title: 'Stage Play',
      icon: '🎭',
      description: 'Write for live theatre performance at Kaywana\'s Court',
      templates: [
        {
          name: 'Two-Character Scene',
          description: 'Intimate dialogue-driven scene for two actors',
          format: 'SCENE: [LOCATION]\n\n[CHARACTER 1]\n(action/emotion)\nDialogue here.\n\n[CHARACTER 2]\n(action/emotion)\nDialogue here.',
          example: 'Perfect for Park Lane Methodist performances'
        },
        {
          name: 'Monologue',
          description: 'Solo performance piece exploring inner truth',
          format: '[CHARACTER NAME] - [AGE, DESCRIPTION]\n\n(Setting the scene: time, place, mood)\n\n[Opens with...]\n\nText of monologue...',
          example: 'Great for showcases and competitions'
        }
      ]
    },
    radio: {
      title: 'Radio Drama',
      icon: '📻',
      description: 'Write for Raydyo broadcast - sound-driven storytelling',
      templates: [
        {
          name: 'Radio Play Scene',
          description: 'Sound and dialogue create the world',
          format: 'SCENE [#]: [LOCATION]\n\nSFX: [Sound effect description]\n\n[CHARACTER] (voice quality: warm/distant/etc)\nDialogue.\n\nMUSIC: [Music cue]',
          example: 'Broadcast on Raydyo community radio'
        },
        {
          name: 'Podcast Intro Script',
          description: 'Opening for podcast or radio show',
          format: '[HOST NAME]\n(Tone: energetic/calm/mysterious)\n\nGreeting and hook...\n\nMUSIC: [Theme]\n\nIntroducing today\'s topic...',
          example: 'Perfect for G-Tech Casters programme'
        }
      ]
    },
    screen: {
      title: 'Screenplay',
      icon: '🎬',
      description: 'Write for film and video - visual storytelling',
      templates: [
        {
          name: 'Short Film Scene',
          description: 'Cinematic scene with action and dialogue',
          format: 'INT./EXT. LOCATION - TIME\n\nAction description in present tense.\n\nCHARACTER NAME\nDialogue.\n\n(More action.)',
          example: 'Submit to community film festivals'
        },
        {
          name: 'YouTube Sketch',
          description: 'Quick comedy or drama sketch for video',
          format: 'TITLE: [Sketch Name]\nLENGTH: [1-3 minutes]\n\nOPEN ON:\nVisual description.\n\nCHARACTER\n(how they say it)\nWhat they say.',
          example: 'Create content for social media'
        }
      ]
    }
  };

  const handleFormatSelect = (format: FormatType) => {
    setSelectedFormat(format);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setContent(template.format + '\n\n[Start writing here...]');
  };

  const handleBack = () => {
    if (selectedTemplate) {
      setSelectedTemplate(null);
      setContent('');
    } else if (selectedFormat) {
      setSelectedFormat(null);
    } else {
      onComplete();
    }
  };

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-${selectedTemplate?.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const pageCount = Math.ceil(wordCount / 250); // Rough estimate: 250 words per page

  // Format Selection
  if (!selectedFormat) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Script Writing Studio</h1>
          <p className={styles.subtitle}>Choose your format: stage, radio, or screen</p>
        </div>

        <div className={styles.formatGrid}>
          {Object.entries(formats).map(([key, format]) => (
            <div
              key={key}
              className={styles.formatCard}
              onClick={() => handleFormatSelect(key as FormatType)}
            >
              <div className={styles.formatIcon}>{format.icon}</div>
              <h3 className={styles.formatTitle}>{format.title}</h3>
              <p className={styles.formatDescription}>{format.description}</p>
              <div className={styles.formatButton}>Choose Format →</div>
            </div>
          ))}
        </div>

        <div className={styles.infoBox}>
          <h3>📋 Script Formatting Matters</h3>
          <p>
            Professional formatting isn't just about looking good—it helps directors, actors, 
            and sound engineers understand your vision. Choose a format to see proper templates!
          </p>
        </div>
      </div>
    );
  }

  // Template Selection
  if (!selectedTemplate && selectedFormat) {
    const formatData = formats[selectedFormat];
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back to Formats
          </button>
          <h1 className={styles.title}>{formatData.title}</h1>
          <p className={styles.subtitle}>Choose a template to start writing</p>
        </div>

        <div className={styles.templateGrid}>
          {formatData.templates.map((template, index) => (
            <div
              key={index}
              className={styles.templateCard}
              onClick={() => handleTemplateSelect(template)}
            >
              <h3 className={styles.templateTitle}>{template.name}</h3>
              <p className={styles.templateDescription}>{template.description}</p>
              <div className={styles.templateExample}>
                <strong>Format Preview:</strong>
                <pre className={styles.formatPreview}>{template.format.substring(0, 100)}...</pre>
              </div>
              <p className={styles.templateNote}>💡 {template.example}</p>
              <div className={styles.templateButton}>Use This Template →</div>
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
          ← Back to Templates
        </button>
        <div className={styles.scriptInfo}>
          <h2 className={styles.currentTemplate}>{selectedTemplate?.name}</h2>
          <p className={styles.currentDescription}>{selectedTemplate?.description}</p>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.editorToolbar}>
          <div className={styles.counts}>
            <span className={styles.count}>Words: {wordCount}</span>
            <span className={styles.count}>Pages: ~{pageCount}</span>
          </div>
          <div className={styles.formatHint}>
            {selectedFormat === 'stage' && '💡 Use (parentheses) for stage directions'}
            {selectedFormat === 'radio' && '💡 Include SFX: for sound effects and MUSIC: for cues'}
            {selectedFormat === 'screen' && '💡 Action in present tense, dialogue centered'}
          </div>
        </div>

        <textarea
          className={styles.editor}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your script here following the template format..."
          autoFocus
          spellCheck={false}
        />

        <div className={styles.editorFooter}>
          <button onClick={handleSave} className={styles.saveButton} disabled={wordCount < 10}>
            💾 Download Script
          </button>
          <button onClick={onComplete} className={styles.doneButton}>
            Save & Continue →
          </button>
        </div>

        <div className={styles.pipelineInfo}>
          <h4>📍 Where Your Script Can Go:</h4>
          <ul>
            <li>🎭 <strong>Stage:</strong> Performed at Kaywana's Court at Park Lane Methodist</li>
            <li>📻 <strong>Radio:</strong> Recorded and broadcast on Raydyo community radio</li>
            <li>🎬 <strong>Screen:</strong> Filmed by community creators for Joystick e-zine</li>
          </ul>
          <p className={styles.memberNote}>
            <strong>Members:</strong> Submit scripts for consideration, get Maya feedback, 
            earn 55% revenue if performed/broadcast!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScriptWriting;