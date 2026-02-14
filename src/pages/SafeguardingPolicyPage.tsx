import React from 'react';
import Footer from '../components/layout/Footer';
import './PolicyPages.css';

const SafeguardingPolicyPage: React.FC = () => {
  return (
    <div className="policy-page">
      
      <div className="policy-content">
        <div className="policy-container">
          <div className="policy-header">
            <h1 className="policy-title">Safeguarding Policy</h1>
            <p className="policy-subtitle">
              Protecting children, young people, and vulnerable adults in our community
            </p>
            <p className="last-updated">Last updated: September 2024</p>
          </div>

          <div className="policy-sections">
            <section className="policy-section">
              <h2>Our Commitment</h2>
              <p>
                Wembley Wonders CIC is committed to creating a safe environment where 
                children, young people, and vulnerable adults can participate in community 
                development activities without fear of harm, abuse, or exploitation.
              </p>
              
              <p>
                This policy applies to all staff, volunteers, members, and partners 
                involved in our programs and reflects our legal and moral obligations 
                under UK safeguarding legislation.
              </p>
            </section>

            <section className="policy-section">
              <h2>Scope and Definitions</h2>
              
              <h3>Who This Policy Protects</h3>
              <ul>
                <li><strong>Children:</strong> Anyone under 18 years of age</li>
                <li><strong>Young People:</strong> Typically ages 16-25 in our programs</li>
                <li><strong>Vulnerable Adults:</strong> Adults who may be at risk due to circumstances, disability, or other factors</li>
              </ul>

              <h3>Types of Abuse We Recognize</h3>
              <ul>
                <li><strong>Physical Abuse:</strong> Causing physical harm or injury</li>
                <li><strong>Emotional Abuse:</strong> Persistent emotional mistreatment</li>
                <li><strong>Sexual Abuse:</strong> Any sexual activity involving children or non-consensual activity</li>
                <li><strong>Neglect:</strong> Failure to provide appropriate care or supervision</li>
                <li><strong>Digital Abuse:</strong> Online harassment, grooming, or exploitation</li>
                <li><strong>Financial Abuse:</strong> Theft, fraud, or exploitation of resources</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Prevention Measures</h2>
              
              <h3>Recruitment and Vetting</h3>
              <ul>
                <li>Enhanced DBS checks for all staff and volunteers working with young people</li>
                <li>Comprehensive interview process including safeguarding scenarios</li>
                <li>Reference checks specifically addressing suitability for youth work</li>
                <li>Probationary periods with enhanced supervision</li>
                <li>Regular re-vetting every three years</li>
              </ul>

              <h3>Training Requirements</h3>
              <ul>
                <li>Mandatory safeguarding training for all staff and volunteers</li>
                <li>Annual refresher training and updates</li>
                <li>Specialized training for those in leadership positions</li>
                <li>Mental health first aid training for program coordinators</li>
                <li>Digital safety and online protection training</li>
              </ul>

              <h3>Safe Environment Practices</h3>
              <ul>
                <li>Open-door policies during all activities</li>
                <li>Minimum two-adult supervision for youth activities</li>
                <li>Clear physical and emotional boundaries</li>
                <li>Appropriate venue risk assessments</li>
                <li>Regular monitoring and review of safety practices</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Program-Specific Safeguarding</h2>
              
              <h3>Technical Workshops</h3>
              <ul>
                <li>Equipment safety protocols and proper supervision</li>
                <li>Age-appropriate project selection and complexity</li>
                <li>Clear guidelines for tool usage and safety equipment</li>
                <li>First aid provisions and emergency procedures</li>
              </ul>

              <h3>Digital Activities</h3>
              <ul>
                <li>Internet safety education and monitoring</li>
                <li>Appropriate content filters and access controls</li>
                <li>Guidelines for social media and online communication</li>
                <li>Protection against cyberbullying and online predators</li>
              </ul>

              <h3>Off-Site Activities</h3>
              <ul>
                <li>Enhanced risk assessments for external venues</li>
                <li>Parental consent for all off-site activities</li>
                <li>Emergency contact procedures and protocols</li>
                <li>Transportation safety and supervision requirements</li>
              </ul>

              <h3>Overnight or Residential Activities</h3>
              <ul>
                <li>Separate sleeping arrangements with same-gender supervision</li>
                <li>Enhanced staff-to-participant ratios</li>
                <li>24-hour emergency contact availability</li>
                <li>Comprehensive medical information and consent forms</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Recognition and Response</h2>
              
              <h3>Warning Signs</h3>
              <p>All staff and volunteers are trained to recognize potential indicators of abuse:</p>
              
              <h4>Physical Indicators</h4>
              <ul>
                <li>Unexplained injuries, bruises, or marks</li>
                <li>Poor hygiene or inappropriate clothing</li>
                <li>Frequent hunger or fatigue</li>
                <li>Medical or dental needs not being met</li>
              </ul>

              <h4>Behavioral Indicators</h4>
              <ul>
                <li>Sudden changes in behavior or performance</li>
                <li>Withdrawal from activities or social interaction</li>
                <li>Inappropriate sexual knowledge or behavior</li>
                <li>Self-harm or references to suicide</li>
                <li>Fear of specific people or situations</li>
              </ul>

              <h4>Digital Indicators</h4>
              <ul>
                <li>Secretive behavior about online activities</li>
                <li>Receiving gifts or money from unknown sources</li>
                <li>Meeting people they've met online</li>
                <li>Evidence of cyberbullying or harassment</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Reporting Procedures</h2>
              
              <h3>Immediate Response</h3>
              <ol>
                <li><strong>Ensure immediate safety</strong> of the person at risk</li>
                <li><strong>Listen carefully</strong> without leading questions</li>
                <li><strong>Document everything</strong> accurately and promptly</li>
                <li><strong>Report immediately</strong> to the Designated Safeguarding Lead</li>
                <li><strong>Do not investigate</strong> - leave this to trained professionals</li>
              </ol>

              <h3>Internal Reporting</h3>
              <div className="contact-details">
                <p><strong>Designated Safeguarding Lead:</strong></p>
                <p>Email: safeguarding@wembleywonders.org</p>
                <p>Phone: [24/7 Emergency Number]</p>
                
                <p><strong>Deputy Safeguarding Lead:</strong></p>
                <p>Email: deputy.safeguarding@wembleywonders.org</p>
                <p>Phone: [Alternative Emergency Number]</p>
              </div>

              <h3>External Reporting</h3>
              <div className="contact-details">
                <p><strong>Brent Local Authority Designated Officer (LADO):</strong></p>
                <p>Phone: 020 8937 4300</p>
                
                <p><strong>Police (Emergency):</strong> 999</p>
                <p><strong>Police (Non-Emergency):</strong> 101</p>
                
                <p><strong>Childline:</strong> 0800 1111</p>
                <p><strong>NSPCC Helpline:</strong> 0808 800 5000</p>
                
                <p><strong>Adult Social Services:</strong></p>
                <p>Phone: 020 8937 4300</p>
              </div>
            </section>

            <section className="policy-section">
              <h2>Support and Follow-Up</h2>
              
              <h3>Supporting the Individual</h3>
              <ul>
                <li>Continued participation in programs where safe and appropriate</li>
                <li>Additional supervision and support as needed</li>
                <li>Referral to specialist support services</li>
                <li>Regular check-ins and welfare monitoring</li>
              </ul>

              <h3>Supporting Staff and Volunteers</h3>
              <ul>
                <li>Debriefing sessions after serious incidents</li>
                <li>Access to counseling and support services</li>
                <li>Clear guidance on ongoing responsibilities</li>
                <li>Protection from false allegations where appropriate</li>
              </ul>

              <h3>Organizational Learning</h3>
              <ul>
                <li>Review of incidents to identify improvement opportunities</li>
                <li>Updates to policies and procedures as needed</li>
                <li>Additional training where gaps are identified</li>
                <li>Communication with stakeholders about lessons learned</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Allegations Against Staff</h2>
              
              <h3>Immediate Actions</h3>
              <ul>
                <li>Immediate suspension pending investigation if serious allegations</li>
                <li>Report to Local Authority Designated Officer (LADO)</li>
                <li>Cooperation with police investigations</li>
                <li>Protection of other participants and staff</li>
              </ul>

              <h3>Investigation Process</h3>
              <ul>
                <li>Independent investigation by qualified professionals</li>
                <li>Due process and fair hearing for accused staff</li>
                <li>Clear timelines and communication protocols</li>
                <li>Support for all parties during the process</li>
              </ul>

              <h3>Outcomes</h3>
              <ul>
                <li>Substantiated: Dismissal and referral to authorities</li>
                <li>Unsubstantiated: Review of reinstatement conditions</li>
                <li>False/Malicious: Support for falsely accused staff</li>
                <li>All outcomes documented and reported appropriately</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Digital Safeguarding</h2>
              
              <h3>Online Communication</h3>
              <ul>
                <li>All digital communication must be transparent and logged</li>
                <li>No private social media contact between staff and participants</li>
                <li>Group communication channels preferred over individual contact</li>
                <li>Parents/guardians included in communication with under-18s</li>
              </ul>

              <h3>Content Creation and Sharing</h3>
              <ul>
                <li>Consent required for all photography and video recording</li>
                <li>No sharing of personal information online</li>
                <li>Age-appropriate content guidelines for all platforms</li>
                <li>Regular monitoring of community media platforms</li>
              </ul>

              <h3>Maya AI Safeguarding</h3>
              <ul>
                <li>Conversations monitored for safeguarding concerns</li>
                <li>Automatic flagging of concerning content or requests</li>
                <li>No personal information shared through AI interactions</li>
                <li>Clear boundaries on AI relationship and capabilities</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Partnership Safeguarding</h2>
              
              <h3>Methodist Church Partnership</h3>
              <ul>
                <li>Alignment of safeguarding policies and procedures</li>
                <li>Shared responsibility for venue safety and security</li>
                <li>Clear communication protocols for incidents</li>
                <li>Joint training and awareness programs</li>
                <li>Regular review of partnership safeguarding effectiveness</li>
              </ul>

              <h3>External Partners and Volunteers</h3>
              <ul>
                <li>All partners must demonstrate equivalent safeguarding standards</li>
                <li>Written agreements outlining safeguarding responsibilities</li>
                <li>Regular monitoring and review of partner organizations</li>
                <li>Clear escalation procedures for multi-agency situations</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Governance and Oversight</h2>
              
              <h3>Safeguarding Leadership Structure</h3>
              <ul>
                <li><strong>Board-level Safeguarding Champion:</strong> Strategic oversight and accountability</li>
                <li><strong>Designated Safeguarding Lead:</strong> Operational responsibility and coordination</li>
                <li><strong>Deputy Safeguarding Lead:</strong> Support and cover arrangements</li>
                <li><strong>Program Safeguarding Officers:</strong> Front-line awareness and response</li>
              </ul>

              <h3>Regular Review and Monitoring</h3>
              <ul>
                <li>Annual policy review and updates</li>
                <li>Quarterly safeguarding committee meetings</li>
                <li>Regular case supervision and support</li>
                <li>Annual safeguarding audit and compliance check</li>
                <li>External safeguarding review every three years</li>
              </ul>

              <h3>Documentation and Records</h3>
              <ul>
                <li>Secure storage of all safeguarding records</li>
                <li>Clear retention schedules following statutory guidance</li>
                <li>Regular backup and data protection measures</li>
                <li>Annual returns to regulatory bodies as required</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Quality Assurance</h2>
              
              <h3>Performance Indicators</h3>
              <ul>
                <li>100% DBS clearance for youth-facing roles</li>
                <li>100% completion of mandatory safeguarding training</li>
                <li>Response times to safeguarding concerns</li>
                <li>Participant and family satisfaction with safety measures</li>
                <li>Incident trends and prevention effectiveness</li>
              </ul>

              <h3>Continuous Improvement</h3>
              <ul>
                <li>Regular feedback collection from participants and families</li>
                <li>Best practice sharing with other youth organizations</li>
                <li>Integration of new research and guidance</li>
                <li>Technology updates for enhanced protection</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Emergency Procedures</h2>
              
              <h3>Immediate Danger Situations</h3>
              <ol>
                <li><strong>Ensure immediate safety</strong> - remove from danger if safe to do so</li>
                <li><strong>Call emergency services</strong> - 999 if immediate danger</li>
                <li><strong>Provide first aid</strong> if trained and safe to do so</li>
                <li><strong>Contact parents/carers</strong> as soon as safely possible</li>
                <li><strong>Notify safeguarding lead</strong> immediately</li>
                <li><strong>Document everything</strong> as soon as safely possible</li>
              </ol>

              <h3>After-Hours Emergencies</h3>
              <ul>
                <li>24/7 emergency contact number for safeguarding lead</li>
                <li>Clear escalation to deputy lead if primary unavailable</li>
                <li>Direct contact protocols with emergency services</li>
                <li>Out-of-hours social services contact information</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Training Requirements</h2>
              
              <h3>All Staff and Volunteers</h3>
              <ul>
                <li>Foundation safeguarding awareness training (mandatory within 3 months)</li>
                <li>Role-specific safeguarding training</li>
                <li>Annual refresher training</li>
                <li>Emergency response procedures training</li>
              </ul>

              <h3>Safeguarding Leads</h3>
              <ul>
                <li>Advanced safeguarding leadership qualification</li>
                <li>Multi-agency working training</li>
                <li>Serious case review and investigation training</li>
                <li>Annual continuing professional development</li>
              </ul>

              <h3>Senior Leadership</h3>
              <ul>
                <li>Strategic safeguarding leadership training</li>
                <li>Legal responsibilities and compliance training</li>
                <li>Board governance of safeguarding training</li>
                <li>Crisis management and communication training</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Related Policies</h2>
              
              <p>This safeguarding policy should be read alongside our other policies:</p>
              
              <ul>
                <li>Health and Safety Policy</li>
                <li>Data Protection and Privacy Policy</li>
                <li>Equality, Diversity and Inclusion Policy</li>
                <li>Complaints and Whistleblowing Policy</li>
                <li>Staff Code of Conduct</li>
                <li>Digital Communications Policy</li>
                <li>Risk Assessment and Management Policy</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Contact Information</h2>
              
              <div className="contact-details">
                <p><strong>Designated Safeguarding Lead:</strong></p>
                <p>Email: safeguarding@wembleywonders.org</p>
                <p>Phone: [24/7 Emergency Number - To be added]</p>
                
                <p><strong>Deputy Safeguarding Lead:</strong></p>
                <p>Email: deputy.safeguarding@wembleywonders.org</p>
                <p>Phone: [Alternative Emergency Number - To be added]</p>
                
                <p><strong>Board Safeguarding Champion:</strong></p>
                <p>Email: board.safeguarding@wembleywonders.org</p>
                
                <p><strong>General Safeguarding Queries:</strong></p>
                <p>Email: safeguarding.queries@wembleywonders.org</p>
                
                <p><em>If you are concerned about immediate danger, always call 999 first.</em></p>
              </div>
            </section>

            <section className="policy-section">
              <h2>Policy Review</h2>
              
              <p>
                This policy is reviewed annually or following any serious safeguarding incident. 
                The next scheduled review date is September 2025.
              </p>
              
              <p>
                <strong>Policy Owner:</strong> Designated Safeguarding Lead<br />
                <strong>Approved by:</strong> Board of Directors<br />
                <strong>Implementation Date:</strong> September 2024<br />
                <strong>Next Review Date:</strong> September 2025
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SafeguardingPolicyPage;
