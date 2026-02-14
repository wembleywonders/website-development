import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import MediaSection from '../../components/media/MediaSection';
import { 
  TrendingUp, Users, Target, Home, Recycle,
  DollarSign, Award, Shield, Vote, Lightbulb,
  CheckCircle, ArrowRight, Factory, Leaf
} from 'lucide-react';
import './CommunityInvestmentPage.css';

const PartnerWithUsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'scrap-cat' | 'opportunities'>('overview');

  const successStories = [
    {
      partner: 'TechFlow Solutions',
      type: 'Electronics Recycling Partner',
      challenge: 'Disposal costs for 50kg monthly electronic waste',
      solution: 'Scrap Cat recycling programme transforms waste into STEM workshop materials',
      results: {
        business: 'Eliminated £200/month disposal fees, gained sustainability credentials',
        community: '70% reduction in workshop material costs, hands-on learning with real equipment',
        environmental: '600kg e-waste diverted from landfill annually'
      },
      quote: "Instead of paying for waste disposal, we're investing in community skills development. Our old laptops become teaching tools, and we get genuine sustainability impact we can measure."
    },
    {
      partner: 'Maven Foods',
      type: 'Service Exchange Partner',
      challenge: 'Reaching new customers in diverse Wembley community',
      solution: 'Catering partnership for community events and celebrations',
      results: {
        business: 'Direct access to 8,500+ community members through event catering',
        community: 'Professional catering for major events at fraction of commercial cost',
        marketing: 'Regular promotion through Rayd-yo radio and Joystick e-zine'
      },
      quote: "Our partnership with Wembley Wonders connects us directly with the community we want to serve. The Connoisseurs Club event alone introduced us to 150 potential customers."
    },
    {
      partner: 'Fabric Forward Ltd',
      type: 'Material Recovery Partner',
      challenge: 'Fabric waste disposal and local community engagement',
      solution: 'Scrap Cat programme turns fabric offcuts into arts workshop materials',
      results: {
        business: 'Reduced waste disposal costs, enhanced local reputation',
        community: '40% cost reduction for creative workshops, authentic materials for learning',
        skills: 'Fashion design workshops using industry-standard materials'
      },
      quote: "Our offcuts that used to go to landfill now become costume materials for community theatre. We see direct impact from our waste becoming creative resources."
    }
  ];

  const scrapCatPrograms = [
    {
      category: 'Electronics & Tech Equipment',
      materials: ['Laptops and computers', 'Audio equipment', 'Cables and components', 'Broken devices for repair workshops'],
      workshops: 'STEM Labs, Audio Production, Repair Cafés',
      savings: '70% cost reduction',
      partners: 'Tech companies, offices, electronics retailers'
    },
    {
      category: 'Fabric & Fashion Materials',
      materials: ['Fabric offcuts', 'Buttons and notions', 'Sample materials', 'Clothing for upcycling'],
      workshops: 'Fashion Design, Theatre Costumes, Arts & Crafts',
      savings: '40% cost reduction', 
      partners: 'Fashion retailers, textile manufacturers, design studios'
    },
    {
      category: 'Training & Office Materials',
      materials: ['Flip charts', 'Presentation equipment', 'Books and manuals', 'Office furniture'],
      workshops: 'Leadership Training, Business Skills, Community Planning',
      savings: '30% cost reduction',
      partners: 'Training companies, offices upgrading equipment'
    }
  ];

  const investmentOpportunities = [
    {
      type: 'Scrap Cat Material Partnership',
      description: 'Transform your business waste into community learning materials while eliminating disposal costs',
      investment: 'Material donations + £200-500/month coordination fee',
      return: 'Waste disposal solution, measurable sustainability impact, promotional coverage',
      impact: 'Reduces workshop costs by 40-70% while providing authentic learning materials',
      businessBenefit: 'Eliminates disposal fees, creates CSR story, builds local community connections'
    },
    {
      type: 'Programme Equipment Sponsorship', 
      description: 'Fund specific equipment purchases for workshops while receiving naming rights and promotional recognition',
      investment: '£500-2,000 one-time or annual',
      return: 'Equipment naming rights, regular promotional mentions, participant testimonials',
      impact: 'Enables 12-18 participants per programme to access professional-grade equipment',
      businessBenefit: 'Long-term promotional value, direct connection to skill development outcomes'
    },
    {
      type: 'Community Event Partnership',
      description: 'Support "Wembley Wonderful Days" coach trips or annual Connoisseurs Club celebration',
      investment: '£1,000-3,000 per event',
      return: 'Event sponsorship recognition, promotional coverage across all community media',
      impact: 'Enables affordable community experiences for 50-150 participants',
      businessBenefit: 'Direct customer engagement, community goodwill, promotional reach'
    }
  ];

  return (
    <PageTemplate 
      pageTitle="Partner with Us"
      pageStrapline="Turning Business Waste into Community Wealth"
      pageGuide="Local businesses solving waste disposal challenges while investing in Wembley's skills development and community connections."
      pageType="standard"
    >
      <div className="partner-with-us-content">
        
        {/* Success Stories Hero */}
        <section className="success-stories-hero">
          <h1>Real Partnerships, Real Results</h1>
          <p className="hero-subtitle">
            Local businesses and community members working together to create mutual benefit 
            through shared investment in Wembley's development and resident opportunities.
          </p>
          
          <div className="partnership-stats">
            <div className="stat">
              <span className="stat-number">70%</span>
              <span className="stat-label">Cost reduction for STEM workshops</span>
            </div>
            <div className="stat">
              <span className="stat-number">600kg</span>
              <span className="stat-label">E-waste diverted annually</span>
            </div>
            <div className="stat">
              <span className="stat-number">8,500+</span>
              <span className="stat-label">Community members reached</span>
            </div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="detailed-success-stories">
          <h2>How Local Businesses Benefit While Supporting Community Development</h2>
          
          <div className="success-stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="success-story-card">
                <div className="story-header">
                  <h3>{story.partner}</h3>
                  <span className="partner-type">{story.type}</span>
                </div>
                
                <div className="story-challenge">
                  <h4>Business Challenge</h4>
                  <p>{story.challenge}</p>
                </div>
                
                <div className="story-solution">
                  <h4>Partnership Solution</h4>
                  <p>{story.solution}</p>
                </div>
                
                <div className="story-results">
                  <h4>Mutual Benefits</h4>
                  <div className="results-grid">
                    <div className="result-item">
                      <strong>Business Impact:</strong> {story.results.business}
                    </div>
                    <div className="result-item">
                      <strong>Community Impact:</strong> {story.results.community}
                    </div>
                    {story.results.environmental && (
                      <div className="result-item">
                        <strong>Environmental Impact:</strong> {story.results.environmental}
                      </div>
                    )}
                  </div>
                </div>
                
                <blockquote className="partner-quote">
                  "{story.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="partnership-navigation">
          <div className="nav-container">
            <button 
              className={`nav-tab ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              <Target className="tab-icon" />
              Partnership Model
            </button>
            <button 
              className={`nav-tab ${activeSection === 'scrap-cat' ? 'active' : ''}`}
              onClick={() => setActiveSection('scrap-cat')}
            >
              <Recycle className="tab-icon" />
              Scrap Cat Programme
            </button>
            <button 
              className={`nav-tab ${activeSection === 'opportunities' ? 'active' : ''}`}
              onClick={() => setActiveSection('opportunities')}
            >
              <TrendingUp className="tab-icon" />
              Partnership Opportunities
            </button>
          </div>
        </section>

        <div className="partnership-content">
          
          {/* Partnership Model Overview */}
          {activeSection === 'overview' && (
            <section className="section-overview">
              <h2>Community Investment Model</h2>
              <p>
                Our partnership approach solves business challenges while creating community value. 
                Instead of traditional sponsorship, we offer genuine business solutions with measurable community impact.
              </p>

              <div className="value-propositions">
                <div className="value-prop">
                  <div className="prop-icon"><Factory /></div>
                  <h3>For Businesses</h3>
                  <ul>
                    <li>Eliminate waste disposal costs</li>
                    <li>Create measurable sustainability impact</li>
                    <li>Access emerging local talent</li>
                    <li>Build authentic community connections</li>
                    <li>Receive promotional coverage across community media</li>
                  </ul>
                </div>
                
                <div className="value-prop">
                  <div className="prop-icon"><Users /></div>
                  <h3>For Community</h3>
                  <ul>
                    <li>40-70% reduction in workshop material costs</li>
                    <li>Hands-on learning with authentic materials</li>
                    <li>Real-world project experience</li>
                    <li>Professional mentorship opportunities</li>
                    <li>Employment pathway development</li>
                  </ul>
                </div>
              </div>

              <div className="partnership-cycle">
                <h3>How Partnerships Create Mutual Value</h3>
                <div className="cycle-steps">
                  <div className="cycle-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Business Challenge Identified</h4>
                      <p>Waste disposal costs, community engagement needs, or skills recruitment challenges</p>
                    </div>
                  </div>
                  
                  <div className="cycle-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Partnership Solution Developed</h4>
                      <p>Waste becomes workshop materials, services exchanged for promotion, skills development aligned with business needs</p>
                    </div>
                  </div>
                  
                  <div className="cycle-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Community Activities Enabled</h4>
                      <p>Workshops run with authentic materials, participants develop real skills, community connections strengthen</p>
                    </div>
                  </div>
                  
                  <div className="cycle-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Business Value Delivered</h4>
                      <p>Cost savings, sustainability credentials, promotional coverage, access to skilled talent</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Scrap Cat Programme */}
          {activeSection === 'scrap-cat' && (
            <section className="section-scrap-cat">
              <h2>Scrap Cat Recycling Programme</h2>
              <p>
                Turn your business waste into community wealth. Our recycling programme transforms 
                what you pay to dispose of into valuable learning materials for community workshops.
              </p>

              <div className="scrap-cat-benefits">
                <div className="benefit-card">
                  <h3><DollarSign className="benefit-icon" />Cost Elimination</h3>
                  <p>Stop paying disposal fees for materials that can become learning resources</p>
                </div>
                <div className="benefit-card">
                  <h3><Leaf className="benefit-icon" />Sustainability Impact</h3>
                  <p>Measurable environmental benefits with direct community applications</p>
                </div>
                <div className="benefit-card">
                  <h3><Users className="benefit-icon" />Community Connection</h3>
                  <p>Build authentic relationships through shared environmental and social value</p>
                </div>
              </div>

              <div className="scrap-cat-programs">
                <h3>Material Recovery Programmes</h3>
                {scrapCatPrograms.map((program, index) => (
                  <div key={index} className="program-card">
                    <div className="program-header">
                      <h4>{program.category}</h4>
                      <span className="savings-badge">{program.savings}</span>
                    </div>
                    
                    <div className="program-details">
                      <div className="program-section">
                        <h5>Materials We Accept</h5>
                        <ul>
                          {program.materials.map((material, idx) => (
                            <li key={idx}>{material}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="program-section">
                        <h5>Workshop Applications</h5>
                        <p>{program.workshops}</p>
                      </div>
                      
                      <div className="program-section">
                        <h5>Ideal Partners</h5>
                        <p>{program.partners}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="environmental-impact">
                <h3>Environmental Impact Tracking</h3>
                <div className="impact-stats">
                  <div className="impact-stat">
                    <span className="impact-number">600kg</span>
                    <span className="impact-label">E-waste diverted annually</span>
                  </div>
                  <div className="impact-stat">
                    <span className="impact-number">50m</span>
                    <span className="impact-label">Fabric saved from landfill</span>
                  </div>
                  <div className="impact-stat">
                    <span className="impact-number">£3,500</span>
                    <span className="impact-label">Workshop cost savings annually</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Partnership Opportunities */}
          {activeSection === 'opportunities' && (
            <section className="section-opportunities">
              <h2>Partnership Opportunities</h2>
              <p>
                Multiple ways to create mutual benefit while supporting community development 
                and solving business challenges.
              </p>

              <div className="opportunities-grid">
                {investmentOpportunities.map((opportunity, index) => (
                  <div key={index} className="opportunity-card">
                    <h3>{opportunity.type}</h3>
                    <p className="opportunity-description">{opportunity.description}</p>
                    
                    <div className="opportunity-details">
                      <div className="detail-section">
                        <h4>Investment Level</h4>
                        <p>{opportunity.investment}</p>
                      </div>
                      <div className="detail-section">
                        <h4>Business Return</h4>
                        <p>{opportunity.return}</p>
                      </div>
                      <div className="detail-section">
                        <h4>Community Impact</h4>
                        <p>{opportunity.impact}</p>
                      </div>
                      <div className="detail-section">
                        <h4>Business Benefit</h4>
                        <p>{opportunity.businessBenefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="partnership-process">
                <h3>Partnership Development Process</h3>
                <div className="process-steps">
                  <div className="process-step">
                    <h4>Business Challenge Assessment</h4>
                    <p>Understand your waste disposal costs, community engagement needs, or recruitment challenges</p>
                  </div>
                  <div className="process-step">
                    <h4>Solution Design</h4>
                    <p>Develop partnership model that addresses business needs while creating community value</p>
                  </div>
                  <div className="process-step">
                    <h4>Community Approval</h4>
                    <p>Present partnership to community members for feedback and democratic approval</p>
                  </div>
                  <div className="process-step">
                    <h4>Implementation & Impact Tracking</h4>
                    <p>Launch partnership with ongoing measurement of business and community benefits</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Community Event Success Stories */}
        <section className="community-event-success">
          <h2>Community Event Partnership Success</h2>
          <p>How strategic partnerships create high-impact community experiences at fraction of commercial costs</p>
          
          <div className="event-success-grid">
            <div className="event-success-card">
              <h3>Annual Connoisseurs Club</h3>
              <p>
                Partnership with Maven Foods (catering) and Bokor's (venue) enabled 
                150-person celebration combining community recognition, AGM governance, 
                and programme showcases for under £2,000 total cost.
              </p>
              <div className="success-metrics">
                <div className="metric">
                  <span className="metric-value">150</span>
                  <span className="metric-label">People served</span>
                </div>
                <div className="metric">
                  <span className="metric-value">£2,000</span>
                  <span className="metric-label">Total cost</span>
                </div>
                <div className="metric">
                  <span className="metric-value">60%</span>
                  <span className="metric-label">Below commercial rates</span>
                </div>
              </div>
              <div className="impact-statement">
                <strong>Impact:</strong> Community-wide celebration with democratic participation 
                at fraction of commercial venue costs.
              </div>
            </div>
            
            <div className="event-success-card">
              <h3>"Wembley Wonderful Days" Coach Trips</h3>
              <p>
                Quarterly coach trips combining programme participants (Trubble n Bass, Kaywana's Court) 
                with families create affordable community experiences through shared transport costs.
              </p>
              <div className="success-metrics">
                <div className="metric">
                  <span className="metric-value">£25-35</span>
                  <span className="metric-label">Per person cost</span>
                </div>
                <div className="metric">
                  <span className="metric-value">£60+</span>
                  <span className="metric-label">Individual cost</span>
                </div>
                <div className="metric">
                  <span className="metric-value">40%</span>
                  <span className="metric-label">Cost savings</span>
                </div>
              </div>
              <div className="impact-statement">
                <strong>Impact:</strong> £25-35 per person community outings that would cost 
                £60+ individually, plus performance opportunities for participants.
              </div>
            </div>
          </div>
        </section>
        <section className="partnership-cta">
          <h2>Ready to Turn Your Waste Into Community Wealth?</h2>
          
          <div className="cta-options">
            <div className="cta-card primary">
              <h3>Business Partnership Enquiry</h3>
              <p>Explore how your waste disposal challenges can become community development opportunities</p>
              <div className="cta-contact">
                <strong>Contact:</strong> partnerships@wembleywonders.org
              </div>
              <div className="cta-benefits">
                <CheckCircle className="benefit-icon" />Cost elimination for waste disposal
                <CheckCircle className="benefit-icon" />Measurable sustainability impact  
                <CheckCircle className="benefit-icon" />Authentic community connections
              </div>
            </div>
            
            <div className="cta-card">
              <h3>Community Investment</h3>
              <p>Join as a community member to participate in the partnership benefits and democratic oversight</p>
              <Link to="/membership" className="cta-button">
                Explore Membership <ArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </section>

        {/* Media Documentation */}
        <MediaSection
          contentType="partnership-success"
          title="Partnership Success Documentation"
          placeholder="Document business partnerships, environmental impact, and community benefits"
          allowedRoles={['staff', 'volunteer', 'editor']}
          layout="grid"
        />
      </div>
    </PageTemplate>
  );
};

export default PartnerWithUsPage;