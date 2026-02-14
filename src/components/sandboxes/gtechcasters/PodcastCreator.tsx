// src/components/sandboxes/gtechcasters/PodcastCreator.tsx
import React, { useState, useEffect } from 'react';
import { useSandboxPlanner } from '../shared/useSandboxPlanner';
import MayaConversation from '../shared/MayaConversation';
import ProgressBar from '../shared/ProgressBar';
import NavigationButtons from '../shared/NavigationButtons';
import ConversionModal from '../shared/ConversionModal';
import styles from '../shared/SandboxPlanner.module.css';
import localStyles from './PodcastCreator.module.css';

// ========================================
// TYPES
// ========================================

type ContentType = 'interview' | 'solo-commentary' | 'narrative' | 'panel' | 'documentary';
type ProductionScale = 'solo' | 'collaborative' | 'team-production';

interface Segment {
  segment: string;
  duration: number;
  purpose: string;
}

interface Collaborator {
  programme: string;
  role: string;
}

interface PodcastEpisode {
  episodeTitle: string;
  contentType: ContentType | null;
  targetAudience: string;
  coreMessage: string;
  episodeLength: number;
  segmentBreakdown: Segment[];
  productionScale: ProductionScale | null;
  equipmentNeeded: string[];
  skillsRequired: string[];
  collaborators: Collaborator[];
  monetizationStrategy: string[];
  sponsorshipTarget: string;
  premiumContentPlan: string;
  seriesPotential: boolean;
  crossPlatform: string[];
  teachingContentValue: boolean;
}

interface RevenueProjection {
  baseValue: number;
  collabValue: number;
  monetizationValue: number;
  seriesTotal: number;
  teachingValue: number;
  total: number;
}

// ========================================
// COMPONENT
// ========================================

const PodcastCreator: React.FC = () => {
  const planner = useSandboxPlanner({
    storageKey: 'wembley-gtechcasters-downloads',
    totalSteps: 8,
    downloadLimit: 3,
  });

  const [episodeData, setEpisodeData] = useState<PodcastEpisode>({
    episodeTitle: '',
    contentType: null,
    targetAudience: '',
    coreMessage: '',
    episodeLength: 30,
    segmentBreakdown: [],
    productionScale: null,
    equipmentNeeded: [],
    skillsRequired: [],
    collaborators: [],
    monetizationStrategy: [],
    sponsorshipTarget: '',
    premiumContentPlan: '',
    seriesPotential: false,
    crossPlatform: ['raydyo'],
    teachingContentValue: false,
  });

  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [revenueProjection, setRevenueProjection] = useState<RevenueProjection | null>(null);

  // ========================================
  // RENDER LOGIC
  // ========================================

  const renderStep = () => {
    switch (planner.currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderConceptStep();
      case 2:
        return renderContentTypeStep();
      case 3:
        return renderStructureStep();
      case 4:
        return renderProductionScaleStep();
      case 5:
        return renderCollaborationStep();
      case 6:
        return renderMonetizationStep();
      case 7:
        return renderDistributionStep();
      case 8:
        return renderProductionPlanStep();
      default:
        return null;
    }
  };

  // ========================================
  // STEP 0: WELCOME
  // ========================================

  const renderWelcomeStep = () => (
    <div className={styles.stepContent}>
      <MayaConversation 
        message="G-Tech Casters isn't just about recording podcasts - you're the DOCUMENTATION and BROADCAST hub for the entire Wembley Wonders ecosystem. Every programme's work becomes content. Every story becomes income. Let's plan a podcast that matters."
      />
      
      <div className={localStyles.welcomeGrid}>
        <div className={localStyles.roleCard}>
          <span className={localStyles.cardIcon}>🎙️</span>
          <h3>Content Creator</h3>
          <p>Your voice, your story - interview community heroes, document projects, tell stories that need telling.</p>
          <p className={localStyles.example}>Example: "Uncle Winston's Signal Chain" - interview series</p>
        </div>
        
        <div className={localStyles.roleCard}>
          <span className={localStyles.cardIcon}>📰</span>
          <h3>Community Journalist</h3>
          <p>Document what's happening - STEMgeneers builds, Silk Stilettos exhibitions, Kaywana's productions.</p>
          <p className={localStyles.example}>Example: Behind-scenes drone championship coverage</p>
        </div>
        
        <div className={localStyles.roleCard}>
          <span className={localStyles.cardIcon}>🎬</span>
          <h3>Media Producer</h3>
          <p>Multi-person productions - radio plays, panel discussions, documentary series.</p>
          <p className={localStyles.example}>Example: 8-part Caribbean recipe heritage documentary</p>
        </div>
        
        <div className={localStyles.roleCard}>
          <span className={localStyles.cardIcon}>💰</span>
          <h3>Revenue Generator</h3>
          <p>Your content creates income - sponsorships, premium content, teaching materials, community commissions.</p>
          <p className={localStyles.example}>Example: £150-400/month from established shows</p>
        </div>
      </div>

      <div className={localStyles.ecosystemValue}>
        <h3>🔗 Why G-Tech Casters is Crucial</h3>
        <p>You're not just making content for content's sake. You're:</p>
        <ul>
          <li><strong>Attracting new members:</strong> Great content brings people in</li>
          <li><strong>Documenting knowledge:</strong> "Each one teach one" - preserve for next generation</li>
          <li><strong>Creating teaching materials:</strong> Turn every project into tutorial income</li>
          <li><strong>Building community archive:</strong> Stories that would otherwise be lost</li>
          <li><strong>Generating sustainable income:</strong> For you AND the creators you feature</li>
        </ul>
      </div>

      <div className={localStyles.realityCheck}>
        <h4>🎯 Three Levels of Podcast Production</h4>
        <div className={localStyles.levelGrid}>
          <div className={localStyles.levelCard}>
            <strong>Solo + ROV</strong>
            <p>You + mic + ROV guidance = publishable episode</p>
            <span className={localStyles.levelTime}>2-4 hours total</span>
          </div>
          <div className={localStyles.levelCard}>
            <strong>Collaborative</strong>
            <p>You + subject expert + sound designer = premium content</p>
            <span className={localStyles.levelTime}>6-8 hours total</span>
          </div>
          <div className={localStyles.levelCard}>
            <strong>Team Production</strong>
            <p>Multi-person cast + producers + editors = professional series</p>
            <span className={localStyles.levelTime}>20-40 hours total</span>
          </div>
        </div>
      </div>

      <NavigationButtons
        onNext={() => planner.setCurrentStep(1)}
        canProceed={true}
        nextLabel="Plan My Podcast →"
      />
    </div>
  );

  // ========================================
  // STEP 1: CONCEPT
  // ========================================

  const renderConceptStep = () => (
    <div className={styles.stepContent}>
      <MayaConversation 
        message="Start with WHY this episode needs to exist. Not 'because podcasts are cool' - what story MUST be told? What knowledge must be preserved? What community voice needs amplifying?"
      />

      <div className={localStyles.formSection}>
        <label>
          <strong>Episode Title (Working title is fine)</strong>
          <p className={localStyles.hint}>
            Make it specific. "My Podcast #1" is vague. "How Uncle Winston's Speaker Box Physics Changed My Life" is specific.
          </p>
        </label>
        <input
          type="text"
          value={episodeData.episodeTitle}
          onChange={(e) => setEpisodeData({...episodeData, episodeTitle: e.target.value})}
          placeholder="Example: 'From Tax Terror to Tax Confident: Jamal's Simulator Journey'"
        />
      </div>

      <div className={localStyles.formSection}>
        <label>
          <strong>Who is this FOR?</strong>
          <p className={localStyles.hint}>
            Be specific. "Young people" is vague. "16-18 year olds scared of adult responsibilities" is specific.
          </p>
        </label>
        <textarea
          value={episodeData.targetAudience}
          onChange={(e) => setEpisodeData({...episodeData, targetAudience: e.target.value})}
          placeholder="Example: 'Young people in Wembley who grew up eating Caribbean food but never learned to cook it - feeling disconnected from heritage'"
          rows={3}
        />
      </div>

      <div className={localStyles.formSection}>
        <label>
          <strong>What's the ONE thing listeners should take away?</strong>
          <p className={localStyles.hint}>
            Not a list of points - ONE core message. If they remember nothing else, what should stick?
          </p>
        </label>
        <textarea
          value={episodeData.coreMessage}
          onChange={(e) => setEpisodeData({...episodeData, coreMessage: e.target.value})}
          placeholder="Example: 'Learning your heritage through food isn't about being perfect - it's about starting conversations with elders before their knowledge is lost'"
          rows={3}
        />
      </div>

      <NavigationButtons
        onBack={() => planner.setCurrentStep(0)}
        onNext={() => planner.setCurrentStep(2)}
        canProceed={
          episodeData.episodeTitle.length > 10 &&
          episodeData.targetAudience.length > 30 &&
          episodeData.coreMessage.length > 40
        }
        nextLabel="Next: Choose Format →"
      />
    </div>
  );

  // ========================================
  // STEP 2: CONTENT TYPE
  // ========================================

  const renderContentTypeStep = () => {
    const contentTypes = [
      {
        id: 'interview' as ContentType,
        icon: '🎤',
        name: 'Interview',
        description: 'You + guest in conversation',
        examples: 'Uncle Winston on signal chains, Auntie Clara on Montserrat memories',
        complexity: 'Low',
        equipment: 'Mic + recorder',
        soloViable: true,
      },
      {
        id: 'solo-commentary' as ContentType,
        icon: '🗣️',
        name: 'Solo Commentary',
        description: 'Your voice, your perspective',
        examples: 'Documenting your learning journey, reviewing local events',
        complexity: 'Low',
        equipment: 'Mic only',
        soloViable: true,
      },
      {
        id: 'panel' as ContentType,
        icon: '👥',
        name: 'Panel Discussion',
        description: 'Multiple voices, moderated conversation',
        examples: 'Drone championship recap, women in STEM roundtable',
        complexity: 'Medium',
        equipment: 'Multi-mic setup',
        soloViable: false,
      },
      {
        id: 'narrative' as ContentType,
        icon: '📖',
        name: 'Narrative/Story',
        description: 'Scripted storytelling, sound design',
        examples: 'Caribbean folktales, audio documentary',
        complexity: 'High',
        equipment: 'Multi-track recording',
        soloViable: false,
      },
      {
        id: 'documentary' as ContentType,
        icon: '🎬',
        name: 'Documentary Series',
        description: 'Multi-episode investigative/educational',
        examples: 'Drone championship coverage, heritage recipe series',
        complexity: 'High',
        equipment: 'Field recording + studio',
        soloViable: false,
      },
    ];

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Different formats need different skills and resources. Solo creators can absolutely produce professional content - but collaborative formats unlock higher production value and revenue potential."
        />

        <div className={localStyles.contentTypeGrid}>
          {contentTypes.map(type => (
            <button
              key={type.id}
              className={`${localStyles.contentTypeCard} ${episodeData.contentType === type.id ? localStyles.selected : ''}`}
              onClick={() => setEpisodeData({...episodeData, contentType: type.id})}
            >
              <span className={localStyles.typeIcon}>{type.icon}</span>
              <h4>{type.name}</h4>
              <p className={localStyles.typeDescription}>{type.description}</p>
              
              <div className={localStyles.typeDetails}>
                <span className={localStyles.complexity}>
                  {type.complexity} complexity
                </span>
                <span className={localStyles.soloViable}>
                  {type.soloViable ? '✓ Solo viable' : '⚠️ Team needed'}
                </span>
              </div>
              
              <p className={localStyles.typeExamples}>
                <strong>Examples:</strong> {type.examples}
              </p>
            </button>
          ))}
        </div>

        {episodeData.contentType && (
          <div className={localStyles.typeGuidance}>
            {episodeData.contentType === 'interview' && (
              <div>
                <h4>✅ Interview Format Selected</h4>
                <p><strong>Why this works solo:</strong> You handle recording, guest provides content, ROV guides question flow.</p>
              </div>
            )}
            {episodeData.contentType === 'solo-commentary' && (
              <div>
                <h4>✅ Solo Commentary Selected</h4>
                <p><strong>Why this works solo:</strong> Just you + mic. ROV helps structure, pacing, clarity.</p>
              </div>
            )}
            {(episodeData.contentType === 'panel' || episodeData.contentType === 'narrative' || episodeData.contentType === 'documentary') && (
              <div>
                <h4>⚠️ Team Production Selected</h4>
                <p><strong>Why team is essential:</strong> Multiple voices, complex editing requires coordination.</p>
              </div>
            )}
          </div>
        )}

        <NavigationButtons
          onBack={() => planner.setCurrentStep(1)}
          onNext={() => planner.setCurrentStep(3)}
          canProceed={episodeData.contentType !== null}
          nextLabel="Next: Structure Episode →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 3: STRUCTURE
  // ========================================

  const renderStructureStep = () => {
    const addSegment = () => {
      setEpisodeData({
        ...episodeData,
        segmentBreakdown: [
          ...episodeData.segmentBreakdown,
          { segment: '', duration: 5, purpose: '' }
        ]
      });
    };

    const updateSegment = (index: number, field: keyof Segment, value: string | number) => {
      const updated = [...episodeData.segmentBreakdown];
      updated[index] = { ...updated[index], [field]: value };
      setEpisodeData({ ...episodeData, segmentBreakdown: updated });
    };

    const removeSegment = (index: number) => {
      const updated = episodeData.segmentBreakdown.filter((_, i) => i !== index);
      setEpisodeData({ ...episodeData, segmentBreakdown: updated });
    };

    const totalDuration = episodeData.segmentBreakdown.reduce((sum, seg) => sum + seg.duration, 0);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Great podcasts have structure - not rambling. Think in segments: intro, main content, conclusion. Each segment has a purpose. Let's map yours."
        />

        <div className={localStyles.durationSelector}>
          <label>
            <strong>Target Episode Length</strong>
          </label>
          <div className={localStyles.durationButtons}>
            {[15, 20, 30, 45, 60].map(mins => (
              <button
                key={mins}
                className={episodeData.episodeLength === mins ? localStyles.selected : ''}
                onClick={() => setEpisodeData({...episodeData, episodeLength: mins})}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>

        <div className={localStyles.segmentBuilder}>
          <h3>Episode Segments</h3>
          
          {episodeData.segmentBreakdown.length === 0 && (
            <div className={localStyles.templateSuggestion}>
              <h4>💡 Common Structure Templates:</h4>
              <button
                className={localStyles.templateButton}
                onClick={() => setEpisodeData({
                  ...episodeData,
                  segmentBreakdown: [
                    { segment: 'Cold Open', duration: 2, purpose: 'Hook listener' },
                    { segment: 'Intro & Context', duration: 3, purpose: 'Who, what, why' },
                    { segment: 'Main Content', duration: 20, purpose: 'Core interview' },
                    { segment: 'Key Takeaway', duration: 3, purpose: 'Summarize learning' },
                    { segment: 'Outro', duration: 2, purpose: 'Call-to-action' },
                  ]
                })}
              >
                Use Interview Template (30 min)
              </button>
            </div>
          )}

          {episodeData.segmentBreakdown.map((seg, idx) => (
            <div key={idx} className={localStyles.segmentCard}>
              <div className={localStyles.segmentHeader}>
                <strong>Segment {idx + 1}</strong>
                <button
                  className={localStyles.removeButton}
                  onClick={() => removeSegment(idx)}
                >
                  ✕
                </button>
              </div>
              
              <input
                type="text"
                placeholder="Segment name"
                value={seg.segment}
                onChange={(e) => updateSegment(idx, 'segment', e.target.value)}
              />
              
              <div className={localStyles.durationInput}>
                <label>Duration (minutes):</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={seg.duration}
                  onChange={(e) => updateSegment(idx, 'duration', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <textarea
                placeholder="Purpose of this segment"
                value={seg.purpose}
                onChange={(e) => updateSegment(idx, 'purpose', e.target.value)}
                rows={2}
              />
            </div>
          ))}

          <button className={localStyles.addSegmentButton} onClick={addSegment}>
            + Add Segment
          </button>

          <div className={localStyles.durationCheck}>
            <strong>Total: {totalDuration} min</strong>
            {totalDuration > episodeData.episodeLength && (
              <span className={localStyles.warning}>
                ⚠️ Over by {totalDuration - episodeData.episodeLength} min
              </span>
            )}
          </div>
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(2)}
          onNext={() => planner.setCurrentStep(4)}
          canProceed={
            episodeData.segmentBreakdown.length >= 3 &&
            episodeData.segmentBreakdown.every(seg => seg.segment && seg.purpose)
          }
          nextLabel="Next: Production Scale →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 4: PRODUCTION SCALE
  // ========================================

  const renderProductionScaleStep = () => (
    <div className={styles.stepContent}>
      <MayaConversation 
        message="Based on your format, let's decide: solo production, collaborative enhancement, or full team? Each has different resource needs and revenue potential."
      />

      <div className={localStyles.scaleGrid}>
        <button
          className={`${localStyles.scaleCard} ${episodeData.productionScale === 'solo' ? localStyles.selected : ''}`}
          onClick={() => setEpisodeData({
            ...episodeData,
            productionScale: 'solo',
            equipmentNeeded: ['USB microphone', 'Audacity/free editing', 'Quiet space'],
            skillsRequired: ['Basic audio editing', 'Interview technique'],
          })}
        >
          <span className={localStyles.scaleIcon}>🎙️</span>
          <h4>Solo + ROV</h4>
          <p><strong>Time:</strong> 2-4 hours total</p>
          <p><strong>Revenue:</strong> £25-75/episode</p>
        </button>

        <button
          className={`${localStyles.scaleCard} ${episodeData.productionScale === 'collaborative' ? localStyles.selected : ''}`}
          onClick={() => setEpisodeData({
            ...episodeData,
            productionScale: 'collaborative',
            equipmentNeeded: ['Professional mic', 'Multi-track recorder', 'Studio'],
            skillsRequired: ['Interview technique', 'Audio editing', 'Sound design'],
          })}
        >
          <span className={localStyles.scaleIcon}>🤝</span>
          <h4>Collaborative</h4>
          <p><strong>Time:</strong> 6-8 hours (your part: 3-4h)</p>
          <p><strong>Revenue:</strong> £100-250/episode</p>
        </button>

        <button
          className={`${localStyles.scaleCard} ${episodeData.productionScale === 'team-production' ? localStyles.selected : ''}`}
          onClick={() => setEpisodeData({
            ...episodeData,
            productionScale: 'team-production',
            equipmentNeeded: ['Multi-mic studio', 'Video cameras', 'Field recording'],
            skillsRequired: ['Production management', 'Team leadership'],
          })}
        >
          <span className={localStyles.scaleIcon}>🎬</span>
          <h4>Team Production</h4>
          <p><strong>Time:</strong> 20-40 hours (distributed)</p>
          <p><strong>Revenue:</strong> £300-800/episode</p>
        </button>
      </div>

      <NavigationButtons
        onBack={() => planner.setCurrentStep(3)}
        onNext={() => planner.setCurrentStep(5)}
        canProceed={episodeData.productionScale !== null}
        nextLabel="Next: Build Team →"
      />
    </div>
  );

  // ========================================
  // STEP 5: COLLABORATION
  // ========================================

  const renderCollaborationStep = () => {
    const collaborationOptions = [
      {
        programme: 'Trubble n Bass',
        roles: ['Theme music', 'Sound designer'],
        value: 'Professional audio identity',
      },
      {
        programme: 'Pageturners',
        roles: ['Show notes', 'Transcripts'],
        value: 'Written content for SEO',
      },
      {
        programme: "Kaywana's Court",
        roles: ['Voice actor', 'Performance coaching'],
        value: 'Elevated storytelling',
      },
      {
        programme: 'TECHreneurs',
        roles: ['Sponsorship coordinator', 'Revenue strategist'],
        value: 'Sustainable income',
      },
    ];

    const toggleCollaborator = (programme: string, role: string) => {
      const exists = episodeData.collaborators.find(c => c.programme === programme && c.role === role);
      if (exists) {
        setEpisodeData({
          ...episodeData,
          collaborators: episodeData.collaborators.filter(c => !(c.programme === programme && c.role === role))
        });
      } else {
        setEpisodeData({
          ...episodeData,
          collaborators: [...episodeData.collaborators, { programme, role }]
        });
      }
    };

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Even solo productions benefit from collaborators. You focus on content - others add polish. Everyone earns."
        />

        <div className={localStyles.collaborationGrid}>
          {collaborationOptions.map(option => (
            <div key={option.programme} className={localStyles.collaborationOption}>
              <h4>{option.programme}</h4>
              <p>{option.value}</p>
              
              <div className={localStyles.roleCheckboxes}>
                {option.roles.map(role => {
                  const isSelected = episodeData.collaborators.some(c => c.programme === option.programme && c.role === role);
                  return (
                    <label key={role}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCollaborator(option.programme, role)}
                      />
                      <span>{role}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(4)}
          onNext={() => planner.setCurrentStep(6)}
          canProceed={true}
          nextLabel="Next: Monetization →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 6: MONETIZATION
  // ========================================

  const renderMonetizationStep = () => {
    const monetizationOptions = [
      { id: 'sponsorships', label: 'Local sponsorships (£50-200/ep)' },
      { id: 'premium', label: 'Premium content (£2-5/mo)' },
      { id: 'teaching', label: 'Tutorial licensing (£15-40)' },
      { id: 'commissions', label: 'Community commissions (£100-300)' },
    ];

    const toggleMonetization = (id: string) => {
      const updated = episodeData.monetizationStrategy.includes(id)
        ? episodeData.monetizationStrategy.filter(m => m !== id)
        : [...episodeData.monetizationStrategy, id];
      setEpisodeData({ ...episodeData, monetizationStrategy: updated });
    };

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Good content deserves compensation. Multiple revenue streams = sustainability."
        />

        <div className={localStyles.monetizationGrid}>
          {monetizationOptions.map(option => (
            <label key={option.id} className={localStyles.monetizationCard}>
              <input
                type="checkbox"
                checked={episodeData.monetizationStrategy.includes(option.id)}
                onChange={() => toggleMonetization(option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className={localStyles.seriesCheck}>
          <label>
            <input
              type="checkbox"
              checked={episodeData.seriesPotential}
              onChange={(e) => setEpisodeData({...episodeData, seriesPotential: e.target.checked})}
            />
            <span>This could become a series</span>
          </label>
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(5)}
          onNext={() => planner.setCurrentStep(7)}
          canProceed={episodeData.monetizationStrategy.length > 0}
          nextLabel="Next: Distribution →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 7: DISTRIBUTION
  // ========================================

  const renderDistributionStep = () => {
    const platformOptions = [
      { id: 'raydyo', label: 'Rayd-yo (primary)', required: true },
      { id: 'spotify', label: 'Spotify' },
      { id: 'youtube', label: 'YouTube' },
      { id: 'joystick', label: 'Joystick article' },
      { id: 'social', label: 'Social media clips' },
    ];

    const togglePlatform = (id: string) => {
      if (id === 'raydyo') return; // Always required
      const updated = episodeData.crossPlatform.includes(id)
        ? episodeData.crossPlatform.filter(p => p !== id)
        : [...episodeData.crossPlatform, id];
      setEpisodeData({ ...episodeData, crossPlatform: updated });
    };

    // Ensure raydyo is always included
    useEffect(() => {
      if (!episodeData.crossPlatform.includes('raydyo')) {
        setEpisodeData({
          ...episodeData,
          crossPlatform: ['raydyo', ...episodeData.crossPlatform]
        });
      }
    }, [episodeData]);

    return (
      <div className={styles.stepContent}>
        <MayaConversation 
          message="Distribution strategy matters. Start with Rayd-yo, then expand. More platforms = more discovery = more income."
        />

        <div className={localStyles.platformGrid}>
          {platformOptions.map(option => (
            <label key={option.id}>
              <input
                type="checkbox"
                checked={episodeData.crossPlatform.includes(option.id)}
                onChange={() => togglePlatform(option.id)}
                disabled={option.required}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <div className={localStyles.teachingContent}>
          <label>
            <input
              type="checkbox"
              checked={episodeData.teachingContentValue}
              onChange={(e) => setEpisodeData({...episodeData, teachingContentValue: e.target.checked})}
            />
            <span>Create "How We Made This" tutorial (£15-40/sale)</span>
          </label>
        </div>

        <NavigationButtons
          onBack={() => planner.setCurrentStep(6)}
          onNext={() => {
            generateProductionPlan();
            calculateRevenueProjection();
            planner.setCurrentStep(8);
          }}
          canProceed={episodeData.crossPlatform.length >= 2}
          nextLabel="Generate Production Plan →"
        />
      </div>
    );
  };

  // ========================================
  // STEP 8: PRODUCTION PLAN
  // ========================================

  const renderProductionPlanStep = () => (
    <div className={styles.stepContent}>
      <MayaConversation 
        message="Here's your complete production plan - structure, team, monetization, distribution. Time to record."
      />

      <div className={localStyles.generatedPlan}>
        <pre>{generatedPlan}</pre>
      </div>

      {revenueProjection && (
        <div className={localStyles.revenueProjection}>
          <h3>💰 Revenue Projection</h3>
          <p>Single episode: £{revenueProjection.baseValue + revenueProjection.collabValue + revenueProjection.monetizationValue}</p>
          {episodeData.seriesPotential && (
            <p>8-episode series: £{revenueProjection.seriesTotal}</p>
          )}
        </div>
      )}

      <div className={localStyles.planActions}>
        <button
          className={localStyles.downloadButton}
          onClick={() => planner.handleDownload(generatedPlan, `podcast-plan-${Date.now()}.txt`)}
        >
          📥 Download Plan
        </button>
        
        <button
          className={localStyles.resetButton}
          onClick={() => {
            planner.resetPlanner();
            setEpisodeData({
              episodeTitle: '',
              contentType: null,
              targetAudience: '',
              coreMessage: '',
              episodeLength: 30,
              segmentBreakdown: [],
              productionScale: null,
              equipmentNeeded: [],
              skillsRequired: [],
              collaborators: [],
              monetizationStrategy: [],
              sponsorshipTarget: '',
              premiumContentPlan: '',
              seriesPotential: false,
              crossPlatform: ['raydyo'],
              teachingContentValue: false,
            });
            setGeneratedPlan('');
            setRevenueProjection(null);
          }}
        >
          🔄 Plan Another Episode
        </button>
      </div>
    </div>
  );

  // ========================================
  // PLAN GENERATION
  // ========================================

  const generateProductionPlan = () => {
    const totalTime = episodeData.segmentBreakdown.reduce((sum, seg) => sum + seg.duration, 0);
    
    const plan = `
╔═══════════════════════════════════════════════════════════╗
║     WEMBLEY WONDERS G-TECH CASTERS PRODUCTION PLAN        ║
╚═══════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleDateString('en-GB')}

EPISODE OVERVIEW
────────────────────────────────────────────────────────────
Title: ${episodeData.episodeTitle}
Format: ${episodeData.contentType?.toUpperCase().replace('-', ' ')}
Target Length: ${episodeData.episodeLength} minutes
Target Audience: ${episodeData.targetAudience}
Core Message: ${episodeData.coreMessage}

EPISODE STRUCTURE (${totalTime} min total)
────────────────────────────────────────────────────────────
${episodeData.segmentBreakdown.map((seg, idx) => `
${idx + 1}. ${seg.segment} (${seg.duration} min)
   Purpose: ${seg.purpose}
`).join('')}

PRODUCTION DETAILS
────────────────────────────────────────────────────────────
Scale: ${episodeData.productionScale?.toUpperCase().replace('-', ' ')}

Equipment:
${episodeData.equipmentNeeded.map(e => `  • ${e}`).join('\n')}

Skills:
${episodeData.skillsRequired.map(s => `  • ${s}`).join('\n')}

TEAM & COLLABORATORS
────────────────────────────────────────────────────────────
${episodeData.collaborators.length > 0 
  ? `Team Size: ${episodeData.collaborators.length + 1}\n\nRoles:\n  • You: Host/Producer\n${episodeData.collaborators.map(c => `  • ${c.programme}: ${c.role}`).join('\n')}`
  : 'Solo Production with ROV guidance'}

MONETIZATION
────────────────────────────────────────────────────────────
Revenue Streams:
${episodeData.monetizationStrategy.map(s => `  • ${s.charAt(0).toUpperCase() + s.slice(1)}`).join('\n')}

${episodeData.seriesPotential ? '🔄 Series Potential: YES\n' : ''}

DISTRIBUTION
────────────────────────────────────────────────────────────
Platforms:
${episodeData.crossPlatform.map(p => `  • ${p.charAt(0).toUpperCase() + p.slice(1)}`).join('\n')}

${episodeData.teachingContentValue ? '📚 Teaching Content: YES\n' : ''}

NEXT STEPS
────────────────────────────────────────────────────────────
1. Join G-Tech Casters: wembleywonders.org/membership
2. Book studio time (equipment included)
3. Record within 2 weeks
4. Publish to Rayd-yo
5. Track revenue streams

G-Tech Casters | The voice of Wembley Wonders
wembleywonders.org
    `.trim();

    setGeneratedPlan(plan);
  };

  const calculateRevenueProjection = () => {
    const baseValue = episodeData.productionScale === 'solo' ? 50 
                    : episodeData.productionScale === 'collaborative' ? 175 
                    : 550;
    
    const collabValue = episodeData.collaborators.length * 35;
    
    let monetizationValue = 0;
    if (episodeData.monetizationStrategy.includes('sponsorships')) monetizationValue += 125;
    if (episodeData.monetizationStrategy.includes('premium')) monetizationValue += 60;
    if (episodeData.monetizationStrategy.includes('teaching')) monetizationValue += 25;
    if (episodeData.monetizationStrategy.includes('commissions')) monetizationValue += 200;
    
    const singleEpisodeTotal = baseValue + collabValue + monetizationValue;
    const seriesTotal = episodeData.seriesPotential ? singleEpisodeTotal * 8 : singleEpisodeTotal;
    const teachingValue = episodeData.teachingContentValue ? 30 : 0;
    
    setRevenueProjection({
      baseValue,
      collabValue,
      monetizationValue,
      seriesTotal,
      teachingValue,
      total: seriesTotal + (teachingValue * 3)
    });
  };

  // ========================================
  // MAIN RENDER
  // ========================================

  return (
    <div className={styles.plannerContainer}>
      <ProgressBar
        currentStep={planner.currentStep}
        totalSteps={8}
      />

      {renderStep()}

      {planner.showConversionModal && (
        <ConversionModal
          downloadCount={planner.downloadCount}
          onClose={() => planner.setShowConversionModal(false)}
          programmeName="G-Tech Casters"
          programmeUrl="/membership"
        />
      )}
    </div>
  );
};

export default PodcastCreator;