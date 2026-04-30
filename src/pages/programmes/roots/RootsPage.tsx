// src/pages/programmes/roots/RootsPage.tsx
// Full 5Cs tab architecture with CompanionStrip integration.
// Template for all subsequent programme pages.
// Accent: #4A6741 (sage). Lead: Judith Fontanelle.

import React, { useState } from "react";
import RootsArchive from "./RootsArchive";
import CompanionStrip, { DockButton } from "../../../components/sandbox/CompanionStrip";
import { useDockState } from "../../../hooks/useDockState";
import "./RootsPage.css";

const SAGE = "#4A6741";
const PROGRAMME = "Roots";

const FOUNDING_TEAM = [
  { name: "Judith Fontanelle", role: "Programme Lead",
    domain: "Child development · Safeguarding · Cultural competence in care",
    focus: "Child development professional specialising in safeguarding. Judith has observed across years of professional practice that Black children’s hair care is a welfare indicator — a visible signal of whether a carer understands the child in their care. The Roots podcast series ‘Caring for Your Child’s Hair’ is produced in consultation with the only Black female trichologist in the UK. It is a safeguarding resource disguised as a hair care guide — for parents, carers, foster carers, teachers and social workers.", avatar: "🌱" },
  { name: "Flora Agba", role: "H&S Risk Management Event Coordinator",
    domain: "Practitioner knowledge · Salon expertise · Product literacy",
    focus: "Real-world hair and beauty practice. East London salon expertise for referrals and testing.", avatar: "✂️" },
  { name: "Natalie", role: "Women’s Studies Consultant, BA Roehampton",
    domain: "Feminist theory · Women’s issues platform · Academic framework",
    focus: "Body politics, beauty standard history, colorism, the Halo Code. Leads Feature Pressure & Its History.", avatar: "📚" },
];

const CountingHouseCompanion: React.FC<{ primaryTab: string }> = ({ primaryTab }) => {
  const [monthly, setMonthly] = useState(200);
  const creator = Math.round(monthly * 0.55);
  const community = Math.round(monthly * 0.25);
  const platform = Math.round(monthly * 0.20);
  return (
    <div className="rp-ch-companion">
      <div className="rp-ch-companion__calc">
        <label className="rp-ch-companion__label">Monthly £
          <input type="number" className="rp-ch-companion__input" value={monthly}
            onChange={e => setMonthly(Number(e.target.value))} min={0} />
        </label>
        <div className="rp-ch-companion__split">
          <div className="rp-ch-companion__row rp-ch-companion__row--you"><span>You</span><strong>£{creator}</strong></div>
          <div className="rp-ch-companion__row rp-ch-companion__row--community"><span>Community</span><strong>£{community}</strong></div>
          <div className="rp-ch-companion__row rp-ch-companion__row--platform"><span>Platform</span><strong>£{platform}</strong></div>
        </div>
      </div>
      <a href="/counting-house" className="rp-ch-companion__link">Full Counting House →</a>
    </div>
  );
};

const ConnectTab: React.FC<{ dock: Function; isDockedTab: Function }> = ({ dock, isDockedTab }) => (
  <div className="rp-tab-content">
    <div className="rp-tab-header">
      <span className="rp-tab-eyebrow">Connect</span>
      <h2 className="rp-tab-title">The women who built this.</h2>
      <p className="rp-tab-lead">Roots is women-led. Not by committee — by a child development professional who has seen what happens when carers don’t know how to tend a Black child’s hair, a practitioner who knows what’s in the products, and an academic who knows why the standards were set against us in the first place.</p>
      <DockButton label="Counting House" isDocked={isDockedTab("control")}
        onDock={() => dock({ tabId: "control", label: "Counting House", programme: PROGRAMME, colour: SAGE, content: <CountingHouseCompanion primaryTab="connect" /> })}
        onUndock={() => {}} colour={SAGE} />
    </div>
    <div className="rp-team-grid">
      {FOUNDING_TEAM.map(m => (
        <div key={m.name} className="rp-team-card">
          <div className="rp-team-avatar">{m.avatar}</div>
          <div className="rp-team-info">
            <h3 className="rp-team-name">{m.name}</h3>
            <p className="rp-team-role">{m.role}</p>
            <p className="rp-team-domain">{m.domain}</p>
            <p className="rp-team-focus">{m.focus}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="rp-women-led-statement">
      <p>Roots launched around IWD 2026. The podcast series ‘Caring for Your Child’s Hair’ is in production — a resource for parents, mixed-race families, foster carers and the professionals who work with Black children. The archive is being built entry by entry. The CPD offer for local authorities and fostering agencies is in development. Everything here is live work, not aspirational copy.</p>
    </div>
  </div>
);

const CreateTab: React.FC<{ dock: Function; isDockedTab: Function }> = ({ dock, isDockedTab }) => (
  <div className="rp-tab-content">
    <div className="rp-tab-header">
      <span className="rp-tab-eyebrow">Create</span>
      <h2 className="rp-tab-title">The Knowledge Archive.</h2>
      <p className="rp-tab-lead">Every remedy, every practice, every ingredient combination passed down without documentation. Roots puts it on record.</p>
      <DockButton label="Counting House" isDocked={isDockedTab("control")}
        onDock={() => dock({ tabId: "control", label: "Counting House", programme: PROGRAMME, colour: SAGE, content: <CountingHouseCompanion primaryTab="create" /> })}
        onUndock={() => {}} colour={SAGE} />
    </div>
    <RootsArchive />
    <div className="rp-create-pathways">
      <h3 className="rp-section-title">Pathways from Create</h3>
      <div className="rp-pathway-cards">
        <div className="rp-pathway-card">
          <span className="rp-pathway-icon">🎧</span>
          <h4>Caring for Your Child’s Hair</h4>
          <p>A safeguarding resource for parents, carers, foster carers and professionals — produced in consultation with the only Black female trichologist in the UK. Broadcasting to Rayd-yo as episodes are recorded. Judith leads. K2K Radio production partnership.</p>
          <a href="/programmes/rayd-yo" className="rp-pathway-link">Rayd-yo →</a>
        </div>
        <div className="rp-pathway-card">
          <span className="rp-pathway-icon">🧪</span>
          <h4>Apothecary</h4>
          <p>Documented remedies become listed products. Knowledge Archive to Cyberstore, with full provenance and ingredient literacy.</p>
          <a href="/programmes/easy-street" className="rp-pathway-link">Easy Street →</a>
        </div>
      </div>
    </div>
  </div>
);

const ChangeTab: React.FC<{ dock: Function; isDockedTab: Function }> = ({ dock, isDockedTab }) => (
  <div className="rp-tab-content">
    <div className="rp-tab-header">
      <span className="rp-tab-eyebrow">Change</span>
      <h2 className="rp-tab-title">Body sovereignty. Full stop.</h2>
      <p className="rp-tab-lead">The Halo Code. Colorism. Beauty standard pressure. Natalie’s domain — academic grounding for what the community already knows from lived experience.</p>
      <DockButton label="Community Fund" isDocked={isDockedTab("control")}
        onDock={() => dock({ tabId: "control", label: "Counting House", programme: PROGRAMME, colour: SAGE, content: <CountingHouseCompanion primaryTab="change" /> })}
        onUndock={() => {}} colour={SAGE} />
    </div>
    <div className="rp-change-sections">
      <div className="rp-change-section"><h3 className="rp-section-title">Feature Pressure & Its History</h3>
        <p>Historical construction of beauty standards targeting Black women and girls. Natalie leads.</p>
        <span className="rp-status-badge rp-status-badge--in-progress">In development</span></div>
      <div className="rp-change-section"><h3 className="rp-section-title">The Halo Code</h3>
        <p>Workplace discrimination on the basis of hair. Legal framework. What employees are entitled to.</p>
        <span className="rp-status-badge rp-status-badge--live">Active</span></div>
      <div className="rp-change-section"><h3 className="rp-section-title">Mixed Heritage Hair Care</h3>
        <p>Body literacy for young people with mixed heritage hair. Chemical literacy. Safe product guidance.</p>
        <span className="rp-status-badge rp-status-badge--live">Active</span></div>
      <div className="rp-change-section"><h3 className="rp-section-title">Mothers’ Training Pathway</h3>
        <p>For mothers supporting children through hair identity. Links to Bright Sparks.</p>
        <a href="/programmes/bright-sparks" className="rp-pathway-link">Bright Sparks →</a></div>
    </div>
  </div>
);

const ChallengeTab: React.FC<{ dock: Function; isDockedTab: Function }> = ({ dock, isDockedTab }) => (
  <div className="rp-tab-content">
    <div className="rp-tab-header">
      <span className="rp-tab-eyebrow">Challenge</span>
      <h2 className="rp-tab-title">Take this outside.</h2>
      <p className="rp-tab-lead">The knowledge built inside Roots has a professional market outside it. Child welfare CPD. Halo Code consultancy. Speaking engagements. The platform protects you when you take it there — minimum terms floor, market rate confirmation, legal access fund.</p>
      <DockButton label="External Opportunity" isDocked={isDockedTab("control")}
        onDock={() => dock({ tabId: "control", label: "Counting House", programme: PROGRAMME, colour: SAGE, content: <CountingHouseCompanion primaryTab="challenge" /> })}
        onUndock={() => {}} colour={SAGE} />
    </div>
    <div className="rp-challenge-sections">
      <div className="rp-challenge-section"><h3 className="rp-section-title">Corporate Wellness Training</h3>
        <p>Professional CPD for the child welfare sector. Foster carer training. Social worker CPD. School staff development. Judith’s safeguarding background + the trichologist’s clinical expertise + Natalie’s academic framework = a training offer local authorities cannot build internally. Rate: £500–£800 per day.</p>
        <span className="rp-status-badge rp-status-badge--in-progress">In development</span></div>
      <div className="rp-challenge-section"><h3 className="rp-section-title">Halo Code Consultancy</h3>
        <p>Policy drafting. Staff training. Compliance guidance. Platform external opportunity protection applies.</p>
        <span className="rp-status-badge rp-status-badge--live">Available now</span></div>
      <div className="rp-challenge-section"><h3 className="rp-section-title">Speaking & Panels</h3>
        <p>IWD. Black History Month. Corporate events. All three founding members available individually and as a panel.</p>
        <a href="mailto:admin@wembleywonders.org" className="rp-pathway-link">Get in touch →</a></div>
    </div>
  </div>
);

const ControlTab: React.FC<{ dock: Function; isDockedTab: Function; undock: Function; companions: any[] }> = ({ dock, isDockedTab, undock, companions }) => {
  const [monthly, setMonthly] = useState(200);
  const [score, setScore] = useState(75);
  const creator = Math.round(monthly * 0.55);
  const community = Math.round(monthly * 0.25);
  const platform = Math.round(monthly * 0.20);
  const band = score >= 80 ? { label: "Flourishing", share: 0.60, colour: "#4A6741" }
    : score >= 60 ? { label: "Contributing", share: 0.57, colour: "#6B8F4E" }
    : score >= 40 ? { label: "Coasting", share: 0.55, colour: "#8B7355" }
    : score >= 20 ? { label: "Extracting", share: 0.50, colour: "#B8860B" }
    : { label: "Breaching", share: 0.45, colour: "#8B1A1A" };
  const adjusted = Math.round(monthly * band.share);
  const diff = adjusted - creator;
  return (
    <div className="rp-tab-content">
      <div className="rp-tab-header">
        <span className="rp-tab-eyebrow">Control</span>
        <h2 className="rp-tab-title">The Counting House.</h2>
        <p className="rp-tab-lead">Your financial engine. Six tools for understanding, projecting, and protecting your earnings.</p>
      </div>
      <div className="rp-ch-grid">
        <div className="rp-ch-tool">
          <h3 className="rp-ch-tool__title">№¹ The 55 Calculator</h3>
          <p className="rp-ch-tool__desc">What does 55% of your earnings actually look like?</p>
          <div className="rp-ch-calc">
            <label className="rp-ch-label">Monthly revenue £
              <input type="number" className="rp-ch-input" value={monthly} onChange={e => setMonthly(Number(e.target.value))} min={0} />
            </label>
            <div className="rp-ch-split">
              <div className="rp-ch-row rp-ch-row--you"><span>You (55%)</span><strong>£{creator}</strong></div>
              <div className="rp-ch-row rp-ch-row--community"><span>Community pool (25%)</span><strong>£{community}</strong></div>
              <div className="rp-ch-row rp-ch-row--platform"><span>Platform (20%)</span><strong>£{platform}</strong></div>
            </div>
            <p className="rp-ch-note">The 25% community pool — £{community} of every £{monthly} — is what makes this a cooperative, not a marketplace.</p>
          </div>
        </div>
        <div className="rp-ch-tool">
          <h3 className="rp-ch-tool__title">№² Current Status</h3>
          <p className="rp-ch-tool__desc">Your Covenant Score affects your revenue share band.</p>
          <div className="rp-ch-calc">
            <label className="rp-ch-label">Covenant Score (0–100)
              <input type="range" className="rp-ch-slider" value={score} onChange={e => setScore(Number(e.target.value))} min={0} max={100} style={{ accentColor: band.colour }} />
              <span className="rp-ch-score-display" style={{ color: band.colour }}>{score} — {band.label}</span>
            </label>
            <div className="rp-ch-split">
              <div className="rp-ch-row rp-ch-row--you"><span>Your share ({Math.round(band.share * 100)}%)</span><strong>£{adjusted}</strong></div>
              {diff !== 0 && <div className="rp-ch-row" style={{ color: diff > 0 ? "#4A6741" : "#8B1A1A" }}><span>vs standard 55%</span><strong>{diff > 0 ? "+" : ""}£{diff}</strong></div>}
            </div>
          </div>
        </div>
        <div className="rp-ch-tool">
          <h3 className="rp-ch-tool__title">№³ Grant Eligibility</h3>
          <p className="rp-ch-tool__desc">Community fund grants from the 25% pool. £500–£10,000.</p>
          <div className="rp-ch-grant-tiers">
            {[{ tier: "Connector", range: "£500–£1,000", req: "3+ months active" },
              { tier: "Curator", range: "£1,000–£5,000", req: "6+ months, cross-programme" },
              { tier: "Champion", range: "£5,000–£10,000", req: "12+ months, Flourishing band" }]
              .map(t => (<div key={t.tier} className="rp-ch-grant-tier">
                <span className="rp-ch-grant-tier__name">{t.tier}</span>
                <span className="rp-ch-grant-tier__range">{t.range}</span>
                <span className="rp-ch-grant-tier__req">{t.req}</span>
              </div>))}
          </div>
        </div>
        <div className="rp-ch-tool">
          <h3 className="rp-ch-tool__title">№⁴ The Hand</h3>
          <p className="rp-ch-tool__desc">Pardner hand calculator for remedy-making circles.</p>
          <p className="rp-ch-tool__coming">Full tool in development. Collective saving, rotating draw, community accountability.</p>
          <a href="/counting-house" className="rp-ch-link">Open full Counting House →</a>
        </div>
      </div>
      <div className="rp-ch-companion-toggle">
        <p className="rp-ch-companion-toggle__label">Keep the Counting House visible while you work in other tabs.</p>
        <DockButton label="Counting House" isDocked={isDockedTab("control")}
          onDock={() => dock({ tabId: "control", label: "Counting House", programme: PROGRAMME, colour: SAGE, content: <CountingHouseCompanion primaryTab="control" /> })}
          onUndock={() => { const c = companions.find((c: any) => c.tabId === "control"); if (c) undock(c.id); }}
          colour={SAGE} />
      </div>
    </div>
  );
};

const TABS = [
  { id: "connect",   label: "Connect",   icon: "🤝" },
  { id: "create",    label: "Create",    icon: "✏️" },
  { id: "change",    label: "Change",    icon: "🌱" },
  { id: "challenge", label: "Challenge", icon: "⚡" },
  { id: "control",   label: "Control",   icon: "💰" },
] as const;

const RootsPage: React.FC = () => {
  const { primaryTab, setPrimaryTab, companions, splitActive, dock, undock, undockAll, isDockedTab } = useDockState(PROGRAMME, "connect");
  const d = (companion: any) => dock(companion);
  const idt = (tabId: string) => isDockedTab(tabId as any);
  const renderTab = () => {
    switch (primaryTab) {
      case "connect":   return <ConnectTab dock={d} isDockedTab={idt} />;
      case "create":    return <CreateTab dock={d} isDockedTab={idt} />;
      case "change":    return <ChangeTab dock={d} isDockedTab={idt} />;
      case "challenge": return <ChallengeTab dock={d} isDockedTab={idt} />;
      case "control":   return <ControlTab dock={d} isDockedTab={idt} undock={undock} companions={companions} />;
      default:          return <ConnectTab dock={d} isDockedTab={idt} />;
    }
  };
  return (
    <div className="rp-page" style={{ "--rp-sage": SAGE } as React.CSSProperties}>
      <div className="rp-hero">
        <div className="rp-hero__inner">
          <span className="rp-hero__eyebrow">Wembley Wonders Programme</span>
          <h1 className="rp-hero__title">Roots</h1>
          <p className="rp-hero__sub">Body sovereignty. Knowledge preservation. Women’s practice on record.</p>
          <p className="rp-hero__lead">What your grandmother knew. What your mother modified. What you carry now. Roots puts it on record — with evidence grades, podcast documentation, and an Apothecary that turns knowledge into income.</p>
        </div>
      </div>
      <nav className="rp-tabs-nav" aria-label="Programme sections">
        {TABS.map(tab => (
          <button key={tab.id}
            className={"rp-tab-btn" + (primaryTab === tab.id ? " rp-tab-btn--active" : "")}
            onClick={() => setPrimaryTab(tab.id as any)}
            aria-current={primaryTab === tab.id ? "page" : undefined}>
            <span className="rp-tab-btn__icon">{tab.icon}</span>
            <span className="rp-tab-btn__label">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className={"rp-workspace" + (splitActive ? " rp-workspace--split" : "")}>
        <main className="rp-primary">{renderTab()}</main>
        {splitActive && <CompanionStrip companions={companions} onUndock={undock} onUndockAll={undockAll} />}
      </div>
    </div>
  );
};

export default RootsPage;
