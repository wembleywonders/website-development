// src/pages/programmes/pageturners/PageturnersSandbox.tsx
// SIMPLIFIED VERSION - Clean mounting, no complexity
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import StoryStarter from '../../../components/sandboxes/pageturners/StoryStarter';
import CreativeWritingStudio from '../../../components/sandboxes/pageturners/CreativeWritingStudio';
import ScriptWriting from '../../../components/sandboxes/pageturners/ScriptWriting';
import GameDesign from '../../../components/sandboxes/pageturners/GameDesign';
import PublishingPathways from '../../../components/sandboxes/pageturners/PublishingPathways';
import DiasporaNarratives from '../../../components/sandboxes/pageturners/DiasporaNarratives';
import WellbeingWriting from '../../../components/sandboxes/pageturners/WellbeingWriting';
import styles from './PageturnersSandbox.module.css';

type ActivityType = 'story-starter' | 'creative-writing' | 'script-writing' | 'game-design' | 'publishing' | 'diaspora-narratives' | 'wellbeing-writing' | null;

const PageturnersSandbox: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>(null);
  const location = useLocation();

  // Auto-launch from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activity = params.get('activity') as ActivityType;
    
    const validActivities: ActivityType[] = [
      'story-starter',
      'creative-writing',
      'script-writing',
      'game-design',
      'publishing',
      'diaspora-narratives',
      'wellbeing-writing'
    ];
    
    if (activity && validActivities.includes(activity)) {
      setActiveActivity(activity);
    }
  }, [location.search]);

  const handleStartActivity = (activity: ActivityType) => {
    setActiveActivity(activity);
  };

  const handleCloseActivity = () => {
    setActiveActivity(null);
  };

  // RENDER ACTIVE COMPONENT
  if (activeActivity === 'story-starter') {
    return <StoryStarter onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'creative-writing') {
    return <CreativeWritingStudio onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'script-writing') {
    return <ScriptWriting onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'game-design') {
    return <GameDesign onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'publishing') {
    return <PublishingPathways onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'diaspora-narratives') {
    return <DiasporaNarratives onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'wellbeing-writing') {
    return <WellbeingWriting onComplete={handleCloseActivity} />;
  }

  // LANDING PAGE
  return (
    <PageTemplate
      pageTitle="Pageturner's Writer's Workshop Sandbox"
      pageStrapline="Caribbean Voices. Global Stories. Your Platform."
      pageGuide="Try 7 professional writing tools right now - no signup needed. Start with Story Starter to explore 5 Caribbean literary genres."
      showMaya={true}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>
        
        {/* Hero */}
        <section className={styles.heroSection}>
          <h2 className={styles.heroTitle}>
            For Every Writer Told Their Stories Don't Matter
          </h2>
          <p className={styles.heroText}>
            From first draft to published work. <strong>Your voice is unique. Your stories deserve to be told.</strong>
          </p>
        </section>

        {/* Story Starter - Featured */}
        <section className={styles.featured}>
          <div className={styles.featuredCard}>
            <div className={styles.featuredHeader}>
              <span className={styles.featuredIcon}>✨</span>
              <div className={styles.badges}>
                <span className={styles.badgeFree}>Try Free</span>
                <span className={styles.badgeDownloads}>3 Downloads</span>
              </div>
            </div>
            
            <h2>Story Starter</h2>
            <p className={styles.tagline}>5 Caribbean literary genres with authentic prompts</p>
            
            <p>
              Jump into writing with genre-specific prompts rooted in Caribbean oral traditions, 
              diaspora experiences, feminist perspectives, Afrofuturism, and resistance narratives.
            </p>

            <div className={styles.genreList}>
              <h3>What You'll Create:</h3>
              <div className={styles.genres}>
                <div className={styles.genre} onClick={() => handleStartActivity('story-starter')}>
                  <span>🕷️</span>
                  <div>
                    <strong>Caribbean Oral Traditions</strong>
                    <p>Anansi stories, folklore, proverbs</p>
                  </div>
                </div>
                <div className={styles.genre} onClick={() => handleStartActivity('story-starter')}>
                  <span>✈️</span>
                  <div>
                    <strong>Diaspora Writing</strong>
                    <p>Migration, belonging, identity</p>
                  </div>
                </div>
                <div className={styles.genre} onClick={() => handleStartActivity('story-starter')}>
                  <span>👑</span>
                  <div>
                    <strong>Feminist & Womanist</strong>
                    <p>Caribbean women's voices</p>
                  </div>
                </div>
                <div className={styles.genre} onClick={() => handleStartActivity('story-starter')}>
                  <span>🚀</span>
                  <div>
                    <strong>Speculative & Afrofuturism</strong>
                    <p>Caribbean futures, magical realism</p>
                  </div>
                </div>
                <div className={styles.genre} onClick={() => handleStartActivity('story-starter')}>
                  <span>✊</span>
                  <div>
                    <strong>Resistance & Revolution</strong>
                    <p>Anti-colonial narratives, justice</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className={styles.startBtn}
              onClick={() => handleStartActivity('story-starter')}
            >
              Start Writing Now →
            </button>
          </div>
        </section>

        {/* Other Activities */}
        <section className={styles.activities}>
          <h2>More Writing Tools</h2>
          
          <div className={styles.grid}>
            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>✍️</span>
              <h3>Creative Writing Studio</h3>
              <p>Fiction, poetry, memoir, flash fiction</p>
              <button onClick={() => handleStartActivity('creative-writing')}>
                Open Studio
              </button>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🎭</span>
              <h3>Script Writing</h3>
              <p>Stage, screen, and radio scripts</p>
              <button onClick={() => handleStartActivity('script-writing')}>
                Write Scripts
              </button>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🎮</span>
              <h3>Game Design</h3>
              <p>Interactive stories and LARP scenarios</p>
              <button onClick={() => handleStartActivity('game-design')}>
                Design Games
              </button>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>📖</span>
              <h3>Publishing Pathways</h3>
              <p>Submit to Joystick and community press</p>
              <button onClick={() => handleStartActivity('publishing')}>
                Explore Publishing
              </button>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🌍</span>
              <h3>Diaspora Narratives</h3>
              <p>Heritage, identity, and belonging stories</p>
              <button onClick={() => handleStartActivity('diaspora-narratives')}>
                Tell Your Story
              </button>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🧠</span>
              <h3>Wellbeing Writing</h3>
              <p>Therapeutic journaling and healing</p>
              <button onClick={() => handleStartActivity('wellbeing-writing')}>
                Start Healing
              </button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Write?</h2>
          <p>
            Try Story Starter with 3 free downloads, or join as a member for unlimited saves, 
            Maya feedback, and 55% revenue on published work.
          </p>
          <div className={styles.ctaButtons}>
            <button 
              className={styles.ctaPrimary}
              onClick={() => handleStartActivity('story-starter')}
            >
              Start Writing Free
            </button>
            <Link to="/membership" className={styles.ctaSecondary}>
              Join as Member (from £7/month)
            </Link>
          </div>
          <p className={styles.slidingScale}>
            💚 Sliding scale available - pay what you can
          </p>
        </section>

        {/* Back Link */}
        <Link to="/programmes/pageturners" className={styles.backLink}>
          ← Back to Pageturner's Workshop
        </Link>

      </div>
    </PageTemplate>
  );
};

export default PageturnersSandbox;