import React from 'react';
import { Link } from 'react-router-dom';
import './YourJourneyPage.css';

const YourJourneyPage: React.FC = () => {
  return (
    <div className="yourJourneyPage">
      {/* Hero Section */}
      <section className="journeyHero">
        <div className="heroContent">
          <h1 className="heroTitle">Your Journey Through The Space Between</h1>
          <p className="heroSubtitle">
            This isn't a programme with steps to complete. It's how community actually happens. 
            Here's how it works.
          </p>
          <div className="mayaIntro">
            <div className="mayaAvatar">🤖</div>
            <p><strong>Maya guides you through every stage.</strong> You're never alone.</p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="journeyContainer">
        
        {/* The Flywheel Visual */}
        <section className="flywheelSection">
          <h2 className="sectionTitle">The Flywheel: How It All Works</h2>
          <p className="sectionIntro">
            Each stage flows into the next. Your work becomes content. Your content inspires others. 
            The cycle continues.
          </p>
          
          <div className="flywheelDiagram">
            <div className="flywheelCenter">
              <div className="mayaCenterIcon">🤖</div>
              <p>Maya<br/>Coordinates<br/>Everything</p>
            </div>
            
            <div className="flywheelStages">
              <div className="stage stage1">
                <div className="stageNumber">1</div>
                <h3>Connect</h3>
              </div>
              <div className="stageArrow">→</div>
              
              <div className="stage stage2">
                <div className="stageNumber">2</div>
                <h3>Create</h3>
              </div>
              <div className="stageArrow">→</div>
              
              <div className="stage stage3">
                <div className="stageNumber">3</div>
                <h3>Cultivate</h3>
              </div>
              <div className="stageArrow">→</div>
              
              <div className="stage stage4">
                <div className="stageNumber">4</div>
                <h3>Commit</h3>
              </div>
              <div className="stageArrow">→</div>
              
              <div className="stage stage5">
                <div className="stageNumber">5</div>
                <h3>Contribute/<br/>Celebrate</h3>
              </div>
              <div className="stageCycle">↺</div>
            </div>
          </div>
        </section>

        {/* Stage 1: Connect */}
        <section className="journeyStage connectStage">
          <div className="stageHeader">
            <span className="stageIcon">☕</span>
            <div>
              <h2>1. Connect</h2>
              <p className="stageTagline">"So where you from?"</p>
            </div>
          </div>

          <div className="stageContent">
            <div className="stageDescription">
              <h3>The First Conversation</h3>
              <p>
                Kitchen table. Cup of tea. Meeting people who get it. No forms, no assessments, 
                just showing up and being seen.
              </p>
              
              <h4>What Happens:</h4>
              <ul>
                <li><strong>Auntie Anansi's Spoonlickin Kitchen</strong> - First conversations over food</li>
                <li><strong>Maya meets you</strong> - Understands what you need</li>
                <li><strong>Find your people</strong> - Connect with others on similar journeys</li>
                <li><strong>No pressure</strong> - Just show up when you're ready</li>
              </ul>
            </div>

            <div className="stageExample">
              <div className="exampleCard">
                <h4>Real Story</h4>
                <p>
                  "First time I came, I didn't know anyone. Just wanted to check it out. 
                  Auntie made me tea, asked where I was from. By the end, Uncle Winston was 
                  showing me speaker boxes and I was hooked."
                </p>
                <span className="exampleAuthor">— Marcus, 17</span>
              </div>
            </div>
          </div>

          <div className="stageCta">
            <Link to="/get-started" className="stageButton">Start Your Journey</Link>
          </div>
        </section>

        {/* Stage 2: Create */}
        <section className="journeyStage createStage">
          <div className="stageHeader">
            <span className="stageIcon">🛠️</span>
            <div>
              <h2>2. Create</h2>
              <p className="stageTagline">"Something that didn't exist before"</p>
            </div>
          </div>

          <div className="stageContent">
            <div className="stageDescription">
              <h3>Make Things Together</h3>
              <p>
                Messy room. Sketches. Code. Sound. Learning by doing, with people who know 
                how to teach what they know.
              </p>
              
              <h4>Your Options:</h4>
              <ul>
                <li><strong>STEMgeneers</strong> - Build drones, RC cars, learn physics by making</li>
                <li><strong>Trubble n Bass</strong> - Sound system culture, speaker boxes, signal chains</li>
                <li><strong>TECHtreneurs</strong> - Build your business idea with real guidance</li>
                <li><strong>Silk Stilettos</strong> - Fashion, design, creating with purpose</li>
                <li><strong>Cyberstore</strong> - Digital marketplace skills, e-commerce basics</li>
              </ul>

              <div className="autoLogFeature">
                <span className="featureIcon">📝</span>
                <p><strong>Your Creator's Journal automatically logs everything you make.</strong> 
                No extra work - just do the work.</p>
              </div>
            </div>

            <div className="stageExample">
              <div className="exampleCard">
                <h4>Real Story</h4>
                <p>
                  "Uncle Winston taught me the signal chain. Turntable, mixer, amp, speaker. 
                  Simple physics, but I had to slow down and feel it. Now I understand why the 
                  tweeter goes on top. We documented the whole process."
                </p>
                <span className="exampleAuthor">— Marcus, Trubble n Bass</span>
              </div>
            </div>
          </div>

          <div className="stageCta">
            <Link to="/programmes" className="stageButton">Explore Programmes</Link>
          </div>
        </section>

        {/* Stage 3: Cultivate */}
        <section className="journeyStage cultivateStage">
          <div className="stageHeader">
            <span className="stageIcon">🌱</span>
            <div>
              <h2>3. Cultivate</h2>
              <p className="stageTagline">"We grew together"</p>
            </div>
          </div>

          <div className="stageContent">
            <div className="stageDescription">
              <h3>Deepen Your Skills</h3>
              <p>
                Patience. Check-ins. Practice. Building confidence in creative skills AND 
                navigating real-world systems.
              </p>
              
              <h4>Two Tracks of Growth:</h4>
              
              <div className="cultivateTracks">
                <div className="track creativeTrack">
                  <h5>Creative Skills</h5>
                  <ul>
                    <li><strong>Rayd-yo</strong> - Podcasting, oral histories, storytelling</li>
                    <li><strong>Joystick</strong> - Gaming community, digital culture</li>
                    <li><strong>PageTurners</strong> - Writing, publishing, expressing yourself</li>
                  </ul>
                </div>

                <div className="track citizenshipTrack">
                  <h5>Digital Citizenship</h5>
                  <ul>
                    <li><strong>Portal Simulators</strong> - Practice HMRC, banking, housing applications</li>
                    <li><strong>ROV Support</strong> - AI guides help you navigate systems safely</li>
                    <li><strong>Confidence Building</strong> - Try before you commit to the real thing</li>
                  </ul>
                </div>
              </div>

              <div className="rovIntro">
                <h5>Meet Your ROV Support Team:</h5>
                <div className="rovGrid">
                  <div className="rovCard">
                    <span className="rovIcon">🧭</span>
                    <strong>PathfinderROV</strong>
                    <p>Your navigator</p>
                  </div>
                  <div className="rovCard">
                    <span className="rovIcon">🤝</span>
                    <strong>HelperSupportROV</strong>
                    <p>Your encourager</p>
                  </div>
                  <div className="rovCard">
                    <span className="rovIcon">💼</span>
                    <strong>BusinessROV</strong>
                    <p>Your enterprise guide</p>
                  </div>
                  <div className="rovCard">
                    <span className="rovIcon">🧠</span>
                    <strong>InsightAnalysisROV</strong>
                    <p>Your understanding builder</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stageExample">
              <div className="exampleCard">
                <h4>Real Story</h4>
                <p>
                  "I was terrified of tax forms. Made £5k from a brand deal and had no idea 
                  what to do. Maya connected me with the HMRC simulator and BusinessROV. 
                  We practiced 5 times. Now I file my own taxes confidently."
                </p>
                <span className="exampleAuthor">— Jamal, 19, TECHtreneurs</span>
              </div>
            </div>
          </div>

          <div className="stageCta">
            <Link to="/simulators" className="stageButton">Explore Simulators</Link>
            <Link to="/meet-maya" className="stageButton secondary">Meet Maya & ROVs</Link>
          </div>
        </section>

        {/* Stage 4: Commit */}
        <section className="journeyStage commitStage">
          <div className="stageHeader">
            <span className="stageIcon">🎯</span>
            <div>
              <h2>4. Commit</h2>
              <p className="stageTagline">"We gave it our all"</p>
            </div>
          </div>

          <div className="stageContent">
            <div className="stageDescription">
              <h3>Go Deep</h3>
              <p>
                Showcase night. Nerves. Pride. The moment where you put it all together and 
                show what you've made.
              </p>
              
              <h4>What This Looks Like:</h4>
              <ul>
                <li><strong>Kaywana's Court</strong> - Present your oral history podcast, published writing</li>
                <li><strong>Showcase Nights</strong> - Demonstrate what you've built, explain what you've learned</li>
                <li><strong>Real-World Applications</strong> - Use your practiced skills on actual systems</li>
                <li><strong>Deep Work Sessions</strong> - Focused time to complete your projects</li>
              </ul>

              <div className="commitSupport">
                <p>
                  <strong>You're not alone in this.</strong> Maya monitors your readiness. 
                  ROVs assess your confidence. Command Centre ensures you have what you need.
                </p>
              </div>
            </div>

            <div className="stageExample">
              <div className="exampleCard">
                <h4>Real Story</h4>
                <p>
                  "Showcase night for Kaywana's Court. My hands were shaking. But I'd practiced 
                  the story 20 times. Auntie Clara was there. When I finished, everyone clapped. 
                  That's when I knew: I can do this."
                </p>
                <span className="exampleAuthor">— Aaliyah, 19, Kaywana's Court</span>
              </div>
            </div>
          </div>

          <div className="stageCta">
            <Link to="/programmes/kaywanas-court" className="stageButton">Learn About Kaywana's Court</Link>
          </div>
        </section>

        {/* Stage 5: Contribute/Celebrate */}
        <section className="journeyStage contributeStage">
          <div className="stageHeader">
            <span className="stageIcon">🎉</span>
            <div>
              <h2>5. Contribute/Celebrate</h2>
              <p className="stageTagline">"We told the story"</p>
            </div>
          </div>

          <div className="stageContent">
            <div className="stageDescription">
              <h3>Share What You've Learned</h3>
              <p>
                Applause. Hugs. Shared food. Looking back at what we built together. And then - 
                your story becomes the thing that inspires the next person.
              </p>
              
              <h4>The Automation Magic:</h4>
              <div className="automationFlow">
                <div className="flowStep">
                  <span className="flowIcon">✅</span>
                  <div>
                    <strong>You Succeed</strong>
                    <p>Complete a project, master a skill, achieve a milestone</p>
                  </div>
                </div>
                <div className="flowArrow">↓</div>
                
                <div className="flowStep">
                  <span className="flowIcon">🤖</span>
                  <div>
                    <strong>ROV Journalists Notified</strong>
                    <p>System automatically flags your success story</p>
                  </div>
                </div>
                <div className="flowArrow">↓</div>
                
                <div className="flowStep">
                  <span className="flowIcon">📝</span>
                  <div>
                    <strong>Story Published on Joystick</strong>
                    <p>Your journey becomes an article in our digital magazine</p>
                  </div>
                </div>
                <div className="flowArrow">↓</div>
                
                <div className="flowStep">
                  <span className="flowIcon">🎙️</span>
                  <div>
                    <strong>Featured on Rayd-yo</strong>
                    <p>Your voice preserved in our podcast archive</p>
                  </div>
                </div>
                <div className="flowArrow">↓</div>
                
                <div className="flowStep">
                  <span className="flowIcon">♻️</span>
                  <div>
                    <strong>Next Person Discovers</strong>
                    <p>Someone reads your story, gets inspired, joins</p>
                  </div>
                </div>
                <div className="flowArrow cycle">↻</div>
              </div>

              <div className="eachOneTeachOne">
                <h4>Each One Teach One</h4>
                <p>
                  Marcus learned from Uncle Winston. Marcus documented it. Next crew learns from 
                  Marcus's documentation. <strong>That's how culture survives.</strong>
                </p>
              </div>
            </div>

            <div className="stageExample">
              <div className="exampleCard">
                <h4>Real Story</h4>
                <p>
                  "After I finished the tax simulator story, they published it on Joystick. 
                  Then interviewed me for Rayd-yo. Now other creators message me asking for help. 
                  I'm teaching what I was scared of 6 months ago."
                </p>
                <span className="exampleAuthor">— Jamal, Now a Peer Mentor</span>
              </div>
            </div>
          </div>

          <div className="stageCta">
            <Link to="/joystick" className="stageButton">Read Joystick Stories</Link>
            <Link to="/raydyo" className="stageButton secondary">Listen to Rayd-yo</Link>
          </div>
        </section>

        {/* Connoisseurs Club */}
        <section className="connoisseurSection">
          <h2>The Connoisseurs Club</h2>
          <p className="sectionIntro">
            When you've completed the journey, you don't leave - you become the teacher. 
            The Connoisseurs Club is where experienced members guide newcomers, preserve knowledge, 
            and ensure the cycle continues.
          </p>
          
          <div className="connoisseurFeatures">
            <div className="featureCard">
              <span className="featureIcon">👥</span>
              <h3>Mentor Others</h3>
              <p>Guide the next generation through their journey</p>
            </div>
            <div className="featureCard">
              <span className="featureIcon">📚</span>
              <h3>Preserve Knowledge</h3>
              <p>Help document and archive community wisdom</p>
            </div>
            <div className="featureCard">
              <span className="featureIcon">🌟</span>
              <h3>Shape the Future</h3>
              <p>Help evolve programmes based on what you've learned</p>
            </div>
          </div>
        </section>

        {/* Your Personal Dashboard */}
        <section className="dashboardPreview">
          <h2>Your Personal Dashboard Tracks It All</h2>
          <p className="sectionIntro">
            When you join, you get a dashboard that shows your progress through all 5 Cs, 
            your skills development, your published work, and your impact on others.
          </p>

          <div className="dashboardMockup">
            <div className="mockupHeader">
              <h3>Welcome back, [Your Name]!</h3>
            </div>
            
            <div className="mockupContent">
              <div className="progressSection">
                <h4>My 5C Journey</h4>
                <div className="progressBar">
                  <div className="progressFill" style={{width: '60%'}}></div>
                </div>
                <ul className="journeyProgress">
                  <li className="complete">✓ Connect</li>
                  <li className="complete">✓ Create</li>
                  <li className="active">→ Cultivate (60% complete)</li>
                  <li>Commit</li>
                  <li>Contribute/Celebrate</li>
                </ul>
              </div>

              <div className="skillsSection">
                <h4>My Skills</h4>
                <div className="skillItem">
                  <span>HMRC Navigation</span>
                  <div className="skillBar">
                    <div className="skillFill" style={{width: '80%'}}></div>
                  </div>
                  <span className="skillLevel">80% confident - Ready soon!</span>
                </div>
                <div className="skillItem">
                  <span>Speaker Box Building</span>
                  <div className="skillBar">
                    <div className="skillFill" style={{width: '45%'}}></div>
                  </div>
                  <span className="skillLevel">45% - In progress</span>
                </div>
              </div>

              <div className="impactSection">
                <h4>My Impact</h4>
                <ul>
                  <li>📝 2 stories published on Joystick</li>
                  <li>🎙️ Featured in 1 Rayd-yo episode</li>
                  <li>👥 Helped 12 new users join</li>
                  <li>📊 Journal entries referenced 3 times</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="finalCta">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Come for the tea. Stay for the stories. Leave with something you made together - 
            and a story that helps the next person.
          </p>
          <div className="ctaButtons">
            <Link to="/get-started" className="ctaButton primary large">
              Start Your Journey Today
            </Link>
            <Link to="/meet-maya" className="ctaButton secondary large">
              Meet Maya First
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YourJourneyPage;
