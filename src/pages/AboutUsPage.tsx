import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import styles from './AboutUsPage.module.css';

// ============================================================
// AboutUsPage.tsx — rebuilt March 2026, updated March 2026
// ============================================================
// One job: answer three questions Ria Hebden asks in 30 seconds.
//
// 1. Who are these people?
//    → Claude and Judith Fontanelle. Seventeen years on the High Road.
//      Self-financed. No extraction.
//
// 2. Do they understand what I understand?
//    → The fracture between individual survival and cultural wholeness.
//      The pipeline problem. Why Jimmy goes to Brighton.
//      Yes. We understand it.
//
// 3. Is this worth my time?
//    → 13 programmes. A provenance market. A heritage archive.
//      Community radio. A membership society for women.
//      55% to creators. Infrastructure, not aspiration.
//      A published epistemological standard. A named methodology.
//      A manifesto that says exactly what we are building and why.
//
// Voice: second person throughout. Playfair Display for all display.
// No tabs. No blockchain. No Rosalind Franklin pitch deck.
// One editorial flow. The same room as the homepage.
// ============================================================

const AboutUsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedSection(prev => prev === id ? null : id);

  return (
    <PageTemplate
      pageTitle="About Wembley Wonders"
      pageStrapline="Who built this. Why it exists. Why it won't be extracted."
      pageType="standard"
    >
      <div className={styles.about}>

        {/* ── OPENING DECLARATION ── */}
        <section className={styles.declaration}>
          <div className={styles.declarationInner}>
            <p className={styles.declarationLead}>
              You already know the wound.
            </p>
            <p className={styles.declarationBody}>
              The person whose knowledge built something that got credited elsewhere.
              The woman whose expertise was real but whose confidence had been quietly
              eroded by twenty years of being overlooked. The man who spent four decades
              building community intelligence that nobody ever formally witnessed.
              The teenager in a town with no infrastructure for what they carry.
            </p>
            <p className={styles.declarationBody}>
              We built Wembley Wonders because we know that person.
              We've been that person. We've sat across from that person in a room on
              the High Road for seventeen years and watched the system miss them
              every single time.
            </p>
            <p className={styles.declarationEmphasis}>
              We stopped watching and built the infrastructure instead.
            </p>
            <div className={styles.declarationManifesto}>
              <Link to="/manifesto" className={styles.manifestoLink}>
                <span className={styles.manifestoMark}>◆</span>
                Read the Wembley Wonders Manifesto — what we are building and why
                <span className={styles.manifestoArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── RULE ── */}
        <div className={styles.rule} />

        {/* ── WHO WE ARE ── */}
        <section className={styles.founders}>
          <div className={styles.sectionLabel}>The people behind the platform</div>
          <h2 className={styles.sectionTitle}>
            Two people.<br />
            <em>Seventeen years on the High Road.</em>
          </h2>

          <div className={styles.foundersGrid}>

            {/* Judith */}
            <div className={styles.founderCard}>
              <div className={styles.founderPhoto}>
                <img
                  src="/images/judith-v4.png"
                  alt="Judith Fontanelle"
                  className={styles.founderImg}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.parentElement?.querySelector(
                      `.${styles.founderInitial}`
                    ) as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className={styles.founderInitial} style={{ display: 'none' }}>J</div>
              </div>
              <div className={styles.founderContent}>
                <div className={styles.founderMeta}>
                  <span className={styles.founderName}>Judith Fontanelle</span>
                  <span className={styles.founderRole}>Director of Community Engagement</span>
                  <span className={styles.founderHandle}>@BryceOfWembley</span>
                </div>
                <p className={styles.founderVoice}>
                  I'm the woman your friend told you to call. When you don't know
                  where to start — when the system has made you feel like what you
                  carry isn't valuable, when you need someone in your corner who
                  actually understands the specific texture of that experience —
                  that's me.
                </p>
                <p className={styles.founderVoice}>
                  The Passionistas Fan Club is the community I wish had existed
                  when I needed it. It exists now. I convene it. Walk in.
                </p>
                <div className={styles.founderActions}>
                  <a
                    href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Wembley%20Wonders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                  >
                    💬 WhatsApp Judith directly
                  </a>
                  <Link to="/passionistas" className={styles.founderLink}>
                    The Passionistas →
                  </Link>
                </div>
              </div>
            </div>

            {/* Claude */}
            <div className={styles.founderCard}>
              <div className={styles.founderPhoto}>
                <img
                  src="/images/claude-fontanelle.jpg"
                  alt="Claude Fontanelle"
                  className={styles.founderImg}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    const placeholder = e.currentTarget.parentElement?.querySelector(
                      `.${styles.founderInitial}`
                    ) as HTMLElement;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div className={styles.founderInitial} style={{ display: 'none' }}>C</div>
              </div>
              <div className={styles.founderContent}>
                <div className={styles.founderMeta}>
                  <span className={styles.founderName}>Claude Fontanelle</span>
                  <span className={styles.founderRole}>Technical Director & Co-founder</span>
                  <span className={styles.founderHandle}>Wembley Wonders CIC</span>
                </div>
                <p className={styles.founderVoice}>
                  I'm a self-taught developer, a former ICT lecturer, a trade union
                  educator, a sub-editor, a community activist. I've spent forty years
                  watching people underestimate what they carry — and watching the
                  systems around them extract that value without acknowledgement
                  or payment.
                </p>
                <p className={styles.founderVoice}>
                  The platform is the infrastructure I built so that witnessing
                  becomes income. The Connoisseurs Club is the framework I built
                  for men who've never had their knowledge formally witnessed.
                  Both took seventeen years to build properly.
                </p>
                <div className={styles.founderActions}>
                  <Link to="/connoisseurs-club" className={styles.founderLink}>
                    The Connoisseurs Club →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className={styles.rule} />

        {/* ── THE WOUND ── */}
        <section className={styles.wound}>
          <div className={styles.sectionLabel}>The problem we're solving</div>
          <h2 className={styles.sectionTitle}>
            The fracture is not new.<br />
            <em>The infrastructure to heal it is.</em>
          </h2>

          <div className={styles.woundGrid}>
            <div className={styles.woundText}>
              <p>
                In every iteration of immigration — in every community that has arrived
                somewhere new and had to negotiate survival — there is a central tension
                between individual advancement and cultural continuity. The system forces
                a binary choice: assimilate and survive, or remain whole and be marginalised.
              </p>
              <p>
                That binary is a lie. But it's a lie that has been enforced so consistently,
                across so many generations, that the communities who experienced it began
                to enforce it themselves. Parents who sacrificed their culture to give
                their children opportunities. Children who inherited the sacrifice
                without the context.
              </p>
              <p>
                The result is Jimmy. A man in Dunstable with forty years of accumulated
                knowledge — cultural, technical, communal — who experiences despair because
                there is no infrastructure in his town that recognises him whole.
                Who only finds communal joy by moving to Brighton, where a different
                community built infrastructure for a different kind of person who also
                didn't fit the default.
              </p>
              <p className={styles.woundEmphasis}>
                Jimmy doesn't need Brighton. He needs Wembley Wonders.
              </p>
            </div>
            <div className={styles.woundPull}>
              <blockquote className={styles.pullQuote}>
                "Family Knowledge = Family Investment."
              </blockquote>
              <p className={styles.pullContext}>
                This is not a tagline. It is the economic argument against identity loss.
                Your culture is not a liability in the marketplace.
                It is the asset. The thing that makes you irreplaceable.
                The thing that compounds rather than depreciates.
                The thing your children inherit as wealth rather than as burden.
              </p>
            </div>
          </div>
        </section>

        <div className={styles.rule} />

        {/* ── THE PLATFORM ── */}
        <section className={styles.platform}>
          <div className={styles.sectionLabel}>What we built</div>
          <h2 className={styles.sectionTitle}>
            Thirteen programmes.<br />
            <em>One community knowledge ecosystem.</em>
          </h2>

          <p className={styles.platformIntro}>
            The platform exists to turn the knowledge people carry into documented,
            attributed, income-generating assets — without extracting the value from
            the people who created it. Every element of the architecture serves that
            single purpose.
          </p>

          <div className={styles.platformGrid}>

            {[
              {
                id: 'programmes',
                icon: '🎓',
                title: 'Thirteen Programmes',
                summary: 'Five sections. Connect → Cultivate → Create → Compete → Change. Each programme a different lens on what you already carry.',
                detail: 'From Bright Sparks — the curiosity threshold for people who haven\'t decided yet — to Roots, the body sovereignty programme led by Judith Fontanelle, Flora Agba and Natalie. From TECHreneurs, where you build a product around what you already know, to Kaywana\'s Court, where argument becomes art. Every programme produces documented, attributed output.',
                link: '/programmes',
                cta: 'See all programmes →',
                colour: '#1D9E75',
              },
              {
                id: 'model',
                icon: '💷',
                title: 'The 55/25/20 Model',
                summary: '55% to the creator. 25% builds the next wonder. 20% protects the infrastructure. 0% extracted.',
                detail: 'This is not a revenue split. It is anti-extraction architecture. Every creator keeps the majority of what they produce. The community fund builds capability for the next person. The platform costs are kept lean deliberately so the creator share stays high. No algorithm can change it. No platform update can reduce it. The editorial framework is what makes the 55% credible — not a promise but a specification.',
                link: '/how-it-works',
                cta: 'How it works →',
                colour: '#d4a853',
              },
              {
                id: 'standard',
                icon: '◆',
                title: 'The Editorial Standard',
                summary: 'A published, transparent, six-question framework applied to every piece of knowledge that enters the archive. The same standard for everyone.',
                detail: 'The Knowledge Commons Epistemological Framework names six concepts derived from six observed cases of epistemological failure. Every submission passes six questions: Is the methodology sound? Can you name a source? Does the claim stand without credentials? Is it falsifiable? Are key terms defined? What is the first premise and is it supported? This standard is public. Anyone can read it, challenge it, and build on it. That transparency is the credibility.',
                link: '/editorial-standard',
                cta: 'Read the standard →',
                colour: '#D4A853',
              },
              {
                id: 'cyberstore',
                icon: '🛍️',
                title: 'The Cyberstore',
                summary: 'A provenance market. Not a shop. Every item carries its maker\'s story, cultural lineage, and programme provenance.',
                detail: 'Eleven departments. Food & Heritage. Textiles & Fashion. Music & Audio. Written Works. Digital & Tech. Visual Art & Print. Educational Resources. Performance & Drama. Wellness & Body Sovereignty. Craft & Making. Knowledge Commons Archive. Every product documented from its origin to its sale.',
                link: '/shop',
                cta: 'Enter the market →',
                colour: '#a855f7',
              },
              {
                id: 'commons',
                icon: '🗃️',
                title: 'The Knowledge Commons',
                summary: 'A publicly accessible counter-archive of Black British history. Free. No login required. Assembled, not generated.',
                detail: 'Pioneer profiles, deep-dive threads, oral history contributions, the institutional map of post-colonial London. The history that didn\'t make the curriculum. Arthur Wharton. Claudia Jones. Samuel Coleridge-Taylor. William Cuffay. Ira Aldridge. The ground under Wembley Stadium and what it remembers. Every entry validated against the published editorial standard.',
                link: '/knowledge-commons',
                cta: 'Enter the archive →',
                colour: '#d4a853',
              },
              {
                id: 'membership',
                icon: '👥',
                title: 'Two Recognition Societies',
                summary: 'The Connoisseurs Club for men. The Passionistas Fan Club for women. Both built on the belief that being seen is not a luxury — it is the point.',
                detail: 'The Connoisseurs Club: five stages from Seedling to Elder, for men who\'ve built expertise in silence and never had that knowledge formally witnessed. The Passionistas Fan Club: a recognition society for women who are done being quietly extraordinary. Not a support group. Not a networking event. Properly, loudly, without apology.',
                link: '/join',
                cta: 'Find your door →',
                colour: '#cc0000',
              },
              {
                id: 'outputs',
                icon: '📻',
                title: 'Three Community Outputs',
                summary: 'Rayd-yo. Joystick. The Knowledge Commons. Broadcast, written, archived. One knowledge ecosystem.',
                detail: 'Everything created through Wembley Wonders has a home. Rayd-yo for broadcast — your show, your audience, your archive. Joystick for written work — your words, documented, attributed, permanently yours. The Knowledge Commons for the archive — the knowledge that was never written down, written down here. A creator who moves through all three leaves a provenance trail that no platform can strip-mine.',
                link: '/heritage',
                cta: 'See the ecosystem →',
                colour: '#06b6d4',
              },
            ].map(item => (
              <div
                key={item.id}
                className={`${styles.platformCard} ${expandedSection === item.id ? styles.platformCardOpen : ''}`}
                style={{ '--item-colour': item.colour } as React.CSSProperties}
              >
                <button
                  className={styles.platformCardHeader}
                  onClick={() => toggle(item.id)}
                >
                  <span className={styles.platformIcon}>{item.icon}</span>
                  <div className={styles.platformCardMeta}>
                    <span className={styles.platformCardTitle}>{item.title}</span>
                    <span className={styles.platformCardSummary}>{item.summary}</span>
                  </div>
                  <span className={styles.platformChevron}>
                    {expandedSection === item.id ? '↑' : '↓'}
                  </span>
                </button>
                {expandedSection === item.id && (
                  <div className={styles.platformCardBody}>
                    <p>{item.detail}</p>
                    <Link
                      to={item.link}
                      className={styles.platformCardLink}
                      style={{ color: item.colour }}
                    >
                      {item.cta}
                    </Link>
                  </div>
                )}
              </div>
            ))}

          </div>
        </section>

        <div className={styles.rule} />

        {/* ── THE GOVERNANCE ── */}
        <section className={styles.governance}>
          <div className={styles.sectionLabel}>Why you can trust it</div>
          <h2 className={styles.sectionTitle}>
            Self-financed.<br />
            <em>No grants. No obligations. No extraction.</em>
          </h2>

          <div className={styles.governanceGrid}>
            <div className={styles.governanceText}>
              <p>
                Wembley Wonders CIC was incorporated on 19 October 2020.
                Company No. 12960817. It has been self-financed since day one —
                no grants, no external funding, no obligations to funders whose
                priorities might not align with the community's.
              </p>
              <p>
                The CIC structure means we are legally required to serve the
                community interest. Our assets are locked — directors cannot
                extract profits. If the company were ever dissolved, assets
                would transfer to similar community interest companies.
                This is not policy. It is law.
              </p>
              <p>
                We are not building this to sell it. We are not building this
                to extract from it. We built it because the infrastructure
                didn't exist and someone had to build it.
              </p>
            </div>
            <div className={styles.governanceFacts}>
              {[
                ['Company No.', '12960817'],
                ['Incorporated', '19 October 2020'],
                ['Structure', 'Community Interest Company'],
                ['Registered', 'England and Wales'],
                ['Address', '452 High Road, Wembley HA9 7AY'],
                ['Safeguarding', 'All volunteers DBS-checked'],
              ].map(([key, val]) => (
                <div key={key} className={styles.governanceFact}>
                  <span className={styles.governanceKey}>{key}</span>
                  <span className={styles.governanceVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.rule} />

        {/* ── THE INVITATION ── */}
        <section className={styles.invitation}>
          <h2 className={styles.invitationTitle}>
            If you know the wound —
          </h2>
          <p className={styles.invitationBody}>
            if you've spent your career building pipelines for people the system
            overlooks, if you understand that the talent was always there and
            the infrastructure was always the problem — then you already understand
            what Wembley Wonders is for.
          </p>
          <p className={styles.invitationBody}>
            We're not looking for validation. We're looking for people who want
            to work on the same problem from different ends of the pipeline.
            Judith's door is open. Walk in.
          </p>
          <div className={styles.invitationManifesto}>
            <Link to="/manifesto" className={styles.invitationManifestoLink}>
              <span className={styles.manifestoMark}>◆</span>
              Read the full manifesto — the room we are building
              <span className={styles.manifestoArrow}>→</span>
            </Link>
          </div>
          <div className={styles.invitationActions}>
            <a
              href="https://wa.me/447932198468?text=Hello%20Judith%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Wembley%20Wonders"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.invitationWhatsapp}
            >
              💬 WhatsApp Judith directly
            </a>
            <a
              href="mailto:hello@wembleywonders.org"
              className={styles.invitationEmail}
            >
              hello@wembleywonders.org
            </a>
            <Link to="/join" className={styles.invitationJoin}>
              Or join free →
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default AboutUsPage;
