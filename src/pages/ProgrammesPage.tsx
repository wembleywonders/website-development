import React from 'react';
import { Link } from 'react-router-dom';
import PageTemplate from '../components/PageTemplate';
import ProgrammesEditorialGrid from '../components/ProgrammesEditorialGrid';

// ============================================================
// ProgrammesPage.tsx
// Updated March 2026 — Independent editorial grid model
// Five sections · Lead / Feature / Standard hierarchy
// ============================================================

const ProgrammesPage: React.FC = () => {
  return (
    <PageTemplate
      pageTitle="Our Programmes"
      pageStrapline="Five sections. Thirteen programmes. One community knowledge ecosystem."
      pageGuide="The editorial weight tells you where to start. Every programme leads to documented, attributed, income-generating work."
      pageType="standard"
    >
      <div className="programmes-directory">

        {/* ── Editorial grid — the Independent model ── */}
        <ProgrammesEditorialGrid />

        {/* ── Earning path CTA ── */}
        <section className="pathways-cta">
          <div className="cta-box">
            <span className="cta-icon">🗺️</span>
            <div className="cta-text">
              <h3>Not sure where to start?</h3>
              <p>Bright Sparks is the room before the rooms. Saturday mornings. Free. No commitment required.</p>
            </div>
            <Link to="/programmes/bright-sparks" className="cta-button">
              Come on Saturday morning →
            </Link>
          </div>
        </section>

        {/* ── Quick links ── */}
        <section className="quick-links">
          <Link to="/join" className="quick-link">
            <span>🚪</span>
            <span>Join free</span>
          </Link>
          <Link to="/calendar" className="quick-link">
            <span>📅</span>
            <span>View schedule</span>
          </Link>
          <Link to="/heritage" className="quick-link">
            <span>🗃️</span>
            <span>Knowledge Commons</span>
          </Link>
        </section>

      </div>
    </PageTemplate>
  );
};

export default ProgrammesPage;
