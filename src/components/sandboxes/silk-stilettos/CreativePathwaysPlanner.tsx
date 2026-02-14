import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreativePathwaysPlanner.module.css';

/**
 * Creative Pathways Planner - Silk Stilettos Sandbox
 * ===================================================
 * 
 * "The dressmaker in your grandmother's community wasn't famous—she was booked."
 * 
 * Tools for mapping creative skills to earning pathways, documenting textile heritage,
 * and planning makers collective participation.
 */

type ToolType = 
  | 'pathways-mapper' 
  | 'textile-heritage' 
  | 'makers-collective' 
  | 'carnival-calculator'
  | null;

// ========================================
// CREATIVE PATHWAYS MAPPER
// ========================================

interface CreativeInterest {
  id: string;
  name: string;
  icon: string;
  category: string;
}

interface EarningPathway {
  id: string;
  name: string;
  description: string;
  rate: string;
  frequency: string;
  programmes: string[];
  requiredSkills: string[];
}

const CREATIVE_INTERESTS: CreativeInterest[] = [
  { id: 'sewing', name: 'Sewing & Garment Making', icon: '🧵', category: 'construction' },
  { id: 'jewelry', name: 'Jewelry & Accessories', icon: '💍', category: 'accessories' },
  { id: 'embroidery', name: 'Embroidery & Beadwork', icon: '🪡', category: 'textile-arts' },
  { id: 'dyeing', name: 'Dyeing & Printing', icon: '🎨', category: 'textile-arts' },
  { id: 'makeup', name: 'Makeup & Beauty', icon: '💄', category: 'styling' },
  { id: 'hair', name: 'Hair Styling', icon: '💇‍♀️', category: 'styling' },
  { id: 'photography', name: 'Fashion Photography', icon: '📸', category: 'media' },
  { id: 'styling', name: 'Personal Styling', icon: '👗', category: 'styling' },
  { id: 'upcycling', name: 'Upcycling & Repair', icon: '♻️', category: 'construction' },
  { id: 'carnival', name: 'Carnival & Costume', icon: '🎭', category: 'special' },
  { id: 'headwear', name: 'Hats & Headwear', icon: '👒', category: 'accessories' },
  { id: 'bags', name: 'Bags & Leather', icon: '👜', category: 'accessories' },
];

const EARNING_PATHWAYS: EarningPathway[] = [
  {
    id: 'costume-design',
    name: 'Costume Design for Productions',
    description: 'Create costumes for Kaywana\'s Court theatre productions',
    rate: '£50-200',
    frequency: 'Per production (seasonal)',
    programmes: ['Kaywana\'s Court', 'Silk Stilettos'],
    requiredSkills: ['sewing', 'styling', 'embroidery', 'carnival']
  },
  {
    id: 'carnival-mas',
    name: 'Carnival Costume Creation',
    description: 'Design and make mas costumes for carnival bands and individuals',
    rate: '£100-500+',
    frequency: 'Seasonal (high value)',
    programmes: ['Silk Stilettos'],
    requiredSkills: ['carnival', 'sewing', 'embroidery', 'jewelry']
  },
  {
    id: 'alterations',
    name: 'Alterations & Tailoring',
    description: 'Provide alteration services to the community',
    rate: '£10-50',
    frequency: 'Ongoing (constant demand)',
    programmes: ['Silk Stilettos'],
    requiredSkills: ['sewing']
  },
  {
    id: 'occasion-wear',
    name: 'African/Caribbean Occasion Wear',
    description: 'Custom outfits for weddings, christenings, funerals',
    rate: '£50-300+',
    frequency: 'Event-driven',
    programmes: ['Silk Stilettos'],
    requiredSkills: ['sewing', 'styling', 'embroidery']
  },
  {
    id: 'cyberstore-products',
    name: 'Cyberstore Product Sales',
    description: 'Sell handmade products through Wembley Wonders\' online store',
    rate: '55% of sale',
    frequency: 'Ongoing',
    programmes: ['Cyberstore', 'Silk Stilettos'],
    requiredSkills: ['jewelry', 'sewing', 'bags', 'headwear', 'embroidery']
  },
  {
    id: 'raydyo-tutorials',
    name: 'Rayd-yo "How I Make..." Tutorials',
    description: 'Create video/audio tutorials showing your craft process',
    rate: '£25',
    frequency: 'Per episode',
    programmes: ['Rayd-yo', 'Silk Stilettos'],
    requiredSkills: ['sewing', 'jewelry', 'embroidery', 'dyeing', 'carnival', 'bags']
  },
  {
    id: 'joystick-features',
    name: 'Joystick Designer Profile',
    description: 'Featured article about your work and creative journey',
    rate: 'Exposure + commissions',
    frequency: 'One-time feature',
    programmes: ['Joystick', 'Silk Stilettos'],
    requiredSkills: ['sewing', 'jewelry', 'styling', 'carnival']
  },
  {
    id: 'workshops',
    name: 'Workshop Facilitation',
    description: 'Teach your craft to others in community workshops',
    rate: '£60',
    frequency: 'Per session',
    programmes: ['Silk Stilettos'],
    requiredSkills: ['sewing', 'jewelry', 'embroidery', 'dyeing', 'makeup', 'hair']
  },
  {
    id: 'event-styling',
    name: 'Event Styling Services',
    description: 'Style events, weddings, photoshoots',
    rate: '£75-200',
    frequency: 'Per event',
    programmes: ['Silk Stilettos'],
    requiredSkills: ['styling', 'makeup', 'hair']
  },
  {
    id: 'stage-makeup',
    name: 'Stage Makeup for Productions',
    description: 'Provide makeup services for Kaywana\'s Court shows',
    rate: '£40-100',
    frequency: 'Per production',
    programmes: ['Kaywana\'s Court', 'Silk Stilettos'],
    requiredSkills: ['makeup']
  },
  {
    id: 'content-styling',
    name: 'Content Creator Styling',
    description: 'Style G-Tech Casters for their video content',
    rate: '£30-75',
    frequency: 'Per shoot',
    programmes: ['G-Tech Casters', 'Silk Stilettos'],
    requiredSkills: ['styling', 'makeup', 'hair']
  },
  {
    id: 'product-photography',
    name: 'Product Photography',
    description: 'Photograph products for Cyberstore sellers',
    rate: '£25-50',
    frequency: 'Per product set',
    programmes: ['Cyberstore', 'Silk Stilettos'],
    requiredSkills: ['photography']
  },
];

const PathwaysMapper: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const matchingPathways = EARNING_PATHWAYS.filter(pathway =>
    pathway.requiredSkills.some(skill => selectedInterests.includes(skill))
  );

  const [selectedPathways, setSelectedPathways] = useState<string[]>([]);

  const togglePathway = (id: string) => {
    if (selectedPathways.includes(id)) {
      setSelectedPathways(selectedPathways.filter(p => p !== id));
    } else if (selectedPathways.length < 5) {
      setSelectedPathways([...selectedPathways, id]);
    }
  };

  const chosenPathways = EARNING_PATHWAYS.filter(p => selectedPathways.includes(p.id));

  const handleDownload = () => {
    const interests = CREATIVE_INTERESTS.filter(i => selectedInterests.includes(i.id));
    
    const content = `
CREATIVE PATHWAYS MAP
=====================
Generated by Wembley Wonders Silk Stilettos Programme

YOUR CREATIVE INTERESTS
-----------------------
${interests.map(i => `${i.icon} ${i.name}`).join('\n')}

YOUR EARNING PATHWAYS
---------------------
${chosenPathways.map(p => `
${p.name}
  ${p.description}
  Rate: ${p.rate} (${p.frequency})
  Via: ${p.programmes.join(', ')}
`).join('\n')}

EXAMPLE MONTHLY INCOME
----------------------
Combining 3 pathways could generate £200-500/month
Plus: Access to Makers Collective resources

NEXT STEPS
----------
1. Join Silk Stilettos to access these pathways
2. Connect with the Makers Collective for shared equipment
3. Start with 1-2 pathways, add more as you build capacity
4. Document your heritage skills (textile traditions from your family)

=====================
"The dressmaker in your grandmother's community wasn't famous—
she was booked."

wembleywonders.org/programmes/silk-stilettos
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creative-pathways-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>👠 Creative Pathways Mapper</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.toolIntro}>
        <p>
          Start with what you love. Discover how your creative interests connect to 
          multiple earning pathways across Wembley Wonders programmes.
        </p>
      </div>

      {step === 1 && (
        <div className={styles.stepContainer}>
          <h3>Step 1: What Do You Love Creating?</h3>
          <p className={styles.stepNote}>Select up to 5 creative interests</p>

          <div className={styles.interestsGrid}>
            {CREATIVE_INTERESTS.map((interest) => (
              <div
                key={interest.id}
                className={`${styles.interestCard} ${selectedInterests.includes(interest.id) ? styles.selected : ''}`}
                onClick={() => toggleInterest(interest.id)}
              >
                <span className={styles.interestIcon}>{interest.icon}</span>
                <span className={styles.interestName}>{interest.name}</span>
              </div>
            ))}
          </div>

          <p className={styles.selectionCount}>
            {selectedInterests.length}/5 selected
          </p>

          <button
            className={styles.nextButton}
            onClick={() => setStep(2)}
            disabled={selectedInterests.length === 0}
          >
            See Earning Pathways →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepContainer}>
          <h3>Step 2: Choose Your Earning Pathways</h3>
          <p className={styles.stepNote}>
            Based on your interests, here are ways you can earn. Select up to 5 to focus on.
          </p>

          {matchingPathways.length === 0 ? (
            <div className={styles.noMatches}>
              <p>No direct matches. Try selecting different interests.</p>
              <button onClick={() => setStep(1)}>← Back to Interests</button>
            </div>
          ) : (
            <>
              <div className={styles.pathwaysGrid}>
                {matchingPathways.map((pathway) => (
                  <div
                    key={pathway.id}
                    className={`${styles.pathwayCard} ${selectedPathways.includes(pathway.id) ? styles.selected : ''}`}
                    onClick={() => togglePathway(pathway.id)}
                  >
                    <div className={styles.pathwayHeader}>
                      <span className={styles.pathwayRate}>{pathway.rate}</span>
                    </div>
                    <h4>{pathway.name}</h4>
                    <p className={styles.pathwayDesc}>{pathway.description}</p>
                    <p className={styles.pathwayFreq}>{pathway.frequency}</p>
                    <div className={styles.pathwayProgrammes}>
                      {pathway.programmes.map((prog, i) => (
                        <span key={i} className={styles.programmeBadge}>{prog}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.stepButtons}>
                <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
                <button
                  className={styles.nextButton}
                  onClick={() => setStep(3)}
                  disabled={selectedPathways.length === 0}
                >
                  View Your Map →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepContainer}>
          <h3>Your Creative Pathways Map</h3>

          <div className={styles.pathwaysMap}>
            {chosenPathways.map((pathway, index) => (
              <div key={pathway.id} className={styles.mapItem}>
                <div className={styles.mapNumber}>{index + 1}</div>
                <div className={styles.mapContent}>
                  <h4>{pathway.name}</h4>
                  <p>{pathway.description}</p>
                  <div className={styles.mapMeta}>
                    <span className={styles.mapRate}>{pathway.rate}</span>
                    <span className={styles.mapFreq}>{pathway.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mapSummary}>
            <h4>Example Journey</h4>
            <p>
              Combining {selectedPathways.length} pathways could generate 
              <strong> £200-500/month</strong> as you build skills and reputation.
            </p>
            <p className={styles.summaryNote}>
              Plus: Access to Makers Collective shared equipment, bulk fabric buying, 
              and pardner-style capital for major purchases.
            </p>
          </div>

          <div className={styles.mapActions}>
            <button className={styles.downloadButton} onClick={handleDownload}>
              📥 Download Your Map
            </button>
            <button className={styles.backButton} onClick={() => setStep(2)}>← Edit</button>
          </div>

          <div className={styles.nextStepsBox}>
            <h4>Ready to Start?</h4>
            <p>
              Join Silk Stilettos to access these pathways and connect with the 
              Makers Collective for shared resources.
            </p>
            <Link to="/get-started" className={styles.joinButton}>
              Join Silk Stilettos →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// TEXTILE HERITAGE DOCUMENTER
// ========================================

interface TextileHeritage {
  tradition: string;
  origin: string;
  whoTaught: string;
  techniques: string[];
  materials: string;
  occasions: string;
  stillPracticed: boolean;
  memories: string;
}

const TextileHeritageDocumenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [heritage, setHeritage] = useState<Partial<TextileHeritage>>({
    techniques: []
  });
  const [step, setStep] = useState(1);

  const techniqueOptions = [
    "Hand sewing",
    "Machine sewing",
    "Embroidery",
    "Beadwork",
    "Dyeing (tie-dye, batik)",
    "Weaving",
    "Crochet/Knitting",
    "Pattern-making",
    "Tailoring/Fitting",
    "Headwrap tying",
    "Wire-bending (carnival)",
    "Featherwork",
    "Leather work",
    "Jewelry making"
  ];

  const toggleTechnique = (tech: string) => {
    const current = heritage.techniques || [];
    if (current.includes(tech)) {
      setHeritage({ ...heritage, techniques: current.filter(t => t !== tech) });
    } else {
      setHeritage({ ...heritage, techniques: [...current, tech] });
    }
  };

  const handleDownload = () => {
    const content = `
TEXTILE HERITAGE DOCUMENTATION
==============================
Captured by Wembley Wonders Silk Stilettos Programme

YOUR TEXTILE TRADITION
----------------------
Tradition: ${heritage.tradition || 'Not specified'}
Origin: ${heritage.origin || 'Not specified'}
Who taught you: ${heritage.whoTaught || 'Not specified'}

TECHNIQUES
----------
${(heritage.techniques || []).map(t => `• ${t}`).join('\n') || 'None specified'}

MATERIALS & OCCASIONS
---------------------
Materials used: ${heritage.materials || 'Not specified'}
Made for occasions: ${heritage.occasions || 'Not specified'}
Still practiced: ${heritage.stillPracticed ? 'Yes' : 'No'}

YOUR MEMORIES
-------------
${heritage.memories || 'None recorded'}

==============================
This is heritage skill. Your family had textile knowledge passed 
through generations. We're documenting and applying these traditions 
to contemporary creative work.

wembleywonders.org/programmes/silk-stilettos
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `textile-heritage-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>🧵 Textile Heritage Documenter</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.toolIntro}>
        <p>
          Your grandmother's sewing skills weren't just hobby—they were economic survival 
          and cultural preservation. Document the textile traditions in your family.
        </p>
      </div>

      {step === 1 && (
        <div className={styles.stepContainer}>
          <h3>Step 1: Your Textile Tradition</h3>

          <div className={styles.formGroup}>
            <label>What textile tradition does your family have?</label>
            <select
              value={heritage.tradition || ''}
              onChange={(e) => setHeritage({ ...heritage, tradition: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="dressmaking">Dressmaking / Sewing clothes</option>
              <option value="tailoring">Tailoring / Formal wear</option>
              <option value="embroidery">Embroidery / Decorative sewing</option>
              <option value="african-print">African print clothing</option>
              <option value="carnival">Carnival costume making</option>
              <option value="church-wear">Church / Occasion wear</option>
              <option value="headwrap">Headwrap / Gele tying</option>
              <option value="quilting">Quilting / Patchwork</option>
              <option value="crochet">Crochet / Knitting</option>
              <option value="alterations">Alterations / Repair</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Where does this tradition come from?</label>
            <input
              type="text"
              placeholder="e.g., Jamaica, Nigeria, Trinidad, Ghana..."
              value={heritage.origin || ''}
              onChange={(e) => setHeritage({ ...heritage, origin: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Who taught you (or who practiced this in your family)?</label>
            <input
              type="text"
              placeholder="e.g., My grandmother, My aunt, My mother..."
              value={heritage.whoTaught || ''}
              onChange={(e) => setHeritage({ ...heritage, whoTaught: e.target.value })}
            />
          </div>

          <button
            className={styles.nextButton}
            onClick={() => setStep(2)}
            disabled={!heritage.tradition}
          >
            Continue →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepContainer}>
          <h3>Step 2: Techniques & Skills</h3>
          <p className={styles.stepNote}>Select all techniques that were part of this tradition</p>

          <div className={styles.techniquesGrid}>
            {techniqueOptions.map((tech) => (
              <label key={tech} className={styles.techniqueOption}>
                <input
                  type="checkbox"
                  checked={(heritage.techniques || []).includes(tech)}
                  onChange={() => toggleTechnique(tech)}
                />
                <span>{tech}</span>
              </label>
            ))}
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(1)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(3)}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepContainer}>
          <h3>Step 3: Context & Memories</h3>

          <div className={styles.formGroup}>
            <label>What materials were commonly used?</label>
            <input
              type="text"
              placeholder="e.g., African print fabric, lace, cotton, beads..."
              value={heritage.materials || ''}
              onChange={(e) => setHeritage({ ...heritage, materials: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label>What occasions were things made for?</label>
            <input
              type="text"
              placeholder="e.g., Church, weddings, carnival, everyday wear..."
              value={heritage.occasions || ''}
              onChange={(e) => setHeritage({ ...heritage, occasions: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={heritage.stillPracticed || false}
                onChange={(e) => setHeritage({ ...heritage, stillPracticed: e.target.checked })}
              />
              This tradition is still practiced in my family
            </label>
          </div>

          <div className={styles.formGroup}>
            <label>Share any memories or stories about this tradition</label>
            <textarea
              placeholder="What do you remember? Stories about who made things, how they learned, what it meant..."
              value={heritage.memories || ''}
              onChange={(e) => setHeritage({ ...heritage, memories: e.target.value })}
            />
          </div>

          <div className={styles.stepButtons}>
            <button className={styles.backButton} onClick={() => setStep(2)}>← Back</button>
            <button className={styles.nextButton} onClick={() => setStep(4)}>Review →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className={styles.stepContainer}>
          <h3>Your Textile Heritage</h3>

          <div className={styles.heritageSummary}>
            <div className={styles.summarySection}>
              <h4>The Tradition</h4>
              <p><strong>{heritage.tradition}</strong> from {heritage.origin}</p>
              <p>Learned from: {heritage.whoTaught}</p>
            </div>

            <div className={styles.summarySection}>
              <h4>Techniques</h4>
              <div className={styles.techniqueTags}>
                {(heritage.techniques || []).map((tech, i) => (
                  <span key={i} className={styles.techniqueTag}>{tech}</span>
                ))}
              </div>
            </div>

            <div className={styles.summarySection}>
              <h4>Materials & Occasions</h4>
              <p>Materials: {heritage.materials}</p>
              <p>Made for: {heritage.occasions}</p>
              <p>Still practiced: {heritage.stillPracticed ? 'Yes ✓' : 'No'}</p>
            </div>

            {heritage.memories && (
              <div className={styles.summarySection}>
                <h4>Your Memories</h4>
                <p className={styles.memoriesText}>{heritage.memories}</p>
              </div>
            )}
          </div>

          <div className={styles.heritageNote}>
            <p>
              <strong>This is heritage skill.</strong> Your family had textile knowledge 
              passed through generations. The dressmaker didn't learn at fashion school—
              she learned from watching, practicing, making. These skills have economic 
              value today.
            </p>
          </div>

          <div className={styles.mapActions}>
            <button className={styles.downloadButton} onClick={handleDownload}>
              📥 Download Heritage Document
            </button>
            <button className={styles.backButton} onClick={() => setStep(3)}>← Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// MAKERS COLLECTIVE CALCULATOR
// ========================================

const MakersCollectiveCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [members, setMembers] = useState(10);
  const [contribution, setContribution] = useState(40);
  const [focus, setFocus] = useState('');

  const poolPerMonth = members * contribution;
  const cycleLength = `${members} months`;

  const equipmentExamples = [
    { name: "Industrial sewing machine", cost: 400 },
    { name: "Overlocker/Serger", cost: 350 },
    { name: "Embroidery machine (shared)", cost: 600 },
    { name: "Cutting table & mats", cost: 200 },
    { name: "Dress forms (set)", cost: 250 },
    { name: "Iron & pressing station", cost: 150 },
    { name: "Jewelry tools kit", cost: 200 },
    { name: "Photography lighting", cost: 300 },
  ];

  const fabricBulkSavings = [
    { item: "Ankara (10 yards)", individual: 120, collective: 80 },
    { item: "Lace fabric (5 yards)", individual: 75, collective: 50 },
    { item: "Thread (bulk)", individual: 40, collective: 25 },
    { item: "Zips & notions", individual: 30, collective: 18 },
  ];

  const whatYouCouldBuy = equipmentExamples.filter(e => e.cost <= poolPerMonth);

  return (
    <div className={styles.toolContainer}>
      <div className={styles.toolHeader}>
        <h2>🧮 Makers Collective Calculator</h2>
        <button onClick={onClose} className={styles.closeButton}>← Back</button>
      </div>

      <div className={styles.toolIntro}>
        <p>
          The Makers Collective applies pardner principles to creative resources. Pool funds 
          for equipment, share studio space, bulk-buy materials together.
        </p>
      </div>

      <div className={styles.calculatorForm}>
        <div className={styles.formGroup}>
          <label>Number of Members</label>
          <input
            type="range"
            min="5"
            max="20"
            value={members}
            onChange={(e) => setMembers(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>{members} makers</span>
        </div>

        <div className={styles.formGroup}>
          <label>Monthly Contribution per Person</label>
          <input
            type="range"
            min="20"
            max="100"
            step="10"
            value={contribution}
            onChange={(e) => setContribution(Number(e.target.value))}
          />
          <span className={styles.rangeValue}>£{contribution}/month</span>
        </div>

        <div className={styles.formGroup}>
          <label>Collective Focus</label>
          <select
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
          >
            <option value="">Select focus...</option>
            <option value="equipment">Equipment purchases</option>
            <option value="fabric">Bulk fabric buying</option>
            <option value="studio">Shared studio space</option>
            <option value="mixed">Mixed purposes</option>
          </select>
        </div>
      </div>

      <div className={styles.calculatorResults}>
        <h3>Your Makers Collective</h3>

        <div className={styles.resultsGrid}>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Monthly Pool</span>
            <span className={styles.resultValue}>£{poolPerMonth}</span>
          </div>
          <div className={styles.resultCard}>
            <span className={styles.resultLabel}>Cycle Length</span>
            <span className={styles.resultValue}>{cycleLength}</span>
          </div>
          <div className={`${styles.resultCard} ${styles.highlight}`}>
            <span className={styles.resultLabel}>Your "Hand"</span>
            <span className={styles.resultValue}>£{poolPerMonth}</span>
          </div>
        </div>

        <div className={styles.whatYouCouldBuy}>
          <h4>With £{poolPerMonth}, You Could Buy:</h4>
          <div className={styles.equipmentList}>
            {whatYouCouldBuy.map((item) => (
              <div key={item.name} className={styles.equipmentItem}>
                <span>{item.name}</span>
                <span>£{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bulkBuyingSection}>
          <h4>Bulk Buying Power</h4>
          <p className={styles.bulkNote}>
            {members} people buying together = wholesale prices
          </p>
          <div className={styles.savingsTable}>
            <div className={styles.savingsHeader}>
              <span>Item</span>
              <span>Individual</span>
              <span>Collective</span>
              <span>You Save</span>
            </div>
            {fabricBulkSavings.map((item) => (
              <div key={item.item} className={styles.savingsRow}>
                <span>{item.item}</span>
                <span>£{item.individual}</span>
                <span>£{item.collective}</span>
                <span className={styles.savingsAmount}>£{item.individual - item.collective}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.collectiveNote}>
          <h4>Key Principles</h4>
          <ul>
            <li><strong>Pardner for equipment:</strong> Rotating "hand" for major purchases</li>
            <li><strong>Shared ownership:</strong> Expensive machines owned collectively</li>
            <li><strong>Bulk buying:</strong> Pool orders for wholesale prices</li>
            <li><strong>Studio sharing:</strong> Split workshop/studio rent</li>
            <li><strong>Trust-based:</strong> Only form with people you trust</li>
          </ul>
        </div>
      </div>

      <div className={styles.nextStepsBox}>
        <h4>Ready to Join a Makers Collective?</h4>
        <p>
          Connect with other Silk Stilettos members who want to pool resources. 
          We can help facilitate introductions and set up accountability structures.
        </p>
        <Link to="/get-started" className={styles.joinButton}>
          Join Silk Stilettos →
        </Link>
      </div>
    </div>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================

const CreativePathwaysPlanner: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(null);

  if (activeTool === 'pathways-mapper') {
    return <PathwaysMapper onClose={() => setActiveTool(null)} />;
  }

  if (activeTool === 'textile-heritage') {
    return <TextileHeritageDocumenter onClose={() => setActiveTool(null)} />;
  }

  if (activeTool === 'makers-collective') {
    return <MakersCollectiveCalculator onClose={() => setActiveTool(null)} />;
  }

  if (activeTool === 'carnival-calculator') {
    return (
      <div className={styles.comingSoonPage}>
        <h2>🎭 Carnival Costing Calculator Coming Soon!</h2>
        <p>Plan your mas costume economics—materials, labor, pricing.</p>
        <button onClick={() => setActiveTool(null)}>← Back</button>
      </div>
    );
  }

  return (
    <div className={styles.plannerContent}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Creative Pathways Planner</h1>
          <p className={styles.heroQuote}>
            "The dressmaker in your grandmother's community wasn't famous—she was booked."
          </p>
          <p className={styles.heroSubtext}>
            Your creative skills have value. Your heritage has meaning. 
            Discover how they connect to earning pathways.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className={styles.toolsSection}>
        <h2>Your Creative Tools</h2>

        <div className={styles.toolsGrid}>
          {/* Pathways Mapper */}
          <div className={styles.toolCard}>
            <div className={styles.toolIcon}>👠</div>
            <h3>Creative Pathways Mapper</h3>
            <p>
              Start with what you love creating. Discover how jewelry-making connects 
              to costume design, how sewing leads to production work, how styling 
              flows into content creation.
            </p>
            <div className={styles.toolFeatures}>
              <span>12 creative interests</span>
              <span>12+ earning pathways</span>
              <span>Income estimates</span>
            </div>
            <button
              className={styles.toolButton}
              onClick={() => setActiveTool('pathways-mapper')}
            >
              Map Your Pathways →
            </button>
          </div>

          {/* Textile Heritage */}
          <div className={styles.toolCard}>
            <div className={styles.toolIcon}>🧵</div>
            <h3>Textile Heritage Documenter</h3>
            <p>
              Document your family's textile traditions. Who sewed? What techniques 
              did they use? Your grandmother's skills weren't just hobby—they were 
              economic survival and cultural preservation.
            </p>
            <div className={styles.toolFeatures}>
              <span>Family traditions</span>
              <span>Technique capture</span>
              <span>Heritage record</span>
            </div>
            <button
              className={styles.toolButton}
              onClick={() => setActiveTool('textile-heritage')}
            >
              Document Your Heritage →
            </button>
          </div>

          {/* Makers Collective */}
          <div className={styles.toolCard}>
            <div className={styles.toolIcon}>🤝</div>
            <h3>Makers Collective Calculator</h3>
            <p>
              Model a Makers Collective—pardner-style resource sharing for creative work. 
              Pool funds for equipment, bulk-buy fabric together, share studio costs.
            </p>
            <div className={styles.toolFeatures}>
              <span>Equipment pooling</span>
              <span>Bulk buying power</span>
              <span>Studio sharing</span>
            </div>
            <button
              className={styles.toolButton}
              onClick={() => setActiveTool('makers-collective')}
            >
              Calculate Your Collective →
            </button>
          </div>

          {/* Carnival Calculator */}
          <div className={styles.toolCard}>
            <div className={styles.toolIcon}>🎭</div>
            <h3>Carnival Costing Calculator</h3>
            <p>
              Plan your mas costume economics. Calculate materials, labor, pricing. 
              Carnival skills transfer to theatre, events, and year-round commissions.
            </p>
            <div className={styles.toolFeatures}>
              <span>Materials costing</span>
              <span>Labor pricing</span>
              <span>Revenue projection</span>
            </div>
            <button
              className={styles.toolButton}
              onClick={() => setActiveTool('carnival-calculator')}
            >
              Plan Carnival Work →
            </button>
            <span className={styles.comingSoonBadge}>Coming Soon</span>
          </div>
        </div>
      </section>

      {/* The Third Path */}
      <section className={styles.thirdPathSection}>
        <h2>The Third Path</h2>
        <div className={styles.pathComparison}>
          <div className={styles.oldPath}>
            <h4>Old Path</h4>
            <p>Fashion school → Get discovered → Fashion Week → Brand deal</p>
            <p className={styles.pathNote}>Winner-take-all. Most fail.</p>
          </div>
          <div className={styles.newPath}>
            <h4>Third Path</h4>
            <p>Build skills → Serve community → Multiple streams → Collective resources</p>
            <p className={styles.pathNote}>Steady income. Skills compound.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>Ready to Build?</h2>
          <p>
            Your skills have value. Your heritage has meaning. Join Silk Stilettos 
            to connect with other makers and access earning pathways.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/get-started" className={styles.ctaPrimary}>
              Join Silk Stilettos
            </Link>
            <Link to="/programmes/silk-stilettos" className={styles.ctaSecondary}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className={styles.backSection}>
        <Link to="/programmes/silk-stilettos" className={styles.backLink}>
          ← Back to Silk Stilettos Programme
        </Link>
      </section>
    </div>
  );
};

export default CreativePathwaysPlanner;