import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import DraggableMaya from '../../../components/maya/DraggableMaya';
import PageMeta from '@components/PageMeta';
import {
  Scissors, Package, Star, CheckCircle, ArrowRight,
  HandHeart, Coins, Zap, Shirt
} from 'lucide-react';
import './SilkStilettosPage.css';

/**
 * Silk Stilettos — The Art of Dangerous Elegance
 * ===============================================
 *
 * The name is not decorative. It is a reference.
 *
 * The well-dressed Caribbean man who carried a stiletto
 * or a sword-cane as part of his presentation. The saga boy.
 * The rude boy in pressed clothes. The Sapeur of Brazzaville
 * saving three years' wages for a Comme des Garçons jacket
 * and walking through poverty in full regalia as a political act.
 * The zoot suiter in Harlem whose silhouette was so threatening
 * that the US military declared it unpatriotic and riots followed.
 *
 * Style as weapon. Beauty as politics. Making as resistance.
 * The craft of appearance deployed by people whose dignity
 * was under constant attack.
 *
 * This programme teaches the making underneath the meaning.
 * Pattern, construction, tailoring, textile, costume, design.
 * For everyone who understands that how you present yourself
 * is never trivial — and who wants to build the skills
 * to make that presentation themselves.
 */

const SilkStilettosPage: React.FC = () => {

  // The mythological heritage — the real founding argument
  const dangerousElegance = [
    {
      name: "The Saga Boy",
      icon: "🎩",
      description: "The Caribbean archetype of the well-dressed man who carries himself as both art and warning. Trinidad's saga boys spent everything on presentation because presentation was power. The cut of a suit was a statement about who you were and what you were capable of. The stiletto and the sword-cane were accessories in the full sense — part of the argument the outfit was making.",
      lesson: "Style was never vanity. It was armour, self-definition, and warning simultaneously."
    },
    {
      name: "La Sape — The Sapeurs",
      icon: "🌍",
      description: "Men in the Republic of Congo — one of the poorest countries on earth — saving for years to buy Yves Saint Laurent, Comme des Garçons, Versace. Then walking through their neighbourhoods in full regalia. Non-violent by explicit principle. The Society of Ambianceurs and Persons of Elegance. The beauty IS the weapon. The craft of assembling that outfit IS the skill this programme teaches.",
      lesson: "Impossible elegance in impossible circumstances is the most political statement available."
    },
    {
      name: "The Zoot Suit Riots, 1943",
      icon: "✊",
      description: "Black and Latino men in Los Angeles wore zoot suits — high-waisted, wide-legged, draped in excess fabric at the height of wartime rationing. The US military declared the silhouette unpatriotic. Servicemen attacked wearers in the streets. The riots lasted a week. The suits kept being worn. The argument the clothes were making was understood perfectly by everyone involved.",
      lesson: "When your appearance threatens enough people to cause riots, you understand that style was never just style."
    },
    {
      name: "The Windrush Presentation",
      icon: "🚢",
      description: "The men and women who arrived at Tilbury in 1948 in their finest clothes. Not because they were naive about what waited for them. Because presentation was dignity, dignity was survival, and they were going to arrive looking like exactly who they were. The suit, the hat, the shoes — all made or altered by hand, most of them. The craft was inseparable from the statement.",
      lesson: "They dressed for who they were, not for what Britain expected. That took both skill and courage."
    },
    {
      name: "The Dressmaker & The Tailor",
      icon: "🧵",
      description: "Every community had both. The woman who made the wedding dresses, the christening gowns, the church hats, the carnival costumes. The man who cut the suits, altered the jackets, knew every client's posture and compensated for it in the pattern. Both were engineers. Both were artists. Neither waited for a fashion degree to do essential work.",
      lesson: "The craft has always belonged to everyone who mastered it. The gatekeeping came later."
    },
    {
      name: "Black Dandyism",
      icon: "✨",
      description: "From Beau Brummell's Black contemporaries through the Harlem Renaissance to present. The tradition of Black men using extraordinary presentation as intellectual and political statement. Examined by scholars, celebrated in museums, dismissed by exactly the people it was meant to challenge. The dandy understands that the body is a canvas and the street is a gallery.",
      lesson: "Dandyism is not frivolity. It is philosophy made visible."
    }
  ];

  // Making disciplines — what the programme actually teaches
  const makingDisciplines = [
    {
      name: "Tailoring & Pattern Cutting",
      icon: "✂️",
      color: "#8b5cf6",
      description: "The technical foundation of everything that fits. Understanding how flat material becomes three-dimensional form around a body. Seam allowances, grain lines, dart manipulation, ease. A well-cut suit and a well-cut dress require identical technical knowledge.",
      applications: [
        "Bespoke suit construction",
        "Dress and gown pattern making",
        "Alteration and adaptation",
        "Toile making and fitting",
        "Grading for size ranges"
      ],
      heritage: "The Caribbean tailor who dressed a community for forty years. The Savile Row tradition that has Caribbean hands in its history."
    },
    {
      name: "Costume & Structural Making",
      icon: "🎭",
      color: "#ec4899",
      description: "Where tailoring meets engineering. Wire-bending, armature construction, featherwork, beading, structural supports. Carnival costume making is applied physics — load distribution, weight management, wearability under performance conditions. Theatre and film demand the same skills.",
      applications: [
        "Carnival mas construction",
        "Theatre and film costume",
        "Section leader pieces",
        "Wearable sculpture",
        "Performance garments"
      ],
      heritage: "The carnival band leader who built a costume that weighed 40 kilos and danced in it for six hours. Engineering disguised as celebration."
    },
    {
      name: "Textile Construction & Fabric",
      icon: "🧵",
      color: "#10b981",
      description: "Understanding materials at the level of how they're made and why they behave as they do. Woven vs knit. Natural vs synthetic. How heat, moisture, and tension affect fabric. The difference between what a fabric looks like and what it can do.",
      applications: [
        "Fabric selection for purpose",
        "Textile heritage documentation",
        "Ankara, kente, madras working",
        "Stretch and performance fabric",
        "Lining and interfacing"
      ],
      heritage: "The madras traditions of Dominica and Martinique. Kente weaving as historically male craft. The textile knowledge that crossed the Atlantic and adapted."
    },
    {
      name: "Upcycling & Retrofit",
      icon: "♻️",
      color: "#f59e0b",
      description: "The Scrap Cat connection in textiles. Understanding what a garment is structurally so you can understand what it could become. Deconstruction, reassembly, transformation. The circular economy of cloth.",
      applications: [
        "Garment deconstruction and rebuild",
        "Vintage restoration",
        "Streetwear transformation",
        "Denim rework",
        "Material salvage and repurpose"
      ],
      heritage: "The tradition of making nothing go to waste. The Sunday best that became the school uniform that became the work clothes. Nothing discarded until it had given everything."
    },
    {
      name: "Design & Print",
      icon: "🎨",
      color: "#06b6d4",
      description: "From sketch to specification. Pattern design for print-on-demand and fabric. Understanding how a design works at scale, in repeat, on a body rather than a screen. The technical bridge between visual idea and wearable object.",
      applications: [
        "Repeat pattern design",
        "Print-on-demand products",
        "Collection planning",
        "Tech pack creation",
        "Cyberstore product design"
      ],
      heritage: "The adinkra cloth makers of Ghana. The batik tradition across West Africa and the Caribbean diaspora. Design with cultural meaning built into every element."
    },
    {
      name: "Bespoke & Commission",
      icon: "📐",
      color: "#f97316",
      description: "The full chain from client brief to finished piece. Taking measurements, understanding posture and proportion, managing expectations, delivering quality, building the kind of reputation that means you are booked rather than marketed.",
      applications: [
        "Wedding and occasion wear",
        "African print commission",
        "Church and cultural dress",
        "Sample making for designers",
        "Small batch production"
      ],
      heritage: "The dressmaker who wasn't famous but was booked. That is the model. That was always the model."
    }
  ];

  // The Makers Collective
  const makersCollective = {
    shared: [
      "Industrial sewing machines — straight stitch, overlocker, coverstitch",
      "Cutting tables and pattern-making workspace",
      "Dress forms in the full size range — not just the standard two",
      "Embroidery machine (collective owned)",
      "Pressing equipment — steam iron, tailor's ham, sleeve board",
      "Wire-bending and armature tools for costume construction",
      "Callipers and measurement tools"
    ],
    wholesale: [
      "Ankara fabric direct from suppliers — by the bolt",
      "Thread, notions, zips, buttons at wholesale",
      "Beading, featherwork, and carnival materials",
      "Interfacing and lining in quantity",
      "3D printing filament for structural elements and fittings"
    ]
  };

  // Who this is for — named directly
  const forWhom = [
    {
      person: "The man who sews",
      description: "Who has been told by the culture that this isn't for him. Who has the aptitude and has suppressed it or hidden it or practised it alone. Who understands that the tradition he's being excluded from includes the saga boy, the Sapeur, and the tailor who dressed his grandfather. This programme names that exclusion and rejects it.",
      icon: "🎩"
    },
    {
      person: "The woman who makes",
      description: "Who comes from the dressmaker tradition, or the carnival costume tradition, or who has been making things since she was old enough to hold scissors. Who wants the technical language to match what she already does intuitively, and the business skills to get paid properly for it.",
      icon: "✂️"
    },
    {
      person: "The person who understands presentation as politics",
      description: "Who knows that how you dress is never trivial. Who has felt the weight of other people's assumptions about what you should look like and chosen to answer with what you actually wear. Who wants to make that answer themselves rather than buying it.",
      icon: "✊"
    },
    {
      person: "The maker without a category",
      description: "Who makes costumes for the carnival band and doesn't know that's engineering. Who alters their own clothes because nothing fits right off a rack built for a different body. Who has a box of fabric and a sewing machine and wants to understand what's actually possible.",
      icon: "🧵"
    }
  ];

  // Cross-programme
  const crossProgramme = [
    { programme: "Kaywana's Court", connection: "Costume and textile design for every production", icon: "🎭" },
    { programme: "Easy Street", connection: "The well-dressed character who makes their own clothes", icon: "🎙️" },
    { programme: "STEMgeneers", connection: "Structural making — where fabric construction meets engineering", icon: "🔧" },
    { programme: "Scrap Cat", connection: "Textile salvage and the circular economy of cloth", icon: "♻️" },
    { programme: "G-Tech Casters", connection: "Styling and presentation for video and broadcast content", icon: "🎬" },
    { programme: "Cyberstore", connection: "Your designs, your products, 55% of every sale", icon: "🛒" }
  ];

  const outcomes = [
    "Can cut, construct, and finish a garment from pattern to completion",
    "Understands textile materials — what they do, why, and when to use them",
    "Can build a carnival or theatre costume structurally, not just decoratively",
    "Has the business skills to price work correctly and not undersell it",
    "Access to Makers Collective — shared equipment, wholesale materials, workspace",
    "Connection across Wembley Wonders programmes as costume and textile resource",
    "Silk Stilettos certification — blockchain verified, community recognised"
  ];

  return (
    <PageTemplate
      pageTitle="Silk Stilettos"
      pageStrapline="The Art of Dangerous Elegance — Making, Construction, and the Politics of Appearance"
      pageType="programme"
    >
      <PageMeta pageKey="silk-stilettos" />

      <DraggableMaya
        membershipTier="visitor"
        pageType="programme"
        pageContext={{
          title: "Silk Stilettos Programme",
          section: "programmes",
          contentType: "textile-making"
        }}
      />

      <div className="silk-stilettos-content">

        {/* Hero */}
        <section className="ss-hero">
          <div className="ss-hero-badge">🗡️</div>
          <h1>Silk Stilettos</h1>
          <p className="ss-hero-tagline">The Art of Dangerous Elegance</p>
          <p className="ss-hero-quote">
            "The stiletto was not decoration. Neither was the suit. 
            Neither is this programme."
          </p>
        </section>

        {/* The name explained */}
        <section className="ss-section ss-name-section">
          <div className="ss-name-card">
            <h2>About the Name</h2>
            <p>
              Silk Stilettos is named for the well-dressed Caribbean man who carried a stiletto 
              or a sword-cane as part of his presentation. The saga boy. The man whose elegance 
              was inseparable from his capacity for danger — not because violence was the point, 
              but because the combination made an argument that neither element could make alone.
            </p>
            <p>
              Style as weapon. Beauty as politics. The craft of appearance deployed by people 
              whose dignity was under constant attack and who refused to dress for their 
              attackers' comfort.
            </p>
            <p>
              This programme teaches the making underneath the meaning. The technical skills 
              that make the statement possible — pattern, construction, tailoring, textile, 
              costume, design. For everyone who understands that presentation is never trivial 
              and wants to build the ability to make it themselves.
            </p>
          </div>
        </section>

        {/* Heritage — the dangerous elegance tradition */}
        <section className="ss-section ss-heritage-section">
          <h2>The Tradition of Dangerous Elegance</h2>
          <p className="section-intro">
            The heritage this programme draws from is not fashion history. 
            It is the history of people who used appearance as a political instrument — 
            and who had the skill to make that instrument themselves.
          </p>
          <div className="ss-heritage-grid">
            {dangerousElegance.map((tradition, index) => (
              <div key={index} className="ss-heritage-card">
                <span className="ss-heritage-icon">{tradition.icon}</span>
                <h3>{tradition.name}</h3>
                <p>{tradition.description}</p>
                <p className="ss-heritage-lesson">
                  <strong>The principle:</strong> {tradition.lesson}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Not fashion week */}
        <section className="ss-section ss-reframe-section">
          <div className="ss-reframe-card">
            <h2>This Is Not About Fashion Week</h2>
            <div className="ss-reframe-comparison">
              <div className="ss-reframe-old">
                <h3>The Industry Path</h3>
                <p>Fashion school → portfolio → get discovered → brand deal → stardom</p>
                <ul>
                  <li>Winner-takes-all economics</li>
                  <li>Fashion degrees cost £30-50k</li>
                  <li>Most graduates work retail or leave</li>
                  <li>Success is an extreme statistical outlier</li>
                  <li>The gatekeepers decide if you belong</li>
                </ul>
              </div>
              <div className="ss-reframe-new">
                <h3>The Maker's Path</h3>
                <p>Build the skill → serve your community → be the person they call</p>
                <ul>
                  <li>Community needs you — no competition for that</li>
                  <li>Reputation builds through doing, not marketing</li>
                  <li>Skills compound — each commission teaches the next</li>
                  <li>The dressmaker wasn't famous. She was booked.</li>
                  <li>You decide what your work is worth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Making disciplines */}
        <section className="ss-section ss-disciplines-section">
          <h2>What Silk Stilettos Makes</h2>
          <p className="section-intro">
            Six making disciplines. Each is a complete technical field. 
            Most people develop depth in two or three and working knowledge of the rest. 
            All of them have community demand and earning potential.
          </p>
          <div className="ss-disciplines-grid">
            {makingDisciplines.map((discipline, index) => (
              <div key={index} className="ss-discipline-card" style={{ borderColor: discipline.color }}>
                <div className="ss-discipline-header" style={{ backgroundColor: `${discipline.color}20` }}>
                  <span className="ss-discipline-icon">{discipline.icon}</span>
                  <h3 style={{ color: discipline.color }}>{discipline.name}</h3>
                </div>
                <p className="ss-discipline-desc">{discipline.description}</p>
                <div className="ss-discipline-applications">
                  <h4>Applications:</h4>
                  <ul>
                    {discipline.applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
                <p className="ss-discipline-heritage">
                  <em>{discipline.heritage}</em>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Who this is for */}
        <section className="ss-section ss-forwhom-section">
          <h2>Who This Is For</h2>
          <p className="section-intro">
            The making tradition in clothing has no gender. The gatekeeping does. 
            This programme names that directly.
          </p>
          <div className="ss-forwhom-grid">
            {forWhom.map((item, index) => (
              <div key={index} className="ss-forwhom-card">
                <span className="ss-forwhom-icon">{item.icon}</span>
                <h3>{item.person}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Makers Collective */}
        <section className="ss-section ss-collective-section">
          <h2>The Makers Collective: Pardner for Resources</h2>
          <p className="section-intro">
            Industrial equipment is expensive. Studio space is expensive. 
            Quality fabric in quantity is expensive. Together, we access what 
            none of us could afford alone — the same principle as your 
            grandmother's pardner, applied to industrial sewing machines.
          </p>
          <div className="ss-collective-grid">
            <div className="ss-collective-card shared">
              <h3>🧵 Shared Equipment</h3>
              <p>Collective owns, everyone accesses:</p>
              <ul>
                {makersCollective.shared.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ss-collective-card wholesale">
              <h3>📦 Wholesale Materials</h3>
              <p>Group purchasing at trade prices:</p>
              <ul>
                {makersCollective.wholesale.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ss-collective-card pardner">
              <h3><HandHeart size={18} /> Makers Pardner</h3>
              <div className="ss-pardner-example">
                <p><strong>10 members × £40/month = £400/month pool</strong></p>
                <p>Each month, one person gets £400.</p>
                <p>→ Industrial machine, overlocker, or fabric stock.</p>
                <p>After 10 months, everyone has £400 of equipment or materials.</p>
              </div>
              <p className="ss-pardner-note">
                Your grandmother's pardner bought houses. 
                Your Makers Pardner builds the tools to make income.
              </p>
            </div>
          </div>
        </section>

        {/* Cross-programme */}
        <section className="ss-section ss-connections-section">
          <h2>Connected Across All Programmes</h2>
          <p className="section-intro">
            Every programme in Wembley Wonders needs what Silk Stilettos makes. 
            Every production needs costume. Every performer needs presentation. 
            Every broadcast needs styling.
          </p>
          <div className="ss-connections-grid">
            {crossProgramme.map((conn, index) => (
              <div key={index} className="ss-connection-card">
                <span className="ss-connection-icon">{conn.icon}</span>
                <h4>{conn.programme}</h4>
                <p>{conn.connection}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outcomes */}
        <section className="ss-section ss-outcomes-section">
          <h2>What You'll Have</h2>
          <div className="ss-outcomes-grid">
            {outcomes.map((outcome, index) => (
              <div key={index} className="ss-outcome-item">
                <CheckCircle size={20} />
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Having the conversation */}
        <section className="ss-section ss-messaging-section">
          <h2>Having the Conversation</h2>
          <div className="ss-messaging-grid">
            <div className="ss-messaging-card">
              <h3>👵 For Parents</h3>
              <p>
                "They're learning the making skills your mother had — sewing, construction, 
                pattern cutting. But with the technical language, the business knowledge, 
                and the community infrastructure to do it properly and get paid properly. 
                The dressmaker who kept the family in clothes wasn't doing a hobby. 
                We're formalising that."
              </p>
            </div>
            <div className="ss-messaging-card purple">
              <h3>🎩 For the Maker</h3>
              <p>
                "The tradition you're entering includes the saga boy, the Sapeur, the tailor 
                who dressed a community for forty years, the woman who built carnival costumes 
                that weighed forty kilos and moved like they were weightless. That's your 
                heritage. This programme gives you the technical foundation to work in it."
              </p>
            </div>
            <div className="ss-messaging-card green">
              <h3>✊ For the Sceptic</h3>
              <p>
                "The Sapeurs in Brazzaville aren't making a fashion statement. They're making 
                a political argument about human dignity in conditions designed to deny it. 
                The zoot suit rioters understood exactly what that argument meant — they tried 
                to beat it out of people. It kept being made. In silk. With a stiletto."
              </p>
            </div>
          </div>
        </section>

        {/* Sandbox CTA */}
        <section className="ss-section ss-sandbox-section">
          <div className="ss-sandbox-card">
            <span className="ss-sandbox-icon">🗡️</span>
            <h2>Creative Pathways Planner</h2>
            <p>
              Map your making interests to earning pathways. Price your work correctly. 
              Plan a first collection. Understand the Makers Collective economics. 
              See what the full programme looks like before committing.
            </p>
            <Link to="/programmes/silk-stilettos/sandbox" className="ss-sandbox-cta">
              🗡️ Open Full Sandbox →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="ss-cta">
          <div className="ss-cta-content">
            <span style={{ fontSize: '3rem' }}>🗡️</span>
            <h2>Ready to Make the Argument?</h2>
            <p>
              Your community needs people who can make. Not just buy. 
              Not just wear. Make — with the technical knowledge to do it 
              properly and the cultural understanding to know what it means.
            </p>
            <div className="ss-cta-buttons">
              <Link to="/programmes/silk-stilettos/sandbox" className="ss-cta-button primary">
                Open Creative Sandbox
              </Link>
              <Link to="/get-started" className="ss-cta-button secondary">
                Join Silk Stilettos
              </Link>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="ss-closing">
          <blockquote>
            "The Sapeur didn't carry a weapon. He didn't need one. 
            He walked through poverty in a Comme des Garçons jacket 
            and the argument was already won. 
            That took three years of saving, a lifetime of heritage, 
            and the skill to wear it like it was made for him. 
            Because it was. He'd had it altered."
          </blockquote>
        </section>

      </div>
    </PageTemplate>
  );
};

export default SilkStilettosPage;
