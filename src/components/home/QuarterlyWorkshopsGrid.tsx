import React from 'react';

const QuarterlyWorkshopsGrid: React.FC = () => {
  return (
    <section className="workshops-section">
      <div className="section-header fade-in">
        <h2 className="section-title">Quarterly "Grab and Go" Digital Sessions</h2>
        <p className="section-subtitle">
          Try what interests you, connect with neighbors, discover what clicks for you. All sessions at Wembley Library, 32 Engineers Way, Wembley Park.
        </p>
      </div>

      <div className="workshops-grid fade-in">
        <div className="workshop-card">
          <span className="workshop-icon">💻</span>
          <h3 className="workshop-title">Q1: GET COMFORTABLE WITH EMAIL & STAYING SAFE</h3>
          <p className="workshop-description">
            Try out email, have a go at online forms, learn to spot dodgy websites
          </p>
          <ul className="workshop-features">
            <li>With IT specialists and qualified experienced teaching professionals who explain things clearly</li>
            <li>Saturday afternoon at Wembley Library</li>
            <li>Bring your questions, leave with what works for you</li>
            <li>Basic computer navigation and online safety</li>
          </ul>
          <div className="workshop-meta">
            March 2025 • £50 • 15 neighbors max
          </div>
          <a href="/programmes/bright-sparks" className="btn btn-primary workshop-cta">Book Your Spot</a>
        </div>

        <div className="workshop-card">
          <span className="workshop-icon">🎵</span>
          <h3 className="workshop-title">Q2: RECORD FAMILY STORIES & TRY CREATIVE STUFF</h3>
          <p className="workshop-description">
            Capture family memories, experiment with simple editing, have fun with smartphone video
          </p>
          <ul className="workshop-features">
            <li>Led by local DJs and radio folk who love sharing what they know</li>
            <li>Hands-on session - you'll actually create something to take home</li>
            <li>Use your smartphone for recording and basic editing</li>
            <li>Content creation basics for family sharing</li>
          </ul>
          <div className="workshop-meta">
            June 2025 • £50 • 15 places
          </div>
          <a href="/programmes/gtechcasters" className="btn btn-secondary workshop-cta">Join Creative Session</a>
        </div>

        <div className="workshop-card">
          <span className="workshop-icon">🔬</span>
          <h3 className="workshop-title">Q3: EXPLORE HOW TECHNOLOGY ACTUALLY WORKS</h3>
          <p className="workshop-description">
            Try basic programming, build a simple circuit, understand your gadgets better
          </p>
          <ul className="workshop-features">
            <li>With electrical engineering lecturers and hackspace volunteers</li>
            <li>Build something that lights up and works</li>
            <li>Basic programming concepts using visual tools</li>
            <li>Connect with local maker community</li>
          </ul>
          <div className="workshop-meta">
            September 2025 • £50 • 15 spaces
          </div>
          <a href="/programmes/stemgeneers" className="btn btn-primary workshop-cta">Explore Technology</a>
        </div>

        <div className="workshop-card">
          <span className="workshop-icon">📚</span>
          <h3 className="workshop-title">Q4: PRESERVE FAMILY MEMORIES SAFELY</h3>
          <p className="workshop-description">
            Learn respectful ways to record family stories and organize old photos digitally
          </p>
          <ul className="workshop-features">
            <li>With Judith, our child development specialist who understands family dynamics</li>
            <li>Family-friendly - bring relatives if you want</li>
            <li>Digital archiving techniques that actually work</li>
            <li>Community heritage project opportunities</li>
          </ul>
          <div className="workshop-meta">
            December 2025 • £50 • 15 participants
          </div>
          <a href="/connoisseurs-club" className="btn btn-secondary workshop-cta">Preserve Memories</a>
        </div>
      </div>

      <div className="how-it-works">
        <h3>How It Works</h3>
        <div className="how-it-works-grid">
          <div className="how-it-works-item">Come to whichever sessions interest you</div>
          <div className="how-it-works-item">Small groups mean everyone gets individual encouragement</div>
          <div className="how-it-works-item">£50 covers venue, materials, and volunteer time</div>
          <div className="how-it-works-item">No homework, no pressure to continue</div>
          <div className="how-it-works-item">All sessions include 3-4 local volunteers for hands-on help</div>
          <div className="how-it-works-item">Accessible venue with parking and public transport links</div>
        </div>
      </div>
    </section>
  );
};

export default QuarterlyWorkshopsGrid;