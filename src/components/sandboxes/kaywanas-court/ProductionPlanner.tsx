import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductionPlanner.module.css';

interface Season {
  id: string;
  name: string;
  months: string;
  theme: string;
  energy: string;
  icon: string;
  suggestedTypes: string[];
}

interface ProductionType {
  id: string;
  name: string;
  description: string;
  duration: string;
  icon: string;
}

interface ProgrammeContribution {
  programme: string;
  icon: string;
  role: string;
  weeks: string;
  sessions: string;
  teamSize: string;
  details: string[];
}

interface BudgetTemplate {
  range: string;
  amount: string;
  description: string;
  revenueModel: string;
  techReneursWorkshop: string;
}

const ProductionPlanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'season' | 'type' | 'budget' | 'breakdown' | 'download'>('intro');
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedType, setSelectedType] = useState<ProductionType | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetTemplate | null>(null);
  const [downloadsUsed, setDownloadsUsed] = useState<number>(0);
  const [showConversionModal, setShowConversionModal] = useState<boolean>(false);
  const [conversionType, setConversionType] = useState<'first' | 'third' | 'explore'>('first');

  // Load downloads from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('productionPlannerDownloads');
    if (saved) {
      setDownloadsUsed(parseInt(saved, 10));
    }
  }, []);

  const seasons: Season[] = [
    {
      id: 'carnival',
      name: 'Carnival Season',
      months: 'January - March',
      theme: 'Celebration, Liberation, Joy',
      energy: 'High-energy, colorful, music-driven',
      icon: '🎉',
      suggestedTypes: ['musical', 'cultural', 'cosplay']
    },
    {
      id: 'heritage',
      name: 'Heritage Season',
      months: 'April - June',
      theme: 'Roots, Ancestors, Preservation',
      energy: 'Reflective, storytelling, educational',
      icon: '🌿',
      suggestedTypes: ['play', 'storytelling', 'spoken-word']
    },
    {
      id: 'harvest',
      name: 'Harvest Season',
      months: 'July - September',
      theme: 'Abundance, Community, Gratitude',
      energy: 'Collaborative, celebratory, grounding',
      icon: '🌾',
      suggestedTypes: ['cultural', 'larp', 'showcase']
    },
    {
      id: 'storytelling',
      name: 'Storytelling Season',
      months: 'October - December',
      theme: 'Wisdom, Tradition, Legacy',
      energy: 'Intimate, mystical, intergenerational',
      icon: '📖',
      suggestedTypes: ['spoken-word', 'play', 'storytelling']
    }
  ];

  const productionTypes: ProductionType[] = [
    {
      id: 'play',
      name: 'One-Act Play',
      description: '30-45 minute scripted theatre with characters, scenes, and narrative arc',
      duration: '30-45 minutes',
      icon: '🎭'
    },
    {
      id: 'spoken-word',
      name: 'Spoken Word Showcase',
      description: 'Poetry, monologues, and performance poetry featuring multiple voices',
      duration: '45-60 minutes',
      icon: '🎤'
    },
    {
      id: 'musical',
      name: 'Musical Performance',
      description: 'Live music, singing, dance integration with storytelling',
      duration: '40-60 minutes',
      icon: '🎵'
    },
    {
      id: 'cultural',
      name: 'Cultural Celebration',
      description: 'Festival, ceremony, or heritage event honoring traditions',
      duration: '1-3 hours',
      icon: '🎊'
    },
    {
      id: 'storytelling',
      name: 'Community Storytelling',
      description: 'Oral tradition, personal narratives, and collective memory sharing',
      duration: '60-90 minutes',
      icon: '📚'
    },
    {
      id: 'larp',
      name: 'LARP Experience',
      description: 'Interactive roleplay performance, outreach-focused, "theatre on the road"',
      duration: '2-4 hours',
      icon: '⚔️'
    },
    {
      id: 'cosplay',
      name: 'Cosplay Showcase',
      description: 'Costume competition and literary character interpretation event',
      duration: '2-3 hours',
      icon: '👗'
    }
  ];

  const budgetTemplates: BudgetTemplate[] = [
    {
      range: 'shoestring',
      amount: '£500 - £1,000',
      description: 'Community-focused production with minimal tech and borrowed resources',
      revenueModel: 'Free community event, donation-based',
      techReneursWorkshop: 'Bootstrap Budgeting: Maximizing Community Resources'
    },
    {
      range: 'standard',
      amount: '£1,500 - £2,500',
      description: 'Professional production with costumes, simple set, lighting, and sound',
      revenueModel: '£5-10 tickets, break-even focused',
      techReneursWorkshop: 'Professional Budgeting & Ticket Pricing Strategy'
    },
    {
      range: 'ambitious',
      amount: '£3,000 - £5,000+',
      description: 'Full-scale production with extensive tech, costumes, set design, marketing',
      revenueModel: '£10-15 tickets, profit-sharing with participants',
      techReneursWorkshop: 'Investment Pitch & Sponsorship Acquisition'
    }
  ];

  const getProgrammeBreakdown = (): ProgrammeContribution[] => {
    return [
      {
        programme: 'Pageturners',
        icon: '📖',
        role: 'Script Development & Narrative',
        weeks: '8 weeks',
        sessions: 'Tuesdays 7-9pm',
        teamSize: '6-8 writers collaborative',
        details: [
          selectedType?.id === 'play' ? 'Develop full script with character arcs' : 
          selectedType?.id === 'spoken-word' ? 'Create spoken word pieces and performance text' :
          selectedType?.id === 'larp' ? 'Write interactive scenarios and character backstories' :
          'Adapt stories or create narrative framework',
          'Workshop dialogue and scenes together',
          'Integrate heritage themes and cultural context',
          'Final script polish and performance notes'
        ]
      },
      {
        programme: 'STEMgeneers',
        icon: '🔧',
        role: 'Set Design & Technical Implementation',
        weeks: selectedBudget?.range === 'shoestring' ? '3-4 weeks' : selectedBudget?.range === 'standard' ? '4-6 weeks' : '6-8 weeks',
        sessions: 'Thursdays 6-8pm',
        teamSize: '4-6 technical crew',
        details: [
          selectedBudget?.range === 'shoestring' ? 'Simple backdrop and minimal tech setup' :
          selectedBudget?.range === 'standard' ? 'Professional set design with lighting and sound' :
          'Advanced tech: projection mapping, automated lighting, professional sound',
          'Stage engineering and safety',
          'Lighting design and cues',
          'Sound system setup and management',
          'Technical rehearsals and troubleshooting'
        ]
      },
      {
        programme: 'TECHreneurs',
        icon: '💼',
        role: 'Budget, Marketing & Business Management',
        weeks: 'Ongoing throughout production',
        sessions: 'Mondays 6-8pm',
        teamSize: '2-3 business managers',
        details: [
          `Budget management: ${selectedBudget?.amount || '£1,500-£2,500'}`,
          `Workshop: ${selectedBudget?.techReneursWorkshop || 'Professional Budgeting'}`,
          'Marketing timeline: 6 weeks pre-show',
          'Social media campaign and poster design',
          'Ticket sales and box office management',
          'Sponsorship outreach (if applicable)',
          'Post-show analysis and revenue distribution'
        ]
      },
      {
        programme: 'Silk Stilettos',
        icon: '👗',
        role: 'Costume Design & Wardrobe',
        weeks: '6 weeks',
        sessions: 'Wednesdays 6-8pm',
        teamSize: '3-5 costume designers',
        details: [
          selectedType?.id === 'cosplay' ? 'Competition-level costume creation' :
          selectedType?.id === 'cultural' ? 'Traditional/heritage costume adaptation' :
          'Character-based costume design',
          'Fabric sourcing and material selection',
          'Costume construction and fittings',
          'Wardrobe management during performances',
          selectedSeason?.id === 'carnival' ? 'Vibrant, colorful carnival-inspired designs' : 'Period or thematic styling'
        ]
      },
      {
        programme: 'Trubble n Bass',
        icon: '🎵',
        role: 'Sound Design & Musical Direction',
        weeks: '5 weeks',
        sessions: 'Fridays 7-9pm',
        teamSize: '2-4 musicians/sound designers',
        details: [
          selectedType?.id === 'musical' ? 'Full musical direction and live performance' :
          selectedType?.id === 'spoken-word' ? 'Atmospheric soundscapes and transitions' :
          'Background music and sound effects',
          'Live performance elements (if applicable)',
          'Audio recording and mixing',
          'Sound cues and technical integration',
          'Broadcast-ready audio for Rayd-yo'
        ]
      }
    ];
  };

  const getTimeline = () => {
    return [
      { phase: 'Week 1-2', activity: 'Concept Development & Proposal', description: 'Community collaborative consensus vote on seasonal shows' },
      { phase: 'Week 3-10', activity: 'Creation Phase', description: 'All programmes working: scripts, sets, costumes, music, marketing' },
      { phase: 'Week 11-12', activity: 'Integration & Rehearsal', description: 'Cross-programme collaboration, full run-throughs, technical integration' },
      { phase: 'Week 13', activity: 'Performance Week', description: 'Live performances on The Grand Stage, community attendance' },
      { phase: 'Week 14', activity: 'Broadcast & Review', description: 'Rayd-yo broadcast, Joystick e-zine reviews, community celebration' }
    ];
  };

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
    setCurrentStep('type');
  };

  const handleTypeSelect = (type: ProductionType) => {
    setSelectedType(type);
    setCurrentStep('budget');
  };

  const handleBudgetSelect = (budget: BudgetTemplate) => {
    setSelectedBudget(budget);
    setCurrentStep('breakdown');
  };

  const handleDownload = () => {
    if (downloadsUsed >= 3) {
      // Show "join to continue" modal
      setConversionType('third');
      setShowConversionModal(true);
      return;
    }

    // Generate the production plan text
    const planText = generateProductionPlan();
    
    // Create downloadable file
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `production-plan-${selectedSeason?.id}-${selectedType?.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    // Update downloads count
    const newCount = downloadsUsed + 1;
    setDownloadsUsed(newCount);
    localStorage.setItem('productionPlannerDownloads', newCount.toString());

    // Show conversion modal after first download
    if (newCount === 1) {
      setTimeout(() => {
        setConversionType('first');
        setShowConversionModal(true);
      }, 1000);
    }

    // Move to download screen
    setCurrentStep('download');
  };

  const generateProductionPlan = (): string => {
    const breakdown = getProgrammeBreakdown();
    const timeline = getTimeline();
    
    return `
═══════════════════════════════════════════════════════════
  KAYWANA'S COURT PRODUCTION PLAN
  Generated by Wembley Wonders Production Planner
═══════════════════════════════════════════════════════════

PRODUCTION OVERVIEW
─────────────────────────────────────────────────────────

Season: ${selectedSeason?.name} (${selectedSeason?.months})
Theme: ${selectedSeason?.theme}
Energy: ${selectedSeason?.energy}

Production Type: ${selectedType?.name}
Duration: ${selectedType?.duration}
Description: ${selectedType?.description}

Budget: ${selectedBudget?.amount}
Revenue Model: ${selectedBudget?.revenueModel}

═══════════════════════════════════════════════════════════
  CROSS-PROGRAMME COLLABORATION
═══════════════════════════════════════════════════════════

${breakdown.map(prog => `
${prog.icon} ${prog.programme.toUpperCase()}
─────────────────────────────────────────────────────────
Role: ${prog.role}
Timeline: ${prog.weeks}
Sessions: ${prog.sessions}
Team Size: ${prog.teamSize}

Responsibilities:
${prog.details.map((detail, i) => `  ${i + 1}. ${detail}`).join('\n')}

`).join('\n')}

═══════════════════════════════════════════════════════════
  PRODUCTION TIMELINE (14 Weeks)
═══════════════════════════════════════════════════════════

${timeline.map(phase => `
${phase.phase}: ${phase.activity}
${phase.description}
`).join('\n')}

═══════════════════════════════════════════════════════════
  TECHRENEURS BUSINESS SUPPORT
═══════════════════════════════════════════════════════════

Budget Workshop: ${selectedBudget?.techReneursWorkshop}

Learn to:
• Create detailed production budgets
• Develop ticket pricing strategies
• Run marketing campaigns for shows
• Pitch production concepts to funders
• Manage sponsorship relationships
• Track revenue and distribute participant earnings

Join TECHreneurs: /programmes/techreneurs

═══════════════════════════════════════════════════════════
  NEXT STEPS
═══════════════════════════════════════════════════════════

As a FREE USER, you can plan productions but cannot submit
proposals or join production teams.

JOIN WEMBLEY WONDERS to:
✓ Submit this production proposal to the community
✓ Vote on seasonal show selection (collaborative consensus)
✓ Join cross-programme production teams
✓ Perform or produce on The Grand Stage
✓ Get featured in Joystick e-zine reviews
✓ Have your work broadcast on Rayd-yo
✓ Build your portfolio with permanent DOI
✓ Earn revenue share (55% for participants)

Membership from £15/month:
• £15/mo: 1 programme + Kaywana's Court access
• £35/mo: 3 programmes + priority casting
• £50/mo: ALL 9 programmes + leadership opportunities

Sliding scale available — we don't gatekeep talent.

Visit: www.wembleywonders.org/get-started

─────────────────────────────────────────────────────────
Dedicated to Pearl Connor, Yvonne Brewster, Norman Beaton
They showed us collaborative performance changes communities.
Your show continues their legacy.
─────────────────────────────────────────────────────────

Created with Wembley Wonders Production Planner
www.wembleywonders.org/programmes/kaywanas-court/sandbox
    `.trim();
  };

  const resetPlanner = () => {
    setCurrentStep('season');
    setSelectedSeason(null);
    setSelectedType(null);
    setSelectedBudget(null);
  };

  return (
    <div className={styles.planner}>
      
      {/* Intro Screen */}
      {currentStep === 'intro' && (
        <div className={styles.introScreen}>
          <div className={styles.introIcon}>🎭</div>
          <h2>Welcome to the Production Planner</h2>
          <p className={styles.introText}>
            Plan a seasonal production and see exactly how all five Wembley Wonders programmes 
            collaborate to bring shows to life on The Grand Stage.
          </p>
          <div className={styles.introFeatures}>
            <div className={styles.featureTag}>📖 Writers + 🔧 Tech + 💼 Business + 👗 Design + 🎵 Music</div>
            <div className={styles.featureTag}>4 Cultural Seasons • 7 Production Types • 3 Budget Levels</div>
            <div className={styles.featureTag}>Free: 3 production plans • Member: Unlimited + real participation</div>
          </div>
          <div className={styles.downloadsIndicator}>
            <span>Free Plans Remaining: {3 - downloadsUsed}/3</span>
          </div>
          <button 
            className={styles.startButton}
            onClick={() => setCurrentStep('season')}
          >
            Start Planning Your Show →
          </button>
        </div>
      )}

      {/* Season Selection */}
      {currentStep === 'season' && (
        <div className={styles.selectionScreen}>
          <h2>Step 1: Choose Your Cultural Season</h2>
          <p className={styles.stepDescription}>
            We follow cultural rhythms, not the traditional calendar. Select the season that 
            aligns with your creative vision.
          </p>
          
          <div className={styles.seasonGrid}>
            {seasons.map(season => (
              <button
                key={season.id}
                className={styles.seasonCard}
                onClick={() => handleSeasonSelect(season)}
              >
                <div className={styles.seasonCardIcon}>{season.icon}</div>
                <h3>{season.name}</h3>
                <span className={styles.seasonMonths}>{season.months}</span>
                <p className={styles.seasonTheme}>{season.theme}</p>
                <p className={styles.seasonEnergy}>{season.energy}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Production Type Selection */}
      {currentStep === 'type' && selectedSeason && (
        <div className={styles.selectionScreen}>
          <div className={styles.breadcrumb}>
            <button onClick={() => setCurrentStep('season')}>← Change Season</button>
            <span>{selectedSeason.icon} {selectedSeason.name}</span>
          </div>
          
          <h2>Step 2: Choose Your Production Type</h2>
          <p className={styles.stepDescription}>
            What format best expresses your vision for {selectedSeason.name}?
          </p>

          <div className={styles.typeGrid}>
            {productionTypes.map(type => {
              const isSuggested = selectedSeason.suggestedTypes.includes(type.id);
              return (
                <button
                  key={type.id}
                  className={`${styles.typeCard} ${isSuggested ? styles.typeSuggested : ''}`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {isSuggested && <span className={styles.suggestedBadge}>Suggested for this season</span>}
                  <div className={styles.typeIcon}>{type.icon}</div>
                  <h3>{type.name}</h3>
                  <p className={styles.typeDuration}>{type.duration}</p>
                  <p className={styles.typeDescription}>{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Budget Selection */}
      {currentStep === 'budget' && selectedType && (
        <div className={styles.selectionScreen}>
          <div className={styles.breadcrumb}>
            <button onClick={() => setCurrentStep('type')}>← Change Type</button>
            <span>{selectedType.icon} {selectedType.name}</span>
          </div>

          <h2>Step 3: Choose Your Budget Level</h2>
          <p className={styles.stepDescription}>
            TECHreneurs will help you manage finances, marketing, and ticket sales. 
            Select a budget range that fits your production ambitions.
          </p>

          <div className={styles.budgetGrid}>
            {budgetTemplates.map(budget => (
              <button
                key={budget.range}
                className={styles.budgetCard}
                onClick={() => handleBudgetSelect(budget)}
              >
                <h3>{budget.amount}</h3>
                <p className={styles.budgetDescription}>{budget.description}</p>
                <div className={styles.budgetDetails}>
                  <p><strong>Revenue Model:</strong> {budget.revenueModel}</p>
                  <p className={styles.techReneursTag}>
                    💼 TECHreneurs Workshop: {budget.techReneursWorkshop}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.techReneursCallout}>
            <h4>💼 Want to lead the business side of productions?</h4>
            <p>
              TECHreneurs teaches you how to create production budgets, market shows, 
              and pitch concepts to funders. Join TECHreneurs to become a production manager!
            </p>
            <Link to="/programmes/techreneurs" className={styles.techReneursLink}>
              Explore TECHreneurs Programme →
            </Link>
          </div>
        </div>
      )}

      {/* Production Breakdown */}
      {currentStep === 'breakdown' && selectedBudget && (
        <div className={styles.breakdownScreen}>
          <div className={styles.breadcrumb}>
            <button onClick={() => setCurrentStep('budget')}>← Change Budget</button>
            <span>{selectedBudget.amount}</span>
          </div>

          <h2>Your Production Plan</h2>
          <div className={styles.planSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Season:</span>
              <span>{selectedSeason?.icon} {selectedSeason?.name}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Type:</span>
              <span>{selectedType?.icon} {selectedType?.name}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Budget:</span>
              <span>{selectedBudget.amount}</span>
            </div>
          </div>

          <h3 className={styles.breakdownTitle}>Cross-Programme Collaboration</h3>
          <p className={styles.breakdownIntro}>
            Here's how each programme contributes to making your show a reality:
          </p>

          <div className={styles.programmeBreakdown}>
            {getProgrammeBreakdown().map((prog, index) => (
              <div key={index} className={styles.programmeBlock}>
                <div className={styles.programmeHeader}>
                  <span className={styles.programmeIcon}>{prog.icon}</span>
                  <div>
                    <h4>{prog.programme}</h4>
                    <p className={styles.programmeRole}>{prog.role}</p>
                  </div>
                </div>
                <div className={styles.programmeInfo}>
                  <div className={styles.infoItem}>
                    <strong>Timeline:</strong> {prog.weeks}
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Sessions:</strong> {prog.sessions}
                  </div>
                  <div className={styles.infoItem}>
                    <strong>Team Size:</strong> {prog.teamSize}
                  </div>
                </div>
                <ul className={styles.programmeDetails}>
                  {prog.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className={styles.timelineTitle}>Production Timeline (14 Weeks)</h3>
          <div className={styles.timeline}>
            {getTimeline().map((phase, index) => (
              <div key={index} className={styles.timelinePhase}>
                <div className={styles.phaseWeek}>{phase.phase}</div>
                <div className={styles.phaseContent}>
                  <h5>{phase.activity}</h5>
                  <p>{phase.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actionButtons}>
            <button 
              className={styles.downloadButton}
              onClick={handleDownload}
              disabled={downloadsUsed >= 3}
            >
              {downloadsUsed >= 3 ? '🔒 Join to Download More' : `📥 Download Plan (${3 - downloadsUsed} remaining)`}
            </button>
            <button 
              className={styles.resetButton}
              onClick={resetPlanner}
            >
              Plan Another Show
            </button>
          </div>
        </div>
      )}

      {/* Download Success Screen */}
      {currentStep === 'download' && (
        <div className={styles.downloadScreen}>
          <div className={styles.downloadIcon}>✅</div>
          <h2>Production Plan Downloaded!</h2>
          <p className={styles.downloadText}>
            Your {selectedType?.name} plan for {selectedSeason?.name} has been saved as a .txt file.
          </p>
          
          <div className={styles.downloadStats}>
            <span>Free Downloads Used: {downloadsUsed}/3</span>
          </div>

          {downloadsUsed < 3 && (
            <p className={styles.downloadRemaining}>
              You have <strong>{3 - downloadsUsed} free plan{downloadsUsed === 2 ? '' : 's'}</strong> remaining.
            </p>
          )}

          {downloadsUsed >= 3 && (
            <div className={styles.downloadLimit}>
              <p>You've used all 3 free production plans!</p>
              <p>Join Wembley Wonders to submit unlimited proposals and participate in real productions.</p>
            </div>
          )}

          <div className={styles.downloadActions}>
            <button 
              className={styles.planAnotherButton}
              onClick={resetPlanner}
              disabled={downloadsUsed >= 3}
            >
              {downloadsUsed >= 3 ? '🔒 Join to Plan More' : 'Plan Another Show'}
            </button>
            <Link to="/get-started" className={styles.joinButton}>
              Join to Make This Real
            </Link>
          </div>
        </div>
      )}

      {/* Conversion Modal */}
      {showConversionModal && (
        <div className={styles.modalOverlay} onClick={() => setShowConversionModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose}
              onClick={() => setShowConversionModal(false)}
            >
              ×
            </button>

            {conversionType === 'first' && (
              <>
                <h3>🎉 Great Start!</h3>
                <p>
                  You've planned your first show and seen how collaborative production works 
                  at Wembley Wonders. Want to make this real?
                </p>
                <div className={styles.modalFeatures}>
                  <h4>Members Can:</h4>
                  <ul>
                    <li>✓ Submit unlimited production proposals</li>
                    <li>✓ Vote on seasonal show selection</li>
                    <li>✓ Join cross-programme production teams</li>
                    <li>✓ Perform/produce on The Grand Stage</li>
                    <li>✓ Get featured in Joystick & Rayd-yo</li>
                    <li>✓ Earn revenue share (55%)</li>
                  </ul>
                </div>
                <div className={styles.modalActions}>
                  <Link to="/get-started" className={styles.modalButtonPrimary}>
                    Join to Make This Real
                  </Link>
                  <button 
                    className={styles.modalButtonSecondary}
                    onClick={() => setShowConversionModal(false)}
                  >
                    Keep Planning ({3 - downloadsUsed} plans left)
                  </button>
                </div>
                <p className={styles.modalNote}>
                  You have {3 - downloadsUsed} free plan{downloadsUsed === 2 ? '' : 's'} remaining.
                </p>
              </>
            )}

            {conversionType === 'third' && (
              <>
                <h3>🎭 You've Planned 3 Shows!</h3>
                <p>
                  You clearly love collaborative performance. Join Wembley Wonders to turn 
                  these plans into reality and participate in seasonal productions.
                </p>
                <div className={styles.modalPricing}>
                  <div className={styles.pricingOption}>
                    <strong>£15/month</strong>
                    <span>1 programme + Kaywana's Court</span>
                  </div>
                  <div className={styles.pricingOption}>
                    <strong>£35/month</strong>
                    <span>3 programmes + priority casting</span>
                  </div>
                  <div className={`${styles.pricingOption} ${styles.pricingBest}`}>
                    <span className={styles.bestBadge}>BEST VALUE</span>
                    <strong>£50/month</strong>
                    <span>ALL 9 programmes + leadership</span>
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <Link to="/get-started" className={styles.modalButtonPrimary}>
                    Join Now
                  </Link>
                  <Link to="/programmes" className={styles.modalButtonSecondary}>
                    Learn About Programmes
                  </Link>
                </div>
                <p className={styles.modalNote}>
                  💚 Sliding scale available — we don't gatekeep talent.
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductionPlanner;