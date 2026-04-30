
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GtechCastersPlannerPage.css';

interface PlannerState {
  stage: 1 | 2 | 3 | 4 | 5;
  startTime: Date;
  briefResponse: string;
  knowledgeScores: Record<string, number>;
  skillsAudit: Record<string, string>;
  commitmentResponses: Record<string, string>;
  profile: ProfileResult | null;
  committed: boolean;
  committedHours: number;
  sessionToken: string;
}

interface ProfileResult {
  primaryStream: string;
  secondaryStream: string;
  entryPoint: string;
  monthOne: string;
  monthSix: string;
  readiness: 'READY' | 'DEVELOPING' | 'REDIRECTED';
  narratorAssessment: string;
  strengths: string[];
  gaps: string[];
}

const STREAMS = [
  { id: 'ecosystem', icon: '🏢', label: 'Ecosystem media', desc: 'Local businesses, faith communities, schools.', range: '£500–£2,000/month',
    caseStudy: 'A local business on the High Road needed media coverage for their grand reopening. The brief was simple: photos, a short video, a write-up. The Caster arrived, introduced themselves to the manager, spent twenty minutes understanding the story before picking up a camera. They left with enough material for three months of content and a standing monthly retainer.',
    question: 'What made the difference in that outcome?',
    answers: [{ text: 'The Caster had good equipment', score: 1 }, { text: 'They listened before they recorded', score: 3 }, { text: 'They were quick and efficient', score: 1 }, { text: 'They charged the right rate', score: 2 }] },
  { id: 'raydyo', icon: '📻', label: 'Raydyo broadcasting', desc: 'Host your own show on Wembley Wonders community radio.', range: '£300–£600/month',
    caseStudy: 'A Raydyo host was preparing their weekly show when they received a message from a listener — an elder who wanted to share a story about arriving in Wembley in 1967. The host had fifteen minutes before air.',
    question: 'What was the right decision?',
    answers: [{ text: 'Stick to the planned show — guests need notice', score: 1 }, { text: 'Invite the elder on live — the story matters more than the plan', score: 3 }, { text: 'Take their number and plan a future episode', score: 2 }, { text: 'Share the message on air and invite them to call in', score: 3 }] },
  { id: 'podcast', icon: '🎤', label: 'Podcast production', desc: 'Professionals who want podcasts but not the production work.', range: '£400–£1,500/month',
    caseStudy: 'A solicitor hired a Caster to produce their weekly legal advice podcast. In the third episode, the solicitor said something factually misleading about tenant rights. The Caster noticed during editing.',
    question: 'What does the Caster do?',
    answers: [{ text: 'Edit it out without mentioning it', score: 1 }, { text: 'Leave it in — not their area of expertise', score: 0 }, { text: 'Flag it to the solicitor before publishing and suggest a correction', score: 3 }, { text: 'Add a disclaimer in the show notes', score: 2 }] },
  { id: 'heritage', icon: '🌍', label: 'Heritage media', desc: 'Windrush generation stories, oral histories, cultural documentation.', range: '£300–£1,000/month',
    caseStudy: 'A Caster was booked to record an oral history with an 84-year-old woman who arrived from Jamaica in 1962. The booking confirmation said she lives alone and sometimes gets confused about who people are. The interview is Saturday afternoon.',
    question: 'What do you do before Saturday?',
    answers: [{ text: 'Confirm the address and show up on time', score: 1 }, { text: 'Prepare your questions and equipment', score: 1 }, { text: 'Check whether a family member will be present and arrange a buddy', score: 3 }, { text: 'Call ahead to make sure she still wants to proceed', score: 2 }] },
  { id: 'events', icon: '🎬', label: 'Event coverage', desc: 'Build reputation as the reliable event media producer.', range: '£200–£800/event',
    caseStudy: 'A Caster arrived to cover a community awards evening at a local mosque. They had their camera ready and were about to start filming the arrivals when the events coordinator approached them.',
    question: 'What does the coordinator say, and how does the Caster respond?',
    answers: [{ text: 'The coordinator asks if they need a power socket — Caster says thanks', score: 1 }, { text: 'The coordinator explains some attendees prefer not to be filmed — Caster asks for guidance and adjusts approach', score: 3 }, { text: 'The coordinator welcomes them and points to the press area — Caster heads there', score: 2 }, { text: 'The coordinator asks to see credentials — Caster shows their WW ID', score: 2 }] },
  { id: 'hybrid', icon: '🔄', label: 'Hybrid: B2B + personal brand', desc: 'Stable B2B base plus your own content.', range: '£800–£3,000/month',
    caseStudy: 'A Caster was building their personal brand around Wembley neighbourhood stories while also working with three local business clients. One client asked them to cover a story uncomfortably close to content they were independently developing.',
    question: 'What is the right way to handle this?',
    answers: [{ text: 'Take the client work — it pays better', score: 1 }, { text: 'Decline the client work to protect the personal project', score: 1 }, { text: 'Be transparent with the client about the overlap and discuss how both can proceed without conflict', score: 3 }, { text: 'Delay the personal project until the client work is done', score: 2 }] },
];

const SKILLS_QUESTIONS = [
  { id: 'equipment', label: 'What equipment do you have access to?', options: ['Smartphone only', 'Smartphone + basic mic', 'Camera + audio setup', 'Full production kit'] },
  { id: 'connections', label: 'Do you have existing relationships with local businesses, faith communities, or organisations?', options: ['None yet', 'A few informal contacts', 'Some established relationships', 'Strong existing network'] },
  { id: 'experience', label: 'Have you ever interviewed someone — formally or informally?', options: ['Never', 'Once or twice', 'Several times', 'Regularly'] },
  { id: 'availability', label: 'How many hours per week are you genuinely available?', options: ['2–4 hours', '5–8 hours', '9–15 hours', '16+ hours'] },
  { id: 'writing', label: 'How comfortable are you writing for an audience?', options: ['Not comfortable', 'Can do it but slowly', 'Reasonably comfortable', 'Confident writer'] },
  { id: 'broadcast', label: 'Have you ever spoken on air, on a podcast, or presented to a group?', options: ['Never', 'Once or twice', 'A few times', 'Regularly'] },
];

const COMMITMENT_SCENARIOS = [
  { id: 'unknown_brief', scenario: 'A local youth organisation contacts you about covering their annual celebration event next month. They want photos, a short video, and a write-up. You have not worked with them before and the brief is vague. Your diary is fairly clear that week.', question: 'What do you do?',
    options: [{ text: 'Accept and figure it out when you get there', value: 'a', flag: 'avoidance' }, { text: 'Decline — too vague, too risky', value: 'b', flag: 'avoidance' }, { text: 'Ask for a call to clarify the brief, understand the audience, and confirm what they need before committing', value: 'c', flag: 'professional' }, { text: 'Accept but ask a colleague to come since you do not know the organisation', value: 'd', flag: 'buddy_instinct' }] },
  { id: 'vulnerable_subject', scenario: 'You have been asked to interview a young person — 17 years old — about their experience of homelessness in Wembley. The piece is for Joystick. The young person has consented. Their key worker will not be available on the day arranged.', question: 'Do you proceed?',
    options: [{ text: 'Yes — they have consented, that is enough', value: 'a', flag: 'concern' }, { text: 'Yes, but I bring a buddy from the Casters corps', value: 'b', flag: 'buddy_instinct' }, { text: 'No — I reschedule until the key worker can be present or arrange an appropriate adult', value: 'c', flag: 'professional' }, { text: 'I ask the young person if they are comfortable without the key worker and proceed if they say yes', value: 'd', flag: 'concern' }] },
  { id: 'faith_environment', scenario: 'You have been asked to document a community gathering at a Caribbean church in Harlesden. You have never been inside a Pentecostal church before. You arrive fifteen minutes early and the service is already in progress.', question: 'What do you do?',
    options: [{ text: 'Wait outside until the service ends', value: 'a', flag: 'aware' }, { text: 'Enter quietly and find somewhere to stand near the back', value: 'b', flag: 'aware' }, { text: 'Find a member of the congregation near the entrance and quietly ask for guidance', value: 'c', flag: 'professional' }, { text: 'Set up your equipment in the foyer and wait', value: 'd', flag: 'concern' }] },
];

function generateProfile(state: PlannerState): ProfileResult {
  const scores = state.knowledgeScores;
  const audit = state.skillsAudit;
  const commitment = state.commitmentResponses;
  const streamScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = streamScores[0]?.[0] || 'ecosystem';
  const secondary = streamScores[1]?.[0] || 'raydyo';
  const professionalCount = Object.values(commitment).filter(v => v === 'professional' || v === 'buddy_instinct').length;
  const concernCount = Object.values(commitment).filter(v => v === 'concern').length;
  const readiness: 'READY' | 'DEVELOPING' | 'REDIRECTED' = concernCount >= 2 ? 'REDIRECTED' : professionalCount >= 2 ? 'READY' : 'DEVELOPING';
  const streamMap: Record<string, string> = { ecosystem: 'Ecosystem Media', raydyo: 'Raydyo Broadcasting', podcast: 'Podcast Production', heritage: 'Heritage Media', events: 'Event Coverage', hybrid: 'Hybrid B2B + Personal Brand' };
  const hasNetwork = (audit.connections || '').includes('established') || (audit.connections || '').includes('Strong');
  const entryPoint = primary === 'raydyo' ? 'Raydyo presenting — book a slot this month' : primary === 'heritage' ? 'Supported heritage interview — with an experienced Caster alongside you' : primary === 'ecosystem' && hasNetwork ? 'Approach one existing contact this week with a media proposal' : primary === 'podcast' ? 'Offer one free pilot episode to a professional contact' : primary === 'events' ? 'Cover a free local event to build your portfolio' : 'Start with the Raydyo sandbox to develop your broadcast voice';
  const available = audit.availability || '';
  const monthOne = available.includes('16+') || available.includes('9–15') ? '£400–£600' : available.includes('5–8') ? '£200–£400' : '£100–£250';
  const monthSix = readiness === 'READY' ? '£800–£1,500' : readiness === 'DEVELOPING' ? '£500–£900' : '£300–£600';
  const assessments = {
    READY: `Your responses show you are already thinking like a professional. You understand that listening comes before recording, that community environments require navigation not assumption, and that a buddy is not a weakness. Your primary pathway is ${streamMap[primary]}. Start there within the month.`,
    DEVELOPING: `You have the instincts — the knowledge audit shows you understand what good practice looks like. What needs building is the habit of applying it under pressure. Your primary pathway is ${streamMap[primary]}, but I would recommend your first few assignments with an experienced Caster alongside you.`,
    REDIRECTED: `Some of your responses suggest you would be stronger starting in a support role within the corps before taking on client-facing or field work. That is not a setback — it is the right foundation. The Raydyo sandbox and supported Joystick contributions are where I would start. Come back to the planner in three months.`,
  };
  const strengths: string[] = [];
  const gaps: string[] = [];
  if (professionalCount >= 2) strengths.push('Professional judgement under pressure');
  if (Object.values(commitment).includes('buddy_instinct')) strengths.push('Buddy instinct — you know when not to go alone');
  if (hasNetwork) strengths.push('Existing community connections');
  if ((audit.equipment || '').includes('Camera') || (audit.equipment || '').includes('Full')) strengths.push('Equipment ready');
  if (concernCount >= 1) gaps.push('Safeguarding awareness needs development');
  if (!hasNetwork) gaps.push('Community network to build');
  if (available.includes('2–4')) gaps.push('Limited availability — manage client expectations carefully');
  return { primaryStream: streamMap[primary] || primary, secondaryStream: streamMap[secondary] || secondary, entryPoint, monthOne, monthSix, readiness, narratorAssessment: assessments[readiness], strengths, gaps };
}

const GtechCastersPlannerPage: React.FC = () => {
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<PlannerState>({ stage: 1, startTime: new Date(), briefResponse: '', knowledgeScores: {}, skillsAudit: {}, commitmentResponses: {}, profile: null, committed: false, committedHours: 0, sessionToken: Math.random().toString(36).slice(2, 12) });
  const [currentStream, setCurrentStream] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [narratorVisible, setNarratorVisible] = useState(false);

  useEffect(() => { const i = setInterval(() => setElapsed(Math.floor((Date.now() - state.startTime.getTime()) / 60000)), 60000); return () => clearInterval(i); }, [state.startTime]);
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [state.stage]);

  const advanceStage = (nextStage: 1 | 2 | 3 | 4 | 5) => { setState(s => ({ ...s, stage: nextStage })); setSelectedAnswer(null); setSelectedOption(null); setSelectedSkill(null); };

  const s1 = () => (
    <div className="planner-stage">
      <div className="planner-scenario"><p className="planner-scenario-text">A local business on the High Road is holding a community open day next Saturday. They want media coverage — photos, a short video, something for their social channels. The brief is thin. You do not know the business or its owner. You have a week to prepare.</p></div>
      <p className="planner-question">What do you do first?</p>
      <textarea className="planner-textarea" placeholder="Write your response here..." value={state.briefResponse} onChange={e => setState(s => ({ ...s, briefResponse: e.target.value }))} rows={6} />
      <div className="planner-actions">
        <button className="planner-btn-primary" disabled={state.briefResponse.trim().length < 30} onClick={() => advanceStage(2)}>Continue →</button>
        {state.briefResponse.trim().length < 30 && <p className="planner-hint">Write at least a sentence or two.</p>}
      </div>
    </div>
  );

  const sd = STREAMS[currentStream];
  const s2 = () => (
    <div className="planner-stage">
      <div className="planner-stream-progress">{STREAMS.map((s, i) => <div key={s.id} className={`planner-stream-dot ${i === currentStream ? 'active' : i < currentStream ? 'done' : ''}`} />)}</div>
      <div className="planner-stream-header"><span className="planner-stream-icon">{sd.icon}</span><div><h3 className="planner-stream-label">{sd.label}</h3><p className="planner-stream-range">{sd.range}</p></div></div>
      <div className="planner-scenario"><p className="planner-scenario-text">{sd.caseStudy}</p></div>
      <p className="planner-question">{sd.question}</p>
      <div className="planner-answers">{sd.answers.map((a, i) => (
        <button key={i} className={`planner-answer ${selectedAnswer === i ? 'selected' : ''}`} onClick={() => { setSelectedAnswer(i); const ns = { ...state.knowledgeScores, [sd.id]: (state.knowledgeScores[sd.id] || 0) + a.score }; setState(s => ({ ...s, knowledgeScores: ns })); setTimeout(() => { if (currentStream < STREAMS.length - 1) { setCurrentStream(c => c + 1); setSelectedAnswer(null); } else advanceStage(3); }, 600); }} disabled={selectedAnswer !== null}>{a.text}</button>
      ))}</div>
    </div>
  );

  const sq = SKILLS_QUESTIONS[currentSkill];
  const s3 = () => (
    <div className="planner-stage">
      {narratorVisible && currentSkill >= 3 && <div className="planner-narrator-note"><span className="planner-narrator-mark">◈ The Narrator</span><p>Based on what you have told me so far, I am starting to see where your strongest entry point might be. Keep going.</p></div>}
      <div className="planner-skill-progress"><div className="planner-skill-bar" style={{ width: `${((currentSkill + 1) / SKILLS_QUESTIONS.length) * 100}%` }} /></div>
      <p className="planner-question">{sq.label}</p>
      <div className="planner-skill-options">{sq.options.map((opt, i) => (
        <button key={i} className={`planner-skill-option ${selectedSkill === opt ? 'selected' : ''}`} onClick={() => { setSelectedSkill(opt); const na = { ...state.skillsAudit, [sq.id]: opt }; setState(s => ({ ...s, skillsAudit: na })); setTimeout(() => { if (currentSkill === 2) setNarratorVisible(true); if (currentSkill < SKILLS_QUESTIONS.length - 1) { setCurrentSkill(c => c + 1); setSelectedSkill(null); } else advanceStage(4); }, 400); }} disabled={selectedSkill !== null}>{opt}</button>
      ))}</div>
    </div>
  );

  const sc = COMMITMENT_SCENARIOS[currentScenario];
  const s4 = () => (
    <div className="planner-stage">
      <div className="planner-scenario-counter">Situation {currentScenario + 1} of {COMMITMENT_SCENARIOS.length}</div>
      <div className="planner-scenario"><p className="planner-scenario-text">{sc.scenario}</p></div>
      <p className="planner-question">{sc.question}</p>
      <div className="planner-answers">{sc.options.map((opt, i) => (
        <button key={i} className={`planner-answer ${selectedOption === opt.value ? 'selected' : ''}`} onClick={() => { setSelectedOption(opt.value); const nr = { ...state.commitmentResponses, [sc.id]: opt.flag }; setState(s => ({ ...s, commitmentResponses: nr })); setTimeout(() => { if (currentScenario < COMMITMENT_SCENARIOS.length - 1) { setCurrentScenario(c => c + 1); setSelectedOption(null); } else { const profile = generateProfile({ ...state, commitmentResponses: nr }); setState(s => ({ ...s, commitmentResponses: nr, profile, stage: 5 })); } }, 600); }} disabled={selectedOption !== null}>{opt.text}</button>
      ))}</div>
    </div>
  );

  const s5 = () => {
    const p = state.profile!;
    const rl = { READY: 'Ready to start', DEVELOPING: 'Developing — supported start recommended', REDIRECTED: 'Redirected — alternative entry recommended' }[p.readiness];
    const rc = { READY: '#1D9E75', DEVELOPING: '#BA7517', REDIRECTED: '#7c3aed' }[p.readiness];
    return (
      <div className="planner-stage planner-stage--profile">
        <div className="planner-narrator-reveal"><span className="planner-narrator-mark">◈ The Narrator</span><p className="planner-narrator-assessment">{p.narratorAssessment}</p></div>
        <div className="planner-profile-card">
          <h3 className="planner-profile-title">Your Casters Professional Profile</h3>
          <div className="planner-profile-streams">
            <div className="planner-profile-stream primary"><span className="planner-profile-stream-label">Primary pathway</span><span className="planner-profile-stream-name">{p.primaryStream}</span></div>
            <div className="planner-profile-stream secondary"><span className="planner-profile-stream-label">Secondary pathway</span><span className="planner-profile-stream-name">{p.secondaryStream}</span></div>
          </div>
          <div className="planner-profile-entry"><h4>Your entry point</h4><p>{p.entryPoint}</p></div>
          <div className="planner-profile-earnings">
            <div className="planner-profile-earning"><span className="planner-profile-earning-label">Month one target</span><span className="planner-profile-earning-val">{p.monthOne}</span></div>
            <div className="planner-profile-earning"><span className="planner-profile-earning-label">Month six target</span><span className="planner-profile-earning-val">{p.monthSix}</span></div>
          </div>
          <div className="planner-profile-readiness" style={{ borderColor: rc }}><span style={{ color: rc }}>{rl}</span></div>
          {p.strengths.length > 0 && <div className="planner-profile-section"><h4>Strengths identified</h4><ul>{p.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></div>}
          {p.gaps.length > 0 && <div className="planner-profile-section"><h4>Areas to develop</h4><ul>{p.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul></div>}
        </div>
        {p.readiness !== 'REDIRECTED' && !state.committed && (
          <div className="planner-commitment">
            <h3>Make your commitment</h3>
            <p>This is a professional commitment — to the corps, to the community, and to yourself.</p>
            <div className="planner-commitment-hours">
              <label>I commit to</label>
              <select value={state.committedHours} onChange={e => setState(s => ({ ...s, committedHours: Number(e.target.value) }))}>
                <option value={0}>— select —</option>
                <option value={95}>95 minutes fortnightly (minimum)</option>
                <option value={180}>3 hours per week</option>
                <option value={300}>5 hours per week</option>
                <option value={600}>10+ hours per week</option>
              </select>
              <label>of professional media work with the G-Tech Casters corps.</label>
            </div>
            <button className="planner-btn-commit" disabled={state.committedHours === 0} onClick={() => setState(s => ({ ...s, committed: true }))}>I commit to this →</button>
          </div>
        )}
        {state.committed && (
          <div className="planner-committed">
            <div className="planner-committed-header"><span className="planner-committed-mark">◆</span><h3>Commitment recorded.</h3></div>
            <p>Your profile is saved. The next step is your induction — a 95-minute Zoom with Judith or CJ. Camera on. Smart-casual. Your full attention.</p>
            <div className="planner-committed-actions">
              <button className="planner-btn-primary" onClick={() => navigate('/induction/cohort')}>Book a cohort session →</button>
              <button className="planner-btn-secondary" onClick={() => navigate('/contribute')}>Go to Contribute →</button>
            </div>
          </div>
        )}
        {p.readiness === 'REDIRECTED' && (
          <div className="planner-redirected">
            <p>Your recommended starting point is the Raydyo sandbox and supported Joystick contributions. Come back to the planner in three months.</p>
            <button className="planner-btn-secondary" onClick={() => navigate('/pathways/gtechcasters/planner')}>Go to the sandbox →</button>
          </div>
        )}
      </div>
    );
  };

  const stageLabels = ['The Brief', 'The Work', 'Your Situation', 'Decisions', 'Your Profile'];

  return (
    <div className="planner-page" ref={topRef}>
      <div className="planner-header">
        <div className="planner-header-brand"><span className="planner-brand-icon">📡</span><div><span className="planner-brand-name">G-Tech Casters</span><span className="planner-brand-sub">Media Pathways Planner</span></div></div>
        <div className="planner-header-meta"><span className="planner-elapsed">{elapsed > 0 ? `${elapsed} min` : 'Just started'}</span><span className="planner-commitment-note">~95 minutes</span></div>
      </div>
      <div className="planner-progress">
        {stageLabels.map((label, i) => (
          <div key={i} className={`planner-progress-step ${i + 1 === state.stage ? 'active' : i + 1 < state.stage ? 'done' : ''}`}>
            <div className="planner-progress-dot" /><span className="planner-progress-label">{label}</span>
          </div>
        ))}
      </div>
      <div className="planner-content">
        {state.stage === 1 && s1()}
        {state.stage === 2 && s2()}
        {state.stage === 3 && s3()}
        {state.stage === 4 && s4()}
        {state.stage === 5 && state.profile && s5()}
      </div>
    </div>
  );
};

export default GtechCastersPlannerPage;
