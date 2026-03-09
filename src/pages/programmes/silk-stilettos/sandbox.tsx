import React, { useState } from 'react';
import PageTemplate from '../../../components/PageTemplate';
import PageMeta from '@components/PageMeta';
import { CheckCircle, AlertCircle, Scissors, Package } from 'lucide-react';
import './sandbox.css';

/**
 * Silk Stilettos Sandbox — Creative Pathways Planner
 * ===================================================
 * Four tools:
 * 1. Making Interests Mapper — what do you make / want to make → what does that lead to
 * 2. Pricing Calculator — cost your work correctly
 * 3. Makers Pardner — collective equipment model
 * 4. First Commission Builder — plan your first paid piece
 */

// ── INTERESTS & PATHWAYS ──────────────────────────────────────────────────────

const makingInterests = [
  // Construction disciplines
  { id: 'tailoring', label: 'Tailoring & suit construction', category: 'Construction', icon: '🎩' },
  { id: 'pattern-cutting', label: 'Pattern cutting & grading', category: 'Construction', icon: '📐' },
  { id: 'carnival-costume', label: 'Carnival costume & armature', category: 'Construction', icon: '🎭' },
  { id: 'structural-making', label: 'Wire-bending & structural making', category: 'Construction', icon: '⚙️' },
  { id: 'dressmaking', label: 'Dressmaking & occasion wear', category: 'Construction', icon: '👗' },
  { id: 'upcycling', label: 'Upcycling & garment transformation', category: 'Construction', icon: '♻️' },
  // Textile disciplines
  { id: 'african-print', label: 'African print & ankara work', category: 'Textiles', icon: '🌍' },
  { id: 'fabric-knowledge', label: 'Fabric selection & properties', category: 'Textiles', icon: '🧵' },
  { id: 'embroidery', label: 'Embroidery & surface decoration', category: 'Textiles', icon: '✨' },
  { id: 'beading', label: 'Beading & featherwork', category: 'Textiles', icon: '💎' },
  { id: 'textile-heritage', label: 'Textile heritage documentation', category: 'Textiles', icon: '📚' },
  // Design disciplines
  { id: 'print-design', label: 'Pattern & print design', category: 'Design', icon: '🎨' },
  { id: 'collection-planning', label: 'Collection & range planning', category: 'Design', icon: '📋' },
  { id: 'tech-pack', label: 'Technical specification (tech packs)', category: 'Design', icon: '📝' },
  { id: 'pod-products', label: 'Print-on-demand product design', category: 'Design', icon: '🛒' },
  // Business disciplines
  { id: 'bespoke-commission', label: 'Bespoke & commission work', category: 'Business', icon: '📐' },
  { id: 'alteration', label: 'Alteration & repair service', category: 'Business', icon: '✂️' },
  { id: 'wardrobe-styling', label: 'Wardrobe & personal styling', category: 'Business', icon: '🗡️' },
  { id: 'theatre-costume', label: 'Theatre & film costume', category: 'Business', icon: '🎬' },
];

const pathwayMap: Record<string, { title: string; description: string; earning: string; communityDemand: string; connections: string[] }> = {
  'tailoring+pattern-cutting': {
    title: 'Bespoke Tailor',
    description: 'The foundation combination. Pattern cutting gives you the technical language; tailoring gives you the construction skill. Together they make you the person who can take a client\'s measurements, make a toile, adjust, and deliver a garment that fits like it was made for them. Because it was.',
    earning: '£40-120 per piece depending on complexity. Suits £150-500. Reputation builds through referrals — you never need to advertise if you do good work.',
    communityDemand: 'Extremely high. Church dress, African print occasions, wedding party outfits. The community already spends this money — currently at shops that don\'t know their culture.',
    connections: ['carnival-costume', 'theatre-costume', 'bespoke-commission']
  },
  'carnival-costume+structural-making': {
    title: 'Carnival Engineer',
    description: 'The combination that most people don\'t recognise as engineering until they try it. Building a backpiece that weighs 25kg and has to move, not fall apart in the rain, and allow the wearer to dance for six hours — that\'s applied physics. Wire gauge, load distribution, pivot points, materials under stress.',
    earning: 'Section leader pieces £200-2000+ depending on scale. Theatre and film costume work once reputation established. Carnival season concentrated income with year-round preparation.',
    communityDemand: 'Every carnival band needs builders, not just designers. The making skill is the scarce one.',
    connections: ['beading', 'featherwork', 'theatre-costume']
  },
  'african-print+dressmaking': {
    title: 'Cultural Dressmaker',
    description: 'Understanding ankara, kente, madras and other heritage textiles at the level of how they\'re made and how they behave — combined with the construction skill to make garments that honour the cloth. This combination has enormous community demand and almost no competition from high street alternatives who don\'t understand the textiles.',
    earning: '£80-300 per commission. Occasion wear (naming ceremonies, weddings, graduations) commands premium pricing when the maker understands the cultural weight of the piece.',
    communityDemand: 'Every family event. Every diaspora occasion. The person who makes these pieces for a community builds lifelong client relationships.',
    connections: ['tailoring', 'pattern-cutting', 'bespoke-commission']
  },
  'print-design+pod-products': {
    title: 'Digital Print Maker',
    description: 'Designing patterns and graphics that translate to fabric and products — understanding repeat, scale, colour separation, and how a design reads on a body rather than a screen. Print-on-demand removes the inventory risk entirely. The design is the asset.',
    earning: 'Passive income per sale. A well-performing design on Cyberstore or Printful sells while you sleep. Volume builds over time. Single designs can generate £200-2000+ annually.',
    communityDemand: 'Every programme in Wembley Wonders needs branded merchandise. That\'s a built-in customer base before the public.',
    connections: ['collection-planning', 'tech-pack', 'textile-heritage']
  },
  'upcycling+alteration': {
    title: 'Retrofit Specialist',
    description: 'Understanding what a garment is structurally so you can understand what it could become. Deconstruction, reconstruction, transformation. This is the Scrap Cat connection in textiles — the circular economy of cloth. Also the fastest path to a sustainable service business because demand is consistent and the skill set is approachable.',
    earning: '£15-60 per alteration. Transformation pieces £40-150. Service model with repeat clients — the person who hems your trousers also transforms your vintage coat two years later.',
    communityDemand: 'Every household has clothes that don\'t fit, vintage pieces worth saving, garments that need extending. This demand doesn\'t disappear in a recession — it increases.',
    connections: ['fabric-knowledge', 'dressmaking', 'textile-heritage']
  },
  'theatre-costume+structural-making': {
    title: 'Performance Costume Builder',
    description: 'Theatre, film, and music video costume requires the full range — tailoring, structural making, quick-change engineering, durability under performance conditions. This is where the saga boy tradition meets the screen. The well-dressed character who moves in their clothes.',
    earning: 'Freelance rates £150-400/day for film and TV. Theatre varies widely but the skill set is in genuine demand. Portfolio builds through community theatre and music video before professional commissions.',
    communityDemand: 'Every G-Tech Casters production. Every Easy Street recording. Every Kaywana\'s Court performance. The community infrastructure creates internal demand.',
    connections: ['carnival-costume', 'beading', 'wardrobe-styling']
  },
};

const getPathwayKey = (interests: string[]): string | null => {
  const combos = Object.keys(pathwayMap);
  for (const combo of combos) {
    const parts = combo.split('+');
    if (parts.every(p => interests.includes(p))) return combo;
  }
  // Single-interest fallbacks
  if (interests.includes('tailoring') || interests.includes('pattern-cutting')) return 'tailoring+pattern-cutting';
  if (interests.includes('carnival-costume') || interests.includes('structural-making')) return 'carnival-costume+structural-making';
  if (interests.includes('african-print') || interests.includes('dressmaking')) return 'african-print+dressmaking';
  if (interests.includes('print-design') || interests.includes('pod-products')) return 'print-design+pod-products';
  if (interests.includes('upcycling') || interests.includes('alteration')) return 'upcycling+alteration';
  if (interests.includes('theatre-costume')) return 'theatre-costume+structural-making';
  return null;
};

// ── PRICING DATA ──────────────────────────────────────────────────────────────

interface PricingInputs {
  materialCost: number;
  hoursSpent: number;
  hourlyRate: number;
  overheadPercent: number;
  markupPercent: number;
  pieceType: string;
}

const pieceTypes = [
  { id: 'alteration-simple', label: 'Simple alteration (hem, zip)', baseHours: 1, marketMin: 12, marketMax: 25 },
  { id: 'alteration-complex', label: 'Complex alteration (resize, reshape)', baseHours: 3, marketMin: 35, marketMax: 65 },
  { id: 'dress-simple', label: 'Simple dress from pattern', baseHours: 8, marketMin: 80, marketMax: 150 },
  { id: 'dress-bespoke', label: 'Bespoke dress (toile + fitting)', baseHours: 16, marketMin: 180, marketMax: 350 },
  { id: 'suit-jacket', label: 'Bespoke suit jacket', baseHours: 25, marketMin: 280, marketMax: 600 },
  { id: 'african-occasion', label: 'African print occasion outfit', baseHours: 12, marketMin: 150, marketMax: 300 },
  { id: 'carnival-costume', label: 'Carnival costume (section member)', baseHours: 20, marketMin: 200, marketMax: 500 },
  { id: 'carnival-backpiece', label: 'Carnival backpiece / section leader', baseHours: 60, marketMin: 500, marketMax: 2000 },
  { id: 'theatre-costume', label: 'Theatre costume piece', baseHours: 18, marketMin: 150, marketMax: 400 },
];

// ── FIRST COMMISSION BUILDER ──────────────────────────────────────────────────

const firstCommissionSteps = [
  {
    step: 1,
    title: 'Decide what you\'re offering',
    description: 'Start with one thing you can do well right now. Not everything. One thing. Alterations are the classic starting point — consistent demand, quick turnaround, immediate feedback on quality.',
    action: 'Write down: what is the one thing I can make or alter well enough to charge for today?'
  },
  {
    step: 2,
    title: 'Price it correctly from the start',
    description: 'Underpricing is the most common mistake. It devalues your work AND everyone else\'s. The dressmaker who charges £10 for a hem makes it harder for every other maker in the community to charge £20. Use the pricing calculator. Charge what the work costs.',
    action: 'Use the pricing tool to calculate your first piece. Don\'t discount it.'
  },
  {
    step: 3,
    title: 'Document everything',
    description: 'Photo before. Photo after. Note the fabric, the challenge, the solution. This builds your portfolio faster than anything else. Three documented pieces with clear before/after is more powerful than a hundred undocumented ones.',
    action: 'Set up a simple folder. Every piece gets documented before it leaves your hands.'
  },
  {
    step: 4,
    title: 'Your first client is already in your network',
    description: 'You don\'t need to find clients. Someone in your immediate community has clothes that don\'t fit, a carnival costume that needs building, a wedding outfit that needs making. They\'re already spending this money. They just don\'t know you\'re the person to call yet.',
    action: 'Tell three people what you can now make. Offer them your rate. Not a discount — your rate.'
  },
  {
    step: 5,
    title: 'The second client comes from the first',
    description: 'The dressmaker who wasn\'t famous was booked. Not because she marketed herself — because she did good work and the community talked. Every piece you make well is a referral engine. Focus on quality over volume until your reputation is established.',
    action: 'After your first commission: ask for a photo for your portfolio and ask if they know anyone else who might need your skills.'
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

const SilkStilettossandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pathways' | 'pricing' | 'pardner' | 'commission'>('pathways');

  // Pathways state
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  const activeCategory = ['Construction', 'Textiles', 'Design', 'Business'];

  // Pricing state
  const [pricing, setPricing] = useState<PricingInputs>({
    materialCost: 30,
    hoursSpent: 8,
    hourlyRate: 15,
    overheadPercent: 20,
    markupPercent: 15,
    pieceType: 'dress-simple'
  });

  // Pardner state
  const [pardnerMembers, setPardnerMembers] = useState(10);
  const [pardnerContrib, setPardnerContrib] = useState(40);

  const pardnerPool = pardnerMembers * pardnerContrib;

  const collectiveEquipment = [
    { name: 'Industrial straight stitch machine (Juki)', cost: 450 },
    { name: 'Overlocker / serger (Brother)', cost: 300 },
    { name: 'Coverstitch machine', cost: 280 },
    { name: 'Embroidery machine', cost: 400 },
    { name: 'Cutting table (professional)', cost: 180 },
    { name: 'Dress forms — full size range (set of 6)', cost: 320 },
    { name: 'Professional pressing station', cost: 150 },
  ];

  const totalEquipment = collectiveEquipment.reduce((s, e) => s + e.cost, 0);
  const canAfford = pardnerPool >= totalEquipment;

  // Pricing calculations
  const labourCost = pricing.hoursSpent * pricing.hourlyRate;
  const subtotal = pricing.materialCost + labourCost;
  const overhead = subtotal * (pricing.overheadPercent / 100);
  const subtotalWithOverhead = subtotal + overhead;
  const markup = subtotalWithOverhead * (pricing.markupPercent / 100);
  const finalPrice = Math.ceil(subtotalWithOverhead + markup);

  const selectedPieceType = pieceTypes.find(p => p.id === pricing.pieceType);
  const isUnderpriced = selectedPieceType && finalPrice < selectedPieceType.marketMin;
  const isOverpriced = selectedPieceType && finalPrice > selectedPieceType.marketMax * 1.5;

  // Pathways
  const toggleInterest = (id: string) => {
    const next = new Set(selectedInterests);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedInterests(next);
  };

  const interestArray = Array.from(selectedInterests);
  const pathwayKey = getPathwayKey(interestArray);
  const pathway = pathwayKey ? pathwayMap[pathwayKey] : null;

  return (
    <PageTemplate pageTitle="Silk Stilettos Sandbox" pageType="sandbox">
      <PageMeta pageKey="silk-stilettos-sandbox" />

      <div className="sandbox-container silk-stilettos-sandbox">

        {/* Header */}
        <div className="sandbox-header ss-sandbox-header">
          <div className="sandbox-header-badge">🗡️</div>
          <h1>Silk Stilettos — Creative Pathways Planner</h1>
          <p>Map your making interests to pathways, price your work correctly, plan the collective, and build your first commission.</p>
        </div>

        {/* Tabs */}
        <div className="sandbox-tabs">
          {[
            { id: 'pathways', label: '🗡️ Your Pathway' },
            { id: 'pricing', label: '💷 Price Your Work' },
            { id: 'pardner', label: '🧵 Makers Pardner' },
            { id: 'commission', label: '📋 First Commission' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`sandbox-tab ss-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: PATHWAYS ───────────────────────────────────────────────── */}
        {activeTab === 'pathways' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>What Do You Make?</h2>
              <p>Select the making disciplines that interest you — what you already do, what you want to learn, what pulls you. The pathway emerges from the combination.</p>
            </div>

            {activeCategory.map(category => (
              <div key={category} className="interest-category">
                <h3 className="category-label">{category}</h3>
                <div className="interests-grid">
                  {makingInterests.filter(i => i.category === category).map(interest => (
                    <button
                      key={interest.id}
                      className={`interest-btn ${selectedInterests.has(interest.id) ? 'selected' : ''}`}
                      onClick={() => toggleInterest(interest.id)}
                    >
                      <span className="interest-icon">{interest.icon}</span>
                      <span className="interest-label">{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {selectedInterests.size === 0 && (
              <div className="empty-state">
                <p>Select what interests you — the pathway emerges from the combination.</p>
              </div>
            )}

            {selectedInterests.size > 0 && !pathway && (
              <div className="pathway-exploring">
                <p>Keep selecting — pathways emerge from combinations of disciplines. Try adding more.</p>
              </div>
            )}

            {pathway && (
              <div className="pathway-result">
                <div className="pathway-header">
                  <span className="pathway-badge">🗡️</span>
                  <h3>{pathway.title}</h3>
                </div>
                <p className="pathway-description">{pathway.description}</p>
                <div className="pathway-details">
                  <div className="pathway-detail">
                    <h4>Earning potential</h4>
                    <p>{pathway.earning}</p>
                  </div>
                  <div className="pathway-detail">
                    <h4>Community demand</h4>
                    <p>{pathway.communityDemand}</p>
                  </div>
                </div>
                {pathway.connections.length > 0 && (
                  <div className="pathway-connections">
                    <h4>Disciplines that extend this pathway:</h4>
                    <div className="pathway-tags">
                      {pathway.connections.map(c => {
                        const interest = makingInterests.find(i => i.id === c);
                        return interest ? (
                          <button
                            key={c}
                            className={`pathway-tag ${selectedInterests.has(c) ? 'active' : ''}`}
                            onClick={() => toggleInterest(c)}
                          >
                            {interest.icon} {interest.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: PRICING ────────────────────────────────────────────────── */}
        {activeTab === 'pricing' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>Price Your Work Correctly</h2>
              <p>The most common mistake in maker businesses is underpricing. It devalues your work and everyone else's. This calculator shows you what your work actually costs to produce — and how that compares to what the market charges.</p>
            </div>

            <div className="pricing-inputs">
              <div className="pricing-piece-type">
                <label>What are you making?</label>
                <select
                  value={pricing.pieceType}
                  onChange={e => {
                    const type = pieceTypes.find(p => p.id === e.target.value);
                    setPricing(prev => ({
                      ...prev,
                      pieceType: e.target.value,
                      hoursSpent: type?.baseHours ?? prev.hoursSpent
                    }));
                  }}
                >
                  {pieceTypes.map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>

              <div className="pricing-grid">
                <div className="pricing-input-group">
                  <label>Material cost (£)</label>
                  <input
                    type="number" min={0} max={500} value={pricing.materialCost}
                    onChange={e => setPricing(prev => ({ ...prev, materialCost: +e.target.value }))}
                  />
                </div>
                <div className="pricing-input-group">
                  <label>Hours spent</label>
                  <input
                    type="number" min={0.5} max={100} step={0.5} value={pricing.hoursSpent}
                    onChange={e => setPricing(prev => ({ ...prev, hoursSpent: +e.target.value }))}
                  />
                </div>
                <div className="pricing-input-group">
                  <label>Your hourly rate (£)</label>
                  <input
                    type="number" min={10} max={100} value={pricing.hourlyRate}
                    onChange={e => setPricing(prev => ({ ...prev, hourlyRate: +e.target.value }))}
                  />
                  <span className="input-note">Minimum wage is £11.44. Start at £15 minimum.</span>
                </div>
                <div className="pricing-input-group">
                  <label>Overhead % (tools, space, thread)</label>
                  <input
                    type="range" min={10} max={40} value={pricing.overheadPercent}
                    onChange={e => setPricing(prev => ({ ...prev, overheadPercent: +e.target.value }))}
                  />
                  <span className="range-value">{pricing.overheadPercent}%</span>
                </div>
                <div className="pricing-input-group">
                  <label>Profit margin %</label>
                  <input
                    type="range" min={5} max={50} value={pricing.markupPercent}
                    onChange={e => setPricing(prev => ({ ...prev, markupPercent: +e.target.value }))}
                  />
                  <span className="range-value">{pricing.markupPercent}%</span>
                </div>
              </div>
            </div>

            <div className="pricing-breakdown">
              <h3>Breakdown</h3>
              <div className="breakdown-rows">
                <div className="breakdown-row">
                  <span>Materials</span>
                  <span>£{pricing.materialCost.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Labour ({pricing.hoursSpent}h × £{pricing.hourlyRate}/h)</span>
                  <span>£{labourCost.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Overhead ({pricing.overheadPercent}%)</span>
                  <span>£{overhead.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Profit margin ({pricing.markupPercent}%)</span>
                  <span>£{markup.toFixed(2)}</span>
                </div>
                <div className="breakdown-row total">
                  <span>Your price</span>
                  <span>£{finalPrice}</span>
                </div>
              </div>
            </div>

            {selectedPieceType && (
              <div className={`pricing-verdict ${isUnderpriced ? 'underpriced' : isOverpriced ? 'overpriced' : 'fair'}`}>
                {isUnderpriced ? (
                  <>
                    <AlertCircle size={20} />
                    <div>
                      <strong>You're underpricing.</strong>
                      <p>Market rate for {selectedPieceType.label.toLowerCase()} is £{selectedPieceType.marketMin}–£{selectedPieceType.marketMax}. Your calculated price is below market minimum. Either raise your hourly rate or acknowledge this piece takes longer than you've accounted for.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <div>
                      <strong>Fair pricing.</strong>
                      <p>Your calculated price of £{finalPrice} sits within the market range of £{selectedPieceType.marketMin}–£{selectedPieceType.marketMax} for {selectedPieceType.label.toLowerCase()}. Charge this.</p>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="pricing-principle">
              <blockquote>
                "The woman who sewed for the whole community for forty years and charged £5 a piece 
                wasn't being generous. She was being undervalued, and she was passing that 
                undervaluation to everyone who came after her. 
                Charge what the work costs. That's respect — for your skills and for the tradition."
              </blockquote>
            </div>
          </div>
        )}

        {/* ── TAB 3: MAKERS PARDNER ─────────────────────────────────────────── */}
        {activeTab === 'pardner' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>The Makers Pardner — Collective Equipment</h2>
              <p>An industrial sewing machine is £400-500. An overlocker is £300. A full professional setup costs £2,000+. The pardner model makes that accessible — everyone contributes, everyone benefits, rotating lump sums buy the tools.</p>
            </div>

            <div className="collective-controls">
              <div className="control-group">
                <label>Members in the pardner</label>
                <div className="slider-row">
                  <input type="range" min={4} max={20} value={pardnerMembers}
                    onChange={e => setPardnerMembers(+e.target.value)} />
                  <span className="slider-value">{pardnerMembers}</span>
                </div>
              </div>
              <div className="control-group">
                <label>Monthly contribution per member</label>
                <div className="slider-row">
                  <input type="range" min={20} max={100} step={5} value={pardnerContrib}
                    onChange={e => setPardnerContrib(+e.target.value)} />
                  <span className="slider-value">£{pardnerContrib}</span>
                </div>
              </div>
            </div>

            <div className="collective-summary">
              <div className="collective-stat">
                <span className="cstat-label">Monthly pool</span>
                <span className="cstat-value">£{pardnerPool}</span>
              </div>
              <div className="collective-stat">
                <span className="cstat-label">Your turn comes around every</span>
                <span className="cstat-value">{pardnerMembers} months</span>
              </div>
              <div className="collective-stat">
                <span className="cstat-label">Your lump sum</span>
                <span className="cstat-value">£{pardnerPool}</span>
              </div>
              <div className={`collective-stat ${canAfford ? 'can-afford' : 'cannot-afford'}`}>
                <span className="cstat-label">Full collective kit</span>
                <span className="cstat-value">£{totalEquipment}</span>
              </div>
            </div>

            <div className="equipment-list">
              <h4>Collective equipment — shared access from month one:</h4>
              {collectiveEquipment.map((eq, i) => (
                <div key={i} className="equipment-item">
                  <span className="eq-name">{eq.name}</span>
                  <span className="eq-cost">£{eq.cost}</span>
                </div>
              ))}
              <div className="equipment-total">
                <span>Total value</span>
                <span>£{totalEquipment}</span>
              </div>
            </div>

            {canAfford ? (
              <div className="collective-verdict can-afford">
                <CheckCircle size={20} />
                <p>At {pardnerMembers} members × £{pardnerContrib}/month, your pardner pool of £{pardnerPool} covers the full equipment list. Every member has access to a professional-grade studio from month one.</p>
              </div>
            ) : (
              <div className="collective-verdict cannot-afford">
                <AlertCircle size={20} />
                <p>At these numbers, start with the industrial machine (£450) and overlocker (£300) in the first round — £{450+300} total. Full studio comes together over two rotations.</p>
              </div>
            )}

            <div className="pardner-principle">
              <blockquote>
                "Your grandmother's pardner didn't require a bank. 
                It required trust in each other and accountability to the group. 
                The Makers Pardner runs on the same principle. 
                The tools come from the collective. The skills come from each individual. 
                The reputation belongs to the community."
              </blockquote>
            </div>
          </div>
        )}

        {/* ── TAB 4: FIRST COMMISSION ───────────────────────────────────────── */}
        {activeTab === 'commission' && (
          <div className="sandbox-panel">
            <div className="panel-intro">
              <h2>Building Your First Commission</h2>
              <p>Five steps. Not a marketing plan. Not a business strategy. Just what you need to do to take your first paid piece from brief to delivery — and set up the second one automatically.</p>
            </div>

            <div className="commission-steps">
              {firstCommissionSteps.map((step) => (
                <div key={step.step} className="commission-step">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <div className="step-action">
                      <strong>Action:</strong> {step.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="commission-principle">
              <h3>The principle underneath all five steps:</h3>
              <blockquote>
                "The dressmaker who dressed that community for forty years wasn't famous. 
                She was booked. Every single Saturday, she was booked. 
                She didn't have a website. She didn't have an Instagram. 
                She had a reputation built piece by piece, alteration by alteration, 
                fitting by fitting — and the community talked.
                That is still the path. We're just documenting it better."
              </blockquote>
            </div>

            <div className="commission-cta">
              <h4>When you're ready:</h4>
              <p>Use the pricing calculator to set your rate. Use the pathways planner to identify your discipline. Come to the Makers Collective with your first project and the equipment will be there.</p>
            </div>
          </div>
        )}

      </div>
    </PageTemplate>
  );
};

export default SilkStilettossandbox;
