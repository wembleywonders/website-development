import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../components/PageTemplate';
import MediaSection from '../../components/media/MediaSection';
import { Users, Heart, TrendingUp, Vote, Handshake, DollarSign, Award, CheckCircle } from 'lucide-react';
import './CommunityOwnership.css';

const CommunityOwnership: React.FC = () => {
  const pageContent = (
    <div className="community-ownership-content">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Community Ownership</h1>
        <p>Building collective power through shared resources and democratic participation</p>
      </div>

      <div className="content-grid">
        <div className="main-content">
          <h2>Beyond Individual Success: Building Collective Creative Power</h2>
          <p>
            Your contribution helps build community-owned infrastructure that lifts everyone up. 
            We don't sell access to opportunities - we create shared resources that remove barriers 
            for all creators in Wembley, regardless of their ability to pay.
          </p>

          <div className="principle-section">
            <h3><Vote className="section-icon" />How Community Ownership Works</h3>
            <div className="principles-grid">
              <div className="principle-item">
                <div className="principle-icon">
                  <Users />
                </div>
                <h4>Democratic Decision-Making</h4>
                <p>All members participate equally in decisions about community direction, regardless of contribution level. One person, one voice.</p>
              </div>
              <div className="principle-item">
                <div className="principle-icon">
                  <Handshake />
                </div>
                <h4>Shared Resource Access</h4>
                <p>Professional photography, website development, and portfolio services available to all active participants based on need, not payment.</p>
              </div>
              <div className="principle-item">
                <div className="principle-icon">
                  <TrendingUp />
                </div>
                <h4>Collective Bargaining Power</h4>
                <p>Together we negotiate better rates with suppliers, secure group bookings at trade shows, and leverage our combined influence for institutional partnerships.</p>
              </div>
              <div className="principle-item">
                <div className="principle-icon">
                  <Heart />
                </div>
                <h4>Knowledge Commons</h4>
                <p>Skills, contacts, and opportunities shared freely among all community members. Your success creates pathways for others.</p>
              </div>
            </div>
          </div>

          <div className="barrier-section">
            <h3>Systemic Barriers We Address Together</h3>
            <div className="barriers-list">
              <div className="barrier-item">
                <h4>Network Exclusion</h4>
                <p>Industry connections traditionally flow through privileged networks. We create alternative pathways and introduce community members to institutional buyers, galleries, and commissioners.</p>
              </div>
              <div className="barrier-item">
                <h4>Professional Infrastructure</h4>
                <p>High-quality portfolios, websites, and marketing materials shouldn't be luxuries. Our shared resources ensure everyone can present their work professionally.</p>
              </div>
              <div className="barrier-item">
                <h4>Market Knowledge Gaps</h4>
                <p>Understanding contracts, pricing, and negotiation often requires expensive education. We share this knowledge freely through peer mentoring and community workshops.</p>
              </div>
            </div>
          </div>

          <div className="highlight-box">
            <h3>Evidence-Based Solidarity</h3>
            <p>
              Research consistently shows that creators from working-class and migrant communities 
              face systematic exclusion from industry networks, funding pipelines, and distribution channels. 
              Rather than helping individuals "break through" these barriers, we build alternative systems 
              that work for our entire community.
            </p>
          </div>

          <div className="impact-section">
            <h3><Award className="section-icon" />Collective Impact</h3>
            <div className="impact-grid">
              <div className="impact-item">
                <div className="impact-number">£12,847</div>
                <div className="impact-label">Community Creator Earnings</div>
                <div className="impact-detail">Money circulating within Wembley's creative economy</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">34</div>
                <div className="impact-label">Professional Portfolios Created</div>
                <div className="impact-detail">Using shared photography and design resources</div>
              </div>
              <div className="impact-item">
                <div className="impact-number">156</div>
                <div className="impact-label">Cross-Community Introductions</div>
                <div className="impact-detail">Connecting creators across cultural communities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="contribution-section">
            <h3><DollarSign className="section-icon" />Community Contribution</h3>
            <p>We operate on sliding scale contributions based on your ability to support collective resources.</p>
            
            <div className="contribution-tiers">
              <div className="tier-item">
                <h4>Community Participant</h4>
                <p className="tier-price">£0/month</p>
                <p>Full participation in all programs and decision-making. Contribute skills, time, or energy instead of money.</p>
              </div>
              
              <div className="tier-item">
                <h4>Community Supporter</h4>
                <p className="tier-price">£5-£25/month</p>
                <p>Help fund shared resources and equipment. Sliding scale based on your financial situation.</p>
              </div>
              
              <div className="tier-item">
                <h4>Community Sustainer</h4>
                <p className="tier-price">£25-£50/month</p>
                <p>Support community infrastructure and enable us to offer more free services to others.</p>
              </div>
              
              <div className="tier-item">
                <h4>Community Champion</h4>
                <p className="tier-price">£50+/month</p>
                <p>Help us expand capacity and reach more communities. Enable others to participate at lower contribution levels.</p>
              </div>
            </div>
            
            <div className="transparency-note">
              <p><strong>Full financial transparency:</strong> See exactly how contributions fund community resources in our democratic governance meetings.</p>
            </div>
          </div>

          <div className="participate-section">
            <h3>How to Participate</h3>
            <div className="participate-steps">
              <div className="step-item">
                <div className="step-number">1</div>
                <p>Attend a community gathering to meet others and understand our approach</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <p>Choose your contribution level based on your ability to support collective resources</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <p>Participate in democratic decision-making about community direction and resource allocation</p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <p>Access shared resources, contribute your skills, and help others succeed</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <Link to="/get-started" className="cta-button">Join Our Community</Link>
            <p className="cta-note">Start with £0 contribution - everyone belongs here</p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="principles-footer">
          <h3>Our Commitment: We All Stand Together</h3>
          <div className="commitment-grid">
            <div className="commitment-item">
              <div className="commitment-icon">
                <CheckCircle />
              </div>
              <h4>No Pay Walls</h4>
              <p>Essential resources available to all active community members regardless of financial contribution.</p>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <Vote />
              </div>
              <h4>Democratic Governance</h4>
              <p>All major decisions made collectively through transparent, participatory processes.</p>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <TrendingUp />
              </div>
              <h4>Wealth Circulation</h4>
              <p>Success creates opportunities for others. Individual advancement strengthens the whole community.</p>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <Heart />
              </div>
              <h4>Cultural Solidarity</h4>
              <p>Irish, South Asian, Caribbean, and all communities working together rather than competing for resources.</p>
            </div>
          </div>
        </div>
      </div>

      {/* MediaSection Components with minimal props */}
      <MediaSection
        contentType="democratic-participation"
        title="Democracy in Action"
        placeholder="Share photos and videos from AGM proceedings, member votes, and community decision-making processes" allowedRoles={[]} layout={'grid'}      />

      <MediaSection
        contentType="ownership-celebrations"
        title="Celebrating Community Ownership"
        placeholder="Upload content celebrating member achievements, collective victories, and community ownership milestones" allowedRoles={[]} layout={'grid'}      />

      <MediaSection
        contentType="ownership-examples"
        title="Community Ownership in Practice"
        placeholder="Document real examples of collective decision-making, resource sharing, and democratic participation" allowedRoles={[]} layout={'grid'}      />
    </div>
  );

  return (
    <PageTemplate pageTitle="" pageStrapline="">
      {pageContent}
    </PageTemplate>
  );
};

export default CommunityOwnership;