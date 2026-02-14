import React, { useState } from 'react';
import styles from './WellbeingWriting.module.css';

interface WellbeingWritingProps {
  onComplete: () => void;
}

type PracticeType = 'gratitude' | 'processing' | 'future' | 'letters' | null;

const WellbeingWriting: React.FC<WellbeingWritingProps> = ({ onComplete }) => {
  const [selectedPractice, setSelectedPractice] = useState<PracticeType>(null);
  const [content, setContent] = useState('');
  const [privateLock, setPrivateLock] = useState(true);

  const practices = {
    gratitude: {
      title: 'Gratitude Practice',
      icon: '🌟',
      description: 'Notice and appreciate the small joys',
      guidance: 'Research shows regular gratitude practice improves mental health, sleep, and resilience',
      prompts: [
        'Three things I noticed today that brought me comfort or joy...',
        'Someone who made my day easier (even in a small way)...',
        'Something about my body/mind/abilities I\'m grateful for today...',
        'A moment when I felt safe/loved/capable...',
        'One thing I have now that I wished for in the past...'
      ],
      timer: '5-10 minutes',
      frequency: 'Daily or weekly'
    },
    processing: {
      title: 'Emotional Processing',
      icon: '💭',
      description: 'Work through difficult feelings safely on paper',
      guidance: 'Writing helps us make sense of overwhelming emotions without judgment',
      prompts: [
        'The feeling I\'m sitting with right now is... It feels like... because...',
        'If this emotion had a color/texture/temperature, it would be...',
        'What I wish I could say to [person/situation] but can\'t...',
        'The story I tell myself about this situation... Is that true?',
        'What would I tell a friend going through this?'
      ],
      timer: '10-20 minutes',
      frequency: 'As needed'
    },
    future: {
      title: 'Future Self Letters',
      icon: '✉️',
      description: 'Write to who you\'re becoming',
      guidance: 'Envision your future self to build hope and direction',
      prompts: [
        'Dear Future Me (6 months from now), I hope...',
        'The person I\'m becoming is someone who...',
        'One year from now, I want to look back and remember that...',
        'Dear Past Me, what you\'re going through right now...',
        'The life I\'m building, slowly, looks like...'
      ],
      timer: '15-20 minutes',
      frequency: 'Monthly or quarterly'
    },
    letters: {
      title: 'Letters Never Sent',
      icon: '📬',
      description: 'Say what you need to say, safely',
      guidance: 'Writing unsent letters can bring closure and clarity without risk',
      prompts: [
        'Dear [person who hurt you], what I need you to understand...',
        'To the part of me that\'s struggling right now...',
        'Dear Younger Me, I wish I could tell you...',
        'To [someone I\'ve lost], what I never got to say...',
        'Dear [institution/system], what you did to us...'
      ],
      timer: '20-30 minutes',
      frequency: 'As needed, especially during grief/anger'
    }
  };

  const handlePracticeSelect = (practice: PracticeType) => {
    setSelectedPractice(practice);
  };

  const handleBack = () => {
    if (selectedPractice && content) {
      if (window.confirm('This is private writing. Are you sure you want to go back? Your writing will be lost.')) {
        setSelectedPractice(null);
        setContent('');
      }
    } else {
      setSelectedPractice(null);
      setContent('');
      onComplete();
    }
  };

  const handleSave = () => {
    const practiceData = practices[selectedPractice!];
    const timestamp = new Date().toLocaleString();
    const fileContent = `PRIVATE WELLBEING WRITING\n` +
      `Practice: ${practiceData.title}\n` +
      `Date: ${timestamp}\n` +
      `\n---\n\n` +
      content +
      `\n\n---\n\n` +
      `This is your private therapeutic writing. Keep it safe.`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wellbeing-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = content.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Practice Selection
  if (!selectedPractice) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Wellbeing Through Writing</h1>
          <p className={styles.subtitle}>Therapeutic writing for mental health and emotional healing</p>
        </div>

        <div className={styles.safetyNotice}>
          <h3>🔒 Your Privacy & Safety</h3>
          <p>
            <strong>This is a private, judgment-free space.</strong> Your writing is saved locally 
            to your device only. We never see it. This is therapeutic writing—not content for publication.
          </p>
          <p>
            <strong>Crisis support:</strong> If you're in immediate distress, please contact 
            Samaritans (116 123), Crisis Text Line (text SHOUT to 85258), or call 999.
          </p>
        </div>

        <div className={styles.practiceGrid}>
          {Object.entries(practices).map(([key, practice]) => (
            <div
              key={key}
              className={styles.practiceCard}
              onClick={() => handlePracticeSelect(key as PracticeType)}
            >
              <div className={styles.practiceIcon}>{practice.icon}</div>
              <h3 className={styles.practiceTitle}>{practice.title}</h3>
              <p className={styles.practiceDescription}>{practice.description}</p>
              <p className={styles.practiceGuidance}>💡 {practice.guidance}</p>
              <div className={styles.practiceDetails}>
                <span>⏱️ {practice.timer}</span>
                <span>📅 {practice.frequency}</span>
              </div>
              <div className={styles.practiceButton}>Start Practice →</div>
            </div>
          ))}
        </div>

        <div className={styles.resourcesBox}>
          <h3>📚 Wellbeing Resources</h3>
          <div className={styles.resourceLinks}>
            <div className={styles.resourceItem}>
              <strong>Community Support:</strong>
              <p>Connect with others in weekly wellbeing circles (members)</p>
            </div>
            <div className={styles.resourceItem}>
              <strong>Professional Help:</strong>
              <p>We can't replace therapy, but we can support your healing journey alongside it</p>
            </div>
            <div className={styles.resourceItem}>
              <strong>Maya Assistant:</strong>
              <p>Get gentle prompts and encouragement (never medical advice)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Writing Interface
  const practiceData = practices[selectedPractice];
  return (
    <div className={styles.writingContainer}>
      <div className={styles.writingHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Practices
        </button>
        <div className={styles.practiceInfo}>
          <h2 className={styles.currentPractice}>{practiceData.title}</h2>
          <div className={styles.practiceStats}>
            <span>⏱️ Suggested: {practiceData.timer}</span>
            <span>🔒 Private & Safe</span>
          </div>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.privacyBanner}>
          <span className={styles.lockIcon}>🔒</span>
          <span>This writing is private. It stays on your device only.</span>
        </div>

        <div className={styles.promptsSection}>
          <h3>Gentle Prompts (choose one or combine):</h3>
          <div className={styles.promptsList}>
            {practiceData.prompts.map((prompt, index) => (
              <div
                key={index}
                className={styles.promptItem}
                onClick={() => setContent(content + '\n\n' + prompt + '\n')}
              >
                {prompt}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.editorSection}>
          <div className={styles.editorToolbar}>
            <span className={styles.wordCount}>{wordCount} words</span>
            <span className={styles.encouragement}>
              {wordCount === 0 && 'Take your time. Start when ready.'}
              {wordCount > 0 && wordCount < 50 && 'You\'re doing great. Keep going.'}
              {wordCount >= 50 && wordCount < 200 && 'Beautiful. Keep exploring.'}
              {wordCount >= 200 && 'You\'re doing important work.'}
            </span>
          </div>

          <textarea
            className={styles.editor}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely. No judgment. No pressure. This is for you."
            autoFocus
          />

          <div className={styles.editorFooter}>
            <button 
              onClick={handleSave} 
              className={styles.saveButton}
              disabled={wordCount < 10}
            >
              💾 Save Privately to Device
            </button>
            <button onClick={handleBack} className={styles.doneButton}>
              Finish Session
            </button>
          </div>
        </div>

        <div className={styles.aftercareBox}>
          <h4>After Writing 💚</h4>
          <ul>
            <li>Take a few deep breaths</li>
            <li>Notice how you feel—it's okay if it's complicated</li>
            <li>Do something nurturing: water, movement, rest</li>
            <li>If difficult feelings came up, consider talking to someone you trust</li>
            <li>You did something brave. That matters.</li>
          </ul>
        </div>

        <div className={styles.crisisInfo}>
          <strong>Need support right now?</strong>
          <p>Samaritans: 116 123 (free, 24/7)</p>
          <p>Crisis Text Line: Text SHOUT to 85258</p>
          <p>Emergency: 999 or go to A&E</p>
        </div>
      </div>
    </div>
  );
};

export default WellbeingWriting;