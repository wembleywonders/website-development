/**
 * MENTAL HEALTH RESOURCES
 * 
 * Partnership page connecting our community to mental health support.
 * The Forgotten 60% face unique mental health challenges:
 * - Financial stress
 * - Isolation
 * - Impostor syndrome
 * - Burnout
 * - Intergenerational trauma
 * 
 * We don't provide clinical services - we connect people to those who do.
 * 
 * @copyright 2024-2026 Wembley Wonders CIC
 * Company No. 12960817
 */

import React, { useState } from 'react';

// ============================================================
// TYPES
// ============================================================

interface Resource {
  id: string;
  name: string;
  description: string;
  type: 'crisis' | 'ongoing' | 'community' | 'workplace' | 'youth';
  contact?: string;
  website?: string;
  hours?: string;
  free: boolean;
  culturallyAware?: boolean;
  languages?: string[];
}

interface SupportCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  resources: Resource[];
}

// ============================================================
// RESOURCES DATA
// ============================================================

const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: 'crisis',
    title: 'Crisis Support',
    icon: '🆘',
    description: 'Immediate help when you need it most',
    resources: [
      {
        id: 'samaritans',
        name: 'Samaritans',
        description: '24/7 listening support for anyone struggling to cope',
        type: 'crisis',
        contact: '116 123',
        website: 'https://www.samaritans.org',
        hours: '24 hours, 7 days',
        free: true
      },
      {
        id: 'crisis-text',
        name: 'Crisis Text Line',
        description: 'Text support for when you can\'t talk',
        type: 'crisis',
        contact: 'Text SHOUT to 85258',
        website: 'https://giveusashout.org',
        hours: '24 hours, 7 days',
        free: true
      },
      {
        id: 'calm',
        name: 'CALM (Campaign Against Living Miserably)',
        description: 'Support for men struggling with life',
        type: 'crisis',
        contact: '0800 58 58 58',
        website: 'https://www.thecalmzone.net',
        hours: '5pm-midnight, 7 days',
        free: true
      },
      {
        id: 'papyrus',
        name: 'PAPYRUS',
        description: 'Prevention of young suicide (under 35s)',
        type: 'crisis',
        contact: '0800 068 4141',
        website: 'https://www.papyrus-uk.org',
        hours: '9am-midnight, 7 days',
        free: true
      }
    ]
  },
  {
    id: 'ongoing',
    title: 'Ongoing Support',
    icon: '💚',
    description: 'Counselling and therapy services',
    resources: [
      {
        id: 'mind',
        name: 'Mind',
        description: 'Mental health charity with local services across UK',
        type: 'ongoing',
        contact: '0300 123 3393',
        website: 'https://www.mind.org.uk',
        hours: 'Mon-Fri 9am-6pm',
        free: true
      },
      {
        id: 'baatn',
        name: 'Black, African & Asian Therapy Network',
        description: 'Connecting Black and Asian people with culturally-informed therapists',
        type: 'ongoing',
        website: 'https://www.baatn.org.uk',
        free: false,
        culturallyAware: true
      },
      {
        id: 'nhs-talking',
        name: 'NHS Talking Therapies',
        description: 'Free NHS talking therapy - self-refer in most areas',
        type: 'ongoing',
        website: 'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/nhs-talking-therapies/',
        free: true
      },
      {
        id: 'bacp',
        name: 'BACP Therapist Directory',
        description: 'Find accredited counsellors and psychotherapists',
        type: 'ongoing',
        website: 'https://www.bacp.co.uk/search/Therapists',
        free: false
      }
    ]
  },
  {
    id: 'community',
    title: 'Community & Cultural',
    icon: '🤝',
    description: 'Support that understands your background',
    resources: [
      {
        id: 'brent-mind',
        name: 'Brent Mind',
        description: 'Local mental health support in Brent/Wembley area',
        type: 'community',
        contact: '020 8438 0308',
        website: 'https://www.brentmind.org.uk',
        free: true
      },
      {
        id: 'black-thrive',
        name: 'Black Thrive',
        description: 'Addressing mental health inequalities in Black communities',
        type: 'community',
        website: 'https://www.blackthrive.org',
        free: true,
        culturallyAware: true
      },
      {
        id: 'muslim-youth',
        name: 'Muslim Youth Helpline',
        description: 'Faith and culturally sensitive support',
        type: 'community',
        contact: '0808 808 2008',
        website: 'https://myh.org.uk',
        free: true,
        culturallyAware: true,
        languages: ['English', 'Urdu', 'Arabic', 'Somali']
      },
      {
        id: 'sikh-helpline',
        name: 'Sikh Helpline',
        description: 'Confidential support for the Sikh community',
        type: 'community',
        contact: '0845 644 0704',
        website: 'https://www.sikhhelpline.com',
        free: true,
        culturallyAware: true,
        languages: ['English', 'Punjabi']
      }
    ]
  },
  {
    id: 'creators',
    title: 'For Creators & Freelancers',
    icon: '🎨',
    description: 'Understanding the unique pressures of creative work',
    resources: [
      {
        id: 'arts-minds',
        name: 'Arts Minds',
        description: 'Mental health support specifically for creative industries',
        type: 'workplace',
        website: 'https://www.artsmindscic.org.uk',
        free: true
      },
      {
        id: 'help-musicians',
        name: 'Help Musicians',
        description: 'Support for musicians including mental health services',
        type: 'workplace',
        contact: '0808 802 8008',
        website: 'https://www.helpmusicians.org.uk',
        free: true
      },
      {
        id: 'film-tv-charity',
        name: 'Film & TV Charity',
        description: 'Support for people working in film, TV, and cinema',
        type: 'workplace',
        contact: '0800 054 0000',
        website: 'https://filmtvcharity.org.uk',
        free: true
      },
      {
        id: 'freelance-matters',
        name: 'Freelance Matters',
        description: 'Resources for freelancer mental health and wellbeing',
        type: 'workplace',
        website: 'https://freelancematters.co.uk',
        free: true
      }
    ]
  },
  {
    id: 'youth',
    title: 'Young People',
    icon: '🌱',
    description: 'Support for under 25s',
    resources: [
      {
        id: 'childline',
        name: 'Childline',
        description: 'Support for under 19s - any issue, any time',
        type: 'youth',
        contact: '0800 1111',
        website: 'https://www.childline.org.uk',
        hours: '24 hours, 7 days',
        free: true
      },
      {
        id: 'young-minds',
        name: 'Young Minds',
        description: 'UK charity fighting for young people\'s mental health',
        type: 'youth',
        contact: 'Text YM to 85258',
        website: 'https://www.youngminds.org.uk',
        free: true
      },
      {
        id: 'kooth',
        name: 'Kooth',
        description: 'Free online counselling for 11-25 year olds',
        type: 'youth',
        website: 'https://www.kooth.com',
        free: true
      },
      {
        id: 'the-mix',
        name: 'The Mix',
        description: 'Support for under 25s on any challenge',
        type: 'youth',
        contact: '0808 808 4994',
        website: 'https://www.themix.org.uk',
        free: true
      }
    ]
  }
];

// ============================================================
// COMPONENT
// ============================================================

export const MentalHealthResources: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('crisis');
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  
  const currentCategory = SUPPORT_CATEGORIES.find(c => c.id === activeCategory);
  
  return (
    <div className="mental-health-resources">
      {/* Crisis Modal */}
      {showCrisisModal && (
        <div className="crisis-modal" onClick={() => setShowCrisisModal(false)}>
          <div className="crisis-modal__content" onClick={e => e.stopPropagation()}>
            <h2>🆘 Need Immediate Help?</h2>
            <p>If you or someone else is in immediate danger, call 999.</p>
            
            <div className="crisis-modal__options">
              <a href="tel:116123" className="crisis-option">
                <span className="icon">📞</span>
                <span className="name">Samaritans</span>
                <span className="number">116 123</span>
                <span className="detail">Free, 24/7</span>
              </a>
              
              <a href="sms:85258?body=SHOUT" className="crisis-option">
                <span className="icon">💬</span>
                <span className="name">Crisis Text Line</span>
                <span className="number">Text SHOUT to 85258</span>
                <span className="detail">Free, 24/7</span>
              </a>
              
              <a href="tel:0800585858" className="crisis-option">
                <span className="icon">👤</span>
                <span className="name">CALM (for men)</span>
                <span className="number">0800 58 58 58</span>
                <span className="detail">5pm-midnight</span>
              </a>
            </div>
            
            <button 
              className="crisis-modal__close"
              onClick={() => setShowCrisisModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="mental-health-resources__header">
        <h1>Mental Health Resources</h1>
        <p>
          Your mental health matters. Whether you're struggling right now or 
          looking for ongoing support, you're not alone.
        </p>
        
        <button 
          className="crisis-button"
          onClick={() => setShowCrisisModal(true)}
        >
          🆘 Need Help Now?
        </button>
      </header>
      
      {/* Our Approach */}
      <section className="mental-health-resources__approach">
        <h2>Our Approach</h2>
        <div className="approach-cards">
          <div className="approach-card">
            <span className="icon">🤝</span>
            <h3>We Connect</h3>
            <p>
              We're not mental health professionals. We connect you with 
              trusted organisations who can provide proper support.
            </p>
          </div>
          <div className="approach-card">
            <span className="icon">💚</span>
            <h3>We Understand</h3>
            <p>
              Creative work, freelancing, and community life come with unique 
              pressures. We get it because we live it.
            </p>
          </div>
          <div className="approach-card">
            <span className="icon">🌍</span>
            <h3>We Include</h3>
            <p>
              Our community is diverse. We've gathered resources that understand 
              different cultural backgrounds and needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Category Navigation */}
      <nav className="mental-health-resources__nav">
        {SUPPORT_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="icon">{category.icon}</span>
            <span className="title">{category.title}</span>
          </button>
        ))}
      </nav>
      
      {/* Resources Grid */}
      {currentCategory && (
        <section className="mental-health-resources__content">
          <div className="category-header">
            <span className="icon">{currentCategory.icon}</span>
            <div>
              <h2>{currentCategory.title}</h2>
              <p>{currentCategory.description}</p>
            </div>
          </div>
          
          <div className="resources-grid">
            {currentCategory.resources.map(resource => (
              <div key={resource.id} className="resource-card">
                <div className="resource-card__header">
                  <h3>{resource.name}</h3>
                  {resource.free && <span className="badge badge--free">Free</span>}
                  {resource.culturallyAware && (
                    <span className="badge badge--cultural">Culturally Aware</span>
                  )}
                </div>
                
                <p className="resource-card__description">{resource.description}</p>
                
                {resource.contact && (
                  <div className="resource-card__contact">
                    <strong>Contact:</strong> {resource.contact}
                  </div>
                )}
                
                {resource.hours && (
                  <div className="resource-card__hours">
                    <strong>Hours:</strong> {resource.hours}
                  </div>
                )}
                
                {resource.languages && (
                  <div className="resource-card__languages">
                    <strong>Languages:</strong> {resource.languages.join(', ')}
                  </div>
                )}
                
                {resource.website && (
                  <a 
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card__link"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Common Challenges */}
      <section className="mental-health-resources__challenges">
        <h2>Common Challenges We Face</h2>
        <p>
          Many in our community experience these. You're not alone, and 
          support is available.
        </p>
        
        <div className="challenges-grid">
          <div className="challenge-card">
            <h3>💸 Financial Stress</h3>
            <p>
              Irregular income, late payments, and making ends meet create 
              constant pressure. This is real and valid.
            </p>
          </div>
          
          <div className="challenge-card">
            <h3>🎭 Impostor Syndrome</h3>
            <p>
              Feeling like you don't belong or aren't "good enough" is 
              incredibly common among creators.
            </p>
          </div>
          
          <div className="challenge-card">
            <h3>🏃 Burnout</h3>
            <p>
              The hustle culture can push us past our limits. Rest isn't 
              laziness - it's essential.
            </p>
          </div>
          
          <div className="challenge-card">
            <h3>🏠 Isolation</h3>
            <p>
              Working alone, from home, without colleagues can be lonely. 
              Community matters.
            </p>
          </div>
          
          <div className="challenge-card">
            <h3>🌱 Identity & Belonging</h3>
            <p>
              Navigating multiple cultures, expectations, and identities 
              is complex emotional work.
            </p>
          </div>
          
          <div className="challenge-card">
            <h3>📵 Digital Overwhelm</h3>
            <p>
              Constant connectivity, social media comparison, and online 
              pressure affect mental health.
            </p>
          </div>
        </div>
      </section>
      
      {/* WW Support */}
      <section className="mental-health-resources__ww-support">
        <h2>How We Support Each Other</h2>
        
        <div className="ww-support-grid">
          <div className="ww-support-card">
            <span className="icon">☕</span>
            <h3>Community Check-ins</h3>
            <p>
              Regular sessions where we simply check in with each other. 
              No agenda, just connection.
            </p>
          </div>
          
          <div className="ww-support-card">
            <span className="icon">🧘</span>
            <h3>Wellness in Workshops</h3>
            <p>
              We build breaks, reflection, and wellbeing into all our 
              programmes. No grind culture here.
            </p>
          </div>
          
          <div className="ww-support-card">
            <span className="icon">🗣️</span>
            <h3>Open Conversations</h3>
            <p>
              We talk openly about mental health. No stigma, no shame, 
              just honest support.
            </p>
          </div>
          
          <div className="ww-support-card">
            <span className="icon">🌟</span>
            <h3>Maya's Guidance</h3>
            <p>
              Our AI companion Maya is trained to recognise when you might 
              need support and can signpost resources.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mental-health-resources__footer">
        <div className="footer-message">
          <p>
            <strong>Remember:</strong> Seeking help is a sign of strength, not weakness.
            Your mental health is just as important as your physical health.
          </p>
        </div>
        
        <div className="footer-crisis">
          <p>In a crisis? Call Samaritans free on <strong>116 123</strong></p>
        </div>
        
        <div className="footer-info">
          <p>
            Wembley Wonders CIC is not a mental health provider. We connect our 
            community with trusted external resources.
          </p>
          <p>Company No. 12960817</p>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthResources;