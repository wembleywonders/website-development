export type FiveC = 'Connect' | 'Cultivate' | 'Create' | 'Compete' | 'Change';

export interface Programme {
  id: string; name: string; icon: string; fiveC: FiveC;
  colour: string; routePath: string; day: string; time: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Year-round';
  outcome: string; zoomLink?: string;
}

export interface Session {
  id: string; programmeId: string; date: string; time: string;
  durationMins: number; title?: string; note?: string;
  isSpecial?: boolean; zoomLink?: string;
}

export const PROGRAMMES: Programme[] = [
  { id:'bright-sparks', name:'Bright Sparks', icon:'✨', fiveC:'Connect', colour:'#fbbf24', routePath:'/programmes/bright-sparks', day:'Saturday', time:'10:00 AM', season:'Year-round', outcome:'You find your spark. You leave knowing your first door.' },
  { id:'stemgeneers', name:'STEMgeneers', icon:'⚡', fiveC:'Cultivate', colour:'#10b981', routePath:'/programmes/stemgeneers', day:'Monday', time:'7:00 PM', season:'Spring', outcome:'Device repair (earn £15–40/job)' },
  { id:'techreneurs', name:'TECHreneurs', icon:'💻', fiveC:'Cultivate', colour:'#3b82f6', routePath:'/programmes/techreneurs', day:'Thursday', time:'7:00 PM', season:'Autumn', outcome:'Launch a product, first real sale' },
  { id:'impact-labs', name:'Impact Labs', icon:'🔬', fiveC:'Cultivate', colour:'#14b8a6', routePath:'/programmes/impact-labs', day:'Monday', time:'7:00 PM', season:'Autumn', outcome:'Real proposal to directors' },
  { id:'kaywanas-court', name:"Kaywana's Court", icon:'🎭', fiveC:'Create', colour:'#f97316', routePath:'/programmes/kaywanas-court', day:'Thursday', time:'7:00 PM', season:'Summer', outcome:'Win a courtroom debate' },
  { id:'pageturners', name:'Pageturners', icon:'✍️', fiveC:'Create', colour:'#8b5cf6', routePath:'/programmes/pageturners', day:'Tuesday', time:'7:00 PM', season:'Year-round', outcome:'Published in Joystick e-zine' },
  { id:'gtechcasters', name:'G-Tech Casters', icon:'🎙️', fiveC:'Create', colour:'#06b6d4', routePath:'/programmes/gtechcasters', day:'Wednesday', time:'7:00 PM', season:'Year-round', outcome:'Your show on Rayd-yo Radio' },
  { id:'trubble-n-bass', name:'Trubble n Bass', icon:'🎵', fiveC:'Create', colour:'#a855f7', routePath:'/programmes/trubble-n-bass', day:'Thursday', time:'7:00 PM', season:'Spring', outcome:'Release a track, listening party' },
  { id:'auntie-anansis-kitchen', name:"Auntie Anansi's Kitchen", icon:'🍲', fiveC:'Create', colour:'#f59e0b', routePath:'/programmes/auntie-anansis-kitchen', day:'Saturday', time:'11:00 AM', season:'Summer', outcome:'Heritage recipes documented' },
  { id:'silk-stilettos', name:'Silk Stilettos', icon:'👠', fiveC:'Create', colour:'#ec4899', routePath:'/programmes/silk-stilettos', day:'Monday', time:'7:00 PM', season:'Summer', outcome:'Portfolio of original pieces' },
  { id:'easy-street', name:'Easy Street', icon:'🎬', fiveC:'Create', colour:'#84cc16', routePath:'/programmes/easy-street', day:'Friday', time:'7:00 PM', season:'Year-round', outcome:'Radio drama on Rayd-yo' },
  { id:'creator-factory', name:'Creator Factory', icon:'🏭', fiveC:'Compete', colour:'#ef4444', routePath:'/programmes/creator-factory', day:'Wednesday', time:'6:00 PM', season:'Autumn', outcome:'Portfolio of timed challenges' },
  { id:'roots', name:'Roots', icon:'🌿', fiveC:'Change', colour:'#4A6741', routePath:'/programmes/roots', day:'TBC', time:'TBC', season:'Year-round', outcome:'Hair science, body sovereignty, legal rights' },
];

export const SESSIONS: Session[] = [
  { id:'bright-sparks-2026-03-21', programmeId:'bright-sparks', date:'2026-03-21', time:'10:00', durationMins:90 },
  { id:'bright-sparks-2026-03-28', programmeId:'bright-sparks', date:'2026-03-28', time:'10:00', durationMins:90 },
  { id:'bright-sparks-2026-04-04', programmeId:'bright-sparks', date:'2026-04-04', time:'10:00', durationMins:90 },
  { id:'bright-sparks-2026-04-11', programmeId:'bright-sparks', date:'2026-04-11', time:'10:00', durationMins:90 },
  { id:'pageturners-2026-03-17', programmeId:'pageturners', date:'2026-03-17', time:'19:00', durationMins:90 },
  { id:'pageturners-2026-03-24', programmeId:'pageturners', date:'2026-03-24', time:'19:00', durationMins:90 },
  { id:'pageturners-2026-03-31', programmeId:'pageturners', date:'2026-03-31', time:'19:00', durationMins:90 },
  { id:'pageturners-2026-04-07', programmeId:'pageturners', date:'2026-04-07', time:'19:00', durationMins:90 },
  { id:'gtechcasters-2026-03-18', programmeId:'gtechcasters', date:'2026-03-18', time:'19:00', durationMins:90 },
  { id:'gtechcasters-2026-03-25', programmeId:'gtechcasters', date:'2026-03-25', time:'19:00', durationMins:90 },
  { id:'gtechcasters-2026-04-01', programmeId:'gtechcasters', date:'2026-04-01', time:'19:00', durationMins:90 },
  { id:'gtechcasters-2026-04-08', programmeId:'gtechcasters', date:'2026-04-08', time:'19:00', durationMins:90 },
  { id:'easy-street-2026-03-20', programmeId:'easy-street', date:'2026-03-20', time:'19:00', durationMins:90 },
  { id:'easy-street-2026-03-27', programmeId:'easy-street', date:'2026-03-27', time:'19:00', durationMins:90 },
  { id:'easy-street-2026-04-03', programmeId:'easy-street', date:'2026-04-03', time:'19:00', durationMins:90 },
  { id:'stemgeneers-2026-03-23', programmeId:'stemgeneers', date:'2026-03-23', time:'19:00', durationMins:90 },
  { id:'stemgeneers-2026-03-30', programmeId:'stemgeneers', date:'2026-03-30', time:'19:00', durationMins:90 },
  { id:'stemgeneers-2026-04-06', programmeId:'stemgeneers', date:'2026-04-06', time:'19:00', durationMins:90 },
  { id:'trubble-n-bass-2026-03-19', programmeId:'trubble-n-bass', date:'2026-03-19', time:'19:00', durationMins:90 },
  { id:'trubble-n-bass-2026-03-26', programmeId:'trubble-n-bass', date:'2026-03-26', time:'19:00', durationMins:90 },
  { id:'trubble-n-bass-2026-04-02', programmeId:'trubble-n-bass', date:'2026-04-02', time:'19:00', durationMins:90 },
  { id:'roots-launch-2026-03-08', programmeId:'roots', date:'2026-03-08', time:'11:00', durationMins:120, title:'Roots — IWD Launch', note:"International Women's Day. Led by Judith Fontanelle, Flora Agba & Natalie.", isSpecial:true },
];

export function getProgramme(id: string): Programme | undefined {
  return PROGRAMMES.find(p => p.id === id);
}

export function getSessionsForProgramme(programmeId: string): Session[] {
  return SESSIONS.filter(s => s.programmeId === programmeId).sort((a,b) => a.date.localeCompare(b.date));
}

export function getUpcomingSessionsForProgramme(programmeId: string, limit = 4): Session[] {
  const today = new Date().toISOString().split('T')[0];
  return getSessionsForProgramme(programmeId).filter(s => s.date >= today).slice(0, limit);
}

export function getSessionsForMonth(year: number, month: number): Session[] {
  const pad = (n: number) => String(n).padStart(2, '0');
  const from = `${year}-${pad(month)}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const to = `${year}-${pad(month)}-${pad(lastDay)}`;
  return SESSIONS.filter(s => s.date >= from && s.date <= to).sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export function formatSessionDate(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' });
}

export function formatSessionTime(time24: string): string {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2,'0')} ${period}`;
}

export function generateICS(session: Session): string {
  const prog = getProgramme(session.programmeId);
  if (!prog) return '';
  const title = session.title || prog.name;
  const start = session.date.replace(/-/g,'') + 'T' + session.time.replace(':','') + '00';
  const endDate = new Date(session.date + 'T' + session.time);
  endDate.setMinutes(endDate.getMinutes() + session.durationMins);
  const end = endDate.toISOString().replace(/[-:]/g,'').split('.')[0];
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wembley Wonders CIC//EN','BEGIN:VEVENT',`DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${title} — Wembley Wonders`,`DESCRIPTION:${session.note || prog.outcome}`,`URL:https://wembleywonders.org${prog.routePath}`,'LOCATION:Zoom — link on wembleywonders.org',`UID:${session.id}@wembleywonders.org`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
}
