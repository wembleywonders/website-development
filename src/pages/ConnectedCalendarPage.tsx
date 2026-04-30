import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  PROGRAMMES,
  getSessionsForMonth,
  getProgramme,
  formatSessionDate,
  formatSessionTime,
  generateICS,
  type Session,
  type FiveC,
} from '../data/programmeSchedule';
import styles from './ConnectedCalendarPage.module.css';

const FIVE_C_COLOURS: Record<FiveC, string> = {
  Connect:   '#1D9E75',
  Cultivate: '#0ea5e9',
  Create:    '#a855f7',
  Compete:   '#f59e0b',
  Change:    '#ef4444',
};

function downloadICS(session: Session) {
  const ics = generateICS(session);
  if (!ics) return;
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `${session.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

const ConnectedCalendarPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [filterProgramme, setFilterProgramme] = useState<string>(
    searchParams.get('programme') || ''
  );
  const [filterFiveC, setFilterFiveC] = useState<string>(
    searchParams.get('fiveC') || ''
  );

  useEffect(() => {
    const p = searchParams.get('programme') || '';
    const c = searchParams.get('fiveC') || '';
    setFilterProgramme(p);
    setFilterFiveC(c);
  }, [searchParams]);

  const applyFilter = (programme: string, fiveC: string) => {
    const params: Record<string, string> = {};
    if (programme) params.programme = programme;
    if (fiveC)     params.fiveC     = fiveC;
    setSearchParams(params);
  };

  const monthSessions = useMemo(
    () => getSessionsForMonth(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const filteredSessions = useMemo(() => {
    return monthSessions.filter(s => {
      if (filterProgramme && s.programmeId !== filterProgramme) return false;
      if (filterFiveC) {
        const prog = getProgramme(s.programmeId);
        if (!prog || prog.fiveC !== filterFiveC) return false;
      }
      return true;
    });
  }, [monthSessions, filterProgramme, filterFiveC]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();
    const pad = (n: number) => String(n).padStart(2, '0');
    const days: (string | null)[] = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(`${viewYear}-${pad(viewMonth)}-${pad(d)}`);
    }
    return days;
  }, [viewYear, viewMonth]);

  const daySessions = useMemo(() => {
    if (!selectedDay) return [];
    return filteredSessions.filter(s => s.date === selectedDay);
  }, [selectedDay, filteredSessions]);

  const sessionDates = useMemo(() => {
    const map: Record<string, Session[]> = {};
    filteredSessions.forEach(s => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [filteredSessions]);

  const prevMonth = () => {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null);
  };

  const monthName = new Date(viewYear, viewMonth - 1).toLocaleDateString('en-GB', {
    month: 'long', year: 'numeric',
  });

  const activeFilterProg = filterProgramme ? getProgramme(filterProgramme) : null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <span className={styles.pageLabel}>Programme calendar</span>
            <h1 className={styles.pageTitle}>When we meet</h1>
            <p className={styles.pageSub}>All sessions on Zoom · Free · Open to members</p>
          </div>
          {activeFilterProg && (
            <div className={styles.activeFilter} style={{ borderColor: activeFilterProg.colour }}>
              <span className={styles.activeFilterDot} style={{ background: activeFilterProg.colour }} />
              <span className={styles.activeFilterName}>{activeFilterProg.icon} {activeFilterProg.name}</span>
              <button className={styles.clearFilter} onClick={() => applyFilter('', filterFiveC)}>×</button>
            </div>
          )}
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sideSection}>
              <div className={styles.sideSectionLabel}>Filter by 5C</div>
              <div className={styles.fiveCFilters}>
                {(Object.keys(FIVE_C_COLOURS) as FiveC[]).map(c => (
                  <button
                    key={c}
                    className={`${styles.fiveCBtn} ${filterFiveC === c ? styles.fiveCBtnActive : ''}`}
                    style={{ '--c-colour': FIVE_C_COLOURS[c] } as React.CSSProperties}
                    onClick={() => { const next = filterFiveC === c ? '' : c; setFilterFiveC(next); applyFilter(filterProgramme, next); }}
                  >{c}</button>
                ))}
                {filterFiveC && <button className={styles.clearAll} onClick={() => applyFilter(filterProgramme, '')}>Clear</button>}
              </div>
            </div>
            <div className={styles.sideSection}>
              <div className={styles.sideSectionLabel}>Filter by programme</div>
              <div className={styles.progFilters}>
                {PROGRAMMES.filter(p => !filterFiveC || p.fiveC === filterFiveC).map(p => (
                  <button
                    key={p.id}
                    className={`${styles.progBtn} ${filterProgramme === p.id ? styles.progBtnActive : ''}`}
                    style={{ '--p-colour': p.colour } as React.CSSProperties}
                    onClick={() => { const next = filterProgramme === p.id ? '' : p.id; setFilterProgramme(next); applyFilter(next, filterFiveC); }}
                  >
                    <span className={styles.progBtnDot} style={{ background: p.colour }} />
                    {p.icon} {p.name}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/programmes" className={styles.sideLink}>← All programmes</Link>
          </aside>

          <div className={styles.calendarWrap}>
            <div className={styles.monthNav}>
              <button className={styles.navBtn} onClick={prevMonth}>‹</button>
              <h2 className={styles.monthTitle}>{monthName}</h2>
              <button className={styles.navBtn} onClick={nextMonth}>›</button>
            </div>
            <div className={styles.dayHeaders}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                <div key={d} className={styles.dayHeader}>{d}</div>
              ))}
            </div>
            <div className={styles.grid}>
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className={styles.emptyCell} />;
                const dayNum = parseInt(day.split('-')[2]);
                const todayStr = today.toISOString().split('T')[0];
                const isToday    = day === todayStr;
                const isSelected = day === selectedDay;
                const sessions   = sessionDates[day] || [];
                return (
                  <button
                    key={day}
                    className={`${styles.dayCell} ${isToday ? styles.dayCellToday : ''} ${isSelected ? styles.dayCellSelected : ''}`}
                    onClick={() => setSelectedDay(prev => prev === day ? null : day)}
                  >
                    <span className={styles.dayNum}>{dayNum}</span>
                    {sessions.length > 0 && (
                      <div className={styles.dotRow}>
                        {sessions.slice(0, 3).map(s => {
                          const p = getProgramme(s.programmeId);
                          return <span key={s.id} className={styles.sessionDot} style={{ background: p?.colour || '#94a3b8' }} />;
                        })}
                        {sessions.length > 3 && <span className={styles.moreCount}>+{sessions.length - 3}</span>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedDay && (
              <div className={styles.dayPanel}>
                <div className={styles.dayPanelHeader}>
                  <span className={styles.dayPanelDate}>{formatSessionDate(selectedDay)}</span>
                  <button className={styles.dayPanelClose} onClick={() => setSelectedDay(null)}>×</button>
                </div>
                {daySessions.length > 0 ? (
                  <div className={styles.daySessions}>
                    {daySessions.map(session => {
                      const prog = getProgramme(session.programmeId);
                      if (!prog) return null;
                      return (
                        <div key={session.id} className={styles.daySession} style={{ '--prog-colour': prog.colour } as React.CSSProperties}>
                          <div className={styles.daySessionBar} style={{ background: prog.colour }} />
                          <div className={styles.daySessionContent}>
                            <div className={styles.daySessionTop}>
                              <span className={styles.daySessionTime}>{formatSessionTime(session.time)}</span>
                              <Link to={prog.routePath} className={styles.daySessionName} style={{ color: prog.colour }}>
                                {prog.icon} {session.title || prog.name}
                              </Link>
                            </div>
                            {session.note && <p className={styles.daySessionNote}>{session.note}</p>}
                            <div className={styles.daySessionActions}>
                              <button className={styles.addBtn} onClick={() => downloadICS(session)} style={{ color: prog.colour, borderColor: `${prog.colour}44` }}>+ Add to calendar</button>
                              <Link to={prog.routePath} className={styles.progLink}>About this programme →</Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.noDaySessions}>No sessions on this date{(filterProgramme || filterFiveC) && ' — try clearing the filter'}.</p>
                )}
              </div>
            )}
          </div>

          <aside className={styles.upcomingList}>
            <div className={styles.sideSectionLabel}>Coming up</div>
            {filteredSessions
              .filter(s => s.date >= today.toISOString().split('T')[0])
              .slice(0, 8)
              .map(session => {
                const prog = getProgramme(session.programmeId);
                if (!prog) return null;
                return (
                  <div key={session.id} className={styles.upcomingItem}>
                    <div className={styles.upcomingBar} style={{ background: prog.colour }} />
                    <div className={styles.upcomingContent}>
                      <div className={styles.upcomingDate}>{formatSessionDate(session.date)} · {formatSessionTime(session.time)}</div>
                      <Link to={prog.routePath} className={styles.upcomingName} style={{ color: prog.colour }}>{prog.icon} {session.title || prog.name}</Link>
                    </div>
                  </div>
                );
              })}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ConnectedCalendarPage;
