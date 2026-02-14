// src/components/sandboxes/pageturners/StoryStarter.tsx
// ENHANCED VERSION - Heritage Language + Immigrant Journey
import React, { useState } from 'react';
import styles from './StoryStarter.module.css';

interface Prompt {
  id: string;
  title: string;
  starter: string;
  languageNote?: string; // Optional note about language use
}

interface Genre {
  name: string;
  description: string;
  icon: string;
  pioneers?: string; // Writers who've done this well
  prompts: Prompt[];
}

interface StoryStarterProps {
  onComplete: (result: any) => void;
}

const StoryStarter: React.FC<StoryStarterProps> = ({ onComplete }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [storyText, setStoryText] = useState<string>('');
  const [storyLanguage, setStoryLanguage] = useState<string>('');
  const [heritageWordsUsed, setHeritageWordsUsed] = useState<string>('');
  const [authorNotes, setAuthorNotes] = useState<string>('');

  const genres: Record<string, Genre> = {
    'caribbean-oral': {
      name: 'Caribbean Oral Traditions',
      description: 'Anansi stories, proverbs, folk tales with rhythm and repetition. The storytelling that survived the Middle Passage.',
      icon: '🕷️',
      pioneers: 'Louise Bennett, Paul Keens-Douglas, Miss Lou',
      prompts: [
        {
          id: 'trickster',
          title: 'The Trickster Learns a Lesson',
          starter: 'There was a time when Anansi thought he was cleverer than...',
          languageNote: 'Try writing this in Patois, Creole, or your family\'s storytelling voice',
        },
        {
          id: 'wisdom',
          title: 'Wisdom Passed Down',
          starter: 'My grandmother used to say...',
          languageNote: 'Include the proverb in the original language if you know it',
        },
        {
          id: 'why-story',
          title: 'How Things Came to Be',
          starter: 'Long time ago, before your grandmother\'s grandmother was born, this is why the...',
          languageNote: 'Origin stories - why the sea is salty, why spider has thin waist',
        },
        {
          id: 'call-response',
          title: 'Call and Response',
          starter: 'Crick?\nCrack!\nThe story I\'m going to tell you...',
          languageNote: 'Use traditional call-and-response openings from your culture',
        },
      ],
    },
    'african-oral': {
      name: 'African Oral Traditions',
      description: 'Griot storytelling, Anansi\'s original home, proverbs and wisdom tales from across the continent.',
      icon: '🌍',
      pioneers: 'Chinua Achebe, Ama Ata Aidoo, Ngugi wa Thiong\'o',
      prompts: [
        {
          id: 'griot',
          title: 'The Griot Speaks',
          starter: 'I am the keeper of stories, the tongue of the ancestors. Listen, and I will tell you of...',
          languageNote: 'Griot tradition - the storyteller as historian and teacher',
        },
        {
          id: 'proverb-story',
          title: 'The Story Behind the Proverb',
          starter: 'In my language we say: "[insert proverb]". This is how that wisdom came to be...',
          languageNote: 'Include the proverb in Twi, Yoruba, Igbo, Somali, or your heritage language',
        },
        {
          id: 'tortoise',
          title: 'Tortoise and His Tricks',
          starter: 'Tortoise was hungry again, and when Tortoise is hungry...',
          languageNote: 'West African trickster tales - Ijapa (Yoruba), Mbe (Igbo)',
        },
        {
          id: 'moonlight-tale',
          title: 'Moonlight Stories',
          starter: 'When the moon was full and the children gathered, the elders would begin...',
          languageNote: 'The tradition of evening storytelling under the moon',
        },
      ],
    },
    'diaspora': {
      name: 'Diaspora Writing',
      description: 'Stories of migration, belonging, identity split between worlds. The journey and what it costs.',
      icon: '✈️',
      pioneers: 'Andrea Levy, Zadie Smith, Chimamanda Ngozi Adichie, Warsan Shire',
      prompts: [
        {
          id: 'migration',
          title: 'The Journey',
          starter: 'The first thing I noticed when we arrived was...',
        },
        {
          id: 'return',
          title: 'Going Back',
          starter: 'After years away, the place looked...',
        },
        {
          id: 'culture-shock',
          title: 'Culture Shock',
          starter: 'In this country, they do things differently. The first time I...',
          languageNote: 'The small moments of displacement - food, weather, customs, loneliness',
        },
        {
          id: 'between-worlds',
          title: 'Between Two Worlds',
          starter: 'At home I am one person. At school/work I become...',
          languageNote: 'Code-switching, double consciousness, the exhaustion of translation',
        },
        {
          id: 'what-i-miss',
          title: 'What I Miss',
          starter: 'There are things you cannot bring in a suitcase. The smell of...',
          languageNote: 'Sensory memories - sounds, smells, tastes that can\'t be replicated',
        },
        {
          id: 'windrush',
          title: 'The Windrush Story',
          starter: 'When the ship docked at Tilbury, they thought...',
          languageNote: 'Stories of the Windrush generation and their descendants',
        },
        {
          id: 'second-gen',
          title: 'Born Here, From There',
          starter: 'I was born in this country, but my parents never let me forget...',
          languageNote: 'Second generation identity - belonging to neither place fully',
        },
      ],
    },
    'feminist-womanist': {
      name: 'Feminist & Womanist Writing',
      description: 'Centring Black women\'s experiences - Caribbean, African, diaspora. Sexuality, body politics, resistance, joy.',
      icon: '👑',
      pioneers: 'Jamaica Kincaid, Maryse Condé, Buchi Emecheta, Ama Ata Aidoo',
      prompts: [
        {
          id: 'matriarch',
          title: 'Strength in Her Hands',
          starter: 'My grandmother\'s hands could...',
        },
        {
          id: 'voice',
          title: 'Finding Her Voice',
          starter: 'She was always told to be quiet, until...',
        },
        {
          id: 'kitchen-revolution',
          title: 'Kitchen Revolution',
          starter: 'The women gathered in the kitchen, and what happened there was not just cooking...',
          languageNote: 'The kitchen as site of women\'s power, resistance, and community',
        },
        {
          id: 'body',
          title: 'This Body',
          starter: 'They had opinions about my body before I did. My hair, my skin, my...',
          languageNote: 'Body politics - hair, skin colour, size, desirability',
        },
        {
          id: 'daughter',
          title: 'Mother-Daughter',
          starter: 'My mother wanted me to be...',
          languageNote: 'Generational tension and transmission between women',
        },
        {
          id: 'sisterhood',
          title: 'Sisterhood',
          starter: 'We recognised each other immediately. The way she...',
          languageNote: 'Connection between Black women across cultures',
        },
      ],
    },
    'speculative': {
      name: 'Speculative & Afrofuturism',
      description: 'Sci-fi, fantasy, magical realism rooted in African and Caribbean cosmologies. Imagining our futures.',
      icon: '🚀',
      pioneers: 'Octavia Butler, Nnedi Okofor, Nalo Hopkinson, Karen Lord',
      prompts: [
        {
          id: 'future',
          title: 'Caribbean 2100',
          starter: 'The islands had learned to float...',
        },
        {
          id: 'magic',
          title: 'Old Magic, New World',
          starter: 'The obeah woman\'s daughter worked in tech support...',
          languageNote: 'Traditional spirituality meets modern technology',
        },
        {
          id: 'ancestor-tech',
          title: 'Ancestor Technology',
          starter: 'The elders always said our people knew how to...',
          languageNote: 'What if African/Caribbean knowledge systems were recognised as advanced technology?',
        },
        {
          id: 'wakanda-real',
          title: 'If We Had Never Been Colonised',
          starter: 'In this timeline, the ships never came. Instead...',
          languageNote: 'Alternate history - imagining uninterrupted African development',
        },
        {
          id: 'climate-future',
          title: 'After the Waters Rise',
          starter: 'When the sea took the low islands, my people remembered how to...',
          languageNote: 'Climate futures - Caribbean and African resilience',
        },
        {
          id: 'spirit-world',
          title: 'Between Worlds',
          starter: 'The boundary between the living and the ancestors had always been thin in our family...',
          languageNote: 'African/Caribbean spiritual cosmology as speculative fiction',
        },
      ],
    },
    'resistance': {
      name: 'Resistance & Revolution',
      description: 'Stories of freedom fighters, maroons, political awakening, decolonisation. The struggle continues.',
      icon: '✊',
      pioneers: 'CLR James, George Lamming, Ngũgĩ wa Thiong\'o, Frantz Fanon',
      prompts: [
        {
          id: 'uprising',
          title: 'The First Act of Resistance',
          starter: 'It started small—a refusal to...',
        },
        {
          id: 'awakening',
          title: 'Political Awakening',
          starter: 'I used to believe what they taught us in school, until...',
        },
        {
          id: 'maroon',
          title: 'Maroon',
          starter: 'They thought we had escaped. But we had returned—to ourselves...',
          languageNote: 'Stories of the maroon communities who escaped and resisted',
        },
        {
          id: 'name',
          title: 'Reclaiming My Name',
          starter: 'The name on my passport is not my name. My real name is...',
          languageNote: 'The violence of colonial naming and the power of choosing your own',
        },
        {
          id: 'independence',
          title: 'Independence Day',
          starter: 'The flag went up, and my grandmother cried. She said...',
          languageNote: 'The day the colony became a nation - hope and its complications',
        },
        {
          id: 'protest',
          title: 'The March',
          starter: 'We gathered at dawn. The signs said...',
          languageNote: 'From Bristol to Brixton to Black Lives Matter - continuing resistance',
        },
      ],
    },
    'heritage-language': {
      name: 'Heritage Language Writing',
      description: 'Write in Patois, Twi, Yoruba, Pidgin, Creole, Somali - your heritage tongue is literary. Louise Bennett proved that.',
      icon: '🗣️',
      pioneers: 'Louise Bennett, Linton Kwesi Johnson, Mutabaruka, Jean "Binta" Breeze',
      prompts: [
        {
          id: 'patois-story',
          title: 'Write in Patois',
          starter: 'Yuh see, di ting wha happen was...',
          languageNote: 'Jamaican Patois - Louise Bennett showed this is a literary language',
        },
        {
          id: 'pidgin-tale',
          title: 'Naija Pidgin Story',
          starter: 'Na so di matter start. One day, my guy...',
          languageNote: 'Nigerian Pidgin - millions speak it, write in it proudly',
        },
        {
          id: 'creole-voice',
          title: 'Creole/Kwéyòl Voice',
          starter: 'Manman mwen té ka di mwen...',
          languageNote: 'Dominican, St Lucian, Haitian Creole - write in your mother tongue',
        },
        {
          id: 'twi-tale',
          title: 'Twi/Akan Story',
          starter: 'Ɛbɛyɛ tete no, na Ananse...',
          languageNote: 'Write in Twi - include English translation if you want',
        },
        {
          id: 'mixed',
          title: 'Code-Switching',
          starter: 'My mum always switches languages when she\'s vex. "You see dis pikin," she said, then...',
          languageNote: 'The natural flow between languages - write how your family actually speaks',
        },
        {
          id: 'dub-poetry',
          title: 'Dub Poetry',
          starter: 'Hear dis now / Mek mi tell yuh / bout di time when...',
          languageNote: 'Linton Kwesi Johnson style - rhythm, resistance, reggae in the words',
        },
        {
          id: 'proverb-piece',
          title: 'Proverb and Meaning',
          starter: 'In my language we say: "[write proverb]"\nIt means...\nLet me tell you the story of when I learned this...',
          languageNote: 'Start with a proverb in heritage language, then unpack its meaning',
        },
      ],
    },
    'immigrant-journey': {
      name: 'Immigrant Journeys',
      description: 'The specific experience of arrival, adaptation, culture shock, and finding home. Recent arrivals and settled communities.',
      icon: '🧳',
      pioneers: 'Sam Selvon, Bernardine Evaristo, NoViolet Bulawayo, Dinaw Mengestu',
      prompts: [
        {
          id: 'first-winter',
          title: 'First Winter',
          starter: 'Nobody told me about the cold. Not really. They said "bring a jacket" but...',
          languageNote: 'The physical shock of British weather',
        },
        {
          id: 'supermarket',
          title: 'Lost in the Supermarket',
          starter: 'I walked the aisles looking for something familiar. The closest I found was...',
          languageNote: 'Food shopping as cultural displacement',
        },
        {
          id: 'accent',
          title: 'Your Accent',
          starter: '"Where are you from?" they ask. I tell them. "No, where are you really from?"...',
          languageNote: 'The exhaustion of being questioned about belonging',
        },
        {
          id: 'phone-call',
          title: 'The Phone Call Home',
          starter: 'When I call home, I lie. I tell them everything is fine. I don\'t tell them about...',
          languageNote: 'The things you don\'t tell family back home',
        },
        {
          id: 'document',
          title: 'Papers',
          starter: 'The letter arrived. Home Office. My hands shook as I...',
          languageNote: 'The anxiety of immigration status - hostile environment',
        },
        {
          id: 'cooking-here',
          title: 'Cooking in a Foreign Kitchen',
          starter: 'The first time I tried to cook my mother\'s recipe here, I couldn\'t find...',
          languageNote: 'Adaptation and substitution - maintaining food identity',
        },
        {
          id: 'child-translator',
          title: 'When Children Translate',
          starter: 'My parents don\'t speak English well. So I became the one who...',
          languageNote: 'Children as interpreters - responsibility and reversal',
        },
        {
          id: 'sending-money',
          title: 'Remittance',
          starter: 'Every month, before rent, before food, I send money home. Because...',
          languageNote: 'The obligation and love in sending money back',
        },
      ],
    },
  };

  const handleGenreClick = (genreKey: string) => {
    setSelectedGenre(genreKey);
    setSelectedPrompt(null);
    setStoryText('');
    setStoryLanguage('');
    setHeritageWordsUsed('');
    setAuthorNotes('');
  };

  const handlePromptClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setStoryText(prompt.starter + '\n\n');
  };

  const handleBack = () => {
    if (selectedPrompt) {
      setSelectedPrompt(null);
      setStoryText('');
    } else if (selectedGenre) {
      setSelectedGenre('');
    } else {
      onComplete(null);
    }
  };

  const handleDownload = () => {
    const currentGenre = genres[selectedGenre];
    
    // Build the document with metadata
    let docContent = `═══════════════════════════════════════════════════════════
                    PAGETURNERS
              Caribbean Voices. Global Stories.
                   Wembley Wonders CIC
═══════════════════════════════════════════════════════════

GENRE: ${currentGenre.name}
PROMPT: ${selectedPrompt?.title}
${storyLanguage ? `LANGUAGE(S) USED: ${storyLanguage}` : ''}
DATE: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}

───────────────────────────────────────────────────────────

${storyText}

───────────────────────────────────────────────────────────
`;

    if (heritageWordsUsed) {
      docContent += `
HERITAGE WORDS & PHRASES USED:
${heritageWordsUsed}

───────────────────────────────────────────────────────────
`;
    }

    if (authorNotes) {
      docContent += `
AUTHOR'S NOTES:
${authorNotes}

───────────────────────────────────────────────────────────
`;
    }

    docContent += `
Written with Pageturners Story Starter
Wembley Wonders CIC - Create • Earn • Belong
https://wembleywonders.org

Your story matters. Your voice is unique. Your language is literary.

═══════════════════════════════════════════════════════════
`;

    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `story-${selectedPrompt?.id || 'draft'}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = storyText.trim().split(/\s+/).filter(w => w.length > 0).length;

  // GENRE SELECTION SCREEN
  if (!selectedGenre) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>📖 Story Starter</h1>
          <button onClick={() => onComplete(null)} className={styles.closeBtn}>
            ✕ Close
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.intro}>
            <h2>Choose Your Literary Tradition</h2>
            <p>8 authentic African and Caribbean storytelling traditions. Your heritage is literary.</p>
          </div>

          <div className={styles.grid}>
            {Object.entries(genres).map(([key, genre]) => (
              <div
                key={key}
                className={styles.card}
                onClick={() => handleGenreClick(key)}
              >
                <div className={styles.icon}>{genre.icon}</div>
                <h3>{genre.name}</h3>
                <p>{genre.description}</p>
                {genre.pioneers && (
                  <p className={styles.pioneers}>
                    <strong>Writers:</strong> {genre.pioneers}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.languageNote}>
            <h4>🗣️ A Note on Language</h4>
            <p>
              Louise Bennett proved that Patois is a literary language. Linton Kwesi Johnson made dub poetry. 
              Chinua Achebe wrote proverbs in English that felt like Igbo. 
              <strong> Write in whatever language feels true.</strong> English, Patois, Twi, Pidgin, Creole, 
              code-switching between all of them - it's all valid. It's all literature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // PROMPT SELECTION SCREEN
  const currentGenre = genres[selectedGenre];
  
  if (selectedGenre && !selectedPrompt) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{currentGenre.icon} {currentGenre.name}</h1>
          <button onClick={() => onComplete(null)} className={styles.closeBtn}>
            ✕ Close
          </button>
        </div>

        <div className={styles.content}>
          <button onClick={handleBack} className={styles.backBtn}>
            ← Back to Genres
          </button>

          <div className={styles.intro}>
            <h2>Choose Your Writing Prompt</h2>
            <p>{currentGenre.description}</p>
            {currentGenre.pioneers && (
              <p className={styles.pioneersLarge}>
                <strong>Writers in this tradition:</strong> {currentGenre.pioneers}
              </p>
            )}
          </div>

          <div className={styles.grid}>
            {currentGenre.prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={styles.card}
                onClick={() => handlePromptClick(prompt)}
              >
                <h3>{prompt.title}</h3>
                <p className={styles.promptPreview}>"{prompt.starter}"</p>
                {prompt.languageNote && (
                  <p className={styles.languageHint}>💡 {prompt.languageNote}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // WRITING SCREEN
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{currentGenre.icon} {selectedPrompt?.title}</h1>
        <button onClick={() => onComplete(null)} className={styles.closeBtn}>
          ✕ Close
        </button>
      </div>

      <div className={styles.content}>
        <button onClick={handleBack} className={styles.backBtn}>
          ← Change Prompt
        </button>

        <div className={styles.promptBox}>
          <h4>Your Writing Prompt:</h4>
          <p className={styles.promptText}>"{selectedPrompt?.starter}"</p>
          {selectedPrompt?.languageNote && (
            <p className={styles.promptHint}>💡 {selectedPrompt.languageNote}</p>
          )}
        </div>

        <div className={styles.editor}>
          <div className={styles.toolbar}>
            <span>Words: {wordCount}</span>
            <span>Aim for 200-400 words</span>
          </div>

          <textarea
            className={styles.textarea}
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="Continue the story here... Write in whatever language feels true."
            autoFocus
          />
        </div>

        {/* Heritage Language Capture Section */}
        <div className={styles.heritageSection}>
          <h4>📝 Optional: Document Your Language</h4>
          
          <div className={styles.heritageField}>
            <label>What language(s) did you write in?</label>
            <input
              type="text"
              value={storyLanguage}
              onChange={(e) => setStoryLanguage(e.target.value)}
              placeholder="e.g., English, Patois, Twi, Pidgin, Creole, code-switching..."
            />
          </div>

          <div className={styles.heritageField}>
            <label>Heritage words or phrases you used:</label>
            <textarea
              value={heritageWordsUsed}
              onChange={(e) => setHeritageWordsUsed(e.target.value)}
              placeholder="List any words from your heritage language with their meanings - this helps preserve them..."
              rows={3}
            />
            <span className={styles.fieldHint}>
              e.g., "cho-cho (chayote)", "mek mi tell yuh (let me tell you)", "wahala (trouble)"
            </span>
          </div>

          <div className={styles.heritageField}>
            <label>Author's notes (optional):</label>
            <textarea
              value={authorNotes}
              onChange={(e) => setAuthorNotes(e.target.value)}
              placeholder="Any context about your story - where it comes from, what inspired it, who it's for..."
              rows={3}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            onClick={handleDownload} 
            className={styles.downloadBtn}
            disabled={wordCount === 0}
          >
            💾 Download Story
          </button>
          <p className={styles.hint}>
            💡 <strong>Free:</strong> 3 downloads | <strong>Members:</strong> Unlimited + Maya feedback + 55% on published work
          </p>
        </div>

        <div className={styles.encouragement}>
          <p>
            <strong>Your voice matters.</strong> Whether you wrote in perfect English, pure Patois, 
            or something beautifully in-between - this is literature. This is heritage. This is yours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryStarter;