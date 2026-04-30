import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CohortInductionPage.css';

interface CohortSession {
  id: string;
  day: string;
  date: string;
  time: string;
  spotsLeft: number;
  capacity: number;
}

function getUpcomingSessions(): CohortSession[] {
  const sessions: CohortSession[] = [];
  const d = new Date();
  while (sessions.length < 4) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 2 || dow === 4) {
      sessions.push({
        id: 'session-' + sessions.length,
        day: dow === 2 ? 'Tuesday' : 'Thursday',
        date: d.toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}),
        time: '6:00 pm',
        spotsLeft: Math.floor(Math.random() * 5) + 3,
        capacity: 8,
      });
    }
  }
  return sessions;
}

const CohortInductionPage: React.FC = () => {
  const navigate = useNavigate();
  const sessions = getUpcomingSessions();
  const [selected, setSelected] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  if (booked) {
    const session = sessions.find(s => s.id === selected)!;
    return (
      <div className="cohort-page">
        <div className="cohort-confirmed">
          <div className="cohort-confirmed-icon">◆</div>
          <h2>You are booked.</h2>
          <p className="cohort-confirmed-session">{session.day} {session.date} at {session.time}</p>
          <div className="cohort-confirmed-details">
            <p>A Zoom link is on its way to <strong>{email}</strong> from maya@wembleywonders.org.</p>
            {whatsapp && <p>We will also send it to your WhatsApp: <strong>{whatsapp}</strong></p>}
            <p>The session is 40 minutes. Camera on. Smart-casual. Bring your planner profile.</p>
          </div>
          <div className="cohort-confirmed-what">
            <h4>What happens in the session</h4>
            <ol>
              <li>Judith opens with something concrete that happened this fortnight</li>
              <li>Each participant states their stream and entry point</li>
              <li>Judith explains the three things that make Wembley Wonders different</li>
              <li>Commitment moment — you state yours out loud, the group witnesses it</li>
              <li>What happens next — your Contribute record goes live</li>
            </ol>
          </div>
          <button className="cohort-btn-secondary" onClick={() => navigate('/contribute')}>
            Go to Contribute →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cohort-page">
      <div className="cohort-header">
        <h1 className="cohort-title">Cohort Induction</h1>
        <p className="cohort-subtitle">
          40 minutes. Judith hosts. Up to eight people in the room.
          Everyone has completed the planner. The commitment is made in front of peers.
        </p>
      </div>
      <div className="cohort-what-to-expect">
        <h3>What to expect</h3>
        <p>This is not an information session. You already have your profile. This is where you meet the corps, state your commitment out loud, and leave with your Contribute record live and your first action clear.</p>
        <p>Camera on. Smart-casual. 40 minutes. Runs on Zoom — join from anywhere.</p>
      </div>
      <div className="cohort-sessions">
        <h3>Choose your session</h3>
        <div className="cohort-session-grid">
          {sessions.map(session => (
            <button
              key={session.id}
              className={'cohort-session-card' + (selected === session.id ? ' selected' : '') + (session.spotsLeft === 0 ? ' full' : '')}
              onClick={() => session.spotsLeft > 0 && setSelected(session.id)}
              disabled={session.spotsLeft === 0}
            >
              <span className="cohort-session-day">{session.day}</span>
              <span className="cohort-session-date">{session.date}</span>
              <span className="cohort-session-time">{session.time} via Zoom</span>
              <span className={'cohort-session-spots' + (session.spotsLeft <= 2 ? ' low' : '')}>
                {session.spotsLeft === 0 ? 'Full' : session.spotsLeft + ' of ' + session.capacity + ' spots'}
              </span>
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="cohort-form">
          <h3>Confirm your place</h3>
          <div className="cohort-form-fields">
            <div className="cohort-field">
              <label>Your name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="First and last name" />
            </div>
            <div className="cohort-field">
              <label>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Maya sends your Zoom link here" />
            </div>
            <div className="cohort-field">
              <label>WhatsApp number <span className="cohort-optional">(optional)</span></label>
              <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+44 7700 000000" />
              <span className="cohort-field-hint">We will also send your Zoom link and a 24-hour reminder here</span>
            </div>
          </div>
          <p className="cohort-form-note">
            Reply to Maya's email if you need to move your session.
          </p>
          <button className="cohort-btn-primary" onClick={() => setBooked(true)} disabled={!name.trim() || !email.trim()}>
            Confirm my place →
          </button>
        </div>
      )}
    </div>
  );
};

export default CohortInductionPage;
