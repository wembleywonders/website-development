import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import ProductionPlannerV2 from '../../../components/sandboxes/kaywanas-court/ProductionPlannerV2';
import styles from './KaywanasCourtSandbox.module.css';

type ActivityType = 
  | 'planner' 
  | 'heritage-performance' 
  | 'oral-tradition' 
  | 'heritage-script'
  | 'intergenerational'
  | 'dinner-theatre'
  | 'sound-mixing' 
  | 'lighting-design' 
  | 'stage-tech' 
  | 'broadcast-control' 
  | 'recording-setup' 
  | 'tech-troubleshoot' 
  | null;

// ========================================
// HERITAGE PERFORMANCE BUILDER COMPONENT
// ========================================

interface HeritageTradition {
  id: string;
  name: string;
  region: string;
  flag: string;
  description: string;
  keyElements: string[];
  languageOptions: string[];
  audienceSize: string;
  suggestedVenue: string;
}

const HERITAGE_TRADITIONS: HeritageTradition[] = [
  {
    id: 'yard-theatre',
    name: 'Yard Theatre',
    region: 'Jamaica / Caribbean',
    flag: '🇯🇲',
    description: 'Intimate community theatre in non-traditional spaces. Audience and performers share the same level. Breaking the fourth wall is expected.',
    keyElements: ['Audience participation', 'Call and response', 'Improvisation welcome', 'Community space setting'],
    languageOptions: ['Jamaican Patois', 'Standard English', 'Code-switching'],
    audienceSize: '20-50 people',
    suggestedVenue: 'Community hall, church hall, actual yard'
  },
  {
    id: 'dub-poetry',
    name: 'Dub Poetry',
    region: 'Jamaica / UK',
    flag: '🎤',
    description: 'Word, sound, and power. Poetry performed to rhythm, often with live or recorded music. Political, personal, powerful.',
    keyElements: ['Rhythm and beat', 'Patois language', 'Political content', 'Live music backing'],
    languageOptions: ['Jamaican Patois', 'Nation Language', 'Mixed registers'],
    audienceSize: '30-200 people',
    suggestedVenue: 'Music venue, theatre, community centre'
  },
  {
    id: 'griot',
    name: 'Griot Storytelling',
    region: 'West Africa',
    flag: '🌍',
    description: 'The West African tradition of the griot—keeper of history, genealogy, and wisdom. One storyteller commands the room through narrative mastery.',
    keyElements: ['Solo performer', 'Genealogy/history', 'Proverbs and wisdom', 'Kora or other instrument'],
    languageOptions: ['Twi', 'Yoruba', 'English with heritage phrases', 'Multilingual'],
    audienceSize: '20-100 people',
    suggestedVenue: 'Intimate theatre, community gathering, library'
  },
  {
    id: 'calypso-tent',
    name: 'Calypso Tent',
    region: 'Trinidad & Tobago',
    flag: '🇹🇹',
    description: 'Social commentary through song. Wit, metaphor, and melody speaking truth to power. Extempo battles and picong exchanges.',
    keyElements: ['Calypso music', 'Social/political commentary', 'Competition element', 'Audience voting'],
    languageOptions: ['Trinidadian Creole', 'Standard English', 'Calypso slang'],
    audienceSize: '50-300 people',
    suggestedVenue: 'Large hall, outdoor tent, festival stage'
  },
  {
    id: 'jamaican-panto',
    name: 'Jamaican Pantomime',
    region: 'Jamaica',
    flag: '🇯🇲',
    description: 'Not British panto—Jamaican pantomime. Folk tales, music, dance, social satire. The Little Theatre Movement tradition.',
    keyElements: ['Folk tales (often Anansi)', 'Original music', 'Dance integration', 'Social satire'],
    languageOptions: ['Jamaican Patois', 'Standard English', 'Song in either'],
    audienceSize: '100-500 people',
    suggestedVenue: 'Theatre, large community hall'
  },
  {
    id: 'concert-party',
    name: 'Concert Party',
    region: 'Ghana',
    flag: '🇬🇭',
    description: 'Popular theatre mixing comedy, music, dance, and moral instruction. Accessible, entertaining theatre for everyday concerns.',
    keyElements: ['Comedy sketches', 'Musical numbers', 'Moral lessons', 'Audience interaction'],
    languageOptions: ['Twi', 'Ga', 'Pidgin', 'English'],
    audienceSize: '50-200 people',
    suggestedVenue: 'Community hall, outdoor stage'
  },
  {
    id: 'masquerade',
    name: 'Masquerade Performance',
    region: 'West Africa / Caribbean',
    flag: '🎭',
    description: 'Masked performance tradition—transformation, spirit embodiment, community ritual. Costume as theatrical technology.',
    keyElements: ['Elaborate masks/costumes', 'Character transformation', 'Ritual elements', 'Music and drumming'],
    languageOptions: ['Minimal dialogue', 'Heritage language chants', 'Drumming communication'],
    audienceSize: '50-500 people',
    suggestedVenue: 'Outdoor space, large hall, festival'
  },
  {
    id: 'dinner-theatre',
    name: 'Dinner Theatre',
    region: 'Wembley Wonders Original',
    flag: '🍲',
    description: 'Performance + meal from Auntie Anansi\'s Kitchen. Food and story intertwined. Theatre you can taste.',
    keyElements: ['Multi-course meal', 'Intimate staging', 'Food matches story', 'Q&A with cooks'],
    languageOptions: ['Any heritage language', 'Multilingual welcome', 'Food names in original'],
    audienceSize: '30-60 people',
    suggestedVenue: 'Venue with kitchen access, community hall'
  }
];

const HeritagePerformanceBuilder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedTradition, setSelectedTradition] = useState<HeritageTradition | null>(null);
  const [performanceDetails, setPerformanceDetails] = useState({
    title: '',
    language: '',
    theme: '',
    duration: '30',
    audienceType: 'mixed',
    elderInvolvement: false,
    notes: ''
  });
  const [step, setStep] = useState(1);

  const handleDownload = () => {
    if (!selectedTradition) return;
    
    const content = `
HERITAGE PERFORMANCE CONCEPT
============================
Generated by Kaywana's Court Sandbox

TRADITION: ${selectedTradition.name}
REGION: ${selectedTradition.region}

PERFORMANCE DETAILS
-------------------
Title: ${performanceDetails.title || '[Untitled]'}
Primary Language: ${performanceDetails.language || 'Not specified'}
Theme: ${performanceDetails.theme || 'Not specified'}
Duration: ${performanceDetails.duration} minutes
Audience Type: ${performanceDetails.audienceType}
Elder Involvement: ${performanceDetails.elderInvolvement ? 'Yes' : 'No'}

TRADITION ELEMENTS TO INCLUDE
-----------------------------
${selectedTradition.keyElements.map(el => `• ${el}`).join('\n')}

LANGUAGE OPTIONS
----------------
${selectedTradition.languageOptions.join(', ')}

SUGGESTED VENUE
---------------
${selectedTradition.suggestedVenue}
Audience Size: ${selectedTradition.audienceSize}

NOTES
-----
${performanceDetails.notes || 'None'}

============================
Ready to make this real? Join Wembley Wonders.
kaywanas-court@wembleywonders.org
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heritage-performance-${selectedTradition.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.heritageBuilder}>
      <div className={styles.builderHeader}>
        <h2>🎭 Heritage Performance Builder</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      {step === 1 && (
        <div className={styles.step}>
          <h3>Step 1: Choose Your Tradition</h3>
          <p>Select a performance tradition to explore. Each carries centuries of wisdom about how to connect with audiences.</p>
          
          <div className={styles.traditionGrid}>
            {HERITAGE_TRADITIONS.map(tradition => (
              <div 
                key={tradition.id}
                className={`${styles.traditionCard} ${selectedTradition?.id === tradition.id ? styles.selected : ''}`}
                onClick={() => setSelectedTradition(tradition)}
              >
                <span className={styles.traditionFlag}>{tradition.flag}</span>
                <h4>{tradition.name}</h4>
                <p className={styles.traditionRegion}>{tradition.region}</p>
                <p className={styles.traditionDesc}>{tradition.description}</p>
              </div>
            ))}
          </div>

          {selectedTradition && (
            <button className={styles.nextButton} onClick={() => setStep(2)}>
              Continue with {selectedTradition.name} →
            </button>
          )}
        </div>
      )}

      {step === 2 && selectedTradition && (
        <div className={styles.step}>
          <h3>Step 2: Define Your Performance</h3>
          <p>Shape your concept within the {selectedTradition.name} tradition.</p>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Performance Title</label>
              <input 
                type="text"
                placeholder="What's your show called?"
                value={performanceDetails.title}
                onChange={(e) => setPerformanceDetails({...performanceDetails, title: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Primary Language</label>
              <select 
                value={performanceDetails.language}
                onChange={(e) => setPerformanceDetails({...performanceDetails, language: e.target.value})}
              >
                <option value="">Select language...</option>
                {selectedTradition.languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
                <option value="other">Other heritage language</option>
              </select>
              <p className={styles.formHint}>
                Heritage language performances include programme notes for mixed audiences
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>Theme / Story</label>
              <input 
                type="text"
                placeholder="What's the story or theme?"
                value={performanceDetails.theme}
                onChange={(e) => setPerformanceDetails({...performanceDetails, theme: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Duration (minutes)</label>
              <select 
                value={performanceDetails.duration}
                onChange={(e) => setPerformanceDetails({...performanceDetails, duration: e.target.value})}
              >
                <option value="15">15 minutes (short)</option>
                <option value="30">30 minutes (standard)</option>
                <option value="45">45 minutes (extended)</option>
                <option value="60">60 minutes (full show)</option>
                <option value="90">90 minutes (with interval)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Target Audience</label>
              <select 
                value={performanceDetails.audienceType}
                onChange={(e) => setPerformanceDetails({...performanceDetails, audienceType: e.target.value})}
              >
                <option value="mixed">Mixed community audience</option>
                <option value="family">Family-friendly (all ages)</option>
                <option value="adult">Adult themes</option>
                <option value="heritage-speakers">Heritage language speakers</option>
                <option value="youth">Youth focus</option>
                <option value="elder">Elder-centred</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox"
                  checked={performanceDetails.elderInvolvement}
                  onChange={(e) => setPerformanceDetails({...performanceDetails, elderInvolvement: e.target.checked})}
                />
                Include elder involvement (cultural advisor, storyteller, or performer)
              </label>
              <p className={styles.formHint}>
                Elder involvement earns additional advisory fees and adds cultural credibility
              </p>
            </div>

            <div className={styles.formGroup}>
              <label>Additional Notes</label>
              <textarea 
                placeholder="Any other details about your vision..."
                value={performanceDetails.notes}
                onChange={(e) => setPerformanceDetails({...performanceDetails, notes: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(3)}>
              Review Concept →
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedTradition && (
        <div className={styles.step}>
          <h3>Step 3: Your Heritage Performance Concept</h3>
          
          <div className={styles.conceptSummary}>
            <div className={styles.conceptHeader}>
              <span className={styles.conceptFlag}>{selectedTradition.flag}</span>
              <div>
                <h4>{performanceDetails.title || 'Untitled Performance'}</h4>
                <p>{selectedTradition.name} • {selectedTradition.region}</p>
              </div>
            </div>

            <div className={styles.conceptDetails}>
              <div className={styles.conceptRow}>
                <span className={styles.conceptLabel}>Language:</span>
                <span>{performanceDetails.language || 'Not specified'}</span>
              </div>
              <div className={styles.conceptRow}>
                <span className={styles.conceptLabel}>Theme:</span>
                <span>{performanceDetails.theme || 'Not specified'}</span>
              </div>
              <div className={styles.conceptRow}>
                <span className={styles.conceptLabel}>Duration:</span>
                <span>{performanceDetails.duration} minutes</span>
              </div>
              <div className={styles.conceptRow}>
                <span className={styles.conceptLabel}>Audience:</span>
                <span>{performanceDetails.audienceType}</span>
              </div>
              <div className={styles.conceptRow}>
                <span className={styles.conceptLabel}>Elder Involvement:</span>
                <span>{performanceDetails.elderInvolvement ? 'Yes ✓' : 'No'}</span>
              </div>
            </div>

            <div className={styles.traditionElements}>
              <h5>Key Elements from {selectedTradition.name}:</h5>
              <ul>
                {selectedTradition.keyElements.map(el => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            </div>

            <div className={styles.venueInfo}>
              <h5>Suggested Setup:</h5>
              <p><strong>Venue:</strong> {selectedTradition.suggestedVenue}</p>
              <p><strong>Audience Size:</strong> {selectedTradition.audienceSize}</p>
            </div>

            {performanceDetails.notes && (
              <div className={styles.notesSection}>
                <h5>Your Notes:</h5>
                <p>{performanceDetails.notes}</p>
              </div>
            )}
          </div>

          <div className={styles.conceptActions}>
            <button className={styles.downloadButton} onClick={handleDownload}>
              📥 Download Concept
            </button>
            <button className={styles.backButton} onClick={() => setStep(2)}>← Edit</button>
          </div>

          <div className={styles.nextSteps}>
            <h4>Ready to Make This Real?</h4>
            <p>
              Join Wembley Wonders to submit this as a production proposal. 
              You'll get access to cross-programme collaboration, venue booking, 
              and 55% revenue share from ticketed performances.
            </p>
            <Link to="/membership" className={styles.joinLink}>
              Join Wembley Wonders →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// ORAL TRADITION ADAPTER COMPONENT
// ========================================

interface AnansiStory {
  id: string;
  title: string;
  originalSource: string;
  summary: string;
  themes: string[];
  characters: string[];
  stageAdaptationNotes: string;
}

const ANANSI_STORIES: AnansiStory[] = [
  {
    id: 'anansi-stories',
    title: 'How Anansi Got All the Stories',
    originalSource: 'Akan / Ashanti',
    summary: 'Anansi tricks Nyame (Sky God) to get ownership of all stories. Captures a python, hornets, and a leopard through cunning.',
    themes: ['Cunning over strength', 'Value of stories', 'Trickster wisdom'],
    characters: ['Anansi', 'Nyame', 'Python', 'Hornets', 'Leopard', 'Aso (Anansi\'s wife)'],
    stageAdaptationNotes: 'Classic opening piece. Can be told straight or adapted to contemporary setting. The three captures work as three acts.'
  },
  {
    id: 'anansi-tiger',
    title: 'Anansi and Tiger',
    originalSource: 'Jamaica',
    summary: 'Anansi repeatedly tricks Tiger (often called "Brer Tiger" in Jamaica), winning through wit what he cannot win through strength.',
    themes: ['Small defeating large', 'Wit vs power', 'Survival through cunning'],
    characters: ['Anansi', 'Tiger', 'Various animals'],
    stageAdaptationNotes: 'Good for physical comedy. Tiger can be played as colonial authority figure for political reading.'
  },
  {
    id: 'anansi-pot',
    title: 'Anansi and the Pot of Wisdom',
    originalSource: 'Akan / Caribbean',
    summary: 'Anansi tries to hoard all wisdom in a pot. When he can\'t climb a tree with it, his son suggests carrying it on his back. Anansi realizes wisdom is everywhere, throws the pot down.',
    themes: ['Wisdom cannot be hoarded', 'Pride before fall', 'Children teach parents'],
    characters: ['Anansi', 'Ntikuma (son)', 'Villagers'],
    stageAdaptationNotes: 'Great for intergenerational casting. Message about shared knowledge relevant to education themes.'
  },
  {
    id: 'anansi-banana',
    title: 'Anansi and the Banana Plantation',
    originalSource: 'Jamaica',
    summary: 'Anansi fakes his own death to steal from a banana plantation. His greed is eventually exposed.',
    themes: ['Greed punished', 'Community accountability', 'Consequences of deception'],
    characters: ['Anansi', 'Aso', 'Community members', 'Plantation owner'],
    stageAdaptationNotes: 'Can be adapted to comment on capitalism, theft, community economics. The "funeral" scene is theatrical gold.'
  },
  {
    id: 'anansi-name',
    title: 'Why Anansi Has Eight Thin Legs',
    originalSource: 'Ghana / Caribbean',
    summary: 'Greedy Anansi ties strings to himself so he can be pulled to every village feast. All feasts happen at once; he\'s pulled in every direction, stretching his legs thin.',
    themes: ['Greed punished', 'Can\'t have everything', 'Physical comedy'],
    characters: ['Anansi', 'Multiple village hosts'],
    stageAdaptationNotes: 'Excellent for physical theatre and puppetry. The pulling scene can be staged with ropes and audience participation.'
  }
];

const OralTraditionAdapter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedStory, setSelectedStory] = useState<AnansiStory | null>(null);
  const [adaptation, setAdaptation] = useState({
    setting: 'traditional',
    language: 'patois',
    modernElements: '',
    targetAge: 'family',
    castSize: '3-5',
    specialNotes: ''
  });
  const [step, setStep] = useState(1);

  const handleDownload = () => {
    if (!selectedStory) return;
    
    const content = `
ANANSI ADAPTATION CONCEPT
=========================
Generated by Kaywana's Court Sandbox

ORIGINAL STORY
--------------
Title: ${selectedStory.title}
Source: ${selectedStory.originalSource}
Summary: ${selectedStory.summary}

Original Characters: ${selectedStory.characters.join(', ')}
Original Themes: ${selectedStory.themes.join(', ')}

YOUR ADAPTATION
---------------
Setting: ${adaptation.setting === 'traditional' ? 'Traditional/Historical' : adaptation.setting === 'contemporary' ? 'Contemporary Wembley' : 'Futuristic/Afrofuturist'}
Primary Language: ${adaptation.language === 'patois' ? 'Jamaican Patois' : adaptation.language === 'twi' ? 'Twi (with English)' : adaptation.language === 'english' ? 'Standard English' : 'Mixed heritage languages'}
Target Audience: ${adaptation.targetAge}
Cast Size: ${adaptation.castSize} performers

Modern Elements to Include:
${adaptation.modernElements || 'None specified'}

STAGING NOTES (from tradition)
------------------------------
${selectedStory.stageAdaptationNotes}

YOUR NOTES
----------
${adaptation.specialNotes || 'None'}

NEXT STEPS
----------
1. Write script through Pageturners programme
2. Propose to Kaywana's Court for seasonal production
3. Collaborate with Trubble n Bass for music
4. Work with Silk Stilettos for Anansi costume design

=========================
Ready to adapt? Join Wembley Wonders.
pageturners@wembleywonders.org
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anansi-adaptation-${selectedStory.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.oralAdapter}>
      <div className={styles.builderHeader}>
        <h2>🕷️ Oral Tradition → Stage Adapter</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <p className={styles.adapterIntro}>
        Anansi stories have been adapted for stage since Jamaica's Little Theatre Movement in the 1940s. 
        This tool helps you plan your own adaptation—honouring the source while making it yours.
      </p>

      {step === 1 && (
        <div className={styles.step}>
          <h3>Step 1: Choose Your Story</h3>
          
          <div className={styles.storyGrid}>
            {ANANSI_STORIES.map(story => (
              <div 
                key={story.id}
                className={`${styles.storyCard} ${selectedStory?.id === story.id ? styles.selected : ''}`}
                onClick={() => setSelectedStory(story)}
              >
                <h4>🕷️ {story.title}</h4>
                <p className={styles.storySource}>{story.originalSource}</p>
                <p className={styles.storySummary}>{story.summary}</p>
                <div className={styles.storyThemes}>
                  {story.themes.map(theme => (
                    <span key={theme} className={styles.themeTag}>{theme}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedStory && (
            <button className={styles.nextButton} onClick={() => setStep(2)}>
              Adapt "{selectedStory.title}" →
            </button>
          )}
        </div>
      )}

      {step === 2 && selectedStory && (
        <div className={styles.step}>
          <h3>Step 2: Plan Your Adaptation</h3>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Setting</label>
              <select 
                value={adaptation.setting}
                onChange={(e) => setAdaptation({...adaptation, setting: e.target.value})}
              >
                <option value="traditional">Traditional / Historical Africa</option>
                <option value="colonial">Colonial Jamaica</option>
                <option value="contemporary">Contemporary Wembley</option>
                <option value="afrofuturist">Afrofuturist / Speculative</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Primary Language</label>
              <select 
                value={adaptation.language}
                onChange={(e) => setAdaptation({...adaptation, language: e.target.value})}
              >
                <option value="patois">Jamaican Patois</option>
                <option value="twi">Twi (with English translation)</option>
                <option value="english">Standard English</option>
                <option value="mixed">Mixed heritage languages</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Target Audience</label>
              <select 
                value={adaptation.targetAge}
                onChange={(e) => setAdaptation({...adaptation, targetAge: e.target.value})}
              >
                <option value="children">Children (under 12)</option>
                <option value="family">Family (all ages)</option>
                <option value="youth">Youth focus (12-18)</option>
                <option value="adult">Adult themes</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Cast Size</label>
              <select 
                value={adaptation.castSize}
                onChange={(e) => setAdaptation({...adaptation, castSize: e.target.value})}
              >
                <option value="1">Solo (1 performer)</option>
                <option value="2-3">Small (2-3 performers)</option>
                <option value="3-5">Medium (3-5 performers)</option>
                <option value="5-10">Large (5-10 performers)</option>
                <option value="ensemble">Ensemble (10+ performers)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Modern Elements to Include</label>
              <textarea 
                placeholder="How will you update this story? What contemporary references? What local Wembley connections?"
                value={adaptation.modernElements}
                onChange={(e) => setAdaptation({...adaptation, modernElements: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Special Notes</label>
              <textarea 
                placeholder="Any other adaptation ideas..."
                value={adaptation.specialNotes}
                onChange={(e) => setAdaptation({...adaptation, specialNotes: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.stagingTip}>
            <h4>💡 Staging Tip for This Story</h4>
            <p>{selectedStory.stageAdaptationNotes}</p>
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
            <button className={styles.downloadButton} onClick={handleDownload}>
              📥 Download Adaptation Plan
            </button>
          </div>

          <div className={styles.nextSteps}>
            <h4>Next Steps</h4>
            <p>
              Write your adaptation script through <Link to="/programmes/pageturners">Pageturners</Link>, 
              then propose it to Kaywana's Court for production.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// MAIN SANDBOX COMPONENT
// ========================================

const KaywanasCourtSandbox: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>('planner');

  const handleStartActivity = (activity: ActivityType) => {
    setActiveActivity(activity);
  };

  const handleCloseActivity = () => {
    setActiveActivity('planner');
  };

  // Heritage Performance Builder
  if (activeActivity === 'heritage-performance') {
    return (
      <PageTemplate
        pageTitle="Heritage Performance Builder"
        pageStrapline="Design performances rooted in diaspora traditions"
        pageGuide="Choose a performance tradition, define your concept, and download your heritage performance plan."
        showMaya={false}
        pageType="sandbox"
      >
        <HeritagePerformanceBuilder onClose={handleCloseActivity} />
      </PageTemplate>
    );
  }

  // Oral Tradition Adapter
  if (activeActivity === 'oral-tradition') {
    return (
      <PageTemplate
        pageTitle="Anansi Story Adapter"
        pageStrapline="Adapt oral tradition for contemporary stage"
        pageGuide="Choose a classic Anansi story and plan your stage adaptation—honouring the source while making it yours."
        showMaya={false}
        pageType="sandbox"
      >
        <OralTraditionAdapter onClose={handleCloseActivity} />
      </PageTemplate>
    );
  }

  // Placeholder activities
  if (activeActivity === 'heritage-script') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2>🗣️ Heritage Language Script Tool Coming Soon!</h2>
        <p>Write monologues, dialogues, and scenes in Patois, Pidgin, Creole, Twi, and more.</p>
        <p>Includes:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
          <li>Heritage language writing prompts</li>
          <li>Glossary builder for programme notes</li>
          <li>Audio pronunciation guide</li>
          <li>Connection to Pageturners for full script development</li>
        </ul>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'intergenerational') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2>👵 Intergenerational Story Bridge Coming Soon!</h2>
        <p>Connect elder storytellers with young performers to preserve and adapt heritage stories.</p>
        <p>Features:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
          <li>Elder interview guide</li>
          <li>Story capture template</li>
          <li>Youth adaptation framework</li>
          <li>Joint performance planning</li>
          <li>Archive recording coordination</li>
        </ul>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'dinner-theatre') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2>🍲 Dinner Theatre Planner Coming Soon!</h2>
        <p>Plan performances that integrate with Auntie Anansi's Kitchen menus.</p>
        <p>Features:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
          <li>Menu + performance pairing</li>
          <li>Venue layout planner</li>
          <li>Service timing coordination</li>
          <li>Revenue calculator (tickets + food)</li>
          <li>Kitchen coordination checklist</li>
        </ul>
        <Link 
          to="/programmes/auntie-anansis-kitchen"
          style={{ display: 'block', marginTop: '20px', color: '#ff8c00' }}
        >
          Visit Auntie Anansi's Kitchen →
        </Link>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'sound-mixing') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>🎙️ Sound Mixing Simulator Coming Soon!</h2>
        <p>Record, mix, and master radio dramas for Raydyo broadcast.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'lighting-design') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>💡 Lighting Designer Coming Soon!</h2>
        <p>Design lighting for live performances at Park Lane Methodist.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'stage-tech') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>⚙️ Stage Technology Coming Soon!</h2>
        <p>Build and operate stage automation for live shows.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'broadcast-control') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>📡 Broadcast Control Room Coming Soon!</h2>
        <p>Run live Raydyo radio broadcasts from the control room.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'recording-setup') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>🔧 Recording Equipment Setup Coming Soon!</h2>
        <p>Learn mic placement, monitoring, and mixing board operation.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  if (activeActivity === 'tech-troubleshoot') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>🚨 Technical Problem Solver Coming Soon!</h2>
        <p>Practice fixing technical issues during live productions.</p>
        <button 
          onClick={handleCloseActivity}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  return (
    <PageTemplate
      pageTitle="Kaywana's Court Sandbox"
      pageStrapline="Diaspora Theatre Production & Heritage Performance Tools"
      pageGuide="Plan heritage performances, adapt oral traditions for stage, and master technical production—from Park Lane Methodist to Raydyo broadcast."
      showMaya={false}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>
        {/* Dedication Section - EXPANDED */}
        <section className={styles.dedicationSection}>
          <div className={styles.dedicationCard}>
            <div className={styles.dedicationIcon}>🎭</div>
            <h3>Dedicated to the pioneers who opened doors for us all</h3>
            <div className={styles.pioneers}>
              <div className={styles.pioneer}>
                <strong>Louise Bennett-Coverley</strong>
                <p>Proved Patois is a literary language. Made Jamaica laugh, think, and recognise itself. Miss Lou forever.</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Pearl Connor</strong>
                <p>Built The Negro Theatre Workshop (1961), creating space for Black actors when mainstream theatre shut them out.</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Yvonne Brewster</strong>
                <p>Founded Talawa Theatre Company (1985), establishing the UK's first Black-led theatre company.</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Wole Soyinka</strong>
                <p>Showed the world that African ritual is theatre. Nobel laureate who never abandoned the village for the academy.</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Derek Walcott</strong>
                <p>Gave Caribbean stories epic form. Made the sea a stage and ancestors into characters.</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Kamau Brathwaite</strong>
                <p>Created "Nation Language" – the theory that validated Caribbean speech as poetic form.</p>
              </div>
            </div>
            <p className={styles.dedicationNote}>
              We stand on their shoulders. This sandbox honours their legacy by helping the next generation create heritage theatre.
            </p>
          </div>
        </section>

        {/* Heritage Performance Tools - NEW SECTION */}
        <section className={styles.heritageToolsSection}>
          <h2 className={styles.sectionTitle}>🌍 Heritage Performance Tools</h2>
          <p className={styles.sectionIntro}>
            Tools designed specifically for diaspora theatre—rooted in Caribbean and African 
            performance traditions, built for contemporary community production.
          </p>

          <div className={styles.heritageToolsGrid}>
            {/* Heritage Performance Builder */}
            <div className={styles.heritageToolCard}>
              <div className={styles.toolIcon}>🎭</div>
              <h3>Heritage Performance Builder</h3>
              <p>
                Choose from 8 diaspora performance traditions—yard theatre, dub poetry, griot 
                storytelling, calypso tent, and more. Design performances rooted in heritage.
              </p>
              <div className={styles.toolFeatures}>
                <span>Caribbean traditions</span>
                <span>African traditions</span>
                <span>Heritage language options</span>
                <span>Elder involvement planning</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => handleStartActivity('heritage-performance')}
              >
                Build Heritage Performance →
              </button>
            </div>

            {/* Oral Tradition Adapter */}
            <div className={styles.heritageToolCard}>
              <div className={styles.toolIcon}>🕷️</div>
              <h3>Anansi Story Adapter</h3>
              <p>
                Classic Anansi stories with staging notes. Plan adaptations from traditional 
                to contemporary, from Patois to Twi. Honour the source while making it yours.
              </p>
              <div className={styles.toolFeatures}>
                <span>5 classic stories</span>
                <span>Staging suggestions</span>
                <span>Setting options</span>
                <span>Language choices</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => handleStartActivity('oral-tradition')}
              >
                Adapt Anansi Story →
              </button>
            </div>

            {/* Heritage Language Script */}
            <div className={styles.heritageToolCard}>
              <div className={styles.toolIcon}>🗣️</div>
              <h3>Heritage Language Script Tool</h3>
              <p>
                Write dialogue, monologues, and scenes in Patois, Pidgin, Creole, Twi. 
                Includes glossary builder for programme notes.
              </p>
              <div className={styles.toolFeatures}>
                <span>Multiple languages</span>
                <span>Glossary builder</span>
                <span>Pronunciation guide</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => handleStartActivity('heritage-script')}
              >
                Start Writing
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Intergenerational Story Bridge */}
            <div className={styles.heritageToolCard}>
              <div className={styles.toolIcon}>👵</div>
              <h3>Intergenerational Story Bridge</h3>
              <p>
                Connect elder storytellers with young performers. Capture heritage stories, 
                plan joint performances, coordinate archive recordings.
              </p>
              <div className={styles.toolFeatures}>
                <span>Elder interview guide</span>
                <span>Story capture</span>
                <span>Joint performance</span>
                <span>Archive coordination</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => handleStartActivity('intergenerational')}
              >
                Bridge Generations
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Dinner Theatre Planner */}
            <div className={styles.heritageToolCard}>
              <div className={styles.toolIcon}>🍲</div>
              <h3>Dinner Theatre Planner</h3>
              <p>
                Plan performances that integrate with Auntie Anansi's Kitchen. 
                Menu pairing, venue layout, service timing, revenue calculation.
              </p>
              <div className={styles.toolFeatures}>
                <span>Menu + show pairing</span>
                <span>Venue planning</span>
                <span>Service timing</span>
                <span>Revenue calculator</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => handleStartActivity('dinner-theatre')}
              >
                Plan Dinner Theatre
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>
          </div>
        </section>

        {/* Production Planner - Existing Flagship Tool */}
        <section className={styles.flagshipSection}>
          <div className={styles.flagshipCard}>
            <div className={styles.flagshipHeader}>
              <span className={styles.flagshipIcon}>📋</span>
              <div className={styles.flagshipBadge}>
                <span className={styles.badgeFree}>Try Free</span>
                <span className={styles.badgeDownloads}>3 Free Plans</span>
              </div>
            </div>
            
            <h2 className={styles.flagshipTitle}>Production Planner</h2>
            <p className={styles.flagshipTagline}>
              Plan complete performances from concept to curtain call
            </p>
            
            <div className={styles.flagshipDescription}>
              <p>
                Interactive tool showing how Kaywana's Court brings all Wembley Wonders programmes 
                together for collaborative seasonal performances. Get a personalized 14-week roadmap 
                with timelines, budgets, and cross-programme collaboration.
              </p>
            </div>

            <div className={styles.flagshipFeatures}>
              <h3>What You'll Get:</h3>
              <div className={styles.featureGrid}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>📅</span>
                  <strong>14-Week Timeline</strong>
                  <p>Complete production schedule with milestones and deadlines</p>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>💰</span>
                  <strong>Budget Breakdown</strong>
                  <p>Realistic costs and 55/25/20 revenue sharing model</p>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🤝</span>
                  <strong>Cross-Programme Teams</strong>
                  <p>See which programmes you need (writers, tech, costume, etc.)</p>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>🎭</span>
                  <strong>Cultural Seasons</strong>
                  <p>Match your show to Carnival, Heritage, Harvest, or Storytelling season</p>
                </div>
              </div>
            </div>

            {activeActivity === 'planner' && (
              <div className={styles.plannerWrapper}>
                <ProductionPlannerV2 />
              </div>
            )}

            {activeActivity !== 'planner' && (
              <button 
                className={styles.startButton}
                onClick={() => handleStartActivity('planner')}
              >
                Open Production Planner →
              </button>
            )}
          </div>
        </section>

        {/* Technical Production Skills */}
        <section className={styles.technicalSection}>
          <h2 className={styles.sectionTitle}>⚙️ Technical Production Skills</h2>
          <p className={styles.sectionIntro}>
            Every great performance needs technical crew behind the scenes. Master the skills 
            that bring shows from rehearsal room to stage—from sound mixing to lighting design.
          </p>

          <div className={styles.activitiesGrid}>
            
            {/* Sound Mixing Simulator */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>🎙️</div>
              <h3>Sound Mixing Simulator</h3>
              <p>
                Record, mix, and master radio dramas for Raydyo broadcast. 8-track virtual 
                mixing board with EQ, effects, and mastering tools.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('sound-mixing')}
              >
                Start Mixing
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Lighting Designer */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>💡</div>
              <h3>Lighting Designer</h3>
              <p>
                Design lighting cues for live performances. Choose colors, intensity, movement, 
                and program automated light shows for Park Lane Methodist stage.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('lighting-design')}
              >
                Design Lighting
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Stage Technology */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>⚙️</div>
              <h3>Stage Technology</h3>
              <p>
                Plan stage automation and scene changes. Design set movements, time transitions, 
                and build cue sheets for live performances.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('stage-tech')}
              >
                Build Stage Tech
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Broadcast Control Room */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>📡</div>
              <h3>Broadcast Control Room</h3>
              <p>
                Run live Raydyo broadcasts. Mix multiple audio sources, handle talk-back, 
                music beds, and practice emergency troubleshooting.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('broadcast-control')}
              >
                Run Broadcast
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Recording Equipment Setup */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>🔧</div>
              <h3>Recording Equipment Setup</h3>
              <p>
                Learn mic placement and monitoring. Choose right mics for different situations, 
                set up monitoring, avoid common recording mistakes.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('recording-setup')}
              >
                Setup Recording
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

            {/* Technical Problem Solver */}
            <div className={styles.activityCard}>
              <div className={styles.activityIcon}>🚨</div>
              <h3>Technical Problem Solver</h3>
              <p>
                Interactive troubleshooting scenarios. "The mic isn't working!", "Feedback!", 
                "Lights won't cue!" - practice fixing issues during live shows.
              </p>
              <button 
                className={styles.activityButton}
                onClick={() => handleStartActivity('tech-troubleshoot')}
              >
                Solve Problems
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>

          </div>
        </section>

        {/* Cross-Programme Collaboration */}
        <section className={styles.collaborationSection}>
          <h2>Every Production Needs All Programmes</h2>
          <p className={styles.sectionIntro}>
            Kaywana's Court is where all Wembley Wonders programmes collaborate to create heritage theatre. 
            Even solo artists benefit from this ecosystem of support!
          </p>
          <div className={styles.programmeCards}>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>📖</div>
              <h3>Pageturners</h3>
              <p>Scripts, Anansi adaptations, heritage language writing</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🔧</div>
              <h3>STEMgeneers</h3>
              <p>Set design, lighting, sound tech, stage engineering</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>💼</div>
              <h3>TECHreneurs</h3>
              <p>Budgets, marketing, ticket sales, sponsorships</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>👗</div>
              <h3>Silk Stilettos</h3>
              <p>Heritage costumes, carnival mas, character styling</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🎵</div>
              <h3>Trubble n Bass</h3>
              <p>Live music, heritage soundscapes, dub backing</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🍲</div>
              <h3>Auntie Anansi's Kitchen</h3>
              <p>Dinner theatre catering, heritage food pairings</p>
            </div>
          </div>
        </section>

        {/* Cultural Seasons */}
        <section className={styles.seasonsSection}>
          <h2>Our Cultural Seasons</h2>
          <p className={styles.sectionIntro}>
            We follow <strong>cultural rhythms</strong>, not the traditional calendar—honoring Caribbean 
            and African traditions while creating space for new celebrations.
          </p>
          <div className={styles.seasonsGrid}>
            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🎉</div>
              <h3>Carnival Season</h3>
              <p className={styles.seasonPeriod}>January - March</p>
              <p className={styles.seasonTheme}>Celebration, Liberation, Joy</p>
              <p className={styles.seasonDesc}>High-energy, colorful, music-driven performances</p>
              <p className={styles.seasonTypes}><strong>Heritage focus:</strong> Mas characters, calypso tent, liberation plays</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌿</div>
              <h3>Heritage Season</h3>
              <p className={styles.seasonPeriod}>April - June</p>
              <p className={styles.seasonTheme}>Roots, Ancestors, Preservation</p>
              <p className={styles.seasonDesc}>Reflective, storytelling, educational performances</p>
              <p className={styles.seasonTypes}><strong>Heritage focus:</strong> Windrush stories, griot performances, ancestor plays</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌾</div>
              <h3>Harvest Season</h3>
              <p className={styles.seasonPeriod}>July - September</p>
              <p className={styles.seasonTheme}>Abundance, Community, Gratitude</p>
              <p className={styles.seasonDesc}>Collaborative, celebratory, grounding performances</p>
              <p className={styles.seasonTypes}><strong>Heritage focus:</strong> Crop Over, dinner theatre, community feasts</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>📖</div>
              <h3>Storytelling Season</h3>
              <p className={styles.seasonPeriod}>October - December</p>
              <p className={styles.seasonTheme}>Wisdom, Tradition, Legacy</p>
              <p className={styles.seasonDesc}>Intimate, mystical, intergenerational performances</p>
              <p className={styles.seasonTypes}><strong>Heritage focus:</strong> Anansi tales, elder storytelling, Jonkonnu</p>
            </div>
          </div>
        </section>

        {/* Free vs Member Access */}
        <section className={styles.tiersSection}>
          <h2>Free vs Member Access</h2>
          <div className={styles.tiersGrid}>
            <div className={styles.tierCard}>
              <h3>Free Explorer</h3>
              <p className={styles.tierPrice}>£0</p>
              <ul className={styles.tierFeatures}>
                <li className={styles.included}>✓ Plan 3 production concepts</li>
                <li className={styles.included}>✓ Use Heritage Performance Builder</li>
                <li className={styles.included}>✓ Adapt Anansi stories</li>
                <li className={styles.included}>✓ Try all technical simulators</li>
                <li className={styles.included}>✓ Download plans as .txt files</li>
                <li className={styles.excluded}>✗ Cannot submit real proposals</li>
                <li className={styles.excluded}>✗ Cannot join production teams</li>
                <li className={styles.excluded}>✗ Cannot perform on The Grand Stage</li>
              </ul>
            </div>

            <div className={`${styles.tierCard} ${styles.featured}`}>
              <div className={styles.featuredBadge}>BEST VALUE</div>
              <h3>Programme Member</h3>
              <p className={styles.tierPrice}>From £15/month</p>
              <ul className={styles.tierFeatures}>
                <li className={styles.included}>✓ Submit unlimited production proposals</li>
                <li className={styles.included}>✓ Vote on seasonal show selection</li>
                <li className={styles.included}>✓ Join cross-programme production teams</li>
                <li className={styles.included}>✓ Perform/produce heritage theatre</li>
                <li className={styles.included}>✓ Broadcast on Raydyo</li>
                <li className={styles.included}>✓ Revenue sharing (55% for participants)</li>
                <li className={styles.included}>✓ Access elder storyteller network</li>
              </ul>
              <div className={styles.tierPricing}>
                <p><strong>£15/mo:</strong> 1 programme + Kaywana's Court access</p>
                <p><strong>£35/mo:</strong> 3 programmes + priority roles</p>
                <p><strong>£50/mo:</strong> ALL 9 programmes + leadership opportunities</p>
              </div>
              <Link to="/membership" className={styles.joinButton}>
                Join Wembley Wonders →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Create Heritage Theatre?</h2>
            <p>
              The heritage tools and production planner show you what's possible. 
              Membership makes it real—from Anansi adaptation to The Grand Stage.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/membership" className={styles.primaryCta}>
                Join Wembley Wonders
              </Link>
              <Link to="/programmes/kaywanas-court" className={styles.secondaryCta}>
                Learn More About Kaywana's Court
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default KaywanasCourtSandbox;