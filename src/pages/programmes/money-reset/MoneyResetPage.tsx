import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../../../components/PageTemplate';
import { PiggyBank, TrendingUp, Users, Shield, CheckCircle, ArrowRight, Heart } from 'lucide-react';
import '../ProgrammePage.css';

/**
 * Money Reset Programme
 * =====================
 * 
 * Financial foundations for young creators.
 * From surviving to thriving.
 * Integrates pardner/susu/box hand traditions.
 */

const MoneyResetPage: React.FC = () => {
  const modules = [
    { 
      title: "Money Mindset Reset", 
      description: "Unlearn scarcity thinking, understand your relationship with money", 
      icon: "🧠" 
    },
    { 
      title: "Budgeting That Works", 
      description: "Simple systems for irregular creative income", 
      icon: "📊" 
    },
    { 
      title: "Debt Navigation", 
      description: "Strategies for managing and reducing debt without shame", 
      icon: "🗺️" 
    },
    { 
      title: "Savings Foundations", 
      description: "Emergency funds, goal-based saving, automated systems", 
      icon: "🏦" 
    },
    { 
      title: "Pardner Economics", 
      description: "Traditional Caribbean savings circles for modern creators", 
      icon: "🤝" 
    },
    { 
      title: "Multiple Income Streams", 
      description: "Diversifying income as a creative — services, products, royalties", 
      icon: "💰" 
    }
  ];

  const pardnerBenefits = [
    "Access to lump sums without predatory loans",
    "Built-in accountability and community support",
    "Cultural continuity — your grandparents' wisdom updated",
    "Interest-free borrowing from your community",
    "Forced savings through social commitment"
  ];

  const outcomes = [
    "Clear understanding of your financial position",
    "Working budget that fits creative income patterns",
    "Emergency fund started (even if small)",
    "Debt reduction plan in action",
    "Connected to a savings community",
    "Multiple income streams identified"
  ];

  return (
    <PageTemplate
      pageTitle="Money Reset"
      pageStrapline="Financial foundations for creators — from surviving to thriving"
      pageType="programme"
    >
      <div className="programme-content">
        
        {/* Hero Section */}
        <section className="programme-hero">
          <div className="hero-badge">💰</div>
          <h1>Money Reset</h1>
          <p className="hero-tagline">
            Your creativity deserves financial stability.
          </p>
        </section>

        {/* What It Is */}
        <section className="programme-section">
          <h2>What is Money Reset?</h2>
          <p className="section-intro">
            You can't create freely when you're worried about rent. Money Reset gives 
            you the <strong>financial foundations</strong> that schools never taught — 
            practical money skills designed for people with irregular creative income.
          </p>
          <p>
            This isn't about getting rich quick. It's about building the stability 
            that lets you take creative risks.
          </p>
        </section>

        {/* The Problem */}
        <section className="programme-section mission-section">
          <div className="mission-card">
            <Shield size={48} />
            <h2>Why Creatives Need This</h2>
            <p>
              Traditional financial advice assumes a steady salary. But creatives have 
              feast-or-famine income, project-based work, and often no pension. 
              Money Reset teaches you to thrive with irregular income.
            </p>
          </div>
        </section>

        {/* Modules */}
        <section className="programme-section">
          <h2>What You'll Learn</h2>
          <div className="modules-grid">
            {modules.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-icon">{module.icon}</div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pardner Section */}
        <section className="programme-section pardner-section">
          <div className="pardner-intro">
            <h2>🤝 Pardner Economics</h2>
            <p className="section-intro">
              Your grandparents knew something banks don't teach. <strong>Pardner</strong> (also 
              called susu, box hand, or rotating savings) is a Caribbean tradition where 
              a group saves together and takes turns receiving the pot.
            </p>
          </div>
          
          <div className="pardner-explanation">
            <h3>How It Works</h3>
            <ol className="pardner-steps">
              <li>A group (usually 10-12 people) agrees to save together</li>
              <li>Everyone contributes the same amount each week/month</li>
              <li>One person receives the entire pot each period</li>
              <li>Rotation continues until everyone has received once</li>
              <li>No interest, no banks, just community trust</li>
            </ol>
          </div>

          <div className="outcomes-grid">
            <h3>Why Pardner Works for Creatives</h3>
            {pardnerBenefits.map((benefit, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={24} />
                <p>{benefit}</p>
              </div>
            ))}
          </div>

          <div className="pardner-cta">
            <p>
              We run Passionistas pardner circles for equipment purchases, project funding, 
              and emergency reserves. Join Money Reset to access them.
            </p>
          </div>
        </section>

        {/* Learning Path */}
        <section className="programme-section">
          <h2>Your Money Journey</h2>
          <div className="learning-path">
            <div className="path-step">
              <div className="step-number">1</div>
              <h3>Awareness</h3>
              <p>Understand where you are — income, expenses, debts, patterns</p>
              <span className="path-duration">Week 1-2</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">2</div>
              <h3>Foundation</h3>
              <p>Build your budget, start emergency fund, address debt</p>
              <span className="path-duration">Week 3-6</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">3</div>
              <h3>Growth</h3>
              <p>Multiple income streams, pardner circles, investing basics</p>
              <span className="path-duration">Week 7-12</span>
            </div>
            <ArrowRight className="path-arrow" />
            <div className="path-step">
              <div className="step-number">4</div>
              <h3>Freedom</h3>
              <p>Financial stability that supports creative risk-taking</p>
              <span className="path-duration">Ongoing</span>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="programme-section outcomes-section">
          <h2>What You'll Achieve</h2>
          <div className="outcomes-grid">
            {outcomes.map((outcome, index) => (
              <div key={index} className="outcome-item">
                <CheckCircle size={24} />
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Integration */}
        <section className="programme-section integration-section">
          <div className="integration-card">
            <h2>How Money Reset Connects</h2>
            <p>
              Financial stability powers everything else. Money Reset integrates with:
            </p>
            <div className="integration-links">
              <Link to="/pathways/techreneurs" className="integration-link">
                <span>💼</span>
                <span>TECHreneurs (Business Strategy)</span>
              </Link>
              <Link to="/pathways/stemgeneers" className="integration-link">
                <span>⚙️</span>
                <span>STEMgeneers (Earning through repair)</span>
              </Link>
              <Link to="/workshops/spark-generator" className="integration-link">
                <span>🧮</span>
                <span>Pricing Calculator (Know your worth)</span>
              </Link>
            </div>
          </div>
        </section>

        {/* No Shame */}
        <section className="programme-section">
          <div className="impact-card">
            <Heart size={32} />
            <h3>No Shame, Just Progress</h3>
            <p>
              Whatever your financial situation, you're welcome here. Debt, no savings, 
              confused about money — we've all been there. Money Reset is a judgement-free 
              space to build the foundations you need.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="programme-cta">
          <h2>Ready to Reset Your Relationship with Money?</h2>
          <p>Join Money Reset and build the financial foundation your creativity deserves</p>
          <div className="cta-buttons">
            <Link to="/sessions" className="cta-button primary">
              Find a Session
            </Link>
            <Link to="/workshops/spark-generator" className="cta-button secondary">
              Try Income Mapper
            </Link>
          </div>
        </section>

      </div>
    </PageTemplate>
  );
};

export default MoneyResetPage;