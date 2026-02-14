import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import ProductionPlannerV2 from '../../../components/sandboxes/kaywanas-court/ProductionPlannerV2';
import styles from './KaywanasCourtSandbox.module.css';

const KaywanasCourtSandbox: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Production Planner"
      pageStrapline="Plan Your Kaywana's Court Performance"
      pageGuide="Interactive production planning tool to help you bring your performance vision to life—whether you're a solo artist or building a collaborative team."
      showMaya={false}
      pageType="sandbox"
    >
      <div className={styles.sandboxContent}>
        {/* Dedication Section */}
        <section className={styles.dedicationSection}>
          <div className={styles.dedicationCard}>
            <div className={styles.dedicationIcon}>🎭</div>
            <h3>Dedicated to the pioneers who opened doors for us all</h3>
            <div className={styles.pioneers}>
              <div className={styles.pioneer}>
                <strong>Pearl Connor</strong>
                <p>Built The Negro Theatre Workshop (1961), creating space for Black actors when mainstream theatre shut them out</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Yvonne Brewster</strong>
                <p>Founded Talawa Theatre Company (1985), establishing the UK's first Black-led theatre company</p>
              </div>
              <div className={styles.pioneer}>
                <strong>Norman Beaton</strong>
                <p>Proved Caribbean stories belong on British stages, paving the way for generations of performers</p>
              </div>
            </div>
            <p className={styles.dedicationNote}>
              We stand on their shoulders. This Production Planner honors their legacy by helping the next generation plan and produce their own performances.
            </p>
          </div>
        </section>

        {/* What is the Production Planner */}
        <section className={styles.aboutSection}>
          <h2>What is the Production Planner?</h2>
          <p className={styles.aboutText}>
            The Production Planner is an <strong>interactive tool</strong> that shows you how Kaywana's Court brings all Wembley Wonders programmes together into collaborative seasonal performances.
          </p>
          <p className={styles.aboutText}>
            Whether you're a solo artist with a polished act needing production support (venue, tech, marketing) or building something with a team, this planner gives you a personalized roadmap showing:
          </p>
          <ul className={styles.featuresList}>
            <li>📅 <strong>14-week production timeline</strong> with specific tasks and milestones</li>
            <li>🎓 <strong>Workshop recommendations</strong> based on your specific needs (marketing, technical, costume, etc.)</li>
            <li>📍 <strong>Venue options</strong> with capacity, cost, and features</li>
            <li>💰 <strong>Budget breakdown</strong> with realistic costs and revenue projections</li>
            <li>📊 <strong>Revenue model</strong> (55% artist, 25% community, 20% operations)</li>
            <li>🤝 <strong>Community commitment</strong> (2 additional shows for schools/hospitals)</li>
          </ul>
        </section>

        {/* Every Production Needs All Five Programmes */}
        <section className={styles.collaborationSection}>
          <h2>Every Production Needs All Five Programmes</h2>
          <p className={styles.sectionIntro}>
            Kaywana's Court is where all Wembley Wonders programmes collaborate to create community theatre. Even solo artists benefit from this ecosystem of support!
          </p>
          <div className={styles.programmeCards}>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>📖</div>
              <h3>Pageturners</h3>
              <p>Scripts, stories, and narrative development</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🔧</div>
              <h3>STEMgeneers</h3>
              <p>Set design, lighting, sound tech, stage engineering</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>💼</div>
              <h3>TECHreneurs</h3>
              <p>Budgets, marketing, ticket sales, sponsorships</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>👗</div>
              <h3>Silk Stilettos</h3>
              <p>Costume design, wardrobe, character styling</p>
            </div>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🎵</div>
              <h3>Trubble n Bass</h3>
              <p>Live music, soundscapes, audio production</p>
            </div>
          </div>
        </section>

        {/* Our Cultural Seasons */}
        <section className={styles.seasonsSection}>
          <h2>Our Cultural Seasons</h2>
          <p className={styles.sectionIntro}>
            We follow <strong>cultural rhythms</strong>, not the traditional calendar—honoring Caribbean and diaspora traditions while creating space for new celebrations.
          </p>
          <div className={styles.seasonsGrid}>
            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🎉</div>
              <h3>Carnival Season</h3>
              <p className={styles.seasonPeriod}>January - March</p>
              <p className={styles.seasonTheme}>Celebration, Liberation, Joy</p>
              <p className={styles.seasonDesc}>High-energy, colorful, music-driven performances</p>
              <p className={styles.seasonTypes}><strong>Best for:</strong> Musical performances, cultural celebrations, cosplay showcases</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌿</div>
              <h3>Heritage Season</h3>
              <p className={styles.seasonPeriod}>April - June</p>
              <p className={styles.seasonTheme}>Roots, Ancestors, Preservation</p>
              <p className={styles.seasonDesc}>Reflective, storytelling, educational performances</p>
              <p className={styles.seasonTypes}><strong>Best for:</strong> One-act plays, community storytelling, spoken word</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌾</div>
              <h3>Harvest Season</h3>
              <p className={styles.seasonPeriod}>July - September</p>
              <p className={styles.seasonTheme}>Abundance, Community, Gratitude</p>
              <p className={styles.seasonDesc}>Collaborative, celebratory, grounding performances</p>
              <p className={styles.seasonTypes}><strong>Best for:</strong> Cultural celebrations, LARP experiences, showcases</p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>📖</div>
              <h3>Storytelling Season</h3>
              <p className={styles.seasonPeriod}>October - December</p>
              <p className={styles.seasonTheme}>Wisdom, Tradition, Legacy</p>
              <p className={styles.seasonDesc}>Intimate, mystical, intergenerational performances</p>
              <p className={styles.seasonTypes}><strong>Best for:</strong> Spoken word, one-act plays, elder wisdom storytelling</p>
            </div>
          </div>
        </section>

        {/* Try the Production Planner */}
        <section className={styles.plannerSection}>
          <div className={styles.plannerIntro}>
            <h2>Try the Production Planner</h2>
            <p>
              Answer a few questions, and Maya will guide you through creating a personalized production plan. You'll get a complete roadmap showing exactly what you need to bring your vision to life.
            </p>
          </div>
          
          <ProductionPlannerV2 />
        </section>

        {/* Free vs Member Access */}
        <section className={styles.tiersSection}>
          <h2>Free vs Member Access</h2>
          <div className={styles.tiersGrid}>
            <div className={styles.tierCard}>
              <h3>Free Explorer</h3>
              <p className={styles.tierPrice}>£0</p>
              <ul className={styles.tierFeatures}>
                <li className={styles.included}>✓ Plan 3 production concepts</li>
                <li className={styles.included}>✓ See full cross-programme breakdown</li>
                <li className={styles.included}>✓ Download plans as .txt files</li>
                <li className={styles.included}>✓ Explore all cultural seasons</li>
                <li className={styles.included}>✓ Learn production timelines</li>
                <li className={styles.excluded}>✗ Cannot submit real proposals</li>
                <li className={styles.excluded}>✗ Cannot join production teams</li>
                <li className={styles.excluded}>✗ Cannot perform on The Grand Stage</li>
              </ul>
            </div>

            <div className={`${styles.tierCard} ${styles.featured}`}>
              <div className={styles.featuredBadge}>BEST VALUE</div>
              <h3>Programme Member</h3>
              <p className={styles.tierPrice}>From £15/month</p>
              <ul className={styles.tierFeatures}>
                <li className={styles.included}>✓ Submit unlimited production proposals</li>
                <li className={styles.included}>✓ Vote on seasonal show selection</li>
                <li className={styles.included}>✓ Join cross-programme production teams</li>
                <li className={styles.included}>✓ Perform/produce on The Grand Stage</li>
                <li className={styles.included}>✓ Featured in Joystick reviews</li>
                <li className={styles.included}>✓ Broadcast on Rayd-yo</li>
                <li className={styles.included}>✓ Portfolio tracking with DOI</li>
                <li className={styles.included}>✓ Revenue sharing (55% for participants)</li>
              </ul>
              <div className={styles.tierPricing}>
                <p><strong>£15/mo:</strong> 1 programme + Kaywana's Court access</p>
                <p><strong>£35/mo:</strong> 3 programmes + priority roles</p>
                <p><strong>£50/mo:</strong> ALL 9 programmes + leadership opportunities</p>
              </div>
              <Link to="/membership" className={styles.joinButton}>
                Join Wembley Wonders →
              </Link>
            </div>
          </div>
        </section>

        {/* More Collaboration Tools Coming Soon */}
        <section className={styles.comingSoonSection}>
          <h2>More Collaboration Tools Coming Soon</h2>
          <div className={styles.comingSoonGrid}>
            <div className={styles.comingSoonCard}>
              <div className={styles.comingSoonIcon}>🎬</div>
              <h3>Rehearsal Scheduler</h3>
              <p>Coordinate cross-programme rehearsals and collaboration sessions</p>
            </div>
            <div className={styles.comingSoonCard}>
              <div className={styles.comingSoonIcon}>📋</div>
              <h3>Production Dashboard</h3>
              <p>Track progress, assign roles, manage timelines for active shows</p>
            </div>
            <div className={styles.comingSoonCard}>
              <div className={styles.comingSoonIcon}>🗳️</div>
              <h3>Community Voting</h3>
              <p>Democratic selection of seasonal shows through collaborative consensus</p>
            </div>
          </div>
        </section>

        {/* Ready to Create Community Theatre */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Create Community Theatre?</h2>
            <p>The Production Planner shows you what's possible. Membership makes it real.</p>
            <div className={styles.ctaButtons}>
              <Link to="/membership" className={styles.primaryCta}>
                Join Wembley Wonders
              </Link>
              <Link to="/programmes/kaywanas-court" className={styles.secondaryCta}>
                Learn More About Kaywana's Court
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default KaywanasCourtSandbox;