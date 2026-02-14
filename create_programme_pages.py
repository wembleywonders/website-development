#!/usr/bin/env python3
import os

# Ensure directories exist
os.makedirs('src/pages/programmes/kaywanas-court', exist_ok=True)
os.makedirs('src/pages/programmes/pageturners', exist_ok=True)

# Kaywana's Court TypeScript file
kaywanas_tsx = """import React from 'react';
import PageTemplate from '../../../components/PageTemplate';
import styles from './KaywanasCourtPage.module.css';

const KaywanasCourtPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Kaywana's Court"
      pageStrapline="Where Stories Come Alive Through Culture, Performance & Innovation"
      pageGuide="Kaywana's Court is our performance and cultural platform celebrating diaspora creativity through tech showcases, LARP, cosplay, open mic nights, and live performances. From page to stage—your story deserves an audience."
      showMaya={true}
      pageType="programme"
    >
      <div className={styles.kaywanasContent}>
        
        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About Kaywana's Court</h2>
          <p className={styles.leadText}>
            Kaywana's Court is where creativity meets community. Named to honor Caribbean 
            heritage and diaspora storytelling traditions, this is our space for performance, 
            cultural expression, and innovation.
          </p>
          <p>
            Whether you're a writer who wants to see your work performed, a performer looking 
            for a supportive stage, or someone who loves experiencing live culture—Kaywana's 
            Court is your platform.
          </p>
        </section>

        {/* What We Do Section */}
        <section className={styles.programmesSection}>
          <h2 className={styles.sectionTitle}>What Happens at Kaywana's Court</h2>
          
          <div className={styles.programmeGrid}>
            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>🎭</div>
              <h3>Performance & Theatre</h3>
              <p>
                Live performances, theatrical showcases, and community stage nights. 
                Works developed with Pageturners Writer's Workshop brought to life.
              </p>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>🎮</div>
              <h3>LARP & Interactive Theatre</h3>
              <p>
                Live Action Role Playing events, immersive storytelling experiences, 
                and character-driven interactive performances.
              </p>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>🎨</div>
              <h3>Cosplay & Character Showcases</h3>
              <p>
                Celebrate character design, costume craftsmanship, and creative expression 
                through cosplay exhibitions and showcases.
              </p>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>💻</div>
              <h3>Tech Showcases</h3>
              <p>
                Technology demonstrations, creative tech projects, and innovation displays 
                from our community creators.
              </p>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>🎤</div>
              <h3>Open Mic & Community Stage</h3>
              <p>
                Open mic nights, spoken word, poetry slams, and community performances. 
                Everyone has a voice worth sharing.
              </p>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.cardIcon}>🌍</div>
              <h3>Cultural Celebrations</h3>
              <p>
                Heritage celebrations, cultural festivals, and diaspora storytelling events 
                honoring our diverse community.
              </p>
            </div>
          </div>
        </section>

        {/* Connection to Pageturners */}
        <section className={styles.connectionSection}>
          <div className={styles.connectionBox}>
            <h3>✍️ From Writing to Performance</h3>
            <p>
              Kaywana's Court works closely with <a href="/programmes/pageturners">Pageturners Writer's Workshop</a>.
              Stories and scripts developed in writing sessions can be brought to life on our stage.
            </p>
            <p className={styles.journeyText}>
              <strong>The Journey:</strong> Write with Pageturners → Develop your piece → 
              Perform at Kaywana's Court → Share with the community
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <p>Check our <a href="/calendar">Community Calendar</a> for the latest Kaywana's Court events.</p>
          
          <div className={styles.eventCta}>
            <a href="/calendar" className={styles.ctaButton}>View Event Calendar</a>
            <a href="/workshop-calendar" className={styles.ctaButtonSecondary}>Browse All Workshops</a>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className={styles.involvedSection}>
          <h2 className={styles.sectionTitle}>Get Involved</h2>
          
          <div className={styles.pathwayGrid}>
            <div className={styles.pathwayCard}>
              <h3>🎭 Performers</h3>
              <p>
                Actors, spoken word artists, musicians, and performers—bring your talent 
                to our stage. Solo acts and groups welcome.
              </p>
              <a href="/get-started" className={styles.pathwayLink}>Apply to Perform →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>✍️ Writers</h3>
              <p>
                Join Pageturners Writer's Workshop to develop your scripts and stories 
                for performance at Kaywana's Court.
              </p>
              <a href="/programmes/pageturners" className={styles.pathwayLink}>Join Pageturners →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>🎨 Backstage Crew</h3>
              <p>
                Tech support, stage management, costume design, props, lighting, sound—
                essential roles for every performance.
              </p>
              <a href="/workshops" className={styles.pathwayLink}>Backstage Skills Training →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>🎟️ Audience</h3>
              <p>
                Support community creativity by attending performances. Your presence 
                means everything to our performers.
              </p>
              <a href="/calendar" className={styles.pathwayLink}>Book Tickets →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>🤝 Volunteers</h3>
              <p>
                Event support, ushers, hospitality, and community ambassadors needed 
                for every Kaywana's Court event.
              </p>
              <a href="/volunteers" className={styles.pathwayLink}>Volunteer →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>💼 Partners</h3>
              <p>
                Venues, cultural organizations, and businesses—partner with us to expand 
                performance opportunities across Wembley.
              </p>
              <a href="/partner-with-us" className={styles.pathwayLink}>Partner With Us →</a>
            </div>
          </div>
        </section>

        {/* Cultural Significance */}
        <section className={styles.heritageSection}>
          <h2 className={styles.sectionTitle}>Our Cultural Roots</h2>
          <p>
            "Kaywana" honors Caribbean storytelling traditions where the village court 
            was a gathering place for stories, performances, and community connection. 
            Kaywana's Court carries this tradition forward in Wembley—celebrating diaspora 
            voices while welcoming all stories and storytellers.
          </p>
          <p>
            Every performance at Kaywana's Court strengthens our community's cultural wealth 
            and creative legacy.
          </p>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Connect With Us</h2>
          <p>Questions about performing, attending, or partnering?</p>
          <div className={styles.contactOptions}>
            <a href="/contact" className={styles.contactButton}>Get in Touch</a>
            <a href="/maya" className={styles.contactButton}>Chat with Maya</a>
            <p className={styles.phoneNumber}>Call: 0208 902 9991</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default KaywanasCourtPage;
"""

with open('src/pages/programmes/kaywanas-court/KaywanasCourtPage.tsx', 'w', encoding='utf-8') as f:
    f.write(kaywanas_tsx)

print("✅ Created KaywanasCourtPage.tsx")

# Write the index files and tell user the CSS files are too large for one script
