import React from 'react';
import PageTemplate from '../../../components/PageTemplate';
import styles from './PageturnersPage.module.css';

const PageturnersPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Pageturners Writer's Workshop"
      pageStrapline="Writing Our Stories, Shaping Our Worlds"
      pageGuide="Pageturners is our creative writing hub for developing stories, scripts, and narratives that matter. From personal memoirs to performance scripts, game design to publishing—your voice deserves to be heard."
      showMaya={true}
      pageType="programme"
    >
      <div className={styles.pageturnersContent}>
        
        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About Pageturners</h2>
          <p className={styles.leadText}>
            Pageturners Writer's Workshop is where Wembley's stories are written. Whether you're 
            a first-time writer or experienced storyteller, this is your space to develop your 
            craft, explore diaspora narratives, and see your work come to life.
          </p>
          <p>
            Writing is power. Every story written here strengthens our community's creative 
            wealth and cultural legacy.
          </p>
        </section>

        {/* ✨ Sandbox CTA Section */}
        <section className={styles.sandboxPromotionSection}>
          <div className={styles.sandboxCard}>
            <div className={styles.sandboxIcon}>✍️</div>
            <h2 className={styles.sandboxTitle}>Try the Writer's Sandbox</h2>
            <p className={styles.sandboxDescription}>
              Start creating immediately. No sign-up needed. 7 professional writing tools 
              ready to use now: Story Starter, Creative Writing Studio, Script Writing, 
              Game Design, Publishing Pathways, Diaspora Narratives, and Wellbeing Writing.
            </p>
            <div className={styles.sandboxFeatures}>
              <span className={styles.feature}>📖 5 Caribbean Literary Genres</span>
              <span className={styles.feature}>✨ 7 Writing Tools Available Now!</span>
              <span className={styles.feature}>🎭 Scripts for Stage & Radio</span>
              <span className={styles.feature}>💾 3 Free Downloads Per Tool</span>
            </div>
            <a href="/programmes/pageturners/sandbox" className={styles.sandboxCta}>
              Enter the Sandbox →
            </a>
            <p className={styles.sandboxNote}>
              Perfect for testing your ideas, discovering your voice, or just having fun with words. 
              All 7 activities are ready to use right now!
            </p>
          </div>
        </section>

        {/* What We Offer Section - ALL ACTIVITIES NOW AVAILABLE */}
        <section className={styles.workshopSection}>
          <h2 className={styles.sectionTitle}>7 Writing Tools Available Now</h2>
          
          <div className={styles.workshopGrid}>
            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>✨</div>
              <h3>Story Starter</h3>
              <p>
                Jump straight into writing with 5 Caribbean literary genres and 10 authentic 
                prompts. Real-time word count, clean interface. Start creating in seconds!
              </p>
              <a href="/programmes/pageturners/sandbox?activity=story-starter" className={styles.tryNowLink}>
                Try Story Starter Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>📝</div>
              <h3>Creative Writing Studio</h3>
              <p>
                Fiction, poetry, memoir, flash fiction. Choose your genre, select a prompt, 
                and develop your unique voice with professional guidance.
              </p>
              <a href="/programmes/pageturners/sandbox?activity=creative-writing" className={styles.tryNowLink}>
                Open Studio Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>🎭</div>
              <h3>Scripts & Performance Writing</h3>
              <p>
                Write for stage, screen, and radio with industry-standard templates. Your scripts 
                can be performed at Kaywana's Court or broadcast on Raydyo!
              </p>
              <a href="/programmes/pageturners/sandbox?activity=script-writing" className={styles.tryNowLink}>
                Write Scripts Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>🎮</div>
              <h3>Game Design & Interactive Stories</h3>
              <p>
                Create LARP scenarios, choose-your-own-adventure stories, and narrative puzzles. 
                Build multi-scene experiences with branching choices.
              </p>
              <a href="/programmes/pageturners/sandbox?activity=game-design" className={styles.tryNowLink}>
                Design Games Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>📖</div>
              <h3>Publishing Pathways</h3>
              <p>
                Submit to Joystick e-zine, community anthologies, or create your own zine. 
                Complete guidelines, submission forms, and 55% revenue share model.
              </p>
              <a href="/programmes/pageturners/sandbox?activity=publishing" className={styles.tryNowLink}>
                Explore Publishing Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>🌍</div>
              <h3>Diaspora Narratives</h3>
              <p>
                Explore heritage, identity, migration, and belonging. Research prompts and 
                writing space for preserving your family and community stories.
              </p>
              <a href="/programmes/pageturners/sandbox?activity=diaspora-narratives" className={styles.tryNowLink}>
                Tell Your Story Now →
              </a>
            </div>

            <div className={styles.workshopCard}>
              <div className={styles.cardIcon}>🧠</div>
              <h3>Wellbeing Through Writing</h3>
              <p>
                Therapeutic journaling, gratitude practice, emotional processing, and healing 
                through words. Private, safe, and supportive space.
              </p>
              <a href="/programmes/pageturners/sandbox?activity=wellbeing-writing" className={styles.tryNowLink}>
                Start Healing Now →
              </a>
            </div>
          </div>
        </section>

        {/* Progression Pathway */}
        <section className={styles.progressionSection}>
          <h2 className={styles.sectionTitle}>Your Writing Journey</h2>
          
          <div className={styles.progressionPath}>
            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Explore: The Sandbox</h4>
                <p>
                  Start with zero pressure. Try any of our 7 writing tools to discover your voice, 
                  experiment with genres, and see what resonates. Story Starter is perfect for beginners!
                </p>
                <a href="/programmes/pageturners/sandbox" className={styles.stepLink}>Enter the Sandbox →</a>
              </div>
            </div>

            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Start: Taster Session</h4>
                <p>
                  Drop into a free taster workshop. No experience needed—just bring your curiosity 
                  and we'll guide you through the fundamentals.
                </p>
                <a href="/workshop-calendar" className={styles.stepLink}>Find a Taster →</a>
              </div>
            </div>

            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Develop: Regular Workshops</h4>
                <p>
                  Join monthly workshops to develop your skills and build a supportive writing 
                  community. Practice what you learned in the sandbox!
                </p>
                <a href="/workshop-calendar" className={styles.stepLink}>View Schedule →</a>
              </div>
            </div>

            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4>Create: Focused Projects</h4>
                <p>
                  Work on specific writing projects—scripts, stories, or anthologies—with 
                  dedicated support. Take sandbox experiments to finished pieces.
                </p>
                <a href="/get-started" className={styles.stepLink}>Join a Project →</a>
              </div>
            </div>

            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h4>Share: Performance & Publishing</h4>
                <p>
                  See your work performed at Kaywana's Court, published in Joystick e-zine, 
                  or broadcast on Raydyo. Earn 55% revenue share!
                </p>
                <a href="/programmes/kaywanas-court" className={styles.stepLink}>Explore Kaywana's Court →</a>
              </div>
            </div>

            <div className={styles.progressionStep}>
              <div className={styles.stepNumber}>6</div>
              <div className={styles.stepContent}>
                <h4>Lead: Mentor & Facilitate</h4>
                <p>
                  Experienced writers can mentor others, lead workshop sessions, and help new 
                  writers navigate the sandbox tools.
                </p>
                <a href="/volunteers" className={styles.stepLink}>Become a Mentor →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Connection to Kaywana's Court */}
        <section className={styles.connectionSection}>
          <div className={styles.connectionBox}>
            <h3>✨ From Sandbox to Stage</h3>
            <p>
              Pageturners works hand-in-hand with <a href="/programmes/kaywanas-court">Kaywana's Court</a>. 
              Stories and scripts developed in the sandbox can be performed, staged, and celebrated 
              with the community.
            </p>
            <p className={styles.journeyText}>
              <strong>The Creative Pipeline:</strong> Write in the Sandbox (7 tools available!) → 
              Attend Workshops → Refine with feedback → Perform at Kaywana's Court → 
              Publish in Joystick → Broadcast on Raydyo → Earn 55% revenue → Build your portfolio
            </p>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className={styles.involvedSection}>
          <h2 className={styles.sectionTitle}>Get Involved</h2>
          
          <div className={styles.pathwayGrid}>
            <div className={styles.pathwayCard}>
              <h3>🌱 First-Time Writers</h3>
              <p>
                Never written before? Start with Story Starter to explore 5 Caribbean literary genres, 
                or try Creative Writing Studio for guided exercises. All tools are beginner-friendly!
              </p>
              <a href="/programmes/pageturners/sandbox" className={styles.pathwayLink}>Try the Sandbox →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>✍️ Regular Writers</h3>
              <p>
                Keep developing your craft with ongoing workshops, writing groups, and 
                project-based sessions. Use all 7 sandbox tools for quick experiments and drafts.
              </p>
              <a href="/workshop-calendar" className={styles.pathwayLink}>View Workshops →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>🎓 Mentors & Facilitators</h3>
              <p>
                Experienced writers—share your skills by mentoring others, facilitating 
                workshop sessions, and providing feedback on sandbox creations.
              </p>
              <a href="/volunteers" className={styles.pathwayLink}>Become a Mentor →</a>
            </div>

            <div className={styles.pathwayCard}>
              <h3>📖 Publishing Support</h3>
              <p>
                Editors, designers, and publishing professionals—help writers get their 
                work from sandbox experiments into Joystick e-zine and community anthologies.
              </p>
              <a href="/contact" className={styles.pathwayLink}>Offer Your Skills →</a>
            </div>
          </div>
        </section>

        {/* Community Library */}
        <section className={styles.librarySection}>
          <h2 className={styles.sectionTitle}>Community Writing Library</h2>
          <p>
            Read works by Pageturners writers, from published anthologies to featured pieces created 
            in the sandbox. Every story strengthens our shared creative legacy. See what's possible 
            with our 7 professional writing tools!
          </p>
          <div className={styles.libraryCta}>
            <a href="/gallery" className={styles.ctaButton}>Explore the Library</a>
          </div>
        </section>

        {/* Workshop Schedule */}
        <section className={styles.scheduleSection}>
          <h2 className={styles.sectionTitle}>Upcoming Workshops</h2>
          <p>
            Check the workshop calendar for Pageturners sessions, from taster workshops to 
            intensive writing retreats and sandbox support sessions where we help you master 
            all 7 writing tools and turn experiments into finished pieces.
          </p>
          <div className={styles.scheduleCta}>
            <a href="/workshop-calendar" className={styles.ctaButton}>View Full Schedule</a>
            <a href="/calendar" className={styles.ctaButtonSecondary}>Community Calendar</a>
          </div>
        </section>

        {/* Mission Statement */}
        <section className={styles.missionSection}>
          <h2 className={styles.sectionTitle}>Why Writing Matters</h2>
          <p>
            Writing is an act of community building. When we write our stories—personal, 
            cultural, imaginative—we strengthen Wembley's creative wealth. Every writer 
            who develops their craft here adds to our collective voice.
          </p>
          <p>
            Whether you start with Story Starter in the sandbox, explore all 7 writing tools, 
            join a workshop, or work on a major project—Pageturners exists because your story 
            matters. The world needs to hear it.
          </p>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Connect With Us</h2>
          <p>Questions about workshops, the sandbox, our 7 writing tools, projects, or getting started?</p>
          <div className={styles.contactOptions}>
            <a href="/programmes/pageturners/sandbox" className={styles.contactButton}>
              Try the Sandbox
            </a>
            <a href="/contact" className={styles.contactButton}>Get in Touch</a>
            <a href="/maya" className={styles.contactButton}>Chat with Maya</a>
            <p className={styles.phoneNumber}>Call: 0208 902 9991</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default PageturnersPage;