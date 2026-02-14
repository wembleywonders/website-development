import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import './CommunityOverviewPage.css';

const CommunityOverviewPage: React.FC = () => {
  const demographics = [
    { label: 'Total Population', value: '125,000+', icon: '👥' },
    { label: 'Households', value: '48,000+', icon: '🏠' },
    { label: 'Languages Spoken', value: '50+', icon: '🗣️' },
    { label: 'Local Businesses', value: '2,800+', icon: '🏪' }
  ];

  const keyAreas = [
    {
      name: 'Wembley Central',
      description: 'Commercial heart with excellent transport links',
      highlights: ['Wembley Stadium', 'Shopping centers', 'Business district']
    },
    {
      name: 'Alperton',
      description: 'Residential area with strong community spirit',
      highlights: ['Family homes', 'Local parks', 'Community centers']
    },
    {
      name: 'Preston',
      description: 'Diverse neighborhood with rich cultural heritage',
      highlights: ['Cultural venues', 'Restaurants', 'Places of worship']
    },
    {
      name: 'Tokyngton',
      description: 'Growing residential area with new developments',
      highlights: ['New housing', 'Green spaces', 'Local amenities']
    }
  ];

  const challenges = [
    {
      title: 'Housing Affordability',
      description: 'Rising costs putting pressure on local families',
      impact: 'High',
      initiatives: ['Social housing advocacy', 'First-time buyer support']
    },
    {
      title: 'Youth Engagement',
      description: 'Need for more youth programs and opportunities',
      impact: 'Medium',
      initiatives: ['Youth centers', 'Skills training', 'Mentorship programs']
    },
    {
      title: 'Digital Divide',
      description: 'Ensuring equal access to digital services and skills',
      impact: 'Medium',
      initiatives: ['Digital literacy training', 'Free Wi-Fi zones', 'Device lending']
    },
    {
      title: 'Local Business Support',
      description: 'Supporting independent businesses and entrepreneurs',
      impact: 'Medium',
      initiatives: ['Business networking', 'Startup support', 'Local marketplace']
    }
  ];

  const opportunities = [
    {
      title: 'Stadium District Development',
      description: 'Leveraging Wembley Stadium for community benefit',
      potential: 'High'
    },
    {
      title: 'Transport Connectivity',
      description: 'Excellent transport links creating economic opportunities',
      potential: 'High'
    },
    {
      title: 'Cultural Diversity',
      description: 'Rich multicultural community as a strength',
      potential: 'High'
    },
    {
      title: 'Green Spaces',
      description: 'Expanding and improving local parks and recreation',
      potential: 'Medium'
    }
  ];

  const communityAssets = [
    {
      category: 'Cultural & Entertainment',
      icon: '🏛️',
      items: [
        'Wembley Stadium',
        'SSE Arena',
        'Troubadour Wembley Park Theatre',
        'Local art galleries',
        'Community cultural centers'
      ]
    },
    {
      category: 'Education & Learning',
      icon: '🎓',
      items: [
        'University of Westminster',
        'Wembley High Technology College',
        'Primary and secondary schools',
        'Adult education centers',
        'Community libraries'
      ]
    },
    {
      category: 'Transport & Connectivity',
      icon: '🚇',
      items: [
        'Wembley Park Station (Metropolitan/Jubilee)',
        'Wembley Central Station (Bakerloo/London Overground)',
        'Multiple bus routes',
        'Close to M25 and A40',
        'Cycling infrastructure'
      ]
    },
    {
      category: 'Parks & Recreation',
      icon: '🌳',
      items: [
        'King Edward VII Park',
        'Barham Park',
        'Wembley Recreation Ground',
        'Local sports facilities',
        'Walking and cycling paths'
      ]
    },
    {
      category: 'Health & Wellbeing',
      icon: '🏥',
      items: [
        'NHS services and clinics',
        'Mental health support centers',
        'Fitness and wellness facilities',
        'Community health programs',
        'Pharmacy services'
      ]
    },
    {
      category: 'Community Organizations',
      icon: '🤝',
      items: [
        'Resident associations',
        'Faith communities',
        'Volunteer groups',
        'Youth organizations',
        'Business networks'
      ]
    }
  ];

  const insights = [
    {
      title: 'Economic Profile',
      icon: '📊',
      stats: [
        { label: 'Average household income', value: '£42,000' },
        { label: 'Employment rate', value: '73%' },
        { label: 'Self-employed residents', value: '15%' }
      ]
    },
    {
      title: 'Housing Profile',
      icon: '🏠',
      stats: [
        { label: 'Owner-occupied homes', value: '52%' },
        { label: 'Private rentals', value: '35%' },
        { label: 'Social housing', value: '13%' }
      ]
    },
    {
      title: 'Age Demographics',
      icon: '👥',
      stats: [
        { label: 'Under 18', value: '22%' },
        { label: 'Working age (18-65)', value: '65%' },
        { label: 'Over 65', value: '13%' }
      ]
    },
    {
      title: 'Cultural Diversity',
      icon: '🌍',
      stats: [
        { label: 'Born outside UK', value: '45%' },
        { label: 'Ethnic minorities', value: '38%' },
        { label: 'Languages spoken', value: '50+' }
      ]
    }
  ];

  const visionGoals = [
    {
      title: 'Affordable Housing',
      icon: '🏠',
      description: 'Ensuring housing remains accessible to families and young people'
    },
    {
      title: 'Economic Opportunity',
      icon: '💼',
      description: 'Creating pathways for local employment and entrepreneurship'
    },
    {
      title: 'Education & Skills',
      icon: '🎓',
      description: 'Providing lifelong learning opportunities for all residents'
    },
    {
      title: 'Sustainability',
      icon: '🌱',
      description: 'Building an environmentally sustainable and resilient community'
    },
    {
      title: 'Social Cohesion',
      icon: '🤝',
      description: 'Strengthening connections across our diverse community'
    },
    {
      title: 'Democratic Participation',
      icon: '🏛️',
      description: 'Empowering residents to shape their community\'s future'
    }
  ];

  const involvementOptions = [
    {
      title: 'Community Governance',
      icon: '🗳️',
      description: 'Participate in democratic decision-making about community priorities and resource allocation.',
      link: '/governance',
      buttonText: 'Learn About Governance',
      buttonClass: 'btn-primary'
    },
    {
      title: 'Community Surveys',
      icon: '📋',
      description: 'Share your views through regular community surveys and consultations.',
      link: '/surveys',
      buttonText: 'Take Survey',
      buttonClass: 'btn-secondary'
    },
    {
      title: 'Volunteer Opportunities',
      icon: '🤝',
      description: 'Join community projects and initiatives that match your interests and skills.',
      link: '/volunteer',
      buttonText: 'Find Opportunities',
      buttonClass: 'btn-secondary'
    },
    {
      title: 'Propose Ideas',
      icon: '💡',
      description: 'Submit your ideas for improving our community through our democratic process.',
      link: '/propose',
      buttonText: 'Submit Ideas',
      buttonClass: 'btn-secondary'
    }
  ];

  const resources = [
    {
      title: 'Community Data Dashboard',
      icon: '📊',
      description: 'Access detailed statistics and trends about our community',
      link: '/data'
    },
    {
      title: 'Community Newsletter',
      icon: '📰',
      description: 'Stay updated with the latest community news and events',
      link: '/newsletter'
    },
    {
      title: 'Community Map',
      icon: '🗺️',
      description: 'Interactive map of community assets, services, and projects',
      link: '/map'
    },
    {
      title: 'Community Directory',
      icon: '📞',
      description: 'Contact information for local services and organizations',
      link: '/directory'
    }
  ];

  return (
    <div className="community-overview-page">
      
      <div className="overview-container">
        {/* Hero Section */}
        <section className="overview-hero">
          <div className="hero-content">
            <h1>Wembley Community Overview</h1>
            <p className="hero-subtitle">
              Understanding our diverse, vibrant community and the opportunities ahead
            </p>
            <div className="hero-image">
              <div className="image-placeholder">
                🏟️ Wembley Stadium & Community
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="demographics-section">
          <h2>Community at a Glance</h2>
          <div className="demographics-grid">
            {demographics.map((stat, index) => (
              <div key={index} className="demographic-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Areas */}
        <section className="areas-section">
          <h2>Key Areas in Wembley</h2>
          <div className="areas-grid">
            {keyAreas.map((area, index) => (
              <div key={index} className="area-card">
                <h3>{area.name}</h3>
                <p>{area.description}</p>
                <div className="area-highlights">
                  {area.highlights.map((highlight, hIndex) => (
                    <span key={hIndex} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Challenges */}
        <section className="challenges-section">
          <h2>Current Challenges</h2>
          <p className="section-description">
            Understanding our challenges helps us focus our efforts where they're needed most.
          </p>
          <div className="challenges-grid">
            {challenges.map((challenge, index) => (
              <div key={index} className="challenge-card">
                <div className="challenge-header">
                  <h3>{challenge.title}</h3>
                  <span className={`impact-badge ${challenge.impact.toLowerCase()}`}>
                    {challenge.impact} Impact
                  </span>
                </div>
                <p>{challenge.description}</p>
                <div className="initiatives">
                  <h4>Current Initiatives:</h4>
                  <ul>
                    {challenge.initiatives.map((initiative, iIndex) => (
                      <li key={iIndex}>{initiative}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunities */}
        <section className="opportunities-section">
          <h2>Growth Opportunities</h2>
          <p className="section-description">
            Wembley has tremendous potential for positive community development.
          </p>
          <div className="opportunities-grid">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="opportunity-card">
                <h3>{opportunity.title}</h3>
                <p>{opportunity.description}</p>
                <div className="potential-indicator">
                  <span className={`potential-badge ${opportunity.potential.toLowerCase()}`}>
                    {opportunity.potential} Potential
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Assets */}
        <section className="assets-section">
          <h2>Community Assets & Resources</h2>
          <div className="assets-grid">
            {communityAssets.map((asset, index) => (
              <div key={index} className="asset-category">
                <h3>
                  <span className="category-icon">{asset.icon}</span>
                  {asset.category}
                </h3>
                <ul>
                  {asset.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Data & Insights */}
        <section className="insights-section">
          <h2>Community Insights</h2>
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <div key={index} className="insight-card">
                <h3>
                  <span className="insight-icon">{insight.icon}</span>
                  {insight.title}
                </h3>
                <div className="insight-stats">
                  {insight.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="stat">
                      <span className="stat-number">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Vision */}
        <section className="vision-section">
          <h2>Our Vision for Wembley</h2>
          <div className="vision-content">
            <div className="vision-text">
              <p>
                We envision Wembley as a thriving, inclusive community where every resident has the opportunity to contribute, grow, and prosper. Our community-led approach focuses on:
              </p>
              <div className="vision-goals">
                {visionGoals.map((goal, index) => (
                  <div key={index} className="goal">
                    <h4>
                      <span className="goal-icon">{goal.icon}</span>
                      {goal.title}
                    </h4>
                    <p>{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="involvement-section">
          <h2>Get Involved in Shaping Our Community</h2>
          <p className="involvement-description">
            Your voice and participation are essential to building the Wembley we all want to live in.
          </p>
          <div className="involvement-options">
            {involvementOptions.map((option, index) => (
              <div key={index} className="involvement-card">
                <h3>
                  <span className="involvement-icon">{option.icon}</span>
                  {option.title}
                </h3>
                <p>{option.description}</p>
                <Link to={option.link} className={`btn ${option.buttonClass}`}>
                  {option.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Resources */}
        <section className="resources-section">
          <h2>Additional Resources</h2>
          <div className="resources-grid">
            {resources.map((resource, index) => (
              <div key={index} className="resource-link">
                <h4>
                  <span className="resource-icon">{resource.icon}</span>
                  {resource.title}
                </h4>
                <p>{resource.description}</p>
                <Link to={resource.link} className="resource-btn">
                  {resource.title.includes('Dashboard') ? 'View Dashboard' :
                   resource.title.includes('Newsletter') ? 'Subscribe' :
                   resource.title.includes('Map') ? 'Explore Map' : 'Browse Directory'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Join our community of active residents working together to build a better Wembley for everyone.
            </p>
            <div className="cta-buttons">
              <Link to="/apply" className="btn btn-primary btn-large">
                Become a Connector
              </Link>
              <Link to="/get-started" className="btn btn-secondary btn-large">
                Take Assessment
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityOverviewPage;