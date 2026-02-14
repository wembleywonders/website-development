import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import styles from './VolunteersPage.module.css';

const VolunteersPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Volunteer With Us"
      pageStrapline="Building Community Wealth Through Shared Time & Skills"
      pageGuide="Wembley Wonders runs entirely on community participation. Every programme, workshop, and event exists because people contribute their time, skills, and energy. Whether you have two hours a month or want deeper involvement, there's a place for you here."
      showMaya={true}
      pageType="community"
    >
      <div className={styles.volunteersContent}>
        
        {/* Why Volunteer */}
        <section className={styles.whySection}>
          <h2 className={styles.sectionTitle}>Why Volunteer?</h2>
          <p className={styles.leadText}>
            Volunteering at Wembley Wonders isn't charity—it's community building. You gain skills, 
            connections, and experience while helping create opportunities that strengthen everyone. 
            What you put in comes back through a stronger, more capable community.
          </p>
          
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🎯</div>
              <h3>Develop Real Skills</h3>
              <p>Event coordination, tech support, facilitation, stage management, administrative skills—all transferable to employment.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🤝</div>
              <h3>Build Your Network</h3>
              <p>Work alongside experienced professionals, creative practitioners, and community leaders. Connections that open doors.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>📚</div>
              <h3>Access to Training</h3>
              <p>Volunteers get priority access to workshops, backstage skills training, and professional development opportunities.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🎭</div>
              <h3>Behind the Scenes</h3>
              <p>See how cultural programmes actually work. Experience professional production standards up close.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⭐</div>
              <h3>Recognition & Progression</h3>
              <p>Consistent volunteers progress into paid roles, leadership positions, and community governance.</p>
            </div>

            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💪</div>
              <h3>Tangible Impact</h3>
              <p>Your contribution directly enables programmes. Without volunteers, events don't happen. Your work matters.</p>
            </div>
          </div>
        </section>

        {/* Volunteer Pathways */}
        <section className={styles.pathwaysSection}>
          <h2 className={styles.sectionTitle}>Volunteer Opportunities</h2>
          <p className={styles.leadText}>
            Different programmes need different skills. Choose what matches your interests, 
            availability, and experience level.
          </p>

          <div className={styles.pathwayGrid}>
            {/* Kaywana's Court Volunteers */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>🎭 Kaywana's Court</h3>
                <span className={styles.commitmentBadge}>Event-based</span>
              </div>
              <p>Support live performances, showcases, and cultural events.</p>
              
              <h4>Roles Available:</h4>
              <ul>
                <li><strong>Stage Crew:</strong> Setup, strike, backstage coordination</li>
                <li><strong>Technical Support:</strong> Lighting, sound assistance (training provided)</li>
                <li><strong>Front of House:</strong> Ushers, ticketing, audience support</li>
                <li><strong>Hospitality:</strong> Refreshments, green room coordination</li>
                <li><strong>Documentation:</strong> Photography, video, social media</li>
              </ul>

              <Link to="/programmes/kaywanas-court" className={styles.pathwayLink}>
                Learn About Kaywana's Court →
              </Link>
            </div>

            {/* Pageturners Volunteers */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>✍️ Pageturners Workshop</h3>
                <span className={styles.commitmentBadge}>Ongoing</span>
              </div>
              <p>Support writers in developing their craft and bringing work to publication or performance.</p>
              
              <h4>Roles Available:</h4>
              <ul>
                <li><strong>Writing Mentors:</strong> Guide newer writers, provide feedback</li>
                <li><strong>Workshop Facilitators:</strong> Lead sessions on specific techniques</li>
                <li><strong>Editing Support:</strong> Help prepare work for publication</li>
                <li><strong>Publishing Coordination:</strong> Layout, formatting, distribution</li>
                <li><strong>Reading Series Host:</strong> Organize public readings</li>
              </ul>

              <Link to="/programmes/pageturners" className={styles.pathwayLink}>
                Learn About Pageturners →
              </Link>
            </div>

            {/* Workshop Support */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>🔨 Workshops & Training</h3>
                <span className={styles.commitmentBadge}>Flexible</span>
              </div>
              <p>Help deliver skills workshops and backstage training programmes.</p>
              
              <h4>Roles Available:</h4>
              <ul>
                <li><strong>Workshop Assistants:</strong> Setup, materials, participant support</li>
                <li><strong>Tech Demonstrators:</strong> Help with digital/tech workshops</li>
                <li><strong>Skills Coaches:</strong> Share specific expertise (carpentry, sound, etc.)</li>
                <li><strong>Registration Support:</strong> Check-in, attendance tracking</li>
                <li><strong>Equipment Management:</strong> Inventory, maintenance, logistics</li>
              </ul>

              <Link to="/workshops" className={styles.pathwayLink}>
                View Workshops →
              </Link>
            </div>

            {/* Community Events */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>🎉 Community Events</h3>
                <span className={styles.commitmentBadge}>Seasonal</span>
              </div>
              <p>Support festivals, open days, community showcases, and special events.</p>
              
              <h4>Roles Available:</h4>
              <ul>
                <li><strong>Event Coordinators:</strong> Help plan and run community events</li>
                <li><strong>Activities Leaders:</strong> Facilitate interactive sessions</li>
                <li><strong>Information Desk:</strong> Welcome visitors, answer questions</li>
                <li><strong>Setup/Strike Teams:</strong> Event preparation and cleanup</li>
                <li><strong>Roaming Support:</strong> Help attendees navigate events</li>
              </ul>

              <Link to="/calendar" className={styles.pathwayLink}>
                View Event Calendar →
              </Link>
            </div>

            {/* Administrative Support */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>📋 Administrative & Operations</h3>
                <span className={styles.commitmentBadge}>Regular</span>
              </div>
              <p>Behind-the-scenes work that keeps programmes running smoothly.</p>
              
              <h4>Roles Available:</h4>
              <ul>
                <li><strong>Data Entry & Records:</strong> Maintain participant databases</li>
                <li><strong>Communications:</strong> Social media, newsletters, updates</li>
                <li><strong>Fundraising Support:</strong> Research, applications, donor relations</li>
                <li><strong>Research & Evaluation:</strong> Impact tracking, surveys, reporting</li>
                <li><strong>Policy Development:</strong> Help shape organizational policies</li>
              </ul>

              <Link to="/contact" className={styles.pathwayLink}>
                Get in Touch →
              </Link>
            </div>

            {/* Specialized Skills */}
            <div className={styles.pathwayCard}>
              <div className={styles.pathwayHeader}>
                <h3>⚡ Specialized Skills</h3>
                <span className={styles.commitmentBadge}>As needed</span>
              </div>
              <p>Professional expertise that enhances our capacity and quality.</p>
              
              <h4>Skills We Need:</h4>
              <ul>
                <li><strong>Legal/Compliance:</strong> Policy review, safeguarding, governance</li>
                <li><strong>Financial Management:</strong> Bookkeeping, budgets, reporting</li>
                <li><strong>Web/Tech Development:</strong> Platform improvements, troubleshooting</li>
                <li><strong>Marketing & Comms:</strong> Campaign design, media relations</li>
                <li><strong>Professional Mentorship:</strong> Career guidance for members</li>
              </ul>

              <Link to="/contact" className={styles.pathwayLink}>
                Offer Your Expertise →
              </Link>
            </div>
          </div>
        </section>

        {/* Volunteer Journey */}
        <section className={styles.journeySection}>
          <h2 className={styles.sectionTitle}>Your Volunteer Journey</h2>
          
          <div className={styles.journeyPath}>
            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Express Interest</h4>
                <p>Submit a volunteer application telling us about your interests, skills, and availability. No prior experience required.</p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Informal Chat</h4>
                <p>We'll have a conversation to understand what you're looking for and match you to appropriate opportunities.</p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Induction & Training</h4>
                <p>Learn about Wembley Wonders, safeguarding, and get role-specific training. DBS check if working with young people.</p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>Start Contributing</h4>
                <p>Begin with supported roles. Work alongside experienced volunteers. Build confidence and competence.</p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h4>Develop & Progress</h4>
                <p>Take on more responsibility, access advanced training, move into coordination or leadership roles.</p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>6</div>
              <div className={styles.stepContent}>
                <h4>Shape the Organization</h4>
                <p>Contribute to governance, strategic planning, community decision-making. Some volunteers join our board.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Time Commitments */}
        <section className={styles.commitmentSection}>
          <h2 className={styles.sectionTitle}>Time Commitments</h2>
          <p>We need different levels of involvement. Choose what works for you.</p>

          <div className={styles.commitmentGrid}>
            <div className={styles.commitmentCard}>
              <h3>Occasional (2-4 hours/month)</h3>
              <p>Event support, one-off tasks, seasonal help. Perfect for trying volunteering or fitting around other commitments.</p>
            </div>

            <div className={styles.commitmentCard}>
              <h3>Regular (4-8 hours/month)</h3>
              <p>Workshop assistance, consistent programme support. Build relationships and see ongoing impact.</p>
            </div>

            <div className={styles.commitmentCard}>
              <h3>Core Team (8+ hours/month)</h3>
              <p>Coordination roles, specialized support, leadership positions. Significant influence on programme direction.</p>
            </div>
          </div>
        </section>

        {/* Support for Volunteers */}
        <section className={styles.supportSection}>
          <h2 className={styles.sectionTitle}>What We Provide</h2>
          
          <div className={styles.supportGrid}>
            <div className={styles.supportItem}>
              <h4>📋 Clear Role Descriptions</h4>
              <p>You'll know exactly what's expected and what support is available.</p>
            </div>

            <div className={styles.supportItem}>
              <h4>🎓 Training & Development</h4>
              <p>Induction, role-specific training, safeguarding, plus ongoing skill development.</p>
            </div>

            <div className={styles.supportItem}>
              <h4>👥 Supervision & Support</h4>
              <p>Regular check-ins, experienced coordinators available, never left unsupported.</p>
            </div>

            <div className={styles.supportItem}>
              <h4>💷 Expenses Reimbursement</h4>
              <p>Travel and out-of-pocket expenses covered. Volunteering shouldn't cost you money.</p>
            </div>

            <div className={styles.supportItem}>
              <h4>📜 References & Certification</h4>
              <p>Formal recognition of your contribution, references for employment or education.</p>
            </div>

            <div className={styles.supportItem}>
              <h4>🎉 Volunteer Recognition</h4>
              <p>Regular appreciation events, awards, public acknowledgment of contributions.</p>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section className={styles.ctaSection}>
          <h2 className={styles.sectionTitle}>Ready to Get Involved?</h2>
          <p className={styles.leadText}>
            Start your volunteer journey with Wembley Wonders. Whether you have specific skills 
            to offer or just want to help, we'll find the right role for you.
          </p>

          <div className={styles.ctaButtons}>
            <Link to="/apply?type=volunteer" className={styles.primaryButton}>
              Apply to Volunteer
            </Link>
            <Link to="/login" className={styles.secondaryButton}>
              Volunteer Portal Login
            </Link>
          </div>

          <div className={styles.contactInfo}>
            <p>Questions about volunteering?</p>
            <Link to="/contact" className={styles.contactLink}>Contact Us</Link>
            <span className={styles.separator}>•</span>
            <Link to="/get-started" className={styles.contactLink}>Chat with Maya</Link>
            <span className={styles.separator}>•</span>
            <span className={styles.phoneText}>Call: 0208 902 9991</span>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default VolunteersPage;