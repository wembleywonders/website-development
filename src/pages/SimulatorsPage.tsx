import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SimulatorsPage.css';

const SimulatorsPage: React.FC = () => {
  const [selectedSimulator, setSelectedSimulator] = useState<string | null>(null);

  return (
    <div className="simulatorsPage">
      {/* Hero Section */}
      <section className="simulatorsHero">
        <div className="heroContent">
          <h1 className="heroTitle">Practice Life Skills Safely</h1>
          <p className="heroSubtitle">
            Try Before You Commit: Master digital systems in safe environments where mistakes don't matter
          </p>
          <div className="heroHighlight">
            <span className="highlightIcon">💡</span>
            <p>
              <strong>It's no use making 000s on TikTok if you don't know how to navigate HMRC or basic banking.</strong>
              <br />We bridge that gap.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <div className="simulatorsContainer">
        <section className="problemSection">
          <h2 className="sectionTitle">The Digital Divide Nobody Talks About</h2>
          <p className="sectionIntro">
            Governments and organizations digitize everything to save costs. But what about people 
            without the confidence to navigate these systems?
          </p>

          <div className="problemGrid">
            <div className="problemCard">
              <span className="problemIcon">😰</span>
              <h3>The Fear Barrier</h3>
              <ul>
                <li>"What if I click the wrong thing?"</li>
                <li>"What if I mess up my tax return?"</li>
                <li>"What if I submit it wrong and get in trouble?"</li>
              </ul>
              <p className="problemResult">Result: <strong>Paralysis. Avoidance. Exclusion.</strong></p>
            </div>

            <div className="problemCard">
              <span className="problemIcon">🚧</span>
              <h3>The Compound Effect</h3>
              <ul>
                <li>Can't navigate housing portal → Miss deadline → Stay in crisis</li>
                <li>Don't understand banking app → Use expensive check-cashing → Lose £500/year</li>
                <li>Can't claim benefits online → Don't get entitled support → Lose £2000/year</li>
              </ul>
              <p className="problemResult">Result: <strong>Each gap compounds the others.</strong></p>
            </div>

            <div className="problemCard">
              <span className="problemIcon">💔</span>
              <h3>Digital ≠ Literate</h3>
              <ul>
                <li>100k TikTok followers but can't file self-assessment</li>
                <li>Excellent gamer but terrified of GP appointment apps</li>
                <li>Social media expert but can't navigate council services</li>
              </ul>
              <p className="problemResult">Result: <strong>Digital creator ≠ Digital citizen.</strong></p>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="solutionSection">
          <h2 className="sectionTitle">Our Solution: Safe Practice Environments</h2>
          <p className="sectionIntro">
            Practice in simulators where mistakes don't matter. Build confidence before facing 
            the real thing. ROV support guides you through every step.
          </p>

          <div className="solutionFeatures">
            <div className="featureCard">
              <span className="featureIcon">✅</span>
              <h3>Try Without Consequences</h3>
              <p>Make mistakes. Learn from them. Try again. No real-world impact.</p>
            </div>
            <div className="featureCard">
              <span className="featureIcon">🤖</span>
              <h3>AI-Guided Support</h3>
              <p>Maya coordinates. ROVs guide. You're never alone in the learning process.</p>
            </div>
            <div className="featureCard">
              <span className="featureIcon">📊</span>
              <h3>Confidence Tracking</h3>
              <p>We track your progress until you're genuinely ready for the real thing.</p>
            </div>
            <div className="featureCard">
              <span className="featureIcon">🎯</span>
              <h3>Real-World Ready</h3>
              <p>When you're confident, we provide real resources and stay available for support.</p>
            </div>
          </div>
        </section>

        {/* Available Simulators */}
        <section className="simulatorsGrid">
          <h2 className="sectionTitle">Available Practice Environments</h2>
          <p className="sectionIntro">
            Each simulator teaches real navigation skills for systems you need to survive in modern Britain.
          </p>

          {/* HMRC Simulator */}
          <div className="simulatorCard hmrcSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">💷</span>
              <div>
                <h3>HMRC Tax Simulator</h3>
                <p className="simulatorTagline">Tax confidence without the fear</p>
              </div>
              <div className="difficultyBadge">Essential</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>Self-assessment registration process</li>
                  <li>Understanding tax codes and allowances</li>
                  <li>What counts as business expenses</li>
                  <li>Filing deadlines and payment plans</li>
                  <li>How to correct mistakes safely</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>Creators, freelancers, TECHtreneurs, anyone earning outside traditional employment</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">💼 BusinessROV</span>
                  <span className="rovBadge">🧭 PathfinderROV</span>
                </div>
              </div>

              <div className="realStory">
                <p className="storyText">
                  "I made £5k from a brand deal and had no idea about tax. BusinessROV walked me through 
                  the HMRC simulator 5 times. Now I file my own taxes confidently."
                </p>
                <span className="storyAuthor">— Jamal, 19, TECHtreneurs</span>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start HMRC Practice</Link>
              <button className="learnMore" onClick={() => setSelectedSimulator('hmrc')}>
                Learn More
              </button>
            </div>
          </div>

          {/* Banking Simulator */}
          <div className="simulatorCard bankingSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">🏦</span>
              <div>
                <h3>Banking & Money Management</h3>
                <p className="simulatorTagline">Master money management safely</p>
              </div>
              <div className="difficultyBadge">Fundamental</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>Opening and managing bank accounts</li>
                  <li>Understanding overdrafts and interest</li>
                  <li>Setting up standing orders and direct debits</li>
                  <li>Money transfers and payment systems</li>
                  <li>Spotting scams and fraud protection</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>Young people opening first accounts, anyone intimidated by banking apps, people recovering from financial crises</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">🤝 HelperSupportROV</span>
                  <span className="rovBadge">🧠 InsightAnalysisROV</span>
                </div>
              </div>

              <div className="realStory">
                <p className="storyText">
                  "I was using check-cashing places and losing money every week. The banking simulator 
                  showed me how easy it actually is. Now I've got a proper account and I'm saving."
                </p>
                <span className="storyAuthor">— Aisha, 16</span>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start Banking Practice</Link>
            </div>
          </div>

          {/* Housing Portal */}
          <div className="simulatorCard housingSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">🏠</span>
              <div>
                <h3>Housing Applications</h3>
                <p className="simulatorTagline">Practice applications before the real thing</p>
              </div>
              <div className="difficultyBadge">Critical</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>Council housing application process</li>
                  <li>Understanding priority banding</li>
                  <li>Required documentation and evidence</li>
                  <li>Bidding systems and choice-based letting</li>
                  <li>Appeals and escalation procedures</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>Families in housing crisis, young people leaving care, anyone navigating council housing systems</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">⚖️ JusticeComplianceROV</span>
                  <span className="rovBadge">🧭 PathfinderROV</span>
                  <span className="rovBadge">🚨 EmergencyResponseROV</span>
                </div>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start Housing Practice</Link>
            </div>
          </div>

          {/* DWP Benefits */}
          <div className="simulatorCard dwpSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">📋</span>
              <div>
                <h3>DWP Benefits Navigator</h3>
                <p className="simulatorTagline">Understand your entitlements</p>
              </div>
              <div className="difficultyBadge">Important</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>Universal Credit application process</li>
                  <li>Understanding benefit entitlements</li>
                  <li>Reporting changes correctly</li>
                  <li>Journal entries and evidence uploads</li>
                  <li>Handling sanctions and appeals</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>Anyone navigating the benefits system, people returning to work, families needing support</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">⚖️ JusticeComplianceROV</span>
                  <span className="rovBadge">🤝 HelperSupportROV</span>
                </div>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start Benefits Practice</Link>
            </div>
          </div>

          {/* NHS/GP */}
          <div className="simulatorCard nhsSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">🏥</span>
              <div>
                <h3>NHS & GP Services</h3>
                <p className="simulatorTagline">Navigate healthcare with confidence</p>
              </div>
              <div className="difficultyBadge">Essential</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>GP registration and NHS number</li>
                  <li>Booking appointments online</li>
                  <li>Understanding triage systems</li>
                  <li>Repeat prescription ordering</li>
                  <li>When to use 111 vs A&E vs GP</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>New to area, young people managing own healthcare, anyone confused by NHS apps</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">🧘 MindfulMentalHealthROV</span>
                  <span className="rovBadge">🧭 PathfinderROV</span>
                </div>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start NHS Practice</Link>
            </div>
          </div>

          {/* Job Applications */}
          <div className="simulatorCard jobsSimulator">
            <div className="simulatorHeader">
              <span className="simulatorIcon">💼</span>
              <div>
                <h3>Job Application Portals</h3>
                <p className="simulatorTagline">Practice on real platforms</p>
              </div>
              <div className="difficultyBadge">Career</div>
            </div>

            <div className="simulatorContent">
              <div className="whatYoullLearn">
                <h4>What You'll Master:</h4>
                <ul>
                  <li>Indeed and LinkedIn application systems</li>
                  <li>Understanding ATS (Applicant Tracking Systems)</li>
                  <li>CV optimization for digital systems</li>
                  <li>Cover letter best practices</li>
                  <li>Interview scheduling and follow-up</li>
                </ul>
              </div>

              <div className="forWhom">
                <h4>Perfect For:</h4>
                <p>Job seekers, career changers, anyone re-entering workforce</p>
              </div>

              <div className="rovSupport">
                <h4>ROV Support Available:</h4>
                <div className="rovList">
                  <span className="rovBadge">💼 BusinessROV</span>
                  <span className="rovBadge">🧠 InsightAnalysisROV</span>
                </div>
              </div>
            </div>

            <div className="simulatorCta">
              <Link to="/get-started" className="simulatorButton">Start Jobs Practice</Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="howItWorksSection">
          <h2 className="sectionTitle">How Simulator Practice Works</h2>
          
          <div className="processFlow">
            <div className="processStep">
              <div className="stepNumber">1</div>
              <div className="stepContent">
                <h3>Maya Assesses Your Need</h3>
                <p>"I need to sort out my taxes but I'm scared of forms"</p>
                <p className="stepAction">→ Maya identifies: HMRC simulator + BusinessROV support</p>
              </div>
            </div>

            <div className="processStep">
              <div className="stepNumber">2</div>
              <div className="stepContent">
                <h3>Practice in Safe Environment</h3>
                <p>Try the process multiple times. Make mistakes. Learn what each section means.</p>
                <p className="stepAction">→ ROV guides you: "Most people find this part tricky. Here's what it means..."</p>
              </div>
            </div>

            <div className="processStep">
              <div className="stepNumber">3</div>
              <div className="stepContent">
                <h3>Build Confidence Through Repetition</h3>
                <p>Practice until it feels natural. Command Centre tracks your progress.</p>
                <p className="stepAction">→ After 3-5 attempts: "You're getting this! Want to try once more?"</p>
              </div>
            </div>

            <div className="processStep">
              <div className="stepNumber">4</div>
              <div className="stepContent">
                <h3>Readiness Assessment</h3>
                <p>System determines when you're genuinely ready (not just 'completed').</p>
                <p className="stepAction">→ Maya: "You've mastered this. Ready for the real thing?"</p>
              </div>
            </div>

            <div className="processStep">
              <div className="stepNumber">5</div>
              <div className="stepContent">
                <h3>Real-World Application</h3>
                <p>We provide real links and resources. Maya stays available for support.</p>
                <p className="stepAction">→ "Done! That was way easier than I thought. Thanks Maya!"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Integration with Programmes */}
        <section className="integrationSection">
          <h2 className="sectionTitle">Integrated With Your Learning Journey</h2>
          <p className="sectionIntro">
            Simulators aren't separate from programmes - they're part of your CULTIVATE stage. 
            Creative skills AND life skills, growing together.
          </p>

          <div className="integrationGrid">
            <div className="integrationCard">
              <h3>In TECHtreneurs?</h3>
              <p>Maya proactively suggests: "You're building a business. Let's practice HMRC together."</p>
              <span className="integrationIcon">💼 → 💷</span>
            </div>

            <div className="integrationCard">
              <h3>In Housing Crisis?</h3>
              <p>Priority access to housing simulator. EmergencyResponseROV coordinates support.</p>
              <span className="integrationIcon">🚨 → 🏠</span>
            </div>

            <div className="integrationCard">
              <h3>Starting Your First Job?</h3>
              <p>Banking + tax simulators automatically suggested. Build financial confidence.</p>
              <span className="integrationIcon">💼 → 🏦 + 💷</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="finalCta">
          <h2>Ready to Build Your Digital Confidence?</h2>
          <p>
            Practice safely. Build confidence. Navigate systems that were designed to exclude you.
          </p>
          <div className="ctaButtons">
            <Link to="/get-started" className="ctaButton primary large">
              Start Practicing Today
            </Link>
            <Link to="/meet-maya" className="ctaButton secondary large">
              Meet Maya First
            </Link>
          </div>

          <div className="ctaFootnote">
            <p>
              <strong>All simulator practice is free.</strong> You focus on learning. 
              We handle the infrastructure.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SimulatorsPage;
