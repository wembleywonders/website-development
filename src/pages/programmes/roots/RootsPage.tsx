// src/pages/programmes/roots/RootsPage.tsx
import React, { useState } from 'react';
import RootsArchive from './RootsArchive';
import './RootsPage.css';

// ─── Founding team ────────────────────────────────────────────────────────────

const FOUNDING_TEAM = [
  {
    name: 'Judith Fontanelle',
    role: 'Director of Community Engagement',
    domain: 'Child development · Maternal support · Safeguarding',
    focus: "Mixed heritage hair care, body literacy for young people, intergenerational transmission, mothers' training pathways. Currently completing a podcasting course at K2K Radio — the Roots podcast series launches to Rayd-yo as episodes are recorded.",
    avatar: '🌱',
  },
  {
    name: 'Flora Agba',
    role: 'H&S Risk Management Event Coordinator',
    domain: 'Practitioner knowledge · Salon expertise · Product literacy',
    focus: "Real-world hair and beauty practice. Connecting to professional salon expertise in East London for referrals and testing. Practitioner voice across the chemical literacy and remedies sections.",
    avatar: '✂️',
  },
  {
    name: 'Natalie',
    role: "Women's Studies Consultant, BA Roehampton",
    domain: "Feminist theory · Women's issues platform · Academic framework",
    focus: "Body politics, beauty standard history, colorism, the Halo Code. Academic grounding for every claim the resource makes. Leads the Feature Pressure & Its History section.",
    avatar: '📚',
  },
];

// ─── Apothecary ───────────────────────────────────────────────────────────────

const APOTHECARY_PREVIEW = [
  { icon: '🧪', title: 'Ingredient Combinations', desc: "Learn the science behind formulations. What works together, what doesn't, why." },
  { icon: '📋', title: 'Regulatory Literacy', desc: 'UK Cosmetic Products Regulation. What claims you can make. INCI naming. The compliance pathway for creators.' },
  { icon: '🏪', title: 'Route to Market', desc: 'Community testing → Cyberstore listing at the 55/25/20 rate. Products developed by people who use them.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

const RootsPage: React.FC = () => {
  const [ayaOpen, setAyaOpen] = useState(false);
  const [ayaMessage, setAyaMessage] = useState('');

  return (
    <div className="roots-page">

      {/* ── Hero ── */}
      <section className="roots-hero">
        <div className="roots-hero__eyebrow">Wembley Wonders · Body Sovereignty Resource</div>
        <h1 className="roots-hero__title">
          <span className="roots-hero__title--main">Roots</span>
        </h1>
        <p className="roots-hero__tagline">
          The knowledge that should have been handed down.<br />
          What your body is. What it isn't. What they didn't tell you.
        </p>
        <p className="roots-hero__sub">
          A women-led, women-directed, women-managed resource for body literacy,
          hair science, and the history of appearance standards — with practical
          remedies, a creator economy for natural alternatives, and a community
          built around informed choice.
        </p>
        <div className="roots-hero__cta-row">
          <button className="roots-btn roots-btn--primary" onClick={() => setAyaOpen(true)}>
            Ask Aya
          </button>
          <a href="#archive" className="roots-btn roots-btn--ghost">
            Browse the Archive
          </a>
        </div>

        <blockquote className="roots-hero__quote">
          "A lot of us were never taught how delicate our edges are,
          but we were taught how to style them."
          <cite>— The knowledge gap this resource exists to close</cite>
        </blockquote>
      </section>

      {/* ── Women-led statement ── */}
      <section className="roots-led">
        <div className="roots-led__inner">
          <div className="roots-led__badge">Women-Led · Women-Directed · Women-Managed</div>
          <p className="roots-led__text">
            Roots is not a beauty blog. It is a body sovereignty resource — the knowledge,
            history, community, commerce, and support infrastructure that lets people make
            genuinely informed decisions about their own bodies and their children's bodies.
            Every section is led, directed, and managed by women with lived experience,
            professional expertise, and academic grounding.
          </p>
        </div>
      </section>

      {/* ── Founding team ── */}
      <section className="roots-team">
        <div className="roots-section-header">
          <h2>The Founding Team</h2>
          <p>Three women. Three domains. One resource.</p>
        </div>
        <div className="roots-team__grid">
          {FOUNDING_TEAM.map((member) => (
            <div key={member.name} className="roots-team__card">
              <div className="roots-team__avatar">{member.avatar}</div>
              <h3 className="roots-team__name">{member.name}</h3>
              <div className="roots-team__role">{member.role}</div>
              <div className="roots-team__domain">{member.domain}</div>
              <p className="roots-team__focus">{member.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Knowledge Archive (new expandable component) ── */}
      <RootsArchive />

      {/* ── Mixed Heritage feature ── */}
      <section className="roots-mixed">
        <div className="roots-mixed__inner">
          <div className="roots-mixed__badge">Judith Fontanelle · Child Development Lead</div>
          <h2 className="roots-mixed__title">Mixed Heritage Hair</h2>
          <p className="roots-mixed__text">
            For new and young mothers — particularly those whose own hair type differs
            significantly from their child's. White mothers with mixed-race children.
            Caribbean mothers whose child has a looser curl pattern. South Asian mothers
            navigating 4C hair. The knowledge gap here is structural, not personal.
            Nobody failed. The information simply wasn't passed on.
          </p>
          <p className="roots-mixed__text">
            This section covers the practical hair science by texture, what children's
            products contain and what to avoid, hair care as intergenerational bonding,
            and how to make wash day a positive experience rather than a battle.
          </p>
          <div className="roots-mixed__coming">
            <span>🎙️</span>
            <span>
              Judith is completing her podcasting course at K2K Radio. The Mixed Heritage
              Hair episode will be among the first recorded and publishes to Rayd-yo when ready.
              Mothers' training programme launching Spring 2026.
            </span>
          </div>
        </div>
      </section>

      {/* ── The Apothecary ── */}
      <section className="roots-apothecary">
        <div className="roots-section-header roots-section-header--light">
          <h2>The Apothecary</h2>
          <p>
            The tradition of community herbalism and remedy-making — modernised.
            Women as the original chemists. The knowledge that was suppressed when
            pharmacy became professionalised. Reclaimed.
          </p>
        </div>
        <div className="roots-apothecary__grid">
          {APOTHECARY_PREVIEW.map((item) => (
            <div key={item.title} className="roots-apothecary__card">
              <div className="roots-apothecary__icon">{item.icon}</div>
              <h3 className="roots-apothecary__title">{item.title}</h3>
              <p className="roots-apothecary__desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="roots-apothecary__note">
          Every product developed through the Apothecary pathway lists on Cyberstore
          at the 55/25/20 creator rate. Community-developed, ingredient-literate,
          culturally grounded. Made by people who actually use them.
        </p>
      </section>

      {/* ── Podcast & Events ── */}
      <section className="roots-iwD">
        <div className="roots-iwd__inner">
          <div className="roots-iwd__date">Building Live · Spring–Summer 2026</div>
          <h2 className="roots-iwd__title">"What They Didn't Tell You"</h2>
          <p className="roots-iwd__text">
            Judith's podcast series at K2K Radio. Each episode covers a section of the
            Knowledge Archive — recorded, published to Rayd-yo, and woven into what Aya
            knows. Natalie on the academic framing. Flora on practitioner knowledge.
            The three founding voices building in public.
          </p>
          <div className="roots-iwd__also">
            <a href="https://rayd-yo.wembleywonders.org" className="roots-iwd__event-link" target="_blank" rel="noopener noreferrer">
              🎙️ Listen on Rayd-yo
            </a>
            <button className="roots-iwd__event-link" onClick={() => setAyaOpen(true)}>
              🌿 Ask Aya a question
            </button>
            <a href="/programmes/roots#archive" className="roots-iwd__event-link">
              📚 Browse the Archive
            </a>
          </div>
          <a href="/membership" className="roots-btn roots-btn--iwd">
            Register Interest
          </a>
        </div>
      </section>

      {/* ── Aya overlay ── */}
      {ayaOpen && (
        <div className="roots-aya-overlay" onClick={() => setAyaOpen(false)}>
          <div className="roots-aya-panel" onClick={(e) => e.stopPropagation()}>
            <button className="roots-aya-panel__close" onClick={() => setAyaOpen(false)}>✕</button>
            <div className="roots-aya-panel__header">
              <div className="roots-aya-panel__avatar">🌿</div>
              <div>
                <h3 className="roots-aya-panel__name">Aya</h3>
                <p className="roots-aya-panel__tagline">
                  Body sovereignty knowledge keeper · Endurance &amp; resourcefulness
                </p>
              </div>
            </div>
            <div className="roots-aya-panel__intro">
              <p>
                I'm Aya — the Roots knowledge keeper. I can help you find information
                about hair science, ingredients, remedies, your rights, and
                mixed heritage hair care.
              </p>
              <p>
                I'm not a replacement for a trichologist or dermatologist. When a
                question is beyond the archive, I'll tell you — and point you to
                someone who can help properly.
              </p>
            </div>
            <div className="roots-aya-panel__coming">
              <span>✦</span>
              <span>
                Aya's knowledge grows as Judith's podcast episodes are recorded at K2K Radio
                and published to Rayd-yo. Leave your question below — it shapes what she learns first.
              </span>
            </div>
            <div className="roots-aya-panel__input-row">
              <input
                className="roots-aya-panel__input"
                type="text"
                placeholder="What do you want Aya to know about?"
                value={ayaMessage}
                onChange={(e) => setAyaMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && ayaMessage.trim()) {
                    alert(`Thank you — we've noted: "${ayaMessage}". This will help shape Aya's knowledge base.`);
                    setAyaMessage('');
                  }
                }}
              />
              <button
                className="roots-btn roots-btn--primary"
                onClick={() => {
                  if (ayaMessage.trim()) {
                    alert(`Thank you — we've noted: "${ayaMessage}". This will help shape Aya's knowledge base.`);
                    setAyaMessage('');
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Aya button ── */}
      <button
        className="roots-aya-fab"
        onClick={() => setAyaOpen(true)}
        aria-label="Ask Aya"
      >
        <span className="roots-aya-fab__icon">🌿</span>
        <span className="roots-aya-fab__label">Ask Aya</span>
      </button>

    </div>
  );
};

export default RootsPage;