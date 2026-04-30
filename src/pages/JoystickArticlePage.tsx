/*
 * JOYSTICK E-ZINE — ARTICLE PAGE
 * Copyright (c) 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 * All rights reserved.
 */

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './JoystickArticlePage.css';

/* ─── TYPES ──────────────────────────────────────────────────────────── */

interface ArticleSection {
  type: 'p' | 'subhead' | 'pullquote' | 'box' | 'anansi';
  content?: string;
  heading?: string;
  items?: string[];
  intro?: string;
}

interface ArticleData {
  slug: string;
  category: string;
  categoryColor: string;
  kicker?: string;
  headline: string;
  deck: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  sourceCredit?: string;
  sourceUrl?: string;
  body: ArticleSection[];
  relatedSlugs?: string[];
}

/* ─── ARTICLE CONTENT ────────────────────────────────────────────────── */

const ARTICLES: Record<string, ArticleData> = {

  'biscuit-price-fix': {
    slug: 'biscuit-price-fix',
    category: 'Cost of Living',
    categoryColor: 'red',
    kicker: 'Food prices — Regulation',
    headline: "They calculated you'd pay it. So far, they've been right.",
    deck: "The biscuits in your trolley cost more here than in Germany. Same factory. Same wrapper. Same lorry. And somebody made a very deliberate decision about that.",
    author: 'Andy Roberts / The Fine Print',
    authorRole: 'Adapted for Joystick',
    date: 'April 2026',
    readTime: '7 min read',
    sourceCredit: 'The Fine Print — Andy Roberts',
    sourceUrl: 'https://www.youtube.com/watch?v=f63qalvQADc',
    relatedSlugs: ['market-run-april'],
    body: [
      {
        type: 'p',
        content: "You know that feeling at the checkout. You've been careful. You checked the offers. You swapped the brand. And somehow it's still £15 more than you expected. That's not bad luck. That's a business model.",
      },
      {
        type: 'p',
        content: "A man named Andy Roberts — runs a YouTube channel called The Fine Print — bought a packet of biscuits in a German supermarket for €1.30. He then went to a UK supermarket and bought the exact same packet. Same recipe, same factory somewhere in central Europe, same production line, same wrapper. £2.10. No extra shipping cost. No VAT difference — the UK charges zero VAT on most food. Just a different checkout, and a decision that you'd swallow the difference.",
      },
      {
        type: 'p',
        content: "And then there was Jordan Cox, who in 2024 booked a return flight to Istanbul for £33, packed an empty suitcase, and walked into a Turkish supermarket. Heinz Beans. Kellogg's cereal. Oral-B. Doritos. The same branded goods you find in Tesco on Wembley High Road. His basket: £34. The same basket at Tesco: £89. After flights. After lugging a suitcase full of ketchup through customs. The man came home £20 better off.",
      },
      {
        type: 'p',
        content: "Funny? Depressing? A bit of both, honestly.",
      },
      {
        type: 'p',
        content: "And before anyone says Turkey's cheap — these are not Turkish products. The same beans cost less in Spain. The same chocolate costs less in Poland. The same cereal costs less in Germany. Countries with the euro, comparable wages, supermarkets that look exactly like yours. So who's deciding you should pay more?",
      },
      {
        type: 'pullquote',
        content: "Five companies. Every aisle. All of them looked at a map and decided Britain's going to pay more.",
      },
      {
        type: 'p',
        content: "Kit Kat, Shreddies, Nescafé — Nestlé. Marmite, Hellmann's, PG Tips, Ben & Jerry's, Pot Noodle — Unilever. Cadbury, Oreo, Toblerone, Philadelphia — Mondelez. Walkers, Doritos, Quaker — PepsiCo. Heinz Beans, HP Sauce — Kraft Heinz. You walk down a supermarket aisle thinking you're choosing between dozens of competitors. You're choosing between five corporations in fancy dress.",
      },
      {
        type: 'subhead',
        content: 'Where the money actually goes',
      },
      {
        type: 'p',
        content: "In 2022 the University of Portsmouth and the charity Sustain tracked everyday products from farm to checkout. A loaf of bread costs £1.40. The farmer who grew the wheat gets 9p. Their profit: less than a tenth of one penny. Milk farmers receive 46p per litre. You pay £1.70. One in five UK farms didn't turn a profit last year. They are growing your food at a loss.",
      },
      {
        type: 'p',
        content: "The supermarkets — and people are quick to blame Tesco — are actually running on 2 to 4% margins. Not exactly yacht money. So the farmers get a fraction and the supermarkets get single digits. Where does the rest go? The manufacturers. Nestlé, Unilever, Mondelez. Fifteen to eighteen percent profit margins. Nestlé alone: 17%. On milk they bought from struggling dairy farmers for 46p a litre.",
      },
      {
        type: 'p',
        content: "And at the other end of the chain, the Trussell Trust handed out 2.9 million emergency food parcels last year. The Food Foundation worked out that eating the government's own recommended healthy diet would cost the poorest fifth of households half their disposable income. Half. For the wealthiest fifth: 11%.",
      },
      {
        type: 'subhead',
        content: 'The regulator that noticed and did nothing',
      },
      {
        type: 'p',
        content: "The EU fined Mondelez €337 million in 2024 for blocking cheaper goods crossing borders — cutting off traders who spotted that the same chocolate was cheaper in one country and tried to sell it in another. That is the whole point of a free market. Mondelez's response was to pick up the phone and cancel supply. The EU had enforcement mechanisms. They used them.",
      },
      {
        type: 'p',
        content: "Our Competition and Markets Authority investigated during the cost of living crisis. They found that 75% of big branded manufacturers had raised prices faster than their costs — costs up 8%, prices up 12%, the gap being pure profit dressed up as inflation. Then they closed the file. No fines. No referrals. A PDF and, presumably, a long lunch.",
      },
      {
        type: 'p',
        content: "Meanwhile, between 2020 and 2024, government ministers responsible for food policy met with the food industry 1,481 times. With food charities and campaign groups: 35 times. Forty to one. And those are only the meetings they logged.",
      },
      {
        type: 'p',
        content: "The government's scientific committee on nutrition — the people who decide what your kids should eat at school — had 11 of its 17 members holding financial ties to food corporations including Nestlé and Unilever. In 2023, official health guidance was drafted encouraging people to eat minimally processed food. The food industry lobbied to remove those exact words. The government deleted them.",
      },
      {
        type: 'p',
        content: "The annual agriculture report used to contain one simple figure: the percentage of the retail price that actually reaches the farmer. It told you, in one number, whether the system was fair. They took it out. When journalists asked supermarkets to publish their supply chain data instead, the British Retail Consortium said it would have \"an adverse effect on competition.\" What they meant, in plain English: you'd be absolutely furious.",
      },
      {
        type: 'pullquote',
        content: '"If there\'s nothing to hide, that is a very odd thing to hide." — Andy Roberts, The Fine Print',
      },
      {
        type: 'p',
        content: "They charge more because they calculated you'll pay it and put up with it. So far, they've been right. But you don't have to make it easy for them.",
      },
      {
        type: 'box',
        heading: 'Shop smarter. Spend less. Buy better.',
        intro: 'Practical alternatives for Wembley & Brent shoppers — no suitcase required',
        items: [
          'Your local ethnic grocer beats the supermarket on almost everything fresh. Fruit, vegetables, yams, plantain, fresh herbs, ginger, garlic — dramatically cheaper, often fresher, usually unpackaged. Wembley, Harlesden, and Southall are stacked with options. Walk past the Tesco produce aisle and keep going.',
          'Poundland, Savers, and Home Bargains carry the same branded goods — often from the same manufacturers — at significantly lower prices. Cleaning products, toiletries, tins, condiments. Worth a dedicated shop before you hit the main supermarket.',
          'Asian cash-and-carry stores (Bestway on North Circular is right on your doorstep) are open to the public and sell bulk staples — rice, flour, lentils, oil, spices — at wholesale prices. Split a bag of basmati between two households and the savings are immediate.',
          'Caribbean and African grocers for dried goods, seasonings, and tinned goods. If you\'re buying tinned ackee, scotch bonnet sauce, or Caribbean condiments at a supermarket, you\'re paying a premium. Your local grocer sources the same products without the markup.',
          'Markets: Wembley Market (Saturdays), Harlesden, and Ealing Road for produce. Get there by 11am for best selection, late afternoon for end-of-day deals from traders clearing stock.',
          'Frozen over fresh for anything you\'re not eating that week. Frozen vegetables are nutritionally equivalent, much cheaper, zero packaging waste from rotting food, and the ethnic frozen aisle in larger stores carries things the fresh section doesn\'t.',
          'Own-brand is not the same product for branded crisps, cereal, or sauces — you are purely paying for the logo. For tinned goods, pasta, flour, and oil — it genuinely is the same thing.',
          'Cook from scratch where you can. A bag of red lentils from a cash-and-carry, an onion, garlic, and spices you already have: pennies per portion. The equivalent ready meal: £3.50.',
          'OLIO and Too Good To Go apps for surplus food from local businesses and neighbours. Free or near-free. Worth having on your phone.',
        ],
      },
      {
        type: 'anansi',
        content: "This is the story that launched Auntie Anansi's Market Run — our new standing feature in every Joystick issue. Practical, local, community-sourced shopping intelligence every quarter. If you know a trader, a market tip, a cash-and-carry bargain, or a kitchen trick that stretches a pound further, we want it. Send your tips to admin@wembleywonders.org with the subject line Market Run.",
      },
    ],
  },

  'market-run-april': {
    slug: 'market-run-april',
    category: "Auntie Anansi's Kitchen",
    categoryColor: 'gold',
    kicker: "Market Run — April 2026",
    headline: "Where to shop smarter in Brent right now",
    deck: "Cash-and-carry secrets, what's in season, and the ethnic grocers saving our readers serious money this month.",
    author: 'Joystick Editors',
    authorRole: 'Community Intelligence',
    date: 'April 2026',
    readTime: '4 min read',
    relatedSlugs: ['biscuit-price-fix'],
    body: [
      {
        type: 'p',
        content: "Auntie Anansi's Market Run is a new standing feature in every Joystick issue. Community-sourced, locally verified, practical. No affiliate links. No sponsored content. Just what actually saves money in Wembley and Brent right now.",
      },
      {
        type: 'subhead',
        content: "What's in season — April",
      },
      {
        type: 'p',
        content: "Spring greens, purple sprouting broccoli, spinach, new potatoes. At your local market or grocer these are cheap and plentiful right now. At a supermarket you'll pay for the privilege of them being washed, bagged, and stickered. Skip the packaging, buy loose.",
      },
      {
        type: 'subhead',
        content: "This month's cash-and-carry tip",
      },
      {
        type: 'p',
        content: "Bestway on the North Circular (open to the public — you don't need a trade account) currently has 10kg bags of basmati for around £12. Split between two households that's a month of rice each for £6. The same volume at a supermarket runs £25+. Their cooking oil prices are similarly wholesale. Go with a trolley, not a basket.",
      },
      {
        type: 'subhead',
        content: "Ethnic grocer spotlight — Ealing Road",
      },
      {
        type: 'p',
        content: "Ealing Road in Wembley is one of the most underused food streets in London. Indian, Caribbean, East African — the produce quality is high and the prices are consistently 30–50% below supermarket equivalents for fresh fruit and veg. Ginger, garlic, fresh turmeric, curry leaves, scotch bonnets, plantain, fresh okra — all available loose, no plastic, at prices that make the supermarket shelf look embarrassing.",
      },
      {
        type: 'anansi',
        content: "Got a tip for next issue? A local shop, a market find, a bulk-buy bargain, a kitchen trick that stretches your shopping further? Send it to admin@wembleywonders.org with the subject line Market Run. Auntie Anansi didn't get the story by waiting for someone to hand it to her. Neither do we.",
      },
    ],
  },

};

/* ─── SECTION RENDERER ───────────────────────────────────────────────── */

const RenderSection: React.FC<{ section: ArticleSection; idx: number }> = ({ section, idx }) => {
  switch (section.type) {
    case 'p':
      return <p key={idx} className="jka-p">{section.content}</p>;

    case 'subhead':
      return <h3 key={idx} className="jka-subhead">{section.content}</h3>;

    case 'pullquote':
      return (
        <blockquote key={idx} className="jka-pullquote">
          {section.content}
        </blockquote>
      );

    case 'box':
      return (
        <div key={idx} className="jka-box">
          {section.heading && <h3 className="jka-box-hed">{section.heading}</h3>}
          {section.intro && <p className="jka-box-intro">{section.intro}</p>}
          {section.items && (
            <ul className="jka-box-list">
              {section.items.map((item, i) => (
                <li key={i} className="jka-box-item">{item}</li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'anansi':
      return (
        <div key={idx} className="jka-anansi">
          <div className="jka-anansi-header">
            <span className="jka-spider" aria-hidden="true">🕷</span>
            <span className="jka-anansi-label">Auntie Anansi's Market Run</span>
          </div>
          <p className="jka-anansi-body">{section.content}</p>
          <a
            href="mailto:admin@wembleywonders.org?subject=Market%20Run"
            className="jka-btn-gold"
          >
            Send your tip →
          </a>
        </div>
      );

    default:
      return null;
  }
};

/* ─── RELATED ARTICLES ───────────────────────────────────────────────── */

const RelatedCard: React.FC<{ slug: string }> = ({ slug }) => {
  const a = ARTICLES[slug];
  if (!a) return null;
  return (
    <Link to={`/joystick/${slug}`} className="jka-related-card">
      <span className={`jka-pill jka-pill--${a.categoryColor}`}>{a.category}</span>
      <p className="jka-related-hed">{a.headline}</p>
      <span className="jka-related-time">{a.readTime}</span>
    </Link>
  );
};

/* ─── PAGE ───────────────────────────────────────────────────────────── */

const JoystickArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES[slug] : undefined;

  if (!article) {
    return <Navigate to="/joystick" replace />;
  }

  return (
    <div className="jka-page">

      {/* ── BREADCRUMB ──────────────────────────────────────────── */}
      <nav className="jka-breadcrumb" aria-label="Breadcrumb">
        <Link to="/joystick" className="jka-breadcrumb-link">← Joystick</Link>
        <span className="jka-breadcrumb-sep">/</span>
        <span className="jka-breadcrumb-current">{article.category}</span>
      </nav>

      {/* ── ARTICLE HEADER ──────────────────────────────────────── */}
      <header className="jka-header">
        <div className="jka-header-meta">
          <span className={`jka-pill jka-pill--${article.categoryColor}`}>
            {article.category}
          </span>
          {article.kicker && (
            <span className="jka-kicker">{article.kicker}</span>
          )}
        </div>

        <h1 className="jka-hed">{article.headline}</h1>
        <p className="jka-dek">{article.deck}</p>

        <div className="jka-byline-bar">
          <div className="jka-byline-block">
            <span className="jka-author">{article.author}</span>
            <span className="jka-author-role">{article.authorRole}</span>
          </div>
          <div className="jka-byline-right">
            <span className="jka-date">{article.date}</span>
            <span className="jka-sep">·</span>
            <span className="jka-read-time">{article.readTime}</span>
          </div>
        </div>

        {article.sourceCredit && article.sourceUrl && (
          <div className="jka-source">
            Source:{' '}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="jka-source-link"
            >
              {article.sourceCredit}
            </a>
            {' '}— adapted for Joystick
          </div>
        )}
      </header>

      <hr className="jka-rule" />

      {/* ── ARTICLE BODY ────────────────────────────────────────── */}
      <div className="jka-layout">
        <article className="jka-body">
          {article.body.map((section, idx) => (
            <RenderSection key={idx} section={section} idx={idx} />
          ))}
        </article>

        {/* ── SIDEBAR ─────────────────────────────────────────── */}
        <aside className="jka-sidebar">

          <div className="jka-sidebar-box jka-sidebar-box--gold">
            <div className="jka-sidebar-spider" aria-hidden="true">🕷</div>
            <h3 className="jka-sidebar-hed">Got a Market Run tip?</h3>
            <p className="jka-sidebar-body">
              Know a cash-and-carry bargain, a brilliant local grocer,
              or a bulk-buy trick? Auntie Anansi wants to hear from you.
            </p>
            <a
              href="mailto:admin@wembleywonders.org?subject=Market%20Run"
              className="jka-btn-gold-outline"
            >
              Send your tip →
            </a>
          </div>

          <div className="jka-sidebar-box">
            <h3 className="jka-sidebar-hed">Write for Joystick</h3>
            <p className="jka-sidebar-body">
              You don't need to be a journalist. You need to know something
              the community needs to know.
            </p>
            <a
              href="mailto:admin@wembleywonders.org?subject=Joystick%20submission"
              className="jka-btn-outline"
            >
              Get in touch →
            </a>
          </div>

          <div className="jka-sidebar-box jka-sidebar-box--teal">
            <h3 className="jka-sidebar-hed">On the platform</h3>
            <ul className="jka-prog-links">
              <li><Link to="/raydyo" className="jka-prog-link">📻 Rayd-yo</Link></li>
              <li><Link to="/programmes/gtechcasters" className="jka-prog-link">🎙️ G-Tech Casters</Link></li>
              <li><Link to="/programmes/kaywanascourt" className="jka-prog-link">⚖️ Kaywana's Court</Link></li>
              <li><Link to="/programmes/auntieanansiskitchen" className="jka-prog-link">🕷 Auntie Anansi's Kitchen</Link></li>
            </ul>
          </div>

        </aside>
      </div>

      {/* ── RELATED ─────────────────────────────────────────────── */}
      {article.relatedSlugs && article.relatedSlugs.length > 0 && (
        <section className="jka-related">
          <h2 className="jka-related-label">Also in this issue</h2>
          <div className="jka-related-grid">
            {article.relatedSlugs.map(s => (
              <RelatedCard key={s} slug={s} />
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER STRIP ────────────────────────────────────────── */}
      <footer className="jka-footer-strip">
        <div className="jka-footer-inner">
          <Link to="/joystick" className="jka-footer-back">← Back to Joystick</Link>
          <span>Wembley Wonders CIC · Co. No. 12960817</span>
          <Link to="/editorial-standard" className="jka-footer-link">Editorial standards</Link>
        </div>
      </footer>

    </div>
  );
};

export { JoystickArticlePage };
export default JoystickArticlePage;
