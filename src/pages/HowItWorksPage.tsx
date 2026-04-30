import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import './HowItWorksPage.css';

const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'creator'|'community'|'platform'>('creator');

  const exampleSales = [
    { price: 5,   creator: 2.75,  reserve: 1.25, ops: 1.00  },
    { price: 10,  creator: 5.50,  reserve: 2.50, ops: 2.00  },
    { price: 25,  creator: 13.75, reserve: 6.25, ops: 5.00  },
    { price: 50,  creator: 27.50, reserve: 12.50, ops: 10.00 },
    { price: 100, creator: 55.00, reserve: 25.00, ops: 20.00 },
  ];

  return (
    <PageTemplate pageTitle="How It Works" pageStrapline="The 55/25/20 model. Anti-extraction architecture. Not a promise - a specification." pageType="standard">
      <div className="hiw-content">

        <section className="hiw-hero">
          <div className="hiw-hero-inner">
            <p className="hiw-hero-lead">Every platform extracts.</p>
            <p className="hiw-hero-body">
              Spotify pays 0.003p per stream. YouTube keeps 45%. OnlyFans takes 20% and then
              locks you in with payment processor dependencies. The creator does the work.
              The platform keeps the majority. That is the default.
            </p>
            <p className="hiw-hero-body">
              Wembley Wonders inverts it. Not as aspiration. As architecture.
              The split is hardcoded. No algorithm can change it.
              No platform update can reduce it. No executive can override it.
            </p>
            <div className="hiw-split-display">
              <div className="hiw-split-block hiw-split-creator">
                <span className="hiw-split-pct">55%</span>
                <span className="hiw-split-label">To the creator</span>
                <span className="hiw-split-sub">You. Every time.</span>
              </div>
              <div className="hiw-split-block hiw-split-reserve">
                <span className="hiw-split-pct">25%</span>
                <span className="hiw-split-label">Community reserve</span>
                <span className="hiw-split-sub">Builds the next wonder</span>
              </div>
              <div className="hiw-split-block hiw-split-ops">
                <span className="hiw-split-pct">20%</span>
                <span className="hiw-split-label">Operations</span>
                <span className="hiw-split-sub">Keeps the lights on</span>
              </div>
            </div>
          </div>
        </section>

        <section className="hiw-calculator">
          <h2>What it means in pounds</h2>
          <p className="hiw-section-intro">
            No percentages in a spreadsheet. Real money at real prices.
          </p>
          <div className="hiw-table-wrapper">
            <table className="hiw-table">
              <thead>
                <tr>
                  <th>Sale price</th>
                  <th className="hiw-th-creator">Creator (55%)</th>
                  <th>Reserve (25%)</th>
                  <th>Ops (20%)</th>
                </tr>
              </thead>
              <tbody>
                {exampleSales.map(row => (
                  <tr key={row.price}>
                    <td>£{row.price.toFixed(2)}</td>
                    <td className="hiw-td-creator">£{row.creator.toFixed(2)}</td>
                    <td>£{row.reserve.toFixed(2)}</td>
                    <td>£{row.ops.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="hiw-tabs-section">
          <h2>What each share is for</h2>
          <div className="hiw-tabs">
            <button className={'hiw-tab ' + (activeTab==='creator'   ? 'active' : '')} onClick={() => setActiveTab('creator')}>The 55% - Creator</button>
            <button className={'hiw-tab ' + (activeTab==='community' ? 'active' : '')} onClick={() => setActiveTab('community')}>The 25% - Community</button>
            <button className={'hiw-tab ' + (activeTab==='platform'  ? 'active' : '')} onClick={() => setActiveTab('platform')}>The 20% - Platform</button>
          </div>
          <div className="hiw-tab-content">
            {activeTab === 'creator' && (
              <div className="hiw-tab-panel">
                <h3>Your 55% — paid directly, every time</h3>
                <p>Processed via Stripe Connect. The split happens at the point of sale. Not at the end of the month. Not subject to a minimum payout threshold that benefits the platform. The moment someone buys your work, 55% moves to your Stripe account.</p>
                <p>This is not a revenue share arrangement where the platform holds your money and pays you later. It is a direct transfer. The platform never holds what belongs to you.</p>
                <div className="hiw-comparison">
                  <div className="hiw-compare-item hiw-compare-bad">
                    <h4>What other platforms do</h4>
                    <ul>
                      <li>Hold earnings until a threshold</li>
                      <li>Take 30-50% before paying</li>
                      <li>Change the rate whenever they want</li>
                      <li>Lock your audience to their platform</li>
                      <li>Own the algorithm that determines your reach</li>
                    </ul>
                  </div>
                  <div className="hiw-compare-item hiw-compare-good">
                    <h4>What Wembley Wonders does</h4>
                    <ul>
                      <li>55% transferred at point of sale</li>
                      <li>Split is hardcoded — not a policy</li>
                      <li>Your subscriber relationships are portable</li>
                      <li>You can leave and take your audience</li>
                      <li>Provenance is yours — permanently</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'community' && (
              <div className="hiw-tab-panel">
                <h3>The 25% — builds capability for the next person</h3>
                <p>Every sale puts 25% into the community reserve. This is not a charity donation. It is the infrastructure fund. It pays for the equipment that the next creator needs. It funds the Cultivation Pardner — the floor payment for creators below the earnings threshold. It pays for programme delivery.</p>
                <div className="hiw-reserve-uses">
                  <div className="hiw-reserve-item">
                    <span className="hiw-reserve-icon">🌱</span>
                    <div>
                      <strong>Cultivation Pardner</strong>
                      <p>15% of the reserve funds floor payments for creators earning below £150/month average. Named after the Caribbean Pardner tradition. Maximum 3 quarters. Not welfare — community investment.</p>
                    </div>
                  </div>
                  <div className="hiw-reserve-item">
                    <span className="hiw-reserve-icon">🛠️</span>
                    <div>
                      <strong>Equipment and infrastructure</strong>
                      <p>The Makers Collective shared equipment. The recording studio. The industrial sewing machines. The things that individual creators cannot afford alone but that the community can afford together.</p>
                    </div>
                  </div>
                  <div className="hiw-reserve-item">
                    <span className="hiw-reserve-icon">🏛️</span>
                    <div>
                      <strong>Stewards Council governance</strong>
                      <p>The reserve is governed by the Stewards Council — elected community members who decide how it is allocated. Not the directors. Not the platform. The community.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'platform' && (
              <div className="hiw-tab-panel">
                <h3>The 20% — keeps the infrastructure running</h3>
                <p>Server costs. Stripe fees. Development. Administration. The 20% is deliberately lean — kept as low as possible so the creator share stays as high as possible. This is not where profit is extracted. This is where the lights stay on.</p>
                <p>Wembley Wonders CIC is a Community Interest Company. Directors cannot extract profits. Assets are locked. If the company were ever dissolved, assets would transfer to similar community interest organisations. This is not policy. It is law.</p>
                <div className="hiw-governance-note">
                  <span className="hiw-gov-icon">◆</span>
                  <p>Company No. 12960817. Incorporated 19 October 2020. Registered England and Wales. Self-financed since day one. No grants. No obligations to funders whose priorities might not align with the community.</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            THE PARDNER PROGRAMME
            The most distinctive argument the platform has.
            No other creator platform in Britain has a community pool
            governed by a pardner hand model drawn from Caribbean mutual
            aid tradition. This section is for:
              — semi-retirees: the decisive argument
              — press/funders: the hook with no equivalent elsewhere
              — UC claimants: the Cultivation Pardner safety net
              — young creators: the community infrastructure they use daily
        ══════════════════════════════════════════════════════════════════ */}
        <section className="hiw-pardner-section">
          <div className="hiw-pardner-inner">

            <div className="hiw-pardner-header">
              <span className="hiw-pardner-mark">◈</span>
              <div>
                <h2>The Pardner Programme</h2>
                <p className="hiw-pardner-sub">
                  Three centuries before fintech. Still the most effective mutual aid model ever built by the Caribbean diaspora.
                </p>
              </div>
            </div>

            <div className="hiw-pardner-body">
              <p>
                A pardner hand is a rotating savings and support system brought to Britain by the Windrush
                generation. A group of people each contribute a fixed amount regularly. Each member takes the
                full pot in turn. Nobody profits from administering it. Everybody benefits from participating in it.
                Trust is the infrastructure.
              </p>
              <p>
                Wembley Wonders applies that principle to the creator economy. The 25% community pool is not
                a fee the platform keeps. It is a collective fund that every creator contributes to and every
                creator can draw on. The Stewards Council — elected community members, not directors —
                decides how it is allocated each quarter. The platform proposes. The community decides.
              </p>
            </div>

            {/* Three uses of the pool */}
            <div className="hiw-pardner-uses">

              <div className="hiw-pardner-use hiw-pardner-use--cultivation">
                <div className="hiw-pardner-use-icon">🌱</div>
                <div className="hiw-pardner-use-content">
                  <h3>Cultivation Pardner</h3>
                  <p className="hiw-pardner-use-desc">
                    15% of the pool provides floor payments for creators earning below £150/month averaged
                    over the quarter. Maximum three consecutive quarters. After that, the community expects
                    you to be earning — and if you're not, that's a conversation, not a cut-off.
                  </p>
                  <p className="hiw-pardner-use-note">
                    Not welfare. Community investment in someone who is still building. The distinction matters.
                  </p>
                </div>
              </div>

              <div className="hiw-pardner-use hiw-pardner-use--commons">
                <div className="hiw-pardner-use-icon">🛠️</div>
                <div className="hiw-pardner-use-content">
                  <h3>The Creative Commons</h3>
                  <p className="hiw-pardner-use-desc">
                    Shared equipment, recording infrastructure, sewing machines, broadcast gear. The things
                    individual creators cannot afford alone but that the community can afford together.
                    No individual owns it. Everyone with a contribution record can access it.
                  </p>
                  <p className="hiw-pardner-use-note">
                    Access is earned through participation, not purchased through subscription.
                  </p>
                </div>
              </div>

              <div className="hiw-pardner-use hiw-pardner-use--programme">
                <div className="hiw-pardner-use-icon">🏛️</div>
                <div className="hiw-pardner-use-content">
                  <h3>Programme Delivery</h3>
                  <p className="hiw-pardner-use-desc">
                    Sessions, workshops, facilitation, the Knowledge Commons archive, Rayd-yo broadcast
                    infrastructure. The activities that make the platform worth belonging to are funded
                    by the community that benefits from them.
                  </p>
                  <p className="hiw-pardner-use-note">
                    The community pool published quarterly. Every member can see where it went.
                  </p>
                </div>
              </div>

            </div>

            {/* The tradition */}
            <div className="hiw-pardner-tradition">
              <blockquote className="hiw-pardner-quote">
                "The pardner hand worked because it was built on something no fintech company
                has ever successfully replicated: community accountability. You didn't default
                on your pardner because you'd have to look those people in the face next week."
              </blockquote>
              <p className="hiw-pardner-tradition-body">
                That accountability is built into the Wembley Wonders governance structure. The
                Stewards Council meets quarterly. Allocation decisions are minuted and published.
                The community pool status is visible on the Community Dashboard in real time.
                No black box. No executive discretion. The community owns what the community built.
              </p>
            </div>

            {/* Who this persuades most */}
            <div className="hiw-pardner-audiences">
              <div className="hiw-pardner-audience">
                <span className="hiw-pardner-audience-label">For semi-retirees</span>
                <p>You already know how a pardner hand works. You may have participated in one.
                This is that principle applied to a platform economy — with the same accountability
                and the same collective benefit. The passive income model means the pool grows
                while you're not actively creating.</p>
              </div>
              <div className="hiw-pardner-audience">
                <span className="hiw-pardner-audience-label">For new creators</span>
                <p>If you have a difficult month and your earnings drop below £150, the Cultivation
                Pardner can bridge the gap. You don't apply. The system notices. Maya flags it
                to the Stewards Council. You keep creating.</p>
              </div>
              <div className="hiw-pardner-audience">
                <span className="hiw-pardner-audience-label">For press and partners</span>
                <p>No other creator platform in Britain has a community pool governed by a
                Caribbean mutual aid model with elected community oversight. This is not a
                feature. It is a philosophical position with a 300-year tradition behind it
                and a legal structure that makes it permanent.</p>
              </div>
            </div>

            {/* Pool status CTA */}
            <div className="hiw-pardner-cta">
              <Link to="/community/dashboard" className="hiw-pardner-cta-link">
                See the current pool status →
              </Link>
              <Link to="/creator-pathways" className="hiw-pardner-cta-link hiw-pardner-cta-link--secondary">
                See your earning path →
              </Link>
            </div>

          </div>
        </section>

        <section className="hiw-compare-section">
          <h2>The platform comparison</h2>
          <div className="hiw-platform-grid">
            {[
              { name: 'Spotify',         creator: '~0.4%', note: 'Per stream. Averaged.' },
              { name: 'YouTube',         creator: '55%',   note: 'Of ad revenue only. After algorithm decides your reach.' },
              { name: 'OnlyFans',        creator: '80%',   note: 'But payment processor dependency. Cage lock-in.' },
              { name: 'Etsy',            creator: '~74%',  note: 'After listing fees, transaction fees, payment fees.' },
              { name: 'Wembley Wonders', creator: '55%',   note: 'Hardcoded. Direct transfer. Portable audience. Your provenance. Plus a community pool no other platform has.' },
            ].map(pl => (
              <div key={pl.name} className={'hiw-platform-card' + (pl.name === 'Wembley Wonders' ? ' hiw-platform-card--ours' : '')}>
                <span className="hiw-platform-name">{pl.name}</span>
                <span className="hiw-platform-pct">{pl.creator}</span>
                <span className="hiw-platform-note">{pl.note}</span>
              </div>
            ))}
          </div>
          <p className="hiw-compare-note">
            The 55% is not the highest number in the table. It is the most honest number in the table.
            OnlyFans offers 80% and then builds a cage around it.
            Wembley Wonders offers 55% and hands you the key — plus 25% that stays in your community.
          </p>
        </section>

        <section className="hiw-roce-section">
          <h2>Return on Creative Effort</h2>
          <p className="hiw-section-intro">
            Every other platform measures success in terms of what serves the platform.
            Views. Plays. Followers. Engagement rate.
            These tell the creator how useful they are to the platform's growth.
          </p>
          <p className="hiw-section-intro">
            Wembley Wonders measures ROCE - Return on Creative Effort.
            What did this work return to you for the time you put in?
          </p>
          <div className="hiw-roce-example">
            <div className="hiw-roce-card">
              <p className="hiw-roce-title">Rainy Season Beat</p>
              <div className="hiw-roce-metrics">
                <span>Sold: 4</span>
                <span>Earned: £34</span>
                <span>Saved: 11</span>
                <span className="hiw-roce-highlight">ROCE: £17/hr</span>
              </div>
            </div>
            <p className="hiw-roce-explain">
              Three numbers tell the full story. Sold: confirmed value - real money, real decisions.
              Saved: latent demand - 11 people bookmarked it but haven't bought yet.
              ROCE: what every hour of your creative work returned.
              That gap between 4 sold and 11 saved? Maya notices it.
              She tells you before you have to ask.
            </p>
          </div>
        </section>

        <section className="hiw-cta-section">
          <div className="hiw-cta-inner">
            <h2>Ready to build on infrastructure that works for you?</h2>
            <p>Your knowledge. Your work. Your 55%. Your community's 25%.</p>
            <div className="hiw-cta-buttons">
              <Link to="/get-started" className="hiw-cta-primary">Get started free</Link>
              <Link to="/manifesto" className="hiw-cta-secondary">Read the manifesto</Link>
              <Link to="/shop" className="hiw-cta-secondary">See the Cyberstore</Link>
            </div>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default HowItWorksPage;