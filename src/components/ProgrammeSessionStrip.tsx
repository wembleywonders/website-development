import React from 'react';
import { Link } from 'react-router-dom';
import { getProgramme, getUpcomingSessionsForProgramme, formatSessionDate, formatSessionTime, generateICS, type Session } from '../data/programmeSchedule';
import styles from './ProgrammeSessionStrip.module.css';

interface Props { programmeId: string; limit?: number; }

function downloadICS(session: Session) {
  const ics = generateICS(session);
  if (!ics) return;
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${session.id}.ics`; a.click();
  URL.revokeObjectURL(url);
}

const ProgrammeSessionStrip: React.FC<Props> = ({ programmeId, limit = 4 }) => {
  const prog = getProgramme(programmeId);
  const sessions = getUpcomingSessionsForProgramme(programmeId, limit);
  if (!prog) return null;

  return (
    <div className={styles.strip}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.dot} style={{ background: prog.colour }} />
          <span className={styles.label}>Upcoming sessions</span>
        </div>
        <Link to={`/calendar?programme=${programmeId}`} className={styles.viewAll} style={{ color: prog.colour }}>View in calendar →</Link>
      </div>
      {sessions.length > 0 ? (
        <div className={styles.sessions}>
          {sessions.map(session => (
            <div key={session.id} className={`${styles.session} ${session.isSpecial ? styles.sessionSpecial : ''}`} style={{ '--prog-colour': prog.colour } as React.CSSProperties}>
              <div className={styles.sessionDate}>
                <span className={styles.sessionDay}>{formatSessionDate(session.date)}</span>
                <span className={styles.sessionTime}>{formatSessionTime(session.time)}</span>
              </div>
              <div className={styles.sessionInfo}>
                {session.title && <span className={styles.sessionTitle}>{session.title}</span>}
                {session.note && <span className={styles.sessionNote}>{session.note}</span>}
                {session.isSpecial && <span className={styles.specialBadge} style={{ color: prog.colour, borderColor: prog.colour }}>Special event</span>}
              </div>
              <div className={styles.sessionActions}>
                <button className={styles.addBtn} onClick={() => downloadICS(session)} style={{ color: prog.colour, borderColor: `${prog.colour}44` }}>+ Add</button>
                {(session.zoomLink || prog.zoomLink) && <a href={session.zoomLink || prog.zoomLink} target="_blank" rel="noopener noreferrer" className={styles.joinBtn} style={{ background: prog.colour }}>Join</a>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Sessions for this programme are being scheduled.</p>
          <Link to="/calendar" className={styles.emptyLink}>Check the full calendar →</Link>
        </div>
      )}
      <div className={styles.footer}>
        <span className={styles.footerNote}>{prog.day !== 'TBC' ? `${prog.name} meets every ${prog.day} at ${prog.time} · ${prog.season}` : 'Schedule to be confirmed'}</span>
        <Link to={`/calendar?programme=${programmeId}`} className={styles.footerCta}>Full schedule →</Link>
      </div>
    </div>
  );
};

export default ProgrammeSessionStrip;
