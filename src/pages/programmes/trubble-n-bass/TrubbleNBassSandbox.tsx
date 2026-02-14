// src/pages/programmes/trubble-n-bass/TrubbleNBassSandbox.tsx
// COMPLETE CREATOR'S WORKSHOP - Beat Maker, Sample Explorer, Songwriting Workshop

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import TrubbleNBassBuilder from '../../../components/sandboxes/trubble-n-bass/TrubbleNBassBuilder';
import TrubbleNBassPro from '../../../components/sandboxes/trubble-n-bass/TrubbleNBassPro';
import SampleExplorer from '../../../components/sandboxes/trubble-n-bass/SampleExplorer';
import SongwritingWorkshop from '../../../components/sandboxes/trubble-n-bass/SongwritingWorkshop';
import styles from './TrubbleNBassSandbox.module.css';

type ActivityType = 'beat-maker' | 'songwriting' | 'sample-explorer' | null;

const TrubbleNBassSandbox: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>(null);
  const location = useLocation();

const TrubbleNBassSandbox = () => {
  return <TrubbleNBassPro />;
};

  // Auto-launch from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const activity = params.get('activity') as ActivityType;

    const validActivities: ActivityType[] = ['beat-maker', 'songwriting', 'sample-explorer'];

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

  // RENDER ACTIVE COMPONENTS
  const TrubbleNBassBuilderComponent = TrubbleNBassBuilder as React.ComponentType<any>;

  if (activeActivity === 'beat-maker') {
    return <TrubbleNBassBuilderComponent onComplete={handleCloseActivity} />;
  }

  if (activeActivity === 'sample-explorer') {
    return (
      <SampleExplorer
      onClose={handleCloseActivity}
      onSelectSound={(category: string, subcategory: string) => {
        console.log(`Selected sound: ${category} > ${subcategory}`);
      }}
      onSelectMood={(mood: Mood) => {
        console.log(`Selected mood: ${mood.name}`);
      }}
      onSelectGenre={(genre: Genre) => {
        console.log(`Selected genre: ${genre.name}`);
      }}
      onSelectTemplate={(template: Template) => {
        console.log(`Selected template: ${template.name}`);
      }}
      />
    );

  interface Mood {
    name: string;
    [key: string]: any;
  }

  interface Genre {
    name: string;
    [key: string]: any;
  }

  interface Template {
    name: string;
    [key: string]: any;
  }
  }

  if (activeActivity === 'songwriting') {
    return <SongwritingWorkshop onClose={handleCloseActivity} />;
  }

  // LANDING PAGE - CREATOR'S WORKSHOP
  return (
    <PageTemplate
      pageTitle="Trubble n Bass Creator's Workshop"
      pageStrapline="From Idea to Release. Write. Produce. Perform."
      pageGuide="Complete creative toolkit: songwriting, music production, and sound design. Professional tools with cultural heritage at the core."
      showMaya={true}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>

        {/* Hero */}
        <section className={styles.heroSection}>
          <h2 className={styles.heroTitle}>
            The Complete Creator's Journey
          </h2>
          <p className={styles.heroText}>
            From the melody in your head to the track in your hands.
            <strong> Write songs. Build beats. Find your sound. </strong>
            Everything you need to go from listener to creator.
          </p>
        </section>

        {/* Three Core Tools */}
        <section className={styles.coreTools}>
          <h2>🎨 Your Creative Toolkit</h2>
          
          <div className={styles.toolsGrid}>
            {/* Songwriting Workshop - NEW FLAGSHIP */}
            <div className={`${styles.toolCard} ${styles.toolFlagship}`}>
              <div className={styles.toolHeader}>
                <span className={styles.toolIcon}>🎤</span>
                <span className={styles.newBadge}>NEW!</span>
              </div>
              <h3>Songwriting Workshop</h3>
              <p className={styles.toolDesc}>
                Write songs from scratch. Chord progressions, melodies, song structures, 
                and lyrics - all the tools you need to turn ideas into complete songs.
              </p>
              <ul className={styles.toolFeatures}>
                <li>🎸 <strong>Chord Builder</strong> - 20+ progressions by genre & culture</li>
                <li>🎵 <strong>Melody Workshop</strong> - Scales, patterns, singable hooks</li>
                <li>🏗️ <strong>Structure Builder</strong> - Verse, chorus, bridge templates</li>
                <li>✍️ <strong>Lyric Lab</strong> - Rhyme finder, prompts, syllable counter</li>
              </ul>
              <button 
                className={styles.toolBtn}
                onClick={() => handleStartActivity('songwriting')}
              >
                Start Writing →
              </button>
            </div>

            {/* Beat Maker */}
            <div className={styles.toolCard}>
              <div className={styles.toolHeader}>
                <span className={styles.toolIcon}>🎵</span>
                <div className={styles.badges}>
                  <span className={styles.badgeFree}>Try Free</span>
                </div>
              </div>
              <h3>Beat Maker Studio</h3>
              <p className={styles.toolDesc}>
                Professional music production with keyboard, drum pads, 
                8-track sequencer, and full mixing tools.
              </p>
              <ul className={styles.toolFeatures}>
                <li>🎹 Playable keyboard with scale lock</li>
                <li>🥁 16 MPC-style drum pads</li>
                <li>🎚️ 8-track sequencer with mixing</li>
                <li>📻 Rayd-yo broadcast templates</li>
              </ul>
              <button 
                className={styles.toolBtn}
                onClick={() => handleStartActivity('beat-maker')}
              >
                Make Beats →
              </button>
            </div>

            {/* Sample Explorer */}
            <div className={styles.toolCard}>
              <div className={styles.toolHeader}>
                <span className={styles.toolIcon}>🎧</span>
              </div>
              <h3>Sample Explorer</h3>
              <p className={styles.toolDesc}>
                Browse 150+ sound effects, 22 moods, 9 genres, and 
                production templates for radio and podcasts.
              </p>
              <ul className={styles.toolFeatures}>
                <li>🔊 Sound effects library (20 categories)</li>
                <li>🎭 Mood selector for emotional tone</li>
                <li>🎵 Genre picker with BPM guides</li>
                <li>📻 Rayd-yo jingles & soundbeds</li>
              </ul>
              <button 
                className={styles.toolBtn}
                onClick={() => handleStartActivity('sample-explorer')}
              >
                Explore Sounds →
              </button>
            </div>
          </div>
        </section>

        {/* Cultural Heritage */}
        <section className={styles.heritageSection}>
          <h3>🌍 Music Creation Rooted in Heritage</h3>
          <div className={styles.heritageGrid}>
            <div className={styles.heritageCard}>
              <span className={styles.heritageIcon}>🥁</span>
              <h4>African Traditions</h4>
              <p>Polyrhythm, call & response, drumming as communication, highlife grooves</p>
            </div>
            <div className={styles.heritageCard}>
              <span className={styles.heritageIcon}>🇯🇲</span>
              <h4>Caribbean Sounds</h4>
              <p>Reggae one-drop, dancehall bounce, calypso, lovers rock, soca energy</p>
            </div>
            <div className={styles.heritageCard}>
              <span className={styles.heritageIcon}>🇬🇧</span>
              <h4>UK Innovations</h4>
              <p>Garage swing, grime tension, drill darkness, jungle bass, sound system culture</p>
            </div>
            <div className={styles.heritageCard}>
              <span className={styles.heritageIcon}>⛪</span>
              <h4>Gospel & Soul</h4>
              <p>Church harmonies, neo-soul smoothness, Hammond grooves, spiritual uplift</p>
            </div>
          </div>
        </section>

        {/* The Creator's Journey */}
        <section className={styles.journey}>
          <h2>📍 The Creator's Journey</h2>
          <div className={styles.journeySteps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <h4>Write</h4>
              <p>Start in the <strong>Songwriting Workshop</strong>. Find your chords, build your melody, write your lyrics.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <h4>Produce</h4>
              <p>Take it to the <strong>Beat Maker Studio</strong>. Layer drums, add keyboards, arrange your track.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <h4>Polish</h4>
              <p>Use the <strong>Sample Explorer</strong> for sound effects, atmospheres, and finishing touches.</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <span className={styles.stepNum}>4</span>
              <h4>Release</h4>
              <p>Export your track. Share on <strong>Rayd-yo</strong>. Sell on the <strong>Cyberstore</strong>. 55% is yours.</p>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className={styles.story}>
          <h2>Why This Matters</h2>
          <div className={styles.storyContent}>
            <p>
              <strong>Glen McKenzie</strong> spent 20+ years as a professional DJ. He knew how to 
              move a crowd but never produced his own tracks. Like many DJs, he had melodies 
              in his head but no tools to get them out.
            </p>
            <p>
              <strong>The Trubble n Bass Creator's Workshop exists because talent shouldn't be wasted.</strong> 
              Your DJ instincts, your cultural knowledge, your feel for rhythm - these ARE songwriting skills. 
              These ARE production skills. You just need the right tools and the right guidance.
            </p>
            <p>
              Start with a chord progression. Build a melody. Write your lyrics. Add drums. 
              Mix your track. Release it to the world. <strong>55% of every sale goes to you.</strong>
            </p>
          </div>
        </section>

        {/* Quick Access */}
        <section className={styles.quickAccess}>
          <h2>Jump Straight In</h2>
          <div className={styles.quickGrid}>
            <button onClick={() => handleStartActivity('songwriting')}>
              🎤 Write a Song
            </button>
            <button onClick={() => handleStartActivity('beat-maker')}>
              🥁 Make a Beat
            </button>
            <button onClick={() => handleStartActivity('sample-explorer')}>
              🎧 Find Sounds
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Create?</h2>
          <p>
            Try all tools free with 3 downloads. Join as a member for unlimited saves,
            advanced features, and 55% revenue on Cyberstore sales.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.ctaPrimary}
              onClick={() => handleStartActivity('songwriting')}
            >
              Start with Songwriting
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
        <Link to="/programmes/trubble-n-bass" className={styles.backLink}>
          ← Back to Trubble n Bass Programme
        </Link>

      </div>
    </PageTemplate>
  );
};

export default TrubbleNBassSandbox;