import React, { useState } from 'react';
import PageTemplate from '../../../components/PageTemplate';
import PageMeta from '../../../components/PageMeta';
import { MODULES, SESSION_PLANS, PROGRESSION_LEVELS } from './curriculum/curriculumData';
import type { ProgressionLevel, SubjectArea } from './curriculum/curriculumData';
import './STEMgeneersPage.css';

// ─── Subject config — adapted to dark palette ────────────────────────────────

const SUBJECT_CONFIG: Record<SubjectArea, { label: string; colour: string }> = {
  'biology':            { label: 'Biology',              colour: '#10b981' },
  'chemistry':          { label: 'Chemistry',            colour: '#8b5cf6' },
  'physics':            { label: 'Physics',              colour: '#3b82f6' },
  'mathematics':        { label: 'Mathematics',          colour: '#fbbf24' },
  'earth-science':      { label: 'Earth & environment',  colour: '#10b981' },
  'astronomy':          { label: 'Astronomy',            colour: '#8b5cf6' },
  'computing':          { label: 'Computing',            colour: '#3b82f6' },
  'engineering':        { label: 'Engineering',          colour: '#f87171' },
  'history-of-science': { label: 'History of science',   colour: '#94a3b8' },
  'health-community':   { label: 'Health & community',   colour: '#f472b6' },
};

const LEVEL_COLOURS: Record<ProgressionLevel, string> = {
  explorer:     '#10b981',
  investigator: '#3b82f6',
  analyst:      '#8b5cf6',
  challenger:   '#fbbf24',
  architect:    '#f87171',
};

// ─── Curriculum hero — sits below the existing page hero ────────────────────

function CurriculumHero() {
  return (
    <div className="sgc-curriculum-hero">
      <div className="sgc-ch-badge">Curriculum programme</div>
      <h2 className="sgc-ch-title">
        Your grandmother already knew the science.
        <span className="sgc-ch-accent"> We're teaching you why.</span>
      </h2>
      <p className="sgc-ch-sub">
        Ten subject areas. Five progression levels. Every lesson starts in your kitchen.
        Every discovery goes into a community knowledge repository your family owns.
      </p>
      <div className="sgc-ch-stats">
        {[
          { num: '10', label: 'Subject areas' },
          { num: '95', label: 'Min per session' },
          { num: '20', label: 'Min per module' },
          { num: 'KS2–4', label: 'Key stages' },
        ].map(s => (
          <div key={s.label} className="ls-item">
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="sgc-ch-ctas">
        <a href="/programmes/stemgeneers/session" className="cta-primary">
          Join a live session
        </a>
        <a href="#sgc-sessions" className="cta-secondary">
          Explore the curriculum
        </a>
      </div>
    </div>
  );
}

// ─── Philosophy ──────────────────────────────────────────────────────────────

function PhilosophySection() {
  const principles = [
    {
      icon: '🏠',
      title: 'The lab is already in your house',
      body: 'Salt, vinegar, a rubber duck, a tin of shoe polish. No specialist equipment. No school required. The science is in the household objects your family already uses.',
    },
    {
      icon: '👵',
      title: "Your family's knowledge is the curriculum",
      body: "The grandmother's herb knowledge. The grandfather's polishing technique. The traditional recipe that encodes pharmacology. STEMgeneers names the science that's already there.",
    },
    {
      icon: '⚗️',
      title: 'The periodic table explains everything',
      body: 'Every module arrives at an element on the table — not as an abstract symbol to memorise but as the reason something real works. Nitrogen explains alkaloids. Sulphur explains keratin. Iron explains blood.',
    },
    {
      icon: '🔐',
      title: 'Knowledge stays with the community',
      body: "Everything documented through STEMgeneers goes into the community knowledge repository. Attributed. Protected. Commercially governed by the platform's 55/25/20 model.",
    },
  ];

  return (
    <div className="programme-section">
      <h2>Science didn't begin in Europe and it doesn't end in a classroom</h2>
      <p className="section-intro">
        The curriculum is built on a single premise: the knowledge your family already holds
        is empirical science. STEMgeneers provides the framework to name it, protect it, and
        connect it to the periodic table.
      </p>
      <div className="heritage-grid">
        {principles.map((p, i) => (
          <div key={i} className="heritage-card">
            <span className="heritage-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module card ─────────────────────────────────────────────────────────────

function ModuleCard({ mod, isLast }: { mod: (typeof MODULES)[string]; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const primarySubject = mod.subjectAreas[0] as SubjectArea;
  const subjectConf = SUBJECT_CONFIG[primarySubject] || { label: primarySubject, colour: '#94a3b8' };

  return (
    <div className="sgc-module-card">
      <div className="sgc-module-marker">
        <div className="sgc-module-dot" style={{ borderColor: subjectConf.colour, boxShadow: `0 0 6px ${subjectConf.colour}40` }} />
        {!isLast && <div className="sgc-module-line" />}
      </div>
      <div className="sgc-module-body">
        <div className="sgc-module-meta" onClick={() => setExpanded(!expanded)}>
          <div className="sgc-module-tags">
            <span className="sgc-module-duration">{mod.duration}m</span>
            <span className="sgc-subject-tag" style={{ color: subjectConf.colour, borderColor: `${subjectConf.colour}40`, background: `${subjectConf.colour}12` }}>
              {subjectConf.label}
            </span>
            {mod.fiveCs.map((c, i) => (
              <span key={i} className={`sgc-5c sgc-5c-${String(c).toLowerCase()}`}>{c}</span>
            ))}
          </div>
          <button className="sgc-expand-btn" aria-label={expanded ? 'Collapse' : 'Expand'}>
            {expanded ? '−' : '+'}
          </button>
        </div>
        <h4 className="sgc-module-title">{mod.title}</h4>
        <p className="sgc-module-tagline">{mod.tagline}</p>

        {expanded && (
          <div className="sgc-module-detail">
            {mod.wrongObviousAnswer && (
              <div className="sgc-detail-block sgc-wrong">
                <span className="sgc-detail-label">Common assumption</span>
                <p>{mod.wrongObviousAnswer}</p>
              </div>
            )}
            <div className="sgc-detail-block sgc-answer">
              <span className="sgc-detail-label">The science</span>
              <p>{mod.realAnswer}</p>
            </div>
            {mod.periodicElements.length > 0 && (
              <div className="sgc-detail-block">
                <span className="sgc-detail-label">Periodic table</span>
                <div className="sgc-elements-row">
                  {mod.periodicElements.map(el => (
                    <div key={el.symbol} className="sgc-element">
                      <span className="sgc-el-symbol">{el.symbol}</span>
                      <span className="sgc-el-name">{el.name}</span>
                      <span className="sgc-el-pos">Gp{el.group}·P{el.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {mod.communityKnowledge.length > 0 && (
              <div className="sgc-detail-block">
                <span className="sgc-detail-label">Community knowledge</span>
                {mod.communityKnowledge.slice(0, 2).map((ck, i) => (
                  <div key={i} className="sgc-ck-item">
                    <span className="sgc-ck-tradition">{ck.tradition}</span>
                    <span className="sgc-ck-practice">{ck.practice}</span>
                  </div>
                ))}
              </div>
            )}
            {mod.householdExperiment && (
              <div className="sgc-detail-block">
                <span className="sgc-detail-label">Household experiment — {mod.householdExperiment.title}</span>
                <div className="sgc-materials">
                  {mod.householdExperiment.materials.map((m, i) => (
                    <span key={i} className="sgc-material">{m}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="sgc-detail-block sgc-maya-block">
              <span className="sgc-detail-label">Maya's opening</span>
              <blockquote className="sgc-maya-quote">{mod.mayaOpeningFrame}</blockquote>
            </div>
            <div className="sgc-retrieval">
              <span className="sgc-detail-label">Retrieval prompt</span>
              <p>{mod.retrievalPrompt}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sessions ────────────────────────────────────────────────────────────────

function SessionsSection() {
  const [activeSession, setActiveSession] = useState('session-1');
  const session = SESSION_PLANS[activeSession];
  const sessionModules = session.modules.map(id => MODULES[id]).filter(Boolean);

  return (
    <div className="programme-section" id="sgc-sessions">
      <h2>95-minute sessions built from 20-minute modules</h2>
      <p className="section-intro">
        Each session holds five modules. Each module stands alone for homeschooling families.
        Every module connects household science to community knowledge to the periodic table.
      </p>

      <div className="sgc-session-tabs">
        {Object.values(SESSION_PLANS).map(s => (
          <button
            key={s.id}
            className={`sgc-session-tab ${activeSession === s.id ? 'active' : ''}`}
            onClick={() => setActiveSession(s.id)}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="sgc-session-detail">
        <div className="sgc-session-meta">
          <p className="sgc-session-sub">{session.subtitle}</p>
          <p className="sgc-session-objective">{session.sessionObjective}</p>
        </div>
        <div className="sgc-module-timeline">
          {sessionModules.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} isLast={i === sessionModules.length - 1} />
          ))}
        </div>
        <div className="sgc-session-outputs">
          <div>
            <h4 className="sgc-outputs-label">Platform outputs</h4>
            <ul className="sgc-outputs-list">
              {session.platformOutputs.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="sgc-outputs-label">Homeschooling evidence</h4>
            <ul className="sgc-outputs-list">
              {session.homeschoolingEvidence.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progression ─────────────────────────────────────────────────────────────

function ProgressionSection() {
  return (
    <div className="programme-section" id="sgc-progression">
      <h2>Five levels — from kitchen observation to community governance</h2>
      <p className="section-intro">
        The same household experiment works at every level. What changes is the depth of
        explanation, the structural questions asked, and the quality of the output produced.
      </p>
      <div className="sgc-progression-track">
        {PROGRESSION_LEVELS.map((level, i) => (
          <div key={level.id} className="sgc-level-card" style={{ borderLeftColor: LEVEL_COLOURS[level.id] }}>
            <div className="sgc-level-header">
              <span className="sgc-level-num">{i + 1}</span>
              <h3 className="sgc-level-name" style={{ color: LEVEL_COLOURS[level.id] }}>{level.name}</h3>
              <span className="sgc-level-range">{level.ageRange} · {level.keyStage}</span>
            </div>
            <p className="sgc-level-descriptor">{level.descriptor}</p>
            <div className="sgc-criteria">
              {[
                { band: 'Foundation', text: level.assessmentCriteria.foundation, cls: 'sgc-band-f' },
                { band: 'Core',       text: level.assessmentCriteria.core,       cls: 'sgc-band-c' },
                { band: 'Extension',  text: level.assessmentCriteria.extension,  cls: 'sgc-band-e' },
              ].map(b => (
                <div key={b.band} className="sgc-criterion">
                  <span className={`sgc-band ${b.cls}`}>{b.band}</span>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
            <p className="sgc-output-format">{level.outputFormat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Homeschooling ────────────────────────────────────────────────────────────

function HomeschoolingSection() {
  return (
    <div className="programme-section" id="sgc-homeschooling">
      <h2>A complete science curriculum. No laboratory required.</h2>
      <p className="section-intro">
        For homeschooling families, STEMgeneers covers the full National Curriculum science
        and computing requirement from KS2 through KS4. For school-attending children, it
        provides the cultural context and community application that school science omits.
      </p>
      <div className="brukup-audiences">
        {[
          { title: 'Each module stands alone', body: 'Every 20-minute module has its own learning objective, household experiment, and evidence output. No commitment to the full 95-minute session required.' },
          { title: 'Assessment evidence built in', body: 'Every module produces a documentable output. The Teacher and Parent guides provide the format that local authority inspectors recognise.' },
          { title: 'National Curriculum mapped', body: 'All ten subject areas mapped to specific NC programmes of study from KS2 through KS4. Exact references in the Teacher and Tutor Guide.' },
          { title: 'The family is the school', body: 'Grandparents contribute traditional knowledge. Parents facilitate experiments. Siblings compare results. The household is the classroom.' },
        ].map((b, i) => (
          <div key={i} className="brukup-audience">
            <strong>{b.title}</strong>
            {b.body}
          </div>
        ))}
      </div>

      <div className="sgc-guides-section">
        <h3 className="sgc-guides-heading">Four facilitation guides — one for every role</h3>
        <div className="role-grid">
          {[
            { role: 'Maya delivery spec',   who: 'Platform delivery',  colour: '#10b981', desc: 'Full script, age-differentiation protocol, Zoom configuration, platform integration triggers.' },
            { role: 'Parent & carer guide', who: 'Family use',         colour: '#8b5cf6', desc: 'Plain English. What the child is learning, why it matters, how to run the family activity.' },
            { role: 'Teacher & tutor guide',who: 'Institutional use',  colour: '#fbbf24', desc: 'NC alignment, learning objectives, assessment criteria, differentiation for SEND.' },
            { role: 'Knowledge holder guide',who: 'Community elders',  colour: '#f87171', desc: 'What will be asked, how knowledge is protected, IP protection, how licensing revenue flows back.' },
          ].map(g => (
            <div key={g.role} className="role-card" style={{ borderTopColor: g.colour, borderTopWidth: 3, borderTopStyle: 'solid' }}>
              <span style={{ color: g.colour, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.who}</span>
              <h3>{g.role}</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Repository ───────────────────────────────────────────────────────────────

function RepositorySection() {
  return (
    <div className="programme-section">
      <div className="scrapcat-card" style={{ background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.2)' }}>
        <h2 style={{ color: '#10b981' }}>Family knowledge is family investment</h2>
        <p>
          Every plant documented. Every traditional practice recorded. Every family recipe
          analysed as chemistry. All of it attributed, protected, and commercially governed
          under the platform's 55/25/20 model.
        </p>
        <div className="scrapcat-loop">
          {[
            { n: '01', title: 'Document', body: 'Participants and their families record traditional knowledge — plants, practices, preparations — as scientific protocols.' },
            { n: '02', title: 'Protect',  body: 'Each entry is dated, attributed to the knowledge holder, and formatted as prior art — legally recognisable in patent challenge processes.' },
            { n: '03', title: 'Govern',   body: 'The repository is community-governed. Access requires benefit-sharing agreements. No commercial use without community consent.' },
            { n: '04', title: 'Benefit',  body: "Licensing revenue flows back through the 55/25/20 model. Contributing families receive recognition and, where appropriate, direct compensation." },
          ].map(s => (
            <div key={s.n} className="loop-step">
              <span className="loop-number">{s.n}</span>
              <p><strong style={{ color: '#e2e8f0' }}>{s.title} — </strong>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Enrol ────────────────────────────────────────────────────────────────────

function EnrolSection() {
  return (
    <div className="programme-section">
      <div className="final-cta-card">
        <h2>Join STEMgeneers</h2>
        <p>
          Remote-first. Zoom-based. Age 7–16. Family participation welcome.
          Household materials only. Repository access from day one.
        </p>
        <div className="final-cta-actions">
          <a href="/join" className="cta-primary">Join as a family</a>
          <a href="/partnerships" className="cta-secondary">Institutional licensing</a>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

const STEMgeneersPage: React.FC = () => {
  return (
    <PageTemplate pageTitle="STEMgeneers" pageStrapline="The community STEM curriculum rooted in your kitchen and your family's knowledge." pageType="programme">
      <PageMeta pageKey="stemgeneers" />
      <div className="stemgeneers-page programme-content">
        <CurriculumHero />
        <PhilosophySection />
        <SessionsSection />
        <ProgressionSection />
        <HomeschoolingSection />
        <RepositorySection />
        <EnrolSection />
      </div>
    </PageTemplate>
  );
};

export default STEMgeneersPage;
