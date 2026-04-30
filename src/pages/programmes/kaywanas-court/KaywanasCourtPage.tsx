import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CompanionStrip, { DockButton } from '../../../components/sandbox/CompanionStrip';
import { useDockState } from '../../../hooks/useDockState';

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
  purpleLight:  '#c084fc',
  purpleBg:     'rgba(157, 78, 221, 0.12)',
  purpleBorder: 'rgba(157, 78, 221, 0.28)',
  gold:         '#fbbf24',
  goldBg:       'rgba(251, 191, 36, 0.1)',
  goldBorder:   'rgba(251, 191, 36, 0.25)',
  green:        '#10b981',
  greenBg:      'rgba(16, 185, 129, 0.12)',
  greenBorder:  'rgba(16, 185, 129, 0.25)',
  red:          '#ef4444',
  redBg:        'rgba(239, 68, 68, 0.1)',
};

// ─── Tab definition ───────────────────────────────────────────
type TabId = 'connect' | 'create' | 'change' | 'challenge' | 'control';

interface Tab {
  id:      TabId;
  label:   string;
  sub:     string;
  colour:  string;
}

const TABS: Tab[] = [
  { id: 'connect',   label: 'Connect',   sub: 'I find my people',              colour: T.purple },
  { id: 'create',    label: 'Create',    sub: 'I make something',              colour: '#e63946' },
  { id: 'change',    label: 'Change',    sub: 'I apply my knowledge',          colour: T.gold },
  { id: 'challenge', label: 'Challenge', sub: 'I explore new opportunities',   colour: T.green },
  { id: 'control',   label: 'Control',   sub: 'I own my time and earnings',    colour: '#06b6d4' },
];

// ─── Small reusable bits ──────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; accent?: string; style?: React.CSSProperties }> = ({ children, accent, style }) => (
  <div style={{
    background:   T.cardBg,
    border:       `1px solid ${T.cardBorder}`,
    borderLeft:   accent ? `4px solid ${accent}` : undefined,
    borderRadius: 12,
    padding:      '1.5rem',
    ...style,
  }}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ margin: '0 0 1rem', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 800, color: T.bright, lineHeight: 1.25 }}>
    {children}
  </h2>
);

const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: '0 0 1.5rem', fontSize: '1.05rem', color: T.mid, lineHeight: 1.7 }}>
    {children}
  </p>
);

const Grid: React.FC<{ children: React.ReactNode; cols?: string }> = ({ children, cols = 'repeat(auto-fit, minmax(260px, 1fr))' }) => (
  <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '1rem' }}>
    {children}
  </div>
);

const EarningBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: 700, color: T.green, background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 100, padding: '3px 10px' }}>
    {children}
  </span>
);

// ─── Tab content ──────────────────────────────────────────────

// CONNECT — Welcome, heritage claim, why this exists
const ConnectTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

    <Card accent={T.purple}>
      <h2 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 800, color: T.bright }}>
        🎭 This Stage Speaks Your Language
      </h2>
      <p style={{ margin: '0 0 1rem', fontSize: '1rem', color: T.mid, lineHeight: 1.7 }}>
        Patois. Pidgin. Creole. Twi. Yoruba. The languages your grandmother spoke,
        the stories your ancestors told, the performance traditions that crossed the ocean —
        they belong on stage. Not as museum pieces. As living theatre.
      </p>
      <p style={{ margin: 0, fontSize: '1rem', color: T.main, lineHeight: 1.7 }}>
        Louise Bennett proved Patois is literary. Wole Soyinka proved African ritual is theatre.
        Derek Walcott proved Caribbean stories are universal.{' '}
        <strong style={{ color: T.bright }}>Now it's your turn.</strong>
      </p>
    </Card>

    <div>
      <SectionTitle>What is Kaywana's Court?</SectionTitle>
      <Lead>
        Kaywana's Court is <strong style={{ color: T.bright }}>diaspora theatre</strong> — where Caribbean
        and African performance traditions meet contemporary community production. It's not just another
        drama programme. It's the convergence point where heritage becomes performance, where oral
        tradition becomes stage craft, where your grandmother's stories become community events.
      </Lead>
      <p style={{ margin: 0, fontSize: '0.95rem', color: T.mid, lineHeight: 1.7 }}>
        Writers from <strong style={{ color: T.bright }}>Pageturners</strong> adapt diaspora stories.
        Technicians from <strong style={{ color: T.bright }}>STEMgeneers</strong> build sets.
        Business managers from <strong style={{ color: T.bright }}>TECHreneurs</strong> handle budgets.
        Designers from <strong style={{ color: T.bright }}>Silk Stilettos</strong> create costumes.
        Musicians from <strong style={{ color: T.bright }}>Trubble n Bass</strong> compose soundscapes.
        <strong style={{ color: T.bright }}> Auntie Anansi's Kitchen</strong> provides food for dinner theatre.
      </p>
    </div>

    <div>
      <SectionTitle>Why Diaspora Theatre Matters</SectionTitle>
      <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: T.mid, lineHeight: 1.7 }}>
        British theatre has historically excluded Caribbean and African voices — or included them
        only on terms set by mainstream institutions. We're building something different:
        theatre rooted in our traditions, performed in our languages, controlled by our community.
      </p>
      <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: T.mid, lineHeight: 1.7 }}>
        When a young person sees an elder tell stories in Patois on a proper stage, something shifts.
        When a family watches Anansi adapted with professional production values, heritage becomes valuable.
        When dinner theatre pairs grandmother's recipes with community stories, culture is transmitted.
      </p>
      <p style={{ margin: 0, fontSize: '0.95rem', color: T.mid, lineHeight: 1.7 }}>
        This isn't just entertainment. It's cultural infrastructure. It's economic opportunity
        for diaspora artists. It's intergenerational connection. It's heritage preservation through performance.
      </p>
    </div>

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Link to="/programmes/kaywanas-court/sandbox" style={{ padding: '0.85rem 1.75rem', background: `linear-gradient(135deg, ${T.purple} 0%, #7c3aed 100%)`, borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: '0.975rem', textDecoration: 'none' }}>
        Try the Heritage Production Planner →
      </Link>
      <Link to="/auth/signup" style={{ padding: '0.85rem 1.75rem', background: T.cardBgDeep, border: `1px solid ${T.cardBorder}`, borderRadius: 10, color: T.main, fontWeight: 600, fontSize: '0.975rem', textDecoration: 'none' }}>
        Join free
      </Link>
    </div>
  </div>
);

// CREATE — Traditions, languages, production types
const CreateTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

    {/* Caribbean traditions */}
    <div>
      <SectionTitle>🇯🇲 Caribbean Theatre Traditions</SectionTitle>
      <Grid>
        {[
          { name: 'Yard Theatre',         desc: 'Theatre in the yard, the tenement, the community space. Intimate, immediate, audience-participatory. No proscenium arch needed.',                   note: 'Perfect for: Community hall performances, outdoor shows' },
          { name: 'Calypso Tent',         desc: 'Social commentary through song. Calypsonians using wit, metaphor, and melody to speak truth to power. Extempo battles. Picong exchanges.',          note: 'Perfect for: Political satire, social commentary shows' },
          { name: 'Jamaican Pantomime',   desc: 'Folk tales, music, dance, social satire. The Little Theatre Movement tradition that made Anansi a national hero on stage.',                          note: 'Perfect for: Family shows, Anansi adaptations' },
          { name: 'Ring Games & Folk Forms', desc: '"Brown Girl in the Ring," "Jane and Louisa," "Emmanuel Road." Interactive theatre rooted in children\'s games and community gatherings.',        note: 'Perfect for: Intergenerational shows, children\'s theatre' },
          { name: 'Carnival Mas',         desc: 'Theatre in motion. Midnight Robber, Dame Lorraine, Moko Jumbie — performance as public spectacle.',                                                  note: 'Perfect for: Carnival season, cultural celebrations' },
        ].map(t => (
          <Card key={t.name} accent="#e63946">
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{t.name}</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.55 }}>{t.desc}</p>
            <span style={{ fontSize: '0.78rem', color: T.dim, fontStyle: 'italic' }}>{t.note}</span>
          </Card>
        ))}
      </Grid>
    </div>

    {/* African traditions */}
    <div>
      <SectionTitle>🌍 African Theatre Traditions</SectionTitle>
      <Grid>
        {[
          { name: 'Griot Storytelling',       desc: 'The West African griot — keeper of history, genealogy, wisdom. Story as performance, memory as art.',                                           note: 'Perfect for: Solo shows, oral history performances' },
          { name: 'Concert Party (Ghana)',     desc: 'Popular theatre mixing comedy, music, dance, and moral instruction. Accessible, entertaining, speaks to everyday concerns.',                    note: 'Perfect for: Comedy shows, community entertainment' },
          { name: 'Total Theatre',             desc: 'Wole Soyinka\'s concept — integrating ritual, dance, music, poetry, and spectacle. African aesthetics rejecting Western separation of art forms.', note: 'Perfect for: Major productions, ritual drama' },
          { name: 'Masquerade Performance',   desc: 'From Egungun to Ekpe — transformation, spirit embodiment, community ritual. Mask as theatre technology predating the Greeks.',                   note: 'Perfect for: Heritage season, ceremonial theatre' },
          { name: 'Praise Poetry & Oriki',    desc: 'Yoruba praise poetry — performed genealogies, heroic recitations, verbal art celebrating lineage and achievement.',                              note: 'Perfect for: Spoken word, celebration events' },
        ].map(t => (
          <Card key={t.name} accent="#f59e0b">
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{t.name}</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.55 }}>{t.desc}</p>
            <span style={{ fontSize: '0.78rem', color: T.dim, fontStyle: 'italic' }}>{t.note}</span>
          </Card>
        ))}
      </Grid>
    </div>

    {/* Heritage languages */}
    <div>
      <SectionTitle>🗣️ Heritage Language Performance</SectionTitle>
      <Lead>
        Your heritage language is theatrical. Louise Bennett proved it. Linton Kwesi Johnson proved it.
        Mutabaruka proved it. Patois, Pidgin, Creole, Twi, and Yoruba aren't just tolerated here — they're celebrated.
      </Lead>
      <Grid>
        {[
          { flag: '🇯🇲', name: 'Dub Poetry',         desc: 'Word, sound, and power. Louise Bennett, Mikey Smith, Jean Binta Breeze. Poetry performed to rhythm, Patois as literary language.' },
          { flag: '🇳🇬', name: 'Pidgin Drama',        desc: 'Theatre in Nigerian Pidgin — comedy, tragedy, social commentary in the tongue that bridges ethnic boundaries.' },
          { flag: '🇱🇨', name: 'Creole Monologues',   desc: 'Solo performance in St Lucian, Dominican, Haitian Creole. Character studies, personal narratives, community stories.' },
          { flag: '🇬🇭', name: 'Twi Storytelling',    desc: 'Anansesem in the original. Akan proverbs dramatised. The spider trickster in his mother tongue.' },
          { flag: '🇹🇹', name: 'Trini Talk Theatre',  desc: 'Trinidadian Creole on stage. The wit, the rhythm, the social observation. Theatre that sounds like home.' },
          { flag: '🌍', name: 'Your Language?',        desc: 'Somali? Yoruba? Guyanese Creole? Bajan? We want performance opportunities in every heritage language spoken in Wembley.' },
        ].map(l => (
          <Card key={l.name}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{l.flag}</div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{l.name}</h4>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.55 }}>{l.desc}</p>
            <EarningBadge>💰 £25/performance slot</EarningBadge>
          </Card>
        ))}
      </Grid>
    </div>

    {/* What we produce */}
    <div>
      <SectionTitle>What We Produce</SectionTitle>
      <Grid>
        {[
          { icon: '🎭', name: 'Yard Theatre',            desc: 'Intimate community performances in non-traditional spaces — church halls, community centres, actual yards' },
          { icon: '🎤', name: 'Dub Poetry Showcases',    desc: 'Heritage language performance poetry with live music backing' },
          { icon: '🕷️', name: 'Anansi Adaptations',      desc: 'Classic trickster tales reimagined for contemporary audiences — family shows with bite' },
          { icon: '🍲', name: 'Dinner Theatre',           desc: 'Performance + meal from Auntie Anansi\'s Kitchen — food and story intertwined' },
          { icon: '📚', name: 'Griot Performances',       desc: 'Solo storytelling in West African tradition — one voice, one audience, one story' },
          { icon: '👵', name: 'Elder Wisdom Showcases',   desc: 'Community elders sharing stories on stage — oral history as live performance' },
          { icon: '🎵', name: 'Musical Theatre',          desc: 'Original musicals rooted in Caribbean and African music traditions' },
          { icon: '🎊', name: 'Cultural Celebrations',    desc: 'Festivals, ceremonies, and heritage events honouring diaspora traditions' },
          { icon: '📻', name: 'Radio Drama',              desc: 'Audio theatre for Rayd-yo broadcast — heritage stories reaching beyond the venue' },
        ].map(p => (
          <Card key={p.name}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.icon}</div>
            <h4 style={{ margin: '0 0 0.375rem', fontSize: '0.975rem', fontWeight: 700, color: T.bright }}>{p.name}</h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: T.mid, lineHeight: 1.5 }}>{p.desc}</p>
          </Card>
        ))}
      </Grid>
    </div>
  </div>
);

// CHANGE — Intergenerational, your journey, growth
const ChangeTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

    <div>
      <SectionTitle>👵 Intergenerational Theatre</SectionTitle>
      <Lead>
        The most powerful theatre happens when generations meet. Elder wisdom meets youthful energy.
        Oral tradition meets contemporary staging. The stories that might be lost become performances that will be remembered.
      </Lead>
      <Grid>
        {[
          {
            icon: '📖', name: 'Elder Storyteller Programme', earn: '£50/performance + archive royalties',
            desc: 'Community elders share stories on stage. Not acting — being. Their memories, their journeys, their wisdom presented to audiences who need to hear it before it\'s lost.',
            items: ['Professional recording for archive', 'Youth assistants for staging support', 'Stories published in Joystick'],
          },
          {
            icon: '🔄', name: 'Story Bridge', earn: 'Revenue share for both',
            desc: 'Elder tells a story. Young performer adapts it for stage. Both perform together. The tradition passes and transforms in one production.',
            items: ['6-week development process', 'Mentorship in both directions', 'Documented for Rayd-yo'],
          },
          {
            icon: '🎓', name: 'Youth Ensemble + Elder Advisors', earn: 'Advisory fees for elders',
            desc: 'Young performers create shows with elder cultural advisors. Not directing — advising. Ensuring heritage accuracy while allowing creative freedom.',
            items: ['Cultural authenticity guidance', 'Heritage language coaching', 'Community credibility'],
          },
        ].map(p => (
          <Card key={p.name} accent={T.gold}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{p.icon}</div>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700, color: T.bright }}>{p.name}</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>{p.desc}</p>
            <ul style={{ margin: '0 0 0.75rem', paddingLeft: '1.25rem' }}>
              {p.items.map(i => <li key={i} style={{ fontSize: '0.85rem', color: T.muted, padding: '0.2rem 0' }}>{i}</li>)}
            </ul>
            <EarningBadge>💰 {p.earn}</EarningBadge>
          </Card>
        ))}
      </Grid>
    </div>

    <div>
      <SectionTitle>Your Journey with Kaywana's Court</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {[
          { step: '1', title: 'Explore: Try the Heritage Production Planner',    desc: 'Start with the sandbox. Plan productions rooted in diaspora traditions, explore heritage language performance options. 3 free plans, no commitment.' },
          { step: '2', title: 'Join: Pick Your Programme',                        desc: 'Join at least one programme to participate. Writers, technicians, business managers, designers, musicians, cooks — all are essential to heritage theatre.' },
          { step: '3', title: 'Collaborate: Join Production Teams',               desc: 'Submit production proposals, vote on seasonal shows, and join cross-programme teams. Bring an elder to advise on heritage accuracy.' },
          { step: '4', title: 'Perform: Take The Grand Stage',                    desc: 'Perform for your community — in heritage languages, drawing on diaspora traditions. Get featured in Joystick, broadcast on Rayd-yo, build your archive.' },
          { step: '5', title: 'Earn & Mentor: Share Your Success',                desc: 'Earn 55% revenue share from ticketed performances. Mentor newcomers in heritage traditions. Lead production teams. Shape diaspora theatre\'s future.' },
        ].map(j => (
          <Card key={j.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.purpleBg, border: `2px solid ${T.purple}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: T.purple, flexShrink: 0, fontSize: '0.9rem' }}>
              {j.step}
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.375rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{j.title}</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>{j.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// CHALLENGE — Productions, dinner theatre, cultural seasons, Rayd-yo
const ChallengeTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

    {/* Dinner Theatre */}
    <div>
      <SectionTitle>🍲 Dinner Theatre with Auntie Anansi's Kitchen</SectionTitle>
      <Lead>
        Theatre and food have always gone together in Caribbean culture.
        <strong style={{ color: T.bright }}> Auntie Anansi's Kitchen</strong> provides the food.
        <strong style={{ color: T.bright }}> Kaywana's Court</strong> provides the show. The audience gets both.
      </Lead>
      <Card accent={T.green}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.75rem', color: T.bright, fontSize: '1rem', fontWeight: 700 }}>How It Works</h4>
            <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {['Welcome drink — Sorrel, mauby, ginger beer while audience settles',
                'First course + Opening — Appetiser served, show begins',
                'Main course + Act One — Food and story interweave',
                'Intermission — Dessert service, audience mingles',
                'Act Two + Coffee — Show concludes over drinks',
                'Q&A with performers and cooks — Community conversation',
              ].map((s, i) => <li key={i} style={{ fontSize: '0.875rem', color: T.mid, padding: '0.3rem 0', lineHeight: 1.5 }}>{s}</li>)}
            </ol>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.75rem', color: T.bright, fontSize: '1rem', fontWeight: 700 }}>Revenue Model</h4>
            <p style={{ fontSize: '0.875rem', color: T.mid, marginBottom: '0.5rem' }}>Dinner theatre tickets: £35-50 per person</p>
            {[['55%', 'to performers and kitchen team'], ['25%', 'to community development fund'], ['20%', 'to venue and operations']].map(([pct, label]) => (
              <div key={pct} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.375rem' }}>
                <span style={{ fontWeight: 800, color: T.green, minWidth: 36 }}>{pct}</span>
                <span style={{ fontSize: '0.85rem', color: T.muted }}>{label}</span>
              </div>
            ))}
            <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', color: T.dim, fontStyle: 'italic' }}>
              A 50-seat dinner theatre at £40/ticket = £2,000 gross. £1,100 to the creative team.
            </p>
          </div>
        </div>
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: `1px solid ${T.cardBorder}` }}>
          <h4 style={{ margin: '0 0 0.75rem', color: T.bright, fontSize: '1rem', fontWeight: 700 }}>Dinner Theatre Themes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {['Anansi Night — Trickster tales + Jamaican cuisine',
              'Windrush Memories — Arrival stories + 1950s-60s dishes',
              'Island Hopping — Stories from different islands, matching food',
              'Sunday Dinner Theatre — After-church vibes, comfort food',
              'Heritage Language Night — Patois/Pidgin performance + traditional dishes',
            ].map(t => (
              <div key={t} style={{ fontSize: '0.875rem', color: T.mid, padding: '0.375rem 0.75rem', background: T.cardBgDeep, borderRadius: 6 }}>{t}</div>
            ))}
          </div>
        </div>
        <Link to="/programmes/auntie-anansis-kitchen" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.9rem', color: T.green, textDecoration: 'none', fontWeight: 600 }}>
          🍲 Visit Auntie Anansi's Kitchen →
        </Link>
      </Card>
    </div>

    {/* Cultural Seasons */}
    <div>
      <SectionTitle>Our Cultural Seasons</SectionTitle>
      <Lead>
        We follow cultural rhythms, not the traditional calendar. Each season brings different energy,
        themes, and production opportunities that honour Caribbean and African traditions.
      </Lead>
      <Grid>
        {[
          { icon: '🎉', name: 'Carnival Season',     months: 'January – March',    desc: 'Celebration, liberation, joy. High-energy performances with colour, music, and movement.', focus: 'Mas character performances, calypso tent shows, carnival history plays' },
          { icon: '🌿', name: 'Heritage Season',     months: 'April – June',       desc: 'Roots, ancestors, preservation. Reflective storytelling and educational performances.',      focus: 'Windrush commemorations, ancestral stories, griot performances' },
          { icon: '🌾', name: 'Harvest Season',      months: 'July – September',   desc: 'Abundance, community, gratitude. Collaborative celebrations of achievement.',                focus: 'Crop Over traditions, Emancipation celebrations, community feasts' },
          { icon: '📖', name: 'Storytelling Season', months: 'October – December', desc: 'Wisdom, tradition, legacy. Intimate performances honouring intergenerational knowledge.',    focus: 'Anansi tales, elder storytelling, Jonkonnu traditions' },
        ].map(s => (
          <Card key={s.name} accent={T.purple}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 700, color: T.bright }}>{s.name}</h3>
            <span style={{ display: 'block', fontSize: '0.78rem', color: T.dim, marginBottom: '0.625rem', fontStyle: 'italic' }}>{s.months}</span>
            <p style={{ margin: '0 0 0.625rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.5 }}>{s.desc}</p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: T.muted }}><strong style={{ color: T.main }}>Heritage focus:</strong> {s.focus}</p>
          </Card>
        ))}
      </Grid>
    </div>

    {/* Rayd-yo */}
    <div>
      <SectionTitle>📻 Stage to Airwaves: Rayd-yo Connection</SectionTitle>
      <Lead>
        Not every performance needs a live audience. Kaywana's Court productions can become Rayd-yo content —
        radio dramas, recorded poetry, audio documentaries.
      </Lead>
      <Grid>
        {[
          { name: 'Radio Drama Series',              desc: 'Stage plays adapted for audio. Full productions with sound design, voice acting, music — theatre for your ears.',                                        earn: '£25/episode' },
          { name: 'Heritage Language Recordings',    desc: 'Dub poetry, Patois monologues, Creole stories recorded for broadcast. Archive-quality heritage language preservation.',                                  earn: '£25/recording' },
          { name: 'Elder Story Archive',             desc: 'Intergenerational storytelling sessions professionally recorded. Community memory preserved for future generations.',                                     earn: '£50/session + royalties' },
        ].map(r => (
          <Card key={r.name} accent="#06b6d4">
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{r.name}</h4>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.6 }}>{r.desc}</p>
            <EarningBadge>💰 {r.earn}</EarningBadge>
          </Card>
        ))}
      </Grid>
      <Link to="/raydyo" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 10, color: '#06b6d4', fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>
        📻 Visit Rayd-yo →
      </Link>
    </div>
  </div>
);

// CONTROL — Collaborate, earn, membership
const ControlTab: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

    {/* Cross-programme */}
    <div>
      <SectionTitle>How Programmes Collaborate</SectionTitle>
      <Lead>
        Every Kaywana's Court production brings together talent from across all programmes.
        This is how we build community wealth — not just individual skills, but collective creation.
      </Lead>
      <Grid>
        {[
          { icon: '📖', name: 'Pageturners',              role: 'Script Development',        desc: 'Writers develop scripts, adapt Anansi stories, create heritage language monologues. Pageturners provides the words.',                          path: '/programmes/pageturners' },
          { icon: '🔧', name: 'STEMgeneers',             role: 'Set Design & Technical',     desc: 'Technical crew builds sets reflecting Caribbean aesthetics, manages lighting and sound.',                                                       path: '/programmes/stemgeneers' },
          { icon: '💼', name: 'TECHreneurs',             role: 'Budget & Marketing',          desc: 'Business managers create production budgets, run marketing campaigns, manage ticket sales, and secure community sponsorships.',                  path: '/programmes/techreneurs' },
          { icon: '👗', name: 'Silk Stilettos',          role: 'Costume Design',              desc: 'Designers create heritage-authentic costumes — from carnival mas to traditional African dress.',                                               path: '/programmes/silk-stilettos' },
          { icon: '🎵', name: 'Trubble n Bass',          role: 'Sound Design & Music',        desc: 'Musicians compose soundscapes rooted in Caribbean and African music traditions. Live reggae, highlife, calypso, contemporary fusion.',          path: '/programmes/trubble-n-bass' },
          { icon: '🍲', name: "Auntie Anansi's Kitchen", role: 'Dinner Theatre Catering',     desc: 'Heritage recipes become part of the performance. Food that matches the story, dishes that carry their own cultural narrative.',                 path: '/programmes/auntie-anansis-kitchen' },
        ].map(p => (
          <Card key={p.name} accent={T.purple}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.icon}</div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{p.name}</h3>
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 600, color: T.purple }}>{p.role}</h4>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.5 }}>{p.desc}</p>
            <Link to={p.path} style={{ fontSize: '0.85rem', color: T.purple, textDecoration: 'none', fontWeight: 600 }}>
              Join {p.name} →
            </Link>
          </Card>
        ))}
      </Grid>
    </div>

    {/* Membership */}
    <div>
      <SectionTitle>Membership Options</SectionTitle>
      <Lead>
        To participate in Kaywana's Court productions, join at least one programme.
        Multi-programme membership gives you broader creative roles.
      </Lead>
      <Grid cols="repeat(auto-fit, minmax(220px, 1fr))">
        {[
          { name: 'Single Programme',  price: '£15/month', best: false, items: ['Access to 1 programme + Kaywana\'s Court', 'Contribute in your specialty area', 'Submit production proposals', 'Join seasonal production teams', 'Perform/produce on The Grand Stage'] },
          { name: 'Multi-Programme',   price: '£35/month', best: false, items: ['Access to 3 programmes of your choice', 'Broader creative roles across productions', 'Priority casting and team placement', 'All single-programme benefits'] },
          { name: 'All-Access',        price: '£50/month', best: true,  items: ['Access to ALL 9 programmes', 'Leadership opportunities in productions', 'Shape every aspect of shows', 'Mentor newcomers and lead teams', 'All multi-programme benefits'] },
        ].map(m => (
          <Card key={m.name} accent={m.best ? T.gold : T.cardBorder} style={{ position: 'relative' }}>
            {m.best && <span style={{ position: 'absolute', top: '-10px', right: '1rem', background: T.gold, color: '#0f172a', fontSize: '0.7rem', fontWeight: 800, padding: '2px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Best Value</span>}
            <h3 style={{ margin: '0 0 0.375rem', fontSize: '1.05rem', fontWeight: 700, color: T.bright }}>{m.name}</h3>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: m.best ? T.gold : T.green, marginBottom: '1rem' }}>{m.price}</div>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {m.items.map(i => <li key={i} style={{ fontSize: '0.85rem', color: T.mid, padding: '0.3rem 0', lineHeight: 1.5 }}>{i}</li>)}
            </ul>
          </Card>
        ))}
      </Grid>
      <p style={{ margin: '1rem 0 0', fontSize: '0.875rem', color: T.dim, fontStyle: 'italic' }}>
        💚 Sliding scale available — we don't gatekeep talent based on ability to pay.
      </p>
    </div>

    {/* Get involved */}
    <div>
      <SectionTitle>Get Involved</SectionTitle>
      <Grid>
        {[
          { icon: '🎭', name: 'Try the Heritage Planner',  desc: 'Plan productions rooted in diaspora traditions. 3 free plans, no signup required.',                                   path: '/programmes/kaywanas-court/sandbox', label: 'Plan Your Show →' },
          { icon: '📖', name: 'Join a Programme',           desc: 'Pick your specialty: writing, tech, business, design, music, or kitchen. Any programme gives you access to productions.', path: '/programmes', label: 'Explore Programmes →' },
          { icon: '👵', name: 'Bring an Elder',             desc: 'Know someone with stories to tell? Our Elder Storyteller Programme welcomes community wisdom-keepers.',                 path: '/contact?subject=elder-storyteller', label: 'Connect an Elder →' },
          { icon: '🎟️', name: 'Attend Performances',       desc: 'See what our community creates. Support diaspora artists. Experience heritage theatre. Bring your family.',           path: '/calendar', label: 'View Events →' },
        ].map(p => (
          <Card key={p.name} accent={T.purple}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{p.icon}</div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: T.bright }}>{p.name}</h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: T.mid, lineHeight: 1.5 }}>{p.desc}</p>
            <Link to={p.path} style={{ fontSize: '0.875rem', color: T.purple, fontWeight: 700, textDecoration: 'none' }}>{p.label}</Link>
          </Card>
        ))}
      </Grid>
    </div>
  </div>
);

// ─── Main page ────────────────────────────────────────────────
// ─── Counting House companion ────────────────────────────────
const CountingHouseCompanion: React.FC<{ primaryTab: string }> = ({ primaryTab }) => {
  const [monthly, setMonthly] = React.useState(200);
  const creator = Math.round(monthly * 0.55);
  const community = Math.round(monthly * 0.25);
  const platform = Math.round(monthly * 0.20);
  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <label style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600 }}>Monthly £
        <input type="number" value={monthly} min={0}
          onChange={e => setMonthly(Number(e.target.value))}
          style={{ width: "100%", marginTop: "0.375rem", padding: "0.5rem", background: "rgba(15,23,42,0.8)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 6, color: "#f8fafc", fontFamily: "inherit", fontSize: "0.9rem" }} />
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(157,78,221,0.12)", borderRadius: 6 }}>
          <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>You</span>
          <strong style={{ color: "#9d4edd" }}>£{creator}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(74,103,65,0.12)", borderRadius: 6 }}>
          <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>Community</span>
          <strong style={{ color: "#4A6741" }}>£{community}</strong>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(15,23,42,0.5)", borderRadius: 6 }}>
          <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Platform</span>
          <strong style={{ color: "#64748b" }}>£{platform}</strong>
        </div>
      </div>
      <a href="/counting-house" style={{ fontSize: "0.8rem", color: "#9d4edd", textDecoration: "none", fontWeight: 600 }}>Full Counting House →</a>
    </div>
  );
};

const TAB_CONTENT: Record<TabId, React.FC> = {
  connect:   ConnectTab,
  create:    CreateTab,
  change:    ChangeTab,
  challenge: ChallengeTab,
  control:   ControlTab,
};

const KaywanasCourtPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>('connect');
  const { companions, splitActive, dock, undock, undockAll, isDockedTab } = useDockState('Kaywana\'s Court', 'connect');

  // Sync tab from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '') as TabId;
    if (TABS.find(t => t.id === hash)) setActiveTab(hash);
  }, [location.hash]);

  const handleTab = (id: TabId) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  const dockCountingHouse = (tab: string) => dock({
    tabId: 'control' as any,
    label: 'Counting House',
    programme: 'Kaywana\'s Court',
    colour: '#9d4edd',
    content: <CountingHouseCompanion primaryTab={tab} />,
  });

  const activeTabData = TABS.find(t => t.id === activeTab)!;
  const Content = TAB_CONTENT[activeTab];

  return (
    <div style={{
      minHeight:   '100vh',
      background:  T.pageBg,
      color:       T.main,
      paddingTop:  80,
      fontFamily:  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>

      {/* ── Page header ──────────────────────────────────── */}
      <div style={{
        background:    T.cardBgDeep,
        borderBottom:  `1px solid ${T.cardBorder}`,
        padding:       '2rem 1.25rem 0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T.purple, background: T.purpleBg, border: `1px solid ${T.purpleBorder}`, borderRadius: 100, padding: '3px 12px', marginBottom: '0.75rem' }}>
              Programme · Kaywana's Court
            </span>
            <h1 style={{ margin: '0 0 0.375rem', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: T.bright, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              Diaspora Theatre Where Heritage Meets Stage
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', color: T.muted, lineHeight: 1.6 }}>
              Caribbean and African performance traditions — on stage, in your language, for your community.
            </p>
          </div>

          {/* ── Tab bar ──────────────────────────────────── */}
          <div style={{
            display:    'flex',
            gap:        '0.25rem',
            overflowX:  'auto',
            paddingBottom: '0',
            scrollbarWidth: 'none',
          }}>
            {TABS.map(tab => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id)}
                  style={{
                    display:        'flex',
                    flexDirection:  'column',
                    alignItems:     'center',
                    gap:            '0.2rem',
                    padding:        '0.75rem 1.25rem',
                    background:     isActive ? T.pageBg : 'transparent',
                    border:         'none',
                    borderBottom:   isActive ? `3px solid ${tab.colour}` : '3px solid transparent',
                    borderRadius:   '8px 8px 0 0',
                    cursor:         'pointer',
                    fontFamily:     'inherit',
                    transition:     'all 0.15s ease',
                    whiteSpace:     'nowrap',
                    flexShrink:     0,
                  }}
                >
                  <span style={{ fontSize: '0.925rem', fontWeight: isActive ? 700 : 500, color: isActive ? T.bright : T.muted }}>
                    {tab.label}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: isActive ? tab.colour : T.dim, display: 'none' }}>
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        <div style={{ display: "flex", gap: 0, minHeight: 600 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Counting House dock button on every tab */}
            <div style={{ marginBottom: "1rem" }}>
              <DockButton
                label="Counting House"
                isDocked={isDockedTab('control' as any)}
                onDock={() => dockCountingHouse(activeTab)}
                onUndock={() => { const c = companions.find((c: any) => c.tabId === 'control'); if (c) undock(c.id); }}
                colour="#9d4edd"
              />
            </div>
            <Content />
          </div>
          {splitActive && (
            <CompanionStrip companions={companions} onUndock={undock} onUndockAll={undockAll} />
          )}
        </div>
      </div>

    </div>
  );
};

export default KaywanasCourtPage;
