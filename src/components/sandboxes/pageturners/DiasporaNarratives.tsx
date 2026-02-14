import React, { useState } from 'react';
import styles from './DiasporaNarratives.module.css';

interface DiasporaNarrativesProps {
  onComplete: () => void;
}

type ThemeType = 'migration' | 'heritage' | 'identity' | 'family' | null;

interface ResearchPrompt {
  question: string;
  guidance: string;
}

const DiasporaNarratives: React.FC<DiasporaNarrativesProps> = ({ onComplete }) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [research, setResearch] = useState<{[key: string]: string}>({});
  const [narrative, setNarrative] = useState('');

  const themes = {
    migration: {
      title: 'Migration Stories',
      icon: '✈️',
      description: 'The journey from there to here - crossing oceans and borders',
      context: 'Windrush generation, post-independence migration, refugee experiences, contemporary diaspora',
      prompts: [
        {
          question: 'When did your family/you come to the UK? What year, what circumstances?',
          guidance: 'Be specific: seasons, ages, reasons. "1963, after independence" tells more than "a long time ago"'
        },
        {
          question: 'What did they/you bring? What had to be left behind?',
          guidance: 'Physical objects AND intangibles: recipes, songs, customs, dreams'
        },
        {
          question: 'What was the first shock? The first comfort?',
          guidance: 'Cold weather, food differences, racism, kindness from strangers - the specific details matter'
        },
        {
          question: 'How has the story changed over time? What gets emphasized, what gets left out?',
          guidance: 'Family stories evolve. What version did you grow up with? What did you learn later?'
        }
      ]
    },
    heritage: {
      title: 'Cultural Heritage',
      icon: '🏝️',
      description: 'Preserving and celebrating where we come from',
      context: 'Islands, languages, traditions, foods, music, spiritual practices',
      prompts: [
        {
          question: 'Which island(s)/country are your family from? What do you know about that place?',
          guidance: 'Not just name - geography, history, dialect, what it\'s known for'
        },
        {
          question: 'What traditions/customs did your family maintain? Which faded away?',
          guidance: 'Christmas traditions, language use at home, food preparation, religious practices'
        },
        {
          question: 'What Caribbean words/phrases do you still use? What do they mean?',
          guidance: 'Patois, Creole expressions, words your English friends don\'t understand'
        },
        {
          question: 'If you could ask your ancestors one question, what would it be?',
          guidance: 'What do you wish you knew? What stories were never passed down?'
        }
      ]
    },
    identity: {
      title: 'Identity & Belonging',
      icon: '🔍',
      description: 'Navigating between worlds, hybrid identities',
      context: 'British-Caribbean, second/third generation, code-switching, reclaiming heritage',
      prompts: [
        {
          question: 'When do you feel most Caribbean? When do you feel most British?',
          guidance: 'Specific moments: Carnival, vs. applying for jobs, speaking patois vs. "phone voice"'
        },
        {
          question: 'What did older generations say about "back home" vs. what you discovered yourself?',
          guidance: 'Myths, idealizations, hard truths. How did first visits change your understanding?'
        },
        {
          question: 'How do you explain your identity to people who don\'t share it?',
          guidance: 'The exhausting work of explaining. The moments you stopped trying.'
        },
        {
          question: 'What do you want the next generation to know/keep/remember?',
          guidance: 'What needs to survive? What stories must be told?'
        }
      ]
    },
    family: {
      title: 'Family Stories',
      icon: '👨‍👩‍👧‍👦',
      description: 'Documenting the people who shaped us',
      context: 'Matriarchs, rebels, quiet heroes, complicated legacies',
      prompts: [
        {
          question: 'Who is the family storyteller? What stories do they tell?',
          guidance: 'The aunt who remembers everything, the uncle who embellishes, the grandmother who stays quiet'
        },
        {
          question: 'Describe a family gathering. Who talks loudest? Who listens? What gets argued about?',
          guidance: 'Christenings, funerals, Sunday dinners - where family dynamics reveal themselves'
        },
        {
          question: 'What family secrets came out? How did you find out?',
          guidance: 'The things children weren\'t supposed to know. Half-siblings, first families, trauma.'
        },
        {
          question: 'Write about hands. Whose hands do you remember and why?',
          guidance: 'Grandmother\'s hands cooking, father\'s hands working, mother\'s hands braiding hair'
        }
      ]
    }
  };

  const handleThemeSelect = (theme: ThemeType) => {
    setSelectedTheme(theme);
  };

  const handleBack = () => {
    if (selectedTheme) {
      if (window.confirm('Are you sure? Your work will be lost.')) {
        setSelectedTheme(null);
        setStoryTitle('');
        setResearch({});
        setNarrative('');
      }
    } else {
      onComplete();
    }
  };

  const updateResearch = (question: string, answer: string) => {
    setResearch(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleExport = () => {
    const themeData = themes[selectedTheme!];
    const content = `# ${storyTitle || 'Untitled Diaspora Story'}\n\n` +
      `Theme: ${themeData.title}\n\n` +
      `## Research & Reflection\n\n` +
      themeData.prompts.map(prompt => {
        const answer = research[prompt.question] || '[Not answered]';
        return `**${prompt.question}**\n\n${answer}\n`;
      }).join('\n---\n\n') +
      `\n## Narrative\n\n${narrative}\n\n` +
      `---\n\n` +
      `This is your diaspora story. It matters. It deserves to be told.\n` +
      `Consider submitting to Joystick e-zine or community anthologies.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diaspora-${(storyTitle || 'story').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = narrative.trim().split(/\s+/).filter(w => w.length > 0).length;

  // Theme Selection
  if (!selectedTheme) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Diaspora Narratives</h1>
          <p className={styles.subtitle}>Honor our heritage, document our journeys, preserve our stories</p>
        </div>

        <div className={styles.themeGrid}>
          {Object.entries(themes).map(([key, theme]) => (
            <div
              key={key}
              className={styles.themeCard}
              onClick={() => handleThemeSelect(key as ThemeType)}
            >
              <div className={styles.themeIcon}>{theme.icon}</div>
              <h3 className={styles.themeTitle}>{theme.title}</h3>
              <p className={styles.themeDescription}>{theme.description}</p>
              <p className={styles.themeContext}>Focus: {theme.context}</p>
              <div className={styles.themeButton}>Start Exploring →</div>
            </div>
          ))}
        </div>

        <div className={styles.missionBox}>
          <h3>📜 Why These Stories Matter</h3>
          <p>
            Caribbean diaspora stories are often reduced to soundbites: "Windrush generation" or 
            "immigration crisis." But our stories are complex, multigenerational, full of joy AND pain, 
            resistance AND resilience.
          </p>
          <p>
            <strong>These narratives are archive.</strong> When we document our families' journeys, 
            preserve our languages, question our identities—we create historical record that no 
            institution can erase.
          </p>
          <p>
            Write for yourself. Write for your children. Write for the ancestors who couldn't tell 
            their own stories.
          </p>
        </div>
      </div>
    );
  }

  // Research & Writing Interface
  const themeData = themes[selectedTheme];
  return (
    <div className={styles.workContainer}>
      <div className={styles.workHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Themes
        </button>
        <div className={styles.themeInfo}>
          <input
            type="text"
            className={styles.titleInput}
            placeholder="Story Title (optional)"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
          />
          <p className={styles.currentTheme}>{themeData.title} - {themeData.description}</p>
        </div>
      </div>

      <div className={styles.workLayout}>
        {/* Research Sidebar */}
        <div className={styles.researchPanel}>
          <h3 className={styles.panelTitle}>Research Questions</h3>
          <p className={styles.panelIntro}>
            Answer these questions to gather material for your story. You don't need to answer 
            all of them—focus on what resonates.
          </p>

          {themeData.prompts.map((prompt, index) => (
            <div key={index} className={styles.researchItem}>
              <div className={styles.questionNumber}>{index + 1}</div>
              <div className={styles.questionContent}>
                <p className={styles.question}>{prompt.question}</p>
                <p className={styles.guidance}>💡 {prompt.guidance}</p>
                <textarea
                  className={styles.researchInput}
                  placeholder="Your thoughts, memories, research..."
                  value={research[prompt.question] || ''}
                  onChange={(e) => updateResearch(prompt.question, e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Writing Panel */}
        <div className={styles.writingPanel}>
          <div className={styles.writingHeader}>
            <h3>Your Narrative</h3>
            <span className={styles.wordCount}>{wordCount} words</span>
          </div>

          <p className={styles.writingGuidance}>
            Use your research to craft your story. You can write in any form: essay, poem, 
            dialogue, letter to ancestors, narrative non-fiction.
          </p>

          <textarea
            className={styles.narrativeArea}
            placeholder="Write your diaspora story here... Let the research guide you, but write in your own voice."
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
          />

          <div className={styles.writingFooter}>
            <button 
              onClick={handleExport} 
              className={styles.exportButton}
              disabled={!narrative && Object.keys(research).length === 0}
            >
              💾 Save Story
            </button>
            <button onClick={onComplete} className={styles.doneButton}>
              Save & Continue →
            </button>
          </div>

          <div className={styles.resourcesBox}>
            <h4>📚 Additional Resources:</h4>
            <ul>
              <li>Community archive access (members)</li>
              <li>Family tree templates</li>
              <li>Historical context documents</li>
              <li>Interview question guides</li>
              <li>Oral history best practices</li>
            </ul>
            <p><strong>Members:</strong> Access full archive and submit to preservation project!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiasporaNarratives;