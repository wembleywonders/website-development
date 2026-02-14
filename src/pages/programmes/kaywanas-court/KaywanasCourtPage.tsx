import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import styles from './KaywanasCourtPage.module.css';

const KaywanasCourtPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Kaywana's Court"
      pageStrapline="Diaspora Theatre Where Heritage Meets Stage"
      pageGuide="Kaywana's Court is where Caribbean and African performance traditions live. From yard theatre to griot storytelling, from dub poetry to dinner theatre—we're reclaiming the stage for diaspora voices."
      showMaya={true}
      pageType="programme"
    >
      <div className={styles.kaywanasContent}>
        
        {/* Heritage Welcome */}
        <section className={styles.heritageWelcome}>
          <div className={styles.welcomeCard}>
            <h2>🎭 This Stage Speaks Your Language</h2>
            <p>
              Patois. Pidgin. Creole. Twi. Yoruba. The languages your grandmother spoke, 
              the stories your ancestors told, the performance traditions that crossed the ocean—
              they belong on stage. Not as museum pieces. As living theatre.
            </p>
            <p className={styles.welcomeEmphasis}>
              Louise Bennett proved Patois is literary. Wole Soyinka proved African ritual is theatre. 
              Derek Walcott proved Caribbean stories are universal. 
              <strong> Now it's your turn.</strong>
            </p>
          </div>
        </section>

        {/* HERO: Try Production Planner Sandbox */}
        <section className={styles.sandboxSection}>
          <div className={styles.sandboxCard}>
            <span className={styles.sandboxIcon}>🎭</span>
            <h2 className={styles.sandboxTitle}>Try the Heritage Production Planner</h2>
            <p className={styles.sandboxDescription}>
              Plan performances rooted in diaspora traditions. From Anansi adaptations to dub poetry 
              showcases, from dinner theatre to yard plays—see how all programmes collaborate to bring 
              heritage stories to The Grand Stage.
            </p>
            
            <div className={styles.sandboxFeatures}>
              <span className={styles.featureBadge}>🌍 Diaspora Traditions</span>
              <span className={styles.featureBadge}>🗣️ Heritage Language Scripts</span>
              <span className={styles.featureBadge}>👵 Intergenerational Stories</span>
              <span className={styles.featureBadge}>🍲 Dinner Theatre</span>
            </div>

            <Link to="/programmes/kaywanas-court/sandbox" className={styles.sandboxCta}>
              Start Planning Your Show →
            </Link>

            <p className={styles.sandboxNote}>
              ✨ No signup required. 3 free production plans.
            </p>
          </div>
        </section>

        {/* What is Kaywana's Court */}
        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>What is Kaywana's Court?</h2>
          <p className={styles.leadText}>
            Kaywana's Court is <strong>diaspora theatre</strong>—where Caribbean and African performance 
            traditions meet contemporary community production. It's not just another drama programme. 
            It's the convergence point where heritage becomes performance, where oral tradition becomes 
            stage craft, where your grandmother's stories become community events.
          </p>
          <p className={styles.bodyText}>
            Writers from <strong>Pageturners</strong> adapt diaspora stories. Technicians from <strong>STEMgeneers</strong> build 
            sets. Business managers from <strong>TECHreneurs</strong> handle budgets and marketing. Designers 
            from <strong>Silk Stilettos</strong> create heritage-authentic costumes. Musicians from <strong>Trubble n Bass</strong> compose 
            soundscapes. And <strong>Auntie Anansi's Kitchen</strong> provides the food for our dinner theatre productions.
          </p>
        </section>

        {/* ========================================
            HERITAGE PERFORMANCE TRADITIONS - NEW
            ======================================== */}
        <section className={styles.heritageSection}>
          <h2 className={styles.sectionTitle}>🌍 Our Performance Traditions</h2>
          <p className={styles.leadText}>
            We draw from rich Caribbean and African theatrical traditions—not as historical 
            curiosities, but as living forms that speak to diaspora experience today.
          </p>

          <div className={styles.traditionsGrid}>
            {/* Caribbean Traditions */}
            <div className={styles.traditionCategory}>
              <h3>🇯🇲 Caribbean Theatre Traditions</h3>
              
              <div className={styles.traditionCard}>
                <h4>Yard Theatre</h4>
                <p>
                  Theatre in the yard, the tenement, the community space. Intimate, immediate, 
                  audience-participatory. The tradition of bringing drama to where people live—
                  no proscenium arch needed.
                </p>
                <span className={styles.traditionNote}>Perfect for: Community hall performances, outdoor shows</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Calypso Tent</h4>
                <p>
                  Social commentary through song. The tradition of calypsonians using wit, 
                  metaphor, and melody to speak truth to power. Extempo battles. Picong exchanges.
                </p>
                <span className={styles.traditionNote}>Perfect for: Political satire, social commentary shows</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Jamaican Pantomime</h4>
                <p>
                  Not British panto—Jamaican pantomime. Folk tales, music, dance, social satire. 
                  The Little Theatre Movement tradition that made Anansi a national hero on stage.
                </p>
                <span className={styles.traditionNote}>Perfect for: Family shows, Anansi adaptations</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Ring Games & Folk Forms</h4>
                <p>
                  Circle games, call-and-response, communal performance. "Brown Girl in the Ring," 
                  "Jane and Louisa," "Emmanuel Road." Interactive theatre rooted in children's games 
                  and community gatherings.
                </p>
                <span className={styles.traditionNote}>Perfect for: Intergenerational shows, children's theatre</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Carnival Mas</h4>
                <p>
                  Theatre in motion. Costume, character, music, movement through streets. 
                  From traditional characters (Midnight Robber, Dame Lorraine, Moko Jumbie) 
                  to contemporary mas—performance as public spectacle.
                </p>
                <span className={styles.traditionNote}>Perfect for: Carnival season, cultural celebrations</span>
              </div>
            </div>

            {/* African Traditions */}
            <div className={styles.traditionCategory}>
              <h3>🌍 African Theatre Traditions</h3>

              <div className={styles.traditionCard}>
                <h4>Griot Storytelling</h4>
                <p>
                  The West African tradition of the griot—keeper of history, genealogy, and wisdom. 
                  Story as performance, memory as art. One voice holding an audience through 
                  narrative mastery.
                </p>
                <span className={styles.traditionNote}>Perfect for: Solo shows, oral history performances</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Concert Party (Ghana)</h4>
                <p>
                  Popular theatre mixing comedy, music, dance, and moral instruction. 
                  The Ghanaian tradition of accessible, entertaining theatre that speaks to 
                  everyday concerns with humour and wisdom.
                </p>
                <span className={styles.traditionNote}>Perfect for: Comedy shows, community entertainment</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Total Theatre</h4>
                <p>
                  Wole Soyinka's concept—theatre integrating ritual, dance, music, poetry, 
                  and spectacle. The whole being greater than its parts. African aesthetics 
                  that reject Western separation of art forms.
                </p>
                <span className={styles.traditionNote}>Perfect for: Major productions, ritual drama</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Masquerade Performance</h4>
                <p>
                  Masked performance tradition—transformation, spirit embodiment, community ritual. 
                  From Egungun to Ekpe, mask as theatre technology predating the Greeks.
                </p>
                <span className={styles.traditionNote}>Perfect for: Heritage season, ceremonial theatre</span>
              </div>

              <div className={styles.traditionCard}>
                <h4>Praise Poetry & Oriki</h4>
                <p>
                  The Yoruba tradition of praise poetry—performed genealogies, heroic recitations, 
                  verbal art celebrating lineage and achievement. Poetry as public performance.
                </p>
                <span className={styles.traditionNote}>Perfect for: Spoken word, celebration events</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            HERITAGE LANGUAGE PERFORMANCE - NEW
            ======================================== */}
        <section className={styles.languageSection}>
          <h2 className={styles.sectionTitle}>🗣️ Heritage Language Performance</h2>
          <p className={styles.leadText}>
            Your heritage language is theatrical. Louise Bennett proved it. Linton Kwesi Johnson proved it. 
            Mutabaruka proved it. Now we're building a stage where Patois, Pidgin, Creole, Twi, and Yoruba 
            aren't just tolerated—they're celebrated.
          </p>

          <div className={styles.languageGrid}>
            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🇯🇲</div>
              <h4>Dub Poetry</h4>
              <p>
                Word, sound, and power. The tradition of Louise Bennett, Mikey Smith, 
                Jean Binta Breeze. Poetry performed to rhythm, Patois as literary language, 
                political fire in every syllable.
              </p>
              <span className={styles.languageEarning}>💰 £25/performance slot</span>
            </div>

            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🇳🇬</div>
              <h4>Pidgin Drama</h4>
              <p>
                Theatre in Nigerian Pidgin—the language of millions. Comedy, tragedy, 
                social commentary in the tongue that bridges ethnic boundaries. 
                Nollywood on stage.
              </p>
              <span className={styles.languageEarning}>💰 £25/performance slot</span>
            </div>

            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🇱🇨</div>
              <h4>Creole Monologues</h4>
              <p>
                Solo performance in St Lucian, Dominican, Haitian Creole. 
                Character studies, personal narratives, community stories 
                in the languages of the Eastern Caribbean.
              </p>
              <span className={styles.languageEarning}>💰 £25/performance slot</span>
            </div>

            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🇬🇭</div>
              <h4>Twi Storytelling</h4>
              <p>
                Anansesem in the original. Akan proverbs dramatised. 
                The spider trickster in his mother tongue, for audiences 
                who grew up hearing these stories.
              </p>
              <span className={styles.languageEarning}>💰 £25/performance slot</span>
            </div>

            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🇹🇹</div>
              <h4>Trini Talk Theatre</h4>
              <p>
                Trinidadian Creole on stage. The wit, the rhythm, the social observation. 
                From Derek Walcott's heritage to contemporary lime talk—
                theatre that sounds like home.
              </p>
              <span className={styles.languageEarning}>💰 £25/performance slot</span>
            </div>

            <div className={styles.languageCard}>
              <div className={styles.languageFlag}>🌍</div>
              <h4>Your Language?</h4>
              <p>
                Somali? Yoruba? Guyanese Creole? Bajan? We want to build 
                performance opportunities in every heritage language spoken 
                in Wembley. <Link to="/contact">Talk to us.</Link>
              </p>
              <span className={styles.languageEarning}>💰 Pitch your show</span>
            </div>
          </div>

          <div className={styles.languageNote}>
            <p>
              <strong>Note:</strong> Heritage language performances always include programme notes 
              or surtitles for mixed audiences. We celebrate the language without excluding 
              those who don't speak it.
            </p>
          </div>
        </section>

        {/* ========================================
            INTERGENERATIONAL PROGRAMMING - NEW
            ======================================== */}
        <section className={styles.intergenerationalSection}>
          <h2 className={styles.sectionTitle}>👵 Intergenerational Theatre</h2>
          <p className={styles.leadText}>
            The most powerful theatre happens when generations meet. Elder wisdom meets 
            youthful energy. Oral tradition meets contemporary staging. The stories that 
            might be lost become performances that will be remembered.
          </p>

          <div className={styles.intergenGrid}>
            <div className={styles.intergenCard}>
              <div className={styles.intergenIcon}>📖</div>
              <h4>Elder Storyteller Programme</h4>
              <p>
                Community elders share stories on stage. Not acting—being. 
                Their memories, their journeys, their wisdom presented to audiences 
                who need to hear it before it's lost.
              </p>
              <ul>
                <li>Professional recording for archive</li>
                <li>Youth assistants for staging support</li>
                <li>Stories published in Joystick</li>
              </ul>
              <span className={styles.intergenEarning}>💰 £50/performance + archive royalties</span>
            </div>

            <div className={styles.intergenCard}>
              <div className={styles.intergenIcon}>🔄</div>
              <h4>Story Bridge</h4>
              <p>
                Elder tells a story. Young performer adapts it for stage. 
                Both perform together. The tradition passes and transforms 
                in one production.
              </p>
              <ul>
                <li>6-week development process</li>
                <li>Mentorship in both directions</li>
                <li>Documented for Rayd-yo</li>
              </ul>
              <span className={styles.intergenEarning}>💰 Revenue share for both</span>
            </div>

            <div className={styles.intergenCard}>
              <div className={styles.intergenIcon}>🎓</div>
              <h4>Youth Ensemble + Elder Advisors</h4>
              <p>
                Young performers create shows with elder cultural advisors. 
                Not directing—advising. Ensuring heritage accuracy while 
                allowing creative freedom.
              </p>
              <ul>
                <li>Cultural authenticity guidance</li>
                <li>Heritage language coaching</li>
                <li>Community credibility</li>
              </ul>
              <span className={styles.intergenEarning}>💰 Advisory fees for elders</span>
            </div>
          </div>
        </section>

        {/* ========================================
            DINNER THEATRE - NEW (Auntie Anansi Connection)
            ======================================== */}
        <section className={styles.dinnerSection}>
          <h2 className={styles.sectionTitle}>🍲 Dinner Theatre with Auntie Anansi's Kitchen</h2>
          <p className={styles.leadText}>
            Theatre and food have always gone together in Caribbean culture. 
            We're formalising it. <strong>Auntie Anansi's Kitchen</strong> provides the food. 
            <strong>Kaywana's Court</strong> provides the show. The audience gets both.
          </p>

          <div className={styles.dinnerCard}>
            <div className={styles.dinnerFormat}>
              <h4>How It Works</h4>
              <ol>
                <li><strong>Welcome drink</strong> — Sorrel, mauby, ginger beer while audience settles</li>
                <li><strong>First course + Opening</strong> — Appetiser served, show begins</li>
                <li><strong>Main course + Act One</strong> — Food and story interweave</li>
                <li><strong>Intermission</strong> — Dessert service, audience mingles</li>
                <li><strong>Act Two + Coffee</strong> — Show concludes over drinks</li>
                <li><strong>Q&A with performers and cooks</strong> — Community conversation</li>
              </ol>
            </div>

            <div className={styles.dinnerRevenue}>
              <h4>Revenue Model</h4>
              <p>Dinner theatre tickets: £35-50 per person</p>
              <ul>
                <li><strong>55%</strong> to performers and kitchen team</li>
                <li><strong>25%</strong> to community development fund</li>
                <li><strong>20%</strong> to venue and operations</li>
              </ul>
              <p className={styles.dinnerNote}>
                A 50-seat dinner theatre at £40/ticket = £2,000 gross. 
                £1,100 to the creative team. Real money for community artists.
              </p>
            </div>

            <div className={styles.dinnerThemes}>
              <h4>Dinner Theatre Themes</h4>
              <div className={styles.themeList}>
                <span className={styles.theme}>Anansi Night — Trickster tales + Jamaican cuisine</span>
                <span className={styles.theme}>Windrush Memories — Arrival stories + 1950s-60s dishes</span>
                <span className={styles.theme}>Island Hopping — Stories from different islands, matching food</span>
                <span className={styles.theme}>Sunday Dinner Theatre — After-church vibes, comfort food</span>
                <span className={styles.theme}>Heritage Language Night — Patois/Pidgin performance + traditional dishes</span>
              </div>
            </div>

            <Link to="/programmes/auntie-anansis-kitchen" className={styles.dinnerLink}>
              🍲 Visit Auntie Anansi's Kitchen →
            </Link>
          </div>
        </section>

        {/* Cross-Programme Collaboration */}
        <section className={styles.collaborationSection}>
          <h2 className={styles.sectionTitle}>How Programmes Collaborate</h2>
          <p className={styles.leadText}>
            Every Kaywana's Court production brings together talent from across all programmes. 
            This is how we build community wealth—not just individual skills, but collective creation.
          </p>

          <div className={styles.programmeGrid}>
            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>📖</div>
              <h3>Pageturners</h3>
              <h4>Script Development</h4>
              <p>
                Writers develop scripts, adapt Anansi stories, create heritage language monologues. 
                From diaspora narratives to dub poetry—Pageturners provides the words.
              </p>
              <Link to="/programmes/pageturners" className={styles.programmeLink}>
                Join Pageturners →
              </Link>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🔧</div>
              <h3>STEMgeneers</h3>
              <h4>Set Design & Technical</h4>
              <p>
                Technical crew builds sets reflecting Caribbean aesthetics, manages lighting 
                and sound. From simple yard theatre setups to full productions.
              </p>
              <Link to="/programmes/stemgeneers" className={styles.programmeLink}>
                Join STEMgeneers →
              </Link>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>💼</div>
              <h3>TECHreneurs</h3>
              <h4>Budget & Marketing</h4>
              <p>
                Business managers create production budgets, run marketing campaigns to diaspora 
                audiences, manage ticket sales, and secure community sponsorships.
              </p>
              <Link to="/programmes/techreneurs" className={styles.programmeLink}>
                Join TECHreneurs →
              </Link>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>👗</div>
              <h3>Silk Stilettos</h3>
              <h4>Costume Design</h4>
              <p>
                Designers create heritage-authentic costumes—from carnival mas to traditional 
                African dress, from 1950s Windrush era to contemporary diaspora style.
              </p>
              <Link to="/programmes/silk-stilettos" className={styles.programmeLink}>
                Join Silk Stilettos →
              </Link>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🎵</div>
              <h3>Trubble n Bass</h3>
              <h4>Sound Design & Music</h4>
              <p>
                Musicians compose soundscapes rooted in Caribbean and African music traditions. 
                Live reggae, highlife, calypso, contemporary fusion—sonic heritage on stage.
              </p>
              <Link to="/programmes/trubble-n-bass" className={styles.programmeLink}>
                Join Trubble n Bass →
              </Link>
            </div>

            <div className={styles.programmeCard}>
              <div className={styles.programmeIcon}>🍲</div>
              <h3>Auntie Anansi's Kitchen</h3>
              <h4>Dinner Theatre Catering</h4>
              <p>
                Heritage recipes become part of the performance. Food that matches the story, 
                dishes that carry their own cultural narrative. Theatre you can taste.
              </p>
              <Link to="/programmes/auntie-anansis-kitchen" className={styles.programmeLink}>
                Visit the Kitchen →
              </Link>
            </div>
          </div>
        </section>

        {/* Cultural Seasons */}
        <section className={styles.seasonsSection}>
          <h2 className={styles.sectionTitle}>Our Cultural Seasons</h2>
          <p className={styles.leadText}>
            We follow cultural rhythms, not the traditional calendar. Each season brings different 
            energy, themes, and production opportunities that honor Caribbean and African traditions.
          </p>

          <div className={styles.seasonsGrid}>
            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🎉</div>
              <h3>Carnival Season</h3>
              <span className={styles.seasonMonths}>January - March</span>
              <p>Celebration, liberation, joy. High-energy performances with color, music, and movement.</p>
              <p className={styles.seasonSuggestion}>
                <strong>Heritage focus:</strong> Mas character performances, calypso tent shows, carnival history plays
              </p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌿</div>
              <h3>Heritage Season</h3>
              <span className={styles.seasonMonths}>April - June</span>
              <p>Roots, ancestors, preservation. Reflective storytelling and educational performances.</p>
              <p className={styles.seasonSuggestion}>
                <strong>Heritage focus:</strong> Windrush commemorations, ancestral stories, griot performances
              </p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>🌾</div>
              <h3>Harvest Season</h3>
              <span className={styles.seasonMonths}>July - September</span>
              <p>Abundance, community, gratitude. Collaborative celebrations of achievement.</p>
              <p className={styles.seasonSuggestion}>
                <strong>Heritage focus:</strong> Crop Over traditions, Emancipation celebrations, community feasts
              </p>
            </div>

            <div className={styles.seasonCard}>
              <div className={styles.seasonIcon}>📖</div>
              <h3>Storytelling Season</h3>
              <span className={styles.seasonMonths}>October - December</span>
              <p>Wisdom, tradition, legacy. Intimate performances honoring intergenerational knowledge.</p>
              <p className={styles.seasonSuggestion}>
                <strong>Heritage focus:</strong> Anansi tales, elder storytelling, Jonkonnu traditions
              </p>
            </div>
          </div>
        </section>

        {/* Production Types - UPDATED */}
        <section className={styles.typesSection}>
          <h2 className={styles.sectionTitle}>What We Produce</h2>
          
          <div className={styles.typesGrid}>
            <div className={styles.typeCard}>
              <h4>🎭 Yard Theatre</h4>
              <p>Intimate community performances in non-traditional spaces—church halls, community centres, actual yards</p>
            </div>
            <div className={styles.typeCard}>
              <h4>🎤 Dub Poetry Showcases</h4>
              <p>Heritage language performance poetry—Patois, Pidgin, Creole—with live music backing</p>
            </div>
            <div className={styles.typeCard}>
              <h4>🕷️ Anansi Adaptations</h4>
              <p>Classic trickster tales reimagined for contemporary audiences—family shows with bite</p>
            </div>
            <div className={styles.typeCard}>
              <h4>🍲 Dinner Theatre</h4>
              <p>Performance + meal from Auntie Anansi's Kitchen—food and story intertwined</p>
            </div>
            <div className={styles.typeCard}>
              <h4>📚 Griot Performances</h4>
              <p>Solo storytelling in West African tradition—one voice, one audience, one story</p>
            </div>
            <div className={styles.typeCard}>
              <h4>👵 Elder Wisdom Showcases</h4>
              <p>Community elders sharing stories on stage—oral history as live performance</p>
            </div>
            <div className={styles.typeCard}>
              <h4>🎵 Musical Theatre</h4>
              <p>Original musicals rooted in Caribbean and African music traditions</p>
            </div>
            <div className={styles.typeCard}>
              <h4>🎊 Cultural Celebrations</h4>
              <p>Festivals, ceremonies, and heritage events honoring diaspora traditions</p>
            </div>
            <div className={styles.typeCard}>
              <h4>📻 Radio Drama</h4>
              <p>Audio theatre for Rayd-yo broadcast—heritage stories reaching beyond the venue</p>
            </div>
          </div>
        </section>

        {/* Your Journey */}
        <section className={styles.journeySection}>
          <h2 className={styles.sectionTitle}>Your Journey with Kaywana's Court</h2>
          
          <div className={styles.journeyPath}>
            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>1️⃣</div>
              <div className={styles.stepContent}>
                <h4>Explore: Try the Heritage Production Planner</h4>
                <p>
                  Start with the sandbox. Plan productions rooted in diaspora traditions, 
                  explore heritage language performance options. 3 free plans, no commitment.
                </p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>2️⃣</div>
              <div className={styles.stepContent}>
                <h4>Join: Pick Your Programme</h4>
                <p>
                  Join at least one programme to participate. Writers, technicians, business 
                  managers, designers, musicians, cooks—all are essential to heritage theatre.
                </p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>3️⃣</div>
              <div className={styles.stepContent}>
                <h4>Collaborate: Join Production Teams</h4>
                <p>
                  Submit production proposals, vote on seasonal shows through collaborative consensus, 
                  and join cross-programme teams. Bring an elder to advise on heritage accuracy.
                </p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>4️⃣</div>
              <div className={styles.stepContent}>
                <h4>Perform: Take The Grand Stage</h4>
                <p>
                  Perform for your community—in heritage languages, drawing on diaspora traditions. 
                  Get featured in Joystick reviews, broadcast on Rayd-yo, build your archive.
                </p>
              </div>
            </div>

            <div className={styles.journeyStep}>
              <div className={styles.stepNumber}>5️⃣</div>
              <div className={styles.stepContent}>
                <h4>Earn & Mentor: Share Your Success</h4>
                <p>
                  Earn 55% revenue share from ticketed performances. Mentor newcomers in heritage 
                  traditions. Lead production teams. Shape diaspora theatre's future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rayd-yo Connection - NEW */}
        <section className={styles.raydyoSection}>
          <h2 className={styles.sectionTitle}>📻 Stage to Airwaves: Rayd-yo Connection</h2>
          <p className={styles.leadText}>
            Not every performance needs a live audience. Kaywana's Court productions can become 
            Rayd-yo content—radio dramas, recorded poetry, audio documentaries.
          </p>

          <div className={styles.raydyoGrid}>
            <div className={styles.raydyoCard}>
              <h4>Radio Drama Series</h4>
              <p>
                Stage plays adapted for audio. Full productions with sound design, 
                voice acting, music—theatre for your ears.
              </p>
              <span className={styles.raydyoEarning}>💰 £25/episode</span>
            </div>
            <div className={styles.raydyoCard}>
              <h4>Heritage Language Recordings</h4>
              <p>
                Dub poetry, Patois monologues, Creole stories recorded for broadcast. 
                Archive-quality heritage language preservation.
              </p>
              <span className={styles.raydyoEarning}>💰 £25/recording</span>
            </div>
            <div className={styles.raydyoCard}>
              <h4>Elder Story Archive</h4>
              <p>
                Intergenerational storytelling sessions professionally recorded. 
                Community memory preserved for future generations.
              </p>
              <span className={styles.raydyoEarning}>💰 £50/session + royalties</span>
            </div>
          </div>

          <Link to="/raydyo" className={styles.raydyoLink}>
            📻 Visit Rayd-yo →
          </Link>
        </section>

        {/* Why This Matters */}
        <section className={styles.whySection}>
          <h2 className={styles.sectionTitle}>Why Diaspora Theatre Matters</h2>
          <p className={styles.bodyText}>
            British theatre has historically excluded Caribbean and African voices—or included them 
            only on terms set by mainstream institutions. We're building something different: 
            theatre rooted in our traditions, performed in our languages, controlled by our community.
          </p>
          <p className={styles.bodyText}>
            When a young person sees an elder tell stories in Patois on a proper stage, something 
            shifts. When a family watches Anansi adapted with professional production values, 
            heritage becomes valuable. When dinner theatre pairs grandmother's recipes with 
            community stories, culture is transmitted.
          </p>
          <p className={styles.bodyText}>
            This isn't just entertainment. It's cultural infrastructure. It's economic opportunity 
            for diaspora artists. It's intergenerational connection. It's heritage preservation 
            through performance.
          </p>
        </section>

        {/* Get Involved */}
        <section className={styles.involvedSection}>
          <h2 className={styles.sectionTitle}>How to Get Involved</h2>
          
          <div className={styles.pathwayGrid}>
            <div className={styles.pathwayCard}>
              <h3>🎭 Try the Heritage Planner</h3>
              <p>
                Plan productions rooted in diaspora traditions. Explore heritage language 
                performance options. 3 free plans, no signup required.
              </p>
              <Link to="/programmes/kaywanas-court/sandbox" className={styles.pathwayLink}>
                Plan Your Show →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <h3>📖 Join a Programme</h3>
              <p>
                Pick your specialty: writing, tech, business, design, music, or kitchen. 
                Joining any programme gives you access to Kaywana's Court productions.
              </p>
              <Link to="/programmes" className={styles.pathwayLink}>
                Explore Programmes →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <h3>👵 Bring an Elder</h3>
              <p>
                Know someone with stories to tell? Heritage knowledge to share? 
                Our Elder Storyteller Programme welcomes community wisdom-keepers.
              </p>
              <Link to="/contact?subject=elder-storyteller" className={styles.pathwayLink}>
                Connect an Elder →
              </Link>
            </div>

            <div className={styles.pathwayCard}>
              <h3>🎟️ Attend Performances</h3>
              <p>
                See what our community creates. Support diaspora artists. Experience 
                heritage theatre. Bring your family.
              </p>
              <Link to="/calendar" className={styles.pathwayLink}>
                View Events →
              </Link>
            </div>
          </div>
        </section>

        {/* Membership Packages */}
        <section className={styles.membershipSection}>
          <h2 className={styles.sectionTitle}>Membership Options</h2>
          <p className={styles.leadText}>
            To participate in Kaywana's Court productions, join at least one programme. 
            Multi-programme membership gives you broader creative roles.
          </p>

          <div className={styles.membershipGrid}>
            <div className={styles.membershipCard}>
              <h3>Single Programme</h3>
              <div className={styles.membershipPrice}>£15/month</div>
              <ul>
                <li>Access to 1 programme + Kaywana's Court</li>
                <li>Contribute in your specialty area</li>
                <li>Submit production proposals</li>
                <li>Join seasonal production teams</li>
                <li>Perform/produce on The Grand Stage</li>
              </ul>
            </div>

            <div className={styles.membershipCard}>
              <h3>Multi-Programme</h3>
              <div className={styles.membershipPrice}>£35/month</div>
              <ul>
                <li>Access to 3 programmes of your choice</li>
                <li>Broader creative roles across productions</li>
                <li>Priority casting and team placement</li>
                <li>All single-programme benefits</li>
              </ul>
            </div>

            <div className={`${styles.membershipCard} ${styles.membershipBest}`}>
              <div className={styles.bestBadge}>BEST VALUE</div>
              <h3>All-Access</h3>
              <div className={styles.membershipPrice}>£50/month</div>
              <ul>
                <li>Access to ALL 9 programmes</li>
                <li>Leadership opportunities in productions</li>
                <li>Shape every aspect of shows</li>
                <li>Mentor newcomers and lead teams</li>
                <li>All multi-programme benefits</li>
              </ul>
            </div>
          </div>

          <p className={styles.membershipNote}>
            💚 Sliding scale available — we don't gatekeep talent based on ability to pay.
          </p>
        </section>

        {/* Contact/CTA */}
        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Ready to Join?</h2>
          <p>Questions about Kaywana's Court? Want to propose a heritage production?</p>
          <div className={styles.contactOptions}>
            <Link to="/programmes/kaywanas-court/sandbox" className={styles.contactButton}>
              Try Heritage Planner
            </Link>
            <Link to="/get-started" className={styles.contactButton}>
              Join a Programme
            </Link>
            <Link to="/maya" className={styles.contactButtonSecondary}>
              Chat with Maya
            </Link>
            <p className={styles.phoneNumber}>Call: 0208 902 9991</p>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default KaywanasCourtPage;