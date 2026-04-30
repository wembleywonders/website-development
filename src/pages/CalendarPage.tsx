// src/pages/CalendarPage.tsx
// Extended: adds trader-session, cyberstore-launch, easy-street-arc types
// for High Road business outreach and Cyberstore community events.
// Uses className throughout — matches CalendarPage.css architecture exactly.
// All existing types, data, components, and filter logic preserved unchanged.
// New tab: "High Road" between "This Week" and "Productions".

import React, { useState } from 'react';
import {
  Calendar, Clock, DollarSign, Users, Filter,
  Radio, Briefcase, Zap, MapPin, Video,
  ShoppingBag, BookOpen, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CalendarPage.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Opportunity {
  id: string;
  type: 'gig' | 'session' | 'production-role' | 'workshop' | 'drop-in'
      | 'trader-session' | 'cyberstore-launch' | 'easy-street-arc';
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: 'online' | 'wembley' | 'flexible';
  skillsNeeded: string[];
  skillsYouGain: string[];
  compensation: string;
  commitment: 'one-off' | 'weekly' | 'project-based';
  flexibility: 'fixed' | 'flexible' | 'async';
  spotsAvailable: number;
  urgency: 'urgent' | 'open' | 'upcoming';
  exitPathways?: string[];
  project?: string;
  // Commerce event fields
  businessName?: string;
  arcTitle?: string;
  registrationTarget?: string;
  calculatorLink?: string;
}

interface ProductionRole {
  role: string;
  skills: string[];
  compensation: string;
  timeCommitment: string;
  flexibility: string;
  exitPathways: string[];
}

interface Production {
  id: string;
  title: string;
  author: string;
  origin: string;
  type: 'radio-drama' | 'stage-performance' | 'musical-theatre';
  quarter: string;
  year: number;
  rolesNeeded: ProductionRole[];
  totalCompensationPool: string;
  rehearsalFlexibility: string;
  description: string;
}

// ─── Existing opportunities (unchanged) ───────────────────────────────────────

const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    type: 'drop-in',
    title: 'Benefits Check Drop-In',
    description: 'Get help checking what benefits and discounts you might be missing. No appointment needed.',
    date: 'Tomorrow', time: '2pm - 5pm', duration: '30 mins per person',
    location: 'wembley', skillsNeeded: [], skillsYouGain: ['Benefits navigation'],
    compensation: 'Free service', commitment: 'one-off', flexibility: 'flexible',
    spotsAvailable: 12, urgency: 'open',
  },
  {
    id: 'opp-2',
    type: 'gig',
    title: 'Event Photographer Needed',
    description: 'Cover the STEMgeneers Repair Café this Saturday. Bring your own phone or use our equipment.',
    date: 'Saturday', time: '11am - 3pm', duration: '4 hours',
    location: 'wembley', skillsNeeded: ['Basic photography'],
    skillsYouGain: ['Event photography', 'Photo editing'],
    compensation: '£60 + portfolio images', commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 1, urgency: 'urgent',
    exitPathways: ['Events photography', 'Social media management'],
    project: 'STEMgeneers Repair Café',
  },
  {
    id: 'opp-3',
    type: 'session',
    title: 'Variable Income Budgeting Workshop',
    description: 'Budgeting that actually works when your hours change every week. Recording available after.',
    date: 'Wednesday', time: '7pm - 8:30pm', duration: '90 mins',
    location: 'online', skillsNeeded: [],
    skillsYouGain: ['Irregular income budgeting', 'Financial planning'],
    compensation: 'Free for members', commitment: 'one-off', flexibility: 'flexible',
    spotsAvailable: 25, urgency: 'open',
  },
  {
    id: 'opp-4',
    type: 'production-role',
    title: 'Voice Actor — "Lonely Londoners" Radio Drama',
    description: 'Multiple roles available. Record from home on your schedule. Trinidadian/Caribbean accent preferred.',
    date: 'Recording: Jan 15 - Feb 28', time: 'Your schedule', duration: '8-12 hours total',
    location: 'flexible', skillsNeeded: ['Clear speaking voice'],
    skillsYouGain: ['Voice acting', 'Script reading', 'Audio recording'],
    compensation: '£80-150 depending on role size', commitment: 'project-based', flexibility: 'async',
    spotsAvailable: 6, urgency: 'open',
    exitPathways: ['Audiobook narration', 'Voiceover work', 'Podcast hosting'],
    project: 'The Lonely Londoners',
  },
  {
    id: 'opp-5',
    type: 'gig',
    title: 'Food Photography — Recipe Archive',
    description: 'Photograph Caribbean dishes for our heritage recipe collection. Flexible scheduling.',
    date: 'Ongoing', time: 'Flexible', duration: '2-3 hours per session',
    location: 'wembley', skillsNeeded: ['Basic photography'],
    skillsYouGain: ['Food photography', 'Lighting', 'Photo editing'],
    compensation: '£40 per session + meal', commitment: 'project-based', flexibility: 'flexible',
    spotsAvailable: 2, urgency: 'open',
    exitPathways: ['Food photography', 'Restaurant marketing', 'Social media'],
    project: 'Caribbean Heritage Recipes',
  },
  {
    id: 'opp-6',
    type: 'workshop',
    title: 'Phone Repair Basics',
    description: 'Learn to fix common phone issues. Fix your own, then earn by fixing others.',
    date: 'Thursday', time: '6pm - 8pm', duration: '2 hours',
    location: 'wembley', skillsNeeded: [],
    skillsYouGain: ['Phone repair', 'Screen replacement', 'Battery replacement'],
    compensation: 'Free workshop + keep what you fix', commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 8, urgency: 'open',
    exitPathways: ['Mobile repair technician', 'Side income from repairs'],
  },
  {
    id: 'opp-7',
    type: 'gig',
    title: 'Audio Editor — Podcast Episode',
    description: 'Edit a 45-minute podcast interview. Work from home, flexible deadline.',
    date: 'Deadline: Next Friday', time: 'Your schedule', duration: '3-4 hours work',
    location: 'flexible', skillsNeeded: ['Basic audio editing', 'Audacity or similar'],
    skillsYouGain: ['Podcast editing', 'Audio cleanup'],
    compensation: '£45', commitment: 'one-off', flexibility: 'async',
    spotsAvailable: 1, urgency: 'urgent',
    exitPathways: ['Podcast production', 'Audio engineering'],
    project: 'Rayd-yo Weekly',
  },
  {
    id: 'opp-8',
    type: 'drop-in',
    title: 'CV & Portfolio Review',
    description: 'Get feedback on your CV or creative portfolio. Drop in anytime during hours.',
    date: 'Every Tuesday', time: '4pm - 7pm', duration: '20-30 mins',
    location: 'wembley', skillsNeeded: [],
    skillsYouGain: ['CV writing', 'Portfolio presentation'],
    compensation: 'Free service', commitment: 'one-off', flexibility: 'flexible',
    spotsAvailable: 10, urgency: 'open',
    exitPathways: ['Better job applications'],
  },
];

// ─── New: Community Commerce events ───────────────────────────────────────────

const COMMERCE_EVENTS: Opportunity[] = [
  {
    id: 'ce-1',
    type: 'trader-session',
    title: 'High Road Trader Session',
    description: 'An evening for independent businesses on and around Wembley High Road. See what the Cyberstore can do for your numbers — in a room full of people who understand exactly what you\'re up against.',
    date: 'Thursday 6th February', time: '6:30pm – 8:30pm', duration: '2 hours',
    location: 'wembley', skillsNeeded: [],
    skillsYouGain: ['Platform economics', 'Digital commerce basics', 'Community pool governance'],
    compensation: 'Free — light refreshments provided',
    commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 20, urgency: 'upcoming',
    registrationTarget: 'Independent businesses on Wembley High Road and surrounding streets',
    calculatorLink: '/cyberstore/calculator',
    exitPathways: ['Cyberstore listing', 'Community Price tier', 'Easy Street onboarding'],
    project: 'High Road Trader Outreach',
  },
  {
    id: 'ce-2',
    type: 'cyberstore-launch',
    title: 'Live Launch: Satta\'s Kitchen',
    description: 'Satta\'s Kitchen goes live on the Cyberstore. First batch of her doubles pepper sauce and shadow beni seasoning. Watch the sudden-death auction live — place a bid, see the community pool grow in real time.',
    date: 'Sunday 9th February', time: '3pm – 5pm', duration: '2 hours',
    location: 'online', skillsNeeded: [],
    skillsYouGain: ['Live auction mechanics', 'Community pool participation'],
    compensation: 'Free to attend — products from £4.50',
    commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 200, urgency: 'upcoming',
    businessName: 'Satta\'s Kitchen — first time on the Cyberstore',
    project: 'Easy Street Arc 1',
    exitPathways: ['Become a regular buyer', 'Refer a seller', 'Join as member'],
  },
  {
    id: 'ce-3',
    type: 'easy-street-arc',
    title: 'Easy Street Arc 1 — Advisor Places',
    description: 'Help a real High Road food business navigate the decision to sell online. Six sessions over six weeks. Your advice shapes a real Cyberstore listing. You attend the launch show. Your name goes on the provenance record.',
    date: 'Starts Monday 27th January', time: 'Flexible — 1 session/week',
    duration: '6 weeks, ~90 mins/session',
    location: 'online', skillsNeeded: [],
    skillsYouGain: ['Community economics', 'Platform literacy', 'Provenance documentation', 'Live commerce'],
    compensation: 'Free + Advisor badge + listed on seller provenance record',
    commitment: 'project-based', flexibility: 'flexible',
    spotsAvailable: 8, urgency: 'open',
    arcTitle: 'Arc 1: The High Road Food Quarter',
    project: 'Easy Street',
    exitPathways: ['Community governance role', 'Joystick contributor', 'Cyberstore seller yourself'],
  },
  {
    id: 'ce-4',
    type: 'trader-session',
    title: 'Cyberstore Onboarding — Hair & Beauty',
    description: 'Specifically for Afro hair shops, beauty suppliers, and salons. Different price structures, different product categories, same community economics. Bring your price list.',
    date: 'Tuesday 11th February', time: '6pm – 8pm', duration: '2 hours',
    location: 'wembley', skillsNeeded: [],
    skillsYouGain: ['Cyberstore listing setup', 'Community Price eligibility', 'Provenance record basics'],
    compensation: 'Free',
    commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 15, urgency: 'upcoming',
    registrationTarget: 'Afro hair shops, salons, and beauty suppliers in Wembley and surrounding areas',
    calculatorLink: '/cyberstore/calculator',
    exitPathways: ['Cyberstore listing', 'Easy Street onboarding'],
    project: 'High Road Trader Outreach',
  },
  {
    id: 'ce-5',
    type: 'cyberstore-launch',
    title: 'Live Launch: Aunty Jenny\'s Kitchen',
    description: 'Aunty Jenny\'s Kitchen — a Wembley institution — brings their signature curry goat seasoning blend online for the first time. 30 jars. Sudden-death auction. 25p of every pound to the community pool.',
    date: 'Sunday 16th February', time: '2pm – 4pm', duration: '2 hours',
    location: 'online', skillsNeeded: [],
    skillsYouGain: ['Live auction mechanics'],
    compensation: 'Free to attend — jars from £5.50',
    commitment: 'one-off', flexibility: 'fixed',
    spotsAvailable: 200, urgency: 'upcoming',
    businessName: 'Aunty Jenny\'s Kitchen — a Wembley institution, first time online',
    project: 'Easy Street Arc 2',
    exitPathways: ['Become a regular buyer', 'Refer a seller', 'Join as member'],
  },
];

// ─── Existing productions (unchanged) ─────────────────────────────────────────

const PRODUCTIONS: Production[] = [
  {
    id: 'prod-1',
    title: 'The Lonely Londoners',
    author: 'Sam Selvon',
    origin: '🇹🇹 Trinidad & Tobago',
    type: 'radio-drama',
    quarter: 'Q2', year: 2026,
    totalCompensationPool: '£1,200',
    rehearsalFlexibility: 'Record from home on your schedule',
    description: 'Radio serial following Caribbean immigrants in 1950s London. Record your parts when it suits you.',
    rolesNeeded: [
      { role: 'Voice Actor (Lead)', skills: ['Clear voice', 'Caribbean accent helpful'], compensation: '£120-150', timeCommitment: '10-12 hours over 6 weeks', flexibility: 'Fully flexible - record at home', exitPathways: ['Audiobook narration (£200-400/book)', 'Voiceover (£50-200/gig)', 'Podcast hosting'] },
      { role: 'Voice Actor (Supporting)', skills: ['Clear voice'], compensation: '£60-80', timeCommitment: '4-6 hours over 4 weeks', flexibility: 'Fully flexible - record at home', exitPathways: ['Audiobook narration', 'Voiceover work'] },
      { role: 'Audio Editor', skills: ['Audio editing software', 'Attention to detail'], compensation: '£150', timeCommitment: '15-20 hours over 4 weeks', flexibility: 'Fully flexible - work from home', exitPathways: ['Podcast production', 'Audio post-production', 'Radio production'] },
      { role: 'Sound Designer', skills: ['Audio production', 'Sound effects'], compensation: '£200', timeCommitment: '20-25 hours over 6 weeks', flexibility: 'Mostly flexible with some collaboration sessions', exitPathways: ['Film/TV sound', 'Game audio', 'Advertising'] },
      { role: 'Music Composer', skills: ['Music production', 'Understanding of Caribbean music'], compensation: '£250', timeCommitment: '15-20 hours over 4 weeks', flexibility: 'Fully flexible', exitPathways: ['Sync licensing', 'Production music', 'Scoring'] },
    ],
  },
  {
    id: 'prod-2',
    title: 'A House for Mr Biswas',
    author: 'V.S. Naipaul',
    origin: '🇹🇹 Trinidad & Tobago',
    type: 'radio-drama',
    quarter: 'Q1', year: 2026,
    totalCompensationPool: '£1,500',
    rehearsalFlexibility: 'Mix of home recording and group sessions',
    description: '8-part radio drama. Larger cast = more roles at different commitment levels.',
    rolesNeeded: [
      { role: 'Voice Actor (Various)', skills: ['Clear voice', 'Indo-Caribbean accent helpful for some roles'], compensation: '£50-150 depending on role', timeCommitment: '4-15 hours depending on role', flexibility: 'Mix of home recording and optional group sessions', exitPathways: ['Audiobook narration', 'Voiceover', 'Acting'] },
      { role: 'Script Adapter', skills: ['Writing', 'Understanding of radio drama format'], compensation: '£200', timeCommitment: '20-30 hours over 2 months', flexibility: 'Fully flexible with milestone deadlines', exitPathways: ['Screenwriting', 'Audio drama writing', 'Adaptation work'] },
      { role: 'Production Assistant', skills: ['Organisation', 'Communication'], compensation: '£100', timeCommitment: '2-3 hours/week for 8 weeks', flexibility: 'Flexible with some fixed coordination tasks', exitPathways: ['Production management', 'Events coordination', 'Project management'] },
    ],
  },
  {
    id: 'prod-3',
    title: "The Dragon Can't Dance",
    author: 'Earl Lovelace',
    origin: '🇹🇹 Trinidad & Tobago',
    type: 'musical-theatre',
    quarter: 'Q4', year: 2026,
    totalCompensationPool: '£2,500',
    rehearsalFlexibility: 'Weekend rehearsals with some flexibility',
    description: 'Carnival street-theatre with live steelpan. Our biggest production — most roles and biggest payouts.',
    rolesNeeded: [
      { role: 'Performer (Lead)', skills: ['Stage presence', 'Movement', 'Some singing helpful'], compensation: '£200-300', timeCommitment: '6-8 hours/week for 10 weeks', flexibility: 'Weekend rehearsals, some flexibility', exitPathways: ['Theatre performance', 'Events entertainment', 'Corporate presenting'] },
      { role: 'Performer (Ensemble)', skills: ['Willingness to learn', 'Movement'], compensation: '£100-150', timeCommitment: '4-5 hours/week for 8 weeks', flexibility: 'Weekend rehearsals', exitPathways: ['Theatre', 'Events', 'Dance'] },
      { role: 'Steelpan Player', skills: ['Steelpan or willingness to learn'], compensation: '£150', timeCommitment: '3-4 hours/week for 8 weeks', flexibility: 'Rehearsals with some flexibility', exitPathways: ['Session musician', 'Events entertainment', 'Teaching'] },
      { role: 'Costume Designer', skills: ['Sewing', 'Design sense', 'Carnival aesthetic understanding'], compensation: '£300 + materials budget', timeCommitment: '40-50 hours over 2 months', flexibility: 'Mostly flexible with fitting sessions', exitPathways: ['Costume design', 'Fashion', 'Events styling'] },
      { role: 'Stage Manager', skills: ['Organisation', 'Communication', 'Problem-solving'], compensation: '£200', timeCommitment: '4-6 hours/week for 10 weeks', flexibility: 'Must attend rehearsals and performance', exitPathways: ['Production management', 'Events management', 'Theatre careers'] },
      { role: 'Marketing/Promo', skills: ['Social media', 'Writing', 'Basic design'], compensation: '£150', timeCommitment: '3-4 hours/week for 8 weeks', flexibility: 'Fully flexible - work from anywhere', exitPathways: ['Social media management', 'Marketing roles', 'PR'] },
    ],
  },
];

// ─── Filter options ────────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { id: 'all',       label: 'All Opportunities' },
  { id: 'urgent',    label: '🔴 Urgent' },
  { id: 'flexible',  label: '⏰ Flexible' },
  { id: 'paid',      label: '💰 Paid' },
  { id: 'no-skills', label: '🆕 No Skills Needed' },
  { id: 'online',    label: '🏠 Remote' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const typeIcon = (type: string) => {
  const cls = 'type-icon';
  switch (type) {
    case 'gig':               return <DollarSign className={cls} />;
    case 'session':           return <Video className={cls} />;
    case 'production-role':   return <Radio className={cls} />;
    case 'workshop':          return <Users className={cls} />;
    case 'drop-in':           return <MapPin className={cls} />;
    case 'trader-session':    return <Briefcase className={cls} />;
    case 'cyberstore-launch': return <ShoppingBag className={cls} />;
    case 'easy-street-arc':   return <BookOpen className={cls} />;
    default:                  return <Calendar className={cls} />;
  }
};

const typeLabel = (type: string): string => ({
  'gig':               'Paid Gig',
  'session':           'Session',
  'production-role':   'Production Role',
  'workshop':          'Workshop',
  'drop-in':           'Drop-In',
  'trader-session':    'Trader Session',
  'cyberstore-launch': 'Live Launch',
  'easy-street-arc':   'Easy Street Arc',
}[type] ?? type);

const ctaLabel = (type: string): string => ({
  'drop-in':           'Get Details',
  'trader-session':    'Register',
  'cyberstore-launch': 'Watch Live',
  'easy-street-arc':   'Apply as Advisor',
}[type] ?? 'Apply');

// ─── OppCard ──────────────────────────────────────────────────────────────────

const OppCard: React.FC<{ opp: Opportunity }> = ({ opp }) => {
  const isPaid = opp.compensation.includes('£');
  const isTrader = opp.type === 'trader-session';
  const isLaunch = opp.type === 'cyberstore-launch';
  const isArc    = opp.type === 'easy-street-arc';

  // Build className for the card — preserves existing type + urgency signals
  const cardClass = [
    'opportunity-card',
    opp.type,                                          // maps to CSS border-left colour
    opp.urgency === 'urgent' ? 'urgent' : '',
    opp.urgency === 'upcoming' ? 'upcoming' : '',
    isTrader ? 'trader' : '',
    isLaunch ? 'launch' : '',
    isArc    ? 'arc'    : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass}>

      {/* Header */}
      <div className="opp-header">
        <div className={`opp-type opp-type--${opp.type}`}>
          {typeIcon(opp.type)}
          {typeLabel(opp.type)}
        </div>
        <div className="opp-badges">
          {opp.urgency === 'urgent' && (
            <span className="urgency-badge">Urgent</span>
          )}
          {opp.urgency === 'upcoming' && (
            <span className="urgency-badge urgency-badge--upcoming">Coming Up</span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="opp-title">{opp.title}</h3>

      {/* Business name — launches */}
      {isLaunch && opp.businessName && (
        <div className="opp-business-name">
          <Star className="opp-business-icon" />
          {opp.businessName}
        </div>
      )}

      {/* Arc title — easy-street-arc */}
      {isArc && opp.arcTitle && (
        <div className="opp-arc-title">{opp.arcTitle}</div>
      )}

      {/* Registration target — trader sessions */}
      {isTrader && opp.registrationTarget && (
        <p className="opp-target">For: {opp.registrationTarget}</p>
      )}

      {/* Description */}
      <p className="opp-description">{opp.description}</p>

      {/* Details */}
      <div className="opp-details">
        <div className="detail-row">
          <Calendar className="detail-icon" />
          {opp.date} · {opp.time}
        </div>
        <div className="detail-row">
          <Clock className="detail-icon" />
          {opp.duration}
        </div>
        <div className="detail-row">
          <MapPin className="detail-icon" />
          <span className="location-tag">
            {opp.location === 'wembley' ? '📍 Wembley'
              : opp.location === 'online' ? '🖥 Online'
              : 'Flexible'}
          </span>
          {opp.flexibility !== 'fixed' && (
            <span className="flexibility-tag">{opp.flexibility}</span>
          )}
        </div>
      </div>

      {/* Compensation */}
      <div className={`opp-compensation${isPaid ? '' : ' opp-compensation--free'}`}>
        <DollarSign className="comp-icon" />
        <span>{opp.compensation}</span>
      </div>

      {/* 55 Calculator CTA — trader sessions only */}
      {isTrader && opp.calculatorLink && (
        <Link to={opp.calculatorLink} className="opp-calculator-cta">
          <DollarSign className="type-icon" />
          See your numbers — 55 Calculator
        </Link>
      )}

      {/* Community pool statement — launches */}
      {isLaunch && (
        <div className="opp-pool-statement">
          <span className="pool-diamond">◆</span>
          25p of every pound goes to the Wembley community pool
        </div>
      )}

      {/* Skills needed */}
      {opp.skillsNeeded.length > 0 ? (
        <div className="opp-skills">
          <span className="skills-label">Skills needed:</span>
          <div className="skills-tags">
            {opp.skillsNeeded.map(s => (
              <span key={s} className="skill-tag needed">{s}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="opp-skills no-skills">
          <span className="no-skills-badge">✓ No prior skills needed</span>
        </div>
      )}

      {/* Skills gained */}
      {opp.skillsYouGain.length > 0 && (
        <div className="opp-skills">
          <span className="skills-label">You'll learn:</span>
          <div className="skills-tags">
            {opp.skillsYouGain.map(s => (
              <span key={s} className="skill-tag gain">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Exit pathways */}
      {opp.exitPathways && opp.exitPathways.length > 0 && (
        <div className="opp-exit">
          <span className="exit-label">→ This leads to:</span>
          <span className="exit-paths">{opp.exitPathways.join(', ')}</span>
        </div>
      )}

      {/* Footer */}
      <div className="opp-footer">
        <span className="spots-left">
          {isLaunch
            ? `${opp.spotsAvailable} watching`
            : `${opp.spotsAvailable} ${opp.spotsAvailable === 1 ? 'spot' : 'spots'} available`}
        </span>
        <button className={`apply-btn apply-btn--${opp.type}`}>
          {ctaLabel(opp.type)}
        </button>
      </div>

    </div>
  );
};

// ─── RoleCard (unchanged) ─────────────────────────────────────────────────────

const RoleCard: React.FC<{ role: ProductionRole }> = ({ role }) => (
  <div className="role-card">
    <div className="role-header">
      <h5>{role.role}</h5>
      <span className="role-pay">{role.compensation}</span>
    </div>
    <div className="role-details">
      <p><strong>Time:</strong> {role.timeCommitment}</p>
      <p><strong>Flexibility:</strong> {role.flexibility}</p>
      <p><strong>Skills:</strong> {role.skills.join(', ')}</p>
    </div>
    <div className="role-exits">
      <span className="exit-label">→ This leads to:</span>
      <p>{role.exitPathways.join(' · ')}</p>
    </div>
    <button className="role-apply-btn">Express Interest</button>
  </div>
);

// ─── Commerce Events Banner ───────────────────────────────────────────────────

const CommerceEventsBanner: React.FC<{ upcomingCount: number }> = ({ upcomingCount }) => (
  <div className="commerce-banner">
    <div className="commerce-banner__content">
      <div className="commerce-banner__text">
        <h2 className="commerce-banner__title">High Road × Cyberstore</h2>
        <p className="commerce-banner__desc">
          Trader sessions, live launches, and Easy Street arcs —
          the Cyberstore coming to the community that built it.
          Free to attend. Real numbers. Real businesses.
        </p>
      </div>
      <div className="commerce-banner__legend">
        <div className="commerce-legend-item commerce-legend-item--trader">
          <span className="commerce-legend-dot" />
          <span className="commerce-legend-label">Trader sessions</span>
          <span className="commerce-legend-desc">See your numbers</span>
        </div>
        <div className="commerce-legend-item commerce-legend-item--launch">
          <span className="commerce-legend-dot" />
          <span className="commerce-legend-label">Live launches</span>
          <span className="commerce-legend-desc">Watch bids land</span>
        </div>
        <div className="commerce-legend-item commerce-legend-item--arc">
          <span className="commerce-legend-dot" />
          <span className="commerce-legend-label">Easy Street arcs</span>
          <span className="commerce-legend-desc">Advise a seller</span>
        </div>
      </div>
    </div>
    {upcomingCount > 0 && (
      <div className="commerce-banner__count">
        {upcomingCount} events coming up
      </div>
    )}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const CalendarPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'opportunities' | 'commerce' | 'productions'>('opportunities');

  const filtered = OPPORTUNITIES.filter(o => {
    if (activeFilter === 'all')       return true;
    if (activeFilter === 'urgent')    return o.urgency === 'urgent';
    if (activeFilter === 'flexible')  return o.flexibility !== 'fixed';
    if (activeFilter === 'paid')      return o.compensation.includes('£');
    if (activeFilter === 'no-skills') return o.skillsNeeded.length === 0;
    if (activeFilter === 'online')    return o.location === 'online' || o.location === 'flexible';
    return true;
  });

  const urgentCount   = OPPORTUNITIES.filter(o => o.urgency === 'urgent').length;
  const upcomingCount = COMMERCE_EVENTS.filter(o => o.urgency === 'upcoming').length;

  return (
    <div className="calendar-page">

      {/* ── View toggle ── */}
      <div className="view-controls">
        <button
          className={`view-btn${viewMode === 'opportunities' ? ' active' : ''}`}
          onClick={() => setViewMode('opportunities')}
        >
          <Zap className="btn-icon" /> This Week
        </button>

        <button
          className={`view-btn${viewMode === 'commerce' ? ' active' : ''}`}
          onClick={() => setViewMode('commerce')}
        >
          <ShoppingBag className="btn-icon" />
          High Road
          {upcomingCount > 0 && (
            <span className="view-btn__badge">{upcomingCount}</span>
          )}
        </button>

        <button
          className={`view-btn${viewMode === 'productions' ? ' active' : ''}`}
          onClick={() => setViewMode('productions')}
        >
          <Radio className="btn-icon" /> Productions
        </button>
      </div>

      {/* ── This Week ── */}
      {viewMode === 'opportunities' && (
        <>
          <div className="filter-bar">
            <Filter className="filter-icon" />
            <div className="filter-options">
              {FILTER_OPTIONS.map(f => (
                <button
                  key={f.id}
                  className={`filter-btn${activeFilter === f.id ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="filter-count">{filtered.length} shown</span>
          </div>

          {urgentCount > 0 && (
            <div className="urgent-banner">
              <span className="urgent-icon">🔴</span>
              <span className="urgent-text">
                <strong>{urgentCount} urgent {urgentCount === 1 ? 'opportunity' : 'opportunities'}</strong> — needed this week
              </span>
            </div>
          )}

          <div className="opportunities-section">
            <div className="opportunities-grid">
              {filtered.map(opp => <OppCard key={opp.id} opp={opp} />)}
            </div>
          </div>
        </>
      )}

      {/* ── High Road ── */}
      {viewMode === 'commerce' && (
        <>
          <CommerceEventsBanner upcomingCount={upcomingCount} />
          <div className="opportunities-section">
            <div className="opportunities-grid">
              {COMMERCE_EVENTS.map(opp => <OppCard key={opp.id} opp={opp} />)}
            </div>
          </div>
        </>
      )}

      {/* ── Productions (unchanged) ── */}
      {viewMode === 'productions' && (
        <>
          <div className="productions-intro">
            <h2>Heritage Productions = Paid Opportunities</h2>
            <p>
              We produce Caribbean literary classics as radio dramas and live performances.{' '}
              <strong>Every role is paid.</strong>{' '}
              Most can be done flexibly around your schedule. The skills you develop have real exit pathways.
            </p>
          </div>

          <div className="productions-section">
            <div className="productions-list">
              {PRODUCTIONS.map(prod => (
                <div key={prod.id} className="production-card">
                  <div className="production-header">
                    <div className="production-meta">
                      <span className="production-quarter">{prod.quarter} {prod.year}</span>
                      <span className="production-origin">{prod.origin}</span>
                      <span className="production-type">{prod.type.replace('-', ' ')}</span>
                    </div>
                    <h3>{prod.title}</h3>
                    <p className="production-author">by {prod.author}</p>
                    <p className="production-description">{prod.description}</p>
                    <div className="production-highlights">
                      <div className="highlight">
                        <DollarSign className="highlight-icon" />
                        Total pool: <strong>{prod.totalCompensationPool}</strong>
                      </div>
                      <div className="highlight">
                        <Clock className="highlight-icon" />
                        {prod.rehearsalFlexibility}
                      </div>
                    </div>
                  </div>
                  <div className="production-roles">
                    <h4>Roles Available ({prod.rolesNeeded.length})</h4>
                    <div className="roles-grid">
                      {prod.rolesNeeded.map((role, i) => (
                        <RoleCard key={i} role={role} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── CTA (unchanged) ── */}
      <div className="calendar-cta">
        <h2>Don't See What You're Looking For?</h2>
        <p>
          New opportunities are added weekly. Or tell us what skills you have — we'll match you to upcoming projects.
        </p>
        <div className="cta-buttons">
          <Link to="/programmes" className="cta-btn secondary">
            <Briefcase className="btn-icon" /> Browse Skills to Develop
          </Link>
          <Link to="/dashboard" className="cta-btn primary">
            <Users className="btn-icon" /> Update Your Skills Profile
          </Link>
        </div>
      </div>

    </div>
  );
};

export default CalendarPage;