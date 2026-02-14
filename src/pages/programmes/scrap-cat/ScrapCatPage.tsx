import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import { Wrench, Recycle, Heart, Users, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import '../ProgrammePage.css';

/**
 * Scrap Cat Programme
 * ===================
 * 
 * Practice repair skills on donated/redundant equipment.
 * Low stakes learning - if you break it, no loss.
 * Feeds into STEMgeneers for paid work.
 * 
 * Philosophy: "Not much difference between a torch and a spotlight"
 */

const ScrapCatPage: React.FC = () => {
  const skills = [
    { title: "Device Diagnostics", description: "Learn to identify faults before ordering parts", icon: "🔍" },
    { title: "Basic Soldering", description: "Component replacement and wire repair", icon: "🔧" },
    { title: "Phone & Tablet Repair", description: "Screens, batteries, ports on donated devices", icon: "📱" },
    { title: "Laptop Revival", description: "Bring old laptops back to life", icon: "💻" },
    { title: "E-Bike Basics", description: "Battery testing, motor diagnostics, controller checks", icon: "🚲" },
    { title: "Upcycling Projects", description: "Turn e-waste into useful items", icon: "♻️" }
  ];

  const benefits = [
    "Practice on real equipment with no financial risk",
    "Build confidence before working on customer devices",
    "Learn from mistakes in a supportive environment",
    "Access to donated tools and equipment",
    "Clear pathway to paid repair work via STEMgeneers"
  ];

  const donationTypes = [
    { item: "Old laptops & PCs", condition: "Any condition - working or not" },
    { item: "Phones & tablets", condition: "Cracked screens welcome" },
    { item: "E-bikes & scooters", condition: "Non-working preferred for practice" },
    { item: "Power tools", condition: "For repair practice" },
    { item: "Small appliances", condition: "Kettles, toasters, etc." },
    { item: "Gaming consoles", condition: "Any generation, any condition" }
  ];

  return (
    <PageTemplate
      pageTitle="Scrap Cat"
      pageStrapline="Practice repair skills on donated equipment — low stakes, high learning"
      pageType="programme"
    >
      <div className="programme-content">
        
        {/* Hero Section */}
        <section className="programme-hero">
          <div className="hero-badge">🔧</div>
          <h1>Scrap Cat</h1>
          <p className="hero-tagline">
            Break it. Fix it. Learn it.
          </p>
        </section>

        {/* What It Is */}
        <section className="programme-section">
          <h2>What is Scrap Cat?</h2>
          <p className="section-intro">
            Scrap Cat is where you <strong>learn to repair without the pressure</strong>. 
            We collect donated laptops, phones, e-bikes, and other tech. You practice 
            diagnosing and fixing them. If something goes wrong, no worries — it was 
            already broken or donated.
          </p>
          <p>
            Once you're confident, you graduate to <Link to="/pathways/stemgeneers">STEMgeneers</Link> where 
            you work on paying customers' devices.
          </p>
        </section>

        {/* Philosophy */}
        <section className="programme-section mission-section">
          <div className="mission-card">
            <Lightbulb size={48} />
            <h2>"Not much difference between a torch and a spotlight"</h2>
            <p>
              The wiring in a torch is the same principle as stage lighting. The battery 
              in a phone is the same chemistry as an e-bike. Master the basics on simple 
              things, then scale up to complex systems.
            </p>
          </div>
        </section>

        {/* Skills You'll Learn */}
        <section className="programme-section">
          <h2>Skills You'll Learn</h2>
          <div className="modules-grid">
            {skills.map((skill, index) => (
              <div key={index} className="module-card">
                <div className="module-icon">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="programme-section outcomes-section">
          <h2>Why Scrap Cat Works</h2>
          <div className="outcomes-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={24} />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Pathway */}
        <section className="programme-section">
          <h2>Your Learning Path</h2>
          <div className="learning-path">
            <div className="path-step">
              <div className="step-number">1</div>
              <h3>Bright Sparks</h3>
              <p>Ages 11-14: Discover how things work, basic tools, safety</p>
              <span className="path-duration">Curiosity stage</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step active">
              <div className="step-number">2</div>
              <h3>Scrap Cat</h3>
              <p>Practice repairs on donated kit, build confidence</p>
              <span className="path-duration">You are here</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">3</div>
              <h3>STEMgeneers</h3>
              <p>Paid repair work, real customers, income generation</p>
              <span className="path-duration">Earning stage</span>
            </div>
          </div>
        </section>

        {/* Donations Needed */}
        <section className="programme-section">
          <h2>
            <Recycle size={28} style={{ marginRight: '0.5rem' }} />
            Donate Your Old Tech
          </h2>
          <p className="section-intro">
            Got old devices gathering dust? Donate them to Scrap Cat. Your e-waste 
            becomes someone's learning opportunity.
          </p>
          <div className="donation-grid">
            {donationTypes.map((donation, index) => (
              <div key={index} className="donation-card">
                <h3>{donation.item}</h3>
                <p>{donation.condition}</p>
              </div>
            ))}
          </div>
          <div className="donation-cta">
            <p>
              <strong>Drop-off:</strong> Wembley Centre for Health and Care, 
              or arrange collection for larger items.
            </p>
            <Link to="/contact" className="cta-button secondary">
              Arrange a Donation
            </Link>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className="programme-section">
          <div className="impact-card">
            <Heart size={32} />
            <h3>Environmental Impact</h3>
            <p>
              Every device we repair is one less in landfill. Every skill learned is 
              another person who can extend the life of technology rather than replacing it. 
              Repair is radical.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta">
          <h2>Ready to Get Your Hands Dirty?</h2>
          <p>Join Scrap Cat and learn repair skills that last a lifetime</p>
          <div className="cta-buttons">
            <Link to="/sessions" className="cta-button primary">
              Find a Session
            </Link>
            <Link to="/workshops/spark-generator" className="cta-button secondary">
              Try Diagnostic Tools
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default ScrapCatPage;