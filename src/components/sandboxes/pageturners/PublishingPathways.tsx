import React, { useState } from 'react';
import styles from './PublishingPathways.module.css';

interface PublishingPathwaysProps {
  onComplete: () => void;
}

type PathwayType = 'joystick' | 'anthology' | 'zine' | null;

interface SubmissionData {
  title: string;
  author: string;
  wordCount: number;
  genre: string;
  content: string;
  bio: string;
}

const PublishingPathways: React.FC<PublishingPathwaysProps> = ({ onComplete }) => {
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>(null);
  const [submission, setSubmission] = useState<SubmissionData>({
    title: '',
    author: '',
    wordCount: 0,
    genre: '',
    content: '',
    bio: ''
  });

  const pathways = {
    joystick: {
      title: 'Joystick E-Zine',
      icon: '🕹️',
      description: 'Submit your work to our monthly digital magazine',
      details: 'Monthly themed issues featuring community voices',
      guidelines: [
        'Fiction: 500-3,000 words',
        'Poetry: Up to 5 poems or 200 lines',
        'Essays/Articles: 800-2,500 words',
        'Accepts: Caribbean narratives, gaming culture, tech stories, creative non-fiction',
        'Payment: 55% revenue share on digital sales'
      ],
      deadline: 'Rolling submissions - reviewed monthly'
    },
    anthology: {
      title: 'Community Anthology',
      icon: '📚',
      description: 'Contribute to our quarterly print collections',
      details: 'Themed anthologies published 4 times per year',
      guidelines: [
        'Short stories: 1,500-5,000 words',
        'Poetry: 3-10 poems per submission',
        'Creative non-fiction: 2,000-4,000 words',
        'Each anthology has a theme - check current calls',
        'Payment: 55% revenue share on print/digital sales',
        'Contributors receive 2 free copies'
      ],
      deadline: 'Quarterly - see current call for submissions'
    },
    zine: {
      title: 'DIY Zine Publishing',
      icon: '✂️',
      description: 'Create your own zine with community support',
      details: 'Design, print, and distribute your own publication',
      guidelines: [
        'Full creative control over content and design',
        'Access to community printing resources',
        'Workshop support for layout and design',
        'Distribution through Wembley Wonders network',
        'Keep 100% of sales revenue',
        'Optional: Sell through our Cyberstore (85% to creator, 15% platform fee)'
      ],
      deadline: 'Self-published on your schedule'
    }
  };

  const genres = [
    'Fiction - Caribbean Voices',
    'Fiction - Speculative/Afrofuturism',
    'Fiction - Diaspora Stories',
    'Poetry - Any Style',
    'Creative Non-Fiction',
    'Personal Essay/Memoir',
    'Cultural Commentary',
    'Gaming/Tech Writing',
    'Other (specify in bio)'
  ];

  const handlePathwaySelect = (pathway: PathwayType) => {
    setSelectedPathway(pathway);
  };

  const handleBack = () => {
    if (selectedPathway) {
      if (window.confirm('Are you sure? Your draft will be lost.')) {
        setSelectedPathway(null);
        setSubmission({
          title: '',
          author: '',
          wordCount: 0,
          genre: '',
          content: '',
          bio: ''
        });
      }
    } else {
      onComplete();
    }
  };

  const updateField = (field: keyof SubmissionData, value: string) => {
    setSubmission(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'content' ? {
        wordCount: value.trim().split(/\s+/).filter(w => w.length > 0).length
      } : {})
    }));
  };

  const handleExport = () => {
    const pathwayData = pathways[selectedPathway!];
    const content = `SUBMISSION TO: ${pathwayData.title}\n\n` +
      `Title: ${submission.title}\n` +
      `Author: ${submission.author}\n` +
      `Genre: ${submission.genre}\n` +
      `Word Count: ${submission.wordCount}\n\n` +
      `AUTHOR BIO:\n${submission.bio}\n\n` +
      `---\n\n` +
      `${submission.content}\n\n` +
      `---\n\n` +
      `Submission Guidelines:\n${pathwayData.guidelines.join('\n')}\n\n` +
      `This is a draft. For actual submission, visit Wembley Wonders members portal.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submission-${submission.title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isComplete = submission.title && submission.author && submission.genre && 
                     submission.content && submission.bio && submission.wordCount > 100;

  // Pathway Selection
  if (!selectedPathway) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={onComplete} className={styles.backButton}>
            ← Back to Sandbox
          </button>
          <h1 className={styles.title}>Publishing Pathways</h1>
          <p className={styles.subtitle}>Get your work published and earn 55% revenue share</p>
        </div>

        <div className={styles.pathwayGrid}>
          {Object.entries(pathways).map(([key, pathway]) => (
            <div
              key={key}
              className={styles.pathwayCard}
              onClick={() => handlePathwaySelect(key as PathwayType)}
            >
              <div className={styles.pathwayIcon}>{pathway.icon}</div>
              <h3 className={styles.pathwayTitle}>{pathway.title}</h3>
              <p className={styles.pathwayDescription}>{pathway.description}</p>
              <p className={styles.pathwayDetails}>{pathway.details}</p>
              <div className={styles.pathwayButton}>Learn More →</div>
            </div>
          ))}
        </div>

        <div className={styles.revenueInfo}>
          <h3>💰 Fair Revenue Sharing</h3>
          <div className={styles.revenueBreakdown}>
            <div className={styles.revenueItem}>
              <span className={styles.percentage}>55%</span>
              <span className={styles.label}>To You (Creator)</span>
            </div>
            <div className={styles.revenueItem}>
              <span className={styles.percentage}>25%</span>
              <span className={styles.label}>Community Development Fund</span>
            </div>
            <div className={styles.revenueItem}>
              <span className={styles.percentage}>20%</span>
              <span className={styles.label}>Platform Operations</span>
            </div>
          </div>
          <p className={styles.revenueNote}>
            As a Community Interest Company, we're legally bound to prioritize community benefit. 
            Your work builds wealth for yourself AND the community.
          </p>
        </div>
      </div>
    );
  }

  // Submission Form
  const pathwayData = pathways[selectedPathway];
  return (
    <div className={styles.submissionContainer}>
      <div className={styles.submissionHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Pathways
        </button>
        <div className={styles.pathwayInfo}>
          <h2 className={styles.currentPathway}>{pathwayData.title}</h2>
          <p className={styles.currentDetails}>{pathwayData.details}</p>
        </div>
      </div>

      <div className={styles.formLayout}>
        {/* Guidelines Sidebar */}
        <div className={styles.guidelinesSidebar}>
          <h3>📋 Submission Guidelines</h3>
          <ul className={styles.guidelinesList}>
            {pathwayData.guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
          <div className={styles.deadlineBox}>
            <strong>Deadline:</strong>
            <p>{pathwayData.deadline}</p>
          </div>
        </div>

        {/* Submission Form */}
        <div className={styles.submissionForm}>
          <div className={styles.formSection}>
            <label className={styles.label}>Work Title *</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Title of your piece"
              value={submission.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formSection}>
              <label className={styles.label}>Author Name *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Your name or pen name"
                value={submission.author}
                onChange={(e) => updateField('author', e.target.value)}
              />
            </div>

            <div className={styles.formSection}>
              <label className={styles.label}>Genre *</label>
              <select
                className={styles.select}
                value={submission.genre}
                onChange={(e) => updateField('genre', e.target.value)}
              >
                <option value="">Select genre...</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formSection}>
            <label className={styles.label}>
              Your Work * 
              <span className={styles.wordCount}>
                {submission.wordCount} words
              </span>
            </label>
            <textarea
              className={styles.contentArea}
              placeholder="Paste or write your work here..."
              value={submission.content}
              onChange={(e) => updateField('content', e.target.value)}
              rows={15}
            />
          </div>

          <div className={styles.formSection}>
            <label className={styles.label}>Author Bio * (50-150 words)</label>
            <textarea
              className={styles.bioArea}
              placeholder="Brief bio about you and your writing..."
              value={submission.bio}
              onChange={(e) => updateField('bio', e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.formFooter}>
            <button 
              onClick={handleExport} 
              className={styles.exportButton}
              disabled={!isComplete}
            >
              💾 Save Draft ({isComplete ? 'Ready' : 'Fill all fields'})
            </button>
            <button onClick={onComplete} className={styles.doneButton}>
              Save & Continue →
            </button>
          </div>

          <div className={styles.nextSteps}>
            <h4>📬 Next Steps:</h4>
            <ol>
              <li>Save your draft using the button above</li>
              <li>Review and polish your work</li>
              <li><strong>Members:</strong> Submit through the members portal</li>
              <li><strong>Non-members:</strong> Email submissions@wembleywonders.org</li>
              <li>Editors review within 2-4 weeks</li>
              <li>If accepted, earn 55% of revenue!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingPathways;