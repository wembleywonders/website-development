import React from 'react';

// ============================================
// COOKIE POLICY — Wembley Wonders CIC
// Privacy and Electronic Communications
// Regulations (PECR) compliance
// ============================================

const C = {
  bg: 'rgba(51, 65, 85, 0.3)',
  bgCard: 'rgba(30, 41, 59, 0.6)',
  border: 'rgba(148, 163, 184, 0.12)',
  text: '#cbd5e1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textBright: '#f8fafc',
  accent: '#0ea5e9',
  accentDim: 'rgba(14, 165, 233, 0.12)',
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

const cookieTypes = [
  {
    name: 'Strictly Necessary',
    badge: 'Always Active',
    badgeColor: '#4ade80',
    cookies: [
      { cookie: 'session_id', purpose: 'Maintains your login session so you don\'t have to sign in on every page', duration: 'Session (cleared when you close the browser)' },
      { cookie: 'csrf_token', purpose: 'Protects forms from cross-site request forgery attacks', duration: 'Session' },
      { cookie: 'cookie_consent', purpose: 'Records your cookie preferences so we don\'t ask you again', duration: '12 months' },
    ],
    description: 'These cookies are essential for the website to function. They cannot be disabled. They are set in response to actions you take — logging in, filling in forms, or setting your privacy preferences.',
  },
  {
    name: 'Functional',
    badge: 'Optional',
    badgeColor: '#0ea5e9',
    cookies: [
      { cookie: 'theme_preference', purpose: 'Remembers your display preferences (e.g. font size)', duration: '12 months' },
      { cookie: 'programme_filter', purpose: 'Remembers which programme you last viewed in the sessions page', duration: '30 days' },
      { cookie: 'maya_context', purpose: 'Maintains conversation context with Maya AI assistant during your visit', duration: 'Session' },
    ],
    description: 'These cookies enable enhanced functionality and personalisation. If you disable them, some features may not work as smoothly, but the site will still function.',
  },
  {
    name: 'Analytics',
    badge: 'Optional',
    badgeColor: '#a855f7',
    cookies: [
      { cookie: '_analytics_id', purpose: 'Helps us understand how visitors use the site so we can improve it. We use privacy-respecting analytics that do not track you across other websites.', duration: '12 months' },
      { cookie: '_session_count', purpose: 'Counts the number of visits to help us understand engagement', duration: '30 days' },
    ],
    description: 'These cookies help us understand how people use the website. All data is aggregated and anonymous. We do not use Google Analytics or any tool that shares data with advertising networks.',
  },
];

const CookiePolicyPage: React.FC = () => {
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
          Legal
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 300,
          color: C.textBright,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2,
        }}>
          Cookie Policy
        </h1>
        <p style={{
          color: C.textMuted,
          fontSize: '1rem',
          maxWidth: '600px',
          margin: '0 auto',
          fontFamily: "'Outfit', sans-serif",
        }}>
          How we use cookies and similar technologies on this website
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
      }}>

        {/* What Are Cookies */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>What Are Cookies?</h2>
          <p style={paraStyle}>
            Cookies are small text files placed on your device when you visit a website. They 
            help the site remember your preferences and understand how you use it. Some cookies 
            are essential for the site to work; others help us improve your experience.
          </p>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            This policy explains which cookies we use, why we use them, and how you can 
            control them. Wembley Wonders CIC does not use cookies for advertising, 
            does not sell data to third parties, and does not track you across other websites.
          </p>
        </div>

        {/* Cookie Types */}
        {cookieTypes.map((type, i) => (
          <div key={i} style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <h2 style={{ ...headingStyle, marginBottom: 0 }}>{type.name} Cookies</h2>
              <span style={{
                background: `${type.badgeColor}22`,
                color: type.badgeColor,
                fontSize: '0.7rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '1rem',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {type.badge}
              </span>
            </div>
            <p style={paraStyle}>{type.description}</p>

            {/* Cookie table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {type.cookies.map((cookie, j) => (
                <div key={j} style={{
                  background: C.bg,
                  borderRadius: '0.75rem',
                  padding: '1rem 1.25rem',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}>
                    <code style={{
                      color: C.textBright,
                      fontSize: '0.85rem',
                      background: 'rgba(148, 163, 184, 0.1)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontFamily: "'Courier New', monospace",
                    }}>
                      {cookie.cookie}
                    </code>
                    <span style={{
                      color: C.textDim,
                      fontSize: '0.75rem',
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {cookie.duration}
                    </span>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    {cookie.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* How to Control */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>How to Control Cookies</h2>
          <p style={paraStyle}>
            Most web browsers allow you to manage cookies through their settings. You can:
          </p>
          <ul style={{
            color: C.text,
            fontSize: '0.95rem',
            lineHeight: 1.8,
            margin: '0 0 1rem 0',
            paddingLeft: '1.5rem',
          }}>
            <li style={{ marginBottom: '0.5rem' }}>View and delete individual cookies</li>
            <li style={{ marginBottom: '0.5rem' }}>Block all cookies or cookies from specific sites</li>
            <li style={{ marginBottom: '0.5rem' }}>Set your browser to notify you when a cookie is being set</li>
            <li style={{ marginBottom: '0.5rem' }}>Block third-party cookies while allowing first-party cookies</li>
          </ul>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            Please note that blocking strictly necessary cookies will prevent parts of this 
            website from functioning correctly. If you need help managing cookies, contact us 
            at admin@wembleywonders.org and we'll guide you through the process.
          </p>
        </div>

        {/* Third-Party Services */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Third-Party Services</h2>
          <p style={paraStyle}>
            Where we embed content from third-party services (such as Zoom for workshop sessions 
            or YouTube for video content), those services may set their own cookies. We have no 
            control over these cookies. Please refer to the relevant third-party privacy policies:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { name: 'Zoom', url: 'https://zoom.us/privacy' },
              { name: 'YouTube', url: 'https://policies.google.com/privacy' },
              { name: 'Google Workspace', url: 'https://policies.google.com/privacy' },
            ].map((service, i) => (
              <a key={i} href={service.url} target="_blank" rel="noopener noreferrer"
                style={{
                  color: C.accent,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                {service.name} Privacy Policy →
              </a>
            ))}
          </div>
        </div>

        {/* Contact & Updates */}
        <div style={{
          ...sectionStyle,
          background: C.accentDim,
          border: `1px solid rgba(14, 165, 233, 0.2)`,
        }}>
          <h2 style={{ ...headingStyle, color: C.accent }}>Questions About This Policy?</h2>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            If you have questions about how we use cookies, please contact us at{' '}
            <a href="mailto:admin@wembleywonders.org" style={{ color: C.accent }}>
              admin@wembleywonders.org
            </a>{' '}
            or call 0208 902 9991. We will update this policy if our cookie usage changes 
            and will note the date of the most recent update below.
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
          Last updated: 14 February 2026
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

export default CookiePolicyPage;
