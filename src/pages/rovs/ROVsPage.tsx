
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ROVsPage.css';

const ROVS = [
  { id: 'maya',     icon: '✦', name: 'Maya',        colour: '#1D9E75',
    role: 'Router and receptionist',
    desc: 'Maya is the first point of contact. She routes members to the right ROV, holds conversation context across pages, and surfaces relevant information based on where you are and what you have done.',
    programmes: [],
    persona: 'Calm, precise, warm. Never performative. Knows when to step back.',
  },
  { id: 'narrator', icon: '📡', name: 'The Narrator', colour: '#3b82f6',
    role: 'Broadcast, editorial and media',
    desc: 'The Narrator guides G-Tech Casters, Rayd-yo hosts, Joystick contributors, and Easy Street writers. Understands field journalism, broadcast ethics, editorial standards, and the difference between a story and a report.',
    programmes: ['G-Tech Casters','Rayd-yo','Joystick','Easy Street','Trubble n Bass'],
    persona: 'Direct. Editorially rigorous. Respects the craft. Does not tolerate vagueness about facts.',
  },
  { id: 'maker',    icon: '🔧', name: 'The Maker',   colour: '#f59e0b',
    role: 'Technical builds and STEMgineers',
    desc: 'The Maker supports STEMgineers members through technical builds, problem-solving, and documentation. Understands that the build log is as important as the build itself.',
    programmes: ['STEMgineers'],
    persona: 'Patient with process. Exacting about documentation. Celebrates iteration, not just completion.',
  },
  { id: 'merchant', icon: '💳', name: 'The Merchant', colour: '#8b5cf6',
    role: 'Commerce, Cyberstore, and TECHreneurs',
    desc: 'The Merchant guides TECHreneurs members through listings, pricing, client relationships, and the 55/25/20 model. Understands the difference between a hobby and a business.',
    programmes: ['TECHreneurs'],
    persona: 'Commercially literate. No-nonsense about money. Respects ambition, challenges vagueness.',
  },
  { id: 'keeper',   icon: '🌿', name: 'The Keeper',  colour: '#10b981',
    role: 'Heritage, archive, and cultural knowledge',
    desc: 'The Keeper supports Roots, Pageturners, and Auntie Anansi’s Kitchen members. Understands oral history, consent protocols, evidence grading, and the weight of what is being preserved.',
    programmes: ["Roots","Pageturners","Auntie Anansi\u2019s Kitchen"],
    persona: 'Reverent without being precious. Understands that community knowledge has a different standard of evidence than academic knowledge.',
  },
  { id: 'weaver',   icon: '🕸', name: 'The Weaver',  colour: '#ec4899',
    role: 'Community cohesion and cross-programme connection',
    desc: 'The Weaver sees the whole system. Supports Silk Stilettos and Kaywana’s Court members, and watches the cross-pollination rate across all programmes. Judith’s ROV.',
    programmes: ["Silk Stilettos","Kaywana’s Court"],
    persona: 'Sees patterns others miss. Connects people who should know each other. Never forces connections that are not ready.',
  },
  { id: 'spark',    icon: '✨', name: 'The Spark',   colour: '#f97316',
    role: 'Discovery and first steps',
    desc: 'The Spark runs Bright Sparks — the discovery phase that every Wembley Wonders journey starts with. Meets members where they are. Does not assume prior knowledge or prior confidence.',
    programmes: ['Bright Sparks'],
    persona: 'Genuinely curious. Finds what is interesting in every person. Never makes anyone feel behind.',
  },
  { id: 'guardian', icon: '🛡', name: 'The Guardian', colour: '#ef4444',
    role: 'Safeguarding, consent, and field safety',
    desc: 'The Guardian co-signs heritage badges, flags welfare concerns, escalates Guardian keywords from email and field communications, and ensures the buddy system is applied correctly. Flora’s ROV.',
    programmes: [],
    persona: 'Steady under pressure. Does not dramatise risk. Does not minimise it either.',
  },
  { id: 'elder',    icon: '◈', name: 'The Elder',    colour: '#d4a853',
    role: 'Mature learning, knowledge keeper income stream',
    desc: 'The Elder supports the knowledge keeper income stream — connecting elder members with opportunities to contribute their expertise, and ensuring their contributions are documented, credited, and compensated appropriately.',
    programmes: [],
    persona: 'Patient with time. Understands that wisdom is not the same as information.',
  },
];

const ROVsPage: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="rovs-page">
      <div className="rovs-header">
        <h1 className="rovs-title">The Children of Anansi</h1>
        <p className="rovs-subtitle">
          Nine ROVs — Responsive Operational Voices — each with a domain, a character, and a purpose.
          Maya routes. The others guide. The Guardian protects. The Elder remembers.
        </p>
      </div>

      <div className="rovs-grid">
        {ROVS.map(rov => (
          <div
            key={rov.id}
            className={'rovs-card' + (active === rov.id ? ' expanded' : '')}
            style={{'--rc': rov.colour} as React.CSSProperties}
            onClick={() => setActive(active === rov.id ? null : rov.id)}
          >
            <div className="rovs-card-header">
              <span className="rovs-icon">{rov.icon}</span>
              <div className="rovs-card-meta">
                <span className="rovs-name">{rov.name}</span>
                <span className="rovs-role">{rov.role}</span>
              </div>
              <span className="rovs-expand">{active === rov.id ? '−' : '+'}</span>
            </div>

            {active === rov.id && (
              <div className="rovs-card-body">
                <p className="rovs-desc">{rov.desc}</p>
                <div className="rovs-persona">
                  <span className="rovs-persona-label">Character</span>
                  <p>{rov.persona}</p>
                </div>
                {rov.programmes.length > 0 && (
                  <div className="rovs-programmes">
                    <span className="rovs-programmes-label">Programmes</span>
                    <div className="rovs-programme-tags">
                      {rov.programmes.map(p => (
                        <span key={p} className="rovs-programme-tag">{p}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rovs-footer">
        <p className="rovs-footer-note">
          ROVs are not chatbots. They are operational voices — each with a defined domain,
          a consistent character, and a specific relationship with the member.
          Maya coordinates. The nine Children of Anansi do the work.
        </p>
        <Link to="/programmes" className="rovs-cta">See the 13 programmes →</Link>
      </div>
    </div>
  );
};

export default ROVsPage;
