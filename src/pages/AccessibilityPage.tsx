import React from 'react';

// ============================================
// ACCESSIBILITY STATEMENT — Wembley Wonders CIC
// UK Equality Act 2010 & Public Sector Bodies
// Accessibility Regulations 2018 compliance
// ============================================

const C = {
  bg: 'rgba(51, 65, 85, 0.3)',
  bgCard: 'rgba(30, 41, 59, 0.6)',
  border: 'rgba(148, 163, 184, 0.12)',
  text: '#cbd5e1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textBright: '#f8fafc',
  accent: '#4ade80',
  accentDim: 'rgba(74, 222, 128, 0.15)',
  amber: '#fbbf24',
};

const sectionStyle: React.CSSProperties = {
  background: C.bgCard,
  border: `1px solid ${C.border}`,
  borderRadius: '1rem',
  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  marginBottom: '1.5rem',
};

const headingStyle: React.CSSProperties = {
  color: C.amber,
  fontSize: '1.15rem',
  fontWeight: 500,
  margin: '0 0 1rem 0',
  fontFamily: "'Outfit', sans-serif",
  letterSpacing: '0.02em',
};

const paraStyle: React.CSSProperties = {
  color: C.text,
  fontSize: '0.95rem',
  lineHeight: 1.8,
  margin: '0 0 1rem 0',
};

const listStyle: React.CSSProperties = {
  color: C.text,
  fontSize: '0.95rem',
  lineHeight: 1.8,
  margin: '0 0 1rem 0',
  paddingLeft: '1.5rem',
};

const AccessibilityPage: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: C.text,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.8))',
        borderBottom: `1px solid ${C.border}`,
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(2rem, 5vw, 3rem)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: C.accent,
          marginBottom: '0.75rem',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
        }}>
          Accessibility
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 300,
          color: C.textBright,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2,
        }}>
          Accessibility Statement
        </h1>
        <p style={{
          color: C.textMuted,
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: "'Outfit', sans-serif",
        }}>
          Our commitment to making Wembley Wonders accessible to everyone
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
      }}>

        {/* Our Commitment */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Our Commitment</h2>
          <p style={paraStyle}>
            Wembley Wonders CIC is committed to ensuring digital accessibility for people of 
            all abilities. We serve the "Forgotten 60%" — working-class communities often excluded 
            from traditional tech education. That mission extends to this website. Everyone who 
            visits should be able to access our programmes, read our content, and engage with 
            our community tools regardless of disability, impairment, or the technology they use.
          </p>
          <p style={paraStyle}>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. 
            These guidelines explain how to make web content more accessible to people with a 
            wide range of disabilities, including visual, hearing, motor, and cognitive impairments.
          </p>
        </div>

        {/* What We Do */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>What We Do</h2>
          <p style={paraStyle}>We have taken the following steps to ensure accessibility:</p>
          <ul style={listStyle}>
            <li style={{ marginBottom: '0.5rem' }}>All pages use semantic HTML with proper heading structure</li>
            <li style={{ marginBottom: '0.5rem' }}>Interactive elements are keyboard-navigable</li>
            <li style={{ marginBottom: '0.5rem' }}>Colour contrast ratios meet WCAG AA standards against our dark theme</li>
            <li style={{ marginBottom: '0.5rem' }}>Images include alternative text descriptions</li>
            <li style={{ marginBottom: '0.5rem' }}>Forms include associated labels and error descriptions</li>
            <li style={{ marginBottom: '0.5rem' }}>The site is usable at 200% zoom without loss of content</li>
            <li style={{ marginBottom: '0.5rem' }}>Our Rayd-yo audio content includes transcripts where available</li>
            <li style={{ marginBottom: '0.5rem' }}>Workshop materials are available in alternative formats on request</li>
          </ul>
        </div>

        {/* Known Limitations */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Known Limitations</h2>
          <p style={paraStyle}>
            We are aware of the following accessibility limitations and are actively working 
            to address them:
          </p>
          <ul style={listStyle}>
            <li style={{ marginBottom: '0.5rem' }}>Some older PDF documents may not be fully screen-reader compatible — we are converting these to accessible formats</li>
            <li style={{ marginBottom: '0.5rem' }}>Live Zoom session content relies on Zoom's built-in accessibility features including auto-captioning</li>
            <li style={{ marginBottom: '0.5rem' }}>Some interactive sandbox activities may have limited keyboard navigation — we are improving these progressively</li>
            <li style={{ marginBottom: '0.5rem' }}>Third-party embedded content (such as social media feeds) may not meet our accessibility standards</li>
          </ul>
        </div>

        {/* Assistive Technology */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Assistive Technology</h2>
          <p style={paraStyle}>
            This website has been tested with the following assistive technologies:
          </p>
          <ul style={listStyle}>
            <li style={{ marginBottom: '0.5rem' }}>NVDA screen reader with Firefox</li>
            <li style={{ marginBottom: '0.5rem' }}>VoiceOver with Safari on macOS and iOS</li>
            <li style={{ marginBottom: '0.5rem' }}>Keyboard-only navigation across major browsers</li>
            <li style={{ marginBottom: '0.5rem' }}>Browser zoom up to 400%</li>
          </ul>
        </div>

        {/* Alternative Formats */}
        <div style={{
          ...sectionStyle,
          background: C.accentDim,
          border: `1px solid rgba(74, 222, 128, 0.2)`,
        }}>
          <h2 style={{ ...headingStyle, color: C.accent }}>Need an Alternative Format?</h2>
          <p style={paraStyle}>
            If you need information from this website in a different format — large print, 
            audio, easy read, or braille — please contact us and we will do our best to 
            accommodate your needs. We aim to respond to accessibility requests within 
            5 working days.
          </p>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            We also welcome requests for British Sign Language interpretation at our events. 
            Please give us at least two weeks' notice where possible.
          </p>
        </div>

        {/* Reporting Issues */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Reporting Accessibility Issues</h2>
          <p style={paraStyle}>
            We want to hear from you if you encounter any accessibility barriers on this website. 
            Please contact us:
          </p>
          <div style={{
            background: C.bg,
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '1rem',
          }}>
            <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Email</div>
            <div style={{ color: C.textBright, fontSize: '0.95rem' }}>admin@wembleywonders.org</div>
          </div>
          <div style={{
            background: C.bg,
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
            marginBottom: '1rem',
          }}>
            <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Phone</div>
            <div style={{ color: C.textBright, fontSize: '0.95rem' }}>0208 902 9991</div>
          </div>
          <div style={{
            background: C.bg,
            borderRadius: '0.75rem',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Post</div>
            <div style={{ color: C.textBright, fontSize: '0.95rem' }}>
              Wembley Wonders CIC, Flat 2, 452 High Road, Wembley HA9 7AY
            </div>
          </div>
        </div>

        {/* Enforcement */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Enforcement</h2>
          <p style={paraStyle}>
            If you are not satisfied with our response to your accessibility concern, you can 
            contact the Equality Advisory Support Service (EASS) at{' '}
            <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer"
              style={{ color: C.accent, textDecoration: 'underline' }}>
              equalityadvisoryservice.com
            </a>
            . The Equality and Human Rights Commission (EHRC) is responsible for enforcing the 
            Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018.
          </p>
        </div>

        {/* Footer meta */}
        <div style={{
          textAlign: 'center',
          color: C.textDim,
          fontSize: '0.8rem',
          fontFamily: "'Outfit', sans-serif",
          paddingTop: '1rem',
          borderTop: `1px solid ${C.border}`,
        }}>
          This statement was prepared on 14 February 2026 and was last reviewed on 14 February 2026.
          <br />
          Wembley Wonders CIC · Company No. 12960817
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default AccessibilityPage;
