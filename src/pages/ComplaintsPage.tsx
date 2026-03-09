import React from 'react';

// ============================================
// COMPLAINTS PROCEDURE — Wembley Wonders CIC
// CIC Regulator best practice compliance
// Includes safeguarding escalation pathway
// ============================================

const C = {
  bg: 'rgba(51, 65, 85, 0.3)',
  bgCard: 'rgba(30, 41, 59, 0.6)',
  border: 'rgba(148, 163, 184, 0.12)',
  text: '#cbd5e1',
  textMuted: '#94a3b8',
  textDim: '#64748b',
  textBright: '#f8fafc',
  accent: '#f472b6',
  accentDim: 'rgba(244, 114, 182, 0.12)',
  amber: '#fbbf24',
  red: '#f87171',
  redDim: 'rgba(248, 113, 113, 0.12)',
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

const stages = [
  {
    number: '1',
    title: 'Informal Resolution',
    timeframe: 'Within 5 working days',
    colour: '#4ade80',
    content: 'We encourage you to raise concerns informally first. Speak to any member of the Wembley Wonders team — a workshop facilitator, volunteer, or programme lead. Many issues can be resolved through an honest conversation. If you\'re not sure who to speak to, email admin@wembleywonders.org and we\'ll direct you to the right person.',
  },
  {
    number: '2',
    title: 'Formal Complaint',
    timeframe: 'Acknowledgement within 3 working days · Response within 15 working days',
    colour: '#fbbf24',
    content: 'If informal resolution doesn\'t resolve your concern, or the matter is too serious for informal handling, submit a formal complaint in writing. Include what happened, when it happened, who was involved, and what outcome you are seeking. Send your complaint to admin@wembleywonders.org with the subject line "Formal Complaint" or post it to our registered address. We will acknowledge receipt within 3 working days and provide a full written response within 15 working days.',
  },
  {
    number: '3',
    title: 'Director Review',
    timeframe: 'Within 20 working days of escalation',
    colour: '#f59e0b',
    content: 'If you are not satisfied with the response at Stage 2, you may escalate to a Director review. Your complaint will be reviewed by a director who was not involved in the original decision. The reviewing director will consider the original complaint, the response given, and any new information you provide. You will receive a written decision within 20 working days.',
  },
  {
    number: '4',
    title: 'External Referral',
    timeframe: 'At any time',
    colour: '#f87171',
    content: 'If you remain dissatisfied after the Director review, or at any point during the process, you have the right to refer your complaint to an external body. This does not affect your right to take legal action.',
  },
];

const directors = [
  {
    name: 'Judith Fontanelle',
    role: 'Community Engagement & Safeguarding',
    handles: 'Safeguarding concerns, participant welfare, community relations',
    colour: '#f472b6',
  },
  {
    name: 'Flora Agba',
    role: 'Health & Safety',
    handles: 'Health and safety incidents, venue concerns, physical wellbeing',
    colour: '#4ade80',
  },
  {
    name: 'Michael Franklin',
    role: 'Business & Non-Profit Operations',
    handles: 'Financial concerns, governance issues, partnership disputes',
    colour: '#0ea5e9',
  },
];

const ComplaintsPage: React.FC = () => {
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
          Governance
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 300,
          color: C.textBright,
          margin: '0 0 0.75rem 0',
          lineHeight: 1.2,
        }}>
          Complaints Procedure
        </h1>
        <p style={{
          color: C.textMuted,
          fontSize: '1rem',
          maxWidth: '650px',
          margin: '0 auto',
          fontFamily: "'Outfit', sans-serif",
        }}>
          How to raise a concern, how we'll handle it, and what to do if you're not satisfied
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 4rem)',
      }}>

        {/* Our Promise */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Our Promise</h2>
          <p style={paraStyle}>
            Wembley Wonders CIC values feedback from our community. Complaints help us improve. 
            We promise to treat every complaint seriously, investigate it fairly, respond in a 
            timely manner, and learn from the outcome. No one will be treated less favourably 
            for making a complaint in good faith.
          </p>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            This procedure covers complaints about our programmes, staff, volunteers, facilities, 
            events, and any aspect of the service we provide. It does not cover complaints about 
            matters outside our control, such as decisions made by external funders or partner 
            organisations.
          </p>
        </div>

        {/* The Four Stages */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{
            ...headingStyle,
            textAlign: 'center',
            fontSize: '1.3rem',
            marginBottom: '1.5rem',
          }}>
            The Process
          </h2>

          {stages.map((stage, i) => (
            <div key={i} style={{
              ...sectionStyle,
              borderLeft: `3px solid ${stage.colour}`,
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: `${stage.colour}22`,
                  border: `2px solid ${stage.colour}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stage.colour,
                  fontWeight: 700,
                  fontSize: '1rem',
                  fontFamily: "'Outfit', sans-serif",
                  flexShrink: 0,
                }}>
                  {stage.number}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: C.textBright,
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    margin: '0 0 0.25rem 0',
                  }}>
                    Stage {stage.number}: {stage.title}
                  </h3>
                  <div style={{
                    color: stage.colour,
                    fontSize: '0.75rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    marginBottom: '0.75rem',
                    letterSpacing: '0.02em',
                  }}>
                    {stage.timeframe}
                  </div>
                  <p style={{ ...paraStyle, marginBottom: 0 }}>{stage.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Who Handles What */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Who Handles What</h2>
          <p style={paraStyle}>
            Depending on the nature of your complaint, it will be directed to the appropriate director:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {directors.map((director, i) => (
              <div key={i} style={{
                background: C.bg,
                borderRadius: '0.75rem',
                padding: '1.25rem 1.5rem',
                borderLeft: `3px solid ${director.colour}`,
              }}>
                <div style={{
                  color: C.textBright,
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '0.15rem',
                }}>
                  {director.name}
                </div>
                <div style={{
                  color: director.colour,
                  fontSize: '0.8rem',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 500,
                  marginBottom: '0.5rem',
                }}>
                  {director.role}
                </div>
                <div style={{
                  color: C.textMuted,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}>
                  {director.handles}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safeguarding */}
        <div style={{
          ...sectionStyle,
          background: C.redDim,
          border: `1px solid rgba(248, 113, 113, 0.25)`,
        }}>
          <h2 style={{ ...headingStyle, color: C.red }}>Safeguarding Concerns</h2>
          <p style={paraStyle}>
            If your complaint involves the safety or welfare of a child or vulnerable adult, 
            it will be treated as a safeguarding concern and handled under our{' '}
            <a href="/safeguarding" style={{ color: C.red, textDecoration: 'underline' }}>
              Safeguarding Policy
            </a>
            . Safeguarding concerns take priority over the normal complaints timeline and will 
            be acted upon immediately.
          </p>
          <p style={{ ...paraStyle, marginBottom: 0 }}>
            Our Designated Safeguarding Lead is <strong style={{ color: C.textBright }}>Judith Fontanelle</strong>. 
            In an emergency, always contact the police (999) or local authority children's services first.
          </p>
        </div>

        {/* External Bodies */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>External Bodies</h2>
          <p style={paraStyle}>
            If you are not satisfied with our response at any stage, you may contact the 
            following external organisations:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                body: 'CIC Regulator',
                reason: 'Concerns about whether we are meeting our community interest obligations',
                url: 'https://www.gov.uk/government/organisations/office-of-the-regulator-of-community-interest-companies',
              },
              {
                body: 'Charity Commission',
                reason: 'Concerns about governance or misuse of funds (if applicable)',
                url: 'https://www.gov.uk/government/organisations/charity-commission',
              },
              {
                body: 'Information Commissioner\'s Office (ICO)',
                reason: 'Concerns about how we handle personal data',
                url: 'https://ico.org.uk',
              },
              {
                body: 'Brent Council',
                reason: 'Concerns about safeguarding or services for children and young people',
                url: 'https://www.brent.gov.uk',
              },
            ].map((ext, i) => (
              <div key={i} style={{
                background: C.bg,
                borderRadius: '0.75rem',
                padding: '1rem 1.25rem',
              }}>
                <a href={ext.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    color: C.textBright,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}>
                  {ext.body} →
                </a>
                <div style={{
                  color: C.textMuted,
                  fontSize: '0.85rem',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}>
                  {ext.reason}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Submit */}
        <div style={{
          ...sectionStyle,
          background: C.accentDim,
          border: `1px solid rgba(244, 114, 182, 0.2)`,
        }}>
          <h2 style={{ ...headingStyle, color: C.accent }}>How to Submit a Complaint</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
            }}>
              <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Email (preferred)</div>
              <div style={{ color: C.textBright, fontSize: '0.95rem' }}>admin@wembleywonders.org</div>
              <div style={{ color: C.textDim, fontSize: '0.8rem', marginTop: '0.25rem' }}>Subject line: "Formal Complaint"</div>
            </div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
            }}>
              <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Phone</div>
              <div style={{ color: C.textBright, fontSize: '0.95rem' }}>0208 902 9991</div>
            </div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
            }}>
              <div style={{ color: C.textMuted, fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.25rem' }}>Post</div>
              <div style={{ color: C.textBright, fontSize: '0.95rem' }}>
                Wembley Wonders CIC, Flat 2, 452 High Road, Wembley HA9 7AY
              </div>
              <div style={{ color: C.textDim, fontSize: '0.8rem', marginTop: '0.25rem' }}>Mark envelope: "Complaint — Confidential"</div>
            </div>
          </div>
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
          This procedure was approved by the Board of Directors on 14 February 2026.
          <br />
          Next review date: February 2027
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

export default ComplaintsPage;
