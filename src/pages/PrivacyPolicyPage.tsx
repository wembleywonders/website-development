import React from 'react';
import Footer from '../components/layout/Footer';
import './PolicyPages.css';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="policy-page">
      
      <div className="policy-content">
        <div className="policy-container">
          <div className="policy-header">
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-subtitle">
              How we collect, use, and protect your personal information
            </p>
            <p className="last-updated">Last updated: September 2024</p>
          </div>

          <div className="policy-sections">
            <section className="policy-section">
              <h2>Who We Are</h2>
              <p>
                Wembley Wonders CIC is a Community Interest Company incorporated on 19th April 2024, 
                operating as a professional community development platform in Wembley, London. 
                We are committed to protecting and respecting your privacy.
              </p>
            </section>

            <section className="policy-section">
              <h2>Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <ul>
                <li>Name, address, email, and phone number</li>
                <li>Age and emergency contact details</li>
                <li>Skills assessment responses and learning preferences</li>
                <li>Membership tier progress and activity participation</li>
                <li>Safeguarding check results and training completion</li>
              </ul>

              <h3>Technical Information</h3>
              <ul>
                <li>IP address and browser information</li>
                <li>Website usage data and interaction patterns</li>
                <li>Maya Chat conversations for service improvement</li>
                <li>Local storage data for personalized experience</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>How We Use Your Information</h2>
              
              <h3>Program Administration</h3>
              <ul>
                <li>Managing membership applications and tier progression</li>
                <li>Coordinating workshop attendance and project participation</li>
                <li>Conducting required safeguarding checks</li>
                <li>Providing personalized learning recommendations</li>
              </ul>

              <h3>Communication</h3>
              <ul>
                <li>Sending program updates and workshop notifications</li>
                <li>Emergency contact in case of incidents</li>
                <li>Community newsletter and event announcements</li>
                <li>Democratic governance and voting communications</li>
              </ul>

              <h3>Legal Requirements</h3>
              <ul>
                <li>Compliance with charity and CIC reporting obligations</li>
                <li>Safeguarding responsibilities for youth programs</li>
                <li>Health and safety incident reporting</li>
                <li>Financial audit and transparency requirements</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Information Sharing</h2>
              
              <p>We only share your information when necessary:</p>
              
              <h3>Within Our Organization</h3>
              <ul>
                <li>Authorized staff and volunteers for program delivery</li>
                <li>Tier coordinators for membership progression</li>
                <li>Safeguarding officers for child protection</li>
              </ul>

              <h3>External Partners</h3>
              <ul>
                <li>Methodist Church partnership for venue coordination</li>
                <li>DBS checking services for safeguarding clearance</li>
                <li>Emergency services if required for safety</li>
                <li>Regulatory bodies for legal compliance</li>
              </ul>

              <p>
                <strong>We never sell or share your data for commercial purposes.</strong>
              </p>
            </section>

            <section className="policy-section">
              <h2>Data Security</h2>
              
              <ul>
                <li>Encrypted storage of all personal information</li>
                <li>Limited access on need-to-know basis</li>
                <li>Regular security audits and updates</li>
                <li>Secure disposal of outdated records</li>
                <li>Physical security for paper documents</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Your Rights</h2>
              
              <p>Under UK GDPR, you have the right to:</p>
              
              <ul>
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate information</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Portability:</strong> Transfer your data to another organization</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to processing in certain circumstances</li>
              </ul>

              <p>
                To exercise these rights, contact us at privacy@wembleywonders.org
              </p>
            </section>

            <section className="policy-section">
              <h2>Retention Periods</h2>
              
              <ul>
                <li><strong>Active members:</strong> Data retained during membership</li>
                <li><strong>Former members:</strong> Core data retained for 7 years for audit purposes</li>
                <li><strong>Safeguarding records:</strong> Retained according to statutory requirements</li>
                <li><strong>Financial records:</strong> Retained for 7 years per charity law</li>
                <li><strong>Website analytics:</strong> Anonymized after 26 months</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Children's Privacy</h2>
              
              <p>
                For participants under 18, we require parental consent and implement 
                additional safeguards:
              </p>
              
              <ul>
                <li>Enhanced DBS checks for all staff and volunteers</li>
                <li>Parental access to their child's program data</li>
                <li>Restricted data sharing protocols</li>
                <li>Age-appropriate privacy explanations</li>
              </ul>
            </section>

            <section className="policy-section">
              <h2>Changes to This Policy</h2>
              
              <p>
                We may update this policy to reflect changes in our practices or legal 
                requirements. We will notify active members of significant changes via 
                email and post updates on our website.
              </p>
            </section>

            <section className="policy-section">
              <h2>Contact Information</h2>
              
              <div className="contact-details">
                <p><strong>Data Protection Officer:</strong></p>
                <p>Email: privacy@wembleywonders.org</p>
                <p>Address: Wembley Wonders CIC, Wembley, London</p>
                
                <p><strong>Complaints:</strong></p>
                <p>If you're unhappy with how we handle your data, you can complain to the 
                Information Commissioner's Office (ICO) at ico.org.uk</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;

