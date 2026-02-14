// src/pages/ImpactPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ImpactPage.css';

const ImpactPage: React.FC = () => {
  const stats = [
    { number: '80%', label: 'Programme Completion Rate', comparison: 'vs 30% industry average' },
    { number: '500+', label: 'Young People Served Annually', comparison: 'Across all programmes' },
    { number: '85%', label: 'Graduate Employment Rate', comparison: 'Within 6 months' },
    { number: '50+', label: 'Years Serving Community', comparison: 'Since the 1970s' }
  ];

  const outcomes = [
    {
      category: 'Personal Development',
      icon: '🌱',
      results: ['Increased confidence', 'Improved communication', 'Leadership skills', 'Emotional resilience']
    },
    {
      category: 'Skills & Employment',
      icon: '💼',
      results: ['Technical skills gained', 'Portfolio development', 'Job placements', 'Career progression']
    },
    {
      category: 'Community Impact',
      icon: '🏘️',
      results: ['Reduced anti-social behavior', 'Increased civic engagement', 'Stronger community bonds', 'Local economy contribution']
    },
    {
      category: 'Educational Outcomes',
      icon: '📚',
      results: ['Improved school attendance', 'Better academic performance', 'Further education pathways', 'Lifelong learning habits']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah, 18',
      programme: 'Raydyo Graduate',
      quote: 'Raydyo didn\'t just teach me radio - it taught me I was capable. Now I\'m at university studying Media Production.',
      impact: 'Now at university'
    },
    {
      name: 'Marcus, 20',
      programme: 'Joystick Alumni',
      quote: 'I came for game dev, stayed for the community. The skills got me a job, but the confidence changed my life.',
      impact: 'Employed as Junior Developer'
    },
    {
      name: 'Parent of Aisha',
      programme: 'Connect Programme',
      quote: 'My daughter was struggling at school. Connect gave her somewhere she belonged. Her grades improved, her confidence soared.',
      impact: 'Improved school performance'
    }
  ];

  const successStories = [
    {
      title: 'From Participant to Professional',
      story: 'Jordan started in Raydyo at 15, unsure and quiet. Through Foundation Before Skills approach, he found his voice - literally. Now 21, he hosts a community radio show and mentors new participants.',
      outcome: 'Community leader & mentor'
    },
    {
      title: 'Breaking the Cycle',
      story: 'Destiny\'s family had never attended university. Pageturners ignited her love of reading. She\'s now the first in her family at university, studying English Literature.',
      outcome: 'First-generation university student'
    }
  ];

  const visualPhilosophy = [
    {
      icon: '👁️',
      title: 'No borrowed faces',
      description: 'Stock photos show strangers pretending to be your community. We\'d rather show nothing than show something false.'
    },
    {
      icon: '✨',
      title: 'The work speaks',
      description: 'Our programmes produce real output — code, beats, stories, recipes, performances. That\'s our portfolio, not posed photographs.'
    },
    {
      icon: '👥',
      title: 'Earned, not borrowed',
      description: 'As our community creates, their work becomes our visual identity. Every image you\'ll eventually see here was made by someone who came through our doors.'
    },
    {
      icon: '📝',
      title: 'Words do the work',
      description: 'If we can\'t explain what we do clearly enough in words, no amount of imagery will fix that.'
    }
  ];

  return (
    <div className="impact-page">
      <section className="hero-section">
        <h1>Our Impact</h1>
        <p>Measurable outcomes, real lives changed</p>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-comparison">{stat.comparison}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="outcomes-section">
        <h2>What Changes</h2>
        <div className="outcomes-grid">
          {outcomes.map((outcome, index) => (
            <div key={index} className="outcome-card">
              <div className="outcome-icon">{outcome.icon}</div>
              <h3>{outcome.category}</h3>
              <ul>
                {outcome.results.map((result, idx) => (
                  <li key={idx}>✓ {result}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <h2>In Their Own Words</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">"{testimonial.quote}"</div>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.programme}</span>
              </div>
              <div className="testimonial-impact">{testimonial.impact}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="stories-section">
        <h2>Success Stories</h2>
        {successStories.map((story, index) => (
          <div key={index} className="story-card">
            <h3>{story.title}</h3>
            <p>{story.story}</p>
            <div className="story-outcome">Outcome: {story.outcome}</div>
          </div>
        ))}
      </section>

      {/* Visual Philosophy Section */}
      <section className="visual-philosophy-section">
        <h2>Why We Look Different</h2>
        <p className="vp-intro">
          You may notice we don't use stock photography, AI-generated faces, 
          or slick explainer videos. This isn't a limitation — it's a choice.
        </p>
        
        <div className="vp-grid">
          {visualPhilosophy.map((item, index) => (
            <div key={index} className="vp-card">
              <span className="vp-icon">{item.icon}</span>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="vp-cta">
          <p>Want to see what we're actually about?</p>
          <Link to="/programmes/bright-sparks/sandbox" className="vp-link">
            Try a challenge yourself →
          </Link>
        </div>

        <p className="vp-tagline"><em>No stock. No AI faces. Just us.</em></p>
      </section>

      <section className="cta-section">
        <h2>Be Part of Our Impact</h2>
        <p>Join hundreds of young people transforming their lives</p>
        <Link to="/enroll" className="btn-primary">Enroll Now</Link>
      </section>
    </div>
  );
};

export default ImpactPage;