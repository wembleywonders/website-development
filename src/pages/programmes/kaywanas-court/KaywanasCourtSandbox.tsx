// src/pages/programmes/kaywanas-court/sandbox.tsx
// Rebuilt: self-contained, no PageTemplate.
// Five tabs — 5Cs progression — as the landing for the sandbox tools.
// HeritagePerformanceBuilder and OralTraditionAdapter preserved exactly.
// ProductionPlannerV2 imported and mounted in Challenge tab.

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductionPlannerV2 from '../../../components/sandboxes/kaywanas-court/ProductionPlannerV2';

// ─── Colour tokens ────────────────────────────────────────────
const T = {
  pageBg:       '#0f172a',
  cardBg:       'rgba(30, 41, 59, 0.85)',
  cardBgDeep:   'rgba(15, 23, 42, 0.7)',
  cardBorder:   'rgba(148, 163, 184, 0.18)',
  bright:       '#f8fafc',
  main:         '#e2e8f0',
  mid:          '#cbd5e1',
  muted:        '#94a3b8',
  dim:          '#64748b',
  purple:       '#9d4edd',
  purpleBg:     'rgba(157, 78, 221, 0.12)',
  purpleBorder: 'rgba(157, 78, 221, 0.28)',
  gold:         '#fbbf24',
  goldBg:       'rgba(251, 191, 36, 0.1)',
  goldBorder:   'rgba(251, 191, 36, 0.25)',
  green:        '#10b981',
  greenBg:      'rgba(16, 185, 129, 0.12)',
  greenBorder:  'rgba(16, 185, 129, 0.25)',
  cyan:         '#06b6d4',
};

// ─── Tabs ─────────────────────────────────────────────────────
type TabId = 'connect' | 'create' | 'change' | 'challenge' | 'control';

const TABS = [
  { id: 'connect'   as TabId, label: 'Connect',   colour: T.purple },
  { id: 'create'    as TabId, label: 'Create',    colour: '#e63946' },
  { id: 'change'    as TabId, label: 'Change',    colour: T.gold },
  { id: 'challenge' as TabId, label: 'Challenge', colour: T.green },
  { id: 'control'   as TabId, label: 'Control',   colour: T.cyan },
];

// ─── Shared sub-components ────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; accent?: string; style?: React.CSSProperties }> = ({ children, accent, style }) => (
  <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderLeft: accent ? `4px solid ${accent}` : undefined, borderRadius: 12, padding: '1.5rem', ...style }}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ margin: '0 0 1rem', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: T.bright, lineHeight: 1.25 }}>
    {children}
  </h2>
);

const Grid: React.FC<{ children: React.ReactNode; cols?: string }> = ({ children, cols = 'repeat(auto-fit, minmax(240px, 1fr))' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1rem' }}>
    {children}
  </div>
);

const ComingSoon: React.FC = () => (
  <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: T.gold, background: T.goldBg, border: `1px solid ${T.goldBorder}`, borderRadius: 100, padding: '2px 8px', marginLeft: '0.5rem' }}>
    Coming soon
  </span>
);

// ─── Heritage data ────────────────────────────────────────────
interface HeritageTradition {
  id: string; name: string; region: string; flag: string;
  description: string; keyElements: string[];
  languageOptions: string[]; audienceSize: string; suggestedVenue: string;
}

const HERITAGE_TRADITIONS: HeritageTradition[] = [
  { id: 'yard-theatre',    name: 'Yard Theatre',         region: 'Jamaica / Caribbean',    flag: '🇯🇲', description: 'Intimate community theatre in non-traditional spaces. Audience and performers share the same level. Breaking the fourth wall is expected.',                  keyElements: ['Audience participation', 'Call and response', 'Improvisation welcome', 'Community space setting'],    languageOptions: ['Jamaican Patois', 'Standard English', 'Code-switching'],                    audienceSize: '20-50 people',   suggestedVenue: 'Community hall, church hall, actual yard' },
  { id: 'dub-poetry',      name: 'Dub Poetry',           region: 'Jamaica / UK',            flag: '🎤', description: 'Word, sound, and power. Poetry performed to rhythm, often with live or recorded music. Political, personal, powerful.',                                      keyElements: ['Rhythm and beat', 'Patois language', 'Political content', 'Live music backing'],                      languageOptions: ['Jamaican Patois', 'Nation Language', 'Mixed registers'],                     audienceSize: '30-200 people',  suggestedVenue: 'Music venue, theatre, community centre' },
  { id: 'griot',           name: 'Griot Storytelling',   region: 'West Africa',             flag: '🌍', description: 'The West African tradition of the griot — keeper of history, genealogy, and wisdom. One storyteller commands the room through narrative mastery.',           keyElements: ['Solo performer', 'Genealogy/history', 'Proverbs and wisdom', 'Kora or other instrument'],             languageOptions: ['Twi', 'Yoruba', 'English with heritage phrases', 'Multilingual'],           audienceSize: '20-100 people',  suggestedVenue: 'Intimate theatre, community gathering, library' },
  { id: 'calypso-tent',    name: 'Calypso Tent',         region: 'Trinidad & Tobago',       flag: '🇹🇹', description: 'Social commentary through song. Wit, metaphor, and melody speaking truth to power. Extempo battles and picong exchanges.',                                  keyElements: ['Calypso music', 'Social/political commentary', 'Competition element', 'Audience voting'],             languageOptions: ['Trinidadian Creole', 'Standard English', 'Calypso slang'],                  audienceSize: '50-300 people',  suggestedVenue: 'Large hall, outdoor tent, festival stage' },
  { id: 'jamaican-panto',  name: 'Jamaican Pantomime',   region: 'Jamaica',                 flag: '🇯🇲', description: 'Not British panto — Jamaican pantomime. Folk tales, music, dance, social satire. The Little Theatre Movement tradition.',                                   keyElements: ['Folk tales (often Anansi)', 'Original music', 'Dance integration', 'Social satire'],                  languageOptions: ['Jamaican Patois', 'Standard English', 'Song in either'],                     audienceSize: '100-500 people', suggestedVenue: 'Theatre, large community hall' },
  { id: 'concert-party',   name: 'Concert Party',        region: 'Ghana',                   flag: '🇬🇭', description: 'Popular theatre mixing comedy, music, dance, and moral instruction. Accessible, entertaining theatre for everyday concerns.',                               keyElements: ['Comedy sketches', 'Musical numbers', 'Moral lessons', 'Audience interaction'],                        languageOptions: ['Twi', 'Ga', 'Pidgin', 'English'],                                           audienceSize: '50-200 people',  suggestedVenue: 'Community hall, outdoor stage' },
  { id: 'masquerade',      name: 'Masquerade',           region: 'West Africa / Caribbean', flag: '🎭', description: 'Masked performance tradition — transformation, spirit embodiment, community ritual. Costume as theatrical technology.',                                       keyElements: ['Elaborate masks/costumes', 'Character transformation', 'Ritual elements', 'Music and drumming'],      languageOptions: ['Minimal dialogue', 'Heritage language chants', 'Drumming communication'],    audienceSize: '50-500 people',  suggestedVenue: 'Outdoor space, large hall, festival' },
  { id: 'dinner-theatre',  name: 'Dinner Theatre',       region: 'Wembley Wonders Original',flag: '🍲', description: "Performance + meal from Auntie Anansi's Kitchen. Food and story intertwined. Theatre you can taste.",                                                        keyElements: ['Multi-course meal', 'Intimate staging', 'Food matches story', 'Q&A with cooks'],                      languageOptions: ['Any heritage language', 'Multilingual welcome', 'Food names in original'],   audienceSize: '30-60 people',   suggestedVenue: 'Venue with kitchen access, community hall' },
];

interface AnansiStory {
  id: string; title: string; originalSource: string;
  summary: string; themes: string[]; characters: string[];
  stageAdaptationNotes: string;
}

const ANANSI_STORIES: AnansiStory[] = [
  { id: 'anansi-stories',  title: 'How Anansi Got All the Stories',     originalSource: 'Akan / Ashanti',   summary: 'Anansi tricks Nyame to get ownership of all stories. Captures a python, hornets, and a leopard through cunning.',                               themes: ['Cunning over strength', 'Value of stories', 'Trickster wisdom'],          characters: ['Anansi', 'Nyame', 'Python', 'Hornets', 'Leopard', "Aso (Anansi's wife)"], stageAdaptationNotes: 'Classic opening piece. Can be told straight or adapted to contemporary setting. The three captures work as three acts.' },
  { id: 'anansi-tiger',    title: 'Anansi and Tiger',                    originalSource: 'Jamaica',          summary: 'Anansi repeatedly tricks Tiger, winning through wit what he cannot win through strength.',                                                       themes: ['Small defeating large', 'Wit vs power', 'Survival through cunning'],      characters: ['Anansi', 'Tiger', 'Various animals'],                                   stageAdaptationNotes: 'Good for physical comedy. Tiger can be played as colonial authority figure for political reading.' },
  { id: 'anansi-pot',      title: 'Anansi and the Pot of Wisdom',        originalSource: 'Akan / Caribbean', summary: "Anansi tries to hoard all wisdom in a pot. His son's suggestion defeats him. He realizes wisdom is everywhere.",                                themes: ['Wisdom cannot be hoarded', 'Pride before fall', 'Children teach parents'], characters: ['Anansi', 'Ntikuma (son)', 'Villagers'],                                  stageAdaptationNotes: 'Great for intergenerational casting. Message about shared knowledge relevant to education themes.' },
  { id: 'anansi-banana',   title: 'Anansi and the Banana Plantation',    originalSource: 'Jamaica',          summary: "Anansi fakes his own death to steal from a banana plantation. His greed is eventually exposed.",                                                themes: ['Greed punished', 'Community accountability', 'Consequences of deception'],characters: ['Anansi', 'Aso', 'Community members', 'Plantation owner'],              stageAdaptationNotes: "The 'funeral' scene is theatrical gold. Can comment on capitalism and community economics." },
  { id: 'anansi-legs',     title: 'Why Anansi Has Eight Thin Legs',      originalSource: 'Ghana / Caribbean',summary: "Greedy Anansi ties strings to himself for every village feast. All happen at once — he's stretched thin.",                                      themes: ["Greed punished", "Can't have everything", 'Physical comedy'],             characters: ['Anansi', 'Multiple village hosts'],                                     stageAdaptationNotes: 'Excellent for physical theatre and puppetry. The pulling scene works with ropes and audience participation.' },
];

// ─── Heritage Performance Builder (preserved exactly) ─────────
const HeritagePerformanceBuilder: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedTradition, setSelectedTradition] = useState<HeritageTradition | null>(null);
  const [performanceDetails, setPerformanceDetails] = useState({ title: '', language: '', theme: '', duration: '30', audienceType: 'mixed', elderInvolvement: false, notes: '' });
  const [step, setStep] = useState(1);

  const handleDownload = () => {
    if (!selectedTradition) return;
    const content = `HERITAGE PERFORMANCE CONCEPT\n============================\n\nTRADITION: ${selectedTradition.name}\nREGION: ${selectedTradition.region}\n\nTitle: ${performanceDetails.title || '[Untitled]'}\nLanguage: ${performanceDetails.language || 'Not specified'}\nTheme: ${performanceDetails.theme || 'Not specified'}\nDuration: ${performanceDetails.duration} minutes\nAudience: ${performanceDetails.audienceType}\nElder Involvement: ${performanceDetails.elderInvolvement ? 'Yes' : 'No'}\n\nKey Elements:\n${selectedTradition.keyElements.map(el => `• ${el}`).join('\n')}\n\nSuggested Venue: ${selectedTradition.suggestedVenue}\nAudience Size: ${selectedTradition.audienceSize}\n\nNotes: ${performanceDetails.notes || 'None'}\n\n============================\nReady to make this real? Join Wembley Wonders.\nkaywanas-court@wembleywonders.org`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `heritage-performance-${selectedTradition.id}-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.625rem 0.875rem', background: 'rgba(15,23,42,0.8)', border: `1px solid ${T.cardBorder}`, borderRadius: 8, color: T.bright, fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: T.bright }}>🎭 Heritage Performance Builder</h3>
        <button onClick={onClose} style={{ background: 'none', border: `1px solid ${T.cardBorder}`, borderRadius: 6, color: T.muted, padding: '0.375rem 0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>← Back</button>
      </div>

      {step === 1 && (
        <div>
          <p style={{ margin: '0 0 1.25rem', color: T.mid, fontSize: '0.95rem' }}>Choose a performance tradition. Each carries centuries of wisdom about how to connect with audiences.</p>
          <Grid cols="repeat(auto-fill, minmax(200px, 1fr))">
            {HERITAGE_TRADITIONS.map(t => (
              <button key={t.id} onClick={() => setSelectedTradition(t)} style={{ textAlign: 'left', padding: '1.25rem', background: selectedTradition?.id === t.id ? T.purpleBg : T.cardBg, border: `2px solid ${selectedTradition?.id === t.id ? T.purple : T.cardBorder}`, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{t.flag}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: T.bright }}>{t.name}</span>
                <span style={{ fontSize: '0.75rem', color: T.dim }}>{t.region}</span>
                <span style={{ fontSize: '0.8rem', color: T.mid, lineHeight: 1.4 }}>{t.description.slice(0, 80)}…</span>
              </button>
            ))}
          </Grid>
          {selectedTradition && (
            <button onClick={() => setStep(2)} style={{ marginTop: '1.25rem', padding: '0.75rem 1.75rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              Continue with {selectedTradition.name} →
            </button>
          )}
        </div>
      )}

      {step === 2 && selectedTradition && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ margin: 0, color: T.mid }}>Shape your concept within the <strong style={{ color: T.bright }}>{selectedTradition.name}</strong> tradition.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'Performance Title', key: 'title', type: 'text', placeholder: "What's your show called?" },
              { label: 'Theme / Story', key: 'theme', type: 'text', placeholder: "What's the story or theme?" },
            ].map(f => (
              <div key={f.key}><label style={labelStyle}>{f.label}</label><input type="text" placeholder={f.placeholder} value={(performanceDetails as any)[f.key]} onChange={e => setPerformanceDetails({...performanceDetails, [f.key]: e.target.value})} style={inputStyle} /></div>
            ))}
            <div><label style={labelStyle}>Primary Language</label>
              <select value={performanceDetails.language} onChange={e => setPerformanceDetails({...performanceDetails, language: e.target.value})} style={inputStyle}>
                <option value="">Select language...</option>
                {selectedTradition.languageOptions.map(l => <option key={l} value={l}>{l}</option>)}
                <option value="other">Other heritage language</option>
              </select>
            </div>
            <div><label style={labelStyle}>Duration</label>
              <select value={performanceDetails.duration} onChange={e => setPerformanceDetails({...performanceDetails, duration: e.target.value})} style={inputStyle}>
                {[['15','15 minutes (short)'],['30','30 minutes (standard)'],['45','45 minutes (extended)'],['60','60 minutes (full show)'],['90','90 minutes (with interval)']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Target Audience</label>
              <select value={performanceDetails.audienceType} onChange={e => setPerformanceDetails({...performanceDetails, audienceType: e.target.value})} style={inputStyle}>
                {[['mixed','Mixed community audience'],['family','Family-friendly (all ages)'],['adult','Adult themes'],['heritage-speakers','Heritage language speakers'],['youth','Youth focus'],['elder','Elder-centred']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div><label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none', letterSpacing: 0 }}><input type="checkbox" checked={performanceDetails.elderInvolvement} onChange={e => setPerformanceDetails({...performanceDetails, elderInvolvement: e.target.checked})} /> Include elder involvement (cultural advisor, storyteller, or performer)</label></div>
          <div><label style={labelStyle}>Additional Notes</label><textarea placeholder="Any other details about your vision..." value={performanceDetails.notes} onChange={e => setPerformanceDetails({...performanceDetails, notes: e.target.value})} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} /></div>
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <button onClick={() => setStep(1)} style={{ padding: '0.75rem 1.25rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.muted, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
            <button onClick={() => setStep(3)} style={{ padding: '0.75rem 1.75rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Review Concept →</button>
          </div>
        </div>
      )}

      {step === 3 && selectedTradition && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card accent={T.purple}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem' }}>{selectedTradition.flag}</span>
              <div>
                <h4 style={{ margin: '0 0 0.25rem', color: T.bright, fontSize: '1.15rem', fontWeight: 700 }}>{performanceDetails.title || 'Untitled Performance'}</h4>
                <p style={{ margin: 0, color: T.dim, fontSize: '0.85rem' }}>{selectedTradition.name} · {selectedTradition.region}</p>
              </div>
            </div>
            {[['Language', performanceDetails.language || 'Not specified'],['Theme', performanceDetails.theme || 'Not specified'],['Duration', `${performanceDetails.duration} minutes`],['Audience', performanceDetails.audienceType],['Elder Involvement', performanceDetails.elderInvolvement ? 'Yes ✓' : 'No']].map(([l,v]) => (
              <div key={l} style={{ display: 'flex', gap: '0.75rem', padding: '0.375rem 0', borderBottom: `1px solid ${T.cardBorder}` }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: T.dim, minWidth: 120 }}>{l}</span>
                <span style={{ fontSize: '0.875rem', color: T.main }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 700, color: T.dim }}>Key tradition elements:</p>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>{selectedTradition.keyElements.map(e => <li key={e} style={{ fontSize: '0.85rem', color: T.mid, padding: '0.2rem 0' }}>{e}</li>)}</ul>
            </div>
          </Card>
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <button onClick={handleDownload} style={{ padding: '0.75rem 1.5rem', background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10, color: T.green, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📥 Download Concept</button>
            <button onClick={() => setStep(2)} style={{ padding: '0.75rem 1.25rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.muted, cursor: 'pointer', fontFamily: 'inherit' }}>← Edit</button>
          </div>
          <Card>
            <h4 style={{ margin: '0 0 0.5rem', color: T.bright }}>Ready to make this real?</h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>Join Wembley Wonders to submit this as a production proposal. You'll get cross-programme collaboration, venue booking, and 55% revenue share.</p>
            <Link to="/auth/signup" style={{ padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, borderRadius: 10, color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Join free →</Link>
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── Oral Tradition / Anansi Adapter (preserved exactly) ──────
const OralTraditionAdapter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedStory, setSelectedStory] = useState<AnansiStory | null>(null);
  const [adaptation, setAdaptation] = useState({ setting: 'traditional', language: 'patois', modernElements: '', targetAge: 'family', castSize: '3-5', specialNotes: '' });

  const handleDownload = () => {
    if (!selectedStory) return;
    const content = `ANANSI ADAPTATION CONCEPT\n=========================\n\nORIGINAL: ${selectedStory.title}\nSource: ${selectedStory.originalSource}\nSummary: ${selectedStory.summary}\n\nAdaptation:\nSetting: ${adaptation.setting}\nLanguage: ${adaptation.language}\nAudience: ${adaptation.targetAge}\nCast: ${adaptation.castSize}\n\nModern Elements: ${adaptation.modernElements || 'None'}\nNotes: ${adaptation.specialNotes || 'None'}\n\nStaging Tip: ${selectedStory.stageAdaptationNotes}\n\n=========================\nJoin Wembley Wonders to develop this.\npageturners@wembleywonders.org`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `anansi-adaptation-${selectedStory.id}-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.625rem 0.875rem', background: 'rgba(15,23,42,0.8)', border: `1px solid ${T.cardBorder}`, borderRadius: 8, color: T.bright, fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: T.bright }}>🕷️ Anansi Story Adapter</h3>
        <button onClick={onClose} style={{ background: 'none', border: `1px solid ${T.cardBorder}`, borderRadius: 6, color: T.muted, padding: '0.375rem 0.875rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>← Back</button>
      </div>
      <p style={{ margin: 0, color: T.mid, fontSize: '0.95rem', lineHeight: 1.6 }}>Anansi stories have been adapted for stage since Jamaica's Little Theatre Movement in the 1940s. Plan your adaptation — honouring the source while making it yours.</p>

      {!selectedStory ? (
        <div>
          <Grid>
            {ANANSI_STORIES.map(s => (
              <button key={s.id} onClick={() => setSelectedStory(s)} style={{ textAlign: 'left', padding: '1.25rem', background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: T.bright }}>🕷️ {s.title}</span>
                <span style={{ fontSize: '0.75rem', color: T.purple }}>{s.originalSource}</span>
                <span style={{ fontSize: '0.825rem', color: T.mid, lineHeight: 1.5 }}>{s.summary}</span>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {s.themes.map(th => <span key={th} style={{ fontSize: '0.72rem', padding: '2px 8px', background: T.purpleBg, border: `1px solid ${T.purpleBorder}`, borderRadius: 100, color: T.purple }}>{th}</span>)}
                </div>
              </button>
            ))}
          </Grid>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card accent={T.gold}>
            <p style={{ margin: '0 0 0.375rem', fontSize: '0.8rem', color: T.dim }}>Selected story</p>
            <h4 style={{ margin: '0 0 0.25rem', color: T.bright }}>🕷️ {selectedStory.title}</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: T.dim }}>{selectedStory.originalSource}</p>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: T.mid, lineHeight: 1.5, fontStyle: 'italic' }}>💡 {selectedStory.stageAdaptationNotes}</p>
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div><label style={labelStyle}>Setting</label>
              <select value={adaptation.setting} onChange={e => setAdaptation({...adaptation, setting: e.target.value})} style={inputStyle}>
                {[['traditional','Traditional / Historical Africa'],['colonial','Colonial Jamaica'],['contemporary','Contemporary Wembley'],['afrofuturist','Afrofuturist / Speculative']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Primary Language</label>
              <select value={adaptation.language} onChange={e => setAdaptation({...adaptation, language: e.target.value})} style={inputStyle}>
                {[['patois','Jamaican Patois'],['twi','Twi (with English)'],['english','Standard English'],['mixed','Mixed heritage languages']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Target Audience</label>
              <select value={adaptation.targetAge} onChange={e => setAdaptation({...adaptation, targetAge: e.target.value})} style={inputStyle}>
                {[['children','Children (under 12)'],['family','Family (all ages)'],['youth','Youth (12-18)'],['adult','Adult themes']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Cast Size</label>
              <select value={adaptation.castSize} onChange={e => setAdaptation({...adaptation, castSize: e.target.value})} style={inputStyle}>
                {[['1','Solo (1 performer)'],['2-3','Small (2-3)'],['3-5','Medium (3-5)'],['5-10','Large (5-10)'],['ensemble','Ensemble (10+)']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div><label style={labelStyle}>Modern Elements to Include</label><textarea placeholder="How will you update this story? What contemporary references? What local Wembley connections?" value={adaptation.modernElements} onChange={e => setAdaptation({...adaptation, modernElements: e.target.value})} style={{ ...inputStyle, minHeight: 72, resize: 'vertical' }} /></div>
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <button onClick={() => setSelectedStory(null)} style={{ padding: '0.75rem 1.25rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.muted, cursor: 'pointer', fontFamily: 'inherit' }}>← Choose different story</button>
            <button onClick={handleDownload} style={{ padding: '0.75rem 1.5rem', background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 10, color: T.green, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>📥 Download Adaptation Plan</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Tab content components ───────────────────────────────────

const ConnectTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Card accent={T.purple}>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.4rem', fontWeight: 800, color: T.bright }}>🎭 Try the tools before you commit</h2>
      <p style={{ margin: '0 0 1rem', fontSize: '0.975rem', color: T.mid, lineHeight: 1.7 }}>
        This sandbox gives you three free plans — no signup, no commitment. Use the Heritage Performance Builder to plan productions rooted in diaspora traditions. Adapt Anansi stories. Run the Production Planner to see what a real show costs and earns. Download everything as a text file and take it with you.
      </p>
      <p style={{ margin: 0, fontSize: '0.875rem', color: T.dim }}>
        When you're ready to make it real — submit proposals, join production teams, earn 55% — that's when you join.
      </p>
    </Card>

    <div>
      <SectionTitle>Dedicated to the pioneers</SectionTitle>
      <Grid>
        {[
          { name: 'Louise Bennett-Coverley', desc: 'Proved Patois is a literary language. Made Jamaica laugh, think, and recognise itself. Miss Lou forever.' },
          { name: 'Pearl Connor',            desc: 'Built The Negro Theatre Workshop (1961), creating space for Black actors when mainstream theatre shut them out.' },
          { name: 'Yvonne Brewster',         desc: "Founded Talawa Theatre Company (1985), the UK's first Black-led theatre company." },
          { name: 'Wole Soyinka',            desc: "Showed the world that African ritual is theatre. Nobel laureate who never abandoned the village for the academy." },
          { name: 'Derek Walcott',           desc: 'Gave Caribbean stories epic form. Made the sea a stage and ancestors into characters.' },
          { name: 'Kamau Brathwaite',        desc: 'Created "Nation Language" — the theory that validated Caribbean speech as poetic form.' },
        ].map(p => (
          <Card key={p.name} accent={T.purple}>
            <h4 style={{ margin: '0 0 0.375rem', fontSize: '0.975rem', fontWeight: 700, color: T.bright }}>{p.name}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: T.mid, lineHeight: 1.55 }}>{p.desc}</p>
          </Card>
        ))}
      </Grid>
      <p style={{ margin: '1rem 0 0', fontSize: '0.85rem', color: T.dim, fontStyle: 'italic' }}>
        We stand on their shoulders. This sandbox honours their legacy by helping the next generation create heritage theatre.
      </p>
    </div>

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Link to="/programmes/kaywanas-court" style={{ padding: '0.75rem 1.5rem', background: T.purpleBg, border: `1px solid ${T.purpleBorder}`, borderRadius: 10, color: T.purple, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
        ← Back to Kaywana's Court
      </Link>
      <Link to="/auth/signup" style={{ padding: '0.75rem 1.5rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, borderRadius: 10, color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
        Join free
      </Link>
    </div>
  </div>
);

const CreateTab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'none' | 'heritage' | 'anansi'>('none');

  if (activeTool === 'heritage') return <HeritagePerformanceBuilder onClose={() => setActiveTool('none')} />;
  if (activeTool === 'anansi')   return <OralTraditionAdapter onClose={() => setActiveTool('none')} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <p style={{ margin: 0, fontSize: '1rem', color: T.mid, lineHeight: 1.7 }}>
        Two working tools — ready to use now. Pick the one that matches where you are.
      </p>

      <Grid cols="repeat(auto-fit, minmax(280px, 1fr))">
        <Card accent="#e63946" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ fontSize: '2rem' }}>🎭</div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: T.bright }}>Heritage Performance Builder</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>
            Choose from 8 diaspora performance traditions — yard theatre, dub poetry, griot storytelling, calypso tent, and more. Define your concept, pick your language, download your plan.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {['Caribbean traditions', 'African traditions', 'Heritage language options', 'Elder involvement'].map(f => (
              <span key={f} style={{ fontSize: '0.72rem', padding: '2px 8px', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 100, color: T.muted }}>{f}</span>
            ))}
          </div>
          <button onClick={() => setActiveTool('heritage')} style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', background: '#e63946', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
            Build Heritage Performance →
          </button>
        </Card>

        <Card accent={T.gold} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ fontSize: '2rem' }}>🕷️</div>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: T.bright }}>Anansi Story Adapter</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>
            Five classic Anansi stories with staging notes. Plan adaptations from traditional to contemporary, from Patois to Twi. Honour the source while making it yours. Download your adaptation plan.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {['5 classic stories', 'Staging suggestions', 'Setting options', 'Language choices'].map(f => (
              <span key={f} style={{ fontSize: '0.72rem', padding: '2px 8px', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 100, color: T.muted }}>{f}</span>
            ))}
          </div>
          <button onClick={() => setActiveTool('anansi')} style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', background: T.gold, border: 'none', borderRadius: 10, color: '#0f172a', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
            Adapt Anansi Story →
          </button>
        </Card>
      </Grid>

      <Card style={{ background: T.cardBgDeep }}>
        <h4 style={{ margin: '0 0 0.5rem', color: T.bright }}>Also in development</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['🗣️ Heritage Language Script Tool — write dialogue in Patois, Pidgin, Creole, Twi', '🍲 Dinner Theatre Planner — pair Auntie Anansi\'s Kitchen menus with your show'].map(i => (
            <div key={i} style={{ fontSize: '0.875rem', color: T.muted }}>{i} <ComingSoon /></div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const ChangeTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <p style={{ margin: 0, fontSize: '1rem', color: T.mid, lineHeight: 1.7 }}>
      The Intergenerational Story Bridge connects elder storytellers with young performers. It's the most ambitious tool we're building — and the most important.
    </p>

    <Card accent={T.gold} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '2rem' }}>👵</div>
      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: T.bright }}>Intergenerational Story Bridge <ComingSoon /></h3>
      <p style={{ margin: 0, fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>
        A structured process for capturing elder knowledge and turning it into stage performances. Not just recording — co-creating. The elder brings the story. The young performer brings the stage craft. Both perform together. The tradition passes and transforms in one production.
      </p>
      <Grid>
        {[
          { icon: '📖', name: 'Elder Interview Guide',       desc: 'Structured questions to draw out performance-ready stories — arrival stories, community memories, heritage knowledge.' },
          { icon: '📝', name: 'Story Capture Template',      desc: 'Document the story in a format that bridges oral and written — ready for Pageturners to develop into a script.' },
          { icon: '🔄', name: 'Youth Adaptation Framework',  desc: 'A six-week process for turning the captured story into a stage performance with the elder as cultural advisor.' },
          { icon: '🎙️', name: 'Archive Coordination',        desc: 'Professional-quality recording for the Roots Archive — the performance lives beyond the show.' },
        ].map(f => (
          <Card key={f.name} style={{ background: T.cardBgDeep }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.375rem' }}>{f.icon}</div>
            <h4 style={{ margin: '0 0 0.375rem', fontSize: '0.925rem', fontWeight: 700, color: T.bright }}>{f.name}</h4>
            <p style={{ margin: 0, fontSize: '0.825rem', color: T.mid, lineHeight: 1.5 }}>{f.desc}</p>
          </Card>
        ))}
      </Grid>
      <p style={{ margin: 0, fontSize: '0.875rem', color: T.dim, fontStyle: 'italic' }}>
        Know an elder with stories worth telling? <Link to="/contact?subject=elder-storyteller" style={{ color: T.gold }}>Tell us about them.</Link>
      </p>
    </Card>
  </div>
);

const ChallengeTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <SectionTitle>📋 Production Planner</SectionTitle>
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.975rem', color: T.mid, lineHeight: 1.7 }}>
        The flagship tool. Plan a complete production from concept to curtain call — 14-week timeline, realistic budget, cross-programme collaboration map, cultural season matching. Three free plans.
      </p>
      <div style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}`, borderRadius: 16, padding: '1.5rem', overflow: 'hidden' }}>
        <ProductionPlannerV2 />
      </div>
    </div>
  </div>
);

const ControlTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

    <div>
      <SectionTitle>⚙️ Technical Production Tools</SectionTitle>
      <p style={{ margin: '0 0 1.25rem', fontSize: '0.975rem', color: T.mid, lineHeight: 1.6 }}>
        Every great performance needs technical crew. These simulators are in development — designed for STEMgeneers members who want to move into production technical roles.
      </p>
      <Grid>
        {[
          { icon: '🎙️', name: 'Sound Mixing Simulator',      desc: 'Record, mix, and master radio dramas for Rayd-yo broadcast. 8-track virtual mixing board.' },
          { icon: '💡', name: 'Lighting Designer',            desc: 'Design lighting cues for live performances at Park Lane Methodist.' },
          { icon: '⚙️', name: 'Stage Technology',             desc: 'Plan stage automation and scene changes. Build cue sheets for live performances.' },
          { icon: '📡', name: 'Broadcast Control Room',       desc: 'Run live Rayd-yo broadcasts. Mix multiple audio sources, handle talk-back and music beds.' },
          { icon: '🔧', name: 'Recording Equipment Setup',    desc: 'Learn mic placement and monitoring. Avoid common recording mistakes.' },
          { icon: '🚨', name: 'Technical Problem Solver',     desc: 'Interactive troubleshooting: "The mic isn\'t working!" Practice fixing issues during live shows.' },
        ].map(t => (
          <Card key={t.name} style={{ opacity: 0.7 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.icon}</div>
            <h4 style={{ margin: '0 0 0.375rem', fontSize: '0.975rem', fontWeight: 700, color: T.bright }}>{t.name} <ComingSoon /></h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: T.mid, lineHeight: 1.5 }}>{t.desc}</p>
          </Card>
        ))}
      </Grid>
    </div>

    <div>
      <SectionTitle>Free vs Member Access</SectionTitle>
      <Grid cols="repeat(auto-fit, minmax(240px, 1fr))">
        <Card>
          <h3 style={{ margin: '0 0 0.375rem', color: T.bright }}>Free Explorer</h3>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: T.muted, marginBottom: '1rem' }}>£0</div>
          {[['✓','Plan 3 production concepts'],['✓','Heritage Performance Builder'],['✓','Anansi Story Adapter'],['✓','Production Planner (3 plans)'],['✓','Download plans as .txt'],['✗','Cannot submit real proposals'],['✗','Cannot join production teams'],['✗','Cannot perform on The Grand Stage']].map(([s,l]) => (
            <div key={l} style={{ fontSize: '0.85rem', color: s === '✓' ? T.mid : T.dim, padding: '0.25rem 0', display: 'flex', gap: '0.5rem' }}><span style={{ color: s === '✓' ? T.green : T.dim }}>{s}</span>{l}</div>
          ))}
        </Card>
        <Card accent={T.gold} style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-10px', right: '1rem', background: T.gold, color: '#0f172a', fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase' }}>Best Value</span>
          <h3 style={{ margin: '0 0 0.375rem', color: T.bright }}>Programme Member</h3>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: T.gold, marginBottom: '1rem' }}>From £15/month</div>
          {[['✓','Unlimited production proposals'],['✓','Vote on seasonal show selection'],['✓','Join cross-programme teams'],['✓','Perform / produce heritage theatre'],['✓','Broadcast on Rayd-yo'],['✓','55% revenue share'],['✓','Elder storyteller network access']].map(([s,l]) => (
            <div key={l} style={{ fontSize: '0.85rem', color: T.mid, padding: '0.25rem 0', display: 'flex', gap: '0.5rem' }}><span style={{ color: T.green }}>{s}</span>{l}</div>
          ))}
          <div style={{ marginTop: '1rem', padding: '0.875rem', background: T.cardBgDeep, borderRadius: 8, fontSize: '0.8rem', color: T.dim, lineHeight: 1.6 }}>
            £15/mo — 1 programme + Kaywana's Court<br/>
            £35/mo — 3 programmes + priority roles<br/>
            £50/mo — ALL 9 programmes + leadership
          </div>
          <Link to="/auth/signup" style={{ display: 'block', marginTop: '1rem', padding: '0.75rem 1.25rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, borderRadius: 10, color: '#fff', fontWeight: 700, textDecoration: 'none', textAlign: 'center', fontSize: '0.9rem' }}>
            Join Wembley Wonders →
          </Link>
        </Card>
      </Grid>
    </div>
  </div>
);

// ─── Main sandbox page ────────────────────────────────────────
const TAB_CONTENT: Record<TabId, React.FC> = {
  connect:   ConnectTab,
  create:    CreateTab,
  change:    ChangeTab,
  challenge: ChallengeTab,
  control:   ControlTab,
};

const KaywanasCourtSandbox: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('create'); // Default: Create — tools first

  useEffect(() => {
    const hash = location.hash.replace('#', '') as TabId;
    if (TABS.find(t => t.id === hash)) setActiveTab(hash);
  }, [location.hash]);

  const handleTab = (id: TabId) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const Content = TAB_CONTENT[activeTab];

  return (
    <div style={{
      minHeight:  '100vh',
      background: T.pageBg,
      color:      T.main,
      paddingTop: 80,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      {/* Header */}
      <div style={{ background: T.cardBgDeep, borderBottom: `1px solid ${T.cardBorder}`, padding: '2rem 1.25rem 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.purple, background: T.purpleBg, border: `1px solid ${T.purpleBorder}`, borderRadius: 100, padding: '3px 12px' }}>
                Sandbox · Kaywana's Court
              </span>
              <span style={{ fontSize: '0.75rem', color: T.dim }}>3 free plans · No signup required</span>
            </div>
            <h1 style={{ margin: '0 0 0.375rem', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: T.bright, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Heritage Production Sandbox
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', color: T.muted, lineHeight: 1.6 }}>
              Plan diaspora theatre productions. Adapt Anansi stories. Try the Production Planner. Take your plans away.
            </p>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TABS.map(tab => {
              const isActive = tab.id === activeTab;
              return (
                <button key={tab.id} onClick={() => handleTab(tab.id)} style={{
                  padding:      '0.75rem 1.25rem',
                  background:   isActive ? T.pageBg : 'transparent',
                  border:       'none',
                  borderBottom: isActive ? `3px solid ${tab.colour}` : '3px solid transparent',
                  borderRadius: '8px 8px 0 0',
                  cursor:       'pointer',
                  fontFamily:   'inherit',
                  fontSize:     '0.925rem',
                  fontWeight:   isActive ? 700 : 500,
                  color:        isActive ? T.bright : T.muted,
                  whiteSpace:   'nowrap',
                  flexShrink:   0,
                  transition:   'all 0.15s ease',
                }}>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        <Content />
      </div>
    </div>
  );
};

export default KaywanasCourtSandbox;