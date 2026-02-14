import React from 'react';
import Footer from '../components/layout/Footer';
import './PolicyPages.css';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="policy-page">
      
      <div className="policy-content">
        <div className="policy-container">
          <div className="policy-header">
            <h1 className="policy-title">Terms of Service</h1>
            <p className="policy-subtitle">
              Terms and conditions for using Wembley Wonders services
            </p>
            <p className="last-updated">Last updated: September 2024</p>
          </div>

          <div className="policy-sections">
            <section className="policy-section">
              <h2>About These Terms</h2>
              <p>
                These Terms of Service govern your relationship with Wembley Wonders CIC 
                (incorporated 19th April 2024) and your participation in our community 
                development programs. By using our services, you agree to these terms.
              </p>
            </section>

            <section className="policy-section">
              <h2>Our Services</h2>
              
              <h3>Community Programming</h3>
              <ul>
                <li>Three seasonal 8-week technical skills blocks</li>
                <li>Project-based learning and practical workshops</li>
                <li>Community showcase events and competitions</li>
                <li>Maya AI guidance and pathway assessment</li>
              </ul>

              <h3>Membership Platform</h3>
              <ul>
                <li>Structured progression through Connector, Curator, and Champion tiers</li>
                <li>Professional development and leadership training</li>
                <li>Democratic governance participation opportunities</li>
                <li>Budget authority and project management responsibilities</li>
              </ul>

              <h3>Community Media</h3>
              <ul>
                <li>Rayd-yo community radio programming</li>
                <li>Joystick e-zine publication platform</li>
                <li>Community voice and democratic participation channels</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Membership Requirements</h2>
              
              <h3>General Requirements</h3>
              <ul>
                <li>Minimum 18 years old (or parental consent for under-18 participants)</li>
                <li>Wembley residency or strong community connection</li>
                <li>Commitment to community development values</li>
                <li>Respect for democratic governance principles</li>
              </ul>

              <h3>Connector Tier (Entry Level)</h3>
              <ul>
                <li>12-month assessment and development period</li>
                <li>Enhanced DBS check clearance</li>
                <li>Completion of safeguarding training</li>
                <li>Active participation in community projects</li>
                <li>4-6 hours monthly time commitment</li>
              </ul>

              <h3>Advanced Tiers</h3>
              <ul>
                <li>Successful completion of previous tier requirements</li>
                <li>Demonstrated leadership capabilities</li>
                <li>Financial responsibility and budget management skills</li>
                <li>Commitment to mentoring new members</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Code of Conduct</h2>
              
              <h3>Expected Behavior</h3>
              <ul>
                <li>Respectful communication with all community members</li>
                <li>Constructive participation in democratic processes</li>
                <li>Professional conduct during all activities</li>
                <li>Commitment to learning and skill development</li>
                <li>Support for community goals and values</li>
              </ul>

              <h3>Prohibited Behavior</h3>
              <ul>
                <li>Discrimination, harassment, or bullying of any kind</li>
                <li>Misuse of budget authority or resources</li>
                <li>Sharing confidential information inappropriately</li>
                <li>Activities that compromise safeguarding standards</li>
                <li>Disruptive behavior during programs or events</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Financial Responsibilities</h2>
              
              <h3>Program Participation</h3>
              <ul>
                <li>Core programming is provided free of charge</li>
                <li>Some projects may require small material contributions</li>
                <li>Take-home items may involve nominal costs</li>
                <li>Advanced workshops may have equipment fees</li>
              </ul>

              <h3>Budget Authority (Advanced Tiers)</h3>
              <ul>
                <li>Curator Tier: Up to £50,000 project authority</li>
                <li>Champion Tier: Up to £250,000+ strategic authority</li>
                <li>All expenditure must follow approved procedures</li>
                <li>Financial accountability and audit compliance required</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Intellectual Property</h2>
              
              <h3>Your Content</h3>
              <ul>
                <li>You retain ownership of projects and creations you develop</li>
                <li>You grant us permission to showcase your work for promotional purposes</li>
                <li>Community contributions may be shared under open source principles</li>
              </ul>

              <h3>Our Content</h3>
              <ul>
                <li>Training materials and curriculum remain our intellectual property</li>
                <li>Maya AI system and assessment tools are proprietary</li>
                <li>Community platform design and functionality are protected</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Safety and Safeguarding</h2>
              
              <h3>Health and Safety</h3>
              <ul>
                <li>All activities follow risk assessment protocols</li>
                <li>Safety equipment must be used as directed</li>
                <li>Incidents must be reported immediately</li>
                <li>Emergency procedures must be followed</li>
              </ul>

              <h3>Child Protection</h3>
              <ul>
                <li>All youth program staff have enhanced DBS clearance</li>
                <li>Safeguarding policies apply to all interactions</li>
                <li>Concerns must be reported through proper channels</li>
                <li>Professional boundaries must be maintained</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Termination and Suspension</h2>
              
              <h3>Voluntary Withdrawal</h3>
              <ul>
                <li>Members may withdraw with 30 days notice</li>
                <li>Project commitments should be completed responsibly</li>
                <li>Financial obligations must be settled</li>
                <li>Equipment and materials must be returned</li>
              </ul>

              <h3>Involuntary Termination</h3>
              <p>We may terminate membership for:</p>
              <ul>
                <li>Serious breaches of code of conduct</li>
                <li>Safeguarding concerns or policy violations</li>
                <li>Failure to meet tier progression requirements</li>
                <li>Misuse of financial authority or resources</li>
                <li>Repeated non-participation or commitment failures</li>
              </ul>

              <h3>Appeals Process</h3>
              <ul>
                <li>Termination decisions may be appealed within 14 days</li>
                <li>Appeals are reviewed by independent panel</li>
                <li>Decision process follows natural justice principles</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Limitation of Liability</h2>
              
              <p>
                While we strive to provide high-quality programming, we cannot guarantee 
                specific outcomes or career advancement. Our liability is limited to the 
                direct costs of programs you have paid for.
              </p>
              
              <h3>What We're Not Responsible For</h3>
              <ul>
                <li>Individual career or educational outcomes</li>
                <li>Third-party services or partnerships</li>
                <li>Technical issues beyond our control</li>
                <li>Actions of other community members</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Dispute Resolution</h2>
              
              <h3>Internal Resolution</h3>
              <ul>
                <li>Concerns should first be raised with program coordinators</li>
                <li>Formal complaints follow our published procedures</li>
                <li>Mediation services available for complex disputes</li>
              </ul>

              <h3>External Resolution</h3>
              <ul>
                <li>Unresolved disputes may be referred to external mediation</li>
                <li>Legal proceedings governed by English law</li>
                <li>Jurisdiction lies with London courts</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Changes to Terms</h2>
              
              <p>
                We may update these terms to reflect changes in our services, legal 
                requirements, or operational needs. Significant changes will be 
                communicated with 30 days notice.
              </p>
              
              <p>
                Continued participation after changes constitutes acceptance of new terms.
              </p>
            </section>

            <section className="policy-section">
              <h2>Contact Information</h2>
              
              <div className="contact-details">
                <p><strong>General Inquiries:</strong></p>
                <p>Email: hello@wembleywonders.org</p>
                
                <p><strong>Complaints:</strong></p>
                <p>Email: complaints@wembleywonders.org</p>
                
                <p><strong>Safeguarding Concerns:</strong></p>
                <p>Email: safeguarding@wembleywonders.org</p>
                <p>Phone: Emergency contact available 24/7</p>
                
                <p><strong>Registered Address:</strong></p>
                <p>Wembley Wonders CIC<br />
                Wembley, London<br />
                Company Registration: [To be added]</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
