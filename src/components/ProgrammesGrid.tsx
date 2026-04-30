import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProgrammesGrid.module.css';

const FRAMEWORK = [
  { id:'connect', c:'Connect', icon:'🌐', tagline:'Build relationships and entry points.', description:'The door that opens before any other. Community hubs, mutual aid, onboarding and partnerships — the infrastructure of belonging.', colour:'#1D9E75', glow:'rgba(29,158,117,0.12)', examples:['Community hubs','Mutual aid','Onboarding','Partnerships','Referral networks'], programmes:[{ id:'bright-sparks', name:'Bright Sparks', icon:'✨', outcome:'You find your spark. You leave knowing your first door.', day:'Sat 10am' }] },
  { id:'cultivate', c:'Cultivate', icon:'🌱', tagline:'Develop skills and people.', description:'Where raw potential meets structured practice. Workshops, programmes, youth development — the patient work of growing capability.', colour:'#0ea5e9', glow:'rgba(14,165,233,0.12)', examples:['Workshops','Programmes','Mentoring','ICT skills'], programmes:[{ id:'stemgeneers', name:'STEMgeneers', icon:'⚡', outcome:'Device repair (earn £15–40/job)', day:'Mon 7pm' },{ id:'techreneurs', name:'TECHreneurs', icon:'💻', outcome:'Launch a product, first real sale', day:'Thu 7pm' },{ id:'impact-labs', name:'Impact Labs', icon:'🔬', outcome:'Real proposal to directors', day:'Mon 7pm' }] },
  { id:'create', c:'Create', icon:'🎨', tagline:'Produce culture and content.', description:"This is where the Cultural Production House lives. Kaywana's Court, Rayd-yo, Joystick, exhibitions, performances, cultural storytelling.", colour:'#a855f7', glow:'rgba(168,85,247,0.12)', examples:["Kaywana's Court",'Rayd-yo','Joystick productions','Exhibitions','Performances'], programmes:[{ id:'kaywanas-court', name:"Kaywana's Court", icon:'🎭', outcome:'Win a courtroom debate', day:'Thu 7pm' },{ id:'pageturners', name:'Pageturners', icon:'✍️', outcome:'Published in Joystick e-zine', day:'Tue 7pm' },{ id:'gtechcasters', name:'G-Tech Casters', icon:'🎙️', outcome:'Your show on Rayd-yo Radio', day:'Wed 7pm' },{ id:'trubble-n-bass', name:'Trubble n Bass', icon:'🎵', outcome:'Release a track, listening party', day:'Thu 7pm' },{ id:'auntie-anansis-kitchen', name:"Auntie Anansi's Kitchen", icon:'🍲', outcome:'Heritage recipes documented', day:'Sat 11am' },{ id:'silk-stilettos', name:'Silk Stilettos', icon:'👠', outcome:'Portfolio of original pieces', day:'Mon 7pm' },{ id:'easy-street', name:'Easy Street', icon:'🎬', outcome:'Radio drama on Rayd-yo', day:'Fri 7pm' }] },
  { id:'compete', c:'Compete', icon:'🏆', tagline:'Challenge and recognition.', description:"Growth needs friction. Tournaments, competitions, hackathons and showcases — the stage where you find out what you're actually capable of.", colour:'#f59e0b', glow:'rgba(245,158,11,0.12)', examples:['Tournaments','Competitions','Hackathons','Showcases','Gamification'], programmes:[{ id:'creator-factory', name:'Creator Factory', icon:'🏭', outcome:'Portfolio of timed challenges', day:'Wed 6pm' }] },
  { id:'change', c:'Change', icon:'⚡', tagline:'Impact and transformation.', description:'Real community investment leaves a footprint. Community investment, civic engagement, policy influence, social innovation.', colour:'#ef4444', glow:'rgba(239,68,68,0.12)', examples:['Community investment','Civic engagement','Policy influence','Social innovation','The 20% community fund'], programmes:[{ id:'roots', name:'Roots', icon:'🌿', outcome:'Hair science, body sovereignty, legal rights', day:'TBC' }] },
];

const ProgrammesGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = FRAMEWORK.find(f => f.id === activeId) || null;

  return (
    <section className={styles.programmes}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>The refinery</span>
          <h2 className={styles.sectionTitle}>Five doorways.<br /><span className={styles.titleAccent}>Every one leads somewhere real.</span></h2>
          <p className={styles.sectionSub}>Each C is a different lens on what you already carry. Click a doorway to see what's inside.</p>
        </div>
        <div className={styles.doorways}>
          {FRAMEWORK.map(fw => (
            <button key={fw.id} className={`${styles.doorway} ${activeId === fw.id ? styles.doorwayActive : ''}`} style={{ '--fw-colour':fw.colour, '--fw-glow':fw.glow } as React.CSSProperties} onClick={() => setActiveId(prev => prev === fw.id ? null : fw.id)}>
              <span className={styles.doorwayIcon}>{fw.icon}</span>
              <span className={styles.doorwayC}>{fw.c}</span>
              <span className={styles.doorwayTagline}>{fw.tagline}</span>
              <span className={styles.doorwayCount}>{fw.programmes.length} programme{fw.programmes.length !== 1 ? 's' : ''}</span>
            </button>
          ))}
        </div>
        {active && (
          <div className={styles.panel} style={{ '--fw-colour':active.colour, '--fw-glow':active.glow } as React.CSSProperties}>
            <div className={styles.panelTop}>
              <div className={styles.panelLeft}>
                <div className={styles.panelIcon}>{active.icon}</div>
                <div>
                  <h3 className={styles.panelTitle}>{active.c}</h3>
                  <p className={styles.panelDesc}>{active.description}</p>
                  <div className={styles.exampleRow}>{active.examples.map(ex => <span key={ex} className={styles.exampleTag}>{ex}</span>)}</div>
                </div>
              </div>
            </div>
            <div className={styles.panelProgrammes}>
              <div className={styles.panelProgrammesLabel}>Programmes in this C</div>
              <div className={styles.programmeCards}>
                {active.programmes.map(prog => (
                  <Link key={prog.id} to={`/programmes/${prog.id}`} className={styles.progCard} style={{ '--fw-colour':active.colour } as React.CSSProperties}>
                    <div className={styles.progTop}><span className={styles.progIcon}>{prog.icon}</span><span className={styles.progName}>{prog.name}</span></div>
                    <div className={styles.progOutcome}>{prog.outcome}</div>
                    <div className={styles.progDay}>{prog.day}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={styles.footer}>
          <Link to="/programmes" className={styles.footerCta}>View all programmes →</Link>
          <span className={styles.footerNote}>Cross-programme combinations are the real wealth engine.</span>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesGrid;
