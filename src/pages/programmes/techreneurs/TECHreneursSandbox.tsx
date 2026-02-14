import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import styles from './TECHreneursSandbox.module.css';

type ActivityType = 
  | 'pardner-documenter' 
  | 'ecosystem-income-mapper' 
  | 'pardner-calculator' 
  | 'conversation-starter'
  | 'gap-finder'
  | 'b2b-explorer'
  | 'succession-navigator'
  | null;

// ========================================
// PARDNER HERITAGE DOCUMENTER (preserved)
// ========================================

interface PardnerMemory {
  whoRan: string;
  relationship: string;
  howManyPeople: string;
  contribution: string;
  frequency: string;
  whatUsedFor: string[];
  howTrustMaintained: string;
  whatHappenedDefault: string;
  howLongRan: string;
  stillRunning: boolean;
  traditionName: string;
  additionalMemories: string;
}

const PardnerDocumenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [memory, setMemory] = useState<Partial<PardnerMemory>>({
    whatUsedFor: []
  });
  const [step, setStep] = useState(1);

  const usageOptions = [
    "House deposit / rent",
    "Business start-up",
    "Equipment purchase",
    "School fees / education",
    "Wedding / celebration",
    "Emergency fund",
    "Sending money home",
    "Funeral costs",
    "Car purchase",
    "Home improvements",
    "Medical expenses",
    "Other"
  ];

  const handleUsageToggle = (option: string) => {
    const current = memory.whatUsedFor || [];
    if (current.includes(option)) {
      setMemory({ ...memory, whatUsedFor: current.filter(u => u !== option) });
    } else {
      setMemory({ ...memory, whatUsedFor: [...current, option] });
    }
  };

  const handleDownload = () => {
    const content = `
PARDNER HERITAGE DOCUMENTATION
==============================
Captured by Wembley Wonders TECHreneurs Programme

YOUR FAMILY'S PARDNER TRADITION
-------------------------------

Who ran the pardner: ${memory.whoRan || 'Not specified'}
Your relationship to them: ${memory.relationship || 'Not specified'}
What they called it: ${memory.traditionName || 'Pardner'}

THE STRUCTURE
-------------
How many people: ${memory.howManyPeople || 'Not specified'}
Contribution amount: ${memory.contribution || 'Not specified'}
How often: ${memory.frequency || 'Not specified'}
How long did it run: ${memory.howLongRan || 'Not specified'}
Still running: ${memory.stillRunning ? 'Yes' : 'No'}

WHAT THE "HAND" WAS USED FOR
----------------------------
${(memory.whatUsedFor || []).map(u => `• ${u}`).join('\n') || 'Not specified'}

TRUST & ACCOUNTABILITY
----------------------
How was trust maintained:
${memory.howTrustMaintained || 'Not specified'}

What happened if someone couldn't pay:
${memory.whatHappenedDefault || 'Not specified'}

ADDITIONAL MEMORIES
-------------------
${memory.additionalMemories || 'None recorded'}

==============================
This is heritage economic wisdom. Your family had financial 
intelligence that didn't need banks. The businesses that built 
Brent's wealth used these same principles.

Learn more: wembleywonders.org/programmes/techreneurs
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pardner-heritage-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.documenterContainer}>
      <div className={styles.documenterHeader}>
        <h2>📜 Pardner Heritage Documenter</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.documenterIntro}>
        <p>
          Your grandmother's pardner wasn't just saving — it was community economics. 
          The same principles built the construction firms, property companies, and 
          wholesalers that make Brent one of London's wealthiest Black communities.
        </p>
      </div>

      {step === 1 && (
        <div className={styles.documenterStep}>
          <h3>Step 1: Who Ran the Pardner?</h3>
          
          <div className={styles.formGroup}>
            <label>Who in your family ran a pardner/susu/box hand?</label>
            <input 
              type="text"
              placeholder="e.g., My grandmother, My aunt, My mother's friend"
              value={memory.whoRan || ''}
              onChange={(e) => setMemory({ ...memory, whoRan: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Your relationship to them</label>
            <select 
              value={memory.relationship || ''}
              onChange={(e) => setMemory({ ...memory, relationship: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="grandmother">Grandmother</option>
              <option value="mother">Mother</option>
              <option value="aunt">Aunt</option>
              <option value="family-friend">Family friend</option>
              <option value="community-member">Community member</option>
              <option value="father">Father</option>
              <option value="grandfather">Grandfather</option>
              <option value="uncle">Uncle</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>What did they call it?</label>
            <select 
              value={memory.traditionName || ''}
              onChange={(e) => setMemory({ ...memory, traditionName: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Pardner">Pardner (Jamaica)</option>
              <option value="Susu">Susu (Ghana)</option>
              <option value="Box Hand">Box Hand (Caribbean)</option>
              <option value="Esusu">Esusu (Nigeria)</option>
              <option value="Hagbad">Hagbad (Somalia)</option>
              <option value="Chit">Chit Fund (South Asia)</option>
              <option value="Other">Other / Don't know</option>
            </select>
          </div>

          <button 
            className={styles.nextButton}
            onClick={() => setStep(2)}
            disabled={!memory.whoRan}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.documenterStep}>
          <h3>Step 2: How Did It Work?</h3>
          
          <div className={styles.formGroup}>
            <label>How many people were in the group?</label>
            <select 
              value={memory.howManyPeople || ''}
              onChange={(e) => setMemory({ ...memory, howManyPeople: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="5-8">5-8 people</option>
              <option value="9-12">9-12 people</option>
              <option value="13-20">13-20 people</option>
              <option value="20+">More than 20</option>
              <option value="unknown">Don't know</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>How much did each person contribute?</label>
            <input 
              type="text"
              placeholder="e.g., £20/week, £50/month"
              value={memory.contribution || ''}
              onChange={(e) => setMemory({ ...memory, contribution: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>How often did people contribute?</label>
            <select 
              value={memory.frequency || ''}
              onChange={(e) => setMemory({ ...memory, frequency: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="weekly">Weekly</option>
              <option value="fortnightly">Fortnightly</option>
              <option value="monthly">Monthly</option>
              <option value="unknown">Don't know</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>How long did the pardner run?</label>
            <select 
              value={memory.howLongRan || ''}
              onChange={(e) => setMemory({ ...memory, howLongRan: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="one-cycle">One cycle (everyone got once)</option>
              <option value="1-2-years">1-2 years</option>
              <option value="3-5-years">3-5 years</option>
              <option value="5-10-years">5-10 years</option>
              <option value="10+-years">More than 10 years</option>
              <option value="still-running">Still running today</option>
              <option value="unknown">Don't know</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox"
                checked={memory.stillRunning || false}
                onChange={(e) => setMemory({ ...memory, stillRunning: e.target.checked })}
              />
              This pardner is still running today
            </label>
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.documenterStep}>
          <h3>Step 3: What Was the "Hand" Used For?</h3>
          <p className={styles.stepNote}>Select all that apply from what you remember or were told</p>
          
          <div className={styles.usageGrid}>
            {usageOptions.map((option) => (
              <label key={option} className={styles.usageOption}>
                <input 
                  type="checkbox"
                  checked={(memory.whatUsedFor || []).includes(option)}
                  onChange={() => handleUsageToggle(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(2)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(4)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.documenterStep}>
          <h3>Step 4: Trust & Accountability</h3>
          
          <div className={styles.formGroup}>
            <label>How was trust maintained in the group?</label>
            <textarea 
              placeholder="e.g., Everyone knew each other from church, family connections, community reputation..."
              value={memory.howTrustMaintained || ''}
              onChange={(e) => setMemory({ ...memory, howTrustMaintained: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>What happened if someone couldn't pay?</label>
            <textarea 
              placeholder="e.g., The group helped them, they had to leave, there was a backup system..."
              value={memory.whatHappenedDefault || ''}
              onChange={(e) => setMemory({ ...memory, whatHappenedDefault: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Any other memories or stories about the pardner?</label>
            <textarea 
              placeholder="Share any stories, lessons, or memories you have..."
              value={memory.additionalMemories || ''}
              onChange={(e) => setMemory({ ...memory, additionalMemories: e.target.value })}
            />
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(3)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(5)}>Review →</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className={styles.documenterStep}>
          <h3>Your Pardner Heritage</h3>
          
          <div className={styles.documentSummary}>
            <div className={styles.summarySection}>
              <h4>The Keeper</h4>
              <p><strong>{memory.whoRan}</strong> ({memory.relationship}) ran a <strong>{memory.traditionName || 'pardner'}</strong></p>
            </div>

            <div className={styles.summarySection}>
              <h4>The Structure</h4>
              <p>{memory.howManyPeople} people, contributing {memory.contribution} {memory.frequency}</p>
              <p>Ran for: {memory.howLongRan} {memory.stillRunning && '(still running!)'}</p>
            </div>

            <div className={styles.summarySection}>
              <h4>What the "Hand" Built</h4>
              <ul>
                {(memory.whatUsedFor || []).map((use, i) => (
                  <li key={i}>{use}</li>
                ))}
              </ul>
            </div>

            {memory.howTrustMaintained && (
              <div className={styles.summarySection}>
                <h4>How Trust Worked</h4>
                <p>{memory.howTrustMaintained}</p>
              </div>
            )}

            {memory.additionalMemories && (
              <div className={styles.summarySection}>
                <h4>Your Memories</h4>
                <p>{memory.additionalMemories}</p>
              </div>
            )}
          </div>

          <div className={styles.heritageNote}>
            <p>
              <strong>This is heritage economic wisdom.</strong> The construction firms, 
              property managers, and wholesalers that make Brent wealthy used these same 
              principles — pooling capital, building trust networks, circulating money 
              within the community. You're not starting from scratch. You're inheriting 
              a tradition.
            </p>
          </div>

          <div className={styles.documentActions}>
            <button className={styles.downloadButton} onClick={handleDownload}>
              📥 Download Heritage Document
            </button>
            <button className={styles.backButton} onClick={() => setStep(4)}>← Edit</button>
          </div>

          <div className={styles.nextStepsBox}>
            <h4>What's Next?</h4>
            <p>
              Your family's pardner principles apply today. Use the Gap Finder to discover 
              what existing Brent businesses need, or the B2B Explorer to find opportunities 
              serving the business infrastructure that's already here.
            </p>
            <button 
              className={styles.nextToolButton}
              onClick={() => onClose()}
            >
              Explore Tools →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// ECOSYSTEM INCOME MAPPER (transformed)
// ========================================

interface IncomeOpportunity {
  source: string;
  category: 'internal' | 'ecosystem' | 'b2b';
  type: string;
  estimatedMonthly: number;
  frequency: string;
  skillsNeeded: string[];
  entryPath: string;
  ecosystemContext?: string;
  stabilityRating: 'variable' | 'moderate' | 'stable';
}

const INCOME_OPPORTUNITIES: IncomeOpportunity[] = [
  // INTERNAL (Wembley Wonders programmes)
  { source: "Rayd-yo Heritage Language Show", category: "internal", type: "Radio", estimatedMonthly: 100, frequency: "4 episodes", skillsNeeded: ["Heritage language", "Broadcasting"], entryPath: "G-Tech Casters programme", stabilityRating: 'moderate' },
  { source: "Joystick Article Writing", category: "internal", type: "Writing", estimatedMonthly: 82, frequency: "3 articles", skillsNeeded: ["Writing", "Research"], entryPath: "Pageturners programme", stabilityRating: 'moderate' },
  { source: "Kaywana's Court Technical", category: "internal", type: "Production", estimatedMonthly: 100, frequency: "1-2 productions", skillsNeeded: ["Lighting", "Sound", "Stage tech"], entryPath: "STEMgeneers pathway", stabilityRating: 'variable' },
  { source: "Cyberstore Digital Products", category: "internal", type: "Sales", estimatedMonthly: 110, frequency: "Multiple sales", skillsNeeded: ["Product creation", "Digital skills"], entryPath: "Any creative programme", stabilityRating: 'variable' },
  
  // ECOSYSTEM (local business connections)
  { source: "Construction firm admin support", category: "ecosystem", type: "B2B Services", estimatedMonthly: 400, frequency: "Ongoing", skillsNeeded: ["Digital skills", "Organization"], entryPath: "Approach firms directly with portfolio", ecosystemContext: "Brent has 50+ Black-owned construction firms needing admin, invoicing, social media", stabilityRating: 'stable' },
  { source: "Property management tech support", category: "ecosystem", type: "B2B Services", estimatedMonthly: 350, frequency: "Retainer", skillsNeeded: ["Tech setup", "Troubleshooting"], entryPath: "Start with one landlord, get referrals", ecosystemContext: "Property managers need tenant portals, maintenance tracking, smart locks", stabilityRating: 'stable' },
  { source: "Restaurant social media", category: "ecosystem", type: "B2B Services", estimatedMonthly: 300, frequency: "2-3 clients", skillsNeeded: ["Photography", "Social media", "Video"], entryPath: "Offer 1-month trial to prove value", ecosystemContext: "Caribbean restaurants on Wembley High Road need Instagram presence", stabilityRating: 'moderate' },
  { source: "Church/community AV support", category: "ecosystem", type: "B2B Services", estimatedMonthly: 200, frequency: "Weekly", skillsNeeded: ["Sound", "Lighting", "Video"], entryPath: "Start with your own church/community", ecosystemContext: "Churches need livestreaming, sound mixing, event recording", stabilityRating: 'stable' },
  { source: "Fleet delivery logistics admin", category: "ecosystem", type: "B2B Services", estimatedMonthly: 450, frequency: "Ongoing", skillsNeeded: ["Digital skills", "Organization", "Communication"], entryPath: "Connect through community networks", ecosystemContext: "Delivery fleets need driver coordination, route optimization, customer comms", stabilityRating: 'stable' },
  { source: "Care home tech support", category: "ecosystem", type: "B2B Services", estimatedMonthly: 300, frequency: "Retainer", skillsNeeded: ["Tech setup", "Patient communication", "Troubleshooting"], entryPath: "Approach with specific service offering", ecosystemContext: "Care homes need video calling setup, device maintenance, staff training", stabilityRating: 'stable' },
  
  // B2B (serving multiple businesses)
  { source: "Bookkeeping for small businesses", category: "b2b", type: "Professional Services", estimatedMonthly: 600, frequency: "3-4 clients", skillsNeeded: ["Bookkeeping", "QuickBooks/Xero", "Organization"], entryPath: "Get certified, start with one referral", ecosystemContext: "Most small businesses hate doing their books — solve this problem", stabilityRating: 'stable' },
  { source: "Event staffing coordination", category: "b2b", type: "B2B Services", estimatedMonthly: 500, frequency: "Stadium events", skillsNeeded: ["Organization", "Communication", "Reliability"], entryPath: "Build a roster of reliable people first", ecosystemContext: "Wembley events need coordinated staffing — be the connector", stabilityRating: 'moderate' },
  { source: "Bulk purchasing coordinator", category: "b2b", type: "B2B Services", estimatedMonthly: 400, frequency: "Ongoing", skillsNeeded: ["Negotiation", "Organization", "Network"], entryPath: "Start with 3-4 businesses, prove savings", ecosystemContext: "Small businesses pay retail — coordinate bulk buying for group discounts", stabilityRating: 'stable' },
];

const EcosystemIncomeMapper: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'all' | 'internal' | 'ecosystem' | 'b2b'>('all');
  const [step, setStep] = useState(1);

  const skillOptions = [
    "Writing", "Broadcasting", "Heritage language", "Storytelling", 
    "Performance", "Sewing", "Design", "Tech setup", "Troubleshooting",
    "Teaching", "Photography", "Video", "Sound", "Lighting",
    "Digital skills", "Organization", "Communication", "Bookkeeping",
    "Social media", "Negotiation", "Network"
  ];

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const matchingOpportunities = INCOME_OPPORTUNITIES.filter(opp => 
    opp.skillsNeeded.some(skill => skills.includes(skill)) &&
    (viewMode === 'all' || opp.category === viewMode)
  );

  const toggleStream = (source: string) => {
    if (selectedStreams.includes(source)) {
      setSelectedStreams(selectedStreams.filter(s => s !== source));
    } else {
      setSelectedStreams([...selectedStreams, source]);
    }
  };

  const selectedOpportunities = INCOME_OPPORTUNITIES.filter(opp => 
    selectedStreams.includes(opp.source)
  );

  const totalMonthly = selectedOpportunities.reduce((sum, opp) => sum + opp.estimatedMonthly, 0);

  const internalTotal = selectedOpportunities
    .filter(o => o.category === 'internal')
    .reduce((sum, o) => sum + o.estimatedMonthly, 0);
  
  const ecosystemTotal = selectedOpportunities
    .filter(o => o.category === 'ecosystem' || o.category === 'b2b')
    .reduce((sum, o) => sum + o.estimatedMonthly, 0);

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'internal': return 'WW Programme';
      case 'ecosystem': return 'Local Business';
      case 'b2b': return 'B2B Service';
      default: return cat;
    }
  };

  const getStabilityColor = (rating: string) => {
    switch(rating) {
      case 'stable': return '#10b981';
      case 'moderate': return '#fbbf24';
      case 'variable': return '#f87171';
      default: return '#94a3b8';
    }
  };

  return (
    <div className={styles.mapperContainer}>
      <div className={styles.mapperHeader}>
        <h2>🗺️ Ecosystem Income Mapper</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.ecosystemIntro}>
        <p>
          <strong>The shift:</strong> Instead of only mapping income through Wembley Wonders 
          programmes, this tool shows how your skills connect to Brent's existing business 
          infrastructure. Local businesses need you — the question is how you connect.
        </p>
      </div>

      {step === 1 && (
        <div className={styles.mapperStep}>
          <h3>Step 1: What Skills Do You Have (or Want to Build)?</h3>
          <p className={styles.stepNote}>Select all that apply — include skills you're developing</p>
          
          <div className={styles.skillsGrid}>
            {skillOptions.map((skill) => (
              <label key={skill} className={`${styles.skillOption} ${skills.includes(skill) ? styles.selected : ''}`}>
                <input 
                  type="checkbox"
                  checked={skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>

          <button 
            className={styles.nextButton}
            onClick={() => setStep(2)}
            disabled={skills.length === 0}
          >
            See Matching Opportunities →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.mapperStep}>
          <h3>Step 2: Choose Your Income Streams</h3>
          
          <div className={styles.viewModeToggle}>
            <button 
              className={viewMode === 'all' ? styles.active : ''}
              onClick={() => setViewMode('all')}
            >
              All ({matchingOpportunities.length})
            </button>
            <button 
              className={viewMode === 'internal' ? styles.active : ''}
              onClick={() => setViewMode('internal')}
            >
              WW Programmes
            </button>
            <button 
              className={viewMode === 'ecosystem' ? styles.active : ''}
              onClick={() => setViewMode('ecosystem')}
            >
              Local Businesses
            </button>
            <button 
              className={viewMode === 'b2b' ? styles.active : ''}
              onClick={() => setViewMode('b2b')}
            >
              B2B Services
            </button>
          </div>

          <div className={styles.ecosystemExplainer}>
            {viewMode === 'internal' && (
              <p>💡 <strong>Internal:</strong> Income through Wembley Wonders programmes. Good for building skills and portfolio, variable income.</p>
            )}
            {viewMode === 'ecosystem' && (
              <p>💡 <strong>Local Businesses:</strong> Serve existing Brent businesses directly. More stable income, requires relationship-building.</p>
            )}
            {viewMode === 'b2b' && (
              <p>💡 <strong>B2B Services:</strong> Serve multiple businesses with one offering. Scalable, requires systems and reliability.</p>
            )}
          </div>

          {matchingOpportunities.length === 0 ? (
            <div className={styles.noMatches}>
              <p>No matches in this category. Try selecting more skills or viewing all opportunities.</p>
            </div>
          ) : (
            <div className={styles.opportunitiesGrid}>
              {matchingOpportunities.map((opp) => (
                <div 
                  key={opp.source}
                  className={`${styles.opportunityCard} ${selectedStreams.includes(opp.source) ? styles.selected : ''}`}
                  onClick={() => toggleStream(opp.source)}
                >
                  <div className={styles.oppHeader}>
                    <span className={styles.oppCategory}>{getCategoryLabel(opp.category)}</span>
                    <span className={styles.oppAmount}>£{opp.estimatedMonthly}/mo</span>
                  </div>
                  <h4>{opp.source}</h4>
                  <p className={styles.oppFrequency}>{opp.frequency}</p>
                  <p className={styles.oppEntry}><strong>Entry:</strong> {opp.entryPath}</p>
                  {opp.ecosystemContext && (
                    <p className={styles.oppContext}>{opp.ecosystemContext}</p>
                  )}
                  <div className={styles.oppStability}>
                    <span 
                      className={styles.stabilityDot}
                      style={{ backgroundColor: getStabilityColor(opp.stabilityRating) }}
                    />
                    <span>{opp.stabilityRating} income</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedStreams.length > 0 && (
            <div className={styles.selectionSummary}>
              <h4>Your Selected Streams</h4>
              <div className={styles.summaryBreakdown}>
                <div>
                  <span>WW Programmes:</span>
                  <strong>£{internalTotal}/mo</strong>
                </div>
                <div>
                  <span>Ecosystem/B2B:</span>
                  <strong>£{ecosystemTotal}/mo</strong>
                </div>
                <div className={styles.totalRow}>
                  <span>Total:</span>
                  <strong>£{totalMonthly}/mo</strong>
                </div>
              </div>
            </div>
          )}

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
            <button 
              className={styles.nextButton} 
              onClick={() => setStep(3)}
              disabled={selectedStreams.length === 0}
            >
              View Your Map →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.mapperStep}>
          <h3>Your Ecosystem Income Map</h3>

          <div className={styles.incomeMap}>
            <div className={styles.mapVisual}>
              {selectedOpportunities.map((opp, index) => (
                <div 
                  key={opp.source}
                  className={styles.streamBar}
                  style={{ 
                    width: `${(opp.estimatedMonthly / totalMonthly) * 100}%`,
                    backgroundColor: opp.category === 'internal' ? '#a78bfa' : 
                                    opp.category === 'ecosystem' ? '#10b981' : '#fbbf24'
                  }}
                >
                  <span className={styles.streamLabel}>{opp.source}</span>
                  <span className={styles.streamAmount}>£{opp.estimatedMonthly}</span>
                </div>
              ))}
            </div>

            <div className={styles.mapLegend}>
              <span><span className={styles.legendDot} style={{backgroundColor: '#a78bfa'}} /> WW Programmes</span>
              <span><span className={styles.legendDot} style={{backgroundColor: '#10b981'}} /> Local Businesses</span>
              <span><span className={styles.legendDot} style={{backgroundColor: '#fbbf24'}} /> B2B Services</span>
            </div>

            <div className={styles.mapTotal}>
              <span>Projected Monthly Total</span>
              <strong>£{totalMonthly}</strong>
            </div>
          </div>

          <div className={styles.ecosystemInsight}>
            <h4>The Ecosystem Advantage</h4>
            {ecosystemTotal > internalTotal ? (
              <p>
                <strong>Good balance.</strong> £{ecosystemTotal} of your projected income comes from 
                serving existing businesses. This is more stable than individual customers because 
                businesses have ongoing needs and budgets. They also refer you to other businesses.
              </p>
            ) : (
              <p>
                <strong>Consider adding ecosystem income.</strong> WW programmes are great for 
                building skills, but serving existing businesses provides more stable income. 
                Businesses have budgets, ongoing needs, and refer you to other businesses.
              </p>
            )}
          </div>

          <div className={styles.mapDisclaimer}>
            <p>
              <strong>Note:</strong> Ecosystem income requires relationship-building. You won't 
              earn £400/month from a construction firm on day one. But once you're in their 
              network, work flows to you consistently. Start with one client, prove your value, 
              get referrals.
            </p>
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(2)}>← Edit Selection</button>
            <button className={styles.nextButton} onClick={onClose}>
              Done →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// LOCAL BUSINESS GAP FINDER (new)
// ========================================

interface BusinessGap {
  sector: string;
  problem: string;
  currentSolution: string;
  betterSolution: string;
  skillsNeeded: string[];
  entryStrategy: string;
  revenueModel: string;
  exampleBusinesses: string;
}

const BUSINESS_GAPS: BusinessGap[] = [
  {
    sector: "Caribbean Restaurants",
    problem: "No collective delivery solution — each restaurant pays Deliveroo 30% fees",
    currentSolution: "Individual Deliveroo/UberEats accounts, losing margin",
    betterSolution: "Shared local delivery coordination — lower fees, local drivers",
    skillsNeeded: ["Organization", "Communication", "Basic app knowledge"],
    entryStrategy: "Approach 5 restaurants on Wembley High Road with proposal",
    revenueModel: "15% fee (vs 30% from apps) — restaurants save, you earn",
    exampleBusinesses: "15+ Caribbean restaurants within 1 mile of Wembley Central"
  },
  {
    sector: "Construction Firms",
    problem: "Paperwork chaos — quotes, invoices, receipts all manual",
    currentSolution: "Excel spreadsheets, paper folders, missed invoices",
    betterSolution: "Simple digital system — QuickBooks, invoice tracking, receipt scanning",
    skillsNeeded: ["Digital skills", "Bookkeeping basics", "Organization"],
    entryStrategy: "Offer to digitize one month's paperwork free, show the time saved",
    revenueModel: "£150-300/month retainer per firm",
    exampleBusinesses: "50+ Black-owned construction firms in Brent"
  },
  {
    sector: "Property Managers",
    problem: "Tenant communication is scattered — WhatsApp, calls, texts",
    currentSolution: "Personal WhatsApp groups, missed messages, no records",
    betterSolution: "Tenant portal with maintenance requests, payment tracking",
    skillsNeeded: ["Tech setup", "Customer service", "Basic web tools"],
    entryStrategy: "Start with one landlord who has 5+ properties, prove the value",
    revenueModel: "£50-100/property/month for full management support",
    exampleBusinesses: "Hundreds of local landlords managing multiple properties"
  },
  {
    sector: "Churches & Community Orgs",
    problem: "Events aren't recorded, reach is limited to attendees",
    currentSolution: "Maybe a Facebook Live, poor audio, no archive",
    betterSolution: "Professional livestream, podcast version, social clips",
    skillsNeeded: ["Video", "Sound", "Social media"],
    entryStrategy: "Offer to produce one event free, show the reach difference",
    revenueModel: "£100-200/event, or £300-500/month retainer",
    exampleBusinesses: "100+ churches and community organizations in Brent"
  },
  {
    sector: "Care Homes",
    problem: "Residents can't video call family, staff struggles with tech",
    currentSolution: "Ad-hoc help from whoever's available",
    betterSolution: "Regular tech support — device setup, troubleshooting, training",
    skillsNeeded: ["Tech setup", "Patience", "Communication"],
    entryStrategy: "Approach local care homes with specific service package",
    revenueModel: "£200-400/month retainer",
    exampleBusinesses: "30+ care homes in Brent borough"
  },
  {
    sector: "Small Retailers",
    problem: "No online presence, losing to competitors who do",
    currentSolution: "Maybe a Facebook page, rarely updated",
    betterSolution: "Simple Google Business profile, Instagram presence, review management",
    skillsNeeded: ["Social media", "Photography", "Writing"],
    entryStrategy: "Show them their competitors' Google presence, offer to match it",
    revenueModel: "£150-250/month per client",
    exampleBusinesses: "200+ independent retailers across Brent"
  },
];

const GapFinder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  const selectedGap = BUSINESS_GAPS.find(g => g.sector === selectedSector);

  const skillMatch = selectedGap 
    ? selectedGap.skillsNeeded.filter(s => userSkills.includes(s)).length / selectedGap.skillsNeeded.length
    : 0;

  return (
    <div className={styles.gapFinderContainer}>
      <div className={styles.gapFinderHeader}>
        <h2>🔍 Local Business Gap Finder</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.gapFinderIntro}>
        <p>
          <strong>The question isn't "what business should I start?"</strong> 
          <br />
          It's "what do existing local businesses already need but can't get?"
        </p>
        <p>
          These are real gaps in Brent's business ecosystem. Solve one of these, and 
          you're not competing with anyone — you're filling a hole that needs filling.
        </p>
      </div>

      <div className={styles.sectorGrid}>
        {BUSINESS_GAPS.map((gap) => (
          <div 
            key={gap.sector}
            className={`${styles.sectorCard} ${selectedSector === gap.sector ? styles.selected : ''}`}
            onClick={() => setSelectedSector(gap.sector)}
          >
            <h4>{gap.sector}</h4>
            <p className={styles.problemPreview}>{gap.problem}</p>
          </div>
        ))}
      </div>

      {selectedGap && (
        <div className={styles.gapDetail}>
          <h3>{selectedGap.sector}</h3>
          
          <div className={styles.gapSection}>
            <h4>The Problem</h4>
            <p>{selectedGap.problem}</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Current Solution (What They Do Now)</h4>
            <p className={styles.currentSolution}>{selectedGap.currentSolution}</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Better Solution (What You Could Offer)</h4>
            <p className={styles.betterSolution}>{selectedGap.betterSolution}</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Skills Needed</h4>
            <div className={styles.skillsList}>
              {selectedGap.skillsNeeded.map((skill) => (
                <span 
                  key={skill} 
                  className={`${styles.skillTag} ${userSkills.includes(skill) ? styles.hasSkill : ''}`}
                  onClick={() => {
                    if (userSkills.includes(skill)) {
                      setUserSkills(userSkills.filter(s => s !== skill));
                    } else {
                      setUserSkills([...userSkills, skill]);
                    }
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className={styles.skillNote}>Click skills you have</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Entry Strategy</h4>
            <p>{selectedGap.entryStrategy}</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Revenue Model</h4>
            <p className={styles.revenueModel}>{selectedGap.revenueModel}</p>
          </div>

          <div className={styles.gapSection}>
            <h4>Market Size in Brent</h4>
            <p>{selectedGap.exampleBusinesses}</p>
          </div>

          <div className={styles.gapCTA}>
            <h4>Ready to Explore This Gap?</h4>
            <p>
              This isn't a business plan — it's a starting point. Talk to 3-5 businesses 
              in this sector. Ask them about this problem. See if your solution resonates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// SUCCESSION NAVIGATOR (new)
// ========================================

interface SuccessionSignal {
  signal: string;
  whatItMeans: string;
  howToApproach: string;
}

const SUCCESSION_SIGNALS: SuccessionSignal[] = [
  {
    signal: "Owner is 55+ and no family involved in the business",
    whatItMeans: "They may be thinking about retirement but have no succession plan",
    howToApproach: "Build relationship first. Offer to help with specific tasks. Over time, express interest in the business's future."
  },
  {
    signal: "Business is stable but not growing",
    whatItMeans: "Owner may be coasting toward retirement rather than building",
    howToApproach: "Propose specific growth ideas. Show you see potential they might be too tired to pursue."
  },
  {
    signal: "Owner mentions being 'tired' or wanting to 'slow down'",
    whatItMeans: "They're open to reducing their involvement",
    howToApproach: "Offer to take on specific responsibilities. Start small, prove reliability, expand scope."
  },
  {
    signal: "Business owns its premises (not renting)",
    whatItMeans: "There's real asset value beyond the business itself",
    howToApproach: "This is a bigger deal. You're potentially inheriting property value, not just a customer list."
  },
  {
    signal: "Long-term employees but no clear second-in-command",
    whatItMeans: "Loyalty exists but no leadership succession",
    howToApproach: "Position yourself as the connector between owner and staff. Learn from experienced employees."
  },
  {
    signal: "Owner talks about 'the old days' more than future plans",
    whatItMeans: "They may be mentally transitioning out",
    howToApproach: "Honor the history while bringing fresh energy. Show respect for what they built."
  },
];

const SuccessionNavigator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeSignal, setActiveSignal] = useState<number | null>(null);

  return (
    <div className={styles.successionContainer}>
      <div className={styles.successionHeader}>
        <h2>🔑 Succession Navigator</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.successionIntro}>
        <p>
          <strong>Many Brent businesses were started by first-generation owners now in their 50s-60s.</strong>
        </p>
        <p>
          They built something real. But their children often pursued professional careers — 
          lawyer, accountant, doctor. Who inherits the construction firm? The property 
          portfolio? The wholesale operation?
        </p>
        <p>
          <strong>This could be you.</strong> Not by competing with them, but by learning from 
          them, proving your value, and positioning yourself as the person who continues what 
          they built.
        </p>
      </div>

      <div className={styles.signalsSection}>
        <h3>Succession Signals to Watch For</h3>
        <p className={styles.signalsNote}>
          These aren't guarantees — they're indicators. The real work is building 
          relationships over years, not months.
        </p>

        <div className={styles.signalsList}>
          {SUCCESSION_SIGNALS.map((signal, index) => (
            <div 
              key={index}
              className={`${styles.signalCard} ${activeSignal === index ? styles.expanded : ''}`}
              onClick={() => setActiveSignal(activeSignal === index ? null : index)}
            >
              <h4>{signal.signal}</h4>
              {activeSignal === index && (
                <div className={styles.signalDetail}>
                  <div className={styles.signalMeaning}>
                    <strong>What it means:</strong>
                    <p>{signal.whatItMeans}</p>
                  </div>
                  <div className={styles.signalApproach}>
                    <strong>How to approach:</strong>
                    <p>{signal.howToApproach}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.successionTimeline}>
        <h3>The Long Game</h3>
        <div className={styles.timelineSteps}>
          <div className={styles.timelineStep}>
            <span className={styles.timelineYear}>Year 1</span>
            <p>Build relationships. Do excellent work. Be reliable. Ask questions. Learn the business.</p>
          </div>
          <div className={styles.timelineStep}>
            <span className={styles.timelineYear}>Year 2-3</span>
            <p>Take on more responsibility. Solve problems before being asked. Become indispensable.</p>
          </div>
          <div className={styles.timelineStep}>
            <span className={styles.timelineYear}>Year 3-5</span>
            <p>Have honest conversations about the future. Explore partnership or gradual buyout options.</p>
          </div>
          <div className={styles.timelineStep}>
            <span className={styles.timelineYear}>Year 5+</span>
            <p>Transition. This might be full ownership, partnership, or a structured handover.</p>
          </div>
        </div>
      </div>

      <div className={styles.successionReality}>
        <h4>Real Talk</h4>
        <p>
          This isn't a quick win. You're not going to inherit a business in 6 months. But 
          consider: you could spend 5 years building a business from scratch (90% failure rate) 
          or 5 years positioning yourself to inherit one that already works (with customers, 
          reputation, systems, maybe even property).
        </p>
        <p>
          The pardner principle applies here too: you're not starting alone. You're joining 
          something that already exists and strengthening it.
        </p>
      </div>
    </div>
  );
};

// ========================================
// CREATIVE PARDNER CALCULATOR (enhanced)
// ========================================

const PardnerCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [members, setMembers] = useState(8);
  const [contribution, setContribution] = useState(50);
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('monthly');
  const [purpose, setPurpose] = useState('');

  const poolPerCycle = members * contribution;
  const cycleLength = frequency === 'weekly' ? `${members} weeks` : `${members} months`;
  const yourContributionTotal = members * contribution;
  const yourReturn = poolPerCycle;

  const equipmentExamples = [
    { name: "Professional sewing machine", cost: 400 },
    { name: "3D printer setup", cost: 500 },
    { name: "Phone repair kit + inventory", cost: 400 },
    { name: "Audio recording setup", cost: 600 },
    { name: "E-bike tool set", cost: 350 },
    { name: "Professional camera", cost: 800 },
    { name: "Lighting kit", cost: 300 },
    { name: "Bookkeeping software (annual)", cost: 200 },
    { name: "Van deposit for delivery service", cost: 1000 },
  ];

  const whatYouCouldBuy = equipmentExamples.filter(e => e.cost <= poolPerCycle);

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorHeader}>
        <h2>🧮 Creative Pardner Calculator</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.calculatorIntro}>
        <p>
          Model how a Creative Pardner could work for your group. Same principle as 
          your grandmother's pardner — applied to equipment, studio costs, or starting 
          a B2B service together.
        </p>
      </div>

      <div className={styles.calculatorForm}>
        <div className={styles.formGroup}>
          <label>Number of Members</label>
          <input 
            type="range"
            min="4"
            max="20"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>{members} people</span>
        </div>

        <div className={styles.formGroup}>
          <label>Contribution per Person</label>
          <input 
            type="range"
            min="20"
            max="200"
            step="10"
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>£{contribution}</span>
        </div>

        <div className={styles.formGroup}>
          <label>Frequency</label>
          <div className={styles.radioGroup}>
            <label>
              <input 
                type="radio"
                checked={frequency === 'weekly'}
                onChange={() => setFrequency('weekly')}
              />
              Weekly
            </label>
            <label>
              <input 
                type="radio"
                checked={frequency === 'monthly'}
                onChange={() => setFrequency('monthly')}
              />
              Monthly
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>What's the pardner for?</label>
          <select 
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="">Select purpose...</option>
            <option value="equipment">Equipment purchases</option>
            <option value="studio">Shared studio space</option>
            <option value="bulk-materials">Bulk material buying</option>
            <option value="training">Training/certification costs</option>
            <option value="b2b-startup">Starting a B2B service together</option>
            <option value="vehicle">Shared vehicle/van</option>
            <option value="mixed">Mixed purposes</option>
          </select>
        </div>
      </div>

      <div className={styles.calculatorResults}>
        <h3>Your Creative Pardner</h3>
        
        <div className={styles.resultsGrid}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Pool Each {frequency === 'weekly' ? 'Week' : 'Month'}</span>
            <span className={styles.resultValue}>£{poolPerCycle}</span>
          </div>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Full Cycle Length</span>
            <span className={styles.resultValue}>{cycleLength}</span>
          </div>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Your Total Contribution</span>
            <span className={styles.resultValue}>£{yourContributionTotal}</span>
          </div>
          <div className={`${styles.resultCard} ${styles.highlight}`}>
            <span className={styles.resultLabel}>Your "Hand" (lump sum)</span>
            <span className={styles.resultValue}>£{yourReturn}</span>
          </div>
        </div>

        <div className={styles.whatYouCouldBuy}>
          <h4>With £{poolPerCycle}, You Could Buy:</h4>
          <div className={styles.equipmentList}>
            {whatYouCouldBuy.length > 0 ? (
              whatYouCouldBuy.map((item) => (
                <div key={item.name} className={styles.equipmentItem}>
                  <span>{item.name}</span>
                  <span>£{item.cost}</span>
                </div>
              ))
            ) : (
              <p>Increase contribution or members to afford more equipment</p>
            )}
          </div>
        </div>

        <div className={styles.pardnerTimeline}>
          <h4>How It Would Work</h4>
          <div className={styles.timeline}>
            {Array.from({ length: Math.min(members, 6) }, (_, i) => (
              <div key={i} className={styles.timelineItem}>
                <span className={styles.timelineMonth}>
                  {frequency === 'weekly' ? `Week ${i + 1}` : `Month ${i + 1}`}
                </span>
                <span className={styles.timelinePerson}>Person {i + 1} gets £{poolPerCycle}</span>
              </div>
            ))}
            {members > 6 && (
              <div className={styles.timelineItem}>
                <span className={styles.timelineMonth}>...</span>
                <span className={styles.timelinePerson}>And so on for all {members} members</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.pardnerEcosystem}>
          <h4>Pardner + Ecosystem = Leverage</h4>
          <p>
            A Creative Pardner isn't just for individual equipment. Consider:
          </p>
          <ul>
            <li><strong>Shared vehicle:</strong> A van lets you take on larger B2B contracts</li>
            <li><strong>Bulk inventory:</strong> Buy phone repair parts wholesale, share the stock</li>
            <li><strong>Certifications:</strong> Pool funds for professional certifications that open doors</li>
            <li><strong>Shared workspace:</strong> A small commercial space for the group</li>
          </ul>
          <p>
            The construction firms that built Brent's wealth? Many started exactly like this.
          </p>
        </div>

        <div className={styles.pardnerNote}>
          <h4>Key Principles</h4>
          <ul>
            <li><strong>Trust-based:</strong> Only form with people you trust</li>
            <li><strong>Consistent:</strong> Everyone contributes every cycle</li>
            <li><strong>Accountable:</strong> One person (the "banker") tracks everything</li>
            <li><strong>Flexible:</strong> Order can be negotiated based on need</li>
            <li><strong>No interest:</strong> You get back exactly what you put in</li>
          </ul>
        </div>
      </div>

      <div className={styles.nextStepsBox}>
        <h4>Ready to Form a Creative Pardner?</h4>
        <p>
          Connect with other TECHreneurs members who want to pool resources. 
          Start with people you already trust — from your programme cohort, 
          church, or community.
        </p>
        <Link to="/get-started" className={styles.joinButton}>
          Join TECHreneurs →
        </Link>
      </div>
    </div>
  );
};

// ========================================
// MAIN SANDBOX COMPONENT
// ========================================

const TECHreneursSandbox: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<ActivityType>(null);

  if (activeActivity === 'pardner-documenter') {
    return (
      <PageTemplate
        pageTitle="Pardner Heritage Documenter"
        pageStrapline="Document your family's economic wisdom"
        pageGuide="Capture the pardner/susu/box hand traditions from your family history."
        showMaya={false}
        pageType="sandbox"
      >
        <PardnerDocumenter onClose={() => setActiveActivity(null)} />
      </PageTemplate>
    );
  }

  if (activeActivity === 'ecosystem-income-mapper') {
    return (
      <PageTemplate
        pageTitle="Ecosystem Income Mapper"
        pageStrapline="Map your connection to Brent's business infrastructure"
        pageGuide="See how your skills connect to both Wembley Wonders and local businesses."
        showMaya={false}
        pageType="sandbox"
      >
        <EcosystemIncomeMapper onClose={() => setActiveActivity(null)} />
      </PageTemplate>
    );
  }

  if (activeActivity === 'pardner-calculator') {
    return (
      <PageTemplate
        pageTitle="Creative Pardner Calculator"
        pageStrapline="Model collective capital for your group"
        pageGuide="Calculate how a Creative Pardner could work for equipment, space, or B2B services."
        showMaya={false}
        pageType="sandbox"
      >
        <PardnerCalculator onClose={() => setActiveActivity(null)} />
      </PageTemplate>
    );
  }

  if (activeActivity === 'gap-finder') {
    return (
      <PageTemplate
        pageTitle="Local Business Gap Finder"
        pageStrapline="What do existing businesses already need?"
        pageGuide="Discover gaps in Brent's business ecosystem that your skills could fill."
        showMaya={false}
        pageType="sandbox"
      >
        <GapFinder onClose={() => setActiveActivity(null)} />
      </PageTemplate>
    );
  }

  if (activeActivity === 'succession-navigator') {
    return (
      <PageTemplate
        pageTitle="Succession Navigator"
        pageStrapline="Position yourself to inherit, not just start"
        pageGuide="Learn to read succession signals and play the long game."
        showMaya={false}
        pageType="sandbox"
      >
        <SuccessionNavigator onClose={() => setActiveActivity(null)} />
      </PageTemplate>
    );
  }

  if (activeActivity === 'conversation-starter') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <h2>💬 Family Conversation Starter Coming Soon!</h2>
        <p>
          Guided conversation prompts for discussing the "ecosystem path" with family. 
          Help parents understand how this differs from the paths they know.
        </p>
        <button 
          onClick={() => setActiveActivity(null)}
          style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer' }}
        >
          ← Back to Sandbox
        </button>
      </div>
    );
  }

  return (
    <PageTemplate
      pageTitle="TECHreneurs Sandbox"
      pageStrapline="Ecosystem Economics Tools — Fill Gaps, Strengthen Infrastructure, Build Collective Power"
      pageGuide="Connect to Brent's business ecosystem, not compete with it."
      showMaya={true}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>
        
        {/* Philosophy Section */}
        <section className={styles.heroSection}>
          <div className={styles.dedication}>
            <h2 className={styles.dedicationTitle}>
              Strengthen What's Here
            </h2>
            <p className={styles.dedicationMessage}>
              Brent is one of London's wealthiest Black communities. Construction firms, property 
              managers, wholesalers, logistics companies — they're already here. Your job isn't 
              to compete with them. It's to fill gaps, serve their needs, and position yourself 
              to inherit what they built.
            </p>
          </div>
        </section>

        {/* Ecosystem Tools */}
        <section className={styles.toolsSection}>
          <h2 className={styles.sectionTitle}>Ecosystem Tools</h2>
          <p className={styles.sectionIntro}>
            Find gaps in local business infrastructure and position yourself to fill them.
          </p>

          <div className={styles.toolsGrid}>
            {/* Gap Finder - STRATEGIC */}
            <div className={styles.toolCard}>
              <span className={styles.strategicBadge}>Strategic Tool</span>
              <div className={styles.toolIcon}>🔍</div>
              <h3>Local Business Gap Finder</h3>
              <p>
                What do Caribbean restaurants, construction firms, and property managers 
                already need but can't get locally? Find gaps your skills could fill.
              </p>
              <div className={styles.toolFeatures}>
                <span>6 sectors</span>
                <span>Real problems</span>
                <span>Entry strategies</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('gap-finder')}
              >
                Find Gaps →
              </button>
            </div>

            {/* Ecosystem Income Mapper */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🗺️</div>
              <h3>Ecosystem Income Mapper</h3>
              <p>
                Map income opportunities across both Wembley Wonders programmes AND 
                Brent's business ecosystem. See how skills translate to stable B2B income.
              </p>
              <div className={styles.toolFeatures}>
                <span>WW programmes</span>
                <span>Local businesses</span>
                <span>B2B services</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('ecosystem-income-mapper')}
              >
                Map Income →
              </button>
            </div>

            {/* Succession Navigator */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🔑</div>
              <h3>Succession Navigator</h3>
              <p>
                Many Brent businesses were started by first-generation owners now in their 
                50s-60s. Learn to read succession signals and play the long game.
              </p>
              <div className={styles.toolFeatures}>
                <span>Succession signals</span>
                <span>Long-term positioning</span>
                <span>Inheritance paths</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('succession-navigator')}
              >
                Navigate Succession →
              </button>
            </div>
          </div>
        </section>

        {/* Heritage Economics Tools */}
        <section className={styles.toolsSection}>
          <h2 className={styles.sectionTitle}>Heritage Economics Tools</h2>
          <p className={styles.sectionIntro}>
            Document your family's economic wisdom and apply it to collective wealth-building.
          </p>

          <div className={styles.toolsGrid}>
            {/* Pardner Heritage Documenter */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>📜</div>
              <h3>Pardner Heritage Documenter</h3>
              <p>
                Capture your family's pardner/susu/box hand experience. The same principles 
                built Brent's business infrastructure. Document heritage wisdom before it's lost.
              </p>
              <div className={styles.toolFeatures}>
                <span>Family history</span>
                <span>Economic wisdom</span>
                <span>Downloadable record</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('pardner-documenter')}
              >
                Document Heritage →
              </button>
            </div>

            {/* Creative Pardner Calculator */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>🧮</div>
              <h3>Creative Pardner Calculator</h3>
              <p>
                Model how a Creative Pardner could work for your group. Pool funds for 
                equipment, shared workspace, vehicle deposits, or starting a B2B service together.
              </p>
              <div className={styles.toolFeatures}>
                <span>Group modeling</span>
                <span>Equipment planning</span>
                <span>B2B startup</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('pardner-calculator')}
              >
                Calculate Pardner →
              </button>
            </div>

            {/* Family Conversation Starter */}
            <div className={styles.toolCard}>
              <div className={styles.toolIcon}>💬</div>
              <h3>Family Conversation Starter</h3>
              <p>
                Guided prompts for discussing the ecosystem approach with parents and elders. 
                Connect to pardner traditions, address concerns, explain the long game.
              </p>
              <div className={styles.toolFeatures}>
                <span>Parent concerns</span>
                <span>Heritage connection</span>
                <span>Practical answers</span>
              </div>
              <button 
                className={styles.toolButton}
                onClick={() => setActiveActivity('conversation-starter')}
              >
                Start Conversation →
              </button>
              <span className={styles.comingSoonBadge}>Coming Soon</span>
            </div>
          </div>
        </section>

        {/* The Shift */}
        <section className={styles.summarySection}>
          <div className={styles.summaryCard}>
            <h2>The Ecosystem Approach</h2>
            <div className={styles.pathComparison}>
              <div className={styles.oldPath}>
                <h4>❌ The Old Entrepreneurship</h4>
                <ul>
                  <li>Start from scratch</li>
                  <li>Find your own customers</li>
                  <li>Compete with existing businesses</li>
                  <li>Build your personal brand</li>
                  <li>90% failure rate</li>
                </ul>
              </div>
              <div className={styles.newPath}>
                <h4>✓ The Ecosystem Approach</h4>
                <ul>
                  <li>Fill gaps that already exist</li>
                  <li>Serve businesses that need you</li>
                  <li>Strengthen local infrastructure</li>
                  <li>Position for succession</li>
                  <li>Work flows to you</li>
                </ul>
              </div>
            </div>
            <p className={styles.summaryNote}>
              Brent's wealth wasn't built by individuals competing with each other. It was 
              built by networks that circulated capital, shared opportunities, and invested 
              in the next generation. That's what we're reconnecting you to.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Connect?</h2>
            <p>
              These tools are free to explore. Join TECHreneurs to connect with others 
              taking the ecosystem approach, form Creative Pardner groups, and access 
              introductions to local business networks.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/get-started" className={styles.ctaPrimary}>
                Join TECHreneurs
              </Link>
              <Link to="/programmes/techreneurs" className={styles.ctaSecondary}>
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Programme */}
        <section className={styles.backSection}>
          <Link to="/programmes/techreneurs" className={styles.backLink}>
            ← Back to TECHreneurs Programme
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default TECHreneursSandbox;