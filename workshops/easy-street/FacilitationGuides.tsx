import React, { useState } from 'react';
import './EasyStreet.css';

interface FacilitationSection {
  time: string;
  title: string;
  duration: string;
  content: string;
  facilitatorNotes?: string;
  prompts?: string[];
}

interface SessionGuide {
  week: number;
  title: string;
  focus: string;
  materials: string[];
  beforeSession: string[];
  sections: FacilitationSection[];
  afterSession: string[];
}

const sessionGuides: SessionGuide[] = [
  // ========================================
  // WEEK 1: THE WORLD
  // ========================================
  {
    week: 1,
    title: 'The World',
    focus: 'Mapping the High Road',
    materials: [
      'Screen share capability',
      'Shared digital whiteboard (Miro, Jamboard, or Google Doc)',
      'Participant list with access needs noted',
    ],
    beforeSession: [
      'Send calendar invite with Zoom link one week ahead',
      'Send reminder 24 hours before with brief "what to expect"',
      'Test screen share and whiteboard access',
      'Prepare breakout room settings (groups of 3–4)',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Welcome & Grounding',
        duration: '10 mins',
        content: `Welcome to Easy Street. This is a creative development lab — we're going to build a radio drama together over six weeks. Not from a script someone's already written, but from scratch, using what we know about life on roads like ours.`,
        facilitatorNotes:
          'Warm tone, camera on. Let the chat populate for check-in. Acknowledge a few responses by name.',
        prompts: [
          'Ground rules: What\'s shared stays here. No wrong ideas. Cameras optional. Step out if needed.',
          'Check-in: Drop your name and one word for how you\'re arriving — tired, curious, nervous, whatever\'s true.',
        ],
      },
      {
        time: '0:10',
        title: 'What Stories Does Wembley Have?',
        duration: '15 mins',
        content:
          'Open discussion before any screen share. Surface what participants see and experience.',
        facilitatorNotes:
          'Don\'t steer toward any particular issue. Let participants surface what matters. Note themes as they emerge.',
        prompts: [
          'What stories exist on the High Road that don\'t get told?',
          'What pressures do people your age deal with that older generations don\'t understand?',
          'What choices feel like they\'re not really choices?',
          'What do families argue about that they never resolve?',
          'Where does ambition go wrong around here?',
        ],
      },
      {
        time: '0:25',
        title: 'Mapping the High Road',
        duration: '20 mins',
        content:
          'Collaborative world-building on shared whiteboard. Participants add locations that matter to the story world.',
        facilitatorNotes:
          'Let them add for 10 minutes before reviewing together. Notice what they chose to include and what\'s missing.',
        prompts: [
          'The chicken shop. The barbershop. The bus stop where people wait.',
          'What\'s open at 11pm?',
          'Where do young people actually hang out versus where adults think they do?',
          'The place where someone goes when they don\'t want to be found.',
          'What place used to be something else that everyone still remembers?',
        ],
      },
      {
        time: '0:45',
        title: 'Pressure Points',
        duration: '20 mins',
        content:
          'Discussion about sources of pressure and desperation. What drives people to bad decisions?',
        facilitatorNotes:
          'Validate contributions. Note recurring themes. The specific trap (gambling, debt, etc.) may emerge here or later.',
        prompts: [
          'What makes someone desperate enough to do something they know is stupid?',
          'What do people chase thinking it\'ll fix everything?',
          'When someone\'s in trouble, who do they tell? Who do they hide it from?',
          'What\'s the difference between a hustle and a trap?',
        ],
      },
      {
        time: '1:05',
        title: 'Tiny Writing Exercise',
        duration: '15 mins',
        content:
          'Three-minute writing exercise: a text conversation between two people where one just got what they wanted.',
        facilitatorNotes:
          'Give 4 minutes actual writing time. Silence is fine. Invite 3–4 shares. Respond with specific observations.',
        prompts: [
          'Write a text message conversation — four or five messages.',
          'One of them just got what they wanted. The other doesn\'t know yet.',
          'What do they say? What don\'t they say?',
        ],
      },
      {
        time: '1:20',
        title: 'Close & Next Week',
        duration: '10 mins',
        content:
          'Preview the six-week arc. Give the "noticing" assignment for between sessions.',
        facilitatorNotes: 'Handle logistics, thank participants, end recording.',
        prompts: [
          'Week 2: We build the characters. Who lives here? Who\'s at the centre?',
          'Between now and next week: Notice conversations that don\'t quite say what they mean.',
          'Notice who\'s performing and who\'s hiding. Bring that noticing back.',
        ],
      },
    ],
    afterSession: [
      'Save whiteboard as PDF',
      'Note standout contributions and emerging voices',
      'Send thank-you email within 24 hours with Session 2 details',
      'Add production notes (strong writers, quiet but engaged, technical issues)',
    ],
  },

  // ========================================
  // WEEK 2: THE PEOPLE
  // ========================================
  {
    week: 2,
    title: 'The People',
    focus: 'Building characters',
    materials: [
      'Character template document (shared Google Doc or Miro)',
      'Week 1 whiteboard summary for reference',
      'Relationship mapping canvas',
      'Breakout room setup for small groups',
    ],
    beforeSession: [
      'Send Week 1 whiteboard summary and themes to all participants',
      'Prepare character archetype prompts (loose, not prescriptive)',
      'Create shared character template document',
      'Review notes on which participants showed strong character instincts',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Check-in & Recap',
        duration: '10 mins',
        content:
          'Welcome back. Quick recap of Week 1 themes. Check-in on what participants noticed during the week.',
        facilitatorNotes:
          'Keep energy warm. Acknowledge returning faces. If anyone new, brief catch-up.',
        prompts: [
          'One word check-in: how are you arriving tonight?',
          'Last week we mapped the world. What did you notice this week? Any conversations that stuck with you?',
          'Tonight we\'re populating that world with people.',
        ],
      },
      {
        time: '0:10',
        title: 'Character Seeds',
        duration: '20 mins',
        content:
          'Introduce loose character archetypes as starting points, not prescriptions. Let participants shape who these people become.',
        facilitatorNotes:
          'Present archetypes as questions, not answers. "What if there\'s someone who..." not "There\'s a character called..."',
        prompts: [
          'What if there\'s someone young, smart, restless — stuck between what they want and what\'s available?',
          'What if there\'s a parent who works too hard to notice what\'s happening?',
          'What if there\'s an older person who\'s seen it all before but doesn\'t know how to say it?',
          'What if there\'s a friend who\'s in deeper than anyone knows?',
          'What if there\'s someone watching from the edges — sees everything, says little?',
        ],
      },
      {
        time: '0:30',
        title: 'Small Group Character Building',
        duration: '25 mins',
        content:
          'Breakout rooms (3–4 people). Each group develops one character in depth using the template.',
        facilitatorNotes:
          'Visit each breakout briefly. Don\'t correct — encourage specificity. "What would they never tell anyone?"',
        prompts: [
          'Template questions: Name. Age. Job (or no job). Where do they live? Who do they live with?',
          'What do they want more than anything? What are they afraid of?',
          'What\'s their phone wallpaper? What\'s the last lie they told?',
          'How do they speak? Fast? Slow? Do they finish sentences?',
          'What\'s one thing they\'d never tell anyone?',
        ],
      },
      {
        time: '0:55',
        title: 'Character Presentations',
        duration: '20 mins',
        content:
          'Each group presents their character to the full group. Build the ensemble together.',
        facilitatorNotes:
          'After each presentation, invite brief reactions. "How might this person know that person?" Start mapping relationships.',
        prompts: [
          'Tell us about your character. Don\'t read the template — introduce them like you\'re describing a friend.',
          'What surprised you about this character as you developed them?',
          'Who else in this room might your character know? How?',
        ],
      },
      {
        time: '1:15',
        title: 'Relationship Mapping',
        duration: '10 mins',
        content:
          'Whole group exercise: map connections between the characters. Who knows who? What\'s complicated?',
        facilitatorNotes:
          'Draw connections on shared whiteboard. Note tensions, secrets, dependencies. This becomes the story engine.',
        prompts: [
          'Draw lines between characters who know each other.',
          'Mark the complicated relationships. Where\'s the tension?',
          'Who\'s protecting who? Who\'s hiding from who?',
        ],
      },
      {
        time: '1:25',
        title: 'Close & Next Week',
        duration: '5 mins',
        content:
          'Next week: the inciting incident. Something happens that sets everything in motion.',
        facilitatorNotes:
          'Assignment: Think about your character. What would it take to push them into a bad decision?',
        prompts: [
          'Week 3: The trap. How does the trouble start?',
          'Between sessions: Think about your character. What would push them over an edge?',
          'Listen for the moment when someone makes a choice they can\'t take back.',
        ],
      },
    ],
    afterSession: [
      'Compile character sheets into shared document',
      'Save relationship map',
      'Note which characters participants are most invested in',
      'Identify the central character (may be emerging organically)',
      'Send summary email with character profiles attached',
    ],
  },

  // ========================================
  // WEEK 3: THE TRAP
  // ========================================
  {
    week: 3,
    title: 'The Trap',
    focus: 'How it starts',
    materials: [
      'Character sheets from Week 2',
      'Relationship map',
      'Episode outline template',
      'Audio examples of inciting incidents (optional)',
    ],
    beforeSession: [
      'Review character sheets and relationship map',
      'Prepare 2–3 possible inciting incident scenarios based on group\'s themes',
      'Cue up audio example if using (keep under 3 minutes)',
      'Note which participants showed strong plot instincts',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Check-in & Character Refresh',
        duration: '10 mins',
        content:
          'Quick check-in. Brief refresh on the characters we\'ve created. Who\'s at the centre?',
        facilitatorNotes:
          'If central character hasn\'t emerged, facilitate brief discussion. Who do we care about most?',
        prompts: [
          'One word check-in.',
          'Quick refresh: who are our characters? Who\'s the one we\'re following most closely?',
          'Tonight we put them in motion. Something happens.',
        ],
      },
      {
        time: '0:10',
        title: 'What Is an Inciting Incident?',
        duration: '15 mins',
        content:
          'Brief teaching moment: what sets a story in motion. The moment before which everything was manageable, after which it isn\'t.',
        facilitatorNotes:
          'Use examples from shows they know. Keep it brief — we\'re here to create, not lecture.',
        prompts: [
          'Every story has a moment where things tip. Before that moment, life was sustainable. After it, everything changes.',
          'In Top Boy, it\'s when Dushane comes back. In EastEnders, it\'s when the secret gets told. In Only Fools, it\'s when the scheme goes too well.',
          'For our character: what\'s the moment that looks like opportunity but is actually a trap?',
        ],
      },
      {
        time: '0:25',
        title: 'Brainstorming the Trap',
        duration: '20 mins',
        content:
          'Whole group brainstorm: what could set our central character on a path they can\'t easily leave?',
        facilitatorNotes:
          'Let multiple ideas surface. Don\'t commit to one too quickly. Write all options on the board.',
        prompts: [
          'Based on what we know about this character — what would tempt them?',
          'What looks like a solution to their problems but actually creates new ones?',
          'What\'s the thing they\'d never tell anyone they did?',
          'What offer would they say yes to even though they know it\'s risky?',
        ],
      },
      {
        time: '0:45',
        title: 'Choosing & Developing the Incident',
        duration: '15 mins',
        content:
          'Narrow to one inciting incident. Develop the specifics: where, when, who\'s there, what exactly happens.',
        facilitatorNotes:
          'Facilitate group decision. If stuck, use voting. Once chosen, push for specificity.',
        prompts: [
          'Where does this happen? Be specific — which location from our map?',
          'What time of day? What\'s the weather?',
          'Who else is there? Who witnesses it?',
          'What does our character think is happening? What\'s actually happening?',
        ],
      },
      {
        time: '1:00',
        title: 'Writing the Scene',
        duration: '20 mins',
        content:
          'Pairs or trios write the inciting incident scene. Dialogue and action. Aim for 1–2 pages.',
        facilitatorNotes:
          'Breakout rooms for writing. Visit briefly to offer encouragement. Focus on dialogue — this is radio.',
        prompts: [
          'Write the scene where it happens. Who speaks first?',
          'What do they say out loud? What do they think but not say?',
          'How does the scene end? What\'s the last line?',
        ],
      },
      {
        time: '1:20',
        title: 'Sharing & Close',
        duration: '10 mins',
        content:
          'One or two groups share their scene. Note what works. Preview next week: the spiral.',
        facilitatorNotes:
          'Celebrate specificity. Note lines that land. We\'ll refine these into Episode 1.',
        prompts: [
          'What line from that scene will you remember?',
          'Week 4: The spiral. What happens next? How do the lies start?',
          'Between sessions: Think about what your character does the day after this scene.',
        ],
      },
    ],
    afterSession: [
      'Collect all scene drafts',
      'Identify strongest version of inciting incident',
      'Begin Episode 1 outline document',
      'Note dialogue that works — start a "lines we love" document',
      'Send summary with selected scene attached',
    ],
  },

  // ========================================
  // WEEK 4: THE SPIRAL
  // ========================================
  {
    week: 4,
    title: 'The Spiral',
    focus: 'What gets hidden',
    materials: [
      'Episode 1 outline from Week 3',
      'Character sheets',
      'Episode 2–4 outline templates',
      'Examples of escalation in drama (optional clips)',
    ],
    beforeSession: [
      'Compile Episode 1 draft from Week 3 work',
      'Prepare timeline template for Episodes 2–4',
      'Review character relationships for tension points',
      'Note which participants are strongest at conflict writing',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Check-in & Episode 1 Recap',
        duration: '10 mins',
        content:
          'Check-in. Read back the key moment from Episode 1. We\'re now building what comes next.',
        facilitatorNotes:
          'Read the inciting incident scene aloud (or have a participant read). Ground us in where we left off.',
        prompts: [
          'One word check-in.',
          'Here\'s where we left Episode 1: [read the scene].',
          'Tonight: what happens next? How do the lies start?',
        ],
      },
      {
        time: '0:10',
        title: 'The Mechanics of Spiraling',
        duration: '15 mins',
        content:
          'Brief teaching: how problems compound. One lie requires another. Each solution creates new problems.',
        facilitatorNotes:
          'Use the character\'s specific situation. Make it concrete, not abstract.',
        prompts: [
          'After the inciting incident, what does our character need to hide?',
          'Who would notice if they knew the truth? What would they notice?',
          'What lie do they tell first? And what does that lie require?',
          'What does our character tell themselves to justify it?',
        ],
      },
      {
        time: '0:25',
        title: 'Mapping Episodes 2–4',
        duration: '25 mins',
        content:
          'Whole group outlines the middle episodes. Three stages of escalation.',
        facilitatorNotes:
          'Use shared document. Each episode needs: key event, new complication, what gets hidden, what nearly surfaces.',
        prompts: [
          'Episode 2: First consequences. Something changes. What does our character do to manage it?',
          'Episode 3: Stakes rise. Someone gets suspicious. A confrontation is avoided but only just.',
          'Episode 4: The brink. The lies are unsustainable. Something has to break.',
          'For each episode: What\'s the key scene? Who\'s in it? What\'s the tension?',
        ],
      },
      {
        time: '0:50',
        title: 'Writing Scenes of Deflection',
        duration: '25 mins',
        content:
          'Pairs write a scene where one character suspects something and the other deflects. The conversation that doesn\'t quite happen.',
        facilitatorNotes:
          'Focus on subtext. What\'s said vs. what\'s meant. The questions that get asked sideways.',
        prompts: [
          'Write a scene between two of our characters. One suspects something. The other needs them not to know.',
          'The scene should end without the truth coming out — but we should feel how close it got.',
          'What do they talk about instead of what they\'re really talking about?',
        ],
      },
      {
        time: '1:15',
        title: 'Sharing & Feedback',
        duration: '10 mins',
        content:
          'Share 2–3 deflection scenes. Note what creates tension. What works.',
        facilitatorNotes:
          'Celebrate tension. "I could feel how close that got." Note scenes that could slot into our outline.',
        prompts: [
          'What moment in that scene made you hold your breath?',
          'Where could this scene live in our episode outline?',
        ],
      },
      {
        time: '1:25',
        title: 'Close & Next Week',
        duration: '5 mins',
        content:
          'Next week: the break. The confrontation where truth surfaces.',
        facilitatorNotes:
          'Assignment: Think about the confrontation. Who finally says the unsayable?',
        prompts: [
          'Week 5: The break. The reckoning. The conversation that can\'t be avoided.',
          'Between sessions: Who in your life has ever forced a truth out of you? How did it feel?',
        ],
      },
    ],
    afterSession: [
      'Compile episode outlines (Eps 1–4)',
      'Collect deflection scenes',
      'Identify scenes strong enough for final drafts',
      'Note character dynamics that are working',
      'Send summary with episode map attached',
    ],
  },

  // ========================================
  // WEEK 5: THE BREAK
  // ========================================
  {
    week: 5,
    title: 'The Break',
    focus: 'The confrontation',
    materials: [
      'Episode outline (Eps 1–4)',
      'Character sheets',
      'Episode 5 template',
      'Example confrontation scenes from radio drama (optional)',
    ],
    beforeSession: [
      'Review all work to date',
      'Identify which characters are involved in the confrontation',
      'Prepare different confrontation scenarios (who confronts who)',
      'Note participants who\'ve shown emotional range in writing',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Check-in & The Story So Far',
        duration: '10 mins',
        content:
          'Check-in. Brief summary of Episodes 1–4. We\'re at the breaking point.',
        facilitatorNotes:
          'Read or summarise the arc so far. Build the tension. We\'ve been heading here for four weeks.',
        prompts: [
          'One word check-in.',
          'Here\'s where we are: [summarise the spiral]. Tonight, something breaks.',
          'The truth comes out. How it comes out is what we\'re writing.',
        ],
      },
      {
        time: '0:10',
        title: 'Designing the Confrontation',
        duration: '20 mins',
        content:
          'Whole group discussion: who confronts who? What finally forces the truth out?',
        facilitatorNotes:
          'Multiple options are valid. Parent discovers? Friend explodes? Protagonist confesses? Let the group decide.',
        prompts: [
          'Who finally breaks the silence? Does our character confess or get caught?',
          'Is it an explosion or a quiet collapse?',
          'Where does it happen? Public or private? Day or night?',
          'Who else is affected when the truth comes out?',
        ],
      },
      {
        time: '0:30',
        title: 'Writing the Confrontation: Round 1',
        duration: '20 mins',
        content:
          'Pairs write a first version of the confrontation scene. Focus on the emotional truth.',
        facilitatorNotes:
          'Encourage boldness. First drafts can be messy. We\'ll write multiple versions.',
        prompts: [
          'Write the scene where it comes out. Start with the moment just before.',
          'What\'s the first true thing that gets said?',
          'How does the other person respond? Anger? Hurt? Relief?',
        ],
      },
      {
        time: '0:50',
        title: 'Writing the Confrontation: Round 2',
        duration: '15 mins',
        content:
          'Switch pairs. Write a different version — different setting, different initiator, different tone.',
        facilitatorNotes:
          'This creates options. Different versions can reveal what works best for the characters.',
        prompts: [
          'Same confrontation, different approach. What if it happened somewhere else?',
          'What if a different character initiated it?',
          'What if it was quiet instead of loud (or loud instead of quiet)?',
        ],
      },
      {
        time: '1:05',
        title: 'Sharing & Choosing',
        duration: '15 mins',
        content:
          'Share confrontation versions. Discuss what works. Begin to identify the version for Episode 5.',
        facilitatorNotes:
          'Look for emotional truth. Which version feels earned by the journey we\'ve built?',
        prompts: [
          'What moment in that scene hit hardest?',
          'Which version feels most true to these characters?',
          'What lines do we want to keep from each version?',
        ],
      },
      {
        time: '1:20',
        title: 'Close & Next Week',
        duration: '10 mins',
        content:
          'Next week: the after. What does moving forward look like? And we assemble the full series.',
        facilitatorNotes:
          'Assignment: Think about what comes after the confrontation. Not fixed — but what direction?',
        prompts: [
          'Week 6: The after. What does our character do the day after the truth comes out?',
          'We\'ll also assemble the full series and prepare for production.',
          'Between sessions: What does recovery actually look like? Not fixed, not destroyed — the middle.',
        ],
      },
    ],
    afterSession: [
      'Compile confrontation scene versions',
      'Identify strongest version for Episode 5',
      'Note standout dialogue for potential audio moments',
      'Begin assembling complete series outline',
      'Send summary with confrontation options attached',
    ],
  },

  // ========================================
  // WEEK 6: THE AFTER
  // ========================================
  {
    week: 6,
    title: 'The After',
    focus: 'Series assembly',
    materials: [
      'Complete episode outlines (Eps 1–5)',
      'All scene drafts from previous weeks',
      'Series bible template',
      'Character sheets (final versions)',
      'Production pathway document (G-Tech Casters connection)',
    ],
    beforeSession: [
      'Compile all work into draft series bible',
      'Prepare Episode 6 outline options',
      'Create "what\'s next" production pathway document',
      'Prepare celebration — this is the final session',
    ],
    sections: [
      {
        time: '0:00',
        title: 'Check-in & Celebration',
        duration: '10 mins',
        content:
          'Final check-in. Acknowledge the journey. We\'ve built something together.',
        facilitatorNotes:
          'Warm, celebratory tone. Name what the group has accomplished. This matters.',
        prompts: [
          'One word check-in: how does it feel to be at the end?',
          'Look at what we\'ve built: a world, characters we care about, a story that matters.',
          'Tonight we finish the arc and prepare for production.',
        ],
      },
      {
        time: '0:10',
        title: 'Episode 6: The After',
        duration: '25 mins',
        content:
          'Design the final episode together. What does life look like after the confrontation? Not fixed — but moving.',
        facilitatorNotes:
          'Resist the urge to wrap it up too neatly. Real endings are ambiguous. What\'s the honest note?',
        prompts: [
          'The day after the confrontation. What does our character do first?',
          'What relationships are damaged? What might heal?',
          'What\'s different now? What might never change?',
          'How do we end? Not triumphant, not destroyed — what\'s the honest note?',
        ],
      },
      {
        time: '0:35',
        title: 'Writing the Final Scene',
        duration: '20 mins',
        content:
          'Small groups or pairs write the final scene of the series. The last thing we hear.',
        facilitatorNotes:
          'This scene should feel earned. It\'s okay if it\'s quiet. What image do we leave listeners with?',
        prompts: [
          'Write the last scene. Where are we? Who\'s there?',
          'What\'s the last line of dialogue?',
          'Or does it end with a sound? A silence?',
          'What do we want listeners to carry with them?',
        ],
      },
      {
        time: '0:55',
        title: 'Sharing Final Scenes',
        duration: '15 mins',
        content:
          'Share the final scene drafts. Choose or combine for the series finale.',
        facilitatorNotes:
          'Celebrate each contribution. Note what resonates. Build consensus on the ending.',
        prompts: [
          'What stays with you from that ending?',
          'What do we want to keep? What might we combine?',
        ],
      },
      {
        time: '1:10',
        title: 'Series Bible Assembly',
        duration: '10 mins',
        content:
          'Review the complete series bible. Episode summaries, character profiles, key scenes, series themes.',
        facilitatorNotes:
          'Show them the document. This is theirs. They made this.',
        prompts: [
          'Here\'s our series bible. Six episodes. Characters we created. A story that matters.',
          'This document goes to the G-Tech Casters production team next.',
          'Your names are on this.',
        ],
      },
      {
        time: '1:20',
        title: 'What\'s Next: Production Pathway',
        duration: '5 mins',
        content:
          'Introduce the G-Tech Casters production phase. Who wants to continue? What roles are available?',
        facilitatorNotes:
          'This is the bridge to the next programme. Voice actors, sound designers, editors — roles await.',
        prompts: [
          'This script needs to become sound. That\'s the next phase.',
          'G-Tech Casters will produce this for Rayd-yo. Roles include: voice actors, sound designers, editors.',
          'If you want to continue, there\'s a pathway. Let us know.',
        ],
      },
      {
        time: '1:25',
        title: 'Close & Thanks',
        duration: '5 mins',
        content:
          'Final thanks. Acknowledge the community that formed. Celebrate what was built.',
        facilitatorNotes:
          'This matters. Name people. Thank them specifically. End on warmth.',
        prompts: [
          'Thank you. You showed up. You created. This exists because of you.',
          'Stay connected. This community doesn\'t end tonight.',
          'When Easy Street broadcasts on Rayd-yo, you\'ll hear your work.',
        ],
      },
    ],
    afterSession: [
      'Finalise series bible document',
      'Collect participant feedback (brief survey)',
      'Identify participants interested in production phase',
      'Send celebration email with series bible attached',
      'Brief G-Tech Casters team on production handover',
      'Document the process for future workshop iterations',
    ],
  },
];

const FacilitationGuides: React.FC = () => {
  const [activeSession, setActiveSession] = useState(1);
  const guide = sessionGuides.find(g => g.week === activeSession);

  return (
    <div className="es-facilitation">
      <header className="es-facilitation-header">
        <h1>Facilitation Guides</h1>
        <p>Detailed session plans for Easy Street facilitators</p>
      </header>

      <nav className="es-session-nav">
        {sessionGuides.map(g => (
          <button
            key={g.week}
            className={`es-session-nav-item ${activeSession === g.week ? 'active' : ''}`}
            onClick={() => setActiveSession(g.week)}
          >
            <span className="week-num">{g.week}</span>
            <span className="week-title">{g.title}</span>
          </button>
        ))}
      </nav>

      {guide && (
        <article className="es-guide">
          <header className="es-guide-header">
            <div className="es-guide-title">
              <span className="es-week-badge">Week {guide.week}</span>
              <h2>{guide.title}</h2>
              <p className="es-focus">{guide.focus}</p>
            </div>
            <div className="es-guide-meta">
              <span>90 minutes</span>
              <span>Zoom</span>
            </div>
          </header>

          <section className="es-guide-section">
            <h3>Materials Needed</h3>
            <ul>
              {guide.materials.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          <section className="es-guide-section">
            <h3>Before the Session</h3>
            <ul className="es-checklist">
              {guide.beforeSession.map((item, i) => (
                <li key={i}>
                  <input type="checkbox" id={`before-${guide.week}-${i}`} />
                  <label htmlFor={`before-${guide.week}-${i}`}>{item}</label>
                </li>
              ))}
            </ul>
          </section>

          <section className="es-guide-section">
            <h3>Session Flow</h3>
            <div className="es-flow">
              {guide.sections.map((section, i) => (
                <div key={i} className="es-flow-item">
                  <div className="es-flow-time">
                    <span className="time">{section.time}</span>
                    <span className="duration">{section.duration}</span>
                  </div>
                  <div className="es-flow-content">
                    <h4>{section.title}</h4>
                    <p>{section.content}</p>
                    {section.facilitatorNotes && (
                      <div className="es-facilitator-note">
                        <strong>Facilitator note:</strong> {section.facilitatorNotes}
                      </div>
                    )}
                    {section.prompts && (
                      <div className="es-prompts">
                        <strong>Prompts:</strong>
                        <ul>
                          {section.prompts.map((p, j) => (
                            <li key={j}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="es-guide-section">
            <h3>After the Session</h3>
            <ul className="es-checklist">
              {guide.afterSession.map((item, i) => (
                <li key={i}>
                  <input type="checkbox" id={`after-${guide.week}-${i}`} />
                  <label htmlFor={`after-${guide.week}-${i}`}>{item}</label>
                </li>
              ))}
            </ul>
          </section>
        </article>
      )}

      <footer className="es-facilitation-footer">
        <p>
          <strong>Need help?</strong> Contact the programme team at{' '}
          <a href="mailto:workshops@wembleywonders.org">workshops@wembleywonders.org</a>
        </p>
      </footer>
    </div>
  );
};

export default FacilitationGuides;
