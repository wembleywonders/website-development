// src/pages/programmes/{programme-slug}/sandbox/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sandbox.css';

const ProgrammeSandbox: React.FC = () => {
  // Self-contained sandbox - NO external component dependencies
  const [step, setStep] = useState<'intro' | 'create' | 'preview' | 'complete'>('intro');

  // Local placeholder values to avoid undefined expressions in the sandbox
  const programmeName = 'Programme Name';
  const programme = 'Programme';
  const emoji = '🧪';
  const programmeSlug = 'programme-slug';
  
  return (
    <div className="programme-sandbox">
      {/* Breadcrumb */}
      <nav className="sandbox-breadcrumb">
        <Link to="/programmes">Programmes</Link>
        <span>/</span>
        <Link to={`/programmes/${programmeSlug}`}>{programmeName}</Link>
        <span>/</span>
        <span>Sandbox</span>
      </nav>

      {/* Header */}
      <header className="sandbox-header">
        <span className="sandbox-icon">{emoji}</span>
        <h1>{programme} Sandbox</h1>
        <p>Try {programme} without signing up. Create something in 60 seconds.</p>
      </header>

      {/* Main Sandbox Content */}
      <main className="sandbox-content">
        {/* Step-based creation flow */}
      </main>

      {/* Footer CTA */}
      <footer className="sandbox-footer">
        <h3>Want to save your work?</h3>
        <Link to={`/signup?from=${programmeSlug}`} className="cta-primary">
          Sign Up Free & Continue
        </Link>
      </footer>
    </div>
  );
};

export default ProgrammeSandbox;
