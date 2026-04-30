import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import './GovernancePage.css';

/**
 * GovernancePage.tsx
 * Wembley Wonders CIC
 *
 * Route: /governance
 * Also add: /pardner -> /governance, /stewards -> /governance
 *
 * The founding governance document made public.
 * Four mechanisms: The Reserve, The Pardner,
 * The Stewards Council, The Transparency Report.
 *
 * Tone: constitutional, not corporate.
 * Names who has power. Names the limits of that power.
 * Names how it can be challenged.
 */

// ---- Types ------------------------------------------------------------------

type Section = 'reserve' | 'pardner' | 'council' | 'transparency';

// ---- Reserve table data -----------------------------------------------------

const RESERVE_TABLE = [
  { reserve: 500,   pot: 75,    recipients: 0,  note: 'Payments paused' },
  { reserve: 900,   pot: 135,   recipients: 1,  note: 'Minimum activation' },
  { reserve: 1800,  pot: 270,   recipients: 3,  note: '' },
  { reserve: 5000,  pot: 750,   recipients: 8,  note: '' },
  { reserve: 10000, pot: 1500,  recipients: 17, note: '' },
];

// ---- Priority criteria ------------------------------------------------------

const PRIORITY_CRITERIA = [
  {
    rank: '1st',
    name: 'Quarters in need',
    description: 'How many consecutive quarters has this creator been below the earnings threshold? Someone in their third quarter of eligibility takes priority over someone in their first. You contributed longest, you waited longest, your turn comes first.',
    icon: '⏳',
  },
  {
    rank: '2nd',
    name: 'Activity score',
    description: 'Within eligible creators, those showing more activity get priority. The minimums (6 posts, 4 engagement actions per quarter) are the floor for eligibility. Activity above the floor moves you up the queue. The Pardner is an investment in creators who are actively building.',
    icon: '📊',
  },
  {
    rank: '3rd',
    name: 'ROCE trajectory',
    description: 'Is your Return on Creative Effort improving? A creator whose ROCE is rising -- even if total earnings are still below the threshold -- is a better investment than one whose ROCE is flat or falling. Rising trajectory signals the platform investment will compound.',
    icon: '📈',
  },
  {
    rank: '4th',
    name: 'Stewards Council discretion',
    description: 'When two creators have identical scores on the above criteria, the council makes the call. They know the community. They can factor in things the algorithm cannot see. This judgment is recorded in the quarterly transparency report -- it is not invisible.',
    icon: '🏛️',
  },
];

// ---- Stewards Council powers ------------------------------------------------

const COUNCIL_POWERS = [
  {
    power: 'Approve reserve allocations',
    detail: 'Any allocation above £200 from the community reserve requires council approval by simple majority. Below £200, the platform directors can act on standing instructions.',
    limit: 'Cannot override the 55/25/20 split. The split is infrastructure, not policy.',
  },
  {
    power: 'Trigger a Pardner review',
    detail: 'If eligibility criteria are not being applied consistently, any steward can trigger a formal review. The review is documented and published.',
    limit: 'Cannot change eligibility criteria without a community vote.',
  },
  {
    power: 'Publish the transparency report',
    detail: 'The council publishes the quarterly report within 14 days of quarter end. The report is public. It cannot be withheld.',
    limit: 'Individual creator financial details are not published. Queue positions are public. Names attached to queue positions are council-only.',
  },
];

// ---- Transparency report contents -------------------------------------------

const REPORT_CONTENTS = [
  { tier: 'Public', items: ['Total community reserve balance', 'Pardner sub-account balance', 'Number of creators in queue', 'Number of payments made this quarter', 'Estimated turn horizon at current velocity', 'Pardner velocity (quarter on quarter growth)', 'Total equipment and programme spend'] },
  { tier: 'Authenticated creators', items: ['Your position in the queue', 'Your activity score', 'Your ROCE trajectory', 'What would move you up the priority order', 'Your remaining Pardner quarters'] },
  { tier: 'Stewards Council only', items: ['Creator names attached to queue positions', 'Detailed individual assessments', 'Vote record for each quarterly payment', 'Any discretionary decisions and their reasoning'] },
];

// ---- Component --------------------------------------------------------------

const GovernancePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('reserve');

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'reserve', label: 'The Reserve',          icon: '◈' },
    { id: 'pardner', label: 'The Pardner',           icon: '🌱' },
    { id: 'council', label: 'Stewards Council',      icon: '🏛️' },
    { id: 'transparency', label: 'Transparency',     icon: '◆' },
  ];

  return (
    <PageTemplate
      pageTitle="Governance"
      pageStrapline="Who holds power. What limits it. How it can be challenged."
      pageType="standard"
    >
      <div className="gov-content">

        {/* Opening declaration */}
        <section className="gov-declaration">
          <p className="gov-declaration-lead">
            This platform does not ask you to trust the people who built it.
          </p>
          <p className="gov-declaration-body">
            It asks you to read the architecture and decide whether the architecture is trustworthy.
            Systems that require good people to work are fragile.
            Systems that work regardless of who is in the room are robust.
            This page describes the system.
          </p>
          <p className="gov-declaration-body">
            Four mechanisms govern how community money is collected, held, allocated, and accounted for.
            None of them require you to take anyone's word for anything.
            All of them are documented here.
          </p>
          <div className="gov-cic-note">
            <span className="gov-cic-mark">◆</span>
            <p>
              Wembley Wonders CIC. Company No. 12960817. Incorporated 19 October 2020.
              Community Interest Company -- directors cannot extract profits.
              Assets are locked by law, not by promise.
              If the company were dissolved, assets transfer to similar community interest organisations.
            </p>
          </div>
        </section>

        {/* Section nav */}
        <nav className="gov-nav">
          {sections.map(s => (
            <button
              key={s.id}
              className={'gov-nav-btn' + (activeSection === s.id ? ' active' : '')}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="gov-nav-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Section content */}
        <div className="gov-section-content">

          {/* ---- THE RESERVE ---- */}
          {activeSection === 'reserve' && (
            <div className="gov-section">
              <h2>The Community Reserve</h2>
              <p className="gov-section-intro">
                Every sale on the platform puts 25% into the community reserve.
                Not as charity. Not as optional. As architecture.
                The split is hardcoded at the point of transaction -- no director,
                no council vote, no platform update can change it.
              </p>

              <div className="gov-principle-card">
                <h3>The Sou-Sou principle at platform scale</h3>
                <p>
                  In the Caribbean Pardner tradition -- also known as the Sou-Sou,
                  the Susu, the Partner -- a group of people each put in a fixed amount
                  regularly. Each person takes the full pot in turn. Nobody profits.
                  Nobody extracts. The pot is the community's collective resource
                  deployed for individual need.
                </p>
                <p>
                  The 25% reserve operates on the same logic at platform scale.
                  Every creator who sells something is simultaneously building their
                  own income and the infrastructure that supports the next creator.
                  The creator who sells a track this month is funding the floor
                  payment for the creator who has not broken through yet.
                </p>
              </div>

              <h3>What the reserve funds</h3>
              <div className="gov-reserve-uses">
                <div className="gov-reserve-item">
                  <span className="gov-reserve-pct">15%</span>
                  <div>
                    <strong>The Cultivation Pardner</strong>
                    <p>Floor payments for creators below the earnings threshold. The primary use of the reserve. See The Pardner section for full detail.</p>
                  </div>
                </div>
                <div className="gov-reserve-item">
                  <span className="gov-reserve-pct">~60%</span>
                  <div>
                    <strong>Equipment and infrastructure</strong>
                    <p>The Makers Collective shared equipment. Industrial sewing machines, recording equipment, tools that individual creators cannot afford alone but the community can afford collectively.</p>
                  </div>
                </div>
                <div className="gov-reserve-item">
                  <span className="gov-reserve-pct">~25%</span>
                  <div>
                    <strong>Programme delivery</strong>
                    <p>Workshops, facilitation, session costs. The things that keep the 13 programmes running for the next cohort.</p>
                  </div>
                </div>
              </div>

              <div className="gov-threshold-box">
                <h3>The protected floor</h3>
                <p>A minimum reserve of <strong>£300</strong> is permanently protected for equipment and programme delivery. It is never available for Pardner allocation. Pardner payments activate only when the reserve reaches <strong>£900</strong> -- £300 protected floor plus enough to fund at least one full payment.</p>
              </div>

              <h3>Reserve growth table</h3>
              <p className="gov-table-note">
                The Pardner pot is 15% of the reserve at the point of quarterly assessment.
                How many creators can receive payment depends entirely on how much the
                platform has sold.
              </p>
              <div className="gov-table-wrapper">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Reserve balance</th>
                      <th>Pardner pot (15%)</th>
                      <th>Max recipients</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESERVE_TABLE.map(row => (
                      <tr key={row.reserve} className={row.recipients === 0 ? 'gov-table-row--paused' : ''}>
                        <td>£{row.reserve.toLocaleString()}</td>
                        <td>£{row.pot.toLocaleString()}</td>
                        <td className={row.recipients > 0 ? 'gov-td-recipients' : 'gov-td-paused'}>
                          {row.recipients === 0 ? '0' : row.recipients}
                        </td>
                        <td className="gov-td-note">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="gov-velocity-box">
                <h3>Platform health metrics</h3>
                <p>The reserve generates three metrics that no other platform publishes. These appear in the quarterly transparency report:</p>
                <div className="gov-metrics-grid">
                  <div className="gov-metric">
                    <span className="gov-metric-name">Pardner velocity</span>
                    <span className="gov-metric-desc">How fast is the sub-account growing quarter on quarter?</span>
                  </div>
                  <div className="gov-metric">
                    <span className="gov-metric-name">Queue depth</span>
                    <span className="gov-metric-desc">How many eligible creators are waiting?</span>
                  </div>
                  <div className="gov-metric">
                    <span className="gov-metric-name">Turn horizon</span>
                    <span className="gov-metric-desc">At current velocity, when does the next creator get paid?</span>
                  </div>
                </div>
                <p className="gov-velocity-note">
                  If the queue is long and the velocity is slow, something is wrong with
                  the commercial pipeline even if headline numbers look fine.
                  These three numbers tell you whether the platform is delivering
                  on its founding promise to the Forgotten 60%.
                </p>
              </div>
            </div>
          )}

          {/* ---- THE PARDNER ---- */}
          {activeSection === 'pardner' && (
            <div className="gov-section">
              <h2>The Cultivation Pardner</h2>
              <p className="gov-section-intro">
                A floor payment for creators who are building but have not yet broken
                through the earnings threshold. Named after the Caribbean Pardner
                tradition. Maximum three quarters. Not welfare -- community investment.
              </p>

              <div className="gov-principle-card">
                <h3>Why it is called a Pardner</h3>
                <p>
                  In the traditional Pardner, receiving the pot is your turn --
                  you contributed, you earned it, now it comes to you.
                  The creator who receives the Cultivation Pardner has been building
                  on the platform, contributing to the archive, generating the community
                  activity that makes the reserve grow.
                  The payment is a return on that contribution, not a handout.
                </p>
                <p>
                  The reason traditional pardner groups stayed disciplined was not
                  only social obligation. It was because you could see your turn coming.
                  The pot was visible. The queue was known. Your investment was
                  traceable to your return.
                  The Cultivation Pardner sub-account makes that psychology structural.
                </p>
              </div>

              <h3>Eligibility</h3>
              <div className="gov-eligibility-grid">
                <div className="gov-eligibility-item">
                  <span className="gov-elig-icon">💷</span>
                  <strong>Below £150/month average</strong>
                  <p>Quarterly earnings average must be below £150/month. Assessed at the start of each quarter against the previous quarter's earnings.</p>
                </div>
                <div className="gov-eligibility-item">
                  <span className="gov-elig-icon">📝</span>
                  <strong>Minimum 6 posts per quarter</strong>
                  <p>Active contribution to the platform. Posts across any programme count. This is the floor -- it establishes you are building, not dormant.</p>
                </div>
                <div className="gov-eligibility-item">
                  <span className="gov-elig-icon">🤝</span>
                  <strong>Minimum 4 engagement actions</strong>
                  <p>Commenting, sharing, responding to other creators' work. The Pardner supports people who are part of the community, not just present on it.</p>
                </div>
                <div className="gov-eligibility-item">
                  <span className="gov-elig-icon">⏱️</span>
                  <strong>Maximum 3 quarters total</strong>
                  <p>Not renewable indefinitely. Three quarters is your turn. The review conversation at the end is a plan, not a verdict.</p>
                </div>
              </div>

              <h3>How turns are determined</h3>
              <p className="gov-table-note">
                Turns are not random and not first-come-first-served.
                When the pot cannot fund all eligible creators simultaneously,
                this is the priority order:
              </p>
              <div className="gov-priority-list">
                {PRIORITY_CRITERIA.map(c => (
                  <div key={c.rank} className="gov-priority-item">
                    <div className="gov-priority-rank">{c.rank}</div>
                    <div className="gov-priority-content">
                      <span className="gov-priority-icon">{c.icon}</span>
                      <div>
                        <strong>{c.name}</strong>
                        <p>{c.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="gov-subaccount-box">
                <h3>The Pardner sub-account</h3>
                <p>
                  When the pot does not fund all eligible creators in a given quarter,
                  unspent funds accumulate in a dedicated Pardner sub-account.
                  They do not return to general reserve. They compound within the
                  Pardner allocation -- growing faster than the straight 15%
                  calculation because unspent balances add to next quarter's pot.
                </p>
                <p>
                  Creators in the queue can see the sub-account balance in the
                  transparency report. They can see their position. They can see
                  the turn horizon. They can see what the platform needs to sell
                  to move their turn closer.
                </p>
                <div className="gov-subaccount-example">
                  <p className="gov-example-label">Example</p>
                  <p>Quarter 1: pot £135, one payment made (£87.50), sub-account accumulates £47.50</p>
                  <p>Quarter 2: pot £150 + £47.50 rollover = £197.50, two payments possible (£175.00), sub-account accumulates £22.50</p>
                  <p>The sub-account accelerates the queue. Every sale on the platform moves it faster.</p>
                </div>
              </div>

              <div className="gov-review-box">
                <h3>The review conversation</h3>
                <p>
                  After three quarters, the creator meets with a member of the Stewards
                  Council. Not a performance review. Not a judgment.
                  A conversation about what changed, what did not, and what the
                  next chapter looks like.
                </p>
                <p>
                  The questions are:
                </p>
                <ul className="gov-review-questions">
                  <li>What has been made and documented in the past three quarters?</li>
                  <li>What has the platform done well in supporting this creator?</li>
                  <li>What has the platform not done that it should have?</li>
                  <li>What does the creator need that the platform does not currently provide?</li>
                  <li>What is the plan for the next quarter without the floor payment?</li>
                </ul>
                <p>
                  The review is documented. If it identifies a gap in platform
                  infrastructure, that gap goes to the Stewards Council as a
                  programme development proposal. The creator's situation becomes
                  evidence for improving the system, not just a case to close.
                </p>
              </div>
            </div>
          )}

          {/* ---- STEWARDS COUNCIL ---- */}
          {activeSection === 'council' && (
            <div className="gov-section">
              <h2>The Stewards Council</h2>
              <p className="gov-section-intro">
                The community reserve is not governed by the directors.
                The Stewards Council exists precisely to prevent that --
                not because the directors are untrustworthy but because
                architecture that depends on individual trustworthiness is fragile.
              </p>

              <div className="gov-principle-card">
                <h3>Why an elected council</h3>
                <p>
                  CJ and Judith Fontanelle built this platform and have invested
                  substantially from personal resources over four years.
                  That does not give them the right to govern community money.
                  The reserve exists because every creator who sold something
                  contributed 25% of their earnings to it.
                  The people who contributed should govern it.
                </p>
                <p>
                  The Stewards Council is designed before it is formed.
                  The architecture exists. The community fills it.
                  Below is the threshold for formation and the conditions
                  under which elections are held.
                </p>
              </div>

              <div className="gov-formation-box">
                <h3>Formation threshold</h3>
                <p>The Stewards Council forms when:</p>
                <ul className="gov-formation-list">
                  <li>The platform has at least 50 active creators (at least one sale or publication in the past 90 days)</li>
                  <li>The community reserve has reached £900 (the Pardner activation threshold)</li>
                  <li>At least 20 community members have expressed interest in standing or voting</li>
                </ul>
                <p className="gov-formation-note">
                  Until these conditions are met, reserve allocations above £200
                  require approval from both directors (CJ and Judith Fontanelle)
                  and are documented in the quarterly transparency report.
                  The directors' temporary governance of the reserve is not silent --
                  it is published, auditable, and ends the moment the council forms.
                </p>
              </div>

              <h3>Council structure</h3>
              <div className="gov-council-grid">
                <div className="gov-council-card">
                  <h4>Size</h4>
                  <p>5 stewards. Odd number to prevent deadlock. Expandable to 7 when the platform reaches 200 active creators.</p>
                </div>
                <div className="gov-council-card">
                  <h4>Election</h4>
                  <p>Annual. Any active creator can stand. Any community member can vote. Simple majority for council decisions. Two-thirds majority to change eligibility criteria.</p>
                </div>
                <div className="gov-council-card">
                  <h4>Term</h4>
                  <p>One year. Renewable once. Maximum two consecutive terms then mandatory rotation. Prevents entrenchment.</p>
                </div>
                <div className="gov-council-card">
                  <h4>Quorum</h4>
                  <p>3 of 5 stewards required for any allocation decision. Decisions made without quorum are void.</p>
                </div>
              </div>

              <h3>What the council can and cannot do</h3>
              <div className="gov-powers-list">
                {COUNCIL_POWERS.map((item, i) => (
                  <div key={i} className="gov-power-item">
                    <div className="gov-power-header">
                      <span className="gov-power-can">Can:</span>
                      <strong>{item.power}</strong>
                    </div>
                    <p className="gov-power-detail">{item.detail}</p>
                    <p className="gov-power-limit">
                      <span className="gov-power-cannot">Cannot:</span> {item.limit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="gov-challenge-box">
                <h3>How to challenge a council decision</h3>
                <p>
                  Any community member can challenge a council decision within
                  30 days of it being published in the transparency report.
                  A challenge requires:
                </p>
                <ol className="gov-challenge-steps">
                  <li>Written submission to the council naming the decision and the grounds for challenge</li>
                  <li>Support from at least 10 other community members (or 10% of active creators, whichever is lower)</li>
                  <li>The council must respond formally within 14 days</li>
                  <li>If the challenge is upheld, the decision is reversed and the reasoning published</li>
                  <li>If the challenge is rejected, the rejection reasoning is published alongside the original challenge</li>
                </ol>
                <p className="gov-challenge-note">
                  Challenges and their outcomes are permanently published in the
                  transparency archive. The history of governance decisions --
                  including the ones that were challenged -- is part of the platform record.
                </p>
              </div>
            </div>
          )}

          {/* ---- TRANSPARENCY ---- */}
          {activeSection === 'transparency' && (
            <div className="gov-section">
              <h2>The Transparency Report</h2>
              <p className="gov-section-intro">
                Published quarterly within 14 days of quarter end.
                Cannot be withheld. Cannot be redacted without a published reason.
                The information about how the mechanism is performing is itself
                a form of accountability.
              </p>

              <div className="gov-principle-card">
                <h3>The Equiano Principle applied to money</h3>
                <p>
                  Olaudah Equiano understood that the ability to document
                  your own situation -- to produce a record that others could read --
                  was a form of power in itself. The transparency report applies
                  that principle to the reserve.
                </p>
                <p>
                  You cannot quietly fail the queue if the queue is public.
                  You cannot misuse the reserve if every allocation is documented.
                  You cannot change the mechanism without a record of the change.
                  Transparency is not a feature. It is the accountability mechanism.
                </p>
              </div>

              <h3>What the report contains</h3>
              <div className="gov-report-tiers">
                {REPORT_CONTENTS.map(tier => (
                  <div key={tier.tier} className="gov-report-tier">
                    <h4 className={'gov-tier-label gov-tier-' + tier.tier.toLowerCase().replace(/ /g, '-')}>
                      {tier.tier}
                    </h4>
                    <ul>
                      {tier.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="gov-schedule-box">
                <h3>Report schedule</h3>
                <div className="gov-quarters-grid">
                  {[
                    { q: 'Q1', period: 'Jan - Mar', published: 'by 14 April' },
                    { q: 'Q2', period: 'Apr - Jun', published: 'by 14 July' },
                    { q: 'Q3', period: 'Jul - Sep', published: 'by 14 October' },
                    { q: 'Q4', period: 'Oct - Dec', published: 'by 14 January' },
                  ].map(q => (
                    <div key={q.q} className="gov-quarter-card">
                      <span className="gov-quarter-label">{q.q}</span>
                      <span className="gov-quarter-period">{q.period}</span>
                      <span className="gov-quarter-published">{q.published}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gov-archive-box">
                <h3>The governance archive</h3>
                <p>
                  Every transparency report is permanently archived.
                  Every council decision is permanently archived.
                  Every challenge and its outcome is permanently archived.
                  The history of how this platform governed its community
                  money is part of the permanent record.
                </p>
                <p>
                  This is not a legal requirement. It is a philosophical one.
                  A platform that claims to serve the Forgotten 60% should be
                  able to show, quarter by quarter, whether it is actually
                  doing that. The archive is the evidence.
                </p>
              </div>

              <div className="gov-contact-box">
                <h3>Questions about governance</h3>
                <p>Contact the platform directly:</p>
                <div className="gov-contact-links">
                  <a href="mailto:admin@wembleywonders.org" className="gov-contact-link">
                    admin@wembleywonders.org
                  </a>
                  <Link to="/contact" className="gov-contact-link">
                    Contact form
                  </Link>
                  <Link to="/legal" className="gov-contact-link">
                    CIC documents
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Cross-links */}
        <section className="gov-crosslinks">
          <Link to="/how-it-works" className="gov-crosslink">
            <span className="gov-crosslink-icon">💷</span>
            <div>
              <strong>The 55/25/20 Model</strong>
              <span>Where the reserve comes from</span>
            </div>
          </Link>
          <Link to="/manifesto" className="gov-crosslink">
            <span className="gov-crosslink-icon">◆</span>
            <div>
              <strong>The Manifesto</strong>
              <span>Why the architecture was designed this way</span>
            </div>
          </Link>
          <Link to="/editorial-standard" className="gov-crosslink">
            <span className="gov-crosslink-icon">📐</span>
            <div>
              <strong>Editorial Standard</strong>
              <span>The same transparency applied to knowledge</span>
            </div>
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default GovernancePage;