// Drop this section into your AboutUsPage.tsx inside Judith's existing section
// Sits below her existing bio paragraph, above her tags row
// Full anchor id: "judith-on-contribution" — used by Passionistas précis link

import React from 'react';

const JudithContributeSection: React.FC = () => (
  <section
    id="judith-on-contribution"
    style={{
      margin: '2.5rem 0',
      padding: '2rem 2.25rem',
      background: 'var(--color-background-secondary)',
      borderLeft: '3px solid #1D9E75',
      borderRadius: '0 var(--border-radius-lg) var(--border-radius-lg) 0',
    }}
  >
    {/* Pull quote */}
    <blockquote
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.25rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: 'var(--color-text-primary)',
        margin: '0 0 1.5rem',
        padding: 0,
        border: 'none',
      }}
    >
      "Feeling that your contribution is recorded — and therefore recognised —
      is not a nice-to-have. It is the difference between belonging and tolerating.
      Between staying and leaving. Between thriving and surviving."
    </blockquote>

    <p
      style={{
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        margin: '0 0 1.75rem',
        fontStyle: 'normal',
      }}
    >
      — Judith Fontanelle, Director of Community Engagement
    </p>

    {/* Body */}
    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'var(--color-text-primary)',
        margin: '0 0 1.25rem',
      }}
    >
      Seventeen years of community work has taught me one thing above everything else.
      People do not leave communities because they are unwelcome. They leave because
      nothing recorded that they were ever there. No note of what they knew, what they
      built, what they gave. Invisible contribution is no contribution at all — not
      because it didn't happen, but because no one held up a mirror and said: look
      what you did.
    </p>

    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'var(--color-text-primary)',
        margin: '0 0 1.25rem',
      }}
    >
      This is why we built the word{' '}
      <strong style={{ color: 'var(--color-text-primary)' }}>Contribute</strong>{' '}
      into the centre of this platform. Not as a button. As a commitment.
      When a member logs in, the first question the platform asks is not
      "what do you want?" It is "what do you bring?" That shift — from
      consumer to contributor — is the whole of the philosophy in one word.
    </p>

    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'var(--color-text-primary)',
        margin: '0 0 1.25rem',
      }}
    >
      The research on recognition and mental wellbeing is not ambiguous. Communities
      where contribution is seen and recorded produce better health outcomes, stronger
      social ties, lower isolation, and higher resilience. We are not just building
      a platform. We are building the infrastructure of being seen. Every piece of
      work a member contributes — a Joystick article, a Raydyo broadcast, a session
      documented by a G-Tech Caster, a skill shared with another member — is
      permanently held here. Not as data. As evidence of a life adding to something
      larger than itself.
    </p>

    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.75,
        color: 'var(--color-text-primary)',
        margin: '0 0 1.75rem',
      }}
    >
      For the Forgotten 60% — the people who have spent decades in institutions
      and workplaces that recorded nothing about them except their deficits —
      this is not a feature. It is a correction. Wembley Wonders exists to make
      that correction, one contribution at a time.
    </p>

    {/* Closing signature line */}
    <p
      style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: 0,
        fontStyle: 'italic',
      }}
    >
      This principle shapes everything we build.{' '}
      <a
        href="/contribute"
        style={{ color: '#1D9E75', textDecoration: 'none', fontStyle: 'normal' }}
      >
        See how Contribute works on the platform →
      </a>
    </p>
  </section>
);

export default JudithContributeSection;