import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JoinFlow.module.css';

type Door = 'A' | 'B';

const DOOR_A_TAGS = ['music','tech','repair','cooking','history','sport','business','building','storytelling','community'];
const DOOR_B_TAGS = ['hair','fashion','writing','cooking','wellbeing','music','business','community','storytelling','art'];

interface Suggestion { id: string; name: string; icon: string; why: string; colour: string; path: string; }

function getSuggestions(door: Door, carry: string): Suggestion[] {
  const all: Record<Door, Suggestion[]> = {
    A: [
      { id:'stemgeneers',    name:'STEMgeneers',    icon:'⚡', colour:'#10b981', path:'/programmes/stemgeneers',    why:'Turn practical skills into income' },
      { id:'techreneurs',    name:'TECHreneurs',     icon:'💻', colour:'#3b82f6', path:'/programmes/techreneurs',    why:'Launch something you own' },
      { id:'gtechcasters',   name:'G-Tech Casters',  icon:'🎙️', colour:'#06b6d4', path:'/programmes/gtechcasters',   why:'Your voice on air, your audience yours' },
      { id:'trubble-n-bass', name:'Trubble n Bass',  icon:'🎵', colour:'#a855f7', path:'/programmes/trubble-n-bass', why:'Produce and release on your terms' },
      { id:'pageturners',    name:'Pageturners',     icon:'✍️', colour:'#8b5cf6', path:'/programmes/pageturners',    why:'Document what you know' },
      { id:'kaywanas-court', name:"Kaywana's Court", icon:'🎭', colour:'#f97316', path:'/programmes/kaywanas-court', why:'Sharpen your argument and your voice' },
      { id:'bright-sparks',  name:'Bright Sparks',   icon:'✨', colour:'#fbbf24', path:'/programmes/bright-sparks',  why:'Still finding your spark? This is exactly where to start' },
    ],
    B: [
      { id:'roots',              name:'Roots',                    icon:'🌿', colour:'#4A6741', path:'/programmes/roots',                  why:'Hair science, body sovereignty, your rights' },
      { id:'silk-stilettos',     name:'Silk Stilettos',           icon:'👠', colour:'#ec4899', path:'/programmes/silk-stilettos',          why:'Design, influence, and make your mark' },
      { id:'auntie-anansis-kitchen', name:"Auntie Anansi's Kitchen", icon:'🍲', colour:'#f59e0b', path:'/programmes/auntie-anansis-kitchen', why:'Preserve the recipes that carry your culture' },
      { id:'pageturners',        name:'Pageturners',              icon:'✍️', colour:'#8b5cf6', path:'/programmes/pageturners',             why:'Your voice, your story, your credit' },
      { id:'gtechcasters',       name:'G-Tech Casters',           icon:'🎙️', colour:'#06b6d4', path:'/programmes/gtechcasters',            why:'Broadcast what you know' },
      { id:'techreneurs',        name:'TECHreneurs',              icon:'💻', colour:'#3b82f6', path:'/programmes/techreneurs',             why:'Build a business around what you know' },
      { id:'bright-sparks',      name:'Bright Sparks',            icon:'✨', colour:'#fbbf24', path:'/programmes/bright-sparks',           why:'Still finding your spark? This is exactly where to start' },
    ],
  };
  const pool = all[door];
  const term = carry.toLowerCase().trim();
  const tagMap: Record<string, string[]> = {
    music:['trubble-n-bass','gtechcasters'], tech:['techreneurs','stemgeneers'],
    repair:['stemgeneers'], cooking:['auntie-anansis-kitchen'], hair:['roots'],
    fashion:['silk-stilettos'], writing:['pageturners'], wellbeing:['roots'],
    business:['techreneurs'], storytelling:['pageturners','gtechcasters'],
    community:['bright-sparks'], sport:['bright-sparks'], history:['pageturners'],
    art:['silk-stilettos'],
  };
  const scored = pool.map(s => {
    let score = 0;
    if (term) {
      if (s.name.toLowerCase().includes(term)) score += 3;
      if (s.why.toLowerCase().includes(term))  score += 2;
      Object.entries(tagMap).forEach(([tag, ids]) => {
        if (term.includes(tag) && ids.includes(s.id)) score += 4;
      });
    }
    return { ...s, score };
  }).sort((a, b) => b.score - a.score);
  const top = term ? scored.filter(s => s.score > 0).slice(0, 3) : scored.slice(0, 3);
  // Bright Sparks is not a fallback — it is the curiosity threshold.
  // The honourable first choice for anyone still asking the right questions.
  if (top.length < 2) {
    const bs = pool.find(s => s.id === 'bright-sparks');
    if (bs && !top.find(s => s.id === 'bright-sparks')) top.push(bs);
  }
  return top;
}

const JoinFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep]     = useState<1|2|3>(1);
  const [door, setDoor]     = useState<Door|null>(null);
  const [carry, setCarry]   = useState('');
  const [inputVal, setInputVal] = useState('');

  const suggestions = door ? getSuggestions(door, carry) : [];
  const clubName  = door === 'A' ? 'Connoisseurs Club' : 'Passionistas Fan Club';
  const clubPath  = door === 'A' ? '/connoisseurs-club' : '/passionistas';
  const clubColour = door === 'A' ? '#aa0000' : '#1D9E75';

  const handleDoor = (d: Door) => { setDoor(d); setTimeout(() => setStep(2), 300); };
  const handleCarry = (val: string) => { setCarry(val); setInputVal(val); setTimeout(() => setStep(3), 200); };
  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && inputVal.trim()) handleCarry(inputVal.trim()); };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {step >= 1 && (
          <div className={`${styles.step} ${step > 1 ? styles.stepDone : styles.stepActive}`}>
            <p className={styles.question}>Which door is yours?</p>
            <div className={styles.doors}>
              <button className={`${styles.door} ${styles.doorA} ${door==='A' ? styles.doorChosen : ''}`} onClick={() => handleDoor('A')} disabled={step > 1}>
                <span className={styles.doorConvenor}>Convenor: Claude Fontanelle</span>
                <span className={styles.doorName}>The Connoisseurs Club</span>
                <span className={styles.doorFor}>For men</span>
                <span className={styles.doorLine}>"Forty years of knowledge doesn't retire."</span>
              </button>
              <button className={`${styles.door} ${styles.doorB} ${door==='B' ? styles.doorChosen : ''}`} onClick={() => handleDoor('B')} disabled={step > 1}>
                <span className={styles.doorConvenor}>Convenor: Judith Fontanelle</span>
                <span className={styles.doorName}>The Passionistas Fan Club</span>
                <span className={styles.doorFor}>For women</span>
                <span className={styles.doorLine}>"The Passionistas make it loud."</span>
              </button>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className={`${styles.step} ${step > 2 ? styles.stepDone : styles.stepActive}`}>
            <p className={styles.question}>What do you know that your community needs?</p>
            <p className={styles.questionSub}>One word is enough.</p>
            {step === 2 && (
              <>
                <div className={styles.inputRow}>
                  <input className={styles.carryInput} type="text" placeholder="music, cooking, tech, hair, stories..." value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={handleInput} autoFocus maxLength={40} />
                  <button className={styles.carrySubmit} onClick={() => inputVal.trim() && handleCarry(inputVal.trim())} disabled={!inputVal.trim()}>→</button>
                </div>
                <div className={styles.tagRow}>
                  {(door === 'A' ? DOOR_A_TAGS : DOOR_B_TAGS).map(tag => (
                    <button key={tag} className={styles.tag} onClick={() => handleCarry(tag)}>{tag}</button>
                  ))}
                  <button className={`${styles.tag} ${styles.tagSkip}`} onClick={() => handleCarry('')}>I haven't decided yet</button>
                </div>
              </>
            )}
            {step > 2 && carry && <p className={styles.stepSummary}>"{carry}"</p>}
          </div>
        )}

        {step >= 3 && (
          <div className={`${styles.step} ${styles.stepActive} ${styles.stepFinal}`}>
            <p className={styles.question}>
              {carry ? `Here's where to start with "${carry}".` : 'Bright Sparks is your door. The spark finds you there.'}
            </p>
            <p className={styles.questionSub}>Your community is waiting. These are your suggested starting points.</p>
            <div className={styles.suggestions}>
              {suggestions.map(s => (
                <a key={s.id} href={s.path} className={styles.suggestion} style={{ '--s-colour': s.colour } as React.CSSProperties}>
                  <span className={styles.suggestionIcon}>{s.icon}</span>
                  <div className={styles.suggestionText}>
                    <span className={styles.suggestionName}>{s.name}</span>
                    <span className={styles.suggestionWhy}>{s.why}</span>
                  </div>
                  <span className={styles.suggestionArrow}>→</span>
                </a>
              ))}
            </div>
            <div className={styles.clubJoin} style={{ borderColor: `${clubColour}44` }}>
              <span className={styles.clubJoinText}>And your community home is waiting —</span>
              <a href={clubPath} className={styles.clubJoinCta} style={{ color: clubColour }}>Join the {clubName} →</a>
            </div>
            <div className={styles.browseAll}>
              <a href="/programmes" className={styles.browseLink}>Browse all programmes</a>
              <span className={styles.browseSep}>·</span>
              <a href="/calendar" className={styles.browseLink}>See the schedule</a>
              <span className={styles.browseSep}>·</span>
              <button className={styles.browseLink} onClick={() => { setStep(1); setDoor(null); setCarry(''); setInputVal(''); }}>Start again</button>
            </div>
          </div>
        )}

        <div className={styles.footer}>
          <span>Wembley Wonders CIC · Free to join · All sessions on Zoom</span>
          <a href="/" className={styles.footerBack}>← Back home</a>
        </div>

      </div>
    </div>
  );
};

export default JoinFlow;
