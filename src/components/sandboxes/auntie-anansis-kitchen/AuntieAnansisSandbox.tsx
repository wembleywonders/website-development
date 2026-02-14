import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import RecipeHeritageKeeper from '../../../components/sandboxes/auntie-anansis-kitchen/RecipeHeritageKeeper';
import styles from './AuntieAnansisSandbox.module.css';

const AuntieAnansisSandbox: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Recipe Heritage Keeper"
      pageStrapline="Document Your Island's Culinary Stories"
      pageGuide="Interactive tool to preserve Caribbean recipes, traditional techniques, and cultural stories—before the Aunties who remember them are gone."
      showMaya={false}
      pageType="programme"
    >
      <div className={styles.sandboxContent}>
        {/* Dedication Section */}
        <section className={styles.dedicationSection}>
          <div className={styles.dedicationCard}>
            <div className={styles.dedicationIcon}>🍲</div>
            <h3>Dedicated to the Caribbean culinary guardians who kept our heritage alive</h3>
            <div className={styles.pioneers}>
              <div className={styles.pioneer}>
                <strong>The Aunties & Grandmothers</strong>
                <p>
                  Who cooked without measuring, who passed down recipes through demonstration not documentation,
                  who shared Anansi stories while stirring pots, who preserved island traditions in diaspora kitchens
                </p>
              </div>
              <div className={styles.pioneer}>
                <strong>Every Island's Kitchen</strong>
                <p>
                  Grenadian, St Lucian, Bajan, Trini, Guyanese, Dominican, Jamaican, Vincentian—
                  each with unique flavours the UK's "Caribbean food" monoculture erases
                </p>
              </div>
              <div className={styles.pioneer}>
                <strong>Future Generations</strong>
                <p>
                  Who deserve to taste their heritage authentically, to know the stories behind the dishes,
                  to carry forward the wisdom that was cooked into every meal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Recipe Heritage Keeper */}
        <section className={styles.aboutSection}>
          <h2>What is the Recipe Heritage Keeper?</h2>
          <p className={styles.aboutIntro}>
            An interactive tool that helps you document traditional Caribbean recipes, preserve cultural stories,
            and connect your culinary heritage to real earning opportunities—all while fighting the food monoculture
            that treats "Caribbean food" like Jamaica is the only island.
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📖</div>
              <h4>Island-Specific Documentation</h4>
              <p>
                Record recipes from your island's kitchen—Grenadian oil down, St Lucian green fig, 
                Bajan flying fish, Trini pelau, Guyanese pepperpot, and hundreds more dishes at risk of being lost.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🕷️</div>
              <h4>Preserve Anansi Stories</h4>
              <p>
                Document the tales, wisdom, and cultural stories that were shared while cooking. 
                These oral traditions are as important as the recipes themselves.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>💰</div>
              <h4>Multiple Earning Pathways</h4>
              <p>
                Turn cultural knowledge into sustainable income: pop-up events, cookbook projects, 
                catering businesses, teaching workshops—earn while preserving heritage.
              </p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🤝</div>
              <h4>Island Kitchen Circles</h4>
              <p>
                Connect with others from your island, collaborate on cookbook projects, 
                share techniques, and build collective culinary resources.
              </p>
            </div>
          </div>
        </section>

        {/* The Crisis */}
        <section className={styles.crisisSection}>
          <h2>🌍 Why This Matters Now</h2>
          <div className={styles.crisisContent}>
            <div className={styles.crisisCard}>
              <h4>The Monoculture Problem</h4>
              <p>
                In the UK, "Caribbean food" means jerk chicken and rice & peas. Every island's distinct 
                culinary heritage gets erased. Grenadian nutmeg traditions, St Lucian bouyon, Guyanese 
                metagee—all invisible.
              </p>
            </div>

            <div className={styles.crisisCard}>
              <h4>The Knowledge Gap</h4>
              <p>
                The Aunties who cook without recipes, who measure with their hearts, who know the 
                traditional techniques—they're aging. Their knowledge exists only in practice, not 
                documentation. Once they're gone, so are the recipes.
              </p>
            </div>

            <div className={styles.crisisCard}>
              <h4>The Next Generation</h4>
              <p>
                Young Caribbean people in the UK often can't cook their own heritage dishes. They don't 
                know the stories, the significance, the techniques that made their grandparents' food special.
              </p>
            </div>
          </div>

          <div className={styles.crisisSolution}>
            <h4>Our Solution: Democratic Documentation</h4>
            <p>
              Free tools that let ANYONE document their heritage. No gatekeepers, no "professional chefs only."
              Your grandmother's recipes are just as valuable as any restaurant's. Document now, preserve forever,
              earn from authentic cultural knowledge.
            </p>
          </div>
        </section>

        {/* Cross-Programme Connections */}
        <section className={styles.connectionsSection}>
          <h2>🔗 How Food Connects to Everything</h2>
          <p className={styles.connectionsIntro}>
            Your culinary heritage isn't isolated—it flows through all our programmes, creating multiple pathways to earning and community impact.
          </p>

          <div className={styles.connectionGrid}>
            <Link to="/programmes/kaywanas-court" className={styles.connectionCard}>
              <div className={styles.connectionIcon}>🎭</div>
              <h4>Kaywana's Court</h4>
              <p>Dinner theatre experiences, cultural celebration catering, festival food stalls</p>
            </Link>

            <Link to="/programmes/techreneurs" className={styles.connectionCard}>
              <div className={styles.connectionIcon}>💼</div>
              <h4>TECHreneurs</h4>
              <p>Food business planning, pricing strategies, pop-up event management, catering economics</p>
            </Link>

            <Link to="/programmes/g-tech-casters" className={styles.connectionCard}>
              <div className={styles.connectionIcon}>📹</div>
              <h4>G-Tech Casters</h4>
              <p>Recipe video production, food photography, cooking tutorial content, social media marketing</p>
            </Link>

            <Link to="/raydyo" className={styles.connectionCard}>
              <div className={styles.connectionIcon}>📻</div>
              <h4>Rayd-yo</h4>
              <p>"Island Kitchen Stories" podcast series (£25 per episode), recipe features, culinary interviews</p>
            </Link>

            <Link to="/joystick" className={styles.connectionCard}>
              <div className={styles.connectionIcon}>📖</div>
              <h4>Joystick</h4>
              <p>Recipe articles, cultural food features, island cookbook reviews, culinary heritage profiles</p>
            </Link>
          </div>
        </section>

        {/* The Tool */}
        <section className={styles.toolSection}>
          <h2>📲 Try the Recipe Heritage Keeper</h2>
          <p>
            Answer a few questions about your island's kitchen, document your recipe with traditional techniques
            and cultural stories, then get a complete Heritage Plan showing exactly how to preserve your knowledge
            AND earn from it.
          </p>
        </section>

        {/* Recipe Heritage Keeper Component */}
        <RecipeHeritageKeeper />

        {/* Free Plan Explanation */}
        <section className={styles.freeSection}>
          <h3>💡 Why 3 Free Heritage Plans?</h3>
          <p>
            We want you to <strong>experience the value</strong> before joining. Document 3 different recipes, 
            explore all the earning pathways, see how your heritage connects to our programmes. Then decide 
            if membership makes sense for you.
          </p>
          <p>
            This isn't a trial—it's a demonstration. We're confident that once you see how we turn cultural 
            knowledge into community wealth, you'll want to be part of building this ecosystem.
          </p>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2>Ready to Join Auntie Anansi's Kitchen?</h2>
            <p>
              Members get unlimited recipe documentation, island cookbook project access, 
              pop-up event support, commercial kitchen space, Rayd-yo features, and connection 
              to authentic food earning opportunities across Wembley.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/membership" className={styles.primaryButton}>
                Explore Membership Options →
              </Link>
              <Link to="/programmes/auntie-anansis-kitchen" className={styles.secondaryButton}>
                ← Back to Programme Overview
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className={styles.footerNote}>
          <p>
            <strong>A Note on Cultural Respect:</strong> We're fighting food monoculture, not gatekeeping. 
            All Caribbean diaspora are welcome to document family recipes. We celebrate cross-island marriages, 
            fusion traditions, and diaspora adaptations—authenticity is about respect and knowledge, not purity.
          </p>
        </section>
      </div>
    </PageTemplate>
  );
};

export default AuntieAnansisSandbox;