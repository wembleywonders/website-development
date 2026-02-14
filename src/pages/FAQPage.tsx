// src/pages/FAQPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css';

type CategoryId = 'general' | 'enrollment' | 'programmes' | 'safety' | 'cost';

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('general');

  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: 'general', name: 'General', icon: 'ℹ️' },
    { id: 'enrollment', name: 'Enrollment', icon: '📝' },
    { id: 'programmes', name: 'Programmes', icon: '🎓' },
    { id: 'safety', name: 'Safety', icon: '🛡️' },
    { id: 'cost', name: 'Cost & Payment', icon: '💰' }
  ];

  const faqs: Record<CategoryId, { q: string; a: string }[]> = {
    general: [
      { q: 'What is Wembley Wonders?', a: 'We\'re a 50+ year youth organization providing skills development, creative programmes, and employment pathways in North West London.' },
      { q: 'What age groups do you serve?', a: 'Programmes for ages 8-24, with some all-ages community events. Most programmes are for 12-20 year olds.' },
      { q: 'Where are you located?', a: 'Wembley Community Centre, 123 High Road, Wembley, HA9 6AA. Easily accessible by public transport.' },
      { q: 'What makes you different?', a: 'Foundation Before Skills approach - we build emotional safety, social connection, and cultural relevance BEFORE teaching technical skills. Result: 80% completion vs 30% industry average.' }
    ],
    enrollment: [
      { q: 'How do I enroll?', a: 'Visit our Enroll page, select your programme, complete the application form. We\'ll contact you within 48 hours.' },
      { q: 'Is there a waiting list?', a: 'Some popular programmes have waiting lists. Apply early. We prioritize based on need and first-come-first-served.' },
      { q: 'What documents do I need?', a: 'Basic info: name, contact, emergency contact, medical info, consent forms. We guide you through it.' },
      { q: 'Can I try before committing?', a: 'Yes! Most programmes offer a free taster session. Contact us to arrange.' },
      { q: 'What if I miss the deadline?', a: 'Contact us anyway - we often have rolling enrollment or can add you to next cohort waiting list.' }
    ],
    programmes: [
      { q: 'How long are programmes?', a: 'Typically 10-12 weeks per term, 3 terms/year. Some intensive workshops are shorter.' },
      { q: 'What\'s the time commitment?', a: 'Most programmes: 2-3 hours/week. Flexible scheduling available.' },
      { q: 'Do I need prior experience?', a: 'No! All programmes welcome beginners. We meet you where you are.' },
      { q: 'Can I join multiple programmes?', a: 'Yes, if schedules don\'t conflict. We can help you plan.' },
      { q: 'What happens after I finish?', a: 'Progression pathways: advanced programmes, mentorship roles, employment support, ongoing community access.' }
    ],
    safety: [
      { q: 'Are programmes safeguarded?', a: 'Yes. All staff DBS checked, safeguarding trained. Full safeguarding policy available.' },
      { q: 'What about COVID safety?', a: 'We follow current government guidance. Ventilation, hygiene, small groups.' },
      { q: 'Who supervises participants?', a: 'Experienced youth workers, min 1:10 ratio. Background-checked volunteers provide additional support.' },
      { q: 'What if there\'s an emergency?', a: 'All staff first aid trained. Emergency contacts called immediately. Full incident procedures in place.' },
      { q: 'How do you handle bullying?', a: 'Zero tolerance. Clear policies, immediate intervention, restorative practices. Safe space culture enforced.' }
    ],
    cost: [
      { q: 'How much do programmes cost?', a: 'Range: £100-250/term depending on programme. Financial assistance available for 20% of participants.' },
      { q: 'Do you offer financial aid?', a: 'Yes! Sliding scale fees, payment plans, full/partial subsidies based on need. No one turned away for finances.' },
      { q: 'What\'s included in the fee?', a: 'All materials, equipment use, instruction, showcase/performance opportunities, refreshments.' },
      { q: 'Can I pay in installments?', a: 'Yes. Weekly, monthly, or termly payment plans available. Discuss with us.' },
      { q: 'Are there any hidden costs?', a: 'No. Fee covers everything. Optional extras (trips, advanced equipment) clearly communicated in advance.' }
    ]
  };

  return (
    <div className="faq-page">
      <section className="hero-section">
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about joining Wembley Wonders</p>
      </section>

      <section className="faq-content">
        <div className="category-nav">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {faqs[activeCategory].map((faq, index) => (
            <details key={index} className="faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="still-questions">
        <h2>Still Have Questions?</h2>
        <p>We're here to help. Get in touch and we'll respond within 24 hours.</p>
        <Link to="/contact" className="btn-primary">Contact Us</Link>
      </section>
    </div>
  );
};

export default FAQPage;